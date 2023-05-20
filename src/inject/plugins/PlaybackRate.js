import Plugin from "../../utility/Plugin.mjs";
import Getter from "../../utility/Getter.mjs";
import PlayerSpeedControl from "../components/PlayerSpeedControl";

export default class extends Plugin {
    constructor() {
        super();
        this.speedControl = new PlayerSpeedControl();
    }

    on = async (data) => {
        let bar = Getter.getElement('.vjs-control-bar');
        this.speedControl.reset();
        bar.appendChild(this.speedControl.get());
    }
}

