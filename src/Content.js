import './main.css'
import mainWorld from './inject/index.mjs?script&module';
import Utility from "./utility/Utility";


let eventsDiv = document.createElement('div');
eventsDiv.id = "ext-com";

eventsDiv.addEventListener('message', (e) => {
    let {type, value} = e.detail;
    if (type === "copy") {
        Utility.copyToTheClipboard(value.sender + ": " + value.content);
    }

})

document.body.appendChild(eventsDiv);

const script = document.createElement('script')
script.src = chrome.runtime.getURL(mainWorld)
script.type = 'module'
document.head.prepend(script)


async function dothedeed() {
    await chrome.storage.local.set({
        "kick-it-version": "1.0.0",
    })
}

dothedeed().then()
