import HTMLComponent from "../../utility/HTMLComponent.mjs";
import globals from "../globals.mjs";

export default class extends HTMLComponent {
    constructor() {
        super(`
             <span class="lets-kick-it">
                 <button data-action-id="copy" style="width: 16px; height: 16px;">
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.2003 13.5H3.00015V2.92185H13.2003V13.5ZM0 0V10.2298H1.48815V1.46385H10.2541V0H0Z"></path></svg> 
                 </button> 
            </span>           
            `);
    }

    get = () => {
        if (!this.view) {
            this.view = super.get();
            this.copy = this.view.querySelector('[data-action-id="copy"]');
        }
        this.copy.addEventListener('mouseenter', (e)=> {
            let {x, y, width: w} = e.target.getBoundingClientRect();
            globals.apis.getApi('vue').showTooltip("Copy", x,y,w)
        });

        this.copy.addEventListener('mouseleave', (e)=> {
            globals.apis.getApi('vue').hideTooltip()
        });
        this.copy.onclick = function () {
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
        };
        return this.view;
    }
};