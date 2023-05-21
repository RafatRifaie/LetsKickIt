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
    getElementInside: function (element, selector) {
        return element.querySelector(selector);
    },
    getElementsInside: function (element, selector) {
        return element.querySelectorAll(selector);
    }
}

export default Getter;