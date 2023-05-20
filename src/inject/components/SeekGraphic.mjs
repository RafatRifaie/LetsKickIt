import HTMLComponent from "../../utility/HTMLComponent.mjs";

export default class extends HTMLComponent {
    constructor() {
        super(
            ` <div class="seek-circle">
                <div class="inner">
                    <div class="dot-holder"><span class="dot"></span> <span class="dot"></span> <span
                        class="dot"></span></div>
                    <span class="title">15S</span></div>
            </div>`
        );
    }

    get = () => {
        if (!this.view) {
            this.view = super.get();
            this.title = this.view.querySelector('.title');
        }
        return this.view;
    }

    #state = {
        seekAmount: 0,
        unit: 'Secs',
        direction: 'forward',
        getSeekAmount(seekAmount, unit, direction) {
            if (this.unit !== unit || this.direction !== direction) {
                this.seekAmount = 0;
            }
            this.seekAmount += seekAmount;
            this.unit = unit;
            this.direction = direction;
            return this.seekAmount;
        }
    }
    show = (seekAmount, seekDirection) => {
        this.view.dataset.direction = seekDirection;
        seekAmount = Math.max(1, Math.abs(seekAmount));
        let unit = seekAmount >= 5 ? 'Secs' : 'Frame';
        this.title.innerText = Math.max(1, this.#state.getSeekAmount(seekAmount, unit, seekDirection)) + unit;
        this.view.classList.add('visible');
        clearTimeout(this.timer);
        this.timer = setTimeout(this.hide, 1000)
    }

    hide = () => {
        this.view.classList.remove('visible');
        this.#state.seekAmount = 0
        this.#state.unit = 'Sec'
    }
};