import globals from "../globals.mjs";
import Api from "./Api";

export default class VueApi extends Api {
    #pinia;
    #chatroom;

    constructor() {
        super('vue')
        this.#initialize();
    }

    #initialize() {
        console.log("=============================")
        this.#pinia = globals.appNode['__vue_app__']['config']['globalProperties']['$pinia']['state']['value'];
        this.#chatroom = this.#pinia['chatroomv2'];
    }

    isUserMod() {
        return this.#chatroom?.['userMe']?.['is_moderator'];
    }

    getChatroomId() {
        return this.#chatroom?.['chatroom']?.['id'];
    }
}