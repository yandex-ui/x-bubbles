var XBubbles =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var events = __webpack_require__(1);
	var drag = __webpack_require__(25);
	var bubble = __webpack_require__(4);
	var bubbleset = __webpack_require__(10);

	var XBubbles = Object.create(HTMLElement.prototype, {
	    createdCallback: {
	        value: function value() {
	            this.setAttribute('contenteditable', 'true');
	            this.setAttribute('spellcheck', 'false');
	        }
	    },

	    attachedCallback: {
	        value: function value() {
	            this.addEventListener('blur', events.blur);
	            this.addEventListener('click', events.click);
	            this.addEventListener('dblclick', events.dblclick);
	            this.addEventListener('focus', events.focus);
	            this.addEventListener('keydown', events.keydown);
	            this.addEventListener('keypress', events.keypress);
	            this.addEventListener('paste', events.paste);

	            drag.init(this);

	            bubble.bubbling(this);
	        }
	    },

	    detachedCallback: {
	        value: function value() {
	            this.removeEventListener('blur', events.blur);
	            this.removeEventListener('click', events.click);
	            this.removeEventListener('dblclick', events.dblclick);
	            this.removeEventListener('focus', events.focus);
	            this.removeEventListener('keydown', events.keydown);
	            this.removeEventListener('keypress', events.keypress);
	            this.removeEventListener('paste', events.paste);

	            drag.destroy(this);
	        }
	    },

	    attributeChangedCallback: {
	        value: function value() {} // name, previousValue, value
	    },

	    options: {
	        value: function value(name, _value) {
	            if (!this._options) {
	                this._options = _extends({
	                    classBubble: 'bubble',
	                    draggable: true,
	                    separator: /[,]/,
	                    ending: null, // /\@ya\.ru/g;
	                    begining: null,
	                    bubbleFormation: function bubbleFormation() {}
	                }, this.dataset);
	            }

	            if (typeof _value !== 'undefined') {
	                this._options[name] = _value;
	            } else {
	                return this._options[name];
	            }
	        }
	    },

	    items: {
	        get: function get() {
	            return bubbleset.getBubbles(this);
	        }
	    },

	    innerText: {
	        get: function get() {
	            return '';
	        },

	        set: function set(value) {
	            while (this.firstChild) {
	                this.removeChild(this.firstChild);
	            }

	            this.appendChild(document.createTextNode(value));
	        }
	    },

	    innerHTML: {
	        get: function get() {
	            return '';
	        },

	        set: function set(value) {
	            while (this.firstChild) {
	                this.removeChild(this.firstChild);
	            }

	            this.appendChild(document.createTextNode(value));
	        }
	    },

	    appendChild: {
	        value: function value() {
	            var out = HTMLElement.prototype.appendChild.apply(this, arguments);
	            bubble.bubbling(this);
	            return out;
	        }
	    }
	});

	module.exports = document.registerElement('x-bubbles', {
	    extends: 'div',
	    prototype: XBubbles
	});

	module.exports = XBubbles;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.backSpace = __webpack_require__(2);
	exports.paste = __webpack_require__(12);
	exports.arrowLeft = __webpack_require__(13);
	exports.arrowRight = __webpack_require__(14);
	exports.arrowBottom = __webpack_require__(15);
	exports.arrowTop = __webpack_require__(16);
	exports.tab = __webpack_require__(17);
	exports.selectAll = __webpack_require__(18);
	exports.dblclick = __webpack_require__(19);
	exports.click = __webpack_require__(20);
	exports.focus = __webpack_require__(21);
	exports.blur = __webpack_require__(22);
	exports.keypress = __webpack_require__(23);
	exports.keydown = __webpack_require__(24);

	exports.EV_BUBBLING = 'bubbling';

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(3);
	var bubble = __webpack_require__(4);
	var cursor = __webpack_require__(8);
	var select = __webpack_require__(9);
	var text = __webpack_require__(11);
	var bubbleset = __webpack_require__(10);

	module.exports = function (event) {
	    event.preventDefault();

	    var nodeSet = bubbleset.closestNodeSet(event.currentTarget);

	    if (!nodeSet) {
	        return;
	    }

	    nodeSet.normalize();

	    var selection = context.getSelection();
	    if (!selection) {
	        return;
	    }

	    if (selection.isCollapsed) {
	        if (text.arrowLeft(selection, true)) {
	            text.remove(selection);
	            return;
	        }
	    } else {
	        text.remove(selection);
	        return;
	    }

	    var node = bubbleset.findBubbleLeft(selection);
	    if (node) {
	        select.uniq(node);
	        return;
	    }

	    var list = select.get(nodeSet);

	    if (list.length) {
	        var prevBubble = list[0].previousSibling;
	        var nextBubble = list[list.length - 1].nextSibling;
	        list.forEach(function (item) {
	            return item.parentNode.removeChild(item);
	        });

	        if (bubble.isBubbleNode(prevBubble)) {
	            select.uniq(prevBubble);
	        } else if (bubble.isBubbleNode(nextBubble)) {
	            select.uniq(nextBubble);
	        } else {
	            nodeSet.focus();
	            cursor.restore(nodeSet);
	        }
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	    /* eslint no-eval: 0 */
	    return this || (1, eval)('this');
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var zws = __webpack_require__(5);

	var _require = __webpack_require__(6);

	var dispatch = _require.dispatch;

	var _require2 = __webpack_require__(1);

	var EV_BUBBLING = _require2.EV_BUBBLING;


	exports.isBubbleNode = isBubbleNode;
	exports.bubbling = bubbling;

	function isBubbleNode(node) {
	    if (!node || node.nodeType !== Node.ELEMENT_NODE) {
	        return false;
	    }

	    return node.hasAttribute('bubble');
	}

	function bubbling(nodeSet) {
	    var classBubble = nodeSet.options('classBubble');
	    var bubbleFormation = nodeSet.options('bubbleFormation');
	    var draggable = nodeSet.options('draggable');
	    var separator = nodeSet.options('separator');
	    var ending = nodeSet.options('ending');
	    var begining = nodeSet.options('begining');
	    var ranges = getBubbleRanges(nodeSet);
	    var nodes = [];

	    ranges.forEach(function (range) {
	        var text = zws.textClean(range.toString());

	        if (!text) {
	            range.deleteContents();
	            return;
	        }

	        var textParts = [text];

	        if (separator) {
	            textParts = text.split(separator).map(trimIterator).filter(nonEmptyIterator);
	        }

	        if (ending) {
	            textParts = textParts.reduce(function (parts, str) {
	                return parts.concat(parseFragmentByEnding(str, ending));
	            }, []).map(trimIterator).filter(nonEmptyIterator);
	        } else if (begining) {
	            textParts = textParts.reduce(function (parts, str) {
	                return parts.concat(parseFragmentByBeginning(str, begining));
	            }, []).map(trimIterator).filter(nonEmptyIterator);
	        }

	        if (!textParts.length) {
	            range.deleteContents();
	        }

	        var fragment = document.createDocumentFragment();

	        textParts.forEach(function (textPart) {
	            var wrap = document.createElement('span');
	            wrap.innerText = textPart;

	            if (draggable) {
	                wrap.setAttribute('draggable', 'true');
	            }

	            bubbleFormation(wrap);

	            wrap.classList.add(classBubble);
	            wrap.setAttribute('bubble', '');
	            wrap.setAttribute('contenteditable', 'false');

	            fragment.appendChild(wrap);
	            nodes.push(wrap);
	        });

	        range.deleteContents();
	        range.insertNode(fragment);
	    });

	    if (nodes.length) {
	        dispatch(nodeSet, EV_BUBBLING, {
	            bubbles: false,
	            cancelable: false,
	            detail: { data: nodes }
	        });
	    }

	    return nodes;
	}

	function getBubbleRanges(set) {
	    var i = void 0;
	    var rng = void 0;
	    var node = void 0;
	    var ranges = [];
	    var children = set.childNodes;

	    for (i = 0; i < children.length; i++) {
	        node = children[i];

	        if (isBubbleNode(node)) {
	            if (rng) {
	                rng.setEndBefore(node);
	                ranges.push(rng);
	                rng = undefined;
	            }
	        } else {
	            if (!rng) {
	                rng = document.createRange();
	                rng.setStartBefore(node);
	            }
	        }
	    }

	    if (rng) {
	        rng.setEndAfter(node);
	        ranges.push(rng);
	    }

	    return ranges;
	}

	function trimIterator(str) {
	    return str.trim();
	}

	function nonEmptyIterator(str) {
	    return Boolean(str);
	}

	function parseFragmentByEnding(str, reg) {
	    var parts = [];
	    var lastIndex = 0;
	    var loop = 999;

	    reg.lastIndex = 0;
	    while (reg.exec(str) !== null && loop) {
	        loop--;
	        parts.push(str.substring(lastIndex, reg.lastIndex));
	        lastIndex = reg.lastIndex;
	    }

	    return parts;
	}

	function parseFragmentByBeginning(str, reg) {
	    var parts = [];
	    var res = void 0;
	    var index = 0;
	    var loop = 999;

	    reg.lastIndex = 0;
	    while ((res = reg.exec(str)) !== null && loop) {
	        loop--;
	        if (index !== res.index) {
	            parts.push(str.substring(index, res.index));
	            index = res.index;
	        }
	    }

	    parts.push(str.substring(index, str.length));
	    return parts;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	/* eslint-disable max-len */
	var REG_REPLACE_NON_PRINTABLE = /[\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g;
	var REG_ZWS = /\u200B/;
	var TEXT_ZWS = '​';

	exports.textClean = function (text) {
	    return String(text || '').trim().replace(REG_REPLACE_NON_PRINTABLE, '');
	};

	exports.check = function (text) {
	    return REG_ZWS.test(text);
	};

	exports.createElement = function () {
	    return document.createTextNode(TEXT_ZWS);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @module x-bubbles/event
	 */

	var context = __webpack_require__(3);
	var CustomEventCommon = __webpack_require__(7);

	/**
	 * Designer events.
	 *
	 * @example
	 * const { Custom } = require('event');
	 *
	 * new Custom('custom-event', {
	 *     bubbles: true,
	 *     cancelable: true,
	 *     detail: { data: '123' }
	 * })
	 *
	 * @alias module:x-bubbles/event~Custom
	 * @constructor
	 */
	var Custom = function () {
	    if (typeof context.CustomEvent === 'function') {
	        return context.CustomEvent;
	    }

	    return CustomEventCommon;
	}();

	/**
	 * Dispatch event.
	 *
	 * @example
	 * const { dispatch } = require('event');
	 * dispatch(node, 'custom-event', {
	 *     bubbles: true,
	 *     cancelable: true,
	 *     detail: { data: '123' }
	 * })
	 *
	 * @alias module:x-bubbles/event.dispatch
	 * @param {HTMLElement} element node events
	 * @param {string} name event name
	 * @param {Object} params the event parameters
	 * @param {boolean} [params.bubbles=false]
	 * @param {boolean} [params.cancelable=false]
	 * @param {*} [params.detail]
	 */
	function dispatch(element, name, params) {
	    element.dispatchEvent(new Custom(name, params || {}));
	}

	/**
	 * Forwarding events
	 *
	 * @example
	 * const { forwardingEvents } = require('event');
	 * forwardingEvents('custom-event', fromNode, toNode, false);
	 *
	 * @param {string} name event name
	 * @param {HTMLElement} fromElement
	 * @param {HTMLElement} toElement
	 * @param {boolean} [capture=false]
	 * @returns {function} callback
	 */
	function forwardingEvents(name, fromElement, toElement) {
	    var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	    var callback = function callback(event) {
	        dispatch(toElement, name, {
	            bubbles: event.bubbles,
	            cancelable: event.cancelable,
	            detail: event.detail
	        });
	    };

	    callback.cancel = function () {
	        fromElement.removeEventListener(name, callback, capture);
	    };

	    fromElement.addEventListener(name, callback, capture);

	    return callback;
	}

	exports.Custom = Custom;
	exports.dispatch = dispatch;
	exports.forwardingEvents = forwardingEvents;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(3);

	/**
	 * @constant {Document}
	 * @private
	 */
	var doc = context.document;

	/**
	 * @constant {Object}
	 * @private
	 */
	var protoEvent = context.Event.prototype;

	var issetCustomEvent = false;

	try {
	    issetCustomEvent = Boolean(doc.createEvent('CustomEvent'));
	} catch (e) {}
	// do nothing


	/**
	 * The original function "stopImmediatePropagation"
	 * @constant {function}
	 * @private
	 */
	var stopImmediatePropagation = protoEvent.stopImmediatePropagation;

	/**
	 * Override function to set properties "immediatePropagationStopped"
	 */
	protoEvent.stopImmediatePropagation = function () {
	    this.immediatePropagationStopped = true;

	    if (stopImmediatePropagation) {
	        stopImmediatePropagation.call(this);
	    } else {
	        this.stopPropagation();
	    }
	};

	var CustomEventCommon = function () {
	    if (issetCustomEvent) {
	        return function (eventName, params) {
	            params = params || {};

	            var bubbles = Boolean(params.bubbles);
	            var cancelable = Boolean(params.cancelable);
	            var evt = doc.createEvent('CustomEvent');

	            evt.initCustomEvent(eventName, bubbles, cancelable, params.detail);

	            return evt;
	        };
	    }

	    return function (eventName, params) {
	        params = params || {};

	        var bubbles = Boolean(params.bubbles);
	        var cancelable = Boolean(params.cancelable);
	        var evt = doc.createEvent('Event');

	        evt.initEvent(eventName, bubbles, cancelable);
	        evt.detail = params.detail;

	        return evt;
	    };
	}();

	CustomEventCommon.prototype = protoEvent;

	module.exports = CustomEventCommon;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(3);
	var zws = __webpack_require__(5);
	var select = __webpack_require__(9);

	exports.restore = function (node) {
	    select.clear(node);
	    var fakeText = zws.createElement();

	    if (node.hasChildNodes()) {
	        var lastNode = node.childNodes[node.childNodes.length - 1];

	        if (lastNode.isEqualNode(fakeText)) {
	            fakeText = lastNode;
	        } else {
	            node.appendChild(fakeText);
	        }
	    } else {
	        node.appendChild(fakeText);
	    }

	    var sel = context.getSelection();
	    sel.removeAllRanges();
	    sel.collapse(fakeText, 1);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(3);
	var bubble = __webpack_require__(4);
	var bubbleset = __webpack_require__(10);

	var slice = Array.prototype.slice;
	var PATH_SELECTED = '[bubble][selected]';
	var PATH_NOT_SELECTED = '[bubble]:not([selected])';

	exports.all = all;
	exports.add = add;
	exports.clear = clear;
	exports.get = get;
	exports.uniq = uniq;
	exports.head = head;
	exports.last = last;
	exports.has = has;
	exports.range = range;
	exports.toggleUniq = toggleUniq;

	function range(node) {
	    if (!bubble.isBubbleNode(node)) {
	        return;
	    }

	    var set = node.parentNode;
	    var list = get(set);

	    if (!list.length) {
	        uniq(node);
	        return;
	    }

	    clear(set);

	    var headList = list[0];
	    var lastList = list[list.length - 1];

	    if (headList === lastList || !set.startRangeSelect) {
	        set.startRangeSelect = headList;
	    }

	    var fromNode = void 0;
	    var toNode = void 0;
	    var position = node.compareDocumentPosition(set.startRangeSelect);

	    if (position & Node.DOCUMENT_POSITION_PRECEDING) {
	        fromNode = set.startRangeSelect;
	        toNode = node;
	    } else {
	        fromNode = node;
	        toNode = set.startRangeSelect;
	    }

	    if (fromNode && toNode) {
	        var item = fromNode;

	        while (item) {
	            if (!setSelected(item)) {
	                break;
	            }

	            if (item === toNode) {
	                break;
	            }

	            item = item.nextSibling;
	        }

	        bubble.bubbling(set);
	    }
	}

	function all(nodeSet) {
	    slice.call(nodeSet.querySelectorAll(PATH_NOT_SELECTED)).forEach(function (item) {
	        return setSelected(item);
	    });
	    nodeSet.startRangeSelect = nodeSet.querySelector(PATH_SELECTED);

	    bubble.bubbling(nodeSet);

	    var selection = context.getSelection();
	    selection && selection.removeAllRanges();
	}

	function has(nodeSet) {
	    return Boolean(nodeSet.querySelector(PATH_SELECTED));
	}

	function head(set) {
	    return get(set)[0];
	}

	function last(set) {
	    var list = get(set);
	    return list[list.length - 1];
	}

	function get(nodeSet) {
	    return slice.call(nodeSet.querySelectorAll(PATH_SELECTED));
	}

	function clear(nodeSet) {
	    get(nodeSet).forEach(function (item) {
	        return item.removeAttribute('selected');
	    });
	}

	function add(node) {
	    if (setSelected(node)) {
	        var nodeSet = bubbleset.closestNodeSet(node);

	        nodeSet.startRangeSelect = node;
	        // ???
	        bubble.bubbling(nodeSet);

	        return true;
	    }

	    return false;
	}

	function uniq(node) {
	    if (!bubble.isBubbleNode(node)) {
	        return false;
	    }

	    var nodeSet = bubbleset.closestNodeSet(node);
	    var selection = context.getSelection();

	    selection && selection.removeAllRanges();
	    clear(nodeSet);

	    return add(node);
	}

	function toggleUniq(node) {
	    if (isSelected(node)) {
	        var nodeSet = bubbleset.closestNodeSet(node);

	        if (get(nodeSet).length === 1) {
	            return removeSelected(node);
	        }
	    }

	    return uniq(node);
	}

	function isSelected(node) {
	    return bubble.isBubbleNode(node) && node.hasAttribute('selected') || false;
	}

	function setSelected(node) {
	    if (bubble.isBubbleNode(node)) {
	        node.setAttribute('selected', '');
	        return true;
	    }

	    return false;
	}

	function removeSelected(node) {
	    if (bubble.isBubbleNode(node)) {
	        node.removeAttribute('selected');
	        return true;
	    }

	    return false;
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bubble = __webpack_require__(4);
	var zws = __webpack_require__(5);
	var context = __webpack_require__(3);

	var slice = Array.prototype.slice;

	exports.lastBubble = function (nodeSet) {
	    return nodeSet.querySelector('[bubble]:last-child');
	};

	exports.headBubble = function (nodeSet) {
	    return nodeSet.querySelector('[bubble]:first-child');
	};

	exports.getBubbles = function (nodeSet) {
	    return slice.call(nodeSet.querySelectorAll('[bubble]'));
	};

	exports.closestNodeSet = closestNodeSet;
	exports.closestNodeBubble = closestNodeBubble;

	exports.findBubbleLeft = function (selection) {
	    selection = selection || context.getSelection();

	    if (!selection || !selection.focusNode) {
	        return;
	    }

	    var node = selection.focusNode.previousSibling;

	    while (node) {
	        if (bubble.isBubbleNode(node)) {
	            return node;
	        }

	        if (node.nodeType === Node.TEXT_NODE && zws.textClean(node.nodeValue)) {
	            return;
	        }

	        node = node.previousSibling;
	    }
	};

	function closestNodeSet(node) {
	    while (node) {
	        if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute('is') === 'x-bubbles') {

	            return node;
	        }

	        node = node.parentNode;
	    }
	}

	function closestNodeBubble(node) {
	    while (node) {
	        if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('bubble')) {

	            return node;
	        }

	        node = node.parentNode;
	    }
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(3);
	var zws = __webpack_require__(5);

	exports.arrowRight = arrowRight;
	exports.arrowLeft = arrowLeft;
	exports.remove = remove;

	function remove(selection) {
	    selection = selection || context.getSelection();

	    if (!selection || selection.isCollapsed) {
	        return false;
	    }

	    var len = selection.rangeCount;

	    for (var i = 0; i < len; i++) {
	        selection.getRangeAt(i).deleteContents();
	    }

	    var fakeText = zws.createElement();
	    var range = selection.getRangeAt(0);
	    range.insertNode(fakeText);
	    range.collapse();

	    selection.removeAllRanges();
	    selection.addRange(range);

	    return true;
	}

	function arrowLeft(selection, extend) {
	    selection = selection || context.getSelection();

	    if (!selection) {
	        return false;
	    }

	    if (!selection.anchorNode || selection.anchorNode.nodeType !== Node.TEXT_NODE) {
	        return false;
	    }

	    if (!selection.isCollapsed && !extend) {
	        var node = selection.anchorNode;
	        var _offset = selection.anchorOffset;

	        if (selection.anchorNode === selection.focusNode) {
	            _offset = Math.min(selection.anchorOffset, selection.focusOffset);
	        } else {
	            var position = selection.anchorNode.compareDocumentPosition(selection.focusNode);
	            if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
	                _offset = selection.focusOffset;
	                node = selection.focusNode;
	            }
	        }

	        selection.collapse(node, _offset);
	        return true;
	    }

	    var item = selection.focusNode;
	    var offset = selection.focusOffset;

	    while (item) {
	        if (item.nodeType !== Node.TEXT_NODE) {
	            return false;
	        }

	        if (offset === null) {
	            offset = item.nodeValue.length;
	        }

	        if (offset - 1 < 0) {
	            item = item.previousSibling;
	            offset = null;
	            continue;
	        }

	        var text = item.nodeValue.substring(offset - 1, offset);

	        if (zws.check(text)) {
	            offset = offset - 1;
	            continue;
	        }

	        break;
	    }

	    if (!item || offset === null) {
	        return false;
	    }

	    if (extend) {
	        selection.extend(item, offset - 1);
	    } else {
	        selection.collapse(item, offset - 1);
	    }

	    return true;
	}

	function arrowRight(selection, extend) {
	    selection = selection || context.getSelection();

	    if (!selection) {
	        return false;
	    }

	    if (!selection.focusNode || selection.focusNode.nodeType !== Node.TEXT_NODE) {
	        return false;
	    }

	    if (!selection.isCollapsed && !extend) {
	        var node = selection.focusNode;
	        var _offset2 = selection.focusOffset;

	        if (selection.focusNode === selection.anchorNode) {
	            _offset2 = Math.max(selection.focusOffset, selection.anchorOffset);
	        } else {
	            var position = selection.anchorNode.compareDocumentPosition(selection.focusNode);
	            if (position & Node.DOCUMENT_POSITION_PRECEDING) {
	                _offset2 = selection.anchorOffset;
	                node = selection.anchorNode;
	            }
	        }

	        selection.collapse(node, _offset2);
	        return true;
	    }

	    var item = selection.focusNode;
	    var offset = selection.focusOffset;

	    while (item) {
	        if (item.nodeType !== Node.TEXT_NODE) {
	            return false;
	        }

	        var len = item.nodeValue.length;

	        if (offset + 1 > len) {
	            item = item.nextSibling;
	            offset = 0;
	            continue;
	        }

	        var text = item.nodeValue.substring(offset, offset + 1);

	        if (zws.check(text)) {
	            offset = offset + 1;
	            continue;
	        }

	        break;
	    }

	    if (!item) {
	        return false;
	    }

	    if (extend) {
	        selection.extend(item, offset + 1);
	    } else {
	        selection.collapse(item, offset + 1);
	    }

	    return true;
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(3);
	var zws = __webpack_require__(5);

	var slice = Array.prototype.slice;

	module.exports = function (event) {
	    event.preventDefault();

	    var clipboardData = event.clipboardData;

	    if (!clipboardData) {
	        return;
	    }

	    var data = clipboardData.getData && clipboardData.getData('text/plain');

	    if (!pasteString(data) && clipboardData.items) {
	        slice.call(clipboardData.items).filter(function (item) {
	            return item.kind === 'string' && item.type === 'text/plain';
	        }).some(function (item) {
	            item.getAsString(pasteString);
	            return true;
	        });
	    }
	};

	function pasteString(data) {
	    data = zws.textClean(data);
	    if (!data) {
	        return false;
	    }

	    var sel = context.getSelection();
	    if (!sel || !sel.rangeCount) {
	        return false;
	    }

	    var anchor = document.createElement('span');
	    var text = document.createTextNode(data);

	    sel.getRangeAt(0).surroundContents(anchor);
	    anchor.parentNode.replaceChild(text, anchor);
	    sel.removeAllRanges();
	    sel.collapse(text, text.nodeValue.length);

	    return true;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(3);
	var bubble = __webpack_require__(4);
	var select = __webpack_require__(9);
	var text = __webpack_require__(11);
	var bubbleset = __webpack_require__(10);

	module.exports = function (event) {
	    event.preventDefault();

	    var selection = context.getSelection();

	    if (text.arrowLeft(selection, event.shiftKey)) {
	        return;
	    }

	    if (selection.anchorNode && selection.anchorNode.nodeType === Node.TEXT_NODE) {
	        var nodeBubble = prevBubble(selection.anchorNode);
	        nodeBubble && select.uniq(nodeBubble);
	        return;
	    }

	    var nodeSet = bubbleset.closestNodeSet(event.currentTarget);

	    if (!nodeSet) {
	        return;
	    }

	    var list = select.get(nodeSet);
	    var begin = list.length > 1 && list[0] === nodeSet.startRangeSelect ? list[list.length - 1] : list[0];

	    var node = prevBubble(begin);

	    if (node) {
	        if (event.shiftKey) {
	            select.range(node);
	        } else {
	            select.uniq(node);
	        }
	    }
	};

	function prevBubble(target) {
	    var node = target && target.previousSibling;
	    while (node) {
	        if (bubble.isBubbleNode(node)) {
	            return node;
	        }

	        node = node.previousSibling;
	    }
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(3);
	var bubble = __webpack_require__(4);
	var cursor = __webpack_require__(8);
	var select = __webpack_require__(9);
	var text = __webpack_require__(11);
	var bubbleset = __webpack_require__(10);

	module.exports = function (event) {
	    event.preventDefault();

	    var selection = context.getSelection();

	    if (text.arrowRight(selection, event.shiftKey)) {
	        return;
	    }

	    if (selection.focusNode && selection.focusNode.nodeType === Node.TEXT_NODE) {
	        var nodeBubble = nextBubble(selection.focusNode);
	        nodeBubble && select.uniq(nodeBubble);
	        return;
	    }

	    var nodeSet = bubbleset.closestNodeSet(event.currentTarget);

	    if (!nodeSet) {
	        return;
	    }

	    var list = select.get(nodeSet);
	    var begin = list.length > 1 && list[list.length - 1] === nodeSet.startRangeSelect ? list[0] : list[list.length - 1];

	    var node = nextBubble(begin);

	    if (node) {
	        if (event.shiftKey) {
	            select.range(node);
	        } else {
	            select.uniq(node);
	        }
	    } else if (begin && begin.nextSibling && begin.nextSibling.nodeType === Node.TEXT_NODE) {
	        select.clear(nodeSet);
	        selection.collapse(begin.nextSibling, 0);
	    } else {
	        cursor.restore(nodeSet);
	    }
	};

	function nextBubble(target) {
	    var node = target && target.nextSibling;
	    while (node) {
	        if (bubble.isBubbleNode(node)) {
	            return node;
	        }

	        node = node.nextSibling;
	    }
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var select = __webpack_require__(9);
	var cursor = __webpack_require__(8);

	module.exports = function (event) {
	    var nodeSet = event.currentTarget;

	    if (select.has(nodeSet)) {
	        event.preventDefault();
	        cursor.restore(nodeSet);
	    }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bubbleset = __webpack_require__(10);
	var select = __webpack_require__(9);

	module.exports = function (event) {
	    event.preventDefault();

	    var nodeSet = bubbleset.closestNodeSet(event.currentTarget);
	    var headBubble = nodeSet && bubbleset.headBubble(nodeSet);

	    if (headBubble) {
	        select.uniq(headBubble);
	    }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var select = __webpack_require__(9);
	var cursor = __webpack_require__(8);

	module.exports = function (event) {
	    var nodeSet = event.currentTarget;
	    if (select.has(nodeSet)) {
	        event.preventDefault();
	        cursor.restore(nodeSet);
	    }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(3);
	var zws = __webpack_require__(5);

	module.exports = function (event) {
	    event.preventDefault();

	    var nodeSet = event.currentTarget;
	    var selection = context.getSelection();
	    var node = selection && selection.anchorNode;
	    var hasBubble = Boolean(nodeSet.querySelector('[bubble]'));

	    if (node && node.nodeType === Node.TEXT_NODE) {
	        var fromNode = void 0;
	        var toNode = void 0;
	        var item = node;

	        while (item && item.nodeType === Node.TEXT_NODE) {
	            fromNode = item;
	            item = item.previousSibling;
	        }

	        item = node;

	        while (item && item.nodeType === Node.TEXT_NODE) {
	            toNode = item;
	            item = item.nextSibling;
	        }

	        var range = document.createRange();
	        range.setStartBefore(fromNode);
	        range.setEndAfter(toNode);

	        var text = zws.textClean(range.toString());

	        if (text || !text && !hasBubble) {
	            if (!text) {
	                range.collapse();
	            }

	            selection.removeAllRanges();
	            selection.addRange(range);
	            return true;
	        }
	    }

	    return false;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var context = __webpack_require__(3);
	var zws = __webpack_require__(5);
	var bubbleset = __webpack_require__(10);

	module.exports = function (event) {
	    var nodeSet = bubbleset.closestNodeSet(event.target);

	    if (!nodeSet) {
	        return;
	    }

	    var nodeBubble = bubbleset.closestNodeBubble(event.target);

	    if (!nodeBubble) {
	        return;
	    }

	    event.preventDefault();

	    var fakeText = zws.createElement();
	    var text = document.createTextNode(zws.textClean(nodeBubble.innerText));

	    nodeSet.replaceChild(text, nodeBubble);
	    nodeSet.insertBefore(fakeText, text);

	    var selection = context.getSelection();

	    if (selection) {
	        var range = document.createRange();
	        range.setStartBefore(fakeText);
	        range.setEndAfter(text);

	        selection.removeAllRanges();
	        selection.addRange(range);
	    }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bubbleset = __webpack_require__(10);
	var select = __webpack_require__(9);

	module.exports = function (event) {
	    var nodeSet = bubbleset.closestNodeSet(event.target);

	    if (!nodeSet) {
	        return;
	    }

	    var nodeBubble = bubbleset.closestNodeBubble(event.target);

	    if (!nodeBubble) {
	        select.clear(nodeSet);
	        return;
	    }

	    if (event.metaKey) {
	        select.add(nodeBubble);
	    } else if (event.shiftKey) {
	        if (!nodeSet.startRangeSelect) {
	            select.uniq(nodeBubble);
	        } else {
	            select.range(nodeBubble);
	        }
	    } else {
	        select.toggleUniq(nodeBubble);
	    }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cursor = __webpack_require__(8);

	module.exports = function (event) {
	    cursor.restore(event.currentTarget);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bubble = __webpack_require__(4);
	var select = __webpack_require__(9);

	module.exports = function (event) {
	    bubble.bubbling(event.currentTarget);
	    select.clear(event.currentTarget);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bubbleset = __webpack_require__(10);
	var bubble = __webpack_require__(4);
	var cursor = __webpack_require__(8);

	module.exports = function (event) {
	    var code = event.charCode || event.keyCode;

	    /* eslint no-case-declarations: 0 */
	    switch (code) {
	        case 13: // Enter
	        case 44: // ,
	        case 59:
	            // ;
	            event.preventDefault();

	            var nodeSet = bubbleset.closestNodeSet(event.currentTarget);

	            if (!nodeSet) {
	                return;
	            }

	            bubble.bubbling(nodeSet);
	            cursor.restore(nodeSet);
	            break;
	    }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bubbleset = __webpack_require__(10);
	var events = __webpack_require__(1);
	var select = __webpack_require__(9);

	module.exports = function (event) {
	    var code = event.charCode || event.keyCode;

	    switch (code) {
	        case 8:
	            // Backspace
	            events.backSpace(event);
	            break;

	        case 9:
	            // Tab
	            events.tab(event);
	            break;

	        case 37:
	            // Left
	            events.arrowLeft(event);
	            break;

	        // сдвигаем курсор в начало списка
	        case 38:
	            // Top
	            events.arrowTop(event);
	            break;

	        case 39:
	            // Right
	            events.arrowRight(event);
	            break;

	        // сдвигаем курсор в конец списка
	        case 40:
	            // Bottom
	            events.arrowBottom(event);
	            break;

	        case 65:
	            // a
	            if (event.metaKey) {
	                if (!events.selectAll(event)) {
	                    var nodeSet = bubbleset.closestNodeSet(event.currentTarget);

	                    if (!nodeSet) {
	                        return;
	                    }

	                    select.all(nodeSet);
	                }
	            }
	            break;
	    }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var select = __webpack_require__(9);
	var bubble = __webpack_require__(4);
	var bubbleset = __webpack_require__(10);
	var classes = __webpack_require__(26);

	var currentDragSet = null;

	exports.init = function (nodeSet) {
	    nodeSet.addEventListener('drop', onDrop);
	    nodeSet.addEventListener('dragover', onDragover);
	    nodeSet.addEventListener('dragenter', onDragenter);
	    nodeSet.addEventListener('dragleave', onDragleave);
	    nodeSet.addEventListener('dragstart', onDragstart);
	    nodeSet.addEventListener('dragend', onDragend);
	};

	exports.destroy = function (nodeSet) {
	    nodeSet.removeEventListener('drop', onDrop);
	    nodeSet.removeEventListener('dragover', onDragover);
	    nodeSet.removeEventListener('dragenter', onDragenter);
	    nodeSet.removeEventListener('dragleave', onDragleave);
	    nodeSet.removeEventListener('dragstart', onDragstart);
	    nodeSet.removeEventListener('dragend', onDragend);
	};

	function onDragstart(event) {
	    event.stopPropagation();

	    var nodeBubble = event.target;
	    var nodeSet = bubbleset.closestNodeSet(nodeBubble);

	    if (!nodeSet || !bubble.isBubbleNode(nodeBubble)) {
	        event.preventDefault();
	        return;
	    }

	    currentDragSet = nodeSet;
	    nodeSet.classList.add(classes.DRAGSTART);
	    select.add(nodeBubble);

	    event.dataTransfer.effectAllowed = 'move';
	    event.dataTransfer.setData('text/plain', '');
	}

	function onDrop(event) {
	    event.stopPropagation();
	    event.preventDefault();

	    if (!currentDragSet) {
	        return;
	    }

	    var nodeSet = bubbleset.closestNodeSet(event.target);

	    if (!nodeSet || nodeSet === currentDragSet) {
	        return;
	    }

	    var list = select.get(currentDragSet);

	    if (!list.length) {
	        return;
	    }

	    list.forEach(function (item) {
	        return nodeSet.appendChild(item);
	    });
	    nodeSet.focus();
	}

	function onDragover(event) {
	    event.stopPropagation();
	    event.preventDefault();

	    if (!currentDragSet) {
	        return;
	    }

	    event.dataTransfer.dropEffect = 'move';
	}

	function onDragenter(event) {
	    event.stopPropagation();
	    event.preventDefault();

	    if (!currentDragSet) {
	        return;
	    }

	    var nodeSet = bubbleset.closestNodeSet(event.target);

	    if (!nodeSet || nodeSet === currentDragSet) {
	        return;
	    }

	    nodeSet.classList.add(classes.DROPZONE);
	}

	function onDragleave(event) {
	    event.stopPropagation();
	    event.preventDefault();

	    if (!currentDragSet) {
	        return;
	    }

	    var nodeSet = bubbleset.closestNodeSet(event.target);

	    if (!nodeSet || nodeSet === currentDragSet) {
	        return;
	    }

	    nodeSet.classList.remove(classes.DROPZONE);
	}

	function onDragend(event) {
	    event.stopPropagation();
	    event.preventDefault();

	    if (!currentDragSet) {
	        return;
	    }

	    currentDragSet.classList.remove(classes.DRAGSTART);

	    var nodeSet = bubbleset.closestNodeSet(event.target);

	    if (nodeSet && nodeSet !== currentDragSet) {
	        nodeSet.classList.remove(classes.DROPZONE);
	    }

	    currentDragSet = null;
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	exports.DRAGSTART = 'drag';
	exports.DROPZONE = 'dropzone';

/***/ }
/******/ ]);