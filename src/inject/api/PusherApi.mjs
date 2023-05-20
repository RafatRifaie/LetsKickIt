import Api from "./Api";

export default class PusherApi extends Api {

    #initialized = false;

    constructor() {
        super('pusher');
    }

    #initialize = async () => {
        return new Promise((resolve) => {
            let interval = setInterval(() => {
                console.log("checking")
                this.channels = window?.Echo?.['connector']?.['channels'];
                if (this.channels !== undefined) {
                    this.#initialized = true;
                    clearInterval(interval);
                    resolve()
                }
            }, 1000);
        });

    }

    #cache = new Map();

    override = async (event, newHandler) => {
        if (this.#initialized === false) {
            await this.#initialize()
        }
        let activeChannel = this.getActiveChannel();
        console.log("retrieving channel id : " + activeChannel)
        if (!activeChannel) {
            console.log('LETS_KICK_IT', `channel with id ${activeChannel} is not found, are you sure theres a chat open?!`)
        }
        let eventHandlers = this.getActiveChannelHandlers(event);
        this.#cache.set(event, [...eventHandlers]);
        eventHandlers.length = 0;
        eventHandlers.push({fn: newHandler});
    }

    removeOverride(event) {
        let originalHandlers = this.#cache.get(event);
        if (!originalHandlers) {
            return;
        }
        let callbacks = this.getActiveChannelHandlers(event);
        callbacks.length = 0;
        callbacks.push(...originalHandlers);
    }

    getActiveChannelHandlers(event) {
        return this.channels[this.getActiveChannel()]['subscription']['callbacks']['_callbacks'][event];
    }

    getActiveChannelCallbacks() {
        return this.channels[this.getActiveChannel()]['subscription']['callbacks']['_callbacks'];
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