import Plugin from "../../utility/Plugin.mjs";
import Getter from "../../utility/Getter.mjs";

export default class extends Plugin {
    constructor() {
        super();
    }

    on = async () => {
        let timeLabel = Getter.getElement('.vjs-remaining-time-display');
        if (timeLabel) {
            let newTimeLabel = timeLabel.cloneNode();
            newTimeLabel.dataset.letsKickIt = "true";
            newTimeLabel.innerText = "00:00:00";
            timeLabel.parentNode.replaceChild(newTimeLabel, timeLabel);
            newTimeLabel.classList.add("bullshit")
            Getter.getElement('video').addEventListener('timeupdate', (e) => {
                updateTime(newTimeLabel, e.target.currentTime);
            });
        }

        let prevTime = 0;
        function updateTime(label, time) {
            if (Math.abs(Math.floor(time) - prevTime) >= 1) {
                let h = `${~~(time / 3600)}`.padStart(2, '0');
                let m = `${~~((time % 3600) / 60)}`.padStart(2, '0');
                let s = `${~~time % 60}`.padStart(2, '0');
                label.innerText = `${h}:${m}:${s}`;
                prevTime = Math.floor(time);
            }

        }
    }
}

