import Plugin from '../../utility/Plugin.mjs'
import Dom from "../../utility/Dom.mjs";
import SeekBar from "../components/SeekGraphic.mjs";
import Getter from "../../utility/Getter.mjs";
import globals from "../globals.mjs";
import ChatActionsBar from "../components/ChatActionsBar.mjs";
import chatActionsBar from "../components/ChatActionsBar.mjs";

export default class ChatActions {
    constructor() {
        this.actionsBar = new ChatActionsBar();
    }

    on = () => {
        globals.emitter.on('chatroom-added', (chatroom) => {
            let holder = chatroom.childNodes[1];
            let old = holder.insertBefore;
            holder.insertBefore =  (node, reference) => {
                if (node?.style?.right) {
                    node.appendChild(this.actionsBar.get());
                }
                return old.call(holder, node, reference);

            };
        })
    }

    off = () => {

    }


}
