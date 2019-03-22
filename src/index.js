/**
 * XBubbles custom element.
 * @module x-bubbles
 */

const context = require('./context');
const editor = require('./core/editor');
const utils = require('./core/utils');
const options = require('./core/options');

class XBubbles extends HTMLDivElement {
    constructor() {
        super();

        initEditor(this);
        utils.ready(this);
    }

    connectedCallback() {
        initEditor(this);
        this.editor.bubbling();
    }

    disconnectedCallback() {
        destroyEditor(this);
    }

    attributeChangedCallback(/* name, prevValue, value */) {
        options(this);
    }

    /**
     * The receiving and recording settings.
     * @memberof XBubbles
     * @function
     * @param {string|object} name - string, if only one option is inserted, or object - if many options inserted
     * @param {*} value
     * @returns {*}
     * @public
     */
    options(name, value) {
        return options(this, name, value)
    }


    /**
     * List bablow.
     * @memberof XBubbles
     * @type {array}
     * @public
     */
    items() {
        return this.editor.getItems();
    }

    /**
     * The value entered.
     * @memberof XBubbles
     * @type {string}
     * @public
     */
    inputValue() {
        return this.editor.inputValue();
    }

    /**
     * Set contents of the set.
     * @function
     * @memberof XBubbles
     * @param {string} data
     * @returns {boolean}
     * @public
     */
    setContent(data) {
        return this.editor.setContent(data);
    }

    canAddBubble() {
        return this.editor.canAddBubble();
    }

    /**
     * Add bubble.
     * @function
     * @memberof XBubbles
     * @param {string} bubbleText
     * @param {Object} [data]
     * @returns {boolean}
     * @public
     */
    addBubble(bubbleText, data) {
        return this.editor.addBubble(bubbleText, data)
    }

    /**
     * Remove bubble.
     * @function
     * @memberof XBubbles
     * @param {HTMLElement} nodeBubble
     * @returns {boolean}
     * @public
     */
    removeBubble(nodeBubble) {
        return this.editor.removeBubble(nodeBubble);
    }

    /**
     * Edit bubble.
     * @function
     * @memberof XBubbles
     * @param {HTMLElement} nodeBubble
     * @returns {boolean}
     * @public
     */
    editBubble(nodeBubble) {
        return this.editor.editBubble(nodeBubble);
    }

    /**
     * Starting formation bablow.
     * @function
     * @memberof XBubbles
     * @returns {boolean}
     * @public
     */
    bubbling() {
        return this.editor.bubbling();
    }
}

module.exports = context.customElements.define('x-bubbles', XBubbles, {
    extends: 'div'
});

function initEditor(node) {
    if (!node.editor) {
        Object.defineProperty(node, 'editor', {
            configurable: true,
            value: editor.init(node)
        });
    }
}

function destroyEditor(node) {
    if (node.editor) {
        editor.destroy(node);
        delete node.editor;
    }
}
