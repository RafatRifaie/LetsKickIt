// import {observe} from 'selector-observer'
import Utility from "../utility/Utility.js";
const globals = {
    appNode: null,
    components: {},
    apis: {},
    refresh: async () => {
        globals.appNode = document.getElementById("app");
        console.log(globals.appNode)

        return new Promise(async (resolve) => {
            // let shit = observe('.chat-entry', {
            //     add: (e) => {
            //         shit.abort();
            //         getAllInstances();
            //     },
            // })

            getAllInstances();
            async function getAllInstances() {
                let i = 100000;
                while (i-- > 0) {
                    let instances = globals.appNode['__vue_app__']['config']['globalProperties']['$router']['currentRoute']['_rawValue']['matched'][0]['instances'];
                    let children = instances?.['default']?.['_']?.['subTree']?.['children'];
                    if (children) {
                        let components = Utility.getComponents({children: children});
                        let target = components['ChatroomEntry'];
                        if (target) {
                            console.log('target')
                            for (let key in components) {
                                globals.components[key] = components[key];
                            }

                            break;
                        }
                    }
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                resolve(globals.components);

            }

        })

    }
}

export default globals;