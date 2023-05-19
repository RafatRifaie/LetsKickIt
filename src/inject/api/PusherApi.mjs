import Api from "./Api";

export default class PusherApi extends Api {

    constructor() {
        super('pusher');
        this.#initialize();
    }

    #initialize() {
        this.channels = window.Echo['connector']['channels'];
    }

    #cache = new Map();

    override(event, newHandler) {
        let activeChannel = this.getActiveChannel();
        console.log("retrieving channel id : " + activeChannel)
        if (!activeChannel) {
            console.log('LETS_KICK_IT', `channel with id ${activeChannel} is not found, are you sure theres a chat open?!`)
        }
        let callbacks = this.channels[`chatrooms.${activeChannel}.v2`]['subscription']['callbacks']['_callbacks'];
        let eventHandlers = callbacks[event];
        this.#cache.set(event, [...eventHandlers]);
        eventHandlers.length = 0;
        eventHandlers.push({fn:newHandler});
        console.log(eventHandlers)
    }

    removeOverride(event) {
        let originalCallbacks = this.#cache.get(event);
        if (!originalCallbacks) {
            return;
        }
        let callbacks = this.getActiveChannelCallbacks();
        let eventHandlers = callbacks[event];
    }

    getActiveChannelHandlers() {
        return this.channels[`chatrooms.${this.getActiveChannel()}.v2`]['subscription']['callbacks']['_callbacks'];
    }
    getActiveChannelCallbacks() {
        return this.channels[`chatrooms.${this.getActiveChannel()}.v2`]['subscription']['callbacks']['_callbacks'];
    }
    getActiveChannel() {
        for (let key in this.channels) {
            if (key.includes('v2')) {
                return key;
            }
        }
    }
}

export const Events = {
    ChatMessageEvent: '_App\\Events\\ChatMessageEvent',
    ChatMessageDeleteEvent: '_App\\Events\\MessageDeletedEvent'
}