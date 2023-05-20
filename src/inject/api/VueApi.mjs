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


    #getChatroomState = () => {
        return this.#getState()['chatroomv2'];
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