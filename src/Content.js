import './main.css'
import mainWord from './inject/index.mjs?script&module';
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
script.src = chrome.runtime.getURL(mainWord)
script.type = 'module'
document.head.prepend(script)


async function dothedeed() {
    await chrome.storage.local.set({
        count: 0,
    })


    await chrome.storage.local.get({
        count: 0,
    }).then(e => {
        console.log(e)
    })

}

dothedeed().then()
