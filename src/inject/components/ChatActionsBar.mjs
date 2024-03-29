import HTMLComponent from "../../utility/HTMLComponent.mjs";
import globals from "../globals.mjs";

export default class extends HTMLComponent {
    constructor() {
        super(`
             <span class="lets-kick-it flex gap-3">
                 <button data-action-id="copy" style="width: 16px; height: 16px;">
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" ><path d="M13.2003 13.5H3.00015V2.92185H13.2003V13.5ZM0 0V10.2298H1.48815V1.46385H10.2541V0H0Z"></path></svg> 
                 </button> 
                 <button data-action-id="mention" style="width: 16px; height: 16px;">
                    <svg width="16px" height="16px" viewBox="0 0 24 24"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill="#ffffff" fill-rule="nonzero"><path d="M22,12 L22,13.75 C22,15.8210678 20.3210678,17.5 18.25,17.5 C16.7458289,17.5 15.4485014,16.6143971 14.8509855,15.3361594 C14.032894,16.3552078 12.8400151,17 11.5,17 C8.99236936,17 7,14.7419814 7,12 C7,9.25801861 8.99236936,7 11.5,7 C12.6590052,7 13.7079399,7.48235986 14.5009636,8.27192046 L14.5,7.75 C14.5,7.33578644 14.8357864,7 15.25,7 C15.6296958,7 15.943491,7.28215388 15.9931534,7.64822944 L16,7.75 L16,13.75 C16,14.9926407 17.0073593,16 18.25,16 C19.440864,16 20.4156449,15.0748384 20.4948092,13.9040488 L20.5,13.75 L20.5,12 C20.5,7.30557963 16.6944204,3.5 12,3.5 C7.30557963,3.5 3.5,7.30557963 3.5,12 C3.5,16.6944204 7.30557963,20.5 12,20.5 C13.032966,20.5 14.0394669,20.3160231 14.9851556,19.9612482 C15.3729767,19.8157572 15.8053117,20.0122046 15.9508027,20.4000257 C16.0962937,20.7878469 15.8998463,21.2201818 15.5120251,21.3656728 C14.3985007,21.7834112 13.2135869,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.4292399,2 21.8479317,6.32667079 21.9961582,11.7200952 L22,12 L22,13.75 L22,12 Z M11.5,8.5 C9.86549502,8.5 8.5,10.047561 8.5,12 C8.5,13.952439 9.86549502,15.5 11.5,15.5 C13.134505,15.5 14.5,13.952439 14.5,12 C14.5,10.047561 13.134505,8.5 11.5,8.5 Z"></path></g></g></svg> 
                 </button> 
            </span>           
            `);
    }

    get = () => {
        if (!this.view) {
            this.view = super.get();
            this.copy = this.view.querySelector('[data-action-id="copy"]');
            this.mention = this.view.querySelector('[data-action-id="mention"]');
        }
        this.installTooltip(this.mention, "Mention");
        this.installTooltip(this.copy, "Copy");
        this.copy.onclick = this.onCopy;
        this.mention.onclick = this.onMention;
        return this.view;
    }

    onMention = () => {
        let api = globals.apis.getApi('vue');
        let chatInput = document.getElementById("message-input");
        let username = api?.getHoveredMessage()?.sender?.username;
        if (!username) return;

        let ogcontent = chatInput.textContent;
        let newContent = ogcontent;
        if (ogcontent.length !== 0 && !ogcontent.endsWith(" ")) {
            newContent += " ";
        }

        newContent += `@${username}` + " ";
        chatInput.textContent = newContent;
        api.setCurrentMessage(newContent);
        /*focus and move caret to end*/
        chatInput.focus({preventScroll: true});
        if (!!chatInput.lastChild) {
            const sel = window.getSelection();
            sel.collapse(chatInput.lastChild, newContent.length);
        }
    }

    onCopy = () => {
        let message = globals.apis.getApi('vue').getHoveredMessage();
        document.getElementById('ext-com').dispatchEvent(new CustomEvent("message", {
            detail: {
                type: "copy",
                value: {
                    sender: message.sender.username,
                    content: message.content,

                }
            }
        }));
        globals.apis.getApi('vue').showToast("Copied!")
    }

    installTooltip(element, message) {
        element.addEventListener('mouseenter', (e) => {
            let {x, y, width: w} = e.target.getBoundingClientRect();
            globals.apis.getApi('vue').showTooltip(message, x, y, w)
        });


        element.addEventListener('mouseleave', () => {
            globals.apis.getApi('vue').hideTooltip()
        });

    }
};