import Plugin from '../../utility/Plugin.mjs'
import Dom from "../../utility/Dom.mjs";
import SeekBar from "../components/SeekGraphic.mjs";
import Getter from "../../utility/Getter.mjs";
import globals from "../globals.mjs";
import ChatActionsBar from "../components/ChatActionsBar.mjs";
import chatActionsBar from "../components/ChatActionsBar.mjs";
/*i hate my life*/
const MoveDirection = {
    UP: 'up',
    DOWN: 'down'
}

const MAX_HISTORY_LENGTH = 20;
export default class ChatInputHistory extends Plugin {
    constructor() {
        super();
        this.history = [];
        this.chatInput = null;
        this.state = {
            listening: false,
            currentHistoryIndex: null,
            tempMessage: false,
        }
    }

    #listenToUserSendMessages = () => {
        let onMessageSent = (message) => {
            if (!message || message.length === 0) return;

            /*Remove temp message*/
            if (this.state.tempMessage) {
                this.state.tempMessage = false;
                this.history.pop();
            }

            /*avoid consecutive duplicate messages*/
            if (this.history[this.history.length - 1] !== message) {
                this.history.push(message);
            }

            if (this.history.length > MAX_HISTORY_LENGTH) {
                this.history.shift();
            }
            this.state.currentHistoryIndex = null;
        };
        globals.apis.getApi("vue").onMessageSent(onMessageSent);
    }

    /*Make sure to account for when text is selected*/
    /*On new message should reset*/
    on = () => {
        if (!this.state.listening) {
            this.#listenToUserSendMessages();
            this.state.listening = true;
        }
        this.reset();
        this.chatInput = Getter.getElement("#message-input");
        this.chatInput.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowUp':
                    if (canMove(this.chatInput, MoveDirection.UP)) {
                        this.moveUp()
                    }
                    break
                case 'ArrowDown': {
                    if (canMove(this.chatInput, MoveDirection.DOWN)) {
                        this.moveDown()
                    }
                    break
                }
            }

        })


        function canMove(chatInput, direction) {
            if (!Dom.isNodeFocused(chatInput)) return;
            let shouldMove = false;
            const selection = window.getSelection();
            const {anchorOffset, focusOffset, anchorNode} = selection;


            /*only check if theres no ongoing selection*/
            if (anchorOffset === focusOffset) {
                /*find caret position*/
                let caretPosition = focusOffset;
                let sibling = anchorNode;
                while (sibling.previousSibling) {
                    caretPosition += sibling.textContent.length;
                    sibling = sibling.previousSibling;
                }

                if (caretPosition === 0 && direction === MoveDirection.UP) {
                    shouldMove = true;
                } else if (caretPosition === chatInput.innerText.length && direction === MoveDirection.DOWN) {
                    shouldMove = true;
                }
            }
            return shouldMove;

        }
    }


    setMessage = (message) => {
        this.chatInput.innerText = message;
    }

    reset = () => {
        this.state.tempMessage = null;
        this.state.currentHistoryIndex = null;
        this.history = [];
    }

    moveUp = () => {
        if (this.history.length === 0) return;
        if (this.state.currentHistoryIndex === null) {
            this.state.currentHistoryIndex = this.history.length;
            this.history.push(this.chatInput.innerText);
            this.state.tempMessage = true;
        }

        if (this.state.currentHistoryIndex === this.history.length - 1 && this.state.tempMessage) {
            /*update temp message*/
            this.history.pop();
            this.history.push(this.chatInput.innerText);
            this.state.tempMessage = true;
        }

        this.state.currentHistoryIndex = Math.max(0, this.state.currentHistoryIndex - 1);
        if (this.state.currentHistoryIndex < 0) return;
        this.setMessage(this.history[this.state.currentHistoryIndex]);

    }


    moveDown = () => {
        if (this.history.length === 0) return;
        if (this.state.currentHistoryIndex === null) return;
        this.state.currentHistoryIndex = Math.min(this.state.currentHistoryIndex + 1, this.history.length - 1);
        this.setMessage(this.history[this.state.currentHistoryIndex]);
    }

    off = () => {

    }


}
