var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@popperjs/core"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Tooltip = exports.Toast = exports.Tab = exports.ScrollSpy = exports.Popover = exports.Offcanvas = exports.Modal = exports.Dropdown = exports.Collapse = exports.Carousel = exports.Button = exports.Alert = void 0;
    /*!
      * Bootstrap v5.3.0 (https://getbootstrap.com/)
      * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
      * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
      */
    var Popper = __importStar(require("@popperjs/core"));
    /**
     * --------------------------------------------------------------------------
     * Bootstrap dom/data.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var elementMap = new Map();
    var Data = {
        set: function (element, key, instance) {
            if (!elementMap.has(element)) {
                elementMap.set(element, new Map());
            }
            var instanceMap = elementMap.get(element);
            // make it clear we only want one instance per element
            // can be removed later when multiple key/instances are fine to be used
            if (!instanceMap.has(key) && instanceMap.size !== 0) {
                // eslint-disable-next-line no-console
                console.error("Bootstrap doesn't allow more than one instance per element. Bound instance: ".concat(Array.from(instanceMap.keys())[0], "."));
                return;
            }
            instanceMap.set(key, instance);
        },
        get: function (element, key) {
            if (elementMap.has(element)) {
                return elementMap.get(element).get(key) || null;
            }
            return null;
        },
        remove: function (element, key) {
            if (!elementMap.has(element)) {
                return;
            }
            var instanceMap = elementMap.get(element);
            instanceMap.delete(key);
            // free up element references if there are no instances left for an element
            if (instanceMap.size === 0) {
                elementMap.delete(element);
            }
        }
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/index.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000;
    var TRANSITION_END = 'transitionend';
    /**
     * Properly escape IDs selectors to handle weird IDs
     * @param {string} selector
     * @returns {string}
     */
    var parseSelector = function (selector) {
        if (selector && window.CSS && window.CSS.escape) {
            // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
            selector = selector.replace(/#([^\s"#']+)/g, function (match, id) { return "#".concat(CSS.escape(id)); });
        }
        return selector;
    };
    // Shout-out Angus Croll (https://goo.gl/pxwQGp)
    var toType = function (object) {
        if (object === null || object === undefined) {
            return "".concat(object);
        }
        return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
    };
    /**
     * Public Util API
     */
    var getUID = function (prefix) {
        do {
            prefix += Math.floor(Math.random() * MAX_UID);
        } while (document.getElementById(prefix));
        return prefix;
    };
    var getTransitionDurationFromElement = function (element) {
        if (!element) {
            return 0;
        }
        // Get transition-duration of the element
        var _a = window.getComputedStyle(element), transitionDuration = _a.transitionDuration, transitionDelay = _a.transitionDelay;
        var floatTransitionDuration = Number.parseFloat(transitionDuration);
        var floatTransitionDelay = Number.parseFloat(transitionDelay);
        // Return 0 if element or transition duration is not found
        if (!floatTransitionDuration && !floatTransitionDelay) {
            return 0;
        }
        // If multiple durations are defined, take the first
        transitionDuration = transitionDuration.split(',')[0];
        transitionDelay = transitionDelay.split(',')[0];
        return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    };
    var triggerTransitionEnd = function (element) {
        element.dispatchEvent(new Event(TRANSITION_END));
    };
    var isElement = function (object) {
        if (!object || typeof object !== 'object') {
            return false;
        }
        if (typeof object.jquery !== 'undefined') {
            object = object[0];
        }
        return typeof object.nodeType !== 'undefined';
    };
    var getElement = function (object) {
        // it's a jQuery object or a node element
        if (isElement(object)) {
            return object.jquery ? object[0] : object;
        }
        if (typeof object === 'string' && object.length > 0) {
            return document.querySelector(parseSelector(object));
        }
        return null;
    };
    var isVisible = function (element) {
        if (!isElement(element) || element.getClientRects().length === 0) {
            return false;
        }
        var elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
        // Handle `details` element as its content may falsie appear visible when it is closed
        var closedDetails = element.closest('details:not([open])');
        if (!closedDetails) {
            return elementIsVisible;
        }
        if (closedDetails !== element) {
            var summary = element.closest('summary');
            if (summary && summary.parentNode !== closedDetails) {
                return false;
            }
            if (summary === null) {
                return false;
            }
        }
        return elementIsVisible;
    };
    var isDisabled = function (element) {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            return true;
        }
        if (element.classList.contains('disabled')) {
            return true;
        }
        if (typeof element.disabled !== 'undefined') {
            return element.disabled;
        }
        return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
    };
    var findShadowRoot = function (element) {
        if (!document.documentElement.attachShadow) {
            return null;
        }
        // Can find the shadow root otherwise it'll return the document
        if (typeof element.getRootNode === 'function') {
            var root = element.getRootNode();
            return root instanceof ShadowRoot ? root : null;
        }
        if (element instanceof ShadowRoot) {
            return element;
        }
        // when we don't find a shadow root
        if (!element.parentNode) {
            return null;
        }
        return findShadowRoot(element.parentNode);
    };
    var noop = function () { };
    /**
     * Trick to restart an element's animation
     *
     * @param {HTMLElement} element
     * @return void
     *
     * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
     */
    var reflow = function (element) {
        element.offsetHeight; // eslint-disable-line no-unused-expressions
    };
    var getjQuery = function () {
        if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
            return window.jQuery;
        }
        return null;
    };
    var DOMContentLoadedCallbacks = [];
    var onDOMContentLoaded = function (callback) {
        if (document.readyState === 'loading') {
            // add listener on the first call when the document is in loading state
            if (!DOMContentLoadedCallbacks.length) {
                document.addEventListener('DOMContentLoaded', function () {
                    for (var _i = 0, DOMContentLoadedCallbacks_1 = DOMContentLoadedCallbacks; _i < DOMContentLoadedCallbacks_1.length; _i++) {
                        var callback_1 = DOMContentLoadedCallbacks_1[_i];
                        callback_1();
                    }
                });
            }
            DOMContentLoadedCallbacks.push(callback);
        }
        else {
            callback();
        }
    };
    var isRTL = function () { return document.documentElement.dir === 'rtl'; };
    var defineJQueryPlugin = function (plugin) {
        onDOMContentLoaded(function () {
            var $ = getjQuery();
            /* istanbul ignore if */
            if ($) {
                var name_1 = plugin.NAME;
                var JQUERY_NO_CONFLICT_1 = $.fn[name_1];
                $.fn[name_1] = plugin.jQueryInterface;
                $.fn[name_1].Constructor = plugin;
                $.fn[name_1].noConflict = function () {
                    $.fn[name_1] = JQUERY_NO_CONFLICT_1;
                    return plugin.jQueryInterface;
                };
            }
        });
    };
    var execute = function (possibleCallback, args, defaultValue) {
        if (args === void 0) { args = []; }
        if (defaultValue === void 0) { defaultValue = possibleCallback; }
        return typeof possibleCallback === 'function' ? possibleCallback.apply(void 0, args) : defaultValue;
    };
    var executeAfterTransition = function (callback, transitionElement, waitForTransition) {
        if (waitForTransition === void 0) { waitForTransition = true; }
        if (!waitForTransition) {
            execute(callback);
            return;
        }
        var durationPadding = 5;
        var emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
        var called = false;
        var handler = function (_a) {
            var target = _a.target;
            if (target !== transitionElement) {
                return;
            }
            called = true;
            transitionElement.removeEventListener(TRANSITION_END, handler);
            execute(callback);
        };
        transitionElement.addEventListener(TRANSITION_END, handler);
        setTimeout(function () {
            if (!called) {
                triggerTransitionEnd(transitionElement);
            }
        }, emulatedDuration);
    };
    /**
     * Return the previous/next element of a list.
     *
     * @param {array} list    The list of elements
     * @param activeElement   The active element
     * @param shouldGetNext   Choose to get next or previous element
     * @param isCycleAllowed
     * @return {Element|elem} The proper element
     */
    var getNextActiveElement = function (list, activeElement, shouldGetNext, isCycleAllowed) {
        var listLength = list.length;
        var index = list.indexOf(activeElement);
        // if the element does not exist in the list return an element
        // depending on the direction and if cycle is allowed
        if (index === -1) {
            return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
        }
        index += shouldGetNext ? 1 : -1;
        if (isCycleAllowed) {
            index = (index + listLength) % listLength;
        }
        return list[Math.max(0, Math.min(index, listLength - 1))];
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap dom/event-handler.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
    var stripNameRegex = /\..*/;
    var stripUidRegex = /::\d+$/;
    var eventRegistry = {}; // Events storage
    var uidEvent = 1;
    var customEvents = {
        mouseenter: 'mouseover',
        mouseleave: 'mouseout'
    };
    var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
    /**
     * Private methods
     */
    function makeEventUid(element, uid) {
        return uid && "".concat(uid, "::").concat(uidEvent++) || element.uidEvent || uidEvent++;
    }
    function getElementEvents(element) {
        var uid = makeEventUid(element);
        element.uidEvent = uid;
        eventRegistry[uid] = eventRegistry[uid] || {};
        return eventRegistry[uid];
    }
    function bootstrapHandler(element, fn) {
        return function handler(event) {
            hydrateObj(event, {
                delegateTarget: element
            });
            if (handler.oneOff) {
                EventHandler.off(element, event.type, fn);
            }
            return fn.apply(element, [event]);
        };
    }
    function bootstrapDelegationHandler(element, selector, fn) {
        return function handler(event) {
            var domElements = element.querySelectorAll(selector);
            for (var target = event.target; target && target !== this; target = target.parentNode) {
                for (var _i = 0, domElements_1 = domElements; _i < domElements_1.length; _i++) {
                    var domElement = domElements_1[_i];
                    if (domElement !== target) {
                        continue;
                    }
                    hydrateObj(event, {
                        delegateTarget: target
                    });
                    if (handler.oneOff) {
                        EventHandler.off(element, event.type, selector, fn);
                    }
                    return fn.apply(target, [event]);
                }
            }
        };
    }
    function findHandler(events, callable, delegationSelector) {
        if (delegationSelector === void 0) { delegationSelector = null; }
        return Object.values(events).find(function (event) { return event.callable === callable && event.delegationSelector === delegationSelector; });
    }
    function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
        var isDelegated = typeof handler === 'string';
        // TODO: tooltip passes `false` instead of selector, so we need to check
        var callable = isDelegated ? delegationFunction : handler || delegationFunction;
        var typeEvent = getTypeEvent(originalTypeEvent);
        if (!nativeEvents.has(typeEvent)) {
            typeEvent = originalTypeEvent;
        }
        return [isDelegated, callable, typeEvent];
    }
    function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
        if (typeof originalTypeEvent !== 'string' || !element) {
            return;
        }
        var _a = normalizeParameters(originalTypeEvent, handler, delegationFunction), isDelegated = _a[0], callable = _a[1], typeEvent = _a[2];
        // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
        // this prevents the handler from being dispatched the same way as mouseover or mouseout does
        if (originalTypeEvent in customEvents) {
            var wrapFunction = function (fn) {
                return function (event) {
                    if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
                        return fn.call(this, event);
                    }
                };
            };
            callable = wrapFunction(callable);
        }
        var events = getElementEvents(element);
        var handlers = events[typeEvent] || (events[typeEvent] = {});
        var previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
        if (previousFunction) {
            previousFunction.oneOff = previousFunction.oneOff && oneOff;
            return;
        }
        var uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
        var fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
        fn.delegationSelector = isDelegated ? handler : null;
        fn.callable = callable;
        fn.oneOff = oneOff;
        fn.uidEvent = uid;
        handlers[uid] = fn;
        element.addEventListener(typeEvent, fn, isDelegated);
    }
    function removeHandler(element, events, typeEvent, handler, delegationSelector) {
        var fn = findHandler(events[typeEvent], handler, delegationSelector);
        if (!fn) {
            return;
        }
        element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
        delete events[typeEvent][fn.uidEvent];
    }
    function removeNamespacedHandlers(element, events, typeEvent, namespace) {
        var storeElementEvent = events[typeEvent] || {};
        for (var _i = 0, _a = Object.entries(storeElementEvent); _i < _a.length; _i++) {
            var _b = _a[_i], handlerKey = _b[0], event_1 = _b[1];
            if (handlerKey.includes(namespace)) {
                removeHandler(element, events, typeEvent, event_1.callable, event_1.delegationSelector);
            }
        }
    }
    function getTypeEvent(event) {
        // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
        event = event.replace(stripNameRegex, '');
        return customEvents[event] || event;
    }
    var EventHandler = {
        on: function (element, event, handler, delegationFunction) {
            addHandler(element, event, handler, delegationFunction, false);
        },
        one: function (element, event, handler, delegationFunction) {
            addHandler(element, event, handler, delegationFunction, true);
        },
        off: function (element, originalTypeEvent, handler, delegationFunction) {
            if (typeof originalTypeEvent !== 'string' || !element) {
                return;
            }
            var _a = normalizeParameters(originalTypeEvent, handler, delegationFunction), isDelegated = _a[0], callable = _a[1], typeEvent = _a[2];
            var inNamespace = typeEvent !== originalTypeEvent;
            var events = getElementEvents(element);
            var storeElementEvent = events[typeEvent] || {};
            var isNamespace = originalTypeEvent.startsWith('.');
            if (typeof callable !== 'undefined') {
                // Simplest case: handler is passed, remove that listener ONLY.
                if (!Object.keys(storeElementEvent).length) {
                    return;
                }
                removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
                return;
            }
            if (isNamespace) {
                for (var _i = 0, _b = Object.keys(events); _i < _b.length; _i++) {
                    var elementEvent = _b[_i];
                    removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
                }
            }
            for (var _c = 0, _d = Object.entries(storeElementEvent); _c < _d.length; _c++) {
                var _e = _d[_c], keyHandlers = _e[0], event_2 = _e[1];
                var handlerKey = keyHandlers.replace(stripUidRegex, '');
                if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
                    removeHandler(element, events, typeEvent, event_2.callable, event_2.delegationSelector);
                }
            }
        },
        trigger: function (element, event, args) {
            if (typeof event !== 'string' || !element) {
                return null;
            }
            var $ = getjQuery();
            var typeEvent = getTypeEvent(event);
            var inNamespace = event !== typeEvent;
            var jQueryEvent = null;
            var bubbles = true;
            var nativeDispatch = true;
            var defaultPrevented = false;
            if (inNamespace && $) {
                jQueryEvent = $.Event(event, args);
                $(element).trigger(jQueryEvent);
                bubbles = !jQueryEvent.isPropagationStopped();
                nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
                defaultPrevented = jQueryEvent.isDefaultPrevented();
            }
            var evt = hydrateObj(new Event(event, {
                bubbles: bubbles,
                cancelable: true
            }), args);
            if (defaultPrevented) {
                evt.preventDefault();
            }
            if (nativeDispatch) {
                element.dispatchEvent(evt);
            }
            if (evt.defaultPrevented && jQueryEvent) {
                jQueryEvent.preventDefault();
            }
            return evt;
        }
    };
    function hydrateObj(obj, meta) {
        if (meta === void 0) { meta = {}; }
        var _loop_1 = function (key, value) {
            try {
                obj[key] = value;
            }
            catch (_unused) {
                Object.defineProperty(obj, key, {
                    configurable: true,
                    get: function () {
                        return value;
                    }
                });
            }
        };
        for (var _i = 0, _a = Object.entries(meta); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            _loop_1(key, value);
        }
        return obj;
    }
    /**
     * --------------------------------------------------------------------------
     * Bootstrap dom/manipulator.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    function normalizeData(value) {
        if (value === 'true') {
            return true;
        }
        if (value === 'false') {
            return false;
        }
        if (value === Number(value).toString()) {
            return Number(value);
        }
        if (value === '' || value === 'null') {
            return null;
        }
        if (typeof value !== 'string') {
            return value;
        }
        try {
            return JSON.parse(decodeURIComponent(value));
        }
        catch (_unused) {
            return value;
        }
    }
    function normalizeDataKey(key) {
        return key.replace(/[A-Z]/g, function (chr) { return "-".concat(chr.toLowerCase()); });
    }
    var Manipulator = {
        setDataAttribute: function (element, key, value) {
            element.setAttribute("data-bs-".concat(normalizeDataKey(key)), value);
        },
        removeDataAttribute: function (element, key) {
            element.removeAttribute("data-bs-".concat(normalizeDataKey(key)));
        },
        getDataAttributes: function (element) {
            if (!element) {
                return {};
            }
            var attributes = {};
            var bsKeys = Object.keys(element.dataset).filter(function (key) { return key.startsWith('bs') && !key.startsWith('bsConfig'); });
            for (var _i = 0, bsKeys_1 = bsKeys; _i < bsKeys_1.length; _i++) {
                var key = bsKeys_1[_i];
                var pureKey = key.replace(/^bs/, '');
                pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
                attributes[pureKey] = normalizeData(element.dataset[key]);
            }
            return attributes;
        },
        getDataAttribute: function (element, key) {
            return normalizeData(element.getAttribute("data-bs-".concat(normalizeDataKey(key))));
        }
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/config.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Class definition
     */
    var Config = /** @class */ (function () {
        function Config() {
        }
        Object.defineProperty(Config, "Default", {
            // Getters
            get: function () {
                return {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Config, "DefaultType", {
            get: function () {
                return {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Config, "NAME", {
            get: function () {
                throw new Error('You have to implement the static method "NAME", for each component!');
            },
            enumerable: false,
            configurable: true
        });
        Config.prototype._getConfig = function (config) {
            config = this._mergeConfigObj(config);
            config = this._configAfterMerge(config);
            this._typeCheckConfig(config);
            return config;
        };
        Config.prototype._configAfterMerge = function (config) {
            return config;
        };
        Config.prototype._mergeConfigObj = function (config, element) {
            var jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse
            return __assign(__assign(__assign(__assign({}, this.constructor.Default), (typeof jsonConfig === 'object' ? jsonConfig : {})), (isElement(element) ? Manipulator.getDataAttributes(element) : {})), (typeof config === 'object' ? config : {}));
        };
        Config.prototype._typeCheckConfig = function (config, configTypes) {
            if (configTypes === void 0) { configTypes = this.constructor.DefaultType; }
            for (var _i = 0, _a = Object.entries(configTypes); _i < _a.length; _i++) {
                var _b = _a[_i], property = _b[0], expectedTypes = _b[1];
                var value = config[property];
                var valueType = isElement(value) ? 'element' : toType(value);
                if (!new RegExp(expectedTypes).test(valueType)) {
                    throw new TypeError("".concat(this.constructor.NAME.toUpperCase(), ": Option \"").concat(property, "\" provided type \"").concat(valueType, "\" but expected type \"").concat(expectedTypes, "\"."));
                }
            }
        };
        return Config;
    }());
    /**
     * --------------------------------------------------------------------------
     * Bootstrap base-component.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var VERSION = '5.3.0';
    /**
     * Class definition
     */
    var BaseComponent = /** @class */ (function (_super) {
        __extends(BaseComponent, _super);
        function BaseComponent(element, config) {
            var _this = _super.call(this) || this;
            element = getElement(element);
            if (!element) {
                return _this;
            }
            _this._element = element;
            _this._config = _this._getConfig(config);
            Data.set(_this._element, _this.constructor.DATA_KEY, _this);
            return _this;
        }
        // Public
        BaseComponent.prototype.dispose = function () {
            Data.remove(this._element, this.constructor.DATA_KEY);
            EventHandler.off(this._element, this.constructor.EVENT_KEY);
            for (var _i = 0, _a = Object.getOwnPropertyNames(this); _i < _a.length; _i++) {
                var propertyName = _a[_i];
                this[propertyName] = null;
            }
        };
        BaseComponent.prototype._queueCallback = function (callback, element, isAnimated) {
            if (isAnimated === void 0) { isAnimated = true; }
            executeAfterTransition(callback, element, isAnimated);
        };
        BaseComponent.prototype._getConfig = function (config) {
            config = this._mergeConfigObj(config, this._element);
            config = this._configAfterMerge(config);
            this._typeCheckConfig(config);
            return config;
        };
        // Static
        BaseComponent.getInstance = function (element) {
            return Data.get(getElement(element), this.DATA_KEY);
        };
        BaseComponent.getOrCreateInstance = function (element, config) {
            if (config === void 0) { config = {}; }
            return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
        };
        Object.defineProperty(BaseComponent, "VERSION", {
            get: function () {
                return VERSION;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseComponent, "DATA_KEY", {
            get: function () {
                return "bs.".concat(this.NAME);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseComponent, "EVENT_KEY", {
            get: function () {
                return ".".concat(this.DATA_KEY);
            },
            enumerable: false,
            configurable: true
        });
        BaseComponent.eventName = function (name) {
            return "".concat(name).concat(this.EVENT_KEY);
        };
        return BaseComponent;
    }(Config));
    /**
     * --------------------------------------------------------------------------
     * Bootstrap dom/selector-engine.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    var getSelector = function (element) {
        var selector = element.getAttribute('data-bs-target');
        if (!selector || selector === '#') {
            var hrefAttribute = element.getAttribute('href');
            // The only valid content that could double as a selector are IDs or classes,
            // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
            // `document.querySelector` will rightfully complain it is invalid.
            // See https://github.com/twbs/bootstrap/issues/32273
            if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
                return null;
            }
            // Just in case some CMS puts out a full URL with the anchor appended
            if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
                hrefAttribute = "#".concat(hrefAttribute.split('#')[1]);
            }
            selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
        }
        return parseSelector(selector);
    };
    var SelectorEngine = {
        find: function (selector, element) {
            if (element === void 0) { element = document.documentElement; }
            return [].concat.apply([], Element.prototype.querySelectorAll.call(element, selector));
        },
        findOne: function (selector, element) {
            if (element === void 0) { element = document.documentElement; }
            return Element.prototype.querySelector.call(element, selector);
        },
        children: function (element, selector) {
            return [].concat.apply([], element.children).filter(function (child) { return child.matches(selector); });
        },
        parents: function (element, selector) {
            var parents = [];
            var ancestor = element.parentNode.closest(selector);
            while (ancestor) {
                parents.push(ancestor);
                ancestor = ancestor.parentNode.closest(selector);
            }
            return parents;
        },
        prev: function (element, selector) {
            var previous = element.previousElementSibling;
            while (previous) {
                if (previous.matches(selector)) {
                    return [previous];
                }
                previous = previous.previousElementSibling;
            }
            return [];
        },
        // TODO: this is now unused; remove later along with prev()
        next: function (element, selector) {
            var next = element.nextElementSibling;
            while (next) {
                if (next.matches(selector)) {
                    return [next];
                }
                next = next.nextElementSibling;
            }
            return [];
        },
        focusableChildren: function (element) {
            var focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(function (selector) { return "".concat(selector, ":not([tabindex^=\"-\"])"); }).join(',');
            return this.find(focusables, element).filter(function (el) { return !isDisabled(el) && isVisible(el); });
        },
        getSelectorFromElement: function (element) {
            var selector = getSelector(element);
            if (selector) {
                return SelectorEngine.findOne(selector) ? selector : null;
            }
            return null;
        },
        getElementFromSelector: function (element) {
            var selector = getSelector(element);
            return selector ? SelectorEngine.findOne(selector) : null;
        },
        getMultipleElementsFromSelector: function (element) {
            var selector = getSelector(element);
            return selector ? SelectorEngine.find(selector) : [];
        }
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/component-functions.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    var enableDismissTrigger = function (component, method) {
        if (method === void 0) { method = 'hide'; }
        var clickEvent = "click.dismiss".concat(component.EVENT_KEY);
        var name = component.NAME;
        EventHandler.on(document, clickEvent, "[data-bs-dismiss=\"".concat(name, "\"]"), function (event) {
            if (['A', 'AREA'].includes(this.tagName)) {
                event.preventDefault();
            }
            if (isDisabled(this)) {
                return;
            }
            var target = SelectorEngine.getElementFromSelector(this) || this.closest(".".concat(name));
            var instance = component.getOrCreateInstance(target);
            // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
            instance[method]();
        });
    };
    /**
     * --------------------------------------------------------------------------
     * Bootstrap alert.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$f = 'alert';
    var DATA_KEY$a = 'bs.alert';
    var EVENT_KEY$b = ".".concat(DATA_KEY$a);
    var EVENT_CLOSE = "close".concat(EVENT_KEY$b);
    var EVENT_CLOSED = "closed".concat(EVENT_KEY$b);
    var CLASS_NAME_FADE$5 = 'fade';
    var CLASS_NAME_SHOW$8 = 'show';
    /**
     * Class definition
     */
    var Alert = /** @class */ (function (_super) {
        __extends(Alert, _super);
        function Alert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Alert, "NAME", {
            // Getters
            get: function () {
                return NAME$f;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        Alert.prototype.close = function () {
            var _this = this;
            var closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
            if (closeEvent.defaultPrevented) {
                return;
            }
            this._element.classList.remove(CLASS_NAME_SHOW$8);
            var isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
            this._queueCallback(function () { return _this._destroyElement(); }, this._element, isAnimated);
        };
        // Private
        Alert.prototype._destroyElement = function () {
            this._element.remove();
            EventHandler.trigger(this._element, EVENT_CLOSED);
            this.dispose();
        };
        // Static
        Alert.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Alert.getOrCreateInstance(this);
                if (typeof config !== 'string') {
                    return;
                }
                if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                    throw new TypeError("No method named \"".concat(config, "\""));
                }
                data[config](this);
            });
        };
        return Alert;
    }(BaseComponent));
    exports.Alert = Alert;
    /**
     * Data API implementation
     */
    enableDismissTrigger(Alert, 'close');
    /**
     * jQuery
     */
    defineJQueryPlugin(Alert);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap button.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$e = 'button';
    var DATA_KEY$9 = 'bs.button';
    var EVENT_KEY$a = ".".concat(DATA_KEY$9);
    var DATA_API_KEY$6 = '.data-api';
    var CLASS_NAME_ACTIVE$3 = 'active';
    var SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
    var EVENT_CLICK_DATA_API$6 = "click".concat(EVENT_KEY$a).concat(DATA_API_KEY$6);
    /**
     * Class definition
     */
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Button, "NAME", {
            // Getters
            get: function () {
                return NAME$e;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        Button.prototype.toggle = function () {
            // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
            this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
        };
        // Static
        Button.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Button.getOrCreateInstance(this);
                if (config === 'toggle') {
                    data[config]();
                }
            });
        };
        return Button;
    }(BaseComponent));
    exports.Button = Button;
    /**
     * Data API implementation
     */
    EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, function (event) {
        event.preventDefault();
        var button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
        var data = Button.getOrCreateInstance(button);
        data.toggle();
    });
    /**
     * jQuery
     */
    defineJQueryPlugin(Button);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/swipe.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$d = 'swipe';
    var EVENT_KEY$9 = '.bs.swipe';
    var EVENT_TOUCHSTART = "touchstart".concat(EVENT_KEY$9);
    var EVENT_TOUCHMOVE = "touchmove".concat(EVENT_KEY$9);
    var EVENT_TOUCHEND = "touchend".concat(EVENT_KEY$9);
    var EVENT_POINTERDOWN = "pointerdown".concat(EVENT_KEY$9);
    var EVENT_POINTERUP = "pointerup".concat(EVENT_KEY$9);
    var POINTER_TYPE_TOUCH = 'touch';
    var POINTER_TYPE_PEN = 'pen';
    var CLASS_NAME_POINTER_EVENT = 'pointer-event';
    var SWIPE_THRESHOLD = 40;
    var Default$c = {
        endCallback: null,
        leftCallback: null,
        rightCallback: null
    };
    var DefaultType$c = {
        endCallback: '(function|null)',
        leftCallback: '(function|null)',
        rightCallback: '(function|null)'
    };
    /**
     * Class definition
     */
    var Swipe = /** @class */ (function (_super) {
        __extends(Swipe, _super);
        function Swipe(element, config) {
            var _this = _super.call(this) || this;
            _this._element = element;
            if (!element || !Swipe.isSupported()) {
                return _this;
            }
            _this._config = _this._getConfig(config);
            _this._deltaX = 0;
            _this._supportPointerEvents = Boolean(window.PointerEvent);
            _this._initEvents();
            return _this;
        }
        Object.defineProperty(Swipe, "Default", {
            // Getters
            get: function () {
                return Default$c;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Swipe, "DefaultType", {
            get: function () {
                return DefaultType$c;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Swipe, "NAME", {
            get: function () {
                return NAME$d;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        Swipe.prototype.dispose = function () {
            EventHandler.off(this._element, EVENT_KEY$9);
        };
        // Private
        Swipe.prototype._start = function (event) {
            if (!this._supportPointerEvents) {
                this._deltaX = event.touches[0].clientX;
                return;
            }
            if (this._eventIsPointerPenTouch(event)) {
                this._deltaX = event.clientX;
            }
        };
        Swipe.prototype._end = function (event) {
            if (this._eventIsPointerPenTouch(event)) {
                this._deltaX = event.clientX - this._deltaX;
            }
            this._handleSwipe();
            execute(this._config.endCallback);
        };
        Swipe.prototype._move = function (event) {
            this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
        };
        Swipe.prototype._handleSwipe = function () {
            var absDeltaX = Math.abs(this._deltaX);
            if (absDeltaX <= SWIPE_THRESHOLD) {
                return;
            }
            var direction = absDeltaX / this._deltaX;
            this._deltaX = 0;
            if (!direction) {
                return;
            }
            execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
        };
        Swipe.prototype._initEvents = function () {
            var _this = this;
            if (this._supportPointerEvents) {
                EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) { return _this._start(event); });
                EventHandler.on(this._element, EVENT_POINTERUP, function (event) { return _this._end(event); });
                this._element.classList.add(CLASS_NAME_POINTER_EVENT);
            }
            else {
                EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) { return _this._start(event); });
                EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) { return _this._move(event); });
                EventHandler.on(this._element, EVENT_TOUCHEND, function (event) { return _this._end(event); });
            }
        };
        Swipe.prototype._eventIsPointerPenTouch = function (event) {
            return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
        };
        // Static
        Swipe.isSupported = function () {
            return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
        };
        return Swipe;
    }(Config));
    /**
     * --------------------------------------------------------------------------
     * Bootstrap carousel.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$c = 'carousel';
    var DATA_KEY$8 = 'bs.carousel';
    var EVENT_KEY$8 = ".".concat(DATA_KEY$8);
    var DATA_API_KEY$5 = '.data-api';
    var ARROW_LEFT_KEY$1 = 'ArrowLeft';
    var ARROW_RIGHT_KEY$1 = 'ArrowRight';
    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch
    var ORDER_NEXT = 'next';
    var ORDER_PREV = 'prev';
    var DIRECTION_LEFT = 'left';
    var DIRECTION_RIGHT = 'right';
    var EVENT_SLIDE = "slide".concat(EVENT_KEY$8);
    var EVENT_SLID = "slid".concat(EVENT_KEY$8);
    var EVENT_KEYDOWN$1 = "keydown".concat(EVENT_KEY$8);
    var EVENT_MOUSEENTER$1 = "mouseenter".concat(EVENT_KEY$8);
    var EVENT_MOUSELEAVE$1 = "mouseleave".concat(EVENT_KEY$8);
    var EVENT_DRAG_START = "dragstart".concat(EVENT_KEY$8);
    var EVENT_LOAD_DATA_API$3 = "load".concat(EVENT_KEY$8).concat(DATA_API_KEY$5);
    var EVENT_CLICK_DATA_API$5 = "click".concat(EVENT_KEY$8).concat(DATA_API_KEY$5);
    var CLASS_NAME_CAROUSEL = 'carousel';
    var CLASS_NAME_ACTIVE$2 = 'active';
    var CLASS_NAME_SLIDE = 'slide';
    var CLASS_NAME_END = 'carousel-item-end';
    var CLASS_NAME_START = 'carousel-item-start';
    var CLASS_NAME_NEXT = 'carousel-item-next';
    var CLASS_NAME_PREV = 'carousel-item-prev';
    var SELECTOR_ACTIVE = '.active';
    var SELECTOR_ITEM = '.carousel-item';
    var SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
    var SELECTOR_ITEM_IMG = '.carousel-item img';
    var SELECTOR_INDICATORS = '.carousel-indicators';
    var SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
    var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
    var KEY_TO_DIRECTION = (_a = {},
        _a[ARROW_LEFT_KEY$1] = DIRECTION_RIGHT,
        _a[ARROW_RIGHT_KEY$1] = DIRECTION_LEFT,
        _a);
    var Default$b = {
        interval: 5000,
        keyboard: true,
        pause: 'hover',
        ride: false,
        touch: true,
        wrap: true
    };
    var DefaultType$b = {
        interval: '(number|boolean)',
        // TODO:v6 remove boolean support
        keyboard: 'boolean',
        pause: '(string|boolean)',
        ride: '(boolean|string)',
        touch: 'boolean',
        wrap: 'boolean'
    };
    /**
     * Class definition
     */
    var Carousel = /** @class */ (function (_super) {
        __extends(Carousel, _super);
        function Carousel(element, config) {
            var _this = _super.call(this, element, config) || this;
            _this._interval = null;
            _this._activeElement = null;
            _this._isSliding = false;
            _this.touchTimeout = null;
            _this._swipeHelper = null;
            _this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, _this._element);
            _this._addEventListeners();
            if (_this._config.ride === CLASS_NAME_CAROUSEL) {
                _this.cycle();
            }
            return _this;
        }
        Object.defineProperty(Carousel, "Default", {
            // Getters
            get: function () {
                return Default$b;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Carousel, "DefaultType", {
            get: function () {
                return DefaultType$b;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Carousel, "NAME", {
            get: function () {
                return NAME$c;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        Carousel.prototype.next = function () {
            this._slide(ORDER_NEXT);
        };
        Carousel.prototype.nextWhenVisible = function () {
            // FIXME TODO use `document.visibilityState`
            // Don't call next when the page isn't visible
            // or the carousel or its parent isn't visible
            if (!document.hidden && isVisible(this._element)) {
                this.next();
            }
        };
        Carousel.prototype.prev = function () {
            this._slide(ORDER_PREV);
        };
        Carousel.prototype.pause = function () {
            if (this._isSliding) {
                triggerTransitionEnd(this._element);
            }
            this._clearInterval();
        };
        Carousel.prototype.cycle = function () {
            var _this = this;
            this._clearInterval();
            this._updateInterval();
            this._interval = setInterval(function () { return _this.nextWhenVisible(); }, this._config.interval);
        };
        Carousel.prototype._maybeEnableCycle = function () {
            var _this = this;
            if (!this._config.ride) {
                return;
            }
            if (this._isSliding) {
                EventHandler.one(this._element, EVENT_SLID, function () { return _this.cycle(); });
                return;
            }
            this.cycle();
        };
        Carousel.prototype.to = function (index) {
            var _this = this;
            var items = this._getItems();
            if (index > items.length - 1 || index < 0) {
                return;
            }
            if (this._isSliding) {
                EventHandler.one(this._element, EVENT_SLID, function () { return _this.to(index); });
                return;
            }
            var activeIndex = this._getItemIndex(this._getActive());
            if (activeIndex === index) {
                return;
            }
            var order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
            this._slide(order, items[index]);
        };
        Carousel.prototype.dispose = function () {
            if (this._swipeHelper) {
                this._swipeHelper.dispose();
            }
            _super.prototype.dispose.call(this);
        };
        // Private
        Carousel.prototype._configAfterMerge = function (config) {
            config.defaultInterval = config.interval;
            return config;
        };
        Carousel.prototype._addEventListeners = function () {
            var _this = this;
            if (this._config.keyboard) {
                EventHandler.on(this._element, EVENT_KEYDOWN$1, function (event) { return _this._keydown(event); });
            }
            if (this._config.pause === 'hover') {
                EventHandler.on(this._element, EVENT_MOUSEENTER$1, function () { return _this.pause(); });
                EventHandler.on(this._element, EVENT_MOUSELEAVE$1, function () { return _this._maybeEnableCycle(); });
            }
            if (this._config.touch && Swipe.isSupported()) {
                this._addTouchEventListeners();
            }
        };
        Carousel.prototype._addTouchEventListeners = function () {
            var _this = this;
            for (var _i = 0, _a = SelectorEngine.find(SELECTOR_ITEM_IMG, this._element); _i < _a.length; _i++) {
                var img = _a[_i];
                EventHandler.on(img, EVENT_DRAG_START, function (event) { return event.preventDefault(); });
            }
            var endCallBack = function () {
                if (_this._config.pause !== 'hover') {
                    return;
                }
                // If it's a touch-enabled device, mouseenter/leave are fired as
                // part of the mouse compatibility events on first tap - the carousel
                // would stop cycling until user tapped out of it;
                // here, we listen for touchend, explicitly pause the carousel
                // (as if it's the second time we tap on it, mouseenter compat event
                // is NOT fired) and after a timeout (to allow for mouse compatibility
                // events to fire) we explicitly restart cycling
                _this.pause();
                if (_this.touchTimeout) {
                    clearTimeout(_this.touchTimeout);
                }
                _this.touchTimeout = setTimeout(function () { return _this._maybeEnableCycle(); }, TOUCHEVENT_COMPAT_WAIT + _this._config.interval);
            };
            var swipeConfig = {
                leftCallback: function () { return _this._slide(_this._directionToOrder(DIRECTION_LEFT)); },
                rightCallback: function () { return _this._slide(_this._directionToOrder(DIRECTION_RIGHT)); },
                endCallback: endCallBack
            };
            this._swipeHelper = new Swipe(this._element, swipeConfig);
        };
        Carousel.prototype._keydown = function (event) {
            if (/input|textarea/i.test(event.target.tagName)) {
                return;
            }
            var direction = KEY_TO_DIRECTION[event.key];
            if (direction) {
                event.preventDefault();
                this._slide(this._directionToOrder(direction));
            }
        };
        Carousel.prototype._getItemIndex = function (element) {
            return this._getItems().indexOf(element);
        };
        Carousel.prototype._setActiveIndicatorElement = function (index) {
            if (!this._indicatorsElement) {
                return;
            }
            var activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
            activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
            activeIndicator.removeAttribute('aria-current');
            var newActiveIndicator = SelectorEngine.findOne("[data-bs-slide-to=\"".concat(index, "\"]"), this._indicatorsElement);
            if (newActiveIndicator) {
                newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
                newActiveIndicator.setAttribute('aria-current', 'true');
            }
        };
        Carousel.prototype._updateInterval = function () {
            var element = this._activeElement || this._getActive();
            if (!element) {
                return;
            }
            var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
            this._config.interval = elementInterval || this._config.defaultInterval;
        };
        Carousel.prototype._slide = function (order, element) {
            var _this = this;
            if (element === void 0) { element = null; }
            if (this._isSliding) {
                return;
            }
            var activeElement = this._getActive();
            var isNext = order === ORDER_NEXT;
            var nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
            if (nextElement === activeElement) {
                return;
            }
            var nextElementIndex = this._getItemIndex(nextElement);
            var triggerEvent = function (eventName) {
                return EventHandler.trigger(_this._element, eventName, {
                    relatedTarget: nextElement,
                    direction: _this._orderToDirection(order),
                    from: _this._getItemIndex(activeElement),
                    to: nextElementIndex
                });
            };
            var slideEvent = triggerEvent(EVENT_SLIDE);
            if (slideEvent.defaultPrevented) {
                return;
            }
            if (!activeElement || !nextElement) {
                // Some weirdness is happening, so we bail
                // TODO: change tests that use empty divs to avoid this check
                return;
            }
            var isCycling = Boolean(this._interval);
            this.pause();
            this._isSliding = true;
            this._setActiveIndicatorElement(nextElementIndex);
            this._activeElement = nextElement;
            var directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
            var orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
            nextElement.classList.add(orderClassName);
            reflow(nextElement);
            activeElement.classList.add(directionalClassName);
            nextElement.classList.add(directionalClassName);
            var completeCallBack = function () {
                nextElement.classList.remove(directionalClassName, orderClassName);
                nextElement.classList.add(CLASS_NAME_ACTIVE$2);
                activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
                _this._isSliding = false;
                triggerEvent(EVENT_SLID);
            };
            this._queueCallback(completeCallBack, activeElement, this._isAnimated());
            if (isCycling) {
                this.cycle();
            }
        };
        Carousel.prototype._isAnimated = function () {
            return this._element.classList.contains(CLASS_NAME_SLIDE);
        };
        Carousel.prototype._getActive = function () {
            return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
        };
        Carousel.prototype._getItems = function () {
            return SelectorEngine.find(SELECTOR_ITEM, this._element);
        };
        Carousel.prototype._clearInterval = function () {
            if (this._interval) {
                clearInterval(this._interval);
                this._interval = null;
            }
        };
        Carousel.prototype._directionToOrder = function (direction) {
            if (isRTL()) {
                return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
            }
            return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
        };
        Carousel.prototype._orderToDirection = function (order) {
            if (isRTL()) {
                return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
            }
            return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
        };
        // Static
        Carousel.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Carousel.getOrCreateInstance(this, config);
                if (typeof config === 'number') {
                    data.to(config);
                    return;
                }
                if (typeof config === 'string') {
                    if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                        throw new TypeError("No method named \"".concat(config, "\""));
                    }
                    data[config]();
                }
            });
        };
        return Carousel;
    }(BaseComponent));
    exports.Carousel = Carousel;
    /**
     * Data API implementation
     */
    EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
        var target = SelectorEngine.getElementFromSelector(this);
        if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
            return;
        }
        event.preventDefault();
        var carousel = Carousel.getOrCreateInstance(target);
        var slideIndex = this.getAttribute('data-bs-slide-to');
        if (slideIndex) {
            carousel.to(slideIndex);
            carousel._maybeEnableCycle();
            return;
        }
        if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
            carousel.next();
            carousel._maybeEnableCycle();
            return;
        }
        carousel.prev();
        carousel._maybeEnableCycle();
    });
    EventHandler.on(window, EVENT_LOAD_DATA_API$3, function () {
        var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
        for (var _i = 0, carousels_1 = carousels; _i < carousels_1.length; _i++) {
            var carousel = carousels_1[_i];
            Carousel.getOrCreateInstance(carousel);
        }
    });
    /**
     * jQuery
     */
    defineJQueryPlugin(Carousel);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap collapse.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$b = 'collapse';
    var DATA_KEY$7 = 'bs.collapse';
    var EVENT_KEY$7 = ".".concat(DATA_KEY$7);
    var DATA_API_KEY$4 = '.data-api';
    var EVENT_SHOW$6 = "show".concat(EVENT_KEY$7);
    var EVENT_SHOWN$6 = "shown".concat(EVENT_KEY$7);
    var EVENT_HIDE$6 = "hide".concat(EVENT_KEY$7);
    var EVENT_HIDDEN$6 = "hidden".concat(EVENT_KEY$7);
    var EVENT_CLICK_DATA_API$4 = "click".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
    var CLASS_NAME_SHOW$7 = 'show';
    var CLASS_NAME_COLLAPSE = 'collapse';
    var CLASS_NAME_COLLAPSING = 'collapsing';
    var CLASS_NAME_COLLAPSED = 'collapsed';
    var CLASS_NAME_DEEPER_CHILDREN = ":scope .".concat(CLASS_NAME_COLLAPSE, " .").concat(CLASS_NAME_COLLAPSE);
    var CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
    var WIDTH = 'width';
    var HEIGHT = 'height';
    var SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
    var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
    var Default$a = {
        parent: null,
        toggle: true
    };
    var DefaultType$a = {
        parent: '(null|element)',
        toggle: 'boolean'
    };
    /**
     * Class definition
     */
    var Collapse = /** @class */ (function (_super) {
        __extends(Collapse, _super);
        function Collapse(element, config) {
            var _this = _super.call(this, element, config) || this;
            _this._isTransitioning = false;
            _this._triggerArray = [];
            var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
            for (var _i = 0, toggleList_1 = toggleList; _i < toggleList_1.length; _i++) {
                var elem = toggleList_1[_i];
                var selector = SelectorEngine.getSelectorFromElement(elem);
                var filterElement = SelectorEngine.find(selector).filter(function (foundElement) { return foundElement === _this._element; });
                if (selector !== null && filterElement.length) {
                    _this._triggerArray.push(elem);
                }
            }
            _this._initializeChildren();
            if (!_this._config.parent) {
                _this._addAriaAndCollapsedClass(_this._triggerArray, _this._isShown());
            }
            if (_this._config.toggle) {
                _this.toggle();
            }
            return _this;
        }
        Object.defineProperty(Collapse, "Default", {
            // Getters
            get: function () {
                return Default$a;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Collapse, "DefaultType", {
            get: function () {
                return DefaultType$a;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Collapse, "NAME", {
            get: function () {
                return NAME$b;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        Collapse.prototype.toggle = function () {
            if (this._isShown()) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        Collapse.prototype.show = function () {
            var _this = this;
            if (this._isTransitioning || this._isShown()) {
                return;
            }
            var activeChildren = [];
            // find active children
            if (this._config.parent) {
                activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(function (element) { return element !== _this._element; }).map(function (element) { return Collapse.getOrCreateInstance(element, {
                    toggle: false
                }); });
            }
            if (activeChildren.length && activeChildren[0]._isTransitioning) {
                return;
            }
            var startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
            if (startEvent.defaultPrevented) {
                return;
            }
            for (var _i = 0, activeChildren_1 = activeChildren; _i < activeChildren_1.length; _i++) {
                var activeInstance = activeChildren_1[_i];
                activeInstance.hide();
            }
            var dimension = this._getDimension();
            this._element.classList.remove(CLASS_NAME_COLLAPSE);
            this._element.classList.add(CLASS_NAME_COLLAPSING);
            this._element.style[dimension] = 0;
            this._addAriaAndCollapsedClass(this._triggerArray, true);
            this._isTransitioning = true;
            var complete = function () {
                _this._isTransitioning = false;
                _this._element.classList.remove(CLASS_NAME_COLLAPSING);
                _this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
                _this._element.style[dimension] = '';
                EventHandler.trigger(_this._element, EVENT_SHOWN$6);
            };
            var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
            var scrollSize = "scroll".concat(capitalizedDimension);
            this._queueCallback(complete, this._element, true);
            this._element.style[dimension] = "".concat(this._element[scrollSize], "px");
        };
        Collapse.prototype.hide = function () {
            var _this = this;
            if (this._isTransitioning || !this._isShown()) {
                return;
            }
            var startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
            if (startEvent.defaultPrevented) {
                return;
            }
            var dimension = this._getDimension();
            this._element.style[dimension] = "".concat(this._element.getBoundingClientRect()[dimension], "px");
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_COLLAPSING);
            this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
            for (var _i = 0, _a = this._triggerArray; _i < _a.length; _i++) {
                var trigger = _a[_i];
                var element = SelectorEngine.getElementFromSelector(trigger);
                if (element && !this._isShown(element)) {
                    this._addAriaAndCollapsedClass([trigger], false);
                }
            }
            this._isTransitioning = true;
            var complete = function () {
                _this._isTransitioning = false;
                _this._element.classList.remove(CLASS_NAME_COLLAPSING);
                _this._element.classList.add(CLASS_NAME_COLLAPSE);
                EventHandler.trigger(_this._element, EVENT_HIDDEN$6);
            };
            this._element.style[dimension] = '';
            this._queueCallback(complete, this._element, true);
        };
        Collapse.prototype._isShown = function (element) {
            if (element === void 0) { element = this._element; }
            return element.classList.contains(CLASS_NAME_SHOW$7);
        };
        // Private
        Collapse.prototype._configAfterMerge = function (config) {
            config.toggle = Boolean(config.toggle); // Coerce string values
            config.parent = getElement(config.parent);
            return config;
        };
        Collapse.prototype._getDimension = function () {
            return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
        };
        Collapse.prototype._initializeChildren = function () {
            if (!this._config.parent) {
                return;
            }
            var children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var element = children_1[_i];
                var selected = SelectorEngine.getElementFromSelector(element);
                if (selected) {
                    this._addAriaAndCollapsedClass([element], this._isShown(selected));
                }
            }
        };
        Collapse.prototype._getFirstLevelChildren = function (selector) {
            var children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
            // remove children if greater depth
            return SelectorEngine.find(selector, this._config.parent).filter(function (element) { return !children.includes(element); });
        };
        Collapse.prototype._addAriaAndCollapsedClass = function (triggerArray, isOpen) {
            if (!triggerArray.length) {
                return;
            }
            for (var _i = 0, triggerArray_1 = triggerArray; _i < triggerArray_1.length; _i++) {
                var element = triggerArray_1[_i];
                element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
                element.setAttribute('aria-expanded', isOpen);
            }
        };
        // Static
        Collapse.jQueryInterface = function (config) {
            var _config = {};
            if (typeof config === 'string' && /show|hide/.test(config)) {
                _config.toggle = false;
            }
            return this.each(function () {
                var data = Collapse.getOrCreateInstance(this, _config);
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"".concat(config, "\""));
                    }
                    data[config]();
                }
            });
        };
        return Collapse;
    }(BaseComponent));
    exports.Collapse = Collapse;
    /**
     * Data API implementation
     */
    EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
        // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
        if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
            event.preventDefault();
        }
        for (var _i = 0, _a = SelectorEngine.getMultipleElementsFromSelector(this); _i < _a.length; _i++) {
            var element = _a[_i];
            Collapse.getOrCreateInstance(element, {
                toggle: false
            }).toggle();
        }
    });
    /**
     * jQuery
     */
    defineJQueryPlugin(Collapse);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap dropdown.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$a = 'dropdown';
    var DATA_KEY$6 = 'bs.dropdown';
    var EVENT_KEY$6 = ".".concat(DATA_KEY$6);
    var DATA_API_KEY$3 = '.data-api';
    var ESCAPE_KEY$2 = 'Escape';
    var TAB_KEY$1 = 'Tab';
    var ARROW_UP_KEY$1 = 'ArrowUp';
    var ARROW_DOWN_KEY$1 = 'ArrowDown';
    var RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button
    var EVENT_HIDE$5 = "hide".concat(EVENT_KEY$6);
    var EVENT_HIDDEN$5 = "hidden".concat(EVENT_KEY$6);
    var EVENT_SHOW$5 = "show".concat(EVENT_KEY$6);
    var EVENT_SHOWN$5 = "shown".concat(EVENT_KEY$6);
    var EVENT_CLICK_DATA_API$3 = "click".concat(EVENT_KEY$6).concat(DATA_API_KEY$3);
    var EVENT_KEYDOWN_DATA_API = "keydown".concat(EVENT_KEY$6).concat(DATA_API_KEY$3);
    var EVENT_KEYUP_DATA_API = "keyup".concat(EVENT_KEY$6).concat(DATA_API_KEY$3);
    var CLASS_NAME_SHOW$6 = 'show';
    var CLASS_NAME_DROPUP = 'dropup';
    var CLASS_NAME_DROPEND = 'dropend';
    var CLASS_NAME_DROPSTART = 'dropstart';
    var CLASS_NAME_DROPUP_CENTER = 'dropup-center';
    var CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
    var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
    var SELECTOR_DATA_TOGGLE_SHOWN = "".concat(SELECTOR_DATA_TOGGLE$3, ".").concat(CLASS_NAME_SHOW$6);
    var SELECTOR_MENU = '.dropdown-menu';
    var SELECTOR_NAVBAR = '.navbar';
    var SELECTOR_NAVBAR_NAV = '.navbar-nav';
    var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
    var PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
    var PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
    var PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
    var PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
    var PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
    var PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
    var PLACEMENT_TOPCENTER = 'top';
    var PLACEMENT_BOTTOMCENTER = 'bottom';
    var Default$9 = {
        autoClose: true,
        boundary: 'clippingParents',
        display: 'dynamic',
        offset: [0, 2],
        popperConfig: null,
        reference: 'toggle'
    };
    var DefaultType$9 = {
        autoClose: '(boolean|string)',
        boundary: '(string|element)',
        display: 'string',
        offset: '(array|string|function)',
        popperConfig: '(null|object|function)',
        reference: '(string|element|object)'
    };
    /**
     * Class definition
     */
    var Dropdown = /** @class */ (function (_super) {
        __extends(Dropdown, _super);
        function Dropdown(element, config) {
            var _this = _super.call(this, element, config) || this;
            _this._popper = null;
            _this._parent = _this._element.parentNode; // dropdown wrapper
            // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
            _this._menu = SelectorEngine.next(_this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(_this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, _this._parent);
            _this._inNavbar = _this._detectNavbar();
            return _this;
        }
        Object.defineProperty(Dropdown, "Default", {
            // Getters
            get: function () {
                return Default$9;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dropdown, "DefaultType", {
            get: function () {
                return DefaultType$9;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dropdown, "NAME", {
            get: function () {
                return NAME$a;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        Dropdown.prototype.toggle = function () {
            return this._isShown() ? this.hide() : this.show();
        };
        Dropdown.prototype.show = function () {
            if (isDisabled(this._element) || this._isShown()) {
                return;
            }
            var relatedTarget = {
                relatedTarget: this._element
            };
            var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
            if (showEvent.defaultPrevented) {
                return;
            }
            this._createPopper();
            // If this is a touch-enabled device we add extra
            // empty mouseover listeners to the body's immediate children;
            // only needed because of broken event delegation on iOS
            // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
            if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
                for (var _i = 0, _a = [].concat.apply([], document.body.children); _i < _a.length; _i++) {
                    var element = _a[_i];
                    EventHandler.on(element, 'mouseover', noop);
                }
            }
            this._element.focus();
            this._element.setAttribute('aria-expanded', true);
            this._menu.classList.add(CLASS_NAME_SHOW$6);
            this._element.classList.add(CLASS_NAME_SHOW$6);
            EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
        };
        Dropdown.prototype.hide = function () {
            if (isDisabled(this._element) || !this._isShown()) {
                return;
            }
            var relatedTarget = {
                relatedTarget: this._element
            };
            this._completeHide(relatedTarget);
        };
        Dropdown.prototype.dispose = function () {
            if (this._popper) {
                this._popper.destroy();
            }
            _super.prototype.dispose.call(this);
        };
        Dropdown.prototype.update = function () {
            this._inNavbar = this._detectNavbar();
            if (this._popper) {
                this._popper.update();
            }
        };
        // Private
        Dropdown.prototype._completeHide = function (relatedTarget) {
            var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
            if (hideEvent.defaultPrevented) {
                return;
            }
            // If this is a touch-enabled device we remove the extra
            // empty mouseover listeners we added for iOS support
            if ('ontouchstart' in document.documentElement) {
                for (var _i = 0, _a = [].concat.apply([], document.body.children); _i < _a.length; _i++) {
                    var element = _a[_i];
                    EventHandler.off(element, 'mouseover', noop);
                }
            }
            if (this._popper) {
                this._popper.destroy();
            }
            this._menu.classList.remove(CLASS_NAME_SHOW$6);
            this._element.classList.remove(CLASS_NAME_SHOW$6);
            this._element.setAttribute('aria-expanded', 'false');
            Manipulator.removeDataAttribute(this._menu, 'popper');
            EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
        };
        Dropdown.prototype._getConfig = function (config) {
            config = _super.prototype._getConfig.call(this, config);
            if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
                // Popper virtual elements require a getBoundingClientRect method
                throw new TypeError("".concat(NAME$a.toUpperCase(), ": Option \"reference\" provided type \"object\" without a required \"getBoundingClientRect\" method."));
            }
            return config;
        };
        Dropdown.prototype._createPopper = function () {
            if (typeof Popper === 'undefined') {
                throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
            }
            var referenceElement = this._element;
            if (this._config.reference === 'parent') {
                referenceElement = this._parent;
            }
            else if (isElement(this._config.reference)) {
                referenceElement = getElement(this._config.reference);
            }
            else if (typeof this._config.reference === 'object') {
                referenceElement = this._config.reference;
            }
            var popperConfig = this._getPopperConfig();
            this._popper = Popper.createPopper(referenceElement, this._menu, popperConfig);
        };
        Dropdown.prototype._isShown = function () {
            return this._menu.classList.contains(CLASS_NAME_SHOW$6);
        };
        Dropdown.prototype._getPlacement = function () {
            var parentDropdown = this._parent;
            if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
                return PLACEMENT_RIGHT;
            }
            if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
                return PLACEMENT_LEFT;
            }
            if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
                return PLACEMENT_TOPCENTER;
            }
            if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
                return PLACEMENT_BOTTOMCENTER;
            }
            // We need to trim the value because custom properties can also include spaces
            var isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
            if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
                return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
            }
            return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
        };
        Dropdown.prototype._detectNavbar = function () {
            return this._element.closest(SELECTOR_NAVBAR) !== null;
        };
        Dropdown.prototype._getOffset = function () {
            var _this = this;
            var offset = this._config.offset;
            if (typeof offset === 'string') {
                return offset.split(',').map(function (value) { return Number.parseInt(value, 10); });
            }
            if (typeof offset === 'function') {
                return function (popperData) { return offset(popperData, _this._element); };
            }
            return offset;
        };
        Dropdown.prototype._getPopperConfig = function () {
            var defaultBsPopperConfig = {
                placement: this._getPlacement(),
                modifiers: [{
                        name: 'preventOverflow',
                        options: {
                            boundary: this._config.boundary
                        }
                    }, {
                        name: 'offset',
                        options: {
                            offset: this._getOffset()
                        }
                    }]
            };
            // Disable Popper if we have a static display or Dropdown is in Navbar
            if (this._inNavbar || this._config.display === 'static') {
                Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
                defaultBsPopperConfig.modifiers = [{
                        name: 'applyStyles',
                        enabled: false
                    }];
            }
            return __assign(__assign({}, defaultBsPopperConfig), execute(this._config.popperConfig, [defaultBsPopperConfig]));
        };
        Dropdown.prototype._selectMenuItem = function (_a) {
            var key = _a.key, target = _a.target;
            var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(function (element) { return isVisible(element); });
            if (!items.length) {
                return;
            }
            // if target isn't included in items (e.g. when expanding the dropdown)
            // allow cycling to get the last item in case key equals ARROW_UP_KEY
            getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
        };
        // Static
        Dropdown.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Dropdown.getOrCreateInstance(this, config);
                if (typeof config !== 'string') {
                    return;
                }
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"".concat(config, "\""));
                }
                data[config]();
            });
        };
        Dropdown.clearMenus = function (event) {
            if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
                return;
            }
            var openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
            for (var _i = 0, openToggles_1 = openToggles; _i < openToggles_1.length; _i++) {
                var toggle = openToggles_1[_i];
                var context = Dropdown.getInstance(toggle);
                if (!context || context._config.autoClose === false) {
                    continue;
                }
                var composedPath = event.composedPath();
                var isMenuTarget = composedPath.includes(context._menu);
                if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
                    continue;
                }
                // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
                if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
                    continue;
                }
                var relatedTarget = {
                    relatedTarget: context._element
                };
                if (event.type === 'click') {
                    relatedTarget.clickEvent = event;
                }
                context._completeHide(relatedTarget);
            }
        };
        Dropdown.dataApiKeydownHandler = function (event) {
            // If not an UP | DOWN | ESCAPE key => not a dropdown command
            // If input/textarea && if key is other than ESCAPE => not a dropdown command
            var isInput = /input|textarea/i.test(event.target.tagName);
            var isEscapeEvent = event.key === ESCAPE_KEY$2;
            var isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
            if (!isUpOrDownEvent && !isEscapeEvent) {
                return;
            }
            if (isInput && !isEscapeEvent) {
                return;
            }
            event.preventDefault();
            // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
            var getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
            var instance = Dropdown.getOrCreateInstance(getToggleButton);
            if (isUpOrDownEvent) {
                event.stopPropagation();
                instance.show();
                instance._selectMenuItem(event);
                return;
            }
            if (instance._isShown()) {
                // else is escape and we check if it is shown
                event.stopPropagation();
                instance.hide();
                getToggleButton.focus();
            }
        };
        return Dropdown;
    }(BaseComponent));
    exports.Dropdown = Dropdown;
    /**
     * Data API implementation
     */
    EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
    EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
    EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
    EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
    EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
        event.preventDefault();
        Dropdown.getOrCreateInstance(this).toggle();
    });
    /**
     * jQuery
     */
    defineJQueryPlugin(Dropdown);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/backdrop.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$9 = 'backdrop';
    var CLASS_NAME_FADE$4 = 'fade';
    var CLASS_NAME_SHOW$5 = 'show';
    var EVENT_MOUSEDOWN = "mousedown.bs.".concat(NAME$9);
    var Default$8 = {
        className: 'modal-backdrop',
        clickCallback: null,
        isAnimated: false,
        isVisible: true,
        // if false, we use the backdrop helper without adding any element to the dom
        rootElement: 'body' // give the choice to place backdrop under different elements
    };
    var DefaultType$8 = {
        className: 'string',
        clickCallback: '(function|null)',
        isAnimated: 'boolean',
        isVisible: 'boolean',
        rootElement: '(element|string)'
    };
    /**
     * Class definition
     */
    var Backdrop = /** @class */ (function (_super) {
        __extends(Backdrop, _super);
        function Backdrop(config) {
            var _this = _super.call(this) || this;
            _this._config = _this._getConfig(config);
            _this._isAppended = false;
            _this._element = null;
            return _this;
        }
        Object.defineProperty(Backdrop, "Default", {
            // Getters
            get: function () {
                return Default$8;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Backdrop, "DefaultType", {
            get: function () {
                return DefaultType$8;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Backdrop, "NAME", {
            get: function () {
                return NAME$9;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        Backdrop.prototype.show = function (callback) {
            if (!this._config.isVisible) {
                execute(callback);
                return;
            }
            this._append();
            var element = this._getElement();
            if (this._config.isAnimated) {
                reflow(element);
            }
            element.classList.add(CLASS_NAME_SHOW$5);
            this._emulateAnimation(function () {
                execute(callback);
            });
        };
        Backdrop.prototype.hide = function (callback) {
            var _this = this;
            if (!this._config.isVisible) {
                execute(callback);
                return;
            }
            this._getElement().classList.remove(CLASS_NAME_SHOW$5);
            this._emulateAnimation(function () {
                _this.dispose();
                execute(callback);
            });
        };
        Backdrop.prototype.dispose = function () {
            if (!this._isAppended) {
                return;
            }
            EventHandler.off(this._element, EVENT_MOUSEDOWN);
            this._element.remove();
            this._isAppended = false;
        };
        // Private
        Backdrop.prototype._getElement = function () {
            if (!this._element) {
                var backdrop = document.createElement('div');
                backdrop.className = this._config.className;
                if (this._config.isAnimated) {
                    backdrop.classList.add(CLASS_NAME_FADE$4);
                }
                this._element = backdrop;
            }
            return this._element;
        };
        Backdrop.prototype._configAfterMerge = function (config) {
            // use getElement() with the default "body" to get a fresh Element on each instantiation
            config.rootElement = getElement(config.rootElement);
            return config;
        };
        Backdrop.prototype._append = function () {
            var _this = this;
            if (this._isAppended) {
                return;
            }
            var element = this._getElement();
            this._config.rootElement.append(element);
            EventHandler.on(element, EVENT_MOUSEDOWN, function () {
                execute(_this._config.clickCallback);
            });
            this._isAppended = true;
        };
        Backdrop.prototype._emulateAnimation = function (callback) {
            executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
        };
        return Backdrop;
    }(Config));
    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/focustrap.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$8 = 'focustrap';
    var DATA_KEY$5 = 'bs.focustrap';
    var EVENT_KEY$5 = ".".concat(DATA_KEY$5);
    var EVENT_FOCUSIN$2 = "focusin".concat(EVENT_KEY$5);
    var EVENT_KEYDOWN_TAB = "keydown.tab".concat(EVENT_KEY$5);
    var TAB_KEY = 'Tab';
    var TAB_NAV_FORWARD = 'forward';
    var TAB_NAV_BACKWARD = 'backward';
    var Default$7 = {
        autofocus: true,
        trapElement: null // The element to trap focus inside of
    };
    var DefaultType$7 = {
        autofocus: 'boolean',
        trapElement: 'element'
    };
    /**
     * Class definition
     */
    var FocusTrap = /** @class */ (function (_super) {
        __extends(FocusTrap, _super);
        function FocusTrap(config) {
            var _this = _super.call(this) || this;
            _this._config = _this._getConfig(config);
            _this._isActive = false;
            _this._lastTabNavDirection = null;
            return _this;
        }
        Object.defineProperty(FocusTrap, "Default", {
            // Getters
            get: function () {
                return Default$7;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FocusTrap, "DefaultType", {
            get: function () {
                return DefaultType$7;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FocusTrap, "NAME", {
            get: function () {
                return NAME$8;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        FocusTrap.prototype.activate = function () {
            var _this = this;
            if (this._isActive) {
                return;
            }
            if (this._config.autofocus) {
                this._config.trapElement.focus();
            }
            EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
            EventHandler.on(document, EVENT_FOCUSIN$2, function (event) { return _this._handleFocusin(event); });
            EventHandler.on(document, EVENT_KEYDOWN_TAB, function (event) { return _this._handleKeydown(event); });
            this._isActive = true;
        };
        FocusTrap.prototype.deactivate = function () {
            if (!this._isActive) {
                return;
            }
            this._isActive = false;
            EventHandler.off(document, EVENT_KEY$5);
        };
        // Private
        FocusTrap.prototype._handleFocusin = function (event) {
            var trapElement = this._config.trapElement;
            if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
                return;
            }
            var elements = SelectorEngine.focusableChildren(trapElement);
            if (elements.length === 0) {
                trapElement.focus();
            }
            else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
                elements[elements.length - 1].focus();
            }
            else {
                elements[0].focus();
            }
        };
        FocusTrap.prototype._handleKeydown = function (event) {
            if (event.key !== TAB_KEY) {
                return;
            }
            this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
        };
        return FocusTrap;
    }(Config));
    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/scrollBar.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
    var SELECTOR_STICKY_CONTENT = '.sticky-top';
    var PROPERTY_PADDING = 'padding-right';
    var PROPERTY_MARGIN = 'margin-right';
    /**
     * Class definition
     */
    var ScrollBarHelper = /** @class */ (function () {
        function ScrollBarHelper() {
            this._element = document.body;
        }
        // Public
        ScrollBarHelper.prototype.getWidth = function () {
            // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
            var documentWidth = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - documentWidth);
        };
        ScrollBarHelper.prototype.hide = function () {
            var width = this.getWidth();
            this._disableOverFlow();
            // give padding to element to balance the hidden scrollbar width
            this._setElementAttributes(this._element, PROPERTY_PADDING, function (calculatedValue) { return calculatedValue + width; });
            // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
            this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, function (calculatedValue) { return calculatedValue + width; });
            this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, function (calculatedValue) { return calculatedValue - width; });
        };
        ScrollBarHelper.prototype.reset = function () {
            this._resetElementAttributes(this._element, 'overflow');
            this._resetElementAttributes(this._element, PROPERTY_PADDING);
            this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
            this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
        };
        ScrollBarHelper.prototype.isOverflowing = function () {
            return this.getWidth() > 0;
        };
        // Private
        ScrollBarHelper.prototype._disableOverFlow = function () {
            this._saveInitialAttribute(this._element, 'overflow');
            this._element.style.overflow = 'hidden';
        };
        ScrollBarHelper.prototype._setElementAttributes = function (selector, styleProperty, callback) {
            var _this = this;
            var scrollbarWidth = this.getWidth();
            var manipulationCallBack = function (element) {
                if (element !== _this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
                    return;
                }
                _this._saveInitialAttribute(element, styleProperty);
                var calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
                element.style.setProperty(styleProperty, "".concat(callback(Number.parseFloat(calculatedValue)), "px"));
            };
            this._applyManipulationCallback(selector, manipulationCallBack);
        };
        ScrollBarHelper.prototype._saveInitialAttribute = function (element, styleProperty) {
            var actualValue = element.style.getPropertyValue(styleProperty);
            if (actualValue) {
                Manipulator.setDataAttribute(element, styleProperty, actualValue);
            }
        };
        ScrollBarHelper.prototype._resetElementAttributes = function (selector, styleProperty) {
            var manipulationCallBack = function (element) {
                var value = Manipulator.getDataAttribute(element, styleProperty);
                // We only want to remove the property if the value is `null`; the value can also be zero
                if (value === null) {
                    element.style.removeProperty(styleProperty);
                    return;
                }
                Manipulator.removeDataAttribute(element, styleProperty);
                element.style.setProperty(styleProperty, value);
            };
            this._applyManipulationCallback(selector, manipulationCallBack);
        };
        ScrollBarHelper.prototype._applyManipulationCallback = function (selector, callBack) {
            if (isElement(selector)) {
                callBack(selector);
                return;
            }
            for (var _i = 0, _a = SelectorEngine.find(selector, this._element); _i < _a.length; _i++) {
                var sel = _a[_i];
                callBack(sel);
            }
        };
        return ScrollBarHelper;
    }());
    /**
     * --------------------------------------------------------------------------
     * Bootstrap modal.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$7 = 'modal';
    var DATA_KEY$4 = 'bs.modal';
    var EVENT_KEY$4 = ".".concat(DATA_KEY$4);
    var DATA_API_KEY$2 = '.data-api';
    var ESCAPE_KEY$1 = 'Escape';
    var EVENT_HIDE$4 = "hide".concat(EVENT_KEY$4);
    var EVENT_HIDE_PREVENTED$1 = "hidePrevented".concat(EVENT_KEY$4);
    var EVENT_HIDDEN$4 = "hidden".concat(EVENT_KEY$4);
    var EVENT_SHOW$4 = "show".concat(EVENT_KEY$4);
    var EVENT_SHOWN$4 = "shown".concat(EVENT_KEY$4);
    var EVENT_RESIZE$1 = "resize".concat(EVENT_KEY$4);
    var EVENT_CLICK_DISMISS = "click.dismiss".concat(EVENT_KEY$4);
    var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss".concat(EVENT_KEY$4);
    var EVENT_KEYDOWN_DISMISS$1 = "keydown.dismiss".concat(EVENT_KEY$4);
    var EVENT_CLICK_DATA_API$2 = "click".concat(EVENT_KEY$4).concat(DATA_API_KEY$2);
    var CLASS_NAME_OPEN = 'modal-open';
    var CLASS_NAME_FADE$3 = 'fade';
    var CLASS_NAME_SHOW$4 = 'show';
    var CLASS_NAME_STATIC = 'modal-static';
    var OPEN_SELECTOR$1 = '.modal.show';
    var SELECTOR_DIALOG = '.modal-dialog';
    var SELECTOR_MODAL_BODY = '.modal-body';
    var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
    var Default$6 = {
        backdrop: true,
        focus: true,
        keyboard: true
    };
    var DefaultType$6 = {
        backdrop: '(boolean|string)',
        focus: 'boolean',
        keyboard: 'boolean'
    };
    /**
     * Class definition
     */
    var Modal = /** @class */ (function (_super) {
        __extends(Modal, _super);
        function Modal(element, config) {
            var _this = _super.call(this, element, config) || this;
            _this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, _this._element);
            _this._backdrop = _this._initializeBackDrop();
            _this._focustrap = _this._initializeFocusTrap();
            _this._isShown = false;
            _this._isTransitioning = false;
            _this._scrollBar = new ScrollBarHelper();
            _this._addEventListeners();
            return _this;
        }
        Object.defineProperty(Modal, "Default", {
            // Getters
            get: function () {
                return Default$6;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Modal, "DefaultType", {
            get: function () {
                return DefaultType$6;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Modal, "NAME", {
            get: function () {
                return NAME$7;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        Modal.prototype.toggle = function (relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
        };
        Modal.prototype.show = function (relatedTarget) {
            var _this = this;
            if (this._isShown || this._isTransitioning) {
                return;
            }
            var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
                relatedTarget: relatedTarget
            });
            if (showEvent.defaultPrevented) {
                return;
            }
            this._isShown = true;
            this._isTransitioning = true;
            this._scrollBar.hide();
            document.body.classList.add(CLASS_NAME_OPEN);
            this._adjustDialog();
            this._backdrop.show(function () { return _this._showElement(relatedTarget); });
        };
        Modal.prototype.hide = function () {
            var _this = this;
            if (!this._isShown || this._isTransitioning) {
                return;
            }
            var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
            if (hideEvent.defaultPrevented) {
                return;
            }
            this._isShown = false;
            this._isTransitioning = true;
            this._focustrap.deactivate();
            this._element.classList.remove(CLASS_NAME_SHOW$4);
            this._queueCallback(function () { return _this._hideModal(); }, this._element, this._isAnimated());
        };
        Modal.prototype.dispose = function () {
            EventHandler.off(window, EVENT_KEY$4);
            EventHandler.off(this._dialog, EVENT_KEY$4);
            this._backdrop.dispose();
            this._focustrap.deactivate();
            _super.prototype.dispose.call(this);
        };
        Modal.prototype.handleUpdate = function () {
            this._adjustDialog();
        };
        // Private
        Modal.prototype._initializeBackDrop = function () {
            return new Backdrop({
                isVisible: Boolean(this._config.backdrop),
                // 'static' option will be translated to true, and booleans will keep their value,
                isAnimated: this._isAnimated()
            });
        };
        Modal.prototype._initializeFocusTrap = function () {
            return new FocusTrap({
                trapElement: this._element
            });
        };
        Modal.prototype._showElement = function (relatedTarget) {
            var _this = this;
            // try to append dynamic modal
            if (!document.body.contains(this._element)) {
                document.body.append(this._element);
            }
            this._element.style.display = 'block';
            this._element.removeAttribute('aria-hidden');
            this._element.setAttribute('aria-modal', true);
            this._element.setAttribute('role', 'dialog');
            this._element.scrollTop = 0;
            var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_SHOW$4);
            var transitionComplete = function () {
                if (_this._config.focus) {
                    _this._focustrap.activate();
                }
                _this._isTransitioning = false;
                EventHandler.trigger(_this._element, EVENT_SHOWN$4, {
                    relatedTarget: relatedTarget
                });
            };
            this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
        };
        Modal.prototype._addEventListeners = function () {
            var _this = this;
            EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, function (event) {
                if (event.key !== ESCAPE_KEY$1) {
                    return;
                }
                if (_this._config.keyboard) {
                    _this.hide();
                    return;
                }
                _this._triggerBackdropTransition();
            });
            EventHandler.on(window, EVENT_RESIZE$1, function () {
                if (_this._isShown && !_this._isTransitioning) {
                    _this._adjustDialog();
                }
            });
            EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, function (event) {
                // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
                EventHandler.one(_this._element, EVENT_CLICK_DISMISS, function (event2) {
                    if (_this._element !== event.target || _this._element !== event2.target) {
                        return;
                    }
                    if (_this._config.backdrop === 'static') {
                        _this._triggerBackdropTransition();
                        return;
                    }
                    if (_this._config.backdrop) {
                        _this.hide();
                    }
                });
            });
        };
        Modal.prototype._hideModal = function () {
            var _this = this;
            this._element.style.display = 'none';
            this._element.setAttribute('aria-hidden', true);
            this._element.removeAttribute('aria-modal');
            this._element.removeAttribute('role');
            this._isTransitioning = false;
            this._backdrop.hide(function () {
                document.body.classList.remove(CLASS_NAME_OPEN);
                _this._resetAdjustments();
                _this._scrollBar.reset();
                EventHandler.trigger(_this._element, EVENT_HIDDEN$4);
            });
        };
        Modal.prototype._isAnimated = function () {
            return this._element.classList.contains(CLASS_NAME_FADE$3);
        };
        Modal.prototype._triggerBackdropTransition = function () {
            var _this = this;
            var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
            if (hideEvent.defaultPrevented) {
                return;
            }
            var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
            var initialOverflowY = this._element.style.overflowY;
            // return if the following background transition hasn't yet completed
            if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
                return;
            }
            if (!isModalOverflowing) {
                this._element.style.overflowY = 'hidden';
            }
            this._element.classList.add(CLASS_NAME_STATIC);
            this._queueCallback(function () {
                _this._element.classList.remove(CLASS_NAME_STATIC);
                _this._queueCallback(function () {
                    _this._element.style.overflowY = initialOverflowY;
                }, _this._dialog);
            }, this._dialog);
            this._element.focus();
        };
        /**
         * The following methods are used to handle overflowing modals
         */
        Modal.prototype._adjustDialog = function () {
            var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
            var scrollbarWidth = this._scrollBar.getWidth();
            var isBodyOverflowing = scrollbarWidth > 0;
            if (isBodyOverflowing && !isModalOverflowing) {
                var property = isRTL() ? 'paddingLeft' : 'paddingRight';
                this._element.style[property] = "".concat(scrollbarWidth, "px");
            }
            if (!isBodyOverflowing && isModalOverflowing) {
                var property = isRTL() ? 'paddingRight' : 'paddingLeft';
                this._element.style[property] = "".concat(scrollbarWidth, "px");
            }
        };
        Modal.prototype._resetAdjustments = function () {
            this._element.style.paddingLeft = '';
            this._element.style.paddingRight = '';
        };
        // Static
        Modal.jQueryInterface = function (config, relatedTarget) {
            return this.each(function () {
                var data = Modal.getOrCreateInstance(this, config);
                if (typeof config !== 'string') {
                    return;
                }
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"".concat(config, "\""));
                }
                data[config](relatedTarget);
            });
        };
        return Modal;
    }(BaseComponent));
    exports.Modal = Modal;
    /**
     * Data API implementation
     */
    EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
        var _this = this;
        var target = SelectorEngine.getElementFromSelector(this);
        if (['A', 'AREA'].includes(this.tagName)) {
            event.preventDefault();
        }
        EventHandler.one(target, EVENT_SHOW$4, function (showEvent) {
            if (showEvent.defaultPrevented) {
                // only register focus restorer if modal will actually get shown
                return;
            }
            EventHandler.one(target, EVENT_HIDDEN$4, function () {
                if (isVisible(_this)) {
                    _this.focus();
                }
            });
        });
        // avoid conflict when clicking modal toggler while another one is open
        var alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
        if (alreadyOpen) {
            Modal.getInstance(alreadyOpen).hide();
        }
        var data = Modal.getOrCreateInstance(target);
        data.toggle(this);
    });
    enableDismissTrigger(Modal);
    /**
     * jQuery
     */
    defineJQueryPlugin(Modal);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap offcanvas.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$6 = 'offcanvas';
    var DATA_KEY$3 = 'bs.offcanvas';
    var EVENT_KEY$3 = ".".concat(DATA_KEY$3);
    var DATA_API_KEY$1 = '.data-api';
    var EVENT_LOAD_DATA_API$2 = "load".concat(EVENT_KEY$3).concat(DATA_API_KEY$1);
    var ESCAPE_KEY = 'Escape';
    var CLASS_NAME_SHOW$3 = 'show';
    var CLASS_NAME_SHOWING$1 = 'showing';
    var CLASS_NAME_HIDING = 'hiding';
    var CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
    var OPEN_SELECTOR = '.offcanvas.show';
    var EVENT_SHOW$3 = "show".concat(EVENT_KEY$3);
    var EVENT_SHOWN$3 = "shown".concat(EVENT_KEY$3);
    var EVENT_HIDE$3 = "hide".concat(EVENT_KEY$3);
    var EVENT_HIDE_PREVENTED = "hidePrevented".concat(EVENT_KEY$3);
    var EVENT_HIDDEN$3 = "hidden".concat(EVENT_KEY$3);
    var EVENT_RESIZE = "resize".concat(EVENT_KEY$3);
    var EVENT_CLICK_DATA_API$1 = "click".concat(EVENT_KEY$3).concat(DATA_API_KEY$1);
    var EVENT_KEYDOWN_DISMISS = "keydown.dismiss".concat(EVENT_KEY$3);
    var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
    var Default$5 = {
        backdrop: true,
        keyboard: true,
        scroll: false
    };
    var DefaultType$5 = {
        backdrop: '(boolean|string)',
        keyboard: 'boolean',
        scroll: 'boolean'
    };
    /**
     * Class definition
     */
    var Offcanvas = /** @class */ (function (_super) {
        __extends(Offcanvas, _super);
        function Offcanvas(element, config) {
            var _this = _super.call(this, element, config) || this;
            _this._isShown = false;
            _this._backdrop = _this._initializeBackDrop();
            _this._focustrap = _this._initializeFocusTrap();
            _this._addEventListeners();
            return _this;
        }
        Object.defineProperty(Offcanvas, "Default", {
            // Getters
            get: function () {
                return Default$5;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Offcanvas, "DefaultType", {
            get: function () {
                return DefaultType$5;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Offcanvas, "NAME", {
            get: function () {
                return NAME$6;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        Offcanvas.prototype.toggle = function (relatedTarget) {
            return this._isShown ? this.hide() : this.show(relatedTarget);
        };
        Offcanvas.prototype.show = function (relatedTarget) {
            var _this = this;
            if (this._isShown) {
                return;
            }
            var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
                relatedTarget: relatedTarget
            });
            if (showEvent.defaultPrevented) {
                return;
            }
            this._isShown = true;
            this._backdrop.show();
            if (!this._config.scroll) {
                new ScrollBarHelper().hide();
            }
            this._element.setAttribute('aria-modal', true);
            this._element.setAttribute('role', 'dialog');
            this._element.classList.add(CLASS_NAME_SHOWING$1);
            var completeCallBack = function () {
                if (!_this._config.scroll || _this._config.backdrop) {
                    _this._focustrap.activate();
                }
                _this._element.classList.add(CLASS_NAME_SHOW$3);
                _this._element.classList.remove(CLASS_NAME_SHOWING$1);
                EventHandler.trigger(_this._element, EVENT_SHOWN$3, {
                    relatedTarget: relatedTarget
                });
            };
            this._queueCallback(completeCallBack, this._element, true);
        };
        Offcanvas.prototype.hide = function () {
            var _this = this;
            if (!this._isShown) {
                return;
            }
            var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
            if (hideEvent.defaultPrevented) {
                return;
            }
            this._focustrap.deactivate();
            this._element.blur();
            this._isShown = false;
            this._element.classList.add(CLASS_NAME_HIDING);
            this._backdrop.hide();
            var completeCallback = function () {
                _this._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
                _this._element.removeAttribute('aria-modal');
                _this._element.removeAttribute('role');
                if (!_this._config.scroll) {
                    new ScrollBarHelper().reset();
                }
                EventHandler.trigger(_this._element, EVENT_HIDDEN$3);
            };
            this._queueCallback(completeCallback, this._element, true);
        };
        Offcanvas.prototype.dispose = function () {
            this._backdrop.dispose();
            this._focustrap.deactivate();
            _super.prototype.dispose.call(this);
        };
        // Private
        Offcanvas.prototype._initializeBackDrop = function () {
            var _this = this;
            var clickCallback = function () {
                if (_this._config.backdrop === 'static') {
                    EventHandler.trigger(_this._element, EVENT_HIDE_PREVENTED);
                    return;
                }
                _this.hide();
            };
            // 'static' option will be translated to true, and booleans will keep their value
            var isVisible = Boolean(this._config.backdrop);
            return new Backdrop({
                className: CLASS_NAME_BACKDROP,
                isVisible: isVisible,
                isAnimated: true,
                rootElement: this._element.parentNode,
                clickCallback: isVisible ? clickCallback : null
            });
        };
        Offcanvas.prototype._initializeFocusTrap = function () {
            return new FocusTrap({
                trapElement: this._element
            });
        };
        Offcanvas.prototype._addEventListeners = function () {
            var _this = this;
            EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
                if (event.key !== ESCAPE_KEY) {
                    return;
                }
                if (_this._config.keyboard) {
                    _this.hide();
                    return;
                }
                EventHandler.trigger(_this._element, EVENT_HIDE_PREVENTED);
            });
        };
        // Static
        Offcanvas.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Offcanvas.getOrCreateInstance(this, config);
                if (typeof config !== 'string') {
                    return;
                }
                if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                    throw new TypeError("No method named \"".concat(config, "\""));
                }
                data[config](this);
            });
        };
        return Offcanvas;
    }(BaseComponent));
    exports.Offcanvas = Offcanvas;
    /**
     * Data API implementation
     */
    EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
        var _this = this;
        var target = SelectorEngine.getElementFromSelector(this);
        if (['A', 'AREA'].includes(this.tagName)) {
            event.preventDefault();
        }
        if (isDisabled(this)) {
            return;
        }
        EventHandler.one(target, EVENT_HIDDEN$3, function () {
            // focus on trigger when it is closed
            if (isVisible(_this)) {
                _this.focus();
            }
        });
        // avoid conflict when clicking a toggler of an offcanvas, while another is open
        var alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
        if (alreadyOpen && alreadyOpen !== target) {
            Offcanvas.getInstance(alreadyOpen).hide();
        }
        var data = Offcanvas.getOrCreateInstance(target);
        data.toggle(this);
    });
    EventHandler.on(window, EVENT_LOAD_DATA_API$2, function () {
        for (var _i = 0, _a = SelectorEngine.find(OPEN_SELECTOR); _i < _a.length; _i++) {
            var selector = _a[_i];
            Offcanvas.getOrCreateInstance(selector).show();
        }
    });
    EventHandler.on(window, EVENT_RESIZE, function () {
        for (var _i = 0, _a = SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]'); _i < _a.length; _i++) {
            var element = _a[_i];
            if (getComputedStyle(element).position !== 'fixed') {
                Offcanvas.getOrCreateInstance(element).hide();
            }
        }
    });
    enableDismissTrigger(Offcanvas);
    /**
     * jQuery
     */
    defineJQueryPlugin(Offcanvas);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/sanitizer.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    // js-docs-start allow-list
    var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    var DefaultAllowlist = {
        // Global attributes allowed on any supplied element below.
        '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
        a: ['target', 'href', 'title', 'rel'],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    };
    // js-docs-end allow-list
    var uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
    /**
     * A pattern that recognizes URLs that are safe wrt. XSS in URL navigation
     * contexts.
     *
     * Shout-out to Angular https://github.com/angular/angular/blob/15.2.8/packages/core/src/sanitization/url_sanitizer.ts#L38
     */
    // eslint-disable-next-line unicorn/better-regex
    var SAFE_URL_PATTERN = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
    var allowedAttribute = function (attribute, allowedAttributeList) {
        var attributeName = attribute.nodeName.toLowerCase();
        if (allowedAttributeList.includes(attributeName)) {
            if (uriAttributes.has(attributeName)) {
                return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue));
            }
            return true;
        }
        // Check if a regular expression validates the attribute.
        return allowedAttributeList.filter(function (attributeRegex) { return attributeRegex instanceof RegExp; }).some(function (regex) { return regex.test(attributeName); });
    };
    function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
        if (!unsafeHtml.length) {
            return unsafeHtml;
        }
        if (sanitizeFunction && typeof sanitizeFunction === 'function') {
            return sanitizeFunction(unsafeHtml);
        }
        var domParser = new window.DOMParser();
        var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
        var elements = [].concat.apply([], createdDocument.body.querySelectorAll('*'));
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            var elementName = element.nodeName.toLowerCase();
            if (!Object.keys(allowList).includes(elementName)) {
                element.remove();
                continue;
            }
            var attributeList = [].concat.apply([], element.attributes);
            var allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
            for (var _a = 0, attributeList_1 = attributeList; _a < attributeList_1.length; _a++) {
                var attribute = attributeList_1[_a];
                if (!allowedAttribute(attribute, allowedAttributes)) {
                    element.removeAttribute(attribute.nodeName);
                }
            }
        }
        return createdDocument.body.innerHTML;
    }
    /**
     * --------------------------------------------------------------------------
     * Bootstrap util/template-factory.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$5 = 'TemplateFactory';
    var Default$4 = {
        allowList: DefaultAllowlist,
        content: {},
        // { selector : text ,  selector2 : text2 , }
        extraClass: '',
        html: false,
        sanitize: true,
        sanitizeFn: null,
        template: '<div></div>'
    };
    var DefaultType$4 = {
        allowList: 'object',
        content: 'object',
        extraClass: '(string|function)',
        html: 'boolean',
        sanitize: 'boolean',
        sanitizeFn: '(null|function)',
        template: 'string'
    };
    var DefaultContentType = {
        entry: '(string|element|function|null)',
        selector: '(string|element)'
    };
    /**
     * Class definition
     */
    var TemplateFactory = /** @class */ (function (_super) {
        __extends(TemplateFactory, _super);
        function TemplateFactory(config) {
            var _this = _super.call(this) || this;
            _this._config = _this._getConfig(config);
            return _this;
        }
        Object.defineProperty(TemplateFactory, "Default", {
            // Getters
            get: function () {
                return Default$4;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TemplateFactory, "DefaultType", {
            get: function () {
                return DefaultType$4;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TemplateFactory, "NAME", {
            get: function () {
                return NAME$5;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        TemplateFactory.prototype.getContent = function () {
            var _this = this;
            return Object.values(this._config.content).map(function (config) { return _this._resolvePossibleFunction(config); }).filter(Boolean);
        };
        TemplateFactory.prototype.hasContent = function () {
            return this.getContent().length > 0;
        };
        TemplateFactory.prototype.changeContent = function (content) {
            this._checkContent(content);
            this._config.content = __assign(__assign({}, this._config.content), content);
            return this;
        };
        TemplateFactory.prototype.toHtml = function () {
            var _a;
            var templateWrapper = document.createElement('div');
            templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
            for (var _i = 0, _b = Object.entries(this._config.content); _i < _b.length; _i++) {
                var _c = _b[_i], selector = _c[0], text = _c[1];
                this._setContent(templateWrapper, text, selector);
            }
            var template = templateWrapper.children[0];
            var extraClass = this._resolvePossibleFunction(this._config.extraClass);
            if (extraClass) {
                (_a = template.classList).add.apply(_a, extraClass.split(' '));
            }
            return template;
        };
        // Private
        TemplateFactory.prototype._typeCheckConfig = function (config) {
            _super.prototype._typeCheckConfig.call(this, config);
            this._checkContent(config.content);
        };
        TemplateFactory.prototype._checkContent = function (arg) {
            for (var _i = 0, _a = Object.entries(arg); _i < _a.length; _i++) {
                var _b = _a[_i], selector = _b[0], content = _b[1];
                _super.prototype._typeCheckConfig.call(this, {
                    selector: selector,
                    entry: content
                }, DefaultContentType);
            }
        };
        TemplateFactory.prototype._setContent = function (template, content, selector) {
            var templateElement = SelectorEngine.findOne(selector, template);
            if (!templateElement) {
                return;
            }
            content = this._resolvePossibleFunction(content);
            if (!content) {
                templateElement.remove();
                return;
            }
            if (isElement(content)) {
                this._putElementInTemplate(getElement(content), templateElement);
                return;
            }
            if (this._config.html) {
                templateElement.innerHTML = this._maybeSanitize(content);
                return;
            }
            templateElement.textContent = content;
        };
        TemplateFactory.prototype._maybeSanitize = function (arg) {
            return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
        };
        TemplateFactory.prototype._resolvePossibleFunction = function (arg) {
            return execute(arg, [this]);
        };
        TemplateFactory.prototype._putElementInTemplate = function (element, templateElement) {
            if (this._config.html) {
                templateElement.innerHTML = '';
                templateElement.append(element);
                return;
            }
            templateElement.textContent = element.textContent;
        };
        return TemplateFactory;
    }(Config));
    /**
     * --------------------------------------------------------------------------
     * Bootstrap tooltip.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$4 = 'tooltip';
    var DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
    var CLASS_NAME_FADE$2 = 'fade';
    var CLASS_NAME_MODAL = 'modal';
    var CLASS_NAME_SHOW$2 = 'show';
    var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
    var SELECTOR_MODAL = ".".concat(CLASS_NAME_MODAL);
    var EVENT_MODAL_HIDE = 'hide.bs.modal';
    var TRIGGER_HOVER = 'hover';
    var TRIGGER_FOCUS = 'focus';
    var TRIGGER_CLICK = 'click';
    var TRIGGER_MANUAL = 'manual';
    var EVENT_HIDE$2 = 'hide';
    var EVENT_HIDDEN$2 = 'hidden';
    var EVENT_SHOW$2 = 'show';
    var EVENT_SHOWN$2 = 'shown';
    var EVENT_INSERTED = 'inserted';
    var EVENT_CLICK$1 = 'click';
    var EVENT_FOCUSIN$1 = 'focusin';
    var EVENT_FOCUSOUT$1 = 'focusout';
    var EVENT_MOUSEENTER = 'mouseenter';
    var EVENT_MOUSELEAVE = 'mouseleave';
    var AttachmentMap = {
        AUTO: 'auto',
        TOP: 'top',
        RIGHT: isRTL() ? 'left' : 'right',
        BOTTOM: 'bottom',
        LEFT: isRTL() ? 'right' : 'left'
    };
    var Default$3 = {
        allowList: DefaultAllowlist,
        animation: true,
        boundary: 'clippingParents',
        container: false,
        customClass: '',
        delay: 0,
        fallbackPlacements: ['top', 'right', 'bottom', 'left'],
        html: false,
        offset: [0, 6],
        placement: 'top',
        popperConfig: null,
        sanitize: true,
        sanitizeFn: null,
        selector: false,
        template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
        title: '',
        trigger: 'hover focus'
    };
    var DefaultType$3 = {
        allowList: 'object',
        animation: 'boolean',
        boundary: '(string|element)',
        container: '(string|element|boolean)',
        customClass: '(string|function)',
        delay: '(number|object)',
        fallbackPlacements: 'array',
        html: 'boolean',
        offset: '(array|string|function)',
        placement: '(string|function)',
        popperConfig: '(null|object|function)',
        sanitize: 'boolean',
        sanitizeFn: '(null|function)',
        selector: '(string|boolean)',
        template: 'string',
        title: '(string|element|function)',
        trigger: 'string'
    };
    /**
     * Class definition
     */
    var Tooltip = /** @class */ (function (_super) {
        __extends(Tooltip, _super);
        function Tooltip(element, config) {
            var _this = this;
            if (typeof Popper === 'undefined') {
                throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
            }
            _this = _super.call(this, element, config) || this;
            // Private
            _this._isEnabled = true;
            _this._timeout = 0;
            _this._isHovered = null;
            _this._activeTrigger = {};
            _this._popper = null;
            _this._templateFactory = null;
            _this._newContent = null;
            // Protected
            _this.tip = null;
            _this._setListeners();
            if (!_this._config.selector) {
                _this._fixTitle();
            }
            return _this;
        }
        Object.defineProperty(Tooltip, "Default", {
            // Getters
            get: function () {
                return Default$3;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tooltip, "DefaultType", {
            get: function () {
                return DefaultType$3;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Tooltip, "NAME", {
            get: function () {
                return NAME$4;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        Tooltip.prototype.enable = function () {
            this._isEnabled = true;
        };
        Tooltip.prototype.disable = function () {
            this._isEnabled = false;
        };
        Tooltip.prototype.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled;
        };
        Tooltip.prototype.toggle = function () {
            if (!this._isEnabled) {
                return;
            }
            this._activeTrigger.click = !this._activeTrigger.click;
            if (this._isShown()) {
                this._leave();
                return;
            }
            this._enter();
        };
        Tooltip.prototype.dispose = function () {
            clearTimeout(this._timeout);
            EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
            if (this._element.getAttribute('data-bs-original-title')) {
                this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
            }
            this._disposePopper();
            _super.prototype.dispose.call(this);
        };
        Tooltip.prototype.show = function () {
            var _this = this;
            if (this._element.style.display === 'none') {
                throw new Error('Please use show on visible elements');
            }
            if (!(this._isWithContent() && this._isEnabled)) {
                return;
            }
            var showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
            var shadowRoot = findShadowRoot(this._element);
            var isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
            if (showEvent.defaultPrevented || !isInTheDom) {
                return;
            }
            // TODO: v6 remove this or make it optional
            this._disposePopper();
            var tip = this._getTipElement();
            this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
            var container = this._config.container;
            if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
                container.append(tip);
                EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
            }
            this._popper = this._createPopper(tip);
            tip.classList.add(CLASS_NAME_SHOW$2);
            // If this is a touch-enabled device we add extra
            // empty mouseover listeners to the body's immediate children;
            // only needed because of broken event delegation on iOS
            // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
            if ('ontouchstart' in document.documentElement) {
                for (var _i = 0, _a = [].concat.apply([], document.body.children); _i < _a.length; _i++) {
                    var element = _a[_i];
                    EventHandler.on(element, 'mouseover', noop);
                }
            }
            var complete = function () {
                EventHandler.trigger(_this._element, _this.constructor.eventName(EVENT_SHOWN$2));
                if (_this._isHovered === false) {
                    _this._leave();
                }
                _this._isHovered = false;
            };
            this._queueCallback(complete, this.tip, this._isAnimated());
        };
        Tooltip.prototype.hide = function () {
            var _this = this;
            if (!this._isShown()) {
                return;
            }
            var hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
            if (hideEvent.defaultPrevented) {
                return;
            }
            var tip = this._getTipElement();
            tip.classList.remove(CLASS_NAME_SHOW$2);
            // If this is a touch-enabled device we remove the extra
            // empty mouseover listeners we added for iOS support
            if ('ontouchstart' in document.documentElement) {
                for (var _i = 0, _a = [].concat.apply([], document.body.children); _i < _a.length; _i++) {
                    var element = _a[_i];
                    EventHandler.off(element, 'mouseover', noop);
                }
            }
            this._activeTrigger[TRIGGER_CLICK] = false;
            this._activeTrigger[TRIGGER_FOCUS] = false;
            this._activeTrigger[TRIGGER_HOVER] = false;
            this._isHovered = null; // it is a trick to support manual triggering
            var complete = function () {
                if (_this._isWithActiveTrigger()) {
                    return;
                }
                if (!_this._isHovered) {
                    _this._disposePopper();
                }
                _this._element.removeAttribute('aria-describedby');
                EventHandler.trigger(_this._element, _this.constructor.eventName(EVENT_HIDDEN$2));
            };
            this._queueCallback(complete, this.tip, this._isAnimated());
        };
        Tooltip.prototype.update = function () {
            if (this._popper) {
                this._popper.update();
            }
        };
        // Protected
        Tooltip.prototype._isWithContent = function () {
            return Boolean(this._getTitle());
        };
        Tooltip.prototype._getTipElement = function () {
            if (!this.tip) {
                this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
            }
            return this.tip;
        };
        Tooltip.prototype._createTipElement = function (content) {
            var tip = this._getTemplateFactory(content).toHtml();
            // TODO: remove this check in v6
            if (!tip) {
                return null;
            }
            tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
            // TODO: v6 the following can be achieved with CSS only
            tip.classList.add("bs-".concat(this.constructor.NAME, "-auto"));
            var tipId = getUID(this.constructor.NAME).toString();
            tip.setAttribute('id', tipId);
            if (this._isAnimated()) {
                tip.classList.add(CLASS_NAME_FADE$2);
            }
            return tip;
        };
        Tooltip.prototype.setContent = function (content) {
            this._newContent = content;
            if (this._isShown()) {
                this._disposePopper();
                this.show();
            }
        };
        Tooltip.prototype._getTemplateFactory = function (content) {
            if (this._templateFactory) {
                this._templateFactory.changeContent(content);
            }
            else {
                this._templateFactory = new TemplateFactory(__assign(__assign({}, this._config), { 
                    // the `content` var has to be after `this._config`
                    // to override config.content in case of popover
                    content: content, extraClass: this._resolvePossibleFunction(this._config.customClass) }));
            }
            return this._templateFactory;
        };
        Tooltip.prototype._getContentForTemplate = function () {
            var _a;
            return _a = {},
                _a[SELECTOR_TOOLTIP_INNER] = this._getTitle(),
                _a;
        };
        Tooltip.prototype._getTitle = function () {
            return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
        };
        // Private
        Tooltip.prototype._initializeOnDelegatedTarget = function (event) {
            return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
        };
        Tooltip.prototype._isAnimated = function () {
            return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
        };
        Tooltip.prototype._isShown = function () {
            return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
        };
        Tooltip.prototype._createPopper = function (tip) {
            var placement = execute(this._config.placement, [this, tip, this._element]);
            var attachment = AttachmentMap[placement.toUpperCase()];
            return Popper.createPopper(this._element, tip, this._getPopperConfig(attachment));
        };
        Tooltip.prototype._getOffset = function () {
            var _this = this;
            var offset = this._config.offset;
            if (typeof offset === 'string') {
                return offset.split(',').map(function (value) { return Number.parseInt(value, 10); });
            }
            if (typeof offset === 'function') {
                return function (popperData) { return offset(popperData, _this._element); };
            }
            return offset;
        };
        Tooltip.prototype._resolvePossibleFunction = function (arg) {
            return execute(arg, [this._element]);
        };
        Tooltip.prototype._getPopperConfig = function (attachment) {
            var _this = this;
            var defaultBsPopperConfig = {
                placement: attachment,
                modifiers: [{
                        name: 'flip',
                        options: {
                            fallbackPlacements: this._config.fallbackPlacements
                        }
                    }, {
                        name: 'offset',
                        options: {
                            offset: this._getOffset()
                        }
                    }, {
                        name: 'preventOverflow',
                        options: {
                            boundary: this._config.boundary
                        }
                    }, {
                        name: 'arrow',
                        options: {
                            element: ".".concat(this.constructor.NAME, "-arrow")
                        }
                    }, {
                        name: 'preSetPlacement',
                        enabled: true,
                        phase: 'beforeMain',
                        fn: function (data) {
                            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
                            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
                            _this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
                        }
                    }]
            };
            return __assign(__assign({}, defaultBsPopperConfig), execute(this._config.popperConfig, [defaultBsPopperConfig]));
        };
        Tooltip.prototype._setListeners = function () {
            var _this = this;
            var triggers = this._config.trigger.split(' ');
            for (var _i = 0, triggers_1 = triggers; _i < triggers_1.length; _i++) {
                var trigger = triggers_1[_i];
                if (trigger === 'click') {
                    EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, function (event) {
                        var context = _this._initializeOnDelegatedTarget(event);
                        context.toggle();
                    });
                }
                else if (trigger !== TRIGGER_MANUAL) {
                    var eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
                    var eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
                    EventHandler.on(this._element, eventIn, this._config.selector, function (event) {
                        var context = _this._initializeOnDelegatedTarget(event);
                        context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
                        context._enter();
                    });
                    EventHandler.on(this._element, eventOut, this._config.selector, function (event) {
                        var context = _this._initializeOnDelegatedTarget(event);
                        context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
                        context._leave();
                    });
                }
            }
            this._hideModalHandler = function () {
                if (_this._element) {
                    _this.hide();
                }
            };
            EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
        };
        Tooltip.prototype._fixTitle = function () {
            var title = this._element.getAttribute('title');
            if (!title) {
                return;
            }
            if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
                this._element.setAttribute('aria-label', title);
            }
            this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
            this._element.removeAttribute('title');
        };
        Tooltip.prototype._enter = function () {
            var _this = this;
            if (this._isShown() || this._isHovered) {
                this._isHovered = true;
                return;
            }
            this._isHovered = true;
            this._setTimeout(function () {
                if (_this._isHovered) {
                    _this.show();
                }
            }, this._config.delay.show);
        };
        Tooltip.prototype._leave = function () {
            var _this = this;
            if (this._isWithActiveTrigger()) {
                return;
            }
            this._isHovered = false;
            this._setTimeout(function () {
                if (!_this._isHovered) {
                    _this.hide();
                }
            }, this._config.delay.hide);
        };
        Tooltip.prototype._setTimeout = function (handler, timeout) {
            clearTimeout(this._timeout);
            this._timeout = setTimeout(handler, timeout);
        };
        Tooltip.prototype._isWithActiveTrigger = function () {
            return Object.values(this._activeTrigger).includes(true);
        };
        Tooltip.prototype._getConfig = function (config) {
            var dataAttributes = Manipulator.getDataAttributes(this._element);
            for (var _i = 0, _a = Object.keys(dataAttributes); _i < _a.length; _i++) {
                var dataAttribute = _a[_i];
                if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
                    delete dataAttributes[dataAttribute];
                }
            }
            config = __assign(__assign({}, dataAttributes), (typeof config === 'object' && config ? config : {}));
            config = this._mergeConfigObj(config);
            config = this._configAfterMerge(config);
            this._typeCheckConfig(config);
            return config;
        };
        Tooltip.prototype._configAfterMerge = function (config) {
            config.container = config.container === false ? document.body : getElement(config.container);
            if (typeof config.delay === 'number') {
                config.delay = {
                    show: config.delay,
                    hide: config.delay
                };
            }
            if (typeof config.title === 'number') {
                config.title = config.title.toString();
            }
            if (typeof config.content === 'number') {
                config.content = config.content.toString();
            }
            return config;
        };
        Tooltip.prototype._getDelegateConfig = function () {
            var config = {};
            for (var _i = 0, _a = Object.entries(this._config); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (this.constructor.Default[key] !== value) {
                    config[key] = value;
                }
            }
            config.selector = false;
            config.trigger = 'manual';
            // In the future can be replaced with:
            // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
            // `Object.fromEntries(keysWithDifferentValues)`
            return config;
        };
        Tooltip.prototype._disposePopper = function () {
            if (this._popper) {
                this._popper.destroy();
                this._popper = null;
            }
            if (this.tip) {
                this.tip.remove();
                this.tip = null;
            }
        };
        // Static
        Tooltip.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Tooltip.getOrCreateInstance(this, config);
                if (typeof config !== 'string') {
                    return;
                }
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"".concat(config, "\""));
                }
                data[config]();
            });
        };
        return Tooltip;
    }(BaseComponent));
    exports.Tooltip = Tooltip;
    /**
     * jQuery
     */
    defineJQueryPlugin(Tooltip);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap popover.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$3 = 'popover';
    var SELECTOR_TITLE = '.popover-header';
    var SELECTOR_CONTENT = '.popover-body';
    var Default$2 = __assign(__assign({}, Tooltip.Default), { content: '', offset: [0, 8], placement: 'right', template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>', trigger: 'click' });
    var DefaultType$2 = __assign(__assign({}, Tooltip.DefaultType), { content: '(null|string|element|function)' });
    /**
     * Class definition
     */
    var Popover = /** @class */ (function (_super) {
        __extends(Popover, _super);
        function Popover() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Popover, "Default", {
            // Getters
            get: function () {
                return Default$2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Popover, "DefaultType", {
            get: function () {
                return DefaultType$2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Popover, "NAME", {
            get: function () {
                return NAME$3;
            },
            enumerable: false,
            configurable: true
        });
        // Overrides
        Popover.prototype._isWithContent = function () {
            return this._getTitle() || this._getContent();
        };
        // Private
        Popover.prototype._getContentForTemplate = function () {
            var _a;
            return _a = {},
                _a[SELECTOR_TITLE] = this._getTitle(),
                _a[SELECTOR_CONTENT] = this._getContent(),
                _a;
        };
        Popover.prototype._getContent = function () {
            return this._resolvePossibleFunction(this._config.content);
        };
        // Static
        Popover.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Popover.getOrCreateInstance(this, config);
                if (typeof config !== 'string') {
                    return;
                }
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"".concat(config, "\""));
                }
                data[config]();
            });
        };
        return Popover;
    }(Tooltip));
    exports.Popover = Popover;
    /**
     * jQuery
     */
    defineJQueryPlugin(Popover);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap scrollspy.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$2 = 'scrollspy';
    var DATA_KEY$2 = 'bs.scrollspy';
    var EVENT_KEY$2 = ".".concat(DATA_KEY$2);
    var DATA_API_KEY = '.data-api';
    var EVENT_ACTIVATE = "activate".concat(EVENT_KEY$2);
    var EVENT_CLICK = "click".concat(EVENT_KEY$2);
    var EVENT_LOAD_DATA_API$1 = "load".concat(EVENT_KEY$2).concat(DATA_API_KEY);
    var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
    var CLASS_NAME_ACTIVE$1 = 'active';
    var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
    var SELECTOR_TARGET_LINKS = '[href]';
    var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
    var SELECTOR_NAV_LINKS = '.nav-link';
    var SELECTOR_NAV_ITEMS = '.nav-item';
    var SELECTOR_LIST_ITEMS = '.list-group-item';
    var SELECTOR_LINK_ITEMS = "".concat(SELECTOR_NAV_LINKS, ", ").concat(SELECTOR_NAV_ITEMS, " > ").concat(SELECTOR_NAV_LINKS, ", ").concat(SELECTOR_LIST_ITEMS);
    var SELECTOR_DROPDOWN = '.dropdown';
    var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
    var Default$1 = {
        offset: null,
        // TODO: v6 @deprecated, keep it for backwards compatibility reasons
        rootMargin: '0px 0px -25%',
        smoothScroll: false,
        target: null,
        threshold: [0.1, 0.5, 1]
    };
    var DefaultType$1 = {
        offset: '(number|null)',
        // TODO v6 @deprecated, keep it for backwards compatibility reasons
        rootMargin: 'string',
        smoothScroll: 'boolean',
        target: 'element',
        threshold: 'array'
    };
    /**
     * Class definition
     */
    var ScrollSpy = /** @class */ (function (_super) {
        __extends(ScrollSpy, _super);
        function ScrollSpy(element, config) {
            var _this = _super.call(this, element, config) || this;
            // this._element is the observablesContainer and config.target the menu links wrapper
            _this._targetLinks = new Map();
            _this._observableSections = new Map();
            _this._rootElement = getComputedStyle(_this._element).overflowY === 'visible' ? null : _this._element;
            _this._activeTarget = null;
            _this._observer = null;
            _this._previousScrollData = {
                visibleEntryTop: 0,
                parentScrollTop: 0
            };
            _this.refresh(); // initialize
            return _this;
        }
        Object.defineProperty(ScrollSpy, "Default", {
            // Getters
            get: function () {
                return Default$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScrollSpy, "DefaultType", {
            get: function () {
                return DefaultType$1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScrollSpy, "NAME", {
            get: function () {
                return NAME$2;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        ScrollSpy.prototype.refresh = function () {
            this._initializeTargetsAndObservables();
            this._maybeEnableSmoothScroll();
            if (this._observer) {
                this._observer.disconnect();
            }
            else {
                this._observer = this._getNewObserver();
            }
            for (var _i = 0, _a = this._observableSections.values(); _i < _a.length; _i++) {
                var section = _a[_i];
                this._observer.observe(section);
            }
        };
        ScrollSpy.prototype.dispose = function () {
            this._observer.disconnect();
            _super.prototype.dispose.call(this);
        };
        // Private
        ScrollSpy.prototype._configAfterMerge = function (config) {
            // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
            config.target = getElement(config.target) || document.body;
            // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
            config.rootMargin = config.offset ? "".concat(config.offset, "px 0px -30%") : config.rootMargin;
            if (typeof config.threshold === 'string') {
                config.threshold = config.threshold.split(',').map(function (value) { return Number.parseFloat(value); });
            }
            return config;
        };
        ScrollSpy.prototype._maybeEnableSmoothScroll = function () {
            var _this = this;
            if (!this._config.smoothScroll) {
                return;
            }
            // unregister any previous listeners
            EventHandler.off(this._config.target, EVENT_CLICK);
            EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, function (event) {
                var observableSection = _this._observableSections.get(event.target.hash);
                if (observableSection) {
                    event.preventDefault();
                    var root = _this._rootElement || window;
                    var height = observableSection.offsetTop - _this._element.offsetTop;
                    if (root.scrollTo) {
                        root.scrollTo({
                            top: height,
                            behavior: 'smooth'
                        });
                        return;
                    }
                    // Chrome 60 doesn't support `scrollTo`
                    root.scrollTop = height;
                }
            });
        };
        ScrollSpy.prototype._getNewObserver = function () {
            var _this = this;
            var options = {
                root: this._rootElement,
                threshold: this._config.threshold,
                rootMargin: this._config.rootMargin
            };
            return new IntersectionObserver(function (entries) { return _this._observerCallback(entries); }, options);
        };
        // The logic of selection
        ScrollSpy.prototype._observerCallback = function (entries) {
            var _this = this;
            var targetElement = function (entry) { return _this._targetLinks.get("#".concat(entry.target.id)); };
            var activate = function (entry) {
                _this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
                _this._process(targetElement(entry));
            };
            var parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
            var userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = parentScrollTop;
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                if (!entry.isIntersecting) {
                    this._activeTarget = null;
                    this._clearActiveClass(targetElement(entry));
                    continue;
                }
                var entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                // if we are scrolling down, pick the bigger offsetTop
                if (userScrollsDown && entryIsLowerThanPrevious) {
                    activate(entry);
                    // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
                    if (!parentScrollTop) {
                        return;
                    }
                    continue;
                }
                // if we are scrolling up, pick the smallest offsetTop
                if (!userScrollsDown && !entryIsLowerThanPrevious) {
                    activate(entry);
                }
            }
        };
        ScrollSpy.prototype._initializeTargetsAndObservables = function () {
            this._targetLinks = new Map();
            this._observableSections = new Map();
            var targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
            for (var _i = 0, targetLinks_1 = targetLinks; _i < targetLinks_1.length; _i++) {
                var anchor = targetLinks_1[_i];
                // ensure that the anchor has an id and is not disabled
                if (!anchor.hash || isDisabled(anchor)) {
                    continue;
                }
                var observableSection = SelectorEngine.findOne(decodeURI(anchor.hash), this._element);
                // ensure that the observableSection exists & is visible
                if (isVisible(observableSection)) {
                    this._targetLinks.set(decodeURI(anchor.hash), anchor);
                    this._observableSections.set(anchor.hash, observableSection);
                }
            }
        };
        ScrollSpy.prototype._process = function (target) {
            if (this._activeTarget === target) {
                return;
            }
            this._clearActiveClass(this._config.target);
            this._activeTarget = target;
            target.classList.add(CLASS_NAME_ACTIVE$1);
            this._activateParents(target);
            EventHandler.trigger(this._element, EVENT_ACTIVATE, {
                relatedTarget: target
            });
        };
        ScrollSpy.prototype._activateParents = function (target) {
            // Activate dropdown parents
            if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
                SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
                return;
            }
            for (var _i = 0, _a = SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP); _i < _a.length; _i++) {
                var listGroup = _a[_i];
                // Set triggered links parents as active
                // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
                for (var _b = 0, _c = SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS); _b < _c.length; _b++) {
                    var item = _c[_b];
                    item.classList.add(CLASS_NAME_ACTIVE$1);
                }
            }
        };
        ScrollSpy.prototype._clearActiveClass = function (parent) {
            parent.classList.remove(CLASS_NAME_ACTIVE$1);
            var activeNodes = SelectorEngine.find("".concat(SELECTOR_TARGET_LINKS, ".").concat(CLASS_NAME_ACTIVE$1), parent);
            for (var _i = 0, activeNodes_1 = activeNodes; _i < activeNodes_1.length; _i++) {
                var node = activeNodes_1[_i];
                node.classList.remove(CLASS_NAME_ACTIVE$1);
            }
        };
        // Static
        ScrollSpy.jQueryInterface = function (config) {
            return this.each(function () {
                var data = ScrollSpy.getOrCreateInstance(this, config);
                if (typeof config !== 'string') {
                    return;
                }
                if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                    throw new TypeError("No method named \"".concat(config, "\""));
                }
                data[config]();
            });
        };
        return ScrollSpy;
    }(BaseComponent));
    exports.ScrollSpy = ScrollSpy;
    /**
     * Data API implementation
     */
    EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
        for (var _i = 0, _a = SelectorEngine.find(SELECTOR_DATA_SPY); _i < _a.length; _i++) {
            var spy = _a[_i];
            ScrollSpy.getOrCreateInstance(spy);
        }
    });
    /**
     * jQuery
     */
    defineJQueryPlugin(ScrollSpy);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap tab.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME$1 = 'tab';
    var DATA_KEY$1 = 'bs.tab';
    var EVENT_KEY$1 = ".".concat(DATA_KEY$1);
    var EVENT_HIDE$1 = "hide".concat(EVENT_KEY$1);
    var EVENT_HIDDEN$1 = "hidden".concat(EVENT_KEY$1);
    var EVENT_SHOW$1 = "show".concat(EVENT_KEY$1);
    var EVENT_SHOWN$1 = "shown".concat(EVENT_KEY$1);
    var EVENT_CLICK_DATA_API = "click".concat(EVENT_KEY$1);
    var EVENT_KEYDOWN = "keydown".concat(EVENT_KEY$1);
    var EVENT_LOAD_DATA_API = "load".concat(EVENT_KEY$1);
    var ARROW_LEFT_KEY = 'ArrowLeft';
    var ARROW_RIGHT_KEY = 'ArrowRight';
    var ARROW_UP_KEY = 'ArrowUp';
    var ARROW_DOWN_KEY = 'ArrowDown';
    var CLASS_NAME_ACTIVE = 'active';
    var CLASS_NAME_FADE$1 = 'fade';
    var CLASS_NAME_SHOW$1 = 'show';
    var CLASS_DROPDOWN = 'dropdown';
    var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
    var SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
    var NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
    var SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
    var SELECTOR_OUTER = '.nav-item, .list-group-item';
    var SELECTOR_INNER = ".nav-link".concat(NOT_SELECTOR_DROPDOWN_TOGGLE, ", .list-group-item").concat(NOT_SELECTOR_DROPDOWN_TOGGLE, ", [role=\"tab\"]").concat(NOT_SELECTOR_DROPDOWN_TOGGLE);
    var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
    var SELECTOR_INNER_ELEM = "".concat(SELECTOR_INNER, ", ").concat(SELECTOR_DATA_TOGGLE);
    var SELECTOR_DATA_TOGGLE_ACTIVE = ".".concat(CLASS_NAME_ACTIVE, "[data-bs-toggle=\"tab\"], .").concat(CLASS_NAME_ACTIVE, "[data-bs-toggle=\"pill\"], .").concat(CLASS_NAME_ACTIVE, "[data-bs-toggle=\"list\"]");
    /**
     * Class definition
     */
    var Tab = /** @class */ (function (_super) {
        __extends(Tab, _super);
        function Tab(element) {
            var _this = _super.call(this, element) || this;
            _this._parent = _this._element.closest(SELECTOR_TAB_PANEL);
            if (!_this._parent) {
                return _this;
                // TODO: should throw exception in v6
                // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
            }
            // Set up initial aria attributes
            _this._setInitialAttributes(_this._parent, _this._getChildren());
            EventHandler.on(_this._element, EVENT_KEYDOWN, function (event) { return _this._keydown(event); });
            return _this;
        }
        Object.defineProperty(Tab, "NAME", {
            // Getters
            get: function () {
                return NAME$1;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        Tab.prototype.show = function () {
            // Shows this elem and deactivate the active sibling if exists
            var innerElem = this._element;
            if (this._elemIsActive(innerElem)) {
                return;
            }
            // Search for active tab on same parent to deactivate it
            var active = this._getActiveElem();
            var hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
                relatedTarget: innerElem
            }) : null;
            var showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
                relatedTarget: active
            });
            if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
                return;
            }
            this._deactivate(active, innerElem);
            this._activate(innerElem, active);
        };
        // Private
        Tab.prototype._activate = function (element, relatedElem) {
            var _this = this;
            if (!element) {
                return;
            }
            element.classList.add(CLASS_NAME_ACTIVE);
            this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section
            var complete = function () {
                if (element.getAttribute('role') !== 'tab') {
                    element.classList.add(CLASS_NAME_SHOW$1);
                    return;
                }
                element.removeAttribute('tabindex');
                element.setAttribute('aria-selected', true);
                _this._toggleDropDown(element, true);
                EventHandler.trigger(element, EVENT_SHOWN$1, {
                    relatedTarget: relatedElem
                });
            };
            this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
        };
        Tab.prototype._deactivate = function (element, relatedElem) {
            var _this = this;
            if (!element) {
                return;
            }
            element.classList.remove(CLASS_NAME_ACTIVE);
            element.blur();
            this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too
            var complete = function () {
                if (element.getAttribute('role') !== 'tab') {
                    element.classList.remove(CLASS_NAME_SHOW$1);
                    return;
                }
                element.setAttribute('aria-selected', false);
                element.setAttribute('tabindex', '-1');
                _this._toggleDropDown(element, false);
                EventHandler.trigger(element, EVENT_HIDDEN$1, {
                    relatedTarget: relatedElem
                });
            };
            this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
        };
        Tab.prototype._keydown = function (event) {
            if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
                return;
            }
            event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
            event.preventDefault();
            var isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
            var nextActiveElement = getNextActiveElement(this._getChildren().filter(function (element) { return !isDisabled(element); }), event.target, isNext, true);
            if (nextActiveElement) {
                nextActiveElement.focus({
                    preventScroll: true
                });
                Tab.getOrCreateInstance(nextActiveElement).show();
            }
        };
        Tab.prototype._getChildren = function () {
            // collection of inner elements
            return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
        };
        Tab.prototype._getActiveElem = function () {
            var _this = this;
            return this._getChildren().find(function (child) { return _this._elemIsActive(child); }) || null;
        };
        Tab.prototype._setInitialAttributes = function (parent, children) {
            this._setAttributeIfNotExists(parent, 'role', 'tablist');
            for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
                var child = children_2[_i];
                this._setInitialAttributesOnChild(child);
            }
        };
        Tab.prototype._setInitialAttributesOnChild = function (child) {
            child = this._getInnerElement(child);
            var isActive = this._elemIsActive(child);
            var outerElem = this._getOuterElement(child);
            child.setAttribute('aria-selected', isActive);
            if (outerElem !== child) {
                this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
            }
            if (!isActive) {
                child.setAttribute('tabindex', '-1');
            }
            this._setAttributeIfNotExists(child, 'role', 'tab');
            // set attributes to the related panel too
            this._setInitialAttributesOnTargetPanel(child);
        };
        Tab.prototype._setInitialAttributesOnTargetPanel = function (child) {
            var target = SelectorEngine.getElementFromSelector(child);
            if (!target) {
                return;
            }
            this._setAttributeIfNotExists(target, 'role', 'tabpanel');
            if (child.id) {
                this._setAttributeIfNotExists(target, 'aria-labelledby', "".concat(child.id));
            }
        };
        Tab.prototype._toggleDropDown = function (element, open) {
            var outerElem = this._getOuterElement(element);
            if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
                return;
            }
            var toggle = function (selector, className) {
                var element = SelectorEngine.findOne(selector, outerElem);
                if (element) {
                    element.classList.toggle(className, open);
                }
            };
            toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
            toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
            outerElem.setAttribute('aria-expanded', open);
        };
        Tab.prototype._setAttributeIfNotExists = function (element, attribute, value) {
            if (!element.hasAttribute(attribute)) {
                element.setAttribute(attribute, value);
            }
        };
        Tab.prototype._elemIsActive = function (elem) {
            return elem.classList.contains(CLASS_NAME_ACTIVE);
        };
        // Try to get the inner element (usually the .nav-link)
        Tab.prototype._getInnerElement = function (elem) {
            return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
        };
        // Try to get the outer element (usually the .nav-item)
        Tab.prototype._getOuterElement = function (elem) {
            return elem.closest(SELECTOR_OUTER) || elem;
        };
        // Static
        Tab.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Tab.getOrCreateInstance(this);
                if (typeof config !== 'string') {
                    return;
                }
                if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
                    throw new TypeError("No method named \"".concat(config, "\""));
                }
                data[config]();
            });
        };
        return Tab;
    }(BaseComponent));
    exports.Tab = Tab;
    /**
     * Data API implementation
     */
    EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
        if (['A', 'AREA'].includes(this.tagName)) {
            event.preventDefault();
        }
        if (isDisabled(this)) {
            return;
        }
        Tab.getOrCreateInstance(this).show();
    });
    /**
     * Initialize on focus
     */
    EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
        for (var _i = 0, _a = SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE); _i < _a.length; _i++) {
            var element = _a[_i];
            Tab.getOrCreateInstance(element);
        }
    });
    /**
     * jQuery
     */
    defineJQueryPlugin(Tab);
    /**
     * --------------------------------------------------------------------------
     * Bootstrap toast.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
     * --------------------------------------------------------------------------
     */
    /**
     * Constants
     */
    var NAME = 'toast';
    var DATA_KEY = 'bs.toast';
    var EVENT_KEY = ".".concat(DATA_KEY);
    var EVENT_MOUSEOVER = "mouseover".concat(EVENT_KEY);
    var EVENT_MOUSEOUT = "mouseout".concat(EVENT_KEY);
    var EVENT_FOCUSIN = "focusin".concat(EVENT_KEY);
    var EVENT_FOCUSOUT = "focusout".concat(EVENT_KEY);
    var EVENT_HIDE = "hide".concat(EVENT_KEY);
    var EVENT_HIDDEN = "hidden".concat(EVENT_KEY);
    var EVENT_SHOW = "show".concat(EVENT_KEY);
    var EVENT_SHOWN = "shown".concat(EVENT_KEY);
    var CLASS_NAME_FADE = 'fade';
    var CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
    var CLASS_NAME_SHOW = 'show';
    var CLASS_NAME_SHOWING = 'showing';
    var DefaultType = {
        animation: 'boolean',
        autohide: 'boolean',
        delay: 'number'
    };
    var Default = {
        animation: true,
        autohide: true,
        delay: 5000
    };
    /**
     * Class definition
     */
    var Toast = /** @class */ (function (_super) {
        __extends(Toast, _super);
        function Toast(element, config) {
            var _this = _super.call(this, element, config) || this;
            _this._timeout = null;
            _this._hasMouseInteraction = false;
            _this._hasKeyboardInteraction = false;
            _this._setListeners();
            return _this;
        }
        Object.defineProperty(Toast, "Default", {
            // Getters
            get: function () {
                return Default;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Toast, "DefaultType", {
            get: function () {
                return DefaultType;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Toast, "NAME", {
            get: function () {
                return NAME;
            },
            enumerable: false,
            configurable: true
        });
        // Public
        Toast.prototype.show = function () {
            var _this = this;
            var showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
            if (showEvent.defaultPrevented) {
                return;
            }
            this._clearTimeout();
            if (this._config.animation) {
                this._element.classList.add(CLASS_NAME_FADE);
            }
            var complete = function () {
                _this._element.classList.remove(CLASS_NAME_SHOWING);
                EventHandler.trigger(_this._element, EVENT_SHOWN);
                _this._maybeScheduleHide();
            };
            this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
            reflow(this._element);
            this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
            this._queueCallback(complete, this._element, this._config.animation);
        };
        Toast.prototype.hide = function () {
            var _this = this;
            if (!this.isShown()) {
                return;
            }
            var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
            if (hideEvent.defaultPrevented) {
                return;
            }
            var complete = function () {
                _this._element.classList.add(CLASS_NAME_HIDE); // @deprecated
                _this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
                EventHandler.trigger(_this._element, EVENT_HIDDEN);
            };
            this._element.classList.add(CLASS_NAME_SHOWING);
            this._queueCallback(complete, this._element, this._config.animation);
        };
        Toast.prototype.dispose = function () {
            this._clearTimeout();
            if (this.isShown()) {
                this._element.classList.remove(CLASS_NAME_SHOW);
            }
            _super.prototype.dispose.call(this);
        };
        Toast.prototype.isShown = function () {
            return this._element.classList.contains(CLASS_NAME_SHOW);
        };
        // Private
        Toast.prototype._maybeScheduleHide = function () {
            var _this = this;
            if (!this._config.autohide) {
                return;
            }
            if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
                return;
            }
            this._timeout = setTimeout(function () {
                _this.hide();
            }, this._config.delay);
        };
        Toast.prototype._onInteraction = function (event, isInteracting) {
            switch (event.type) {
                case 'mouseover':
                case 'mouseout':
                    {
                        this._hasMouseInteraction = isInteracting;
                        break;
                    }
                case 'focusin':
                case 'focusout':
                    {
                        this._hasKeyboardInteraction = isInteracting;
                        break;
                    }
            }
            if (isInteracting) {
                this._clearTimeout();
                return;
            }
            var nextElement = event.relatedTarget;
            if (this._element === nextElement || this._element.contains(nextElement)) {
                return;
            }
            this._maybeScheduleHide();
        };
        Toast.prototype._setListeners = function () {
            var _this = this;
            EventHandler.on(this._element, EVENT_MOUSEOVER, function (event) { return _this._onInteraction(event, true); });
            EventHandler.on(this._element, EVENT_MOUSEOUT, function (event) { return _this._onInteraction(event, false); });
            EventHandler.on(this._element, EVENT_FOCUSIN, function (event) { return _this._onInteraction(event, true); });
            EventHandler.on(this._element, EVENT_FOCUSOUT, function (event) { return _this._onInteraction(event, false); });
        };
        Toast.prototype._clearTimeout = function () {
            clearTimeout(this._timeout);
            this._timeout = null;
        };
        // Static
        Toast.jQueryInterface = function (config) {
            return this.each(function () {
                var data = Toast.getOrCreateInstance(this, config);
                if (typeof config === 'string') {
                    if (typeof data[config] === 'undefined') {
                        throw new TypeError("No method named \"".concat(config, "\""));
                    }
                    data[config](this);
                }
            });
        };
        return Toast;
    }(BaseComponent));
    exports.Toast = Toast;
    /**
     * Data API implementation
     */
    enableDismissTrigger(Toast);
    /**
     * jQuery
     */
    defineJQueryPlugin(Toast);
});
//# sourceMappingURL=bootstrap.esm.js.map
