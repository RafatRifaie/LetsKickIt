import uniqueCachedWaiter  from "./waiting/UniqueCachedWaiter.mjs";
let Waiter = {
    /*Works when there can only be one element with the provided selector*/
    waitForCached(selector,  handler, options = {root: document.body}) {
        console.log("waiting")
        uniqueCachedWaiter.wait(selector, handler, options)
    },
}

export default Waiter;