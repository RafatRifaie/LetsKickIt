import src from './image.png'
import './main.css'
import mainWord from './inject/index.mjs?script&module';

const html = `
<div class="crx">
  <img src="${chrome.runtime.getURL(src)}">
</div>
`

const doc = new DOMParser().parseFromString(html, 'text/html')
document.body.append(doc.body.firstElementChild)

console.log("hello");

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
