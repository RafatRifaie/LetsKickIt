import HTMLComponent from "../../utility/HTMLComponent.mjs";
import globals from "../globals.mjs";
import Getter from "../../utility/Getter.mjs";

export default class extends HTMLComponent {

    constructor() {
        let rates = [0.25, 0.5, 0.75, "normal", 1.25, 1.5, 1.75, 2, 3, 4, 5]
        let template =
            `
            <li data-rate="{rate}" class="vjs-menu-item" tabindex="-1" role="menuitemradio" aria-disabled="false" aria-checked="false">
                <span class="vjs-menu-item-text">{rate}</span><span class="vjs-control-text" aria-live="polite"></span>
            </li>
            `;
        super(`

            <div class="vjs-playback-rate vjs-menu-button vjs-menu-button-popup vjs-control vjs-button lets-kick-it">
                <div class="vjs-playback-rate-value" id="vjs-playback-rate-value-label-vjs_video_3_component_317">1×</div>
                <button class="vjs-playback-rate vjs-menu-button vjs-menu-button-popup vjs-button" type="button"
                        aria-disabled="false" aria-haspopup="true" aria-expanded="false"
                        aria-describedby="vjs-playback-rate-value-label-vjs_video_3_component_317"><span
                        class="vjs-icon-placeholder" aria-hidden="true"></span><span class="vjs-control-text" aria-live="polite">Playback Rate</span>
                </button>
                <div class="vjs-menu">
                    <ul class="vjs-menu-content">
                    ${rates.map(rate => {
                        return template.replaceAll('{rate}', rate)
                    }).join('')}    
                    </ul>
                </div>
            </div>
            `);
    }

    onItemSelected = (item) => {
        let prev = Getter.getElementInside(this.view, '.vjs-selected');
        this.deselectItem(prev);
        this.selectItem(item);
        let value = item.dataset.rate;
        let rate;
        if (value === 'normal') {
            rate = 1;
        } else {
            rate = parseFloat(value);
        }
        this.rateValue.innerText = rate + "×"
        Getter.getElement('video').playbackRate = rate;
    }

    selectItem = (item) => {
        item.classList.add('vjs-selected');
    }

    deselectItem = (item) => {
        item.classList.remove('vjs-selected');
    }

    reset = () => {
        if (this.view) {
            this.deselectItem(Getter.getElementInside(this.view, '.vjs-selected'));
            this.selectItem(Getter.getElementInside(this.view, '[data-rate="normal"]'));
            this.rateValue.innerText = 1 + "×";
        }
    }
    get = () => {
        if (!this.view) {
            this.view = super.get();
            this.button = Getter.getElementInside(this.view, 'button');
            this.rateValue = Getter.getElementInside(this.view, '.vjs-playback-rate-value');

            this.view.addEventListener('mouseenter', (e) => {
                this.view.classList.add('vjs-hover');
            });
            this.view.addEventListener('mouseleave', (e) => {
                this.view.classList.remove('vjs-hover');
            });
            this.button.addEventListener('click', () => {
                this.view.classList.toggle('vjs-hover');
            })
            this.items = Getter.getElementsInside(this.view, 'li');
            for (let item of this.items) {
                if (item.dataset.rate === 'normal') {
                    this.selectItem(item);
                }
                item.addEventListener('click', (e) => {
                    this.onItemSelected(item);
                });
            }
        }
        return this.view;
    }
};