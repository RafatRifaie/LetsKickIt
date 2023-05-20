
let Utility = {
    getComponents: (node, components = {})=> {
        if (node?.children != null && node?.children instanceof Array && node?.children?.length > 0) {
            for (let subNode of node.children) {
                Utility.getComponents(subNode, components);
            }
        } else {
            if (node?.component !== null) {
                saveComponent(node.component);
                if (node.component?.subTree?.children?.length > 0) {
                    for (let subNode of node.component.subTree.children) {
                        Utility.getComponents(subNode, components);
                    }
                }
            }
        }

        function saveComponent(component) {
            if (component) {
                components[component?.type?.__name || component?.type?.name || crypto.randomUUID()] = component.type;
            }
        }

        return components;
    }, async  copyToTheClipboard(textToCopy){
        const el = document.createElement('textarea');
        el.value = textToCopy;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
}
export default Utility;
