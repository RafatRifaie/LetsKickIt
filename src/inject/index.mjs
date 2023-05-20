import VodSeeking from './plugins/VodSeeking.js'
import MasterApi from './api/MasterApi.mjs'
import PusherApi from "./api/PusherApi.mjs";
import Vue from "./api/VueApi.mjs";
import globals from "./globals.mjs";
import PersistDeletedMessages from "./plugins/PersistDeletedMessages.js";
import SeekBar from "./components/SeekGraphic.mjs";
import VodTimeLabelFix from "./plugins/VodTimeLabelFix.js";
import Waiter from "../utility/Waier.js";
import ChatActions from "./plugins/ChatActions.js";

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
    let vodSeeking = new VodSeeking();
    let vodTimeLabelFix = new VodTimeLabelFix();
    let chatActions = new ChatActions();
    let persistDeletedMessages = new PersistDeletedMessages();

    Waiter.waitForCached("#chatroom", (elem) => {
        globals.emitter.emit("chatroom-added",null, elem)
        chatActions.on();
    })

    Waiter.waitForCached(".vjs-control-bar", (elem) => {
        globals.emitter.emit("video-added", null, elem);
        vodSeeking.on();
    })

    await globals.refresh().then(components => {
    });

    globals.apis = master;

    let apis = [
        new Vue(),
        new PusherApi()
    ];

    for (let api of apis) {
        master.register(api);
    }


}
