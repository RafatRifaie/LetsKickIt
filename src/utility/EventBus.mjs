const EventBus = function () {
    this.listeners = {};
    this.registerListener = function (event, callback, number) {
        var type = event.constructor.name;
        number = this.validateNumber(number || "any");
        if (type !== "Array") {
            event = [event]
        }
        event.forEach(function (e) {
            if (e.constructor.name !== "String") {
                throw new Error("Only `String` and array of `String` are accepted for the event names!")
            }
            that.listeners[e] = that.listeners[e] || [];
            that.listeners[e].push({callback: callback, number: number})
        })
    };
    this.validateNumber = function (n) {
        var type = n.constructor.name;
        if (type === "Number") {
            return n
        } else if (type === "String" && n.toLowerCase() === "any") {
            return "any"
        }
        throw new Error("Only `Number` and `any` are accepted in the number of possible executions!")
    };
    this.toBeRemoved = function (info) {
        var number = info.number;
        info.execution = info.execution || 0;
        info.execution++;
        if (number === "any" || info.execution < number) {
            return false
        }
        return true
    };
    var that = this;
    return {
        on: function (eventName, callback) {
            that.registerListener.bind(that)(eventName, callback, "any")
        }, once: function (eventName, callback) {
            that.registerListener.bind(that)(eventName, callback, 1)
        }, exactly: function (number, eventName, callback) {
            that.registerListener.bind(that)(eventName, callback, number)
        }, die: function (eventName) {
            delete that.listeners[eventName]
        }, off: function (eventName) {
            this.die(eventName)
        }, detach: function (eventName, callback) {
            if (callback === undefined) {
                that.listeners[eventName] = [];
                return true
            }
            for (var k in that.listeners[eventName]) {
                if (that.listeners[eventName].hasOwnProperty(k) && that.listeners[eventName][k].callback === callback) {
                    that.listeners[eventName].splice(k, 1);
                    return this.detach(eventName, callback)
                }
            }
            return true
        }, detachAll: function () {
            for (var eventName in that.listeners) {
                if (that.listeners.hasOwnProperty(eventName)) {
                    this.detach(eventName)
                }
            }
        }, emit: function (eventName, context) {
            var listeners = [];
            for (var name in that.listeners) {
                if (that.listeners.hasOwnProperty(name)) {
                    if (name === eventName) {
                        Array.prototype.push.apply(listeners, that.listeners[name])
                    }
                    if (name.indexOf("*") >= 0) {
                        var newName = name.replace(/\*\*/, "([^.]+.?)+");
                        newName = newName.replace(/\*/g, "[^.]+");
                        var match = eventName.match(newName);
                        if (match && eventName === match[0]) {
                            Array.prototype.push.apply(listeners, that.listeners[name])
                        }
                    }
                }
            }
            var parentArgs = arguments;
            context = context || this;
            listeners.forEach(function (info, index) {
                var callback = info.callback;
                var number = info.number;
                if (context) {
                    callback = callback.bind(context)
                }
                var args = [];
                Object.keys(parentArgs).map(function (i) {
                    if (i > 1) {
                        args.push(parentArgs[i])
                    }
                });
                if (that.toBeRemoved(info)) {
                    that.listeners[eventName].splice(index, 1)
                }
                callback.apply(null, args)
            })
        }
    }
};

export default EventBus;

