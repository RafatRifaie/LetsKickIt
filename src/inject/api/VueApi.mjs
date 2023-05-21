import globals from "../globals.mjs";
import Api from "./Api";

export default class VueApi extends Api {

    constructor() {
        super('vue')
    }

    isUserMod() {
        return this.#getChatroomState()?.['userMe']?.['is_moderator'];
    }

    getHoveredMessage() {
        return this.#getChatroomState()?.['currentHoverMessage'];
    }

    getChatroomId() {
        return this.#getChatroomState()?.['chatroom']?.['id'];
    }

    showTooltip = (content, x, y, w) => {
        this.#getTooltipState()['setContent'](content);
        this.#getTooltipState()['showTooltip']({elLeft: x, elTop: y, elWidth: w});
    }

    hideTooltip = (x, y, w) => {
        this.#getTooltipState()['hideTooltip']();
    }

    toastTimout;
    showToast = (content) => {
        this.hideToast();
        this.#getToastState()['showNewToast'](content, {
            "backgroundColor": "#1475e1",
            "textColor": "#fff"
        });
        clearTimeout(this.toastTimout);
        this.toastTimout = setTimeout(() => {
            this.hideToast();
        }, 1500)
    }

    hideToast = () => {
        this.#getToastState()['dismissToast']();
    }

    onMessageSent = (handler) => {
        if (!this.messageHandlers) {
            this.messageHandlers = new Set();
            /**/
            let old = this.#getChatroomFullState()['sendCurrentMessage'];
            this.#getChatroomFullState()['sendCurrentMessage'] = () => {
                let currentMessage = this.getCurrentMessage();
                old.apply(this);
                this.messageHandlers.forEach(handler => {
                    try {
                        handler(currentMessage);
                    } catch (error) {
                        console.error(error);
                    }
                })
            };
        }
        this.messageHandlers.add(handler);
    }

    getCurrentMessage = () => {
        return this.#getChatroomFullState()['currentMessage'];
    }

    #getChatroomState = () => {
        return this.#getState()['chatroomv2'];
    }

    #getChatroomFullState = () => {
        return this.#getFullState().get('chatroomv2');
    }
    #getTooltipState = () => {
        return this.#getFullState().get('tooltip');
    }

    #getToastState() {
        return this.#getFullState().get('chatroomToast');
    }

    #getFullState = () => {
        return globals.appNode['__vue_app__']['config']['globalProperties']['$pinia']['_s'];
    }

    #getState = () => {
        return globals.appNode['__vue_app__']['config']['globalProperties']['$pinia']['state']['value'];
    }
}