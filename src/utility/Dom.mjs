let Dom = {
    htmlToElement(html) {
        let template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    },

    isActiveElementAnInput() {
        return Dom.isActiveElementOfTags('TEXTAREA', 'INPUT') || document.activeElement.classList.contains('chat-input');
    },

    isActiveElementOfTags(...tags) {
        let activeElementTag = document.activeElement.tagName.toLocaleLowerCase();
        for (const tag of tags) {
            if (tag.toLocaleLowerCase() === activeElementTag) {
                return true;
            }
        }
        return false;
    },
    isNodeFocused(node) {
        return document.activeElement === node;
    },
}

export default Dom;