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
        console.log(this.#getTooltipState())
        this.#getTooltipState()['setContent'](content);
        this.#getTooltipState()['showTooltip']({elLeft: x, elTop: y, elWidth: w});
    }

    hideTooltip = (x, y, w) => {
        this.#getTooltipState()['hideTooltip']();
    }

    #getChatroomState = () => {
        return this.#getState()['chatroomv2'];
    }

    #getTooltipState = () => {
        return this.#getFullState().get('tooltip');
    }
    #getFullState = () => {
        return globals.appNode['__vue_app__']['config']['globalProperties']['$pinia']['_s'];
    }
    #getState = () => {
        return globals.appNode['__vue_app__']['config']['globalProperties']['$pinia']['state']['value'];
    }
}