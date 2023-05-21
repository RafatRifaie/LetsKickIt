import Plugin from "../../utility/Plugin.mjs";
import Getter from "../../utility/Getter.mjs";
import PlayerSpeedControl from "../components/PlayerSpeedControl";

export default class extends Plugin {
    constructor() {
        super();
    }

    on = async () => {
        let chatInput = Getter.getElementById("message-input");
        chatInput.contentEditable = "true";
        Object.defineProperties(chatInput, {
            contenteditable: {
                get: function () {
                    return true;
                }, set: function () {
                    return true;
                }
            }
        })
    }
}
