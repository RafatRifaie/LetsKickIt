import Plugin   from "../../utility/Plugin.mjs";
import {Events} from "../api/PusherApi.mjs";
import globals from "../globals.mjs";

export default class Shit extends Plugin {

    constructor() {
        super();
    }

    on() {
        super.on();
        globals.apis.getApi('pusher').override( Events.ChatMessageDeleteEvent, onMessageDeleted);
        function onMessageDeleted(data) {
            let id = data.message.id || data.id;
            let removedMessageNode = document.querySelector(`[data-chat-entry="${id}"]`);
            removedMessageNode.classList.add('removed');
        }

    }

    off(data) {
        super.off(data);
        globals.apis.getApi('pusher').removeOverride( Events.ChatMessageDeleteEvent);
    }
}