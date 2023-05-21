const Getter = {
    getElements: function (selector) {
        return document.querySelectorAll(selector);
    },
    getElement: function (selector) {
        return document.querySelector(selector);
    },
    getElementById: function (id) {
        return document.getElementById(id);
    },
    getElementsByIds: function (ids) {
        let elements = [];
        for (let id of ids) {
            elements.push(document.getElementById(id));
        }
        return elements;
    },
    getElementsBySelectors: function (selectors) {
        let elements = [];
        for (let selector of selectors) {
            elements.push(Getter.getElement(selector));
        }
        return elements;
    },
    getElementInside: function (element, selector) {
        return element.querySelector(selector);
    },
    getElementsInside: function (element, selector) {
        return element.querySelectorAll(selector);
    }
}

export default Getter;