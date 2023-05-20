
class UniqueCachedWaiter {
    constructor() {
        this.cache = {};
        this.handlers = {};
    }

    /**
     * @param selector
     * @param handler
     * @param options
     */
    wait = (selector, handler, options = {root: document.body}) => {
        let checker = (() => {
            if (selector.startsWith('.')) {
                selector = selector.substring(1);
                return function (selector) {
                    return options.root.getElementsByClassName(selector)?.[0];
                };
            } else if (selector.startsWith("#")) {
                selector = selector.substring(1);
                return function (selector) {
                    return document.getElementById(selector);
                };
            } else {
                return function (selector) {
                    return document.querySelector(selector);
                };
            }
        })()

        let observer = this.handlers[options.root];
        if (!observer) {
            observer = new MutationObserver((mutations) => {
                if (this.cache[selector]?.isConnected) {
                    return
                }
                let elem = checker(selector);

                if (elem) {
                    for (let handler of this.handlers[options.root]) {
                        handler(elem, observer);
                    }
                    this.cache[selector] = elem;
                }
            });
            observer.observe(options.root, {childList: true, subtree: true});
            this.handlers[options.root] = [];
        }
        this.handlers[options.root].push(handler);
    }
}


export default new UniqueCachedWaiter();