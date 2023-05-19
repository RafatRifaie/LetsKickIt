import VodSeeking from './plugins/VodSeeking.js'
import MasterApi from './api/MasterApi.mjs'
import PusherApi from "./api/PusherApi.mjs";
import Vue from "./api/VueApi.mjs";
import globals from "./globals.mjs";
import PersistDeletedMessages from "./plugins/PersistDeletedMessages.js";

let master = new MasterApi();


function WaitForFullBang() {
    return new Promise(resolve => {
        setTimeout(() => {
            if (document.getElementById("app")) {
                resolve(true);
            }
        }, 50);
    });
}


WaitForFullBang().then(e => {
    onAppLoaded().then();
})

async function onAppLoaded() {
    await globals.refresh().then(components => {
        console.log(components);
        console.log("shit")
    });
    globals.apis = master;
    console.log("Refreshed")
    let apis = [
        new Vue(),
        new PusherApi()
    ];

    for (let api of apis) {
        master.register(api);
    }

    let plugins = [
        new PersistDeletedMessages(master),
    ];

    for (let plugin of plugins) {
        setTimeout(plugin.on, 3000)
    }

    setTimeout(() => {
        plugins[0].off();
    },10000)

}
