import Plugin from '../../utility/Plugin.mjs'

export default class VodSeeking extends Plugin {
    constructor() {
        super()
    }

    on(data) {
        this.#waitForShit().then(e => {
            console.log(e)
        })

    }


    async #waitForShit() {

        console.log("waiting")

    }

}
