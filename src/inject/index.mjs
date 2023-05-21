import VodSeeking from './plugins/VodSeeking.js'
import MasterApi from './api/MasterApi.mjs'
import PusherApi from "./api/PusherApi.mjs";
import Vue from "./api/VueApi.mjs";
import globals from "./globals.mjs";
import PersistDeletedMessages from "./plugins/PersistDeletedMessages.js";
import SeekBar from "./components/SeekGraphic.mjs";
import VodTimeLabelFix from "./plugins/FixVodTimeLabel.js";
import Waiter from "../utility/Waier.js";
import ChatActions from "./plugins/ChatActions.js";
import PlaybackSpeed from "./plugins/PlaybackRate.js";
import ChatInputHistory from "./plugins/ChatInputHistory.js";
import FixChatInputFocusSlowMode from "./plugins/FixChatInputFocusSlowMode.js";

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


WaitForFullBang().then(onAppLoaded);

async function onAppLoaded() {
    let vodSeeking = new VodSeeking();
    let vodTimeLabelFix = new VodTimeLabelFix();
    let chatActions = new ChatActions();
    let persistDeletedMessages = new PersistDeletedMessages();
    let playbackSpeed = new PlaybackSpeed();
    let chatInputHistory = new ChatInputHistory();
    let fixChatInputFocusSlowMode = new FixChatInputFocusSlowMode();

    Waiter.waitForCached(".vjs-remaining-time-display", (elem) => {
        globals.emitter.emit("video-added", null, elem);
        if (window.location.pathname.includes('/video/')) {
            if (!elem.dataset.letsKickIt) {
                vodSeeking.on();
                vodTimeLabelFix.on();
                playbackSpeed.on();
            }
        }
    })
    Waiter.waitForCached("#chatroom", (chatroom) => {
        globals.emitter.emit("chatroom-added", null, chatroom);
        chatActions.on(chatroom);
        persistDeletedMessages.on();
        chatInputHistory.on();
        fixChatInputFocusSlowMode.on()
    })



    await globals.refresh().then(components => {});

    globals.apis = master;

    let apis = [
        new Vue(),
        new PusherApi()
    ];

    for (let api of apis) {
        master.register(api);
    }


}
