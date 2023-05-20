// import {observe} from 'selector-observer'
import Utility from "../utility/Utility.js";
import EventBus from "../utility/EventBus.mjs";

const globals = {
    appNode: null,
    components: {},
    apis: {},
    emitter: new EventBus(),
    refresh: async () => {
        globals.appNode = document.getElementById("app");
        return new Promise(async (resolve) => {
            resolve();
            // getAllInstances();
            // async function getAllInstances() {
            //     let i = 100000;
            //     while (i-- > 0) {
            //         let instances = globals.appNode['__vue_app__']?.['config']?.['globalProperties']?.['$router']?.['currentRoute']?.['_rawValue']?.['matched']?.[0]?.['instances'];
            //         let children = instances?.['default']?.['_']?.['subTree']?.['children'];
            //         if (children) {
            //             let components = Utility.getComponents({children: children});
            //             let target = components['ChatroomEntry'];
            //             if (target) {
            //                 console.log('target')
            //                 for (let key in components) {
            //                     globals.components[key] = components[key];
            //                 }
            //
            //                 break;
            //             }
            //         }
            //         await new Promise(resolve => setTimeout(resolve, 100));
            //     }
            //     resolve(globals.components);
            //
            // }

        })

    }
}

export default globals;