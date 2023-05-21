import Plugin from "../../utility/Plugin.mjs";
import Getter from "../../utility/Getter.mjs";

/*when you click to send a quick emote or use the green chat button to send a message
* the chat input loses focus making it extremely inconvenient in my experience
* since i have to constantly use my damn mouse to refocus on the chat input field
* ======
* Also when slow mode is activated each time the countdown shows up it also makes the input field
* lose focus...unacceptable, chad thundercock would not approve
* */
export default class extends Plugin {
    constructor() {
        super();
    }

    on = async () => {
        let chatInput = Getter.getElementById("message-input");
       /*Case 1: induced by clicking outside*/
        let elements = Getter.getElementsBySelectors(['.quick-emotes-holder', '.send-row > button', '.chat-message-row button']);
        elements.forEach(element => {
            let wasChatInputFocused = false;
            element.addEventListener('mousedown', e => {
                wasChatInputFocused = document.activeElement === chatInput;
            });
            element.addEventListener('mouseup', e => {
                if (wasChatInputFocused) {
                    chatInput.focus();
                }
            });
        })
        /*Case 2: induced by slow mode activation*/
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
