import Dom from "./Dom.mjs";

export default class {
    constructor(html) {
        this.html = html;
    }

    get () {
        if (!this.element) {
            this.element = Dom.htmlToElement(this.html)
        }
        return this.element;
    };

    isConnected = () => {
        return this.element.isConnected;
    };


}