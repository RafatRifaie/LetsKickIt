import Api from "./Api";

export default class PusherApi extends Api {

    #initialized = false;

    constructor() {
        super('pusher');
    }

    #initialize = async () => {
        return new Promise((resolve) => {
            let interval = setInterval(() => {
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
        let activeChannel = await this.getActiveChannel();
        if (!activeChannel) {
            console.log('LETS_KICK_IT', `channel with id ${activeChannel} is not found, are you sure theres a chat open?!`)
        }
        let eventHandlers = this.getActiveChannelHandlers(activeChannel, event);
        this.#cache.set(event, [...eventHandlers]);
        eventHandlers.length = 0;
        eventHandlers.push({fn: newHandler});
    }

    removeOverride = async (event) => {
        let activeChannel = await this.getActiveChannel();

        let originalHandlers = this.#cache.get(event);
        if (!originalHandlers) {
            return;
        }
        let callbacks = this.getActiveChannelHandlers(activeChannel, event);
        callbacks.length = 0;
        callbacks.push(...originalHandlers);
    }

    getActiveChannelHandlers = (channel, event) => {
        return this.channels[channel]['subscription']['callbacks']['_callbacks'][event];
    }

    getActiveChannel() {
        return new Promise(async (resolve) => {
            while (true) {
                for (let key in this.channels) {
                    if (key.includes('v2')) {
                        resolve(key);
                        return;
                    }
                }
                await new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                })
            }
        });

    }
}

export const Events = {
    ChatMessageEvent: '_App\\Events\\ChatMessageEvent',
    ChatMessageDeleteEvent: '_App\\Events\\MessageDeletedEvent'
}