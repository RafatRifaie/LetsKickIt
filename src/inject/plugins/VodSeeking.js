import Plugin from '../../utility/Plugin.mjs'
import Dom from "../../utility/Dom.mjs";
import SeekBar from "../components/SeekGraphic.mjs";
import Getter from "../../utility/Getter.mjs";

class CachedDomElement {
    #element = null;
    #selector = null;

    constructor(selector) {
        this.#selector = selector;
    }

    get = () => {
        if (!this.#element?.isConnected) {
            this.#element = document.querySelector(this.#selector);
        }
        return this.#element;
    }
}

export default class VodSeeking {
    constructor() {
        this.video = new CachedDomElement('video');
        this.controlBar = new CachedDomElement('.vjs-control-bar');
        this.seekGraphic = new SeekBar();
    }

    on = () => {
        document.addEventListener('keydown', this.onKeyDown, true)
    }

    off = () => {
        document.removeEventListener('keydown', this.onKeyDown, true)
    }

    onKeyDown = (event) => {
        if (!window.location.pathname.includes('/video/') || Dom.isActiveElementAnInput()) {
            return;
        }

        let keycode = event.code;

        if (keycode === 'Space') {
            this.video.get().paused
                ? this.video.get().play()
                : this.video.get().pause();
            document.activeElement?.blur(); /*remove focus from the full screen button*/
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.checkSeek(event);
        }
    };

    checkSeek = (event) => {
        let keycode = event.code;

        let keys = {
            "Period": 1 / 30,
            "Comma": -1 / 30,
            "ArrowRight": 5,
            "ArrowLeft": -5,
        }

        let shiftKeys = {
            "ArrowRight": 10, "ArrowLeft": -10,
        }

        let seekAmount;
        if (event.shiftKey) {
            seekAmount = shiftKeys[keycode]
        } else {
            seekAmount = keys[keycode];
        }

        if (seekAmount) {
            this.applySeek(seekAmount);
            event.preventDefault();
            event.stopPropagation();
        }
    }



    applySeek = (seekAmount) => {
        this.video.get().currentTime += seekAmount;
        document.activeElement?.blur(); /*remove focus from the full screen button*/
        this.showPlayerControls(); /*show player controls for better ux*/
        if (!this.seekGraphic.get().isConnected) {
            Getter.getElement('#video-holder').firstElementChild.appendChild(this.seekGraphic.get());
        }
        this.seekGraphic.show(seekAmount, (seekAmount > 0 ? 'right' : 'left'));
    }


    showPlayerControls() {
        let event = new MouseEvent('mouseup', {
            'view': window, 'bubbles': true, 'cancelable': true,
        });
        this.controlBar.get().dispatchEvent(event);
    }

}
