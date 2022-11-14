(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var PropTypes = (typeof window !== "undefined" ? window['PropTypes'] : typeof global !== "undefined" ? global['PropTypes'] : null);

var _require = require('focus-trap'),
    createFocusTrap = _require.createFocusTrap;

var _require2 = require('tabbable'),
    isFocusable = _require2.isFocusable;

var FocusTrap = /*#__PURE__*/function (_React$Component) {
  _inherits(FocusTrap, _React$Component);

  var _super = _createSuper(FocusTrap);

  function FocusTrap(props) {
    var _this;

    _classCallCheck(this, FocusTrap);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getNodeForOption", function (optionName) {
      var _this$internalOptions;

      // use internal options first, falling back to original options
      var optionValue = (_this$internalOptions = this.internalOptions[optionName]) !== null && _this$internalOptions !== void 0 ? _this$internalOptions : this.originalOptions[optionName];

      if (typeof optionValue === 'function') {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }

        optionValue = optionValue.apply(void 0, params);
      }

      if (optionValue === true) {
        optionValue = undefined; // use default value
      }

      if (!optionValue) {
        if (optionValue === undefined || optionValue === false) {
          return optionValue;
        } // else, empty string (invalid), null (invalid), 0 (invalid)


        throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
      }

      var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

      if (typeof optionValue === 'string') {
        var _this$getDocument;

        node = (_this$getDocument = this.getDocument()) === null || _this$getDocument === void 0 ? void 0 : _this$getDocument.querySelector(optionValue); // resolve to node, or null if fails

        if (!node) {
          throw new Error("`".concat(optionName, "` as selector refers to no known node"));
        }
      }

      return node;
    });

    _this.handleDeactivate = _this.handleDeactivate.bind(_assertThisInitialized(_this));
    _this.handlePostDeactivate = _this.handlePostDeactivate.bind(_assertThisInitialized(_this));
    _this.handleClickOutsideDeactivates = _this.handleClickOutsideDeactivates.bind(_assertThisInitialized(_this)); // focus-trap options used internally when creating the trap

    _this.internalOptions = {
      // We need to hijack the returnFocusOnDeactivate option,
      // because React can move focus into the element before we arrived at
      // this lifecycle hook (e.g. with autoFocus inputs). So the component
      // captures the previouslyFocusedElement in componentWillMount,
      // then (optionally) returns focus to it in componentWillUnmount.
      returnFocusOnDeactivate: false,
      // the rest of these are also related to deactivation of the trap, and we
      //  need to use them and control them as well
      checkCanReturnFocus: null,
      onDeactivate: _this.handleDeactivate,
      onPostDeactivate: _this.handlePostDeactivate,
      // we need to special-case this setting as well so that we can know if we should
      //  NOT return focus if the trap gets auto-deactivated as the result of an
      //  outside click (otherwise, we'll always think we should return focus because
      //  of how we manage that flag internally here)
      clickOutsideDeactivates: _this.handleClickOutsideDeactivates
    }; // original options provided by the consumer

    _this.originalOptions = {
      // because of the above `internalOptions`, we maintain our own flag for
      //  this option, and default it to `true` because that's focus-trap's default
      returnFocusOnDeactivate: true,
      // because of the above `internalOptions`, we keep these separate since
      //  they're part of the deactivation process which we configure (internally) to
      //  be shared between focus-trap and focus-trap-react
      onDeactivate: null,
      onPostDeactivate: null,
      checkCanReturnFocus: null,
      // the user's setting, defaulted to false since focus-trap defaults this to false
      clickOutsideDeactivates: false
    };
    var focusTrapOptions = props.focusTrapOptions;

    for (var optionName in focusTrapOptions) {
      if (!Object.prototype.hasOwnProperty.call(focusTrapOptions, optionName)) {
        continue;
      }

      if (optionName === 'returnFocusOnDeactivate' || optionName === 'onDeactivate' || optionName === 'onPostDeactivate' || optionName === 'checkCanReturnFocus' || optionName === 'clickOutsideDeactivates') {
        _this.originalOptions[optionName] = focusTrapOptions[optionName];
        continue; // exclude from internalOptions
      }

      _this.internalOptions[optionName] = focusTrapOptions[optionName];
    } // if set, `{ target: Node, allowDeactivation: boolean }` where `target` is the outside
    //  node that was clicked, and `allowDeactivation` is the result of the consumer's
    //  option (stored in `this.originalOptions.clickOutsideDeactivates`, which may be a
    //  function) whether to allow or deny auto-deactivation on click on this outside node


    _this.outsideClick = null; // elements from which to create the focus trap on mount; if a child is used
    //  instead of the `containerElements` prop, we'll get the child's related
    //  element when the trap renders and then is declared 'mounted'

    _this.focusTrapElements = props.containerElements || []; // now we remember what the currently focused element is, not relying on focus-trap

    _this.updatePreviousElement();

    return _this;
  }
  /**
   * Gets the configured document.
   * @returns {Document|undefined} Configured document, falling back to the main
   *  document, if it exists. During SSR, `undefined` is returned since the
   *  document doesn't exist.
   */


  _createClass(FocusTrap, [{
    key: "getDocument",
    value: function getDocument() {
      // SSR: careful to check if `document` exists before accessing it as a variable
      return this.props.focusTrapOptions.document || (typeof document !== 'undefined' ? document : undefined);
    }
    /**
     * Gets the node for the given option, which is expected to be an option that
     *  can be either a DOM node, a string that is a selector to get a node, `false`
     *  (if a node is explicitly NOT given), or a function that returns any of these
     *  values.
     * @param {string} optionName
     * @returns {undefined | false | HTMLElement | SVGElement} Returns
     *  `undefined` if the option is not specified; `false` if the option
     *  resolved to `false` (node explicitly not given); otherwise, the resolved
     *  DOM node.
     * @throws {Error} If the option is set, not `false`, and is not, or does not
     *  resolve to a node.
     */

  }, {
    key: "getReturnFocusNode",
    value: function getReturnFocusNode() {
      var node = this.getNodeForOption('setReturnFocus', this.previouslyFocusedElement);
      return node ? node : node === false ? false : this.previouslyFocusedElement;
    }
    /** Update the previously focused element with the currently focused element. */

  }, {
    key: "updatePreviousElement",
    value: function updatePreviousElement() {
      var currentDocument = this.getDocument();

      if (currentDocument) {
        this.previouslyFocusedElement = currentDocument.activeElement;
      }
    }
  }, {
    key: "deactivateTrap",
    value: function deactivateTrap() {
      // NOTE: it's possible the focus trap has already been deactivated without our knowing it,
      //  especially if the user set the `clickOutsideDeactivates: true` option on the trap,
      //  and the mouse was clicked on some element outside the trap; at that point, focus-trap
      //  will initiate its auto-deactivation process, which will call our own
      //  handleDeactivate(), which will call into this method
      if (!this.focusTrap || !this.focusTrap.active) {
        return;
      }

      this.focusTrap.deactivate({
        // NOTE: we never let the trap return the focus since we do that ourselves
        returnFocus: false,
        // we'll call this in our own post deactivate handler so make sure the trap doesn't
        //  do it prematurely
        checkCanReturnFocus: null,
        // let it call the user's original deactivate handler, if any, instead of
        //  our own which calls back into this function
        onDeactivate: this.originalOptions.onDeactivate // NOTE: for post deactivate, don't specify anything so that it calls the
        //  onPostDeactivate handler specified on `this.internalOptions`
        //  which will always be our own `handlePostDeactivate()` handler, which
        //  will finish things off by calling the user's provided onPostDeactivate
        //  handler, if any, at the right time
        // onPostDeactivate: NOTHING

      });
    }
  }, {
    key: "handleClickOutsideDeactivates",
    value: function handleClickOutsideDeactivates(event) {
      // use consumer's option (or call their handler) as the permission or denial
      var allowDeactivation = typeof this.originalOptions.clickOutsideDeactivates === 'function' ? this.originalOptions.clickOutsideDeactivates.call(null, event) // call out of context
      : this.originalOptions.clickOutsideDeactivates; // boolean

      if (allowDeactivation) {
        // capture the outside target that was clicked so we can use it in the deactivation
        //  process since the consumer allowed it to cause auto-deactivation
        this.outsideClick = {
          target: event.target,
          allowDeactivation: allowDeactivation
        };
      }

      return allowDeactivation;
    }
  }, {
    key: "handleDeactivate",
    value: function handleDeactivate() {
      if (this.originalOptions.onDeactivate) {
        this.originalOptions.onDeactivate.call(null); // call user's handler out of context
      }

      this.deactivateTrap();
    }
  }, {
    key: "handlePostDeactivate",
    value: function handlePostDeactivate() {
      var _this2 = this;

      var finishDeactivation = function finishDeactivation() {
        var returnFocusNode = _this2.getReturnFocusNode();

        var canReturnFocus = !!( // did the consumer allow it?
        _this2.originalOptions.returnFocusOnDeactivate && // can we actually focus the node?
        returnFocusNode !== null && returnFocusNode !== void 0 && returnFocusNode.focus && ( // was there an outside click that allowed deactivation?
        !_this2.outsideClick || // did the consumer allow deactivation when the outside node was clicked?
        _this2.outsideClick.allowDeactivation && // is the outside node NOT focusable (implying that it did NOT receive focus
        //  as a result of the click-through) -- in which case do NOT restore focus
        //  to `returnFocusNode` because focus should remain on the outside node
        !isFocusable(_this2.outsideClick.target, _this2.internalOptions.tabbableOptions)) // if no, the restore focus to `returnFocusNode` at this point
        );
        var _this2$internalOption = _this2.internalOptions.preventScroll,
            preventScroll = _this2$internalOption === void 0 ? false : _this2$internalOption;

        if (canReturnFocus) {
          // return focus to the element that had focus when the trap was activated
          returnFocusNode.focus({
            preventScroll: preventScroll
          });
        }

        if (_this2.originalOptions.onPostDeactivate) {
          _this2.originalOptions.onPostDeactivate.call(null); // don't call it in context of "this"

        }

        _this2.outsideClick = null; // reset: no longer needed
      };

      if (this.originalOptions.checkCanReturnFocus) {
        this.originalOptions.checkCanReturnFocus.call(null, this.getReturnFocusNode()) // call out of context
        .then(finishDeactivation, finishDeactivation);
      } else {
        finishDeactivation();
      }
    }
  }, {
    key: "setupFocusTrap",
    value: function setupFocusTrap() {
      if (this.focusTrap) {
        // trap already exists: it's possible we're in StrictMode and we're being remounted,
        //  in which case, we will have deactivated the trap when we got unmounted (remember,
        //  StrictMode, in development, purposely unmounts and remounts components after
        //  mounting them the first time to make sure they have reusable state,
        //  @see https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state) so now
        //  we need to restore the state of the trap according to our component state
        // NOTE: Strict mode __violates__ assumptions about the `componentWillUnmount()` API
        //  which clearly states -- even for React 18 -- that, "Once a component instance is
        //  unmounted, __it will never be mounted again.__" (emphasis ours). So when we get
        //  unmounted, we assume we're gone forever and we deactivate the trap. But then
        //  we get remounted and we're supposed to restore state. But if you had paused,
        //  we've now deactivated (we don't know we're amount to get remounted again)
        //  which means we need to reactivate and then pause. Otherwise, do nothing.
        if (this.props.active && !this.focusTrap.active) {
          this.focusTrap.activate();

          if (this.props.paused) {
            this.focusTrap.pause();
          }
        }
      } else {
        var nodesExist = this.focusTrapElements.some(Boolean);

        if (nodesExist) {
          // eslint-disable-next-line react/prop-types -- _createFocusTrap is an internal prop
          this.focusTrap = this.props._createFocusTrap(this.focusTrapElements, this.internalOptions);

          if (this.props.active) {
            this.focusTrap.activate();
          }

          if (this.props.paused) {
            this.focusTrap.pause();
          }
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.active) {
        this.setupFocusTrap();
      } // else, wait for later activation in case the `focusTrapOptions` will be updated
      //  again before the trap is activated (e.g. if waiting to know what the document
      //  object will be, so the Trap must be rendered, but the consumer is waiting to
      //  activate until they have obtained the document from a ref)
      //  @see https://github.com/focus-trap/focus-trap-react/issues/539

    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.focusTrap) {
        if (prevProps.containerElements !== this.props.containerElements) {
          this.focusTrap.updateContainerElements(this.props.containerElements);
        }

        var hasActivated = !prevProps.active && this.props.active;
        var hasDeactivated = prevProps.active && !this.props.active;
        var hasPaused = !prevProps.paused && this.props.paused;
        var hasUnpaused = prevProps.paused && !this.props.paused;

        if (hasActivated) {
          this.updatePreviousElement();
          this.focusTrap.activate();
        }

        if (hasDeactivated) {
          this.deactivateTrap();
          return; // un/pause does nothing on an inactive trap
        }

        if (hasPaused) {
          this.focusTrap.pause();
        }

        if (hasUnpaused) {
          this.focusTrap.unpause();
        }
      } else {
        // NOTE: if we're in `componentDidUpdate` and we don't have a trap yet,
        //  it either means it shouldn't be active, or it should be but none of
        //  of given `containerElements` were present in the DOM the last time
        //  we tried to create the trap
        if (prevProps.containerElements !== this.props.containerElements) {
          this.focusTrapElements = this.props.containerElements;
        } // don't create the trap unless it should be active in case the consumer
        //  is still updating `focusTrapOptions`
        //  @see https://github.com/focus-trap/focus-trap-react/issues/539


        if (this.props.active) {
          this.updatePreviousElement();
          this.setupFocusTrap();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.deactivateTrap();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var child = this.props.children ? React.Children.only(this.props.children) : undefined;

      if (child) {
        if (child.type && child.type === React.Fragment) {
          throw new Error('A focus-trap cannot use a Fragment as its child container. Try replacing it with a <div> element.');
        }

        var callbackRef = function callbackRef(element) {
          var containerElements = _this3.props.containerElements;

          if (child) {
            if (typeof child.ref === 'function') {
              child.ref(element);
            } else if (child.ref) {
              child.ref.current = element;
            }
          }

          _this3.focusTrapElements = containerElements ? containerElements : [element];
        };

        var childWithRef = React.cloneElement(child, {
          ref: callbackRef
        });
        return childWithRef;
      }

      return null;
    }
  }]);

  return FocusTrap;
}(React.Component); // support server-side rendering where `Element` will not be defined


var ElementType = typeof Element === 'undefined' ? Function : Element;
FocusTrap.propTypes = {
  active: PropTypes.bool,
  paused: PropTypes.bool,
  focusTrapOptions: PropTypes.shape({
    document: PropTypes.object,
    onActivate: PropTypes.func,
    onPostActivate: PropTypes.func,
    checkCanFocusTrap: PropTypes.func,
    onDeactivate: PropTypes.func,
    onPostDeactivate: PropTypes.func,
    checkCanReturnFocus: PropTypes.func,
    initialFocus: PropTypes.oneOfType([PropTypes.instanceOf(ElementType), PropTypes.string, PropTypes.bool, PropTypes.func]),
    fallbackFocus: PropTypes.oneOfType([PropTypes.instanceOf(ElementType), PropTypes.string, // NOTE: does not support `false` as value (or return value from function)
    PropTypes.func]),
    escapeDeactivates: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    clickOutsideDeactivates: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    returnFocusOnDeactivate: PropTypes.bool,
    setReturnFocus: PropTypes.oneOfType([PropTypes.instanceOf(ElementType), PropTypes.string, PropTypes.bool, PropTypes.func]),
    allowOutsideClick: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    preventScroll: PropTypes.bool,
    tabbableOptions: PropTypes.shape({
      displayCheck: PropTypes.oneOf(['full', 'legacy-full', 'non-zero-area', 'none']),
      getShadowRoot: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
    })
  }),
  containerElements: PropTypes.arrayOf(PropTypes.instanceOf(ElementType)),
  // DOM element ONLY
  children: PropTypes.oneOfType([PropTypes.element, // React element
  PropTypes.instanceOf(ElementType) // DOM element
  ]) // NOTE: _createFocusTrap is internal, for testing purposes only, so we don't
  //  specify it here. It's expected to be set to the function returned from
  //  require('focus-trap'), or one with a compatible interface.

};
FocusTrap.defaultProps = {
  active: true,
  paused: false,
  focusTrapOptions: {},
  _createFocusTrap: createFocusTrap
};
module.exports = FocusTrap;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"focus-trap":2,"tabbable":5}],2:[function(require,module,exports){
/*!
* focus-trap 7.0.0
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tabbable = require('tabbable');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var activeFocusTraps = function () {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];

        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();

var isSelectableInput = function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};

var isEscapeEvent = function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
};

var isTabEvent = function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
};

var delay = function delay(fn) {
  return setTimeout(fn, 0);
}; // Array.find/findIndex() are not supported on IE; this replicates enough
//  of Array.findIndex() for our needs


var findIndex = function findIndex(arr, fn) {
  var idx = -1;
  arr.every(function (value, i) {
    if (fn(value)) {
      idx = i;
      return false; // break
    }

    return true; // next
  });
  return idx;
};
/**
 * Get an option's value when it could be a plain value, or a handler that provides
 *  the value.
 * @param {*} value Option's value to check.
 * @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
 * @returns {*} The `value`, or the handler's returned value.
 */


var valueOrHandler = function valueOrHandler(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return typeof value === 'function' ? value.apply(void 0, params) : value;
};

var getActualTarget = function getActualTarget(event) {
  // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
  //  shadow host. However, event.target.composedPath() will be an array of
  //  nodes "clicked" from inner-most (the actual element inside the shadow) to
  //  outer-most (the host HTML document). If we have access to composedPath(),
  //  then use its first element; otherwise, fall back to event.target (and
  //  this only works for an _open_ shadow DOM; otherwise,
  //  composedPath()[0] === event.target always).
  return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
};

var createFocusTrap = function createFocusTrap(elements, userOptions) {
  // SSR: a live trap shouldn't be created in this type of environment so this
  //  should be safe code to execute if the `document` option isn't specified
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;

  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);

  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   firstTabbableNode: HTMLElement|null,
    //   lastTabbableNode: HTMLElement|null,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: undefined
  };
  var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

  /**
   * Gets a configuration option value.
   * @param {Object|undefined} configOverrideOptions If true, and option is defined in this set,
   *  value will be taken from this object. Otherwise, value will be taken from base configuration.
   * @param {string} optionName Name of the option whose value is sought.
   * @param {string|undefined} [configOptionName] Name of option to use __instead of__ `optionName`
   *  IIF `configOverrideOptions` is not defined. Otherwise, `optionName` is used.
   */

  var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  /**
   * Finds the index of the container that contains the element.
   * @param {HTMLElement} element
   * @returns {number} Index of the container in either `state.containers` or
   *  `state.containerGroups` (the order/length of these lists are the same); -1
   *  if the element isn't found.
   */


  var findContainerIndex = function findContainerIndex(element) {
    // NOTE: search `containerGroups` because it's possible a group contains no tabbable
    //  nodes, but still contains focusable nodes (e.g. if they all have `tabindex=-1`)
    //  and we still need to find the element in there
    return state.containerGroups.findIndex(function (_ref) {
      var container = _ref.container,
          tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      tabbableNodes.find(function (node) {
        return node === element;
      });
    });
  };
  /**
   * Gets the node for the given option, which is expected to be an option that
   *  can be either a DOM node, a string that is a selector to get a node, `false`
   *  (if a node is explicitly NOT given), or a function that returns any of these
   *  values.
   * @param {string} optionName
   * @returns {undefined | false | HTMLElement | SVGElement} Returns
   *  `undefined` if the option is not specified; `false` if the option
   *  resolved to `false` (node explicitly not given); otherwise, the resolved
   *  DOM node.
   * @throws {Error} If the option is set, not `false`, and is not, or does not
   *  resolve to a node.
   */


  var getNodeForOption = function getNodeForOption(optionName) {
    var optionValue = config[optionName];

    if (typeof optionValue === 'function') {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      optionValue = optionValue.apply(void 0, params);
    }

    if (optionValue === true) {
      optionValue = undefined; // use default value
    }

    if (!optionValue) {
      if (optionValue === undefined || optionValue === false) {
        return optionValue;
      } // else, empty string (invalid), null (invalid), 0 (invalid)


      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }

    var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue); // resolve to node, or null if fails

      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }

    return node;
  };

  var getInitialFocusNode = function getInitialFocusNode() {
    var node = getNodeForOption('initialFocus'); // false explicitly indicates we want no initialFocus at all

    if (node === false) {
      return false;
    }

    if (node === undefined) {
      // option not specified: use fallback options
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode; // NOTE: `fallbackFocus` option function cannot return `false` (not supported)

        node = firstTabbableNode || getNodeForOption('fallbackFocus');
      }
    }

    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }

    return node;
  };

  var updateTabbableNodes = function updateTabbableNodes() {
    state.containerGroups = state.containers.map(function (container) {
      var tabbableNodes = tabbable.tabbable(container, config.tabbableOptions); // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
      //  are a superset of tabbable nodes

      var focusableNodes = tabbable.focusable(container, config.tabbableOptions);
      return {
        container: container,
        tabbableNodes: tabbableNodes,
        focusableNodes: focusableNodes,
        firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : null,
        lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : null,

        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          // NOTE: If tabindex is positive (in order to manipulate the tab order separate
          //  from the DOM order), this __will not work__ because the list of focusableNodes,
          //  while it contains tabbable nodes, does not sort its nodes in any order other
          //  than DOM order, because it can't: Where would you place focusable (but not
          //  tabbable) nodes in that order? They have no order, because they aren't tabbale...
          // Support for positive tabindex is already broken and hard to manage (possibly
          //  not supportable, TBD), so this isn't going to make things worse than they
          //  already are, and at least makes things better for the majority of cases where
          //  tabindex is either 0/unset or negative.
          // FYI, positive tabindex issue: https://github.com/focus-trap/focus-trap/issues/375
          var nodeIdx = focusableNodes.findIndex(function (n) {
            return n === node;
          });

          if (nodeIdx < 0) {
            return undefined;
          }

          if (forward) {
            return focusableNodes.slice(nodeIdx + 1).find(function (n) {
              return tabbable.isTabbable(n, config.tabbableOptions);
            });
          }

          return focusableNodes.slice(0, nodeIdx).reverse().find(function (n) {
            return tabbable.isTabbable(n, config.tabbableOptions);
          });
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function (group) {
      return group.tabbableNodes.length > 0;
    }); // throw if no groups have tabbable nodes and we don't have a fallback focus node either

    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
    ) {
      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
    }
  };

  var tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }

    if (node === doc.activeElement) {
      return;
    }

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  };

  var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus', previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  }; // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  var checkPointerDown = function checkPointerDown(e) {
    var target = getActualTarget(e);

    if (findContainerIndex(target) >= 0) {
      // allow the click since it ocurred inside the trap
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      // immediately deactivate the trap
      trap.deactivate({
        // if, on deactivation, we should return focus to the node originally-focused
        //  when the trap was activated (or the configured `setReturnFocus` node),
        //  then assume it's also OK to return focus to the outside node that was
        //  just clicked, causing deactivation, as long as that node is focusable;
        //  if it isn't focusable, then return focus to the original node focused
        //  on activation (or the configured `setReturnFocus` node)
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked, whether it's focusable or not; by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node)
        returnFocus: config.returnFocusOnDeactivate && !tabbable.isFocusable(target, config.tabbableOptions)
      });
      return;
    } // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)


    if (valueOrHandler(config.allowOutsideClick, e)) {
      // allow the click outside the trap to take place
      return;
    } // otherwise, prevent the click


    e.preventDefault();
  }; // In case focus escapes the trap for some strange reason, pull it back in.


  var checkFocusIn = function checkFocusIn(e) {
    var target = getActualTarget(e);
    var targetContained = findContainerIndex(target) >= 0; // In Firefox when you Tab out of an iframe the Document is briefly focused.

    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      // escaped! pull it back in to where it just left
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  }; // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  var checkTab = function checkTab(e) {
    var target = getActualTarget(e);
    updateTabbableNodes();
    var destinationNode = null;

    if (state.tabbableGroups.length > 0) {
      // make sure the target is actually contained in a group
      // NOTE: the target may also be the container itself if it's focusable
      //  with tabIndex='-1' and was given initial focus
      var containerIndex = findContainerIndex(target);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : undefined;

      if (containerIndex < 0) {
        // target not found in any group: quite possible focus has escaped the trap,
        //  so bring it back in to...
        if (e.shiftKey) {
          // ...the last node in the last group
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          // ...the first node in the first group
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        // REVERSE
        // is the target the first tabbable node in a group?
        var startOfGroupIndex = findIndex(state.tabbableGroups, function (_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return target === firstTabbableNode;
        });

        if (startOfGroupIndex < 0 && (containerGroup.container === target || tabbable.isFocusable(target, config.tabbableOptions) && !tabbable.isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          // an exception case where the target is either the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle shift+tab as if focus were on the container's
          //  first tabbable node, and go to the last tabbable node of the LAST group
          startOfGroupIndex = containerIndex;
        }

        if (startOfGroupIndex >= 0) {
          // YES: then shift+tab should go to the last tabbable node in the
          //  previous group (and wrap around to the last tabbable node of
          //  the LAST group if it's the first tabbable node of the FIRST group)
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        // FORWARD
        // is the target the last tabbable node in a group?
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function (_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return target === lastTabbableNode;
        });

        if (lastOfGroupIndex < 0 && (containerGroup.container === target || tabbable.isFocusable(target, config.tabbableOptions) && !tabbable.isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          // an exception case where the target is the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle tab as if focus were on the container's
          //  last tabbable node, and go to the first tabbable node of the FIRST group
          lastOfGroupIndex = containerIndex;
        }

        if (lastOfGroupIndex >= 0) {
          // YES: then tab should go to the first tabbable node in the next
          //  group (and wrap around to the first tabbable node of the FIRST
          //  group if it's the last tabbable node of the LAST group)
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;

          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      // NOTE: the fallbackFocus option does not support returning false to opt-out
      destinationNode = getNodeForOption('fallbackFocus');
    }

    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    } // else, let the browser take care of [shift+]tab and move the focus

  };

  var checkKey = function checkKey(e) {
    if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates, e) !== false) {
      e.preventDefault();
      trap.deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };

  var checkClick = function checkClick(e) {
    var target = getActualTarget(e);

    if (findContainerIndex(target) >= 0) {
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }

    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }; //
  // EVENT LISTENERS
  //


  var addListeners = function addListeners() {
    if (!state.active) {
      return;
    } // There can be only one listening focus trap at a time


    activeFocusTraps.activateTrap(trap); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function () {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };

  var removeListeners = function removeListeners() {
    if (!state.active) {
      return;
    }

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  }; //
  // TRAP DEFINITION
  //


  trap = {
    get active() {
      return state.active;
    },

    get paused() {
      return state.paused;
    },

    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }

      var onActivate = getOption(activateOptions, 'onActivate');
      var onPostActivate = getOption(activateOptions, 'onPostActivate');
      var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');

      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }

      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;

      if (onActivate) {
        onActivate();
      }

      var finishActivation = function finishActivation() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }

        addListeners();

        if (onPostActivate) {
          onPostActivate();
        }
      };

      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }

      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }

      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);

      clearTimeout(state.delayInitialFocusTimer); // noop if undefined

      state.delayInitialFocusTimer = undefined;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(options, 'onDeactivate');
      var onPostDeactivate = getOption(options, 'onPostDeactivate');
      var checkCanReturnFocus = getOption(options, 'checkCanReturnFocus');
      var returnFocus = getOption(options, 'returnFocus', 'returnFocusOnDeactivate');

      if (onDeactivate) {
        onDeactivate();
      }

      var finishDeactivation = function finishDeactivation() {
        delay(function () {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }

          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };

      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }

      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }

      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }

      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function (element) {
        return typeof element === 'string' ? doc.querySelector(element) : element;
      });

      if (state.active) {
        updateTabbableNodes();
      }

      return this;
    }
  }; // initialize container elements

  trap.updateContainerElements(elements);
  return trap;
};

exports.createFocusTrap = createFocusTrap;


},{"tabbable":5}],3:[function(require,module,exports){
module.exports = {
  class: require('./lib/class')
};

},{"./lib/class":4}],4:[function(require,module,exports){
/**
 * From jQuery
 */
function stripAndCollapse(value) {
  const tokens = value.match(/[^\x20\t\r\n\f]+/g) || [];
  return tokens.join(' ');
}

/**
 * From jQuery
 */
function getClass(elem) {
  return elem.getAttribute && elem.getAttribute('class') || '';
}

module.exports = {

  hasClass: function(elem, selector) {
    const className =' ' + selector + ' ';
  
    if (elem.nodeType === 1 && (' ' + stripAndCollapse(getClass(elem)) + ' ').indexOf(className) > -1) {
      return true;
    }
  
    return false;
  },

  addClass: function (elem, className) {

    let classes = stripAndCollapse(getClass(elem)).split(' ');
  
    if (classes.indexOf(className) === -1) {
      classes.push(className)
      elem.setAttribute('class', classes.join(' '))
    }
  
  },
  
  removeClass: function(elem, className) {
  
    let classes = stripAndCollapse(getClass(elem)).split(' ');
    const index = classes.indexOf(className);
  
    if (index > -1) {
      classes.splice(index, 1)
      elem.setAttribute('class', classes.join(' '))
    }
  }

};

},{}],5:[function(require,module,exports){
/*!
* tabbable 6.0.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]:not(slot)', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var NoElement = typeof Element === 'undefined';
var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
  return element.getRootNode();
} : function (element) {
  return element.ownerDocument;
};

/**
 * @param {Element} el container to check in
 * @param {boolean} includeContainer add container to check
 * @param {(node: Element) => boolean} filter filter candidates
 * @returns {Element[]}
 */
var getCandidates = function getCandidates(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};

/**
 * @callback GetShadowRoot
 * @param {Element} element to check for shadow root
 * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
 */

/**
 * @callback ShadowRootFilter
 * @param {Element} shadowHostNode the element which contains shadow content
 * @returns {boolean} true if a shadow root could potentially contain valid candidates.
 */

/**
 * @typedef {Object} CandidateScope
 * @property {Element} scopeParent contains inner candidates
 * @property {Element[]} candidates list of candidates found in the scope parent
 */

/**
 * @typedef {Object} IterativeOptions
 * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
 *  if a function, implies shadow support is enabled and either returns the shadow root of an element
 *  or a boolean stating if it has an undisclosed shadow root
 * @property {(node: Element) => boolean} filter filter candidates
 * @property {boolean} flatten if true then result will flatten any CandidateScope into the returned list
 * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
 */

/**
 * @param {Element[]} elements list of element containers to match candidates from
 * @param {boolean} includeContainer add container list to check
 * @param {IterativeOptions} options
 * @returns {Array.<Element|CandidateScope>}
 */
var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (element.tagName === 'SLOT') {
      // add shadow dom slot scope (slot itself cannot be focusable)
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      // check candidate element
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }

      // iterate over shadow content if possible
      var shadowRoot = element.shadowRoot ||
      // check for an undisclosed shadow
      typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);
      var validShadowRoot = !options.shadowRootFilter || options.shadowRootFilter(element);
      if (shadowRoot && validShadowRoot) {
        // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
        //  shadow exists, so look at light dom children as fallback BUT create a scope for any
        //  child candidates found because they're likely slotted elements (elements that are
        //  children of the web component element (which has the shadow), in the light dom, but
        //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
        //  _after_ we return from this recursive call
        var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        // there's not shadow so just dig into the element's (light dom) children
        //  __without__ giving the element special scope treatment
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var getTabindex = function getTabindex(node, isScope) {
  if (node.tabIndex < 0) {
    // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
    // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
    // yet they are still part of the regular tab order; in FF, they get a default
    // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
    // order, consider their tab index to be 0.
    // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
    // so if they don't have a tabindex attribute specifically set, assume it's 0.
    //
    // isScope is positive for custom element with shadow root or slot that by default
    // have tabIndex -1, but need to be sorted by document order in order for their
    // content to be inserted in the correct position
    if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute('tabindex'), 10))) {
      return 0;
    }
  }
  return node.tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};
var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};
var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};
var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};

// determines if a node is ultimately attached to the window's document
var isNodeAttached = function isNodeAttached(node) {
  var _nodeRootHost;
  // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
  //  (but NOT _the_ document; see second 'If' comment below for more).
  // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
  //  is attached, and the one we need to check if it's in the document or not (because the
  //  shadow, and all nodes it contains, is never considered in the document since shadows
  //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
  //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
  //  visibility, including all the nodes it contains). The host could be any normal node,
  //  or a custom element (i.e. web component). Either way, that's the one that is considered
  //  part of the document, not the shadow root, nor any of its children (i.e. the node being
  //  tested).
  // To further complicate things, we have to look all the way up until we find a shadow HOST
  //  that is attached (or find none) because the node might be in nested shadows...
  // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
  //  document (per the docs) and while it's a Document-type object, that document does not
  //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
  //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
  //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
  //  node is actually detached.
  var nodeRootHost = getRootNode(node).host;
  var attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && _nodeRootHost.ownerDocument.contains(nodeRootHost) || node.ownerDocument.contains(node));
  while (!attached && nodeRootHost) {
    var _nodeRootHost2;
    // since it's not attached and we have a root host, the node MUST be in a nested shadow DOM,
    //  which means we need to get the host's host and check if that parent host is contained
    //  in (i.e. attached to) the document
    nodeRootHost = getRootNode(nodeRootHost).host;
    attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && _nodeRootHost2.ownerDocument.contains(nodeRootHost));
  }
  return attached;
};
var isZeroArea = function isZeroArea(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
    width = _node$getBoundingClie.width,
    height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden(node, _ref) {
  var displayCheck = _ref.displayCheck,
    getShadowRoot = _ref.getShadowRoot;
  // NOTE: visibility will be `undefined` if node is detached from the document
  //  (see notes about this further down), which means we will consider it visible
  //  (this is legacy behavior from a very long way back)
  // NOTE: we check this regardless of `displayCheck="none"` because this is a
  //  _visibility_ check, not a _display_ check
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }
  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  }
  if (!displayCheck || displayCheck === 'full' || displayCheck === 'legacy-full') {
    if (typeof getShadowRoot === 'function') {
      // figure out if we should consider the node to be in an undisclosed shadow and use the
      //  'non-zero-area' fallback
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
        ) {
          // node has an undisclosed shadow which means we can only treat it as a black box, so we
          //  fall back to a non-zero-area test
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          // iterate up slot
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          // cross shadow boundary
          node = rootNode.host;
        } else {
          // iterate up normal dom
          node = parentElement;
        }
      }
      node = originalNode;
    }
    // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
    //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
    //  it might be a falsy value, which means shadow DOM support is disabled

    // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
    //  now we can just test to see if it would normally be visible or not, provided it's
    //  attached to the main document.
    // NOTE: We must consider case where node is inside a shadow DOM and given directly to
    //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.

    if (isNodeAttached(node)) {
      // this works wherever the node is: if there's at least one client rect, it's
      //  somehow displayed; it also covers the CSS 'display: contents' case where the
      //  node itself is hidden in place of its contents; and there's no need to search
      //  up the hierarchy either
      return !node.getClientRects().length;
    }

    // Else, the node isn't attached to the document, which means the `getClientRects()`
    //  API will __always__ return zero rects (this can happen, for example, if React
    //  is used to render nodes onto a detached tree, as confirmed in this thread:
    //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
    //
    // It also means that even window.getComputedStyle(node).display will return `undefined`
    //  because styles are only computed for nodes that are in the document.
    //
    // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
    //  somehow. Though it was never stated officially, anyone who has ever used tabbable
    //  APIs on nodes in detached containers has actually implicitly used tabbable in what
    //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
    //  considering __everything__ to be visible because of the innability to determine styles.
    //
    // v6.0.0: As of this major release, the default 'full' option __no longer treats detached
    //  nodes as visible with the 'none' fallback.__
    if (displayCheck !== 'legacy-full') {
      return true; // hidden
    }
    // else, fallback to 'none' mode and consider the node visible
  } else if (displayCheck === 'non-zero-area') {
    // NOTE: Even though this tests that the node's client rect is non-zero to determine
    //  whether it's displayed, and that a detached node will __always__ have a zero-area
    //  client rect, we don't special-case for whether the node is attached or not. In
    //  this mode, we do want to consider nodes that have a zero area to be hidden at all
    //  times, and that includes attached or not.
    return isZeroArea(node);
  }

  // visible, as far as we can tell, or per current `displayCheck=none` mode, we assume
  //  it's visible
  return false;
};

// form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset
var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    // check if `node` is contained in a disabled <fieldset>
    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        // look for the first <legend> among the children of the disabled <fieldset>
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          // when the first <legend> (in document order) is found
          if (child.tagName === 'LEGEND') {
            // if its parent <fieldset> is not nested in another disabled <fieldset>,
            // return whether `node` is a descendant of its first <legend>
            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
          }
        }
        // the disabled <fieldset> containing `node` has no <legend>
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }

  // else, node's tabbable/focusable state should not be affected by a fieldset's
  //  enabled/disabled state
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) ||
  // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  // If a custom element has an explicit negative tabindex,
  // browsers will not allow tab targeting said element's children.
  return false;
};

/**
 * @param {Array.<Element|CandidateScope>} candidates
 * @returns Element[]
 */
var sortByOrder = function sortByOrder(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function (item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getTabindex(element, isScope);
    var elements = isScope ? sortByOrder(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item: item,
        isScope: isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function (acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable(el, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable(el, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');
var isFocusable = function isFocusable(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};

exports.focusable = focusable;
exports.isFocusable = isFocusable;
exports.isTabbable = isTabbable;
exports.tabbable = tabbable;


},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savePuzzleState = exports.loadPuzzleState = void 0;
var _storage = require("./storage");
var localStorageKey = function localStorageKey(id) {
  return "hopkinshurdle.".concat(id);
};
var savePuzzleState = function savePuzzleState(id, puzzle) {
  try {
    return _storage.local.set(localStorageKey(id), puzzle);
  } catch (e) {
    return false;
  }
};
exports.savePuzzleState = savePuzzleState;
var loadPuzzleState = function loadPuzzleState(id) {
  return _storage.local.get(localStorageKey(id));
};
exports.loadPuzzleState = loadPuzzleState;

},{"./storage":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Statistics = /*#__PURE__*/function () {
  function Statistics(availableGuesses, localStorage, logger) {
    _classCallCheck(this, Statistics);
    this.availableGuesses = availableGuesses;
    this.localStorage = localStorage;
    this.logger = logger;
    this.localStorageKey = 'hopkinshurdle.stats';
    this.stats = this.validateStoredStats(this.localStorage.get(this.localStorageKey));
  }
  _createClass(Statistics, [{
    key: "getDefaultStats",
    value: function getDefaultStats(availableGuesses) {
      return {
        gamesPlayed: 0,
        gamesWon: 0,
        winStreak: 0,
        maxStreak: 0,
        guessDistribution: Array.apply(null, Array(availableGuesses)).map(function () {
          return 0;
        })
      };
    }
  }, {
    key: "validateStoredStats",
    value: function validateStoredStats(storedStats) {
      if (storedStats === null) {
        // no user stats found in local storage; return default stats
        return this.getDefaultStats(this.availableGuesses);
      }
      try {
        ['gamesPlayed', 'gamesWon', 'winStreak', 'maxStreak'].map(function (key) {
          if (!Number.isInteger(storedStats[key])) {
            throw new Error('Invalid stat: ' + key);
          }
        });
        if (!Array.isArray(storedStats.guessDistribution) || storedStats.guessDistribution.length !== this.availableGuesses) {
          throw new Error('Invalid stat: guessDistribution');
        }
      } catch (e) {
        this.logger.log('Invalid stats from localStorage', {
          level: 'warning',
          data: {
            message: e.message,
            storedStats: storedStats
          }
        });
        return this.getDefaultStats(this.availableGuesses);
      }
      return storedStats;
    }
  }, {
    key: "update",
    value: function update(status, numberOfGuesses) {
      this.stats.gamesPlayed++;
      if (status === 'PASS') {
        this.stats.gamesWon++;
        this.stats.winStreak++;
        this.stats.guessDistribution[numberOfGuesses - 1]++;
      } else {
        this.stats.winStreak = 0;
      }
      if (this.stats.maxStreak < this.stats.winStreak) {
        this.stats.maxStreak = this.stats.winStreak;
      }
      this.localStorage.set(this.localStorageKey, this.stats);
      return this.stats;
    }

    // for testing
  }, {
    key: "increment",
    value: function increment() {
      return this.update('FAIL');
    }
  }]);
  return Statistics;
}();
exports["default"] = Statistics;
module.exports = exports.default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.session = exports.local = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/* eslint consistent-return: 0 */
var Storage = /*#__PURE__*/function () {
  function Storage(type) {
    _classCallCheck(this, Storage);
    this.storage = window[type];
    this.available = this.isAvailable();
  }
  _createClass(Storage, [{
    key: "isAvailable",
    value: function isAvailable() {
      var key = 'local-storage-module-test';
      if (this.available !== undefined) {
        return this.available;
      }
      try {
        // to fully test, need to set item
        // http://stackoverflow.com/questions/9077101/iphone-localstorage-quota-exceeded-err-issue#answer-12976988
        this.storage.setItem(key, 'graun');
        this.storage.removeItem(key);
        this.available = true;
      } catch (err) {
        this.available = false;
      }
      return this.available;
    }
  }, {
    key: "get",
    value: function get(key) {
      if (!this.available) {
        return;
      }
      var data;

      // try and parse the data
      try {
        var value = this.getRaw(key);
        if (value === null || value === undefined) {
          return null;
        }
        data = JSON.parse(value);
        if (data === null) {
          return null;
        }
      } catch (e) {
        this.remove(key);
        return null;
      }

      // has it expired?
      if (data.expires && new Date() > new Date(data.expires)) {
        this.remove(key);
        return null;
      }
      return data.value;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!this.available) {
        return;
      }
      return this.storage.setItem(key, JSON.stringify({
        value: value,
        expires: options.expires
      }));
    }
  }, {
    key: "setIfNotExists",
    value: function setIfNotExists(key, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!this.available) {
        return;
      }
      if (this.storage.getItem(key) !== null) {
        return;
      }
      return this.storage.setItem(key, JSON.stringify({
        value: value,
        expires: options.expires
      }));
    }
  }, {
    key: "getRaw",
    value: function getRaw(key) {
      if (this.available) {
        return this.storage.getItem(key);
      }
    }
  }, {
    key: "remove",
    value: function remove(key) {
      if (this.available) {
        return this.storage.removeItem(key);
      }
    }
  }]);
  return Storage;
}();
var local = new Storage('localStorage');
exports.local = local;
var session = new Storage('sessionStorage');
exports.session = session;

},{}],9:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault((typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null));
var _propTypes = _interopRequireDefault((typeof window !== "undefined" ? window['PropTypes'] : typeof global !== "undefined" ? global['PropTypes'] : null));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Answer = function Answer(_ref) {
  var answer = _ref.answer;
  return /*#__PURE__*/_react["default"].createElement("p", null, "Sorry, the correct answer is ", /*#__PURE__*/_react["default"].createElement("strong", null, answer));
};
Answer.propTypes = {
  answer: _propTypes["default"].string.isRequired
};
var _default = Answer;
exports["default"] = _default;
module.exports = exports.default;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault((typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null));
var _propTypes = _interopRequireDefault((typeof window !== "undefined" ? window['PropTypes'] : typeof global !== "undefined" ? global['PropTypes'] : null));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Clue = function Clue(_ref) {
  var clue = _ref.clue,
    currentRow = _ref.currentRow,
    hidden = _ref.hidden;
  var attributes = {
    'aria-hidden': hidden,
    'aria-label': 'Clue',
    'aria-live': 'polite',
    className: 'clue',
    role: 'region'
  };
  var header = "Clue #".concat(currentRow + 1);
  return /*#__PURE__*/_react["default"].createElement("div", attributes, /*#__PURE__*/_react["default"].createElement("h2", null, header), clue.photo && clue.photo.url && clue.photo.alt_text && /*#__PURE__*/_react["default"].createElement("img", {
    src: clue.photo.url,
    alt: clue.photo.alt_text
  }), clue.text && /*#__PURE__*/_react["default"].createElement("p", null, clue.text));
};
Clue.propTypes = {
  clue: _propTypes["default"].object.isRequired,
  currentRow: _propTypes["default"].number.isRequired,
  hidden: _propTypes["default"].bool.isRequired
};
var _default = Clue;
exports["default"] = _default;
module.exports = exports.default;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
(function (global){(function (){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard((typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null));
var _propTypes = _interopRequireDefault((typeof window !== "undefined" ? window['PropTypes'] : typeof global !== "undefined" ? global['PropTypes'] : null));
var _Phrase = _interopRequireDefault(require("./Phrase"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Guesses = /*#__PURE__*/function (_Component) {
  _inherits(Guesses, _Component);
  var _super = _createSuper(Guesses);
  function Guesses(props) {
    var _this;
    _classCallCheck(this, Guesses);
    _this = _super.call(this, props);
    _this.state = {
      triggerFocus: false
    };
    _this.triggerRefocus = _this.triggerRefocus.bind(_assertThisInitialized(_this));
    _this.onRefocusComplete = _this.onRefocusComplete.bind(_assertThisInitialized(_this));
    return _this;
  }

  /**
   * Change the state t
   */
  _createClass(Guesses, [{
    key: "triggerRefocus",
    value: function triggerRefocus() {
      this.setState({
        triggerFocus: true
      });
    }
  }, {
    key: "onRefocusComplete",
    value: function onRefocusComplete() {
      this.setState({
        triggerFocus: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var attributes = {
        'aria-hidden': this.props.hidden,
        'aria-label': 'Guesses',
        className: 'guesses',
        onClick: this.triggerRefocus,
        role: 'region'
      };
      var answerDescription = "The answer consists of ".concat(this.props.answerDescription, ". You have ").concat(this.props.remainingGuesses, " ").concat(this.props.remainingGuesses === 1 ? 'guess' : 'guesses', " remaining.");
      return /*#__PURE__*/_react["default"].createElement("div", attributes, /*#__PURE__*/_react["default"].createElement("h2", null, "Guesses"), /*#__PURE__*/_react["default"].createElement("p", {
        className: 'visuallyhidden'
      }, answerDescription), this.props.guesses.map(function (guess, i) {
        return /*#__PURE__*/_react["default"].createElement(_Phrase["default"], {
          correctAnswer: _this2.props.correctAnswer,
          displayMessage: _this2.props.displayMessage,
          guess: guess,
          isComplete: _this2.props.status !== 'IN_PROGRESS' || i < _this2.props.currentRow,
          isCurrentRow: _this2.props.currentRow === i,
          key: i,
          onFail: _this2.props.onGuessFail,
          onPass: _this2.props.onPuzzlePass,
          onRefocusComplete: _this2.onRefocusComplete,
          phraseNumber: i,
          triggerFocus: _this2.state.triggerFocus
        });
      }));
    }
  }]);
  return Guesses;
}(_react.Component);
Guesses.propTypes = {
  answerDescription: _propTypes["default"].string.isRequired,
  currentRow: _propTypes["default"].number.isRequired,
  correctAnswer: _propTypes["default"].string.isRequired,
  displayMessage: _propTypes["default"].func.isRequired,
  guesses: _propTypes["default"].array.isRequired,
  hidden: _propTypes["default"].bool.isRequired,
  onGuessFail: _propTypes["default"].func.isRequired,
  onPuzzlePass: _propTypes["default"].func.isRequired,
  remainingGuesses: _propTypes["default"].number.isRequired,
  status: _propTypes["default"].string.isRequired
};
var _default = Guesses;
exports["default"] = _default;
module.exports = exports.default;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Phrase":14}],12:[function(require,module,exports){
(function (global){(function (){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard((typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null));
var _propTypes = _interopRequireDefault((typeof window !== "undefined" ? window['PropTypes'] : typeof global !== "undefined" ? global['PropTypes'] : null));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Letter = /*#__PURE__*/function (_Component) {
  _inherits(Letter, _Component);
  var _super = _createSuper(Letter);
  function Letter(props) {
    var _this;
    _classCallCheck(this, Letter);
    _this = _super.call(this, props);
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.input = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }
  _createClass(Letter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.maybeFocus();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.maybeFocus();
    }
  }, {
    key: "maybeFocus",
    value: function maybeFocus() {
      if (this.props.focus) {
        this.input.current.focus();
        if (this.props.triggerFocus) {
          this.props.onRefocusComplete();
        }
        if (this.props.isSpace) {
          if (this.props.direction === 'forward') {
            // autochange (skip) spaces
            this.onChange(' ');
          } else {
            // backspace again to skip space input
            this.props.onBackspace();
          }
        }
      }
    }
  }, {
    key: "getClass",
    value: function getClass() {
      var classes = [];
      if (this.props.isSpace) {
        classes.push('space');
      }
      if (this.props.status) {
        classes.push(this.props.status);
      }
      if (this.props.animate) {
        classes.push('animate');
      }
      return classes.join(' ');
    }
  }, {
    key: "onChange",
    value: function onChange(value) {
      if (value === ' ' && !this.props.isSpace || value !== ' ' && !value.match(/[A-Za-z]/)) {
        // space or not aletter
        return;
      }
      this.props.onChange(value.toUpperCase());
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      if (e.key === 'Enter') {
        this.props.onEnter();
      } else if (e.key === 'Backspace') {
        this.props.onBackspace();
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      e.preventDefault();
    }
  }, {
    key: "getNiceStatus",
    value: function getNiceStatus() {
      if (this.props.status === 'pass') {
        return 'correct';
      } else if (this.props.status === 'shuffle') {
        return 'correct letter, but in wrong position';
      } else {
        return 'incorrect';
      }
    }
  }, {
    key: "getLabel",
    value: function getLabel() {
      var label = "Letter #".concat(this.props.letterNumber + 1);
      if (this.props.isSpace) {
        label += ": Space";
      } else if (this.props.isComplete) {
        label += ": ".concat(this.getNiceStatus());
      }
      return label;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var animationDelay = 100 * this.props.letterNumber + 'ms';
      return /*#__PURE__*/_react["default"].createElement("input", {
        "aria-label": this.getLabel(),
        className: this.getClass(),
        disabled: this.props.isComplete,
        maxLength: 1,
        onChange: function onChange(e) {
          return _this2.onChange(e.target.value);
        },
        onKeyDown: this.onKeyDown,
        onMouseDown: this.onMouseDown,
        readOnly: this.isSpace || !this.props.focus,
        ref: this.input,
        style: {
          animationDelay: animationDelay
        },
        tabIndex: this.props.focus ? null : -1,
        type: 'text',
        value: this.props.value
      });
    }
  }]);
  return Letter;
}(_react.Component);
Letter.propTypes = {
  animate: _propTypes["default"].bool.isRequired,
  direction: _propTypes["default"].string.isRequired,
  focus: _propTypes["default"].bool.isRequired,
  isComplete: _propTypes["default"].bool.isRequired,
  isCurrentRow: _propTypes["default"].bool.isRequired,
  isSpace: _propTypes["default"].bool.isRequired,
  letterNumber: _propTypes["default"].number.isRequired,
  onBackspace: _propTypes["default"].func.isRequired,
  onEnter: _propTypes["default"].func.isRequired,
  onChange: _propTypes["default"].func.isRequired,
  onRefocusComplete: _propTypes["default"].func.isRequired,
  triggerFocus: _propTypes["default"].bool.isRequired,
  status: _propTypes["default"].string,
  value: _propTypes["default"].string
};
var _default = Letter;
exports["default"] = _default;
module.exports = exports.default;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
(function (global){(function (){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard((typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null));
var _propTypes = _interopRequireDefault((typeof window !== "undefined" ? window['PropTypes'] : typeof global !== "undefined" ? global['PropTypes'] : null));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Message = function Message(_ref) {
  var hidden = _ref.hidden,
    message = _ref.message,
    type = _ref.type,
    ttl = _ref.ttl,
    onTtl = _ref.onTtl;
  var attributes = {
    'aria-hidden': hidden,
    'aria-label': 'Messages',
    'aria-live': 'polite',
    className: "message ".concat(type),
    role: 'region'
  };

  // runs after the component is rendered
  (0, _react.useEffect)(function () {
    if (!message) {
      return;
    }
    setTimeout(onTtl, ttl);
  });
  return /*#__PURE__*/_react["default"].createElement("div", attributes, message);
};
Message.defaultProps = {
  hidden: false,
  type: 'info',
  ttl: 5000
};
Message.propTypes = {
  hidden: _propTypes["default"].bool.isRequired,
  message: _propTypes["default"].string,
  type: _propTypes["default"].string,
  ttl: _propTypes["default"].number,
  onTtl: _propTypes["default"].func.isRequired
};
var _default = Message;
exports["default"] = _default;
module.exports = exports.default;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
(function (global){(function (){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard((typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null));
var _propTypes = _interopRequireDefault((typeof window !== "undefined" ? window['PropTypes'] : typeof global !== "undefined" ? global['PropTypes'] : null));
var _Letter = _interopRequireDefault(require("./Letter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Phrase = /*#__PURE__*/function (_Component) {
  _inherits(Phrase, _Component);
  var _super = _createSuper(Phrase);
  function Phrase(props) {
    var _this;
    _classCallCheck(this, Phrase);
    _this = _super.call(this, props);
    _this.letterPool = _this.props.correctAnswer.replace(/\s/g, '').split(''); // spaces removed

    _this.correct = [];
    _this.incorrect = [];

    // initial pass to see which letters are correct
    var guess = _this.props.correctAnswer.split('').map(function (letter, i) {
      var guessedLetter = _this.props.guess[i] || '';
      return {
        i: i,
        correctLetter: letter,
        guessedLetter: guessedLetter,
        status: _this.props.isComplete ? _this.evaluateGuessForCorrectness(guessedLetter, letter, i) : null
      };
    });

    // second pass on incorrect letters to see if maybe they just need to be shuffled
    // had to do this separate so that guessed letters later in the guess aren't included in the pool
    // of available letters
    _this.incorrect.map(function (i) {
      guess[i].status = _this.evaluateWrongGuesses(guess[i].guessedLetter);
    });
    _this.state = {
      activeLetter: 0,
      direction: 'forward',
      // forward (new latter) OR backward (backspace)
      guess: guess,
      animate: false
    };
    _this.onBackspace = _this.onBackspace.bind(_assertThisInitialized(_this));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Phrase, [{
    key: "evaluateGuessForCorrectness",
    value: function evaluateGuessForCorrectness(guessedLetter, correctLetter, i) {
      if (guessedLetter === correctLetter) {
        // take this letter out of this.letterPool
        this.removeLetterFromPool(guessedLetter);
        this.correct.push(i);
        return 'pass';
      } else {
        this.incorrect.push(i);
      }
      return null;
    }
  }, {
    key: "evaluateWrongGuesses",
    value: function evaluateWrongGuesses(guessedLetter) {
      if (this.letterPool.indexOf(guessedLetter) !== -1) {
        this.removeLetterFromPool(guessedLetter);
        return 'shuffle';
      } else {
        return 'fail';
      }
    }
  }, {
    key: "evaluateGuess",
    value: function evaluateGuess() {
      var _this2 = this;
      this.setState(function (state) {
        var success = true;

        // update guess

        // check each letter for correctness. if correct; remove that letter from the letter pool
        state.guess = state.guess.map(function (g) {
          g.status = _this2.evaluateGuessForCorrectness(g.guessedLetter, g.correctLetter, g.i);
          if (g.status !== 'pass') success = false;
          return g;
        });

        // now that we know which letters are correct, let's evaluate the wrong letters
        // need to do this separately because Array.map() can't do a lookahead check
        _this2.incorrect.map(function (i) {
          state.guess[i].status = _this2.evaluateWrongGuesses(state.guess[i].guessedLetter);
          if (state.guess[i].status !== 'pass') success = false;
        });
        var guess = state.guess.map(function (g) {
          return g.guessedLetter;
        }).join('');
        success ? _this2.props.onPass(guess, _this2.props.phraseNumber + 1) : _this2.props.onFail(guess, _this2.props.phraseNumber + 1);
        return {
          animate: true,
          guess: state.guess
        };
      });
    }
  }, {
    key: "removeLetterFromPool",
    value: function removeLetterFromPool(letter) {
      var index = this.letterPool.indexOf(letter);
      if (index > -1) {
        this.letterPool.splice(index, 1);
      }
    }
  }, {
    key: "onChange",
    value: function onChange(letter, i) {
      this.setState(function (state) {
        var update = {
          direction: 'forward'
        };
        var guess = state.guess;
        if (state.activeLetter !== guess.length - 1) {
          // only increase the activeLetter if we're NOT on the last letter
          update.activeLetter = state.activeLetter + 1;
        }

        // update guess
        guess[i].guessedLetter = letter;
        update.guess = guess;
        return update;
      });
    }
  }, {
    key: "onBackspace",
    value: function onBackspace(i) {
      this.setState(function (state) {
        if (state.activeLetter === 0) {
          // we're back at the beginning already
          return {};
        }
        var update = {
          direction: 'backward'
        };
        var guess = state.guess;
        if (state.activeLetter === state.guess.length - 1 && guess[i].guessedLetter.match(/[A-Za-z]/)) {
          // last letter and NOT EMPTY. remove the letter, but do not move the cursor
          guess[i].guessedLetter = '';
        } else {
          // not the last letter. go back a letter and remove its value
          update.activeLetter = state.activeLetter - 1;
          guess[i - 1].guessedLetter = '';
        }
        update.guess = guess;
        return update;
      });
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      var guess = this.state.guess.map(function (guess) {
        return guess.guessedLetter;
      }).join('');
      if (guess.length < this.props.correctAnswer.length) {
        this.props.displayMessage({
          type: 'error',
          message: 'Not enough letters'
        });
      } else {
        this.evaluateGuess();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var label = "Guess #".concat(this.props.phraseNumber + 1);
      if (this.props.isComplete) {
        label += ': complete';
      } else if (this.props.isCurrentRow) {
        label += ': in progress';
      }
      var attributes = {
        'aria-label': label,
        className: 'guess',
        role: 'group'
      };
      return /*#__PURE__*/_react["default"].createElement("div", attributes, this.state.guess.map(function (character, i) {
        return /*#__PURE__*/_react["default"].createElement(_Letter["default"], {
          animate: _this3.state.animate,
          direction: _this3.state.direction,
          focus: _this3.props.isCurrentRow && _this3.state.activeLetter === i,
          isComplete: _this3.props.isComplete,
          isCurrentRow: _this3.props.isCurrentRow,
          isSpace: character.correctLetter === ' ',
          key: i,
          letterNumber: i,
          onBackspace: function onBackspace() {
            return _this3.onBackspace(i);
          },
          onChange: function onChange(letter) {
            return _this3.onChange(letter, i);
          },
          onEnter: _this3.onEnter,
          onRefocusComplete: _this3.props.onRefocusComplete,
          status: character.status,
          triggerFocus: _this3.props.triggerFocus && _this3.props.isCurrentRow && _this3.state.activeLetter === i,
          value: character.guessedLetter
        });
      }));
    }
  }]);
  return Phrase;
}(_react.Component);
Phrase.propTypes = {
  correctAnswer: _propTypes["default"].string.isRequired,
  displayMessage: _propTypes["default"].func.isRequired,
  guess: _propTypes["default"].string.isRequired,
  isComplete: _propTypes["default"].bool.isRequired,
  isCurrentRow: _propTypes["default"].bool.isRequired,
  onFail: _propTypes["default"].func.isRequired,
  onPass: _propTypes["default"].func.isRequired,
  onRefocusComplete: _propTypes["default"].func.isRequired,
  phraseNumber: _propTypes["default"].number.isRequired,
  triggerFocus: _propTypes["default"].bool.isRequired
};
var _default = Phrase;
exports["default"] = _default;
module.exports = exports.default;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Letter":12}],15:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault((typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null));
var _propTypes = _interopRequireDefault((typeof window !== "undefined" ? window['PropTypes'] : typeof global !== "undefined" ? global['PropTypes'] : null));
var _focusTrapReact = _interopRequireDefault(require("focus-trap-react"));
var _jsUtils = require("js-utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var StatisticsModal = function StatisticsModal(_ref) {
  var onClose = _ref.onClose,
    open = _ref.open,
    stats = _ref.stats,
    testing = _ref.testing;
  var attributes = {
    'aria-label': 'Statistics',
    className: 'stats',
    role: 'region'
  };
  if (open) {
    attributes.className += ' open';
    _jsUtils["class"].addClass(document.body, 'modal-open');
  } else {
    _jsUtils["class"].removeClass(document.body, 'modal-open');
  }
  var winPercentage = stats.gamesPlayed > 0 && stats.gamesWon > 0 ? Math.round(stats.gamesWon / stats.gamesPlayed * 100) : 0;
  var maxGuessDistribution = Math.max.apply(Math, _toConsumableArray(stats.guessDistribution));
  var unitWidth = maxGuessDistribution > 0 ? 100 / maxGuessDistribution : 0;

  // see: https://github.com/focus-trap/focus-trap#testing-in-jsdom
  var focusTrapOptions = testing ? {
    tabbableOptions: {
      displayCheck: 'none'
    }
  } : {};
  return /*#__PURE__*/_react["default"].createElement("div", attributes, /*#__PURE__*/_react["default"].createElement("div", {
    className: 'overlay'
  }), open && /*#__PURE__*/_react["default"].createElement(_focusTrapReact["default"], {
    focusTrapOptions: focusTrapOptions
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: 'stats-container'
  }, /*#__PURE__*/_react["default"].createElement("button", {
    className: 'close',
    onClick: onClose
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: '../../../build/images/close.svg',
    alt: 'Close modal'
  })), /*#__PURE__*/_react["default"].createElement("h2", null, "Statistics"), /*#__PURE__*/_react["default"].createElement("dl", {
    className: 'overall-stats'
  }, /*#__PURE__*/_react["default"].createElement("dt", null, "Games played"), /*#__PURE__*/_react["default"].createElement("dd", {
    "data-testid": 'gamesPlayed'
  }, stats.gamesPlayed), /*#__PURE__*/_react["default"].createElement("dt", null, "Win percentage"), /*#__PURE__*/_react["default"].createElement("dd", {
    "data-testid": 'winPercentage'
  }, winPercentage, "%"), /*#__PURE__*/_react["default"].createElement("dt", null, "Current streak"), /*#__PURE__*/_react["default"].createElement("dd", {
    "data-testid": 'winStreak'
  }, stats.winStreak), /*#__PURE__*/_react["default"].createElement("dt", null, "Max streak"), /*#__PURE__*/_react["default"].createElement("dd", {
    "data-testid": 'maxStreak'
  }, stats.maxStreak)), /*#__PURE__*/_react["default"].createElement("h3", null, "Guess distribution"), /*#__PURE__*/_react["default"].createElement("dl", {
    className: 'guess-distribution'
  }, stats.guessDistribution.map(function (guessCount, guessNumber) {
    var barWidth = "".concat(unitWidth * guessCount, "%");
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: guessNumber
    }, /*#__PURE__*/_react["default"].createElement("dt", {
      "data-testid": "guessDistribution-label-".concat(guessNumber)
    }, "Games won with ", guessNumber + 1, " guesses"), /*#__PURE__*/_react["default"].createElement("dd", {
      "data-testid": "guessDistribution-count-".concat(guessNumber),
      style: {
        width: barWidth
      }
    }, guessCount));
  })))));
};
StatisticsModal.defaultProps = {
  testing: false
};
StatisticsModal.propTypes = {
  onClose: _propTypes["default"].func.isRequired,
  open: _propTypes["default"].bool.isRequired,
  stats: _propTypes["default"].object.isRequired,
  testing: _propTypes["default"].bool
};
var _default = StatisticsModal;
exports["default"] = _default;
module.exports = exports.default;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"focus-trap-react":1,"js-utils":3}],16:[function(require,module,exports){
(function (global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault((typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null));
var _propTypes = _interopRequireDefault((typeof window !== "undefined" ? window['PropTypes'] : typeof global !== "undefined" ? global['PropTypes'] : null));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SupportingContent = function SupportingContent(_ref) {
  var hidden = _ref.hidden,
    headline = _ref.headline,
    link = _ref.link,
    summary = _ref.summary,
    thumbnail = _ref.thumbnail;
  var attributes = {
    'aria-hidden': hidden,
    'aria-label': 'See it on the Hub',
    'aria-live': 'polite',
    className: 'supporting-content',
    role: 'region'
  };
  return /*#__PURE__*/_react["default"].createElement("div", attributes, /*#__PURE__*/_react["default"].createElement("h2", null, "See it on the Hub"), /*#__PURE__*/_react["default"].createElement("div", {
    className: 'article teaser'
  }));

  // <div class="article teaser column force has-image">

  //   <div class="thumbnail">
  //     <a class="force" href="https://hub.jhu.edu/2022/11/10/veterans-health-rita-daoust/" data-label="On the front lines of veteran health care">
  //       <div class="image column force image-landscape"><div class="image-container"><img src="https://api.hub.jhu.edu/factory/sites/default/files/styles/hub_thumbnail/public/2022-11/veteran-health-thumbnail.jpg" alt="A man wearing a veteran's cap sits with a flag in the background and a walker in the foreground" class="column" sizes="(min-width: 1680px) 210px, (min-width: 1280px) 210px, (min-width: 1024px) 187px, (min-width: 863px) 150px, (min-width: 768px) 126px, (min-width: 640px) 112px, (min-width: 412px) 94px, (min-width: 375px) 60px, 55px" srcset="https://api.hub.jhu.edu/factory/sites/default/files/styles/hard_crop_landscape_240/public/2022-11/veteran-health-thumbnail.jpg 240w, https://api.hub.jhu.edu/factory/sites/default/files/styles/hub_thumbnail/public/2022-11/veteran-health-thumbnail.jpg 360w, https://api.hub.jhu.edu/factory/sites/default/files/styles/hard_crop_landscape_540/public/2022-11/veteran-health-thumbnail.jpg 540w, https://api.hub.jhu.edu/factory/sites/default/files/styles/hard_crop_landscape_720/public/2022-11/veteran-health-thumbnail.jpg 720w, https://api.hub.jhu.edu/factory/sites/default/files/styles/landscape/public/2022-11/veteran-health-thumbnail.jpg 900w, https://api.hub.jhu.edu/factory/sites/default/files/styles/hard_crop_landscape_1005/public/2022-11/veteran-health-thumbnail.jpg 1005w, https://api.hub.jhu.edu/factory/sites/default/files/styles/hard_crop_landscape_1230/public/2022-11/veteran-health-thumbnail.jpg 1230w, https://api.hub.jhu.edu/factory/sites/default/files/styles/hard_crop_landscape_1380/public/2022-11/veteran-health-thumbnail.jpg 1380w"></div></div>
  //     </a>
  //   </div>

  //   <div class="text">

  //     <div class="accent-element">

  //       <div class="kicker">Q<span class="plus">+</span>A</div>

  //       <h5><a href="https://hub.jhu.edu/2022/11/10/veterans-health-rita-daoust/" data-label="On the front lines of veteran health care">

  //         On the front lines of veteran health

  //       </a></h5>

  //       <span class="visuallyhidden">Published</span>

  //       <span class="publish-date convert-pubdate" data-timestamp="1668117614"> <i class="fa fa-clock-o" aria-hidden="true"></i> a day ago</span>

  //       <div class="summary">Johns Hopkins nursing expert Rita D'Aoust and her longtime research colleague Alicia Gill Rossiter are working to change how veterans and their families receive health care in the United States

  //       </div>

  //     </div>

  //   </div>

  // </div>
};

SupportingContent.propTypes = {
  headline: _propTypes["default"].string.isRequired,
  link: _propTypes["default"].string.isRequired,
  summary: _propTypes["default"].string.isRequired,
  thumbnail: _propTypes["default"].string.isRequired,
  hidden: _propTypes["default"].bool.isRequired
};
var _default = SupportingContent;
exports["default"] = _default;
module.exports = exports.default;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
(function (global){(function (){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard((typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null));
var _propTypes = _interopRequireDefault((typeof window !== "undefined" ? window['PropTypes'] : typeof global !== "undefined" ? global['PropTypes'] : null));
var _persistance = require("./lib/helpers/persistance");
var _storage = require("./lib/helpers/storage");
var _statistics = _interopRequireDefault(require("./lib/helpers/statistics"));
var _Answer = _interopRequireDefault(require("./lib/puzzle-parts/Answer"));
var _Clue = _interopRequireDefault(require("./lib/puzzle-parts/Clue"));
var _Guesses = _interopRequireDefault(require("./lib/puzzle-parts/Guesses"));
var _Message = _interopRequireDefault(require("./lib/puzzle-parts/Message"));
var _StatisticsModal = _interopRequireDefault(require("./lib/puzzle-parts/StatisticsModal"));
var _SupportingContent = _interopRequireDefault(require("./lib/puzzle-parts/SupportingContent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Puzzle = /*#__PURE__*/function (_Component) {
  _inherits(Puzzle, _Component);
  var _super = _createSuper(Puzzle);
  function Puzzle(props) {
    var _this;
    _classCallCheck(this, Puzzle);
    props.puzzle.answer = props.puzzle.answer.toUpperCase();
    _this = _super.call(this, props);
    _this.availableGuesses = 6;
    _this.supportingContent = null;
    _this.loadPuzzle = function (id) {
      return (0, _persistance.loadPuzzleState)(id);
    };
    _this.savePuzzle = function (id, puzzle) {
      return (0, _persistance.savePuzzleState)(id, puzzle);
    };
    _this.onPuzzleComplete = props.onPuzzleComplete || function (status, numberOfGuesses) {};
    _this.fetchSupportingContent = props.fetchSupportingContent || function (endpoint) {};

    // fetch any stored data from localStorage
    var stored = _this.loadPuzzle(_this.props.id) || {};
    _this.stats = new _statistics["default"](_this.availableGuesses, _storage.local, _this.props.logger);

    // combine stored and default state
    _this.state = {
      message: {},
      puzzle: _objectSpread({
        guesses: Array.apply(null, Array(_this.availableGuesses)).map(function () {
          return '';
        }),
        currentRow: 0,
        status: 'IN_PROGRESS'
      }, stored),
      statMobileOpen: false
    };
    _this.clearPuzzleData = _this.clearPuzzleData.bind(_assertThisInitialized(_this));
    _this.clearStatsData = _this.clearStatsData.bind(_assertThisInitialized(_this));
    _this.incrementStats = _this.incrementStats.bind(_assertThisInitialized(_this));
    _this.openStatsModal = _this.openStatsModal.bind(_assertThisInitialized(_this));
    _this.closeStatsModal = _this.closeStatsModal.bind(_assertThisInitialized(_this));
    _this.displayMessage = _this.displayMessage.bind(_assertThisInitialized(_this));
    _this.onGuessFail = _this.onGuessFail.bind(_assertThisInitialized(_this));
    _this.onPuzzlePass = _this.onPuzzlePass.bind(_assertThisInitialized(_this));
    _this.clearMessage = _this.clearMessage.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(Puzzle, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof this.props.puzzle.supportingContent === 'string') {
        // this.fetchSupportingContent should return an object with the following keys: headline, link, summary, thumbnail
        this.supportingContent = this.fetchSupportingContent(this.props.puzzle.supportingContent);
      }
    }
  }, {
    key: "clearPuzzleData",
    value: function clearPuzzleData() {
      _storage.local.remove('hopkinshurdle.' + this.props.id);
    }
  }, {
    key: "clearStatsData",
    value: function clearStatsData() {
      _storage.local.remove('hopkinshurdle.stats');
    }
  }, {
    key: "incrementStats",
    value: function incrementStats() {
      console.log(this.stats.increment());
    }
  }, {
    key: "openStatsModal",
    value: function openStatsModal() {
      this.setState({
        statMobileOpen: true
      });
    }
  }, {
    key: "closeStatsModal",
    value: function closeStatsModal() {
      this.setState({
        statMobileOpen: false
      });
    }
  }, {
    key: "onGuessFail",
    value: function onGuessFail(guess, numberOfGuesses) {
      var _this2 = this;
      this.setState(function (state) {
        var puzzle = state.puzzle;

        // update guesses
        puzzle.guesses[puzzle.currentRow] = guess;

        // ran out of guesses
        if (puzzle.currentRow + 1 === _this2.availableGuesses) {
          puzzle.status = 'FAIL';
        } else {
          puzzle.currentRow = puzzle.currentRow + 1;
        }
        return {
          puzzle: puzzle
        };
      }, function () {
        _this2.savePuzzle(_this2.props.id, _this2.state.puzzle);
        if (_this2.state.puzzle.status === 'FAIL') {
          _this2.onPuzzleEnd(numberOfGuesses);
        } else {
          _this2.displayMessage({
            type: 'info',
            message: 'Your guess is incorrect.'
          });
        }
      });
    }
  }, {
    key: "onPuzzlePass",
    value: function onPuzzlePass(guess, numberOfGuesses) {
      var _this3 = this;
      this.setState(function (state) {
        var puzzle = state.puzzle;
        puzzle.status = 'PASS';

        // update guesses
        puzzle.guesses[puzzle.currentRow] = guess;
        puzzle.guesses = puzzle.guesses;
        return {
          puzzle: puzzle
        };
      }, function () {
        _this3.savePuzzle(_this3.props.id, _this3.state.puzzle);
        _this3.onPuzzleEnd(numberOfGuesses);
      });
    }
  }, {
    key: "clearMessage",
    value: function clearMessage() {
      this.setState({
        message: {}
      });
    }
  }, {
    key: "displayMessage",
    value: function displayMessage(message) {
      this.setState({
        message: message
      });
    }
  }, {
    key: "onPuzzleEnd",
    value: function onPuzzleEnd(numberOfGuesses) {
      var _this4 = this;
      this.stats.stats = this.stats.update(this.state.puzzle.status, numberOfGuesses);
      this.onPuzzleComplete(this.state.puzzle.status, numberOfGuesses);
      setTimeout(function () {
        _this4.displayMessage({
          type: 'error',
          message: _this4.state.puzzle.status === 'PASS' ? 'Great job!' : 'Better luck next time.'
        });
      }, this.props.puzzle.answer.length * 100 + 750); // 750ms after animation finishes
    }
  }, {
    key: "render",
    value: function render() {
      var remainingGuesses = this.availableGuesses - this.state.puzzle.guesses.filter(function (n) {
        return n;
      }).length;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_StatisticsModal["default"], {
        onClose: this.closeStatsModal,
        open: this.state.statMobileOpen,
        stats: this.stats.stats
      }), /*#__PURE__*/_react["default"].createElement(_Message["default"], _extends({
        hidden: this.state.statMobileOpen,
        onTtl: this.clearMessage
      }, this.state.message)), this.props.puzzle.clues && /*#__PURE__*/_react["default"].createElement(_Clue["default"], {
        clue: this.props.puzzle.clues[this.state.puzzle.currentRow],
        currentRow: this.state.puzzle.currentRow,
        hidden: this.state.statMobileOpen
      }), /*#__PURE__*/_react["default"].createElement(_Guesses["default"], {
        answerDescription: this.props.puzzle.answerDescription,
        currentRow: this.state.puzzle.currentRow,
        correctAnswer: this.props.puzzle.answer.toUpperCase(),
        displayMessage: this.displayMessage,
        guesses: this.state.puzzle.guesses,
        hidden: this.state.statMobileOpen,
        onGuessFail: this.onGuessFail,
        onPuzzlePass: this.onPuzzlePass,
        remainingGuesses: remainingGuesses,
        status: this.state.puzzle.status
      }), this.state.puzzle.status === 'FAIL' && /*#__PURE__*/_react["default"].createElement(_Answer["default"], {
        answer: this.props.puzzle.answer
      }), this.state.puzzle.status !== 'IN_PROGRESS' && this.supportingContent && /*#__PURE__*/_react["default"].createElement(_SupportingContent["default"], _extends({
        hidden: this.state.statMobileOpen
      }, this.supportingContent)), this.props.debug && /*#__PURE__*/_react["default"].createElement("div", {
        className: 'debug'
      }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
        onClick: this.clearPuzzleData
      }, "Clear stored puzzle data"), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: this.clearStatsData
      }, "Clear stored stats data")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
        onClick: this.incrementStats
      }, "Increment Stats"), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: this.openStatsModal
      }, "Open Stats Modal"))));
    }
  }]);
  return Puzzle;
}(_react.Component);
Puzzle.defaultProps = {
  debug: false
};
Puzzle.propTypes = {
  fetchSupportingContent: _propTypes["default"].func,
  id: _propTypes["default"].number.isRequired,
  puzzle: _propTypes["default"].object.isRequired,
  onPuzzleComplete: _propTypes["default"].func
};
var _default = Puzzle;
exports["default"] = _default;
module.exports = exports.default;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lib/helpers/persistance":6,"./lib/helpers/statistics":7,"./lib/helpers/storage":8,"./lib/puzzle-parts/Answer":9,"./lib/puzzle-parts/Clue":10,"./lib/puzzle-parts/Guesses":11,"./lib/puzzle-parts/Message":13,"./lib/puzzle-parts/StatisticsModal":15,"./lib/puzzle-parts/SupportingContent":16}]},{},[17]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpeyhmdW5jdGlvbiAoKXtcblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfSwgX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6IGZhbHNlIH0pOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN1YkNsYXNzLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cblxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cblxuZnVuY3Rpb24gX2NyZWF0ZVN1cGVyKERlcml2ZWQpIHsgdmFyIGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QgPSBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCk7IHJldHVybiBmdW5jdGlvbiBfY3JlYXRlU3VwZXJJbnRlcm5hbCgpIHsgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLCByZXN1bHQ7IGlmIChoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KSB7IHZhciBOZXdUYXJnZXQgPSBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3I7IHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7IH0gZWxzZSB7IHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0gcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIHJlc3VsdCk7IH07IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSBlbHNlIGlmIChjYWxsICE9PSB2b2lkIDApIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRlcml2ZWQgY29uc3RydWN0b3JzIG1heSBvbmx5IHJldHVybiBvYmplY3Qgb3IgdW5kZWZpbmVkXCIpOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7IGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7IGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7IHRyeSB7IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChCb29sZWFuLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIFJlYWN0ID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlYWN0J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWFjdCddIDogbnVsbCk7XG5cbnZhciBQcm9wVHlwZXMgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvcFR5cGVzJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9wVHlwZXMnXSA6IG51bGwpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdmb2N1cy10cmFwJyksXG4gICAgY3JlYXRlRm9jdXNUcmFwID0gX3JlcXVpcmUuY3JlYXRlRm9jdXNUcmFwO1xuXG52YXIgX3JlcXVpcmUyID0gcmVxdWlyZSgndGFiYmFibGUnKSxcbiAgICBpc0ZvY3VzYWJsZSA9IF9yZXF1aXJlMi5pc0ZvY3VzYWJsZTtcblxudmFyIEZvY3VzVHJhcCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoRm9jdXNUcmFwLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKEZvY3VzVHJhcCk7XG5cbiAgZnVuY3Rpb24gRm9jdXNUcmFwKHByb3BzKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZvY3VzVHJhcCk7XG5cbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHByb3BzKTtcblxuICAgIF9kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCJnZXROb2RlRm9yT3B0aW9uXCIsIGZ1bmN0aW9uIChvcHRpb25OYW1lKSB7XG4gICAgICB2YXIgX3RoaXMkaW50ZXJuYWxPcHRpb25zO1xuXG4gICAgICAvLyB1c2UgaW50ZXJuYWwgb3B0aW9ucyBmaXJzdCwgZmFsbGluZyBiYWNrIHRvIG9yaWdpbmFsIG9wdGlvbnNcbiAgICAgIHZhciBvcHRpb25WYWx1ZSA9IChfdGhpcyRpbnRlcm5hbE9wdGlvbnMgPSB0aGlzLmludGVybmFsT3B0aW9uc1tvcHRpb25OYW1lXSkgIT09IG51bGwgJiYgX3RoaXMkaW50ZXJuYWxPcHRpb25zICE9PSB2b2lkIDAgPyBfdGhpcyRpbnRlcm5hbE9wdGlvbnMgOiB0aGlzLm9yaWdpbmFsT3B0aW9uc1tvcHRpb25OYW1lXTtcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25WYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcGFyYW1zID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICBwYXJhbXNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9uVmFsdWUgPSBvcHRpb25WYWx1ZS5hcHBseSh2b2lkIDAsIHBhcmFtcyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25WYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBvcHRpb25WYWx1ZSA9IHVuZGVmaW5lZDsgLy8gdXNlIGRlZmF1bHQgdmFsdWVcbiAgICAgIH1cblxuICAgICAgaWYgKCFvcHRpb25WYWx1ZSkge1xuICAgICAgICBpZiAob3B0aW9uVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBvcHRpb25WYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9uVmFsdWU7XG4gICAgICAgIH0gLy8gZWxzZSwgZW1wdHkgc3RyaW5nIChpbnZhbGlkKSwgbnVsbCAoaW52YWxpZCksIDAgKGludmFsaWQpXG5cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJgXCIuY29uY2F0KG9wdGlvbk5hbWUsIFwiYCB3YXMgc3BlY2lmaWVkIGJ1dCB3YXMgbm90IGEgbm9kZSwgb3IgZGlkIG5vdCByZXR1cm4gYSBub2RlXCIpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG5vZGUgPSBvcHRpb25WYWx1ZTsgLy8gY291bGQgYmUgSFRNTEVsZW1lbnQsIFNWR0VsZW1lbnQsIG9yIG5vbi1lbXB0eSBzdHJpbmcgYXQgdGhpcyBwb2ludFxuXG4gICAgICBpZiAodHlwZW9mIG9wdGlvblZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgX3RoaXMkZ2V0RG9jdW1lbnQ7XG5cbiAgICAgICAgbm9kZSA9IChfdGhpcyRnZXREb2N1bWVudCA9IHRoaXMuZ2V0RG9jdW1lbnQoKSkgPT09IG51bGwgfHwgX3RoaXMkZ2V0RG9jdW1lbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90aGlzJGdldERvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9uVmFsdWUpOyAvLyByZXNvbHZlIHRvIG5vZGUsIG9yIG51bGwgaWYgZmFpbHNcblxuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJgXCIuY29uY2F0KG9wdGlvbk5hbWUsIFwiYCBhcyBzZWxlY3RvciByZWZlcnMgdG8gbm8ga25vd24gbm9kZVwiKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSk7XG5cbiAgICBfdGhpcy5oYW5kbGVEZWFjdGl2YXRlID0gX3RoaXMuaGFuZGxlRGVhY3RpdmF0ZS5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5oYW5kbGVQb3N0RGVhY3RpdmF0ZSA9IF90aGlzLmhhbmRsZVBvc3REZWFjdGl2YXRlLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLmhhbmRsZUNsaWNrT3V0c2lkZURlYWN0aXZhdGVzID0gX3RoaXMuaGFuZGxlQ2xpY2tPdXRzaWRlRGVhY3RpdmF0ZXMuYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7IC8vIGZvY3VzLXRyYXAgb3B0aW9ucyB1c2VkIGludGVybmFsbHkgd2hlbiBjcmVhdGluZyB0aGUgdHJhcFxuXG4gICAgX3RoaXMuaW50ZXJuYWxPcHRpb25zID0ge1xuICAgICAgLy8gV2UgbmVlZCB0byBoaWphY2sgdGhlIHJldHVybkZvY3VzT25EZWFjdGl2YXRlIG9wdGlvbixcbiAgICAgIC8vIGJlY2F1c2UgUmVhY3QgY2FuIG1vdmUgZm9jdXMgaW50byB0aGUgZWxlbWVudCBiZWZvcmUgd2UgYXJyaXZlZCBhdFxuICAgICAgLy8gdGhpcyBsaWZlY3ljbGUgaG9vayAoZS5nLiB3aXRoIGF1dG9Gb2N1cyBpbnB1dHMpLiBTbyB0aGUgY29tcG9uZW50XG4gICAgICAvLyBjYXB0dXJlcyB0aGUgcHJldmlvdXNseUZvY3VzZWRFbGVtZW50IGluIGNvbXBvbmVudFdpbGxNb3VudCxcbiAgICAgIC8vIHRoZW4gKG9wdGlvbmFsbHkpIHJldHVybnMgZm9jdXMgdG8gaXQgaW4gY29tcG9uZW50V2lsbFVubW91bnQuXG4gICAgICByZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZTogZmFsc2UsXG4gICAgICAvLyB0aGUgcmVzdCBvZiB0aGVzZSBhcmUgYWxzbyByZWxhdGVkIHRvIGRlYWN0aXZhdGlvbiBvZiB0aGUgdHJhcCwgYW5kIHdlXG4gICAgICAvLyAgbmVlZCB0byB1c2UgdGhlbSBhbmQgY29udHJvbCB0aGVtIGFzIHdlbGxcbiAgICAgIGNoZWNrQ2FuUmV0dXJuRm9jdXM6IG51bGwsXG4gICAgICBvbkRlYWN0aXZhdGU6IF90aGlzLmhhbmRsZURlYWN0aXZhdGUsXG4gICAgICBvblBvc3REZWFjdGl2YXRlOiBfdGhpcy5oYW5kbGVQb3N0RGVhY3RpdmF0ZSxcbiAgICAgIC8vIHdlIG5lZWQgdG8gc3BlY2lhbC1jYXNlIHRoaXMgc2V0dGluZyBhcyB3ZWxsIHNvIHRoYXQgd2UgY2FuIGtub3cgaWYgd2Ugc2hvdWxkXG4gICAgICAvLyAgTk9UIHJldHVybiBmb2N1cyBpZiB0aGUgdHJhcCBnZXRzIGF1dG8tZGVhY3RpdmF0ZWQgYXMgdGhlIHJlc3VsdCBvZiBhblxuICAgICAgLy8gIG91dHNpZGUgY2xpY2sgKG90aGVyd2lzZSwgd2UnbGwgYWx3YXlzIHRoaW5rIHdlIHNob3VsZCByZXR1cm4gZm9jdXMgYmVjYXVzZVxuICAgICAgLy8gIG9mIGhvdyB3ZSBtYW5hZ2UgdGhhdCBmbGFnIGludGVybmFsbHkgaGVyZSlcbiAgICAgIGNsaWNrT3V0c2lkZURlYWN0aXZhdGVzOiBfdGhpcy5oYW5kbGVDbGlja091dHNpZGVEZWFjdGl2YXRlc1xuICAgIH07IC8vIG9yaWdpbmFsIG9wdGlvbnMgcHJvdmlkZWQgYnkgdGhlIGNvbnN1bWVyXG5cbiAgICBfdGhpcy5vcmlnaW5hbE9wdGlvbnMgPSB7XG4gICAgICAvLyBiZWNhdXNlIG9mIHRoZSBhYm92ZSBgaW50ZXJuYWxPcHRpb25zYCwgd2UgbWFpbnRhaW4gb3VyIG93biBmbGFnIGZvclxuICAgICAgLy8gIHRoaXMgb3B0aW9uLCBhbmQgZGVmYXVsdCBpdCB0byBgdHJ1ZWAgYmVjYXVzZSB0aGF0J3MgZm9jdXMtdHJhcCdzIGRlZmF1bHRcbiAgICAgIHJldHVybkZvY3VzT25EZWFjdGl2YXRlOiB0cnVlLFxuICAgICAgLy8gYmVjYXVzZSBvZiB0aGUgYWJvdmUgYGludGVybmFsT3B0aW9uc2AsIHdlIGtlZXAgdGhlc2Ugc2VwYXJhdGUgc2luY2VcbiAgICAgIC8vICB0aGV5J3JlIHBhcnQgb2YgdGhlIGRlYWN0aXZhdGlvbiBwcm9jZXNzIHdoaWNoIHdlIGNvbmZpZ3VyZSAoaW50ZXJuYWxseSkgdG9cbiAgICAgIC8vICBiZSBzaGFyZWQgYmV0d2VlbiBmb2N1cy10cmFwIGFuZCBmb2N1cy10cmFwLXJlYWN0XG4gICAgICBvbkRlYWN0aXZhdGU6IG51bGwsXG4gICAgICBvblBvc3REZWFjdGl2YXRlOiBudWxsLFxuICAgICAgY2hlY2tDYW5SZXR1cm5Gb2N1czogbnVsbCxcbiAgICAgIC8vIHRoZSB1c2VyJ3Mgc2V0dGluZywgZGVmYXVsdGVkIHRvIGZhbHNlIHNpbmNlIGZvY3VzLXRyYXAgZGVmYXVsdHMgdGhpcyB0byBmYWxzZVxuICAgICAgY2xpY2tPdXRzaWRlRGVhY3RpdmF0ZXM6IGZhbHNlXG4gICAgfTtcbiAgICB2YXIgZm9jdXNUcmFwT3B0aW9ucyA9IHByb3BzLmZvY3VzVHJhcE9wdGlvbnM7XG5cbiAgICBmb3IgKHZhciBvcHRpb25OYW1lIGluIGZvY3VzVHJhcE9wdGlvbnMpIHtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGZvY3VzVHJhcE9wdGlvbnMsIG9wdGlvbk5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9uTmFtZSA9PT0gJ3JldHVybkZvY3VzT25EZWFjdGl2YXRlJyB8fCBvcHRpb25OYW1lID09PSAnb25EZWFjdGl2YXRlJyB8fCBvcHRpb25OYW1lID09PSAnb25Qb3N0RGVhY3RpdmF0ZScgfHwgb3B0aW9uTmFtZSA9PT0gJ2NoZWNrQ2FuUmV0dXJuRm9jdXMnIHx8IG9wdGlvbk5hbWUgPT09ICdjbGlja091dHNpZGVEZWFjdGl2YXRlcycpIHtcbiAgICAgICAgX3RoaXMub3JpZ2luYWxPcHRpb25zW29wdGlvbk5hbWVdID0gZm9jdXNUcmFwT3B0aW9uc1tvcHRpb25OYW1lXTtcbiAgICAgICAgY29udGludWU7IC8vIGV4Y2x1ZGUgZnJvbSBpbnRlcm5hbE9wdGlvbnNcbiAgICAgIH1cblxuICAgICAgX3RoaXMuaW50ZXJuYWxPcHRpb25zW29wdGlvbk5hbWVdID0gZm9jdXNUcmFwT3B0aW9uc1tvcHRpb25OYW1lXTtcbiAgICB9IC8vIGlmIHNldCwgYHsgdGFyZ2V0OiBOb2RlLCBhbGxvd0RlYWN0aXZhdGlvbjogYm9vbGVhbiB9YCB3aGVyZSBgdGFyZ2V0YCBpcyB0aGUgb3V0c2lkZVxuICAgIC8vICBub2RlIHRoYXQgd2FzIGNsaWNrZWQsIGFuZCBgYWxsb3dEZWFjdGl2YXRpb25gIGlzIHRoZSByZXN1bHQgb2YgdGhlIGNvbnN1bWVyJ3NcbiAgICAvLyAgb3B0aW9uIChzdG9yZWQgaW4gYHRoaXMub3JpZ2luYWxPcHRpb25zLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzYCwgd2hpY2ggbWF5IGJlIGFcbiAgICAvLyAgZnVuY3Rpb24pIHdoZXRoZXIgdG8gYWxsb3cgb3IgZGVueSBhdXRvLWRlYWN0aXZhdGlvbiBvbiBjbGljayBvbiB0aGlzIG91dHNpZGUgbm9kZVxuXG5cbiAgICBfdGhpcy5vdXRzaWRlQ2xpY2sgPSBudWxsOyAvLyBlbGVtZW50cyBmcm9tIHdoaWNoIHRvIGNyZWF0ZSB0aGUgZm9jdXMgdHJhcCBvbiBtb3VudDsgaWYgYSBjaGlsZCBpcyB1c2VkXG4gICAgLy8gIGluc3RlYWQgb2YgdGhlIGBjb250YWluZXJFbGVtZW50c2AgcHJvcCwgd2UnbGwgZ2V0IHRoZSBjaGlsZCdzIHJlbGF0ZWRcbiAgICAvLyAgZWxlbWVudCB3aGVuIHRoZSB0cmFwIHJlbmRlcnMgYW5kIHRoZW4gaXMgZGVjbGFyZWQgJ21vdW50ZWQnXG5cbiAgICBfdGhpcy5mb2N1c1RyYXBFbGVtZW50cyA9IHByb3BzLmNvbnRhaW5lckVsZW1lbnRzIHx8IFtdOyAvLyBub3cgd2UgcmVtZW1iZXIgd2hhdCB0aGUgY3VycmVudGx5IGZvY3VzZWQgZWxlbWVudCBpcywgbm90IHJlbHlpbmcgb24gZm9jdXMtdHJhcFxuXG4gICAgX3RoaXMudXBkYXRlUHJldmlvdXNFbGVtZW50KCk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgLyoqXG4gICAqIEdldHMgdGhlIGNvbmZpZ3VyZWQgZG9jdW1lbnQuXG4gICAqIEByZXR1cm5zIHtEb2N1bWVudHx1bmRlZmluZWR9IENvbmZpZ3VyZWQgZG9jdW1lbnQsIGZhbGxpbmcgYmFjayB0byB0aGUgbWFpblxuICAgKiAgZG9jdW1lbnQsIGlmIGl0IGV4aXN0cy4gRHVyaW5nIFNTUiwgYHVuZGVmaW5lZGAgaXMgcmV0dXJuZWQgc2luY2UgdGhlXG4gICAqICBkb2N1bWVudCBkb2Vzbid0IGV4aXN0LlxuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhGb2N1c1RyYXAsIFt7XG4gICAga2V5OiBcImdldERvY3VtZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldERvY3VtZW50KCkge1xuICAgICAgLy8gU1NSOiBjYXJlZnVsIHRvIGNoZWNrIGlmIGBkb2N1bWVudGAgZXhpc3RzIGJlZm9yZSBhY2Nlc3NpbmcgaXQgYXMgYSB2YXJpYWJsZVxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZm9jdXNUcmFwT3B0aW9ucy5kb2N1bWVudCB8fCAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50IDogdW5kZWZpbmVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbm9kZSBmb3IgdGhlIGdpdmVuIG9wdGlvbiwgd2hpY2ggaXMgZXhwZWN0ZWQgdG8gYmUgYW4gb3B0aW9uIHRoYXRcbiAgICAgKiAgY2FuIGJlIGVpdGhlciBhIERPTSBub2RlLCBhIHN0cmluZyB0aGF0IGlzIGEgc2VsZWN0b3IgdG8gZ2V0IGEgbm9kZSwgYGZhbHNlYFxuICAgICAqICAoaWYgYSBub2RlIGlzIGV4cGxpY2l0bHkgTk9UIGdpdmVuKSwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW55IG9mIHRoZXNlXG4gICAgICogIHZhbHVlcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uTmFtZVxuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWQgfCBmYWxzZSB8IEhUTUxFbGVtZW50IHwgU1ZHRWxlbWVudH0gUmV0dXJuc1xuICAgICAqICBgdW5kZWZpbmVkYCBpZiB0aGUgb3B0aW9uIGlzIG5vdCBzcGVjaWZpZWQ7IGBmYWxzZWAgaWYgdGhlIG9wdGlvblxuICAgICAqICByZXNvbHZlZCB0byBgZmFsc2VgIChub2RlIGV4cGxpY2l0bHkgbm90IGdpdmVuKTsgb3RoZXJ3aXNlLCB0aGUgcmVzb2x2ZWRcbiAgICAgKiAgRE9NIG5vZGUuXG4gICAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBvcHRpb24gaXMgc2V0LCBub3QgYGZhbHNlYCwgYW5kIGlzIG5vdCwgb3IgZG9lcyBub3RcbiAgICAgKiAgcmVzb2x2ZSB0byBhIG5vZGUuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJnZXRSZXR1cm5Gb2N1c05vZGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UmV0dXJuRm9jdXNOb2RlKCkge1xuICAgICAgdmFyIG5vZGUgPSB0aGlzLmdldE5vZGVGb3JPcHRpb24oJ3NldFJldHVybkZvY3VzJywgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQpO1xuICAgICAgcmV0dXJuIG5vZGUgPyBub2RlIDogbm9kZSA9PT0gZmFsc2UgPyBmYWxzZSA6IHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50O1xuICAgIH1cbiAgICAvKiogVXBkYXRlIHRoZSBwcmV2aW91c2x5IGZvY3VzZWQgZWxlbWVudCB3aXRoIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBlbGVtZW50LiAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwidXBkYXRlUHJldmlvdXNFbGVtZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVByZXZpb3VzRWxlbWVudCgpIHtcbiAgICAgIHZhciBjdXJyZW50RG9jdW1lbnQgPSB0aGlzLmdldERvY3VtZW50KCk7XG5cbiAgICAgIGlmIChjdXJyZW50RG9jdW1lbnQpIHtcbiAgICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSBjdXJyZW50RG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGVhY3RpdmF0ZVRyYXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVhY3RpdmF0ZVRyYXAoKSB7XG4gICAgICAvLyBOT1RFOiBpdCdzIHBvc3NpYmxlIHRoZSBmb2N1cyB0cmFwIGhhcyBhbHJlYWR5IGJlZW4gZGVhY3RpdmF0ZWQgd2l0aG91dCBvdXIga25vd2luZyBpdCxcbiAgICAgIC8vICBlc3BlY2lhbGx5IGlmIHRoZSB1c2VyIHNldCB0aGUgYGNsaWNrT3V0c2lkZURlYWN0aXZhdGVzOiB0cnVlYCBvcHRpb24gb24gdGhlIHRyYXAsXG4gICAgICAvLyAgYW5kIHRoZSBtb3VzZSB3YXMgY2xpY2tlZCBvbiBzb21lIGVsZW1lbnQgb3V0c2lkZSB0aGUgdHJhcDsgYXQgdGhhdCBwb2ludCwgZm9jdXMtdHJhcFxuICAgICAgLy8gIHdpbGwgaW5pdGlhdGUgaXRzIGF1dG8tZGVhY3RpdmF0aW9uIHByb2Nlc3MsIHdoaWNoIHdpbGwgY2FsbCBvdXIgb3duXG4gICAgICAvLyAgaGFuZGxlRGVhY3RpdmF0ZSgpLCB3aGljaCB3aWxsIGNhbGwgaW50byB0aGlzIG1ldGhvZFxuICAgICAgaWYgKCF0aGlzLmZvY3VzVHJhcCB8fCAhdGhpcy5mb2N1c1RyYXAuYWN0aXZlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5mb2N1c1RyYXAuZGVhY3RpdmF0ZSh7XG4gICAgICAgIC8vIE5PVEU6IHdlIG5ldmVyIGxldCB0aGUgdHJhcCByZXR1cm4gdGhlIGZvY3VzIHNpbmNlIHdlIGRvIHRoYXQgb3Vyc2VsdmVzXG4gICAgICAgIHJldHVybkZvY3VzOiBmYWxzZSxcbiAgICAgICAgLy8gd2UnbGwgY2FsbCB0aGlzIGluIG91ciBvd24gcG9zdCBkZWFjdGl2YXRlIGhhbmRsZXIgc28gbWFrZSBzdXJlIHRoZSB0cmFwIGRvZXNuJ3RcbiAgICAgICAgLy8gIGRvIGl0IHByZW1hdHVyZWx5XG4gICAgICAgIGNoZWNrQ2FuUmV0dXJuRm9jdXM6IG51bGwsXG4gICAgICAgIC8vIGxldCBpdCBjYWxsIHRoZSB1c2VyJ3Mgb3JpZ2luYWwgZGVhY3RpdmF0ZSBoYW5kbGVyLCBpZiBhbnksIGluc3RlYWQgb2ZcbiAgICAgICAgLy8gIG91ciBvd24gd2hpY2ggY2FsbHMgYmFjayBpbnRvIHRoaXMgZnVuY3Rpb25cbiAgICAgICAgb25EZWFjdGl2YXRlOiB0aGlzLm9yaWdpbmFsT3B0aW9ucy5vbkRlYWN0aXZhdGUgLy8gTk9URTogZm9yIHBvc3QgZGVhY3RpdmF0ZSwgZG9uJ3Qgc3BlY2lmeSBhbnl0aGluZyBzbyB0aGF0IGl0IGNhbGxzIHRoZVxuICAgICAgICAvLyAgb25Qb3N0RGVhY3RpdmF0ZSBoYW5kbGVyIHNwZWNpZmllZCBvbiBgdGhpcy5pbnRlcm5hbE9wdGlvbnNgXG4gICAgICAgIC8vICB3aGljaCB3aWxsIGFsd2F5cyBiZSBvdXIgb3duIGBoYW5kbGVQb3N0RGVhY3RpdmF0ZSgpYCBoYW5kbGVyLCB3aGljaFxuICAgICAgICAvLyAgd2lsbCBmaW5pc2ggdGhpbmdzIG9mZiBieSBjYWxsaW5nIHRoZSB1c2VyJ3MgcHJvdmlkZWQgb25Qb3N0RGVhY3RpdmF0ZVxuICAgICAgICAvLyAgaGFuZGxlciwgaWYgYW55LCBhdCB0aGUgcmlnaHQgdGltZVxuICAgICAgICAvLyBvblBvc3REZWFjdGl2YXRlOiBOT1RISU5HXG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoYW5kbGVDbGlja091dHNpZGVEZWFjdGl2YXRlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVDbGlja091dHNpZGVEZWFjdGl2YXRlcyhldmVudCkge1xuICAgICAgLy8gdXNlIGNvbnN1bWVyJ3Mgb3B0aW9uIChvciBjYWxsIHRoZWlyIGhhbmRsZXIpIGFzIHRoZSBwZXJtaXNzaW9uIG9yIGRlbmlhbFxuICAgICAgdmFyIGFsbG93RGVhY3RpdmF0aW9uID0gdHlwZW9mIHRoaXMub3JpZ2luYWxPcHRpb25zLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzID09PSAnZnVuY3Rpb24nID8gdGhpcy5vcmlnaW5hbE9wdGlvbnMuY2xpY2tPdXRzaWRlRGVhY3RpdmF0ZXMuY2FsbChudWxsLCBldmVudCkgLy8gY2FsbCBvdXQgb2YgY29udGV4dFxuICAgICAgOiB0aGlzLm9yaWdpbmFsT3B0aW9ucy5jbGlja091dHNpZGVEZWFjdGl2YXRlczsgLy8gYm9vbGVhblxuXG4gICAgICBpZiAoYWxsb3dEZWFjdGl2YXRpb24pIHtcbiAgICAgICAgLy8gY2FwdHVyZSB0aGUgb3V0c2lkZSB0YXJnZXQgdGhhdCB3YXMgY2xpY2tlZCBzbyB3ZSBjYW4gdXNlIGl0IGluIHRoZSBkZWFjdGl2YXRpb25cbiAgICAgICAgLy8gIHByb2Nlc3Mgc2luY2UgdGhlIGNvbnN1bWVyIGFsbG93ZWQgaXQgdG8gY2F1c2UgYXV0by1kZWFjdGl2YXRpb25cbiAgICAgICAgdGhpcy5vdXRzaWRlQ2xpY2sgPSB7XG4gICAgICAgICAgdGFyZ2V0OiBldmVudC50YXJnZXQsXG4gICAgICAgICAgYWxsb3dEZWFjdGl2YXRpb246IGFsbG93RGVhY3RpdmF0aW9uXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhbGxvd0RlYWN0aXZhdGlvbjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaGFuZGxlRGVhY3RpdmF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVEZWFjdGl2YXRlKCkge1xuICAgICAgaWYgKHRoaXMub3JpZ2luYWxPcHRpb25zLm9uRGVhY3RpdmF0ZSkge1xuICAgICAgICB0aGlzLm9yaWdpbmFsT3B0aW9ucy5vbkRlYWN0aXZhdGUuY2FsbChudWxsKTsgLy8gY2FsbCB1c2VyJ3MgaGFuZGxlciBvdXQgb2YgY29udGV4dFxuICAgICAgfVxuXG4gICAgICB0aGlzLmRlYWN0aXZhdGVUcmFwKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhhbmRsZVBvc3REZWFjdGl2YXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVBvc3REZWFjdGl2YXRlKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBmaW5pc2hEZWFjdGl2YXRpb24gPSBmdW5jdGlvbiBmaW5pc2hEZWFjdGl2YXRpb24oKSB7XG4gICAgICAgIHZhciByZXR1cm5Gb2N1c05vZGUgPSBfdGhpczIuZ2V0UmV0dXJuRm9jdXNOb2RlKCk7XG5cbiAgICAgICAgdmFyIGNhblJldHVybkZvY3VzID0gISEoIC8vIGRpZCB0aGUgY29uc3VtZXIgYWxsb3cgaXQ/XG4gICAgICAgIF90aGlzMi5vcmlnaW5hbE9wdGlvbnMucmV0dXJuRm9jdXNPbkRlYWN0aXZhdGUgJiYgLy8gY2FuIHdlIGFjdHVhbGx5IGZvY3VzIHRoZSBub2RlP1xuICAgICAgICByZXR1cm5Gb2N1c05vZGUgIT09IG51bGwgJiYgcmV0dXJuRm9jdXNOb2RlICE9PSB2b2lkIDAgJiYgcmV0dXJuRm9jdXNOb2RlLmZvY3VzICYmICggLy8gd2FzIHRoZXJlIGFuIG91dHNpZGUgY2xpY2sgdGhhdCBhbGxvd2VkIGRlYWN0aXZhdGlvbj9cbiAgICAgICAgIV90aGlzMi5vdXRzaWRlQ2xpY2sgfHwgLy8gZGlkIHRoZSBjb25zdW1lciBhbGxvdyBkZWFjdGl2YXRpb24gd2hlbiB0aGUgb3V0c2lkZSBub2RlIHdhcyBjbGlja2VkP1xuICAgICAgICBfdGhpczIub3V0c2lkZUNsaWNrLmFsbG93RGVhY3RpdmF0aW9uICYmIC8vIGlzIHRoZSBvdXRzaWRlIG5vZGUgTk9UIGZvY3VzYWJsZSAoaW1wbHlpbmcgdGhhdCBpdCBkaWQgTk9UIHJlY2VpdmUgZm9jdXNcbiAgICAgICAgLy8gIGFzIGEgcmVzdWx0IG9mIHRoZSBjbGljay10aHJvdWdoKSAtLSBpbiB3aGljaCBjYXNlIGRvIE5PVCByZXN0b3JlIGZvY3VzXG4gICAgICAgIC8vICB0byBgcmV0dXJuRm9jdXNOb2RlYCBiZWNhdXNlIGZvY3VzIHNob3VsZCByZW1haW4gb24gdGhlIG91dHNpZGUgbm9kZVxuICAgICAgICAhaXNGb2N1c2FibGUoX3RoaXMyLm91dHNpZGVDbGljay50YXJnZXQsIF90aGlzMi5pbnRlcm5hbE9wdGlvbnMudGFiYmFibGVPcHRpb25zKSkgLy8gaWYgbm8sIHRoZSByZXN0b3JlIGZvY3VzIHRvIGByZXR1cm5Gb2N1c05vZGVgIGF0IHRoaXMgcG9pbnRcbiAgICAgICAgKTtcbiAgICAgICAgdmFyIF90aGlzMiRpbnRlcm5hbE9wdGlvbiA9IF90aGlzMi5pbnRlcm5hbE9wdGlvbnMucHJldmVudFNjcm9sbCxcbiAgICAgICAgICAgIHByZXZlbnRTY3JvbGwgPSBfdGhpczIkaW50ZXJuYWxPcHRpb24gPT09IHZvaWQgMCA/IGZhbHNlIDogX3RoaXMyJGludGVybmFsT3B0aW9uO1xuXG4gICAgICAgIGlmIChjYW5SZXR1cm5Gb2N1cykge1xuICAgICAgICAgIC8vIHJldHVybiBmb2N1cyB0byB0aGUgZWxlbWVudCB0aGF0IGhhZCBmb2N1cyB3aGVuIHRoZSB0cmFwIHdhcyBhY3RpdmF0ZWRcbiAgICAgICAgICByZXR1cm5Gb2N1c05vZGUuZm9jdXMoe1xuICAgICAgICAgICAgcHJldmVudFNjcm9sbDogcHJldmVudFNjcm9sbFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF90aGlzMi5vcmlnaW5hbE9wdGlvbnMub25Qb3N0RGVhY3RpdmF0ZSkge1xuICAgICAgICAgIF90aGlzMi5vcmlnaW5hbE9wdGlvbnMub25Qb3N0RGVhY3RpdmF0ZS5jYWxsKG51bGwpOyAvLyBkb24ndCBjYWxsIGl0IGluIGNvbnRleHQgb2YgXCJ0aGlzXCJcblxuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLm91dHNpZGVDbGljayA9IG51bGw7IC8vIHJlc2V0OiBubyBsb25nZXIgbmVlZGVkXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5vcmlnaW5hbE9wdGlvbnMuY2hlY2tDYW5SZXR1cm5Gb2N1cykge1xuICAgICAgICB0aGlzLm9yaWdpbmFsT3B0aW9ucy5jaGVja0NhblJldHVybkZvY3VzLmNhbGwobnVsbCwgdGhpcy5nZXRSZXR1cm5Gb2N1c05vZGUoKSkgLy8gY2FsbCBvdXQgb2YgY29udGV4dFxuICAgICAgICAudGhlbihmaW5pc2hEZWFjdGl2YXRpb24sIGZpbmlzaERlYWN0aXZhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaW5pc2hEZWFjdGl2YXRpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0dXBGb2N1c1RyYXBcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0dXBGb2N1c1RyYXAoKSB7XG4gICAgICBpZiAodGhpcy5mb2N1c1RyYXApIHtcbiAgICAgICAgLy8gdHJhcCBhbHJlYWR5IGV4aXN0czogaXQncyBwb3NzaWJsZSB3ZSdyZSBpbiBTdHJpY3RNb2RlIGFuZCB3ZSdyZSBiZWluZyByZW1vdW50ZWQsXG4gICAgICAgIC8vICBpbiB3aGljaCBjYXNlLCB3ZSB3aWxsIGhhdmUgZGVhY3RpdmF0ZWQgdGhlIHRyYXAgd2hlbiB3ZSBnb3QgdW5tb3VudGVkIChyZW1lbWJlcixcbiAgICAgICAgLy8gIFN0cmljdE1vZGUsIGluIGRldmVsb3BtZW50LCBwdXJwb3NlbHkgdW5tb3VudHMgYW5kIHJlbW91bnRzIGNvbXBvbmVudHMgYWZ0ZXJcbiAgICAgICAgLy8gIG1vdW50aW5nIHRoZW0gdGhlIGZpcnN0IHRpbWUgdG8gbWFrZSBzdXJlIHRoZXkgaGF2ZSByZXVzYWJsZSBzdGF0ZSxcbiAgICAgICAgLy8gIEBzZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3N0cmljdC1tb2RlLmh0bWwjZW5zdXJpbmctcmV1c2FibGUtc3RhdGUpIHNvIG5vd1xuICAgICAgICAvLyAgd2UgbmVlZCB0byByZXN0b3JlIHRoZSBzdGF0ZSBvZiB0aGUgdHJhcCBhY2NvcmRpbmcgdG8gb3VyIGNvbXBvbmVudCBzdGF0ZVxuICAgICAgICAvLyBOT1RFOiBTdHJpY3QgbW9kZSBfX3Zpb2xhdGVzX18gYXNzdW1wdGlvbnMgYWJvdXQgdGhlIGBjb21wb25lbnRXaWxsVW5tb3VudCgpYCBBUElcbiAgICAgICAgLy8gIHdoaWNoIGNsZWFybHkgc3RhdGVzIC0tIGV2ZW4gZm9yIFJlYWN0IDE4IC0tIHRoYXQsIFwiT25jZSBhIGNvbXBvbmVudCBpbnN0YW5jZSBpc1xuICAgICAgICAvLyAgdW5tb3VudGVkLCBfX2l0IHdpbGwgbmV2ZXIgYmUgbW91bnRlZCBhZ2Fpbi5fX1wiIChlbXBoYXNpcyBvdXJzKS4gU28gd2hlbiB3ZSBnZXRcbiAgICAgICAgLy8gIHVubW91bnRlZCwgd2UgYXNzdW1lIHdlJ3JlIGdvbmUgZm9yZXZlciBhbmQgd2UgZGVhY3RpdmF0ZSB0aGUgdHJhcC4gQnV0IHRoZW5cbiAgICAgICAgLy8gIHdlIGdldCByZW1vdW50ZWQgYW5kIHdlJ3JlIHN1cHBvc2VkIHRvIHJlc3RvcmUgc3RhdGUuIEJ1dCBpZiB5b3UgaGFkIHBhdXNlZCxcbiAgICAgICAgLy8gIHdlJ3ZlIG5vdyBkZWFjdGl2YXRlZCAod2UgZG9uJ3Qga25vdyB3ZSdyZSBhbW91bnQgdG8gZ2V0IHJlbW91bnRlZCBhZ2FpbilcbiAgICAgICAgLy8gIHdoaWNoIG1lYW5zIHdlIG5lZWQgdG8gcmVhY3RpdmF0ZSBhbmQgdGhlbiBwYXVzZS4gT3RoZXJ3aXNlLCBkbyBub3RoaW5nLlxuICAgICAgICBpZiAodGhpcy5wcm9wcy5hY3RpdmUgJiYgIXRoaXMuZm9jdXNUcmFwLmFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuZm9jdXNUcmFwLmFjdGl2YXRlKCk7XG5cbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5wYXVzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUcmFwLnBhdXNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbm9kZXNFeGlzdCA9IHRoaXMuZm9jdXNUcmFwRWxlbWVudHMuc29tZShCb29sZWFuKTtcblxuICAgICAgICBpZiAobm9kZXNFeGlzdCkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9wcm9wLXR5cGVzIC0tIF9jcmVhdGVGb2N1c1RyYXAgaXMgYW4gaW50ZXJuYWwgcHJvcFxuICAgICAgICAgIHRoaXMuZm9jdXNUcmFwID0gdGhpcy5wcm9wcy5fY3JlYXRlRm9jdXNUcmFwKHRoaXMuZm9jdXNUcmFwRWxlbWVudHMsIHRoaXMuaW50ZXJuYWxPcHRpb25zKTtcblxuICAgICAgICAgIGlmICh0aGlzLnByb3BzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c1RyYXAuYWN0aXZhdGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5wYXVzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUcmFwLnBhdXNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbXBvbmVudERpZE1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuYWN0aXZlKSB7XG4gICAgICAgIHRoaXMuc2V0dXBGb2N1c1RyYXAoKTtcbiAgICAgIH0gLy8gZWxzZSwgd2FpdCBmb3IgbGF0ZXIgYWN0aXZhdGlvbiBpbiBjYXNlIHRoZSBgZm9jdXNUcmFwT3B0aW9uc2Agd2lsbCBiZSB1cGRhdGVkXG4gICAgICAvLyAgYWdhaW4gYmVmb3JlIHRoZSB0cmFwIGlzIGFjdGl2YXRlZCAoZS5nLiBpZiB3YWl0aW5nIHRvIGtub3cgd2hhdCB0aGUgZG9jdW1lbnRcbiAgICAgIC8vICBvYmplY3Qgd2lsbCBiZSwgc28gdGhlIFRyYXAgbXVzdCBiZSByZW5kZXJlZCwgYnV0IHRoZSBjb25zdW1lciBpcyB3YWl0aW5nIHRvXG4gICAgICAvLyAgYWN0aXZhdGUgdW50aWwgdGhleSBoYXZlIG9idGFpbmVkIHRoZSBkb2N1bWVudCBmcm9tIGEgcmVmKVxuICAgICAgLy8gIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZvY3VzLXRyYXAvZm9jdXMtdHJhcC1yZWFjdC9pc3N1ZXMvNTM5XG5cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50RGlkVXBkYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICAgIGlmICh0aGlzLmZvY3VzVHJhcCkge1xuICAgICAgICBpZiAocHJldlByb3BzLmNvbnRhaW5lckVsZW1lbnRzICE9PSB0aGlzLnByb3BzLmNvbnRhaW5lckVsZW1lbnRzKSB7XG4gICAgICAgICAgdGhpcy5mb2N1c1RyYXAudXBkYXRlQ29udGFpbmVyRWxlbWVudHModGhpcy5wcm9wcy5jb250YWluZXJFbGVtZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFzQWN0aXZhdGVkID0gIXByZXZQcm9wcy5hY3RpdmUgJiYgdGhpcy5wcm9wcy5hY3RpdmU7XG4gICAgICAgIHZhciBoYXNEZWFjdGl2YXRlZCA9IHByZXZQcm9wcy5hY3RpdmUgJiYgIXRoaXMucHJvcHMuYWN0aXZlO1xuICAgICAgICB2YXIgaGFzUGF1c2VkID0gIXByZXZQcm9wcy5wYXVzZWQgJiYgdGhpcy5wcm9wcy5wYXVzZWQ7XG4gICAgICAgIHZhciBoYXNVbnBhdXNlZCA9IHByZXZQcm9wcy5wYXVzZWQgJiYgIXRoaXMucHJvcHMucGF1c2VkO1xuXG4gICAgICAgIGlmIChoYXNBY3RpdmF0ZWQpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVByZXZpb3VzRWxlbWVudCgpO1xuICAgICAgICAgIHRoaXMuZm9jdXNUcmFwLmFjdGl2YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzRGVhY3RpdmF0ZWQpIHtcbiAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVUcmFwKCk7XG4gICAgICAgICAgcmV0dXJuOyAvLyB1bi9wYXVzZSBkb2VzIG5vdGhpbmcgb24gYW4gaW5hY3RpdmUgdHJhcFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc1BhdXNlZCkge1xuICAgICAgICAgIHRoaXMuZm9jdXNUcmFwLnBhdXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzVW5wYXVzZWQpIHtcbiAgICAgICAgICB0aGlzLmZvY3VzVHJhcC51bnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5PVEU6IGlmIHdlJ3JlIGluIGBjb21wb25lbnREaWRVcGRhdGVgIGFuZCB3ZSBkb24ndCBoYXZlIGEgdHJhcCB5ZXQsXG4gICAgICAgIC8vICBpdCBlaXRoZXIgbWVhbnMgaXQgc2hvdWxkbid0IGJlIGFjdGl2ZSwgb3IgaXQgc2hvdWxkIGJlIGJ1dCBub25lIG9mXG4gICAgICAgIC8vICBvZiBnaXZlbiBgY29udGFpbmVyRWxlbWVudHNgIHdlcmUgcHJlc2VudCBpbiB0aGUgRE9NIHRoZSBsYXN0IHRpbWVcbiAgICAgICAgLy8gIHdlIHRyaWVkIHRvIGNyZWF0ZSB0aGUgdHJhcFxuICAgICAgICBpZiAocHJldlByb3BzLmNvbnRhaW5lckVsZW1lbnRzICE9PSB0aGlzLnByb3BzLmNvbnRhaW5lckVsZW1lbnRzKSB7XG4gICAgICAgICAgdGhpcy5mb2N1c1RyYXBFbGVtZW50cyA9IHRoaXMucHJvcHMuY29udGFpbmVyRWxlbWVudHM7XG4gICAgICAgIH0gLy8gZG9uJ3QgY3JlYXRlIHRoZSB0cmFwIHVubGVzcyBpdCBzaG91bGQgYmUgYWN0aXZlIGluIGNhc2UgdGhlIGNvbnN1bWVyXG4gICAgICAgIC8vICBpcyBzdGlsbCB1cGRhdGluZyBgZm9jdXNUcmFwT3B0aW9uc2BcbiAgICAgICAgLy8gIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZvY3VzLXRyYXAvZm9jdXMtdHJhcC1yZWFjdC9pc3N1ZXMvNTM5XG5cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5hY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVByZXZpb3VzRWxlbWVudCgpO1xuICAgICAgICAgIHRoaXMuc2V0dXBGb2N1c1RyYXAoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsVW5tb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZVRyYXAoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB2YXIgY2hpbGQgPSB0aGlzLnByb3BzLmNoaWxkcmVuID8gUmVhY3QuQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlICYmIGNoaWxkLnR5cGUgPT09IFJlYWN0LkZyYWdtZW50KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIGZvY3VzLXRyYXAgY2Fubm90IHVzZSBhIEZyYWdtZW50IGFzIGl0cyBjaGlsZCBjb250YWluZXIuIFRyeSByZXBsYWNpbmcgaXQgd2l0aCBhIDxkaXY+IGVsZW1lbnQuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2FsbGJhY2tSZWYgPSBmdW5jdGlvbiBjYWxsYmFja1JlZihlbGVtZW50KSB7XG4gICAgICAgICAgdmFyIGNvbnRhaW5lckVsZW1lbnRzID0gX3RoaXMzLnByb3BzLmNvbnRhaW5lckVsZW1lbnRzO1xuXG4gICAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoaWxkLnJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBjaGlsZC5yZWYoZWxlbWVudCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoaWxkLnJlZikge1xuICAgICAgICAgICAgICBjaGlsZC5yZWYuY3VycmVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXMzLmZvY3VzVHJhcEVsZW1lbnRzID0gY29udGFpbmVyRWxlbWVudHMgPyBjb250YWluZXJFbGVtZW50cyA6IFtlbGVtZW50XTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgY2hpbGRXaXRoUmVmID0gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgcmVmOiBjYWxsYmFja1JlZlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNoaWxkV2l0aFJlZjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEZvY3VzVHJhcDtcbn0oUmVhY3QuQ29tcG9uZW50KTsgLy8gc3VwcG9ydCBzZXJ2ZXItc2lkZSByZW5kZXJpbmcgd2hlcmUgYEVsZW1lbnRgIHdpbGwgbm90IGJlIGRlZmluZWRcblxuXG52YXIgRWxlbWVudFR5cGUgPSB0eXBlb2YgRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgPyBGdW5jdGlvbiA6IEVsZW1lbnQ7XG5Gb2N1c1RyYXAucHJvcFR5cGVzID0ge1xuICBhY3RpdmU6IFByb3BUeXBlcy5ib29sLFxuICBwYXVzZWQ6IFByb3BUeXBlcy5ib29sLFxuICBmb2N1c1RyYXBPcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGRvY3VtZW50OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uQWN0aXZhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uUG9zdEFjdGl2YXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjaGVja0NhbkZvY3VzVHJhcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25EZWFjdGl2YXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblBvc3REZWFjdGl2YXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjaGVja0NhblJldHVybkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBpbml0aWFsRm9jdXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5pbnN0YW5jZU9mKEVsZW1lbnRUeXBlKSwgUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgZmFsbGJhY2tGb2N1czogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmluc3RhbmNlT2YoRWxlbWVudFR5cGUpLCBQcm9wVHlwZXMuc3RyaW5nLCAvLyBOT1RFOiBkb2VzIG5vdCBzdXBwb3J0IGBmYWxzZWAgYXMgdmFsdWUgKG9yIHJldHVybiB2YWx1ZSBmcm9tIGZ1bmN0aW9uKVxuICAgIFByb3BUeXBlcy5mdW5jXSksXG4gICAgZXNjYXBlRGVhY3RpdmF0ZXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIGNsaWNrT3V0c2lkZURlYWN0aXZhdGVzOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICByZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2V0UmV0dXJuRm9jdXM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5pbnN0YW5jZU9mKEVsZW1lbnRUeXBlKSwgUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgYWxsb3dPdXRzaWRlQ2xpY2s6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5ib29sLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgIHByZXZlbnRTY3JvbGw6IFByb3BUeXBlcy5ib29sLFxuICAgIHRhYmJhYmxlT3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGRpc3BsYXlDaGVjazogUHJvcFR5cGVzLm9uZU9mKFsnZnVsbCcsICdsZWdhY3ktZnVsbCcsICdub24temVyby1hcmVhJywgJ25vbmUnXSksXG4gICAgICBnZXRTaGFkb3dSb290OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYm9vbCwgUHJvcFR5cGVzLmZ1bmNdKVxuICAgIH0pXG4gIH0pLFxuICBjb250YWluZXJFbGVtZW50czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmluc3RhbmNlT2YoRWxlbWVudFR5cGUpKSxcbiAgLy8gRE9NIGVsZW1lbnQgT05MWVxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIC8vIFJlYWN0IGVsZW1lbnRcbiAgUHJvcFR5cGVzLmluc3RhbmNlT2YoRWxlbWVudFR5cGUpIC8vIERPTSBlbGVtZW50XG4gIF0pIC8vIE5PVEU6IF9jcmVhdGVGb2N1c1RyYXAgaXMgaW50ZXJuYWwsIGZvciB0ZXN0aW5nIHB1cnBvc2VzIG9ubHksIHNvIHdlIGRvbid0XG4gIC8vICBzcGVjaWZ5IGl0IGhlcmUuIEl0J3MgZXhwZWN0ZWQgdG8gYmUgc2V0IHRvIHRoZSBmdW5jdGlvbiByZXR1cm5lZCBmcm9tXG4gIC8vICByZXF1aXJlKCdmb2N1cy10cmFwJyksIG9yIG9uZSB3aXRoIGEgY29tcGF0aWJsZSBpbnRlcmZhY2UuXG5cbn07XG5Gb2N1c1RyYXAuZGVmYXVsdFByb3BzID0ge1xuICBhY3RpdmU6IHRydWUsXG4gIHBhdXNlZDogZmFsc2UsXG4gIGZvY3VzVHJhcE9wdGlvbnM6IHt9LFxuICBfY3JlYXRlRm9jdXNUcmFwOiBjcmVhdGVGb2N1c1RyYXBcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEZvY3VzVHJhcDtcbn0pLmNhbGwodGhpcyl9KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wiZm9jdXMtdHJhcFwiOjIsXCJ0YWJiYWJsZVwiOjV9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qIVxuKiBmb2N1cy10cmFwIDcuMC4wXG4qIEBsaWNlbnNlIE1JVCwgaHR0cHM6Ly9naXRodWIuY29tL2ZvY3VzLXRyYXAvZm9jdXMtdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFXG4qL1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG52YXIgdGFiYmFibGUgPSByZXF1aXJlKCd0YWJiYWJsZScpO1xuXG5mdW5jdGlvbiBvd25LZXlzKG9iamVjdCwgZW51bWVyYWJsZU9ubHkpIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7XG4gICAgZW51bWVyYWJsZU9ubHkgJiYgKHN5bWJvbHMgPSBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTtcbiAgICB9KSksIGtleXMucHVzaC5hcHBseShrZXlzLCBzeW1ib2xzKTtcbiAgfVxuXG4gIHJldHVybiBrZXlzO1xufVxuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gbnVsbCAhPSBhcmd1bWVudHNbaV0gPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICBpICUgMiA/IG93bktleXMoT2JqZWN0KHNvdXJjZSksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIF9kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgIH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpIDogb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG52YXIgYWN0aXZlRm9jdXNUcmFwcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRyYXBRdWV1ZSA9IFtdO1xuICByZXR1cm4ge1xuICAgIGFjdGl2YXRlVHJhcDogZnVuY3Rpb24gYWN0aXZhdGVUcmFwKHRyYXApIHtcbiAgICAgIGlmICh0cmFwUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgYWN0aXZlVHJhcCA9IHRyYXBRdWV1ZVt0cmFwUXVldWUubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgaWYgKGFjdGl2ZVRyYXAgIT09IHRyYXApIHtcbiAgICAgICAgICBhY3RpdmVUcmFwLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHRyYXBJbmRleCA9IHRyYXBRdWV1ZS5pbmRleE9mKHRyYXApO1xuXG4gICAgICBpZiAodHJhcEluZGV4ID09PSAtMSkge1xuICAgICAgICB0cmFwUXVldWUucHVzaCh0cmFwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG1vdmUgdGhpcyBleGlzdGluZyB0cmFwIHRvIHRoZSBmcm9udCBvZiB0aGUgcXVldWVcbiAgICAgICAgdHJhcFF1ZXVlLnNwbGljZSh0cmFwSW5kZXgsIDEpO1xuICAgICAgICB0cmFwUXVldWUucHVzaCh0cmFwKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlYWN0aXZhdGVUcmFwOiBmdW5jdGlvbiBkZWFjdGl2YXRlVHJhcCh0cmFwKSB7XG4gICAgICB2YXIgdHJhcEluZGV4ID0gdHJhcFF1ZXVlLmluZGV4T2YodHJhcCk7XG5cbiAgICAgIGlmICh0cmFwSW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRyYXBRdWV1ZS5zcGxpY2UodHJhcEluZGV4LCAxKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRyYXBRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRyYXBRdWV1ZVt0cmFwUXVldWUubGVuZ3RoIC0gMV0udW5wYXVzZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn0oKTtcblxudmFyIGlzU2VsZWN0YWJsZUlucHV0ID0gZnVuY3Rpb24gaXNTZWxlY3RhYmxlSW5wdXQobm9kZSkge1xuICByZXR1cm4gbm9kZS50YWdOYW1lICYmIG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnICYmIHR5cGVvZiBub2RlLnNlbGVjdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbnZhciBpc0VzY2FwZUV2ZW50ID0gZnVuY3Rpb24gaXNFc2NhcGVFdmVudChlKSB7XG4gIHJldHVybiBlLmtleSA9PT0gJ0VzY2FwZScgfHwgZS5rZXkgPT09ICdFc2MnIHx8IGUua2V5Q29kZSA9PT0gMjc7XG59O1xuXG52YXIgaXNUYWJFdmVudCA9IGZ1bmN0aW9uIGlzVGFiRXZlbnQoZSkge1xuICByZXR1cm4gZS5rZXkgPT09ICdUYWInIHx8IGUua2V5Q29kZSA9PT0gOTtcbn07XG5cbnZhciBkZWxheSA9IGZ1bmN0aW9uIGRlbGF5KGZuKSB7XG4gIHJldHVybiBzZXRUaW1lb3V0KGZuLCAwKTtcbn07IC8vIEFycmF5LmZpbmQvZmluZEluZGV4KCkgYXJlIG5vdCBzdXBwb3J0ZWQgb24gSUU7IHRoaXMgcmVwbGljYXRlcyBlbm91Z2hcbi8vICBvZiBBcnJheS5maW5kSW5kZXgoKSBmb3Igb3VyIG5lZWRzXG5cblxudmFyIGZpbmRJbmRleCA9IGZ1bmN0aW9uIGZpbmRJbmRleChhcnIsIGZuKSB7XG4gIHZhciBpZHggPSAtMTtcbiAgYXJyLmV2ZXJ5KGZ1bmN0aW9uICh2YWx1ZSwgaSkge1xuICAgIGlmIChmbih2YWx1ZSkpIHtcbiAgICAgIGlkeCA9IGk7XG4gICAgICByZXR1cm4gZmFsc2U7IC8vIGJyZWFrXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7IC8vIG5leHRcbiAgfSk7XG4gIHJldHVybiBpZHg7XG59O1xuLyoqXG4gKiBHZXQgYW4gb3B0aW9uJ3MgdmFsdWUgd2hlbiBpdCBjb3VsZCBiZSBhIHBsYWluIHZhbHVlLCBvciBhIGhhbmRsZXIgdGhhdCBwcm92aWRlc1xuICogIHRoZSB2YWx1ZS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgT3B0aW9uJ3MgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0gey4uLip9IFtwYXJhbXNdIEFueSBwYXJhbWV0ZXJzIHRvIHBhc3MgdG8gdGhlIGhhbmRsZXIsIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHsqfSBUaGUgYHZhbHVlYCwgb3IgdGhlIGhhbmRsZXIncyByZXR1cm5lZCB2YWx1ZS5cbiAqL1xuXG5cbnZhciB2YWx1ZU9ySGFuZGxlciA9IGZ1bmN0aW9uIHZhbHVlT3JIYW5kbGVyKHZhbHVlKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBwYXJhbXMgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIHBhcmFtc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nID8gdmFsdWUuYXBwbHkodm9pZCAwLCBwYXJhbXMpIDogdmFsdWU7XG59O1xuXG52YXIgZ2V0QWN0dWFsVGFyZ2V0ID0gZnVuY3Rpb24gZ2V0QWN0dWFsVGFyZ2V0KGV2ZW50KSB7XG4gIC8vIE5PVEU6IElmIHRoZSB0cmFwIGlzIF9pbnNpZGVfIGEgc2hhZG93IERPTSwgZXZlbnQudGFyZ2V0IHdpbGwgYWx3YXlzIGJlIHRoZVxuICAvLyAgc2hhZG93IGhvc3QuIEhvd2V2ZXIsIGV2ZW50LnRhcmdldC5jb21wb3NlZFBhdGgoKSB3aWxsIGJlIGFuIGFycmF5IG9mXG4gIC8vICBub2RlcyBcImNsaWNrZWRcIiBmcm9tIGlubmVyLW1vc3QgKHRoZSBhY3R1YWwgZWxlbWVudCBpbnNpZGUgdGhlIHNoYWRvdykgdG9cbiAgLy8gIG91dGVyLW1vc3QgKHRoZSBob3N0IEhUTUwgZG9jdW1lbnQpLiBJZiB3ZSBoYXZlIGFjY2VzcyB0byBjb21wb3NlZFBhdGgoKSxcbiAgLy8gIHRoZW4gdXNlIGl0cyBmaXJzdCBlbGVtZW50OyBvdGhlcndpc2UsIGZhbGwgYmFjayB0byBldmVudC50YXJnZXQgKGFuZFxuICAvLyAgdGhpcyBvbmx5IHdvcmtzIGZvciBhbiBfb3Blbl8gc2hhZG93IERPTTsgb3RoZXJ3aXNlLFxuICAvLyAgY29tcG9zZWRQYXRoKClbMF0gPT09IGV2ZW50LnRhcmdldCBhbHdheXMpLlxuICByZXR1cm4gZXZlbnQudGFyZ2V0LnNoYWRvd1Jvb3QgJiYgdHlwZW9mIGV2ZW50LmNvbXBvc2VkUGF0aCA9PT0gJ2Z1bmN0aW9uJyA/IGV2ZW50LmNvbXBvc2VkUGF0aCgpWzBdIDogZXZlbnQudGFyZ2V0O1xufTtcblxudmFyIGNyZWF0ZUZvY3VzVHJhcCA9IGZ1bmN0aW9uIGNyZWF0ZUZvY3VzVHJhcChlbGVtZW50cywgdXNlck9wdGlvbnMpIHtcbiAgLy8gU1NSOiBhIGxpdmUgdHJhcCBzaG91bGRuJ3QgYmUgY3JlYXRlZCBpbiB0aGlzIHR5cGUgb2YgZW52aXJvbm1lbnQgc28gdGhpc1xuICAvLyAgc2hvdWxkIGJlIHNhZmUgY29kZSB0byBleGVjdXRlIGlmIHRoZSBgZG9jdW1lbnRgIG9wdGlvbiBpc24ndCBzcGVjaWZpZWRcbiAgdmFyIGRvYyA9ICh1c2VyT3B0aW9ucyA9PT0gbnVsbCB8fCB1c2VyT3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlck9wdGlvbnMuZG9jdW1lbnQpIHx8IGRvY3VtZW50O1xuXG4gIHZhciBjb25maWcgPSBfb2JqZWN0U3ByZWFkMih7XG4gICAgcmV0dXJuRm9jdXNPbkRlYWN0aXZhdGU6IHRydWUsXG4gICAgZXNjYXBlRGVhY3RpdmF0ZXM6IHRydWUsXG4gICAgZGVsYXlJbml0aWFsRm9jdXM6IHRydWVcbiAgfSwgdXNlck9wdGlvbnMpO1xuXG4gIHZhciBzdGF0ZSA9IHtcbiAgICAvLyBjb250YWluZXJzIGdpdmVuIHRvIGNyZWF0ZUZvY3VzVHJhcCgpXG4gICAgLy8gQHR5cGUge0FycmF5PEhUTUxFbGVtZW50Pn1cbiAgICBjb250YWluZXJzOiBbXSxcbiAgICAvLyBsaXN0IG9mIG9iamVjdHMgaWRlbnRpZnlpbmcgdGFiYmFibGUgbm9kZXMgaW4gYGNvbnRhaW5lcnNgIGluIHRoZSB0cmFwXG4gICAgLy8gTk9URTogaXQncyBwb3NzaWJsZSB0aGF0IGEgZ3JvdXAgaGFzIG5vIHRhYmJhYmxlIG5vZGVzIGlmIG5vZGVzIGdldCByZW1vdmVkIHdoaWxlIHRoZSB0cmFwXG4gICAgLy8gIGlzIGFjdGl2ZSwgYnV0IHRoZSB0cmFwIHNob3VsZCBuZXZlciBnZXQgdG8gYSBzdGF0ZSB3aGVyZSB0aGVyZSBpc24ndCBhdCBsZWFzdCBvbmUgZ3JvdXBcbiAgICAvLyAgd2l0aCBhdCBsZWFzdCBvbmUgdGFiYmFibGUgbm9kZSBpbiBpdCAodGhhdCB3b3VsZCBsZWFkIHRvIGFuIGVycm9yIGNvbmRpdGlvbiB0aGF0IHdvdWxkXG4gICAgLy8gIHJlc3VsdCBpbiBhbiBlcnJvciBiZWluZyB0aHJvd24pXG4gICAgLy8gQHR5cGUge0FycmF5PHtcbiAgICAvLyAgIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgLy8gICB0YWJiYWJsZU5vZGVzOiBBcnJheTxIVE1MRWxlbWVudD4sIC8vIGVtcHR5IGlmIG5vbmVcbiAgICAvLyAgIGZvY3VzYWJsZU5vZGVzOiBBcnJheTxIVE1MRWxlbWVudD4sIC8vIGVtcHR5IGlmIG5vbmVcbiAgICAvLyAgIGZpcnN0VGFiYmFibGVOb2RlOiBIVE1MRWxlbWVudHxudWxsLFxuICAgIC8vICAgbGFzdFRhYmJhYmxlTm9kZTogSFRNTEVsZW1lbnR8bnVsbCxcbiAgICAvLyAgIG5leHRUYWJiYWJsZU5vZGU6IChub2RlOiBIVE1MRWxlbWVudCwgZm9yd2FyZDogYm9vbGVhbikgPT4gSFRNTEVsZW1lbnR8dW5kZWZpbmVkXG4gICAgLy8gfT59XG4gICAgY29udGFpbmVyR3JvdXBzOiBbXSxcbiAgICAvLyBzYW1lIG9yZGVyL2xlbmd0aCBhcyBgY29udGFpbmVyc2AgbGlzdFxuICAgIC8vIHJlZmVyZW5jZXMgdG8gb2JqZWN0cyBpbiBgY29udGFpbmVyR3JvdXBzYCwgYnV0IG9ubHkgdGhvc2UgdGhhdCBhY3R1YWxseSBoYXZlXG4gICAgLy8gIHRhYmJhYmxlIG5vZGVzIGluIHRoZW1cbiAgICAvLyBOT1RFOiBzYW1lIG9yZGVyIGFzIGBjb250YWluZXJzYCBhbmQgYGNvbnRhaW5lckdyb3Vwc2AsIGJ1dCBfX25vdCBuZWNlc3NhcmlseV9fXG4gICAgLy8gIHRoZSBzYW1lIGxlbmd0aFxuICAgIHRhYmJhYmxlR3JvdXBzOiBbXSxcbiAgICBub2RlRm9jdXNlZEJlZm9yZUFjdGl2YXRpb246IG51bGwsXG4gICAgbW9zdFJlY2VudGx5Rm9jdXNlZE5vZGU6IG51bGwsXG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBwYXVzZWQ6IGZhbHNlLFxuICAgIC8vIHRpbWVyIElEIGZvciB3aGVuIGRlbGF5SW5pdGlhbEZvY3VzIGlzIHRydWUgYW5kIGluaXRpYWwgZm9jdXMgaW4gdGhpcyB0cmFwXG4gICAgLy8gIGhhcyBiZWVuIGRlbGF5ZWQgZHVyaW5nIGFjdGl2YXRpb25cbiAgICBkZWxheUluaXRpYWxGb2N1c1RpbWVyOiB1bmRlZmluZWRcbiAgfTtcbiAgdmFyIHRyYXA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLWNvbnN0IC0tIHNvbWUgcHJpdmF0ZSBmdW5jdGlvbnMgcmVmZXJlbmNlIGl0LCBhbmQgaXRzIG1ldGhvZHMgcmVmZXJlbmNlIHByaXZhdGUgZnVuY3Rpb25zLCBzbyB3ZSBtdXN0IGRlY2xhcmUgaGVyZSBhbmQgZGVmaW5lIGxhdGVyXG5cbiAgLyoqXG4gICAqIEdldHMgYSBjb25maWd1cmF0aW9uIG9wdGlvbiB2YWx1ZS5cbiAgICogQHBhcmFtIHtPYmplY3R8dW5kZWZpbmVkfSBjb25maWdPdmVycmlkZU9wdGlvbnMgSWYgdHJ1ZSwgYW5kIG9wdGlvbiBpcyBkZWZpbmVkIGluIHRoaXMgc2V0LFxuICAgKiAgdmFsdWUgd2lsbCBiZSB0YWtlbiBmcm9tIHRoaXMgb2JqZWN0LiBPdGhlcndpc2UsIHZhbHVlIHdpbGwgYmUgdGFrZW4gZnJvbSBiYXNlIGNvbmZpZ3VyYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25OYW1lIE5hbWUgb2YgdGhlIG9wdGlvbiB3aG9zZSB2YWx1ZSBpcyBzb3VnaHQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfHVuZGVmaW5lZH0gW2NvbmZpZ09wdGlvbk5hbWVdIE5hbWUgb2Ygb3B0aW9uIHRvIHVzZSBfX2luc3RlYWQgb2ZfXyBgb3B0aW9uTmFtZWBcbiAgICogIElJRiBgY29uZmlnT3ZlcnJpZGVPcHRpb25zYCBpcyBub3QgZGVmaW5lZC4gT3RoZXJ3aXNlLCBgb3B0aW9uTmFtZWAgaXMgdXNlZC5cbiAgICovXG5cbiAgdmFyIGdldE9wdGlvbiA9IGZ1bmN0aW9uIGdldE9wdGlvbihjb25maWdPdmVycmlkZU9wdGlvbnMsIG9wdGlvbk5hbWUsIGNvbmZpZ09wdGlvbk5hbWUpIHtcbiAgICByZXR1cm4gY29uZmlnT3ZlcnJpZGVPcHRpb25zICYmIGNvbmZpZ092ZXJyaWRlT3B0aW9uc1tvcHRpb25OYW1lXSAhPT0gdW5kZWZpbmVkID8gY29uZmlnT3ZlcnJpZGVPcHRpb25zW29wdGlvbk5hbWVdIDogY29uZmlnW2NvbmZpZ09wdGlvbk5hbWUgfHwgb3B0aW9uTmFtZV07XG4gIH07XG4gIC8qKlxuICAgKiBGaW5kcyB0aGUgaW5kZXggb2YgdGhlIGNvbnRhaW5lciB0aGF0IGNvbnRhaW5zIHRoZSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IEluZGV4IG9mIHRoZSBjb250YWluZXIgaW4gZWl0aGVyIGBzdGF0ZS5jb250YWluZXJzYCBvclxuICAgKiAgYHN0YXRlLmNvbnRhaW5lckdyb3Vwc2AgKHRoZSBvcmRlci9sZW5ndGggb2YgdGhlc2UgbGlzdHMgYXJlIHRoZSBzYW1lKTsgLTFcbiAgICogIGlmIHRoZSBlbGVtZW50IGlzbid0IGZvdW5kLlxuICAgKi9cblxuXG4gIHZhciBmaW5kQ29udGFpbmVySW5kZXggPSBmdW5jdGlvbiBmaW5kQ29udGFpbmVySW5kZXgoZWxlbWVudCkge1xuICAgIC8vIE5PVEU6IHNlYXJjaCBgY29udGFpbmVyR3JvdXBzYCBiZWNhdXNlIGl0J3MgcG9zc2libGUgYSBncm91cCBjb250YWlucyBubyB0YWJiYWJsZVxuICAgIC8vICBub2RlcywgYnV0IHN0aWxsIGNvbnRhaW5zIGZvY3VzYWJsZSBub2RlcyAoZS5nLiBpZiB0aGV5IGFsbCBoYXZlIGB0YWJpbmRleD0tMWApXG4gICAgLy8gIGFuZCB3ZSBzdGlsbCBuZWVkIHRvIGZpbmQgdGhlIGVsZW1lbnQgaW4gdGhlcmVcbiAgICByZXR1cm4gc3RhdGUuY29udGFpbmVyR3JvdXBzLmZpbmRJbmRleChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IF9yZWYuY29udGFpbmVyLFxuICAgICAgICAgIHRhYmJhYmxlTm9kZXMgPSBfcmVmLnRhYmJhYmxlTm9kZXM7XG4gICAgICByZXR1cm4gY29udGFpbmVyLmNvbnRhaW5zKGVsZW1lbnQpIHx8IC8vIGZhbGwgYmFjayB0byBleHBsaWNpdCB0YWJiYWJsZSBzZWFyY2ggd2hpY2ggd2lsbCB0YWtlIGludG8gY29uc2lkZXJhdGlvbiBhbnlcbiAgICAgIC8vICB3ZWIgY29tcG9uZW50cyBpZiB0aGUgYHRhYmJhYmxlT3B0aW9ucy5nZXRTaGFkb3dSb290YCBvcHRpb24gd2FzIHVzZWQgZm9yXG4gICAgICAvLyAgdGhlIHRyYXAsIGVuYWJsaW5nIHNoYWRvdyBET00gc3VwcG9ydCBpbiB0YWJiYWJsZSAoYE5vZGUuY29udGFpbnMoKWAgZG9lc24ndFxuICAgICAgLy8gIGxvb2sgaW5zaWRlIHdlYiBjb21wb25lbnRzIGV2ZW4gaWYgb3BlbilcbiAgICAgIHRhYmJhYmxlTm9kZXMuZmluZChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICByZXR1cm4gbm9kZSA9PT0gZWxlbWVudDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICAvKipcbiAgICogR2V0cyB0aGUgbm9kZSBmb3IgdGhlIGdpdmVuIG9wdGlvbiwgd2hpY2ggaXMgZXhwZWN0ZWQgdG8gYmUgYW4gb3B0aW9uIHRoYXRcbiAgICogIGNhbiBiZSBlaXRoZXIgYSBET00gbm9kZSwgYSBzdHJpbmcgdGhhdCBpcyBhIHNlbGVjdG9yIHRvIGdldCBhIG5vZGUsIGBmYWxzZWBcbiAgICogIChpZiBhIG5vZGUgaXMgZXhwbGljaXRseSBOT1QgZ2l2ZW4pLCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbnkgb2YgdGhlc2VcbiAgICogIHZhbHVlcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbk5hbWVcbiAgICogQHJldHVybnMge3VuZGVmaW5lZCB8IGZhbHNlIHwgSFRNTEVsZW1lbnQgfCBTVkdFbGVtZW50fSBSZXR1cm5zXG4gICAqICBgdW5kZWZpbmVkYCBpZiB0aGUgb3B0aW9uIGlzIG5vdCBzcGVjaWZpZWQ7IGBmYWxzZWAgaWYgdGhlIG9wdGlvblxuICAgKiAgcmVzb2x2ZWQgdG8gYGZhbHNlYCAobm9kZSBleHBsaWNpdGx5IG5vdCBnaXZlbik7IG90aGVyd2lzZSwgdGhlIHJlc29sdmVkXG4gICAqICBET00gbm9kZS5cbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBvcHRpb24gaXMgc2V0LCBub3QgYGZhbHNlYCwgYW5kIGlzIG5vdCwgb3IgZG9lcyBub3RcbiAgICogIHJlc29sdmUgdG8gYSBub2RlLlxuICAgKi9cblxuXG4gIHZhciBnZXROb2RlRm9yT3B0aW9uID0gZnVuY3Rpb24gZ2V0Tm9kZUZvck9wdGlvbihvcHRpb25OYW1lKSB7XG4gICAgdmFyIG9wdGlvblZhbHVlID0gY29uZmlnW29wdGlvbk5hbWVdO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25WYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBwYXJhbXMgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBwYXJhbXNbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIG9wdGlvblZhbHVlID0gb3B0aW9uVmFsdWUuYXBwbHkodm9pZCAwLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25WYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgb3B0aW9uVmFsdWUgPSB1bmRlZmluZWQ7IC8vIHVzZSBkZWZhdWx0IHZhbHVlXG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25WYWx1ZSkge1xuICAgICAgaWYgKG9wdGlvblZhbHVlID09PSB1bmRlZmluZWQgfHwgb3B0aW9uVmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25WYWx1ZTtcbiAgICAgIH0gLy8gZWxzZSwgZW1wdHkgc3RyaW5nIChpbnZhbGlkKSwgbnVsbCAoaW52YWxpZCksIDAgKGludmFsaWQpXG5cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYFwiLmNvbmNhdChvcHRpb25OYW1lLCBcImAgd2FzIHNwZWNpZmllZCBidXQgd2FzIG5vdCBhIG5vZGUsIG9yIGRpZCBub3QgcmV0dXJuIGEgbm9kZVwiKSk7XG4gICAgfVxuXG4gICAgdmFyIG5vZGUgPSBvcHRpb25WYWx1ZTsgLy8gY291bGQgYmUgSFRNTEVsZW1lbnQsIFNWR0VsZW1lbnQsIG9yIG5vbi1lbXB0eSBzdHJpbmcgYXQgdGhpcyBwb2ludFxuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25WYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5vZGUgPSBkb2MucXVlcnlTZWxlY3RvcihvcHRpb25WYWx1ZSk7IC8vIHJlc29sdmUgdG8gbm9kZSwgb3IgbnVsbCBpZiBmYWlsc1xuXG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYFwiLmNvbmNhdChvcHRpb25OYW1lLCBcImAgYXMgc2VsZWN0b3IgcmVmZXJzIHRvIG5vIGtub3duIG5vZGVcIikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIHZhciBnZXRJbml0aWFsRm9jdXNOb2RlID0gZnVuY3Rpb24gZ2V0SW5pdGlhbEZvY3VzTm9kZSgpIHtcbiAgICB2YXIgbm9kZSA9IGdldE5vZGVGb3JPcHRpb24oJ2luaXRpYWxGb2N1cycpOyAvLyBmYWxzZSBleHBsaWNpdGx5IGluZGljYXRlcyB3ZSB3YW50IG5vIGluaXRpYWxGb2N1cyBhdCBhbGxcblxuICAgIGlmIChub2RlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChub2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIG9wdGlvbiBub3Qgc3BlY2lmaWVkOiB1c2UgZmFsbGJhY2sgb3B0aW9uc1xuICAgICAgaWYgKGZpbmRDb250YWluZXJJbmRleChkb2MuYWN0aXZlRWxlbWVudCkgPj0gMCkge1xuICAgICAgICBub2RlID0gZG9jLmFjdGl2ZUVsZW1lbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZmlyc3RUYWJiYWJsZUdyb3VwID0gc3RhdGUudGFiYmFibGVHcm91cHNbMF07XG4gICAgICAgIHZhciBmaXJzdFRhYmJhYmxlTm9kZSA9IGZpcnN0VGFiYmFibGVHcm91cCAmJiBmaXJzdFRhYmJhYmxlR3JvdXAuZmlyc3RUYWJiYWJsZU5vZGU7IC8vIE5PVEU6IGBmYWxsYmFja0ZvY3VzYCBvcHRpb24gZnVuY3Rpb24gY2Fubm90IHJldHVybiBgZmFsc2VgIChub3Qgc3VwcG9ydGVkKVxuXG4gICAgICAgIG5vZGUgPSBmaXJzdFRhYmJhYmxlTm9kZSB8fCBnZXROb2RlRm9yT3B0aW9uKCdmYWxsYmFja0ZvY3VzJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFub2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdXIgZm9jdXMtdHJhcCBuZWVkcyB0byBoYXZlIGF0IGxlYXN0IG9uZSBmb2N1c2FibGUgZWxlbWVudCcpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIHZhciB1cGRhdGVUYWJiYWJsZU5vZGVzID0gZnVuY3Rpb24gdXBkYXRlVGFiYmFibGVOb2RlcygpIHtcbiAgICBzdGF0ZS5jb250YWluZXJHcm91cHMgPSBzdGF0ZS5jb250YWluZXJzLm1hcChmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICB2YXIgdGFiYmFibGVOb2RlcyA9IHRhYmJhYmxlLnRhYmJhYmxlKGNvbnRhaW5lciwgY29uZmlnLnRhYmJhYmxlT3B0aW9ucyk7IC8vIE5PVEU6IGlmIHdlIGhhdmUgdGFiYmFibGUgbm9kZXMsIHdlIG11c3QgaGF2ZSBmb2N1c2FibGUgbm9kZXM7IGZvY3VzYWJsZSBub2Rlc1xuICAgICAgLy8gIGFyZSBhIHN1cGVyc2V0IG9mIHRhYmJhYmxlIG5vZGVzXG5cbiAgICAgIHZhciBmb2N1c2FibGVOb2RlcyA9IHRhYmJhYmxlLmZvY3VzYWJsZShjb250YWluZXIsIGNvbmZpZy50YWJiYWJsZU9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICAgIHRhYmJhYmxlTm9kZXM6IHRhYmJhYmxlTm9kZXMsXG4gICAgICAgIGZvY3VzYWJsZU5vZGVzOiBmb2N1c2FibGVOb2RlcyxcbiAgICAgICAgZmlyc3RUYWJiYWJsZU5vZGU6IHRhYmJhYmxlTm9kZXMubGVuZ3RoID4gMCA/IHRhYmJhYmxlTm9kZXNbMF0gOiBudWxsLFxuICAgICAgICBsYXN0VGFiYmFibGVOb2RlOiB0YWJiYWJsZU5vZGVzLmxlbmd0aCA+IDAgPyB0YWJiYWJsZU5vZGVzW3RhYmJhYmxlTm9kZXMubGVuZ3RoIC0gMV0gOiBudWxsLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaW5kcyB0aGUgX190YWJiYWJsZV9fIG5vZGUgdGhhdCBmb2xsb3dzIHRoZSBnaXZlbiBub2RlIGluIHRoZSBzcGVjaWZpZWQgZGlyZWN0aW9uLFxuICAgICAgICAgKiAgaW4gdGhpcyBjb250YWluZXIsIGlmIGFueS5cbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3J3YXJkXSBUcnVlIGlmIGdvaW5nIGluIGZvcndhcmQgdGFiIG9yZGVyOyBmYWxzZSBpZiBnb2luZ1xuICAgICAgICAgKiAgaW4gcmV2ZXJzZS5cbiAgICAgICAgICogQHJldHVybnMge0hUTUxFbGVtZW50fHVuZGVmaW5lZH0gVGhlIG5leHQgdGFiYmFibGUgbm9kZSwgaWYgYW55LlxuICAgICAgICAgKi9cbiAgICAgICAgbmV4dFRhYmJhYmxlTm9kZTogZnVuY3Rpb24gbmV4dFRhYmJhYmxlTm9kZShub2RlKSB7XG4gICAgICAgICAgdmFyIGZvcndhcmQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHRydWU7XG4gICAgICAgICAgLy8gTk9URTogSWYgdGFiaW5kZXggaXMgcG9zaXRpdmUgKGluIG9yZGVyIHRvIG1hbmlwdWxhdGUgdGhlIHRhYiBvcmRlciBzZXBhcmF0ZVxuICAgICAgICAgIC8vICBmcm9tIHRoZSBET00gb3JkZXIpLCB0aGlzIF9fd2lsbCBub3Qgd29ya19fIGJlY2F1c2UgdGhlIGxpc3Qgb2YgZm9jdXNhYmxlTm9kZXMsXG4gICAgICAgICAgLy8gIHdoaWxlIGl0IGNvbnRhaW5zIHRhYmJhYmxlIG5vZGVzLCBkb2VzIG5vdCBzb3J0IGl0cyBub2RlcyBpbiBhbnkgb3JkZXIgb3RoZXJcbiAgICAgICAgICAvLyAgdGhhbiBET00gb3JkZXIsIGJlY2F1c2UgaXQgY2FuJ3Q6IFdoZXJlIHdvdWxkIHlvdSBwbGFjZSBmb2N1c2FibGUgKGJ1dCBub3RcbiAgICAgICAgICAvLyAgdGFiYmFibGUpIG5vZGVzIGluIHRoYXQgb3JkZXI/IFRoZXkgaGF2ZSBubyBvcmRlciwgYmVjYXVzZSB0aGV5IGFyZW4ndCB0YWJiYWxlLi4uXG4gICAgICAgICAgLy8gU3VwcG9ydCBmb3IgcG9zaXRpdmUgdGFiaW5kZXggaXMgYWxyZWFkeSBicm9rZW4gYW5kIGhhcmQgdG8gbWFuYWdlIChwb3NzaWJseVxuICAgICAgICAgIC8vICBub3Qgc3VwcG9ydGFibGUsIFRCRCksIHNvIHRoaXMgaXNuJ3QgZ29pbmcgdG8gbWFrZSB0aGluZ3Mgd29yc2UgdGhhbiB0aGV5XG4gICAgICAgICAgLy8gIGFscmVhZHkgYXJlLCBhbmQgYXQgbGVhc3QgbWFrZXMgdGhpbmdzIGJldHRlciBmb3IgdGhlIG1ham9yaXR5IG9mIGNhc2VzIHdoZXJlXG4gICAgICAgICAgLy8gIHRhYmluZGV4IGlzIGVpdGhlciAwL3Vuc2V0IG9yIG5lZ2F0aXZlLlxuICAgICAgICAgIC8vIEZZSSwgcG9zaXRpdmUgdGFiaW5kZXggaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mb2N1cy10cmFwL2ZvY3VzLXRyYXAvaXNzdWVzLzM3NVxuICAgICAgICAgIHZhciBub2RlSWR4ID0gZm9jdXNhYmxlTm9kZXMuZmluZEluZGV4KGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICByZXR1cm4gbiA9PT0gbm9kZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmIChub2RlSWR4IDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZm9yd2FyZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZvY3VzYWJsZU5vZGVzLnNsaWNlKG5vZGVJZHggKyAxKS5maW5kKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0YWJiYWJsZS5pc1RhYmJhYmxlKG4sIGNvbmZpZy50YWJiYWJsZU9wdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGZvY3VzYWJsZU5vZGVzLnNsaWNlKDAsIG5vZGVJZHgpLnJldmVyc2UoKS5maW5kKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGFiYmFibGUuaXNUYWJiYWJsZShuLCBjb25maWcudGFiYmFibGVPcHRpb25zKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgICBzdGF0ZS50YWJiYWJsZUdyb3VwcyA9IHN0YXRlLmNvbnRhaW5lckdyb3Vwcy5maWx0ZXIoZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICByZXR1cm4gZ3JvdXAudGFiYmFibGVOb2Rlcy5sZW5ndGggPiAwO1xuICAgIH0pOyAvLyB0aHJvdyBpZiBubyBncm91cHMgaGF2ZSB0YWJiYWJsZSBub2RlcyBhbmQgd2UgZG9uJ3QgaGF2ZSBhIGZhbGxiYWNrIGZvY3VzIG5vZGUgZWl0aGVyXG5cbiAgICBpZiAoc3RhdGUudGFiYmFibGVHcm91cHMubGVuZ3RoIDw9IDAgJiYgIWdldE5vZGVGb3JPcHRpb24oJ2ZhbGxiYWNrRm9jdXMnKSAvLyByZXR1cm5pbmcgZmFsc2Ugbm90IHN1cHBvcnRlZCBmb3IgdGhpcyBvcHRpb25cbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91ciBmb2N1cy10cmFwIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgY29udGFpbmVyIHdpdGggYXQgbGVhc3Qgb25lIHRhYmJhYmxlIG5vZGUgaW4gaXQgYXQgYWxsIHRpbWVzJyk7XG4gICAgfVxuICB9O1xuXG4gIHZhciB0cnlGb2N1cyA9IGZ1bmN0aW9uIHRyeUZvY3VzKG5vZGUpIHtcbiAgICBpZiAobm9kZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobm9kZSA9PT0gZG9jLmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIW5vZGUgfHwgIW5vZGUuZm9jdXMpIHtcbiAgICAgIHRyeUZvY3VzKGdldEluaXRpYWxGb2N1c05vZGUoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbm9kZS5mb2N1cyh7XG4gICAgICBwcmV2ZW50U2Nyb2xsOiAhIWNvbmZpZy5wcmV2ZW50U2Nyb2xsXG4gICAgfSk7XG4gICAgc3RhdGUubW9zdFJlY2VudGx5Rm9jdXNlZE5vZGUgPSBub2RlO1xuXG4gICAgaWYgKGlzU2VsZWN0YWJsZUlucHV0KG5vZGUpKSB7XG4gICAgICBub2RlLnNlbGVjdCgpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgZ2V0UmV0dXJuRm9jdXNOb2RlID0gZnVuY3Rpb24gZ2V0UmV0dXJuRm9jdXNOb2RlKHByZXZpb3VzQWN0aXZlRWxlbWVudCkge1xuICAgIHZhciBub2RlID0gZ2V0Tm9kZUZvck9wdGlvbignc2V0UmV0dXJuRm9jdXMnLCBwcmV2aW91c0FjdGl2ZUVsZW1lbnQpO1xuICAgIHJldHVybiBub2RlID8gbm9kZSA6IG5vZGUgPT09IGZhbHNlID8gZmFsc2UgOiBwcmV2aW91c0FjdGl2ZUVsZW1lbnQ7XG4gIH07IC8vIFRoaXMgbmVlZHMgdG8gYmUgZG9uZSBvbiBtb3VzZWRvd24gYW5kIHRvdWNoc3RhcnQgaW5zdGVhZCBvZiBjbGlja1xuICAvLyBzbyB0aGF0IGl0IHByZWNlZGVzIHRoZSBmb2N1cyBldmVudC5cblxuXG4gIHZhciBjaGVja1BvaW50ZXJEb3duID0gZnVuY3Rpb24gY2hlY2tQb2ludGVyRG93bihlKSB7XG4gICAgdmFyIHRhcmdldCA9IGdldEFjdHVhbFRhcmdldChlKTtcblxuICAgIGlmIChmaW5kQ29udGFpbmVySW5kZXgodGFyZ2V0KSA+PSAwKSB7XG4gICAgICAvLyBhbGxvdyB0aGUgY2xpY2sgc2luY2UgaXQgb2N1cnJlZCBpbnNpZGUgdGhlIHRyYXBcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodmFsdWVPckhhbmRsZXIoY29uZmlnLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzLCBlKSkge1xuICAgICAgLy8gaW1tZWRpYXRlbHkgZGVhY3RpdmF0ZSB0aGUgdHJhcFxuICAgICAgdHJhcC5kZWFjdGl2YXRlKHtcbiAgICAgICAgLy8gaWYsIG9uIGRlYWN0aXZhdGlvbiwgd2Ugc2hvdWxkIHJldHVybiBmb2N1cyB0byB0aGUgbm9kZSBvcmlnaW5hbGx5LWZvY3VzZWRcbiAgICAgICAgLy8gIHdoZW4gdGhlIHRyYXAgd2FzIGFjdGl2YXRlZCAob3IgdGhlIGNvbmZpZ3VyZWQgYHNldFJldHVybkZvY3VzYCBub2RlKSxcbiAgICAgICAgLy8gIHRoZW4gYXNzdW1lIGl0J3MgYWxzbyBPSyB0byByZXR1cm4gZm9jdXMgdG8gdGhlIG91dHNpZGUgbm9kZSB0aGF0IHdhc1xuICAgICAgICAvLyAganVzdCBjbGlja2VkLCBjYXVzaW5nIGRlYWN0aXZhdGlvbiwgYXMgbG9uZyBhcyB0aGF0IG5vZGUgaXMgZm9jdXNhYmxlO1xuICAgICAgICAvLyAgaWYgaXQgaXNuJ3QgZm9jdXNhYmxlLCB0aGVuIHJldHVybiBmb2N1cyB0byB0aGUgb3JpZ2luYWwgbm9kZSBmb2N1c2VkXG4gICAgICAgIC8vICBvbiBhY3RpdmF0aW9uIChvciB0aGUgY29uZmlndXJlZCBgc2V0UmV0dXJuRm9jdXNgIG5vZGUpXG4gICAgICAgIC8vIE5PVEU6IGJ5IHNldHRpbmcgYHJldHVybkZvY3VzOiBmYWxzZWAsIGRlYWN0aXZhdGUoKSB3aWxsIGRvIG5vdGhpbmcsXG4gICAgICAgIC8vICB3aGljaCB3aWxsIHJlc3VsdCBpbiB0aGUgb3V0c2lkZSBjbGljayBzZXR0aW5nIGZvY3VzIHRvIHRoZSBub2RlXG4gICAgICAgIC8vICB0aGF0IHdhcyBjbGlja2VkLCB3aGV0aGVyIGl0J3MgZm9jdXNhYmxlIG9yIG5vdDsgYnkgc2V0dGluZ1xuICAgICAgICAvLyAgYHJldHVybkZvY3VzOiB0cnVlYCwgd2UnbGwgYXR0ZW1wdCB0byByZS1mb2N1cyB0aGUgbm9kZSBvcmlnaW5hbGx5LWZvY3VzZWRcbiAgICAgICAgLy8gIG9uIGFjdGl2YXRpb24gKG9yIHRoZSBjb25maWd1cmVkIGBzZXRSZXR1cm5Gb2N1c2Agbm9kZSlcbiAgICAgICAgcmV0dXJuRm9jdXM6IGNvbmZpZy5yZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZSAmJiAhdGFiYmFibGUuaXNGb2N1c2FibGUodGFyZ2V0LCBjb25maWcudGFiYmFibGVPcHRpb25zKVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBUaGlzIGlzIG5lZWRlZCBmb3IgbW9iaWxlIGRldmljZXMuXG4gICAgLy8gKElmIHdlJ2xsIG9ubHkgbGV0IGBjbGlja2AgZXZlbnRzIHRocm91Z2gsXG4gICAgLy8gdGhlbiBvbiBtb2JpbGUgdGhleSB3aWxsIGJlIGJsb2NrZWQgYW55d2F5cyBpZiBgdG91Y2hzdGFydGAgaXMgYmxvY2tlZC4pXG5cblxuICAgIGlmICh2YWx1ZU9ySGFuZGxlcihjb25maWcuYWxsb3dPdXRzaWRlQ2xpY2ssIGUpKSB7XG4gICAgICAvLyBhbGxvdyB0aGUgY2xpY2sgb3V0c2lkZSB0aGUgdHJhcCB0byB0YWtlIHBsYWNlXG4gICAgICByZXR1cm47XG4gICAgfSAvLyBvdGhlcndpc2UsIHByZXZlbnQgdGhlIGNsaWNrXG5cblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfTsgLy8gSW4gY2FzZSBmb2N1cyBlc2NhcGVzIHRoZSB0cmFwIGZvciBzb21lIHN0cmFuZ2UgcmVhc29uLCBwdWxsIGl0IGJhY2sgaW4uXG5cblxuICB2YXIgY2hlY2tGb2N1c0luID0gZnVuY3Rpb24gY2hlY2tGb2N1c0luKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0QWN0dWFsVGFyZ2V0KGUpO1xuICAgIHZhciB0YXJnZXRDb250YWluZWQgPSBmaW5kQ29udGFpbmVySW5kZXgodGFyZ2V0KSA+PSAwOyAvLyBJbiBGaXJlZm94IHdoZW4geW91IFRhYiBvdXQgb2YgYW4gaWZyYW1lIHRoZSBEb2N1bWVudCBpcyBicmllZmx5IGZvY3VzZWQuXG5cbiAgICBpZiAodGFyZ2V0Q29udGFpbmVkIHx8IHRhcmdldCBpbnN0YW5jZW9mIERvY3VtZW50KSB7XG4gICAgICBpZiAodGFyZ2V0Q29udGFpbmVkKSB7XG4gICAgICAgIHN0YXRlLm1vc3RSZWNlbnRseUZvY3VzZWROb2RlID0gdGFyZ2V0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlc2NhcGVkISBwdWxsIGl0IGJhY2sgaW4gdG8gd2hlcmUgaXQganVzdCBsZWZ0XG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgdHJ5Rm9jdXMoc3RhdGUubW9zdFJlY2VudGx5Rm9jdXNlZE5vZGUgfHwgZ2V0SW5pdGlhbEZvY3VzTm9kZSgpKTtcbiAgICB9XG4gIH07IC8vIEhpamFjayBUYWIgZXZlbnRzIG9uIHRoZSBmaXJzdCBhbmQgbGFzdCBmb2N1c2FibGUgbm9kZXMgb2YgdGhlIHRyYXAsXG4gIC8vIGluIG9yZGVyIHRvIHByZXZlbnQgZm9jdXMgZnJvbSBlc2NhcGluZy4gSWYgaXQgZXNjYXBlcyBmb3IgZXZlbiBhXG4gIC8vIG1vbWVudCBpdCBjYW4gZW5kIHVwIHNjcm9sbGluZyB0aGUgcGFnZSBhbmQgY2F1c2luZyBjb25mdXNpb24gc28gd2VcbiAgLy8ga2luZCBvZiBuZWVkIHRvIGNhcHR1cmUgdGhlIGFjdGlvbiBhdCB0aGUga2V5ZG93biBwaGFzZS5cblxuXG4gIHZhciBjaGVja1RhYiA9IGZ1bmN0aW9uIGNoZWNrVGFiKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0QWN0dWFsVGFyZ2V0KGUpO1xuICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcbiAgICB2YXIgZGVzdGluYXRpb25Ob2RlID0gbnVsbDtcblxuICAgIGlmIChzdGF0ZS50YWJiYWJsZUdyb3Vwcy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBtYWtlIHN1cmUgdGhlIHRhcmdldCBpcyBhY3R1YWxseSBjb250YWluZWQgaW4gYSBncm91cFxuICAgICAgLy8gTk9URTogdGhlIHRhcmdldCBtYXkgYWxzbyBiZSB0aGUgY29udGFpbmVyIGl0c2VsZiBpZiBpdCdzIGZvY3VzYWJsZVxuICAgICAgLy8gIHdpdGggdGFiSW5kZXg9Jy0xJyBhbmQgd2FzIGdpdmVuIGluaXRpYWwgZm9jdXNcbiAgICAgIHZhciBjb250YWluZXJJbmRleCA9IGZpbmRDb250YWluZXJJbmRleCh0YXJnZXQpO1xuICAgICAgdmFyIGNvbnRhaW5lckdyb3VwID0gY29udGFpbmVySW5kZXggPj0gMCA/IHN0YXRlLmNvbnRhaW5lckdyb3Vwc1tjb250YWluZXJJbmRleF0gOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChjb250YWluZXJJbmRleCA8IDApIHtcbiAgICAgICAgLy8gdGFyZ2V0IG5vdCBmb3VuZCBpbiBhbnkgZ3JvdXA6IHF1aXRlIHBvc3NpYmxlIGZvY3VzIGhhcyBlc2NhcGVkIHRoZSB0cmFwLFxuICAgICAgICAvLyAgc28gYnJpbmcgaXQgYmFjayBpbiB0by4uLlxuICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgIC8vIC4uLnRoZSBsYXN0IG5vZGUgaW4gdGhlIGxhc3QgZ3JvdXBcbiAgICAgICAgICBkZXN0aW5hdGlvbk5vZGUgPSBzdGF0ZS50YWJiYWJsZUdyb3Vwc1tzdGF0ZS50YWJiYWJsZUdyb3Vwcy5sZW5ndGggLSAxXS5sYXN0VGFiYmFibGVOb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIC4uLnRoZSBmaXJzdCBub2RlIGluIHRoZSBmaXJzdCBncm91cFxuICAgICAgICAgIGRlc3RpbmF0aW9uTm9kZSA9IHN0YXRlLnRhYmJhYmxlR3JvdXBzWzBdLmZpcnN0VGFiYmFibGVOb2RlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgLy8gUkVWRVJTRVxuICAgICAgICAvLyBpcyB0aGUgdGFyZ2V0IHRoZSBmaXJzdCB0YWJiYWJsZSBub2RlIGluIGEgZ3JvdXA/XG4gICAgICAgIHZhciBzdGFydE9mR3JvdXBJbmRleCA9IGZpbmRJbmRleChzdGF0ZS50YWJiYWJsZUdyb3VwcywgZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgICAgdmFyIGZpcnN0VGFiYmFibGVOb2RlID0gX3JlZjIuZmlyc3RUYWJiYWJsZU5vZGU7XG4gICAgICAgICAgcmV0dXJuIHRhcmdldCA9PT0gZmlyc3RUYWJiYWJsZU5vZGU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzdGFydE9mR3JvdXBJbmRleCA8IDAgJiYgKGNvbnRhaW5lckdyb3VwLmNvbnRhaW5lciA9PT0gdGFyZ2V0IHx8IHRhYmJhYmxlLmlzRm9jdXNhYmxlKHRhcmdldCwgY29uZmlnLnRhYmJhYmxlT3B0aW9ucykgJiYgIXRhYmJhYmxlLmlzVGFiYmFibGUodGFyZ2V0LCBjb25maWcudGFiYmFibGVPcHRpb25zKSAmJiAhY29udGFpbmVyR3JvdXAubmV4dFRhYmJhYmxlTm9kZSh0YXJnZXQsIGZhbHNlKSkpIHtcbiAgICAgICAgICAvLyBhbiBleGNlcHRpb24gY2FzZSB3aGVyZSB0aGUgdGFyZ2V0IGlzIGVpdGhlciB0aGUgY29udGFpbmVyIGl0c2VsZiwgb3JcbiAgICAgICAgICAvLyAgYSBub24tdGFiYmFibGUgbm9kZSB0aGF0IHdhcyBnaXZlbiBmb2N1cyAoaS5lLiB0YWJpbmRleCBpcyBuZWdhdGl2ZVxuICAgICAgICAgIC8vICBhbmQgdXNlciBjbGlja2VkIG9uIGl0IG9yIG5vZGUgd2FzIHByb2dyYW1tYXRpY2FsbHkgZ2l2ZW4gZm9jdXMpXG4gICAgICAgICAgLy8gIGFuZCBpcyBub3QgZm9sbG93ZWQgYnkgYW55IG90aGVyIHRhYmJhYmxlIG5vZGUsIGluIHdoaWNoXG4gICAgICAgICAgLy8gIGNhc2UsIHdlIHNob3VsZCBoYW5kbGUgc2hpZnQrdGFiIGFzIGlmIGZvY3VzIHdlcmUgb24gdGhlIGNvbnRhaW5lcidzXG4gICAgICAgICAgLy8gIGZpcnN0IHRhYmJhYmxlIG5vZGUsIGFuZCBnbyB0byB0aGUgbGFzdCB0YWJiYWJsZSBub2RlIG9mIHRoZSBMQVNUIGdyb3VwXG4gICAgICAgICAgc3RhcnRPZkdyb3VwSW5kZXggPSBjb250YWluZXJJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGFydE9mR3JvdXBJbmRleCA+PSAwKSB7XG4gICAgICAgICAgLy8gWUVTOiB0aGVuIHNoaWZ0K3RhYiBzaG91bGQgZ28gdG8gdGhlIGxhc3QgdGFiYmFibGUgbm9kZSBpbiB0aGVcbiAgICAgICAgICAvLyAgcHJldmlvdXMgZ3JvdXAgKGFuZCB3cmFwIGFyb3VuZCB0byB0aGUgbGFzdCB0YWJiYWJsZSBub2RlIG9mXG4gICAgICAgICAgLy8gIHRoZSBMQVNUIGdyb3VwIGlmIGl0J3MgdGhlIGZpcnN0IHRhYmJhYmxlIG5vZGUgb2YgdGhlIEZJUlNUIGdyb3VwKVxuICAgICAgICAgIHZhciBkZXN0aW5hdGlvbkdyb3VwSW5kZXggPSBzdGFydE9mR3JvdXBJbmRleCA9PT0gMCA/IHN0YXRlLnRhYmJhYmxlR3JvdXBzLmxlbmd0aCAtIDEgOiBzdGFydE9mR3JvdXBJbmRleCAtIDE7XG4gICAgICAgICAgdmFyIGRlc3RpbmF0aW9uR3JvdXAgPSBzdGF0ZS50YWJiYWJsZUdyb3Vwc1tkZXN0aW5hdGlvbkdyb3VwSW5kZXhdO1xuICAgICAgICAgIGRlc3RpbmF0aW9uTm9kZSA9IGRlc3RpbmF0aW9uR3JvdXAubGFzdFRhYmJhYmxlTm9kZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRk9SV0FSRFxuICAgICAgICAvLyBpcyB0aGUgdGFyZ2V0IHRoZSBsYXN0IHRhYmJhYmxlIG5vZGUgaW4gYSBncm91cD9cbiAgICAgICAgdmFyIGxhc3RPZkdyb3VwSW5kZXggPSBmaW5kSW5kZXgoc3RhdGUudGFiYmFibGVHcm91cHMsIGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgICAgIHZhciBsYXN0VGFiYmFibGVOb2RlID0gX3JlZjMubGFzdFRhYmJhYmxlTm9kZTtcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0ID09PSBsYXN0VGFiYmFibGVOb2RlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobGFzdE9mR3JvdXBJbmRleCA8IDAgJiYgKGNvbnRhaW5lckdyb3VwLmNvbnRhaW5lciA9PT0gdGFyZ2V0IHx8IHRhYmJhYmxlLmlzRm9jdXNhYmxlKHRhcmdldCwgY29uZmlnLnRhYmJhYmxlT3B0aW9ucykgJiYgIXRhYmJhYmxlLmlzVGFiYmFibGUodGFyZ2V0LCBjb25maWcudGFiYmFibGVPcHRpb25zKSAmJiAhY29udGFpbmVyR3JvdXAubmV4dFRhYmJhYmxlTm9kZSh0YXJnZXQpKSkge1xuICAgICAgICAgIC8vIGFuIGV4Y2VwdGlvbiBjYXNlIHdoZXJlIHRoZSB0YXJnZXQgaXMgdGhlIGNvbnRhaW5lciBpdHNlbGYsIG9yXG4gICAgICAgICAgLy8gIGEgbm9uLXRhYmJhYmxlIG5vZGUgdGhhdCB3YXMgZ2l2ZW4gZm9jdXMgKGkuZS4gdGFiaW5kZXggaXMgbmVnYXRpdmVcbiAgICAgICAgICAvLyAgYW5kIHVzZXIgY2xpY2tlZCBvbiBpdCBvciBub2RlIHdhcyBwcm9ncmFtbWF0aWNhbGx5IGdpdmVuIGZvY3VzKVxuICAgICAgICAgIC8vICBhbmQgaXMgbm90IGZvbGxvd2VkIGJ5IGFueSBvdGhlciB0YWJiYWJsZSBub2RlLCBpbiB3aGljaFxuICAgICAgICAgIC8vICBjYXNlLCB3ZSBzaG91bGQgaGFuZGxlIHRhYiBhcyBpZiBmb2N1cyB3ZXJlIG9uIHRoZSBjb250YWluZXInc1xuICAgICAgICAgIC8vICBsYXN0IHRhYmJhYmxlIG5vZGUsIGFuZCBnbyB0byB0aGUgZmlyc3QgdGFiYmFibGUgbm9kZSBvZiB0aGUgRklSU1QgZ3JvdXBcbiAgICAgICAgICBsYXN0T2ZHcm91cEluZGV4ID0gY29udGFpbmVySW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdE9mR3JvdXBJbmRleCA+PSAwKSB7XG4gICAgICAgICAgLy8gWUVTOiB0aGVuIHRhYiBzaG91bGQgZ28gdG8gdGhlIGZpcnN0IHRhYmJhYmxlIG5vZGUgaW4gdGhlIG5leHRcbiAgICAgICAgICAvLyAgZ3JvdXAgKGFuZCB3cmFwIGFyb3VuZCB0byB0aGUgZmlyc3QgdGFiYmFibGUgbm9kZSBvZiB0aGUgRklSU1RcbiAgICAgICAgICAvLyAgZ3JvdXAgaWYgaXQncyB0aGUgbGFzdCB0YWJiYWJsZSBub2RlIG9mIHRoZSBMQVNUIGdyb3VwKVxuICAgICAgICAgIHZhciBfZGVzdGluYXRpb25Hcm91cEluZGV4ID0gbGFzdE9mR3JvdXBJbmRleCA9PT0gc3RhdGUudGFiYmFibGVHcm91cHMubGVuZ3RoIC0gMSA/IDAgOiBsYXN0T2ZHcm91cEluZGV4ICsgMTtcblxuICAgICAgICAgIHZhciBfZGVzdGluYXRpb25Hcm91cCA9IHN0YXRlLnRhYmJhYmxlR3JvdXBzW19kZXN0aW5hdGlvbkdyb3VwSW5kZXhdO1xuICAgICAgICAgIGRlc3RpbmF0aW9uTm9kZSA9IF9kZXN0aW5hdGlvbkdyb3VwLmZpcnN0VGFiYmFibGVOb2RlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5PVEU6IHRoZSBmYWxsYmFja0ZvY3VzIG9wdGlvbiBkb2VzIG5vdCBzdXBwb3J0IHJldHVybmluZyBmYWxzZSB0byBvcHQtb3V0XG4gICAgICBkZXN0aW5hdGlvbk5vZGUgPSBnZXROb2RlRm9yT3B0aW9uKCdmYWxsYmFja0ZvY3VzJyk7XG4gICAgfVxuXG4gICAgaWYgKGRlc3RpbmF0aW9uTm9kZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdHJ5Rm9jdXMoZGVzdGluYXRpb25Ob2RlKTtcbiAgICB9IC8vIGVsc2UsIGxldCB0aGUgYnJvd3NlciB0YWtlIGNhcmUgb2YgW3NoaWZ0K110YWIgYW5kIG1vdmUgdGhlIGZvY3VzXG5cbiAgfTtcblxuICB2YXIgY2hlY2tLZXkgPSBmdW5jdGlvbiBjaGVja0tleShlKSB7XG4gICAgaWYgKGlzRXNjYXBlRXZlbnQoZSkgJiYgdmFsdWVPckhhbmRsZXIoY29uZmlnLmVzY2FwZURlYWN0aXZhdGVzLCBlKSAhPT0gZmFsc2UpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRyYXAuZGVhY3RpdmF0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc1RhYkV2ZW50KGUpKSB7XG4gICAgICBjaGVja1RhYihlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGNoZWNrQ2xpY2sgPSBmdW5jdGlvbiBjaGVja0NsaWNrKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZ2V0QWN0dWFsVGFyZ2V0KGUpO1xuXG4gICAgaWYgKGZpbmRDb250YWluZXJJbmRleCh0YXJnZXQpID49IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodmFsdWVPckhhbmRsZXIoY29uZmlnLmNsaWNrT3V0c2lkZURlYWN0aXZhdGVzLCBlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZU9ySGFuZGxlcihjb25maWcuYWxsb3dPdXRzaWRlQ2xpY2ssIGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gIH07IC8vXG4gIC8vIEVWRU5UIExJU1RFTkVSU1xuICAvL1xuXG5cbiAgdmFyIGFkZExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcbiAgICBpZiAoIXN0YXRlLmFjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gVGhlcmUgY2FuIGJlIG9ubHkgb25lIGxpc3RlbmluZyBmb2N1cyB0cmFwIGF0IGEgdGltZVxuXG5cbiAgICBhY3RpdmVGb2N1c1RyYXBzLmFjdGl2YXRlVHJhcCh0cmFwKTsgLy8gRGVsYXkgZW5zdXJlcyB0aGF0IHRoZSBmb2N1c2VkIGVsZW1lbnQgZG9lc24ndCBjYXB0dXJlIHRoZSBldmVudFxuICAgIC8vIHRoYXQgY2F1c2VkIHRoZSBmb2N1cyB0cmFwIGFjdGl2YXRpb24uXG5cbiAgICBzdGF0ZS5kZWxheUluaXRpYWxGb2N1c1RpbWVyID0gY29uZmlnLmRlbGF5SW5pdGlhbEZvY3VzID8gZGVsYXkoZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5Rm9jdXMoZ2V0SW5pdGlhbEZvY3VzTm9kZSgpKTtcbiAgICB9KSA6IHRyeUZvY3VzKGdldEluaXRpYWxGb2N1c05vZGUoKSk7XG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCBjaGVja0ZvY3VzSW4sIHRydWUpO1xuICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBjaGVja1BvaW50ZXJEb3duLCB7XG4gICAgICBjYXB0dXJlOiB0cnVlLFxuICAgICAgcGFzc2l2ZTogZmFsc2VcbiAgICB9KTtcbiAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGNoZWNrUG9pbnRlckRvd24sIHtcbiAgICAgIGNhcHR1cmU6IHRydWUsXG4gICAgICBwYXNzaXZlOiBmYWxzZVxuICAgIH0pO1xuICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQ2xpY2ssIHtcbiAgICAgIGNhcHR1cmU6IHRydWUsXG4gICAgICBwYXNzaXZlOiBmYWxzZVxuICAgIH0pO1xuICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgY2hlY2tLZXksIHtcbiAgICAgIGNhcHR1cmU6IHRydWUsXG4gICAgICBwYXNzaXZlOiBmYWxzZVxuICAgIH0pO1xuICAgIHJldHVybiB0cmFwO1xuICB9O1xuXG4gIHZhciByZW1vdmVMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKCFzdGF0ZS5hY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIGNoZWNrRm9jdXNJbiwgdHJ1ZSk7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGNoZWNrUG9pbnRlckRvd24sIHRydWUpO1xuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgY2hlY2tQb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tDbGljaywgdHJ1ZSk7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjaGVja0tleSwgdHJ1ZSk7XG4gICAgcmV0dXJuIHRyYXA7XG4gIH07IC8vXG4gIC8vIFRSQVAgREVGSU5JVElPTlxuICAvL1xuXG5cbiAgdHJhcCA9IHtcbiAgICBnZXQgYWN0aXZlKCkge1xuICAgICAgcmV0dXJuIHN0YXRlLmFjdGl2ZTtcbiAgICB9LFxuXG4gICAgZ2V0IHBhdXNlZCgpIHtcbiAgICAgIHJldHVybiBzdGF0ZS5wYXVzZWQ7XG4gICAgfSxcblxuICAgIGFjdGl2YXRlOiBmdW5jdGlvbiBhY3RpdmF0ZShhY3RpdmF0ZU9wdGlvbnMpIHtcbiAgICAgIGlmIChzdGF0ZS5hY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHZhciBvbkFjdGl2YXRlID0gZ2V0T3B0aW9uKGFjdGl2YXRlT3B0aW9ucywgJ29uQWN0aXZhdGUnKTtcbiAgICAgIHZhciBvblBvc3RBY3RpdmF0ZSA9IGdldE9wdGlvbihhY3RpdmF0ZU9wdGlvbnMsICdvblBvc3RBY3RpdmF0ZScpO1xuICAgICAgdmFyIGNoZWNrQ2FuRm9jdXNUcmFwID0gZ2V0T3B0aW9uKGFjdGl2YXRlT3B0aW9ucywgJ2NoZWNrQ2FuRm9jdXNUcmFwJyk7XG5cbiAgICAgIGlmICghY2hlY2tDYW5Gb2N1c1RyYXApIHtcbiAgICAgICAgdXBkYXRlVGFiYmFibGVOb2RlcygpO1xuICAgICAgfVxuXG4gICAgICBzdGF0ZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgc3RhdGUucGF1c2VkID0gZmFsc2U7XG4gICAgICBzdGF0ZS5ub2RlRm9jdXNlZEJlZm9yZUFjdGl2YXRpb24gPSBkb2MuYWN0aXZlRWxlbWVudDtcblxuICAgICAgaWYgKG9uQWN0aXZhdGUpIHtcbiAgICAgICAgb25BY3RpdmF0ZSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZmluaXNoQWN0aXZhdGlvbiA9IGZ1bmN0aW9uIGZpbmlzaEFjdGl2YXRpb24oKSB7XG4gICAgICAgIGlmIChjaGVja0NhbkZvY3VzVHJhcCkge1xuICAgICAgICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZExpc3RlbmVycygpO1xuXG4gICAgICAgIGlmIChvblBvc3RBY3RpdmF0ZSkge1xuICAgICAgICAgIG9uUG9zdEFjdGl2YXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmIChjaGVja0NhbkZvY3VzVHJhcCkge1xuICAgICAgICBjaGVja0NhbkZvY3VzVHJhcChzdGF0ZS5jb250YWluZXJzLmNvbmNhdCgpKS50aGVuKGZpbmlzaEFjdGl2YXRpb24sIGZpbmlzaEFjdGl2YXRpb24pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgZmluaXNoQWN0aXZhdGlvbigpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbiBkZWFjdGl2YXRlKGRlYWN0aXZhdGVPcHRpb25zKSB7XG4gICAgICBpZiAoIXN0YXRlLmFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgdmFyIG9wdGlvbnMgPSBfb2JqZWN0U3ByZWFkMih7XG4gICAgICAgIG9uRGVhY3RpdmF0ZTogY29uZmlnLm9uRGVhY3RpdmF0ZSxcbiAgICAgICAgb25Qb3N0RGVhY3RpdmF0ZTogY29uZmlnLm9uUG9zdERlYWN0aXZhdGUsXG4gICAgICAgIGNoZWNrQ2FuUmV0dXJuRm9jdXM6IGNvbmZpZy5jaGVja0NhblJldHVybkZvY3VzXG4gICAgICB9LCBkZWFjdGl2YXRlT3B0aW9ucyk7XG5cbiAgICAgIGNsZWFyVGltZW91dChzdGF0ZS5kZWxheUluaXRpYWxGb2N1c1RpbWVyKTsgLy8gbm9vcCBpZiB1bmRlZmluZWRcblxuICAgICAgc3RhdGUuZGVsYXlJbml0aWFsRm9jdXNUaW1lciA9IHVuZGVmaW5lZDtcbiAgICAgIHJlbW92ZUxpc3RlbmVycygpO1xuICAgICAgc3RhdGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICBzdGF0ZS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgIGFjdGl2ZUZvY3VzVHJhcHMuZGVhY3RpdmF0ZVRyYXAodHJhcCk7XG4gICAgICB2YXIgb25EZWFjdGl2YXRlID0gZ2V0T3B0aW9uKG9wdGlvbnMsICdvbkRlYWN0aXZhdGUnKTtcbiAgICAgIHZhciBvblBvc3REZWFjdGl2YXRlID0gZ2V0T3B0aW9uKG9wdGlvbnMsICdvblBvc3REZWFjdGl2YXRlJyk7XG4gICAgICB2YXIgY2hlY2tDYW5SZXR1cm5Gb2N1cyA9IGdldE9wdGlvbihvcHRpb25zLCAnY2hlY2tDYW5SZXR1cm5Gb2N1cycpO1xuICAgICAgdmFyIHJldHVybkZvY3VzID0gZ2V0T3B0aW9uKG9wdGlvbnMsICdyZXR1cm5Gb2N1cycsICdyZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZScpO1xuXG4gICAgICBpZiAob25EZWFjdGl2YXRlKSB7XG4gICAgICAgIG9uRGVhY3RpdmF0ZSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZmluaXNoRGVhY3RpdmF0aW9uID0gZnVuY3Rpb24gZmluaXNoRGVhY3RpdmF0aW9uKCkge1xuICAgICAgICBkZWxheShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHJldHVybkZvY3VzKSB7XG4gICAgICAgICAgICB0cnlGb2N1cyhnZXRSZXR1cm5Gb2N1c05vZGUoc3RhdGUubm9kZUZvY3VzZWRCZWZvcmVBY3RpdmF0aW9uKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG9uUG9zdERlYWN0aXZhdGUpIHtcbiAgICAgICAgICAgIG9uUG9zdERlYWN0aXZhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgaWYgKHJldHVybkZvY3VzICYmIGNoZWNrQ2FuUmV0dXJuRm9jdXMpIHtcbiAgICAgICAgY2hlY2tDYW5SZXR1cm5Gb2N1cyhnZXRSZXR1cm5Gb2N1c05vZGUoc3RhdGUubm9kZUZvY3VzZWRCZWZvcmVBY3RpdmF0aW9uKSkudGhlbihmaW5pc2hEZWFjdGl2YXRpb24sIGZpbmlzaERlYWN0aXZhdGlvbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBmaW5pc2hEZWFjdGl2YXRpb24oKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgcGF1c2U6IGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgaWYgKHN0YXRlLnBhdXNlZCB8fCAhc3RhdGUuYWN0aXZlKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBzdGF0ZS5wYXVzZWQgPSB0cnVlO1xuICAgICAgcmVtb3ZlTGlzdGVuZXJzKCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIHVucGF1c2U6IGZ1bmN0aW9uIHVucGF1c2UoKSB7XG4gICAgICBpZiAoIXN0YXRlLnBhdXNlZCB8fCAhc3RhdGUuYWN0aXZlKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBzdGF0ZS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgIHVwZGF0ZVRhYmJhYmxlTm9kZXMoKTtcbiAgICAgIGFkZExpc3RlbmVycygpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICB1cGRhdGVDb250YWluZXJFbGVtZW50czogZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVyRWxlbWVudHMoY29udGFpbmVyRWxlbWVudHMpIHtcbiAgICAgIHZhciBlbGVtZW50c0FzQXJyYXkgPSBbXS5jb25jYXQoY29udGFpbmVyRWxlbWVudHMpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIHN0YXRlLmNvbnRhaW5lcnMgPSBlbGVtZW50c0FzQXJyYXkubWFwKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgPyBkb2MucXVlcnlTZWxlY3RvcihlbGVtZW50KSA6IGVsZW1lbnQ7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHN0YXRlLmFjdGl2ZSkge1xuICAgICAgICB1cGRhdGVUYWJiYWJsZU5vZGVzKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfTsgLy8gaW5pdGlhbGl6ZSBjb250YWluZXIgZWxlbWVudHNcblxuICB0cmFwLnVwZGF0ZUNvbnRhaW5lckVsZW1lbnRzKGVsZW1lbnRzKTtcbiAgcmV0dXJuIHRyYXA7XG59O1xuXG5leHBvcnRzLmNyZWF0ZUZvY3VzVHJhcCA9IGNyZWF0ZUZvY3VzVHJhcDtcblxuXG59LHtcInRhYmJhYmxlXCI6NX1dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNsYXNzOiByZXF1aXJlKCcuL2xpYi9jbGFzcycpXG59O1xuXG59LHtcIi4vbGliL2NsYXNzXCI6NH1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLyoqXG4gKiBGcm9tIGpRdWVyeVxuICovXG5mdW5jdGlvbiBzdHJpcEFuZENvbGxhcHNlKHZhbHVlKSB7XG4gIGNvbnN0IHRva2VucyA9IHZhbHVlLm1hdGNoKC9bXlxceDIwXFx0XFxyXFxuXFxmXSsvZykgfHwgW107XG4gIHJldHVybiB0b2tlbnMuam9pbignICcpO1xufVxuXG4vKipcbiAqIEZyb20galF1ZXJ5XG4gKi9cbmZ1bmN0aW9uIGdldENsYXNzKGVsZW0pIHtcbiAgcmV0dXJuIGVsZW0uZ2V0QXR0cmlidXRlICYmIGVsZW0uZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICBoYXNDbGFzczogZnVuY3Rpb24oZWxlbSwgc2VsZWN0b3IpIHtcbiAgICBjb25zdCBjbGFzc05hbWUgPScgJyArIHNlbGVjdG9yICsgJyAnO1xuICBcbiAgICBpZiAoZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoJyAnICsgc3RyaXBBbmRDb2xsYXBzZShnZXRDbGFzcyhlbGVtKSkgKyAnICcpLmluZGV4T2YoY2xhc3NOYW1lKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIFxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBhZGRDbGFzczogZnVuY3Rpb24gKGVsZW0sIGNsYXNzTmFtZSkge1xuXG4gICAgbGV0IGNsYXNzZXMgPSBzdHJpcEFuZENvbGxhcHNlKGdldENsYXNzKGVsZW0pKS5zcGxpdCgnICcpO1xuICBcbiAgICBpZiAoY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSkgPT09IC0xKSB7XG4gICAgICBjbGFzc2VzLnB1c2goY2xhc3NOYW1lKVxuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xhc3Nlcy5qb2luKCcgJykpXG4gICAgfVxuICBcbiAgfSxcbiAgXG4gIHJlbW92ZUNsYXNzOiBmdW5jdGlvbihlbGVtLCBjbGFzc05hbWUpIHtcbiAgXG4gICAgbGV0IGNsYXNzZXMgPSBzdHJpcEFuZENvbGxhcHNlKGdldENsYXNzKGVsZW0pKS5zcGxpdCgnICcpO1xuICAgIGNvbnN0IGluZGV4ID0gY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSk7XG4gIFxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBjbGFzc2VzLnNwbGljZShpbmRleCwgMSlcbiAgICAgIGVsZW0uc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzZXMuam9pbignICcpKVxuICAgIH1cbiAgfVxuXG59O1xuXG59LHt9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qIVxuKiB0YWJiYWJsZSA2LjAuMVxuKiBAbGljZW5zZSBNSVQsIGh0dHBzOi8vZ2l0aHViLmNvbS9mb2N1cy10cmFwL3RhYmJhYmxlL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiovXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBjYW5kaWRhdGVTZWxlY3RvcnMgPSBbJ2lucHV0JywgJ3NlbGVjdCcsICd0ZXh0YXJlYScsICdhW2hyZWZdJywgJ2J1dHRvbicsICdbdGFiaW5kZXhdOm5vdChzbG90KScsICdhdWRpb1tjb250cm9sc10nLCAndmlkZW9bY29udHJvbHNdJywgJ1tjb250ZW50ZWRpdGFibGVdOm5vdChbY29udGVudGVkaXRhYmxlPVwiZmFsc2VcIl0pJywgJ2RldGFpbHM+c3VtbWFyeTpmaXJzdC1vZi10eXBlJywgJ2RldGFpbHMnXTtcbnZhciBjYW5kaWRhdGVTZWxlY3RvciA9IC8qICNfX1BVUkVfXyAqL2NhbmRpZGF0ZVNlbGVjdG9ycy5qb2luKCcsJyk7XG52YXIgTm9FbGVtZW50ID0gdHlwZW9mIEVsZW1lbnQgPT09ICd1bmRlZmluZWQnO1xudmFyIG1hdGNoZXMgPSBOb0VsZW1lbnQgPyBmdW5jdGlvbiAoKSB7fSA6IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHwgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xudmFyIGdldFJvb3ROb2RlID0gIU5vRWxlbWVudCAmJiBFbGVtZW50LnByb3RvdHlwZS5nZXRSb290Tm9kZSA/IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50LmdldFJvb3ROb2RlKCk7XG59IDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQub3duZXJEb2N1bWVudDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbCBjb250YWluZXIgdG8gY2hlY2sgaW5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZUNvbnRhaW5lciBhZGQgY29udGFpbmVyIHRvIGNoZWNrXG4gKiBAcGFyYW0geyhub2RlOiBFbGVtZW50KSA9PiBib29sZWFufSBmaWx0ZXIgZmlsdGVyIGNhbmRpZGF0ZXNcbiAqIEByZXR1cm5zIHtFbGVtZW50W119XG4gKi9cbnZhciBnZXRDYW5kaWRhdGVzID0gZnVuY3Rpb24gZ2V0Q2FuZGlkYXRlcyhlbCwgaW5jbHVkZUNvbnRhaW5lciwgZmlsdGVyKSB7XG4gIHZhciBjYW5kaWRhdGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGVsLnF1ZXJ5U2VsZWN0b3JBbGwoY2FuZGlkYXRlU2VsZWN0b3IpKTtcbiAgaWYgKGluY2x1ZGVDb250YWluZXIgJiYgbWF0Y2hlcy5jYWxsKGVsLCBjYW5kaWRhdGVTZWxlY3RvcikpIHtcbiAgICBjYW5kaWRhdGVzLnVuc2hpZnQoZWwpO1xuICB9XG4gIGNhbmRpZGF0ZXMgPSBjYW5kaWRhdGVzLmZpbHRlcihmaWx0ZXIpO1xuICByZXR1cm4gY2FuZGlkYXRlcztcbn07XG5cbi8qKlxuICogQGNhbGxiYWNrIEdldFNoYWRvd1Jvb3RcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCB0byBjaGVjayBmb3Igc2hhZG93IHJvb3RcbiAqIEByZXR1cm5zIHtTaGFkb3dSb290fGJvb2xlYW59IFNoYWRvd1Jvb3QgaWYgYXZhaWxhYmxlIG9yIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBhIHNoYWRvd1Jvb3QgaXMgYXR0YWNoZWQgYnV0IG5vdCBhdmFpbGFibGUuXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgU2hhZG93Um9vdEZpbHRlclxuICogQHBhcmFtIHtFbGVtZW50fSBzaGFkb3dIb3N0Tm9kZSB0aGUgZWxlbWVudCB3aGljaCBjb250YWlucyBzaGFkb3cgY29udGVudFxuICogQHJldHVybnMge2Jvb2xlYW59IHRydWUgaWYgYSBzaGFkb3cgcm9vdCBjb3VsZCBwb3RlbnRpYWxseSBjb250YWluIHZhbGlkIGNhbmRpZGF0ZXMuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDYW5kaWRhdGVTY29wZVxuICogQHByb3BlcnR5IHtFbGVtZW50fSBzY29wZVBhcmVudCBjb250YWlucyBpbm5lciBjYW5kaWRhdGVzXG4gKiBAcHJvcGVydHkge0VsZW1lbnRbXX0gY2FuZGlkYXRlcyBsaXN0IG9mIGNhbmRpZGF0ZXMgZm91bmQgaW4gdGhlIHNjb3BlIHBhcmVudFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gSXRlcmF0aXZlT3B0aW9uc1xuICogQHByb3BlcnR5IHtHZXRTaGFkb3dSb290fGJvb2xlYW59IGdldFNoYWRvd1Jvb3QgdHJ1ZSBpZiBzaGFkb3cgc3VwcG9ydCBpcyBlbmFibGVkOyBmYWxzeSBpZiBub3Q7XG4gKiAgaWYgYSBmdW5jdGlvbiwgaW1wbGllcyBzaGFkb3cgc3VwcG9ydCBpcyBlbmFibGVkIGFuZCBlaXRoZXIgcmV0dXJucyB0aGUgc2hhZG93IHJvb3Qgb2YgYW4gZWxlbWVudFxuICogIG9yIGEgYm9vbGVhbiBzdGF0aW5nIGlmIGl0IGhhcyBhbiB1bmRpc2Nsb3NlZCBzaGFkb3cgcm9vdFxuICogQHByb3BlcnR5IHsobm9kZTogRWxlbWVudCkgPT4gYm9vbGVhbn0gZmlsdGVyIGZpbHRlciBjYW5kaWRhdGVzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGZsYXR0ZW4gaWYgdHJ1ZSB0aGVuIHJlc3VsdCB3aWxsIGZsYXR0ZW4gYW55IENhbmRpZGF0ZVNjb3BlIGludG8gdGhlIHJldHVybmVkIGxpc3RcbiAqIEBwcm9wZXJ0eSB7U2hhZG93Um9vdEZpbHRlcn0gc2hhZG93Um9vdEZpbHRlciBmaWx0ZXIgc2hhZG93IHJvb3RzO1xuICovXG5cbi8qKlxuICogQHBhcmFtIHtFbGVtZW50W119IGVsZW1lbnRzIGxpc3Qgb2YgZWxlbWVudCBjb250YWluZXJzIHRvIG1hdGNoIGNhbmRpZGF0ZXMgZnJvbVxuICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQ29udGFpbmVyIGFkZCBjb250YWluZXIgbGlzdCB0byBjaGVja1xuICogQHBhcmFtIHtJdGVyYXRpdmVPcHRpb25zfSBvcHRpb25zXG4gKiBAcmV0dXJucyB7QXJyYXkuPEVsZW1lbnR8Q2FuZGlkYXRlU2NvcGU+fVxuICovXG52YXIgZ2V0Q2FuZGlkYXRlc0l0ZXJhdGl2ZWx5ID0gZnVuY3Rpb24gZ2V0Q2FuZGlkYXRlc0l0ZXJhdGl2ZWx5KGVsZW1lbnRzLCBpbmNsdWRlQ29udGFpbmVyLCBvcHRpb25zKSB7XG4gIHZhciBjYW5kaWRhdGVzID0gW107XG4gIHZhciBlbGVtZW50c1RvQ2hlY2sgPSBBcnJheS5mcm9tKGVsZW1lbnRzKTtcbiAgd2hpbGUgKGVsZW1lbnRzVG9DaGVjay5sZW5ndGgpIHtcbiAgICB2YXIgZWxlbWVudCA9IGVsZW1lbnRzVG9DaGVjay5zaGlmdCgpO1xuICAgIGlmIChlbGVtZW50LnRhZ05hbWUgPT09ICdTTE9UJykge1xuICAgICAgLy8gYWRkIHNoYWRvdyBkb20gc2xvdCBzY29wZSAoc2xvdCBpdHNlbGYgY2Fubm90IGJlIGZvY3VzYWJsZSlcbiAgICAgIHZhciBhc3NpZ25lZCA9IGVsZW1lbnQuYXNzaWduZWRFbGVtZW50cygpO1xuICAgICAgdmFyIGNvbnRlbnQgPSBhc3NpZ25lZC5sZW5ndGggPyBhc3NpZ25lZCA6IGVsZW1lbnQuY2hpbGRyZW47XG4gICAgICB2YXIgbmVzdGVkQ2FuZGlkYXRlcyA9IGdldENhbmRpZGF0ZXNJdGVyYXRpdmVseShjb250ZW50LCB0cnVlLCBvcHRpb25zKTtcbiAgICAgIGlmIChvcHRpb25zLmZsYXR0ZW4pIHtcbiAgICAgICAgY2FuZGlkYXRlcy5wdXNoLmFwcGx5KGNhbmRpZGF0ZXMsIG5lc3RlZENhbmRpZGF0ZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FuZGlkYXRlcy5wdXNoKHtcbiAgICAgICAgICBzY29wZVBhcmVudDogZWxlbWVudCxcbiAgICAgICAgICBjYW5kaWRhdGVzOiBuZXN0ZWRDYW5kaWRhdGVzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjaGVjayBjYW5kaWRhdGUgZWxlbWVudFxuICAgICAgdmFyIHZhbGlkQ2FuZGlkYXRlID0gbWF0Y2hlcy5jYWxsKGVsZW1lbnQsIGNhbmRpZGF0ZVNlbGVjdG9yKTtcbiAgICAgIGlmICh2YWxpZENhbmRpZGF0ZSAmJiBvcHRpb25zLmZpbHRlcihlbGVtZW50KSAmJiAoaW5jbHVkZUNvbnRhaW5lciB8fCAhZWxlbWVudHMuaW5jbHVkZXMoZWxlbWVudCkpKSB7XG4gICAgICAgIGNhbmRpZGF0ZXMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgLy8gaXRlcmF0ZSBvdmVyIHNoYWRvdyBjb250ZW50IGlmIHBvc3NpYmxlXG4gICAgICB2YXIgc2hhZG93Um9vdCA9IGVsZW1lbnQuc2hhZG93Um9vdCB8fFxuICAgICAgLy8gY2hlY2sgZm9yIGFuIHVuZGlzY2xvc2VkIHNoYWRvd1xuICAgICAgdHlwZW9mIG9wdGlvbnMuZ2V0U2hhZG93Um9vdCA9PT0gJ2Z1bmN0aW9uJyAmJiBvcHRpb25zLmdldFNoYWRvd1Jvb3QoZWxlbWVudCk7XG4gICAgICB2YXIgdmFsaWRTaGFkb3dSb290ID0gIW9wdGlvbnMuc2hhZG93Um9vdEZpbHRlciB8fCBvcHRpb25zLnNoYWRvd1Jvb3RGaWx0ZXIoZWxlbWVudCk7XG4gICAgICBpZiAoc2hhZG93Um9vdCAmJiB2YWxpZFNoYWRvd1Jvb3QpIHtcbiAgICAgICAgLy8gYWRkIHNoYWRvdyBkb20gc2NvcGUgSUlGIGEgc2hhZG93IHJvb3Qgbm9kZSB3YXMgZ2l2ZW47IG90aGVyd2lzZSwgYW4gdW5kaXNjbG9zZWRcbiAgICAgICAgLy8gIHNoYWRvdyBleGlzdHMsIHNvIGxvb2sgYXQgbGlnaHQgZG9tIGNoaWxkcmVuIGFzIGZhbGxiYWNrIEJVVCBjcmVhdGUgYSBzY29wZSBmb3IgYW55XG4gICAgICAgIC8vICBjaGlsZCBjYW5kaWRhdGVzIGZvdW5kIGJlY2F1c2UgdGhleSdyZSBsaWtlbHkgc2xvdHRlZCBlbGVtZW50cyAoZWxlbWVudHMgdGhhdCBhcmVcbiAgICAgICAgLy8gIGNoaWxkcmVuIG9mIHRoZSB3ZWIgY29tcG9uZW50IGVsZW1lbnQgKHdoaWNoIGhhcyB0aGUgc2hhZG93KSwgaW4gdGhlIGxpZ2h0IGRvbSwgYnV0XG4gICAgICAgIC8vICBzbG90dGVkIHNvbWV3aGVyZSBfaW5zaWRlXyB0aGUgdW5kaXNjbG9zZWQgc2hhZG93KSAtLSB0aGUgc2NvcGUgaXMgY3JlYXRlZCBiZWxvdyxcbiAgICAgICAgLy8gIF9hZnRlcl8gd2UgcmV0dXJuIGZyb20gdGhpcyByZWN1cnNpdmUgY2FsbFxuICAgICAgICB2YXIgX25lc3RlZENhbmRpZGF0ZXMgPSBnZXRDYW5kaWRhdGVzSXRlcmF0aXZlbHkoc2hhZG93Um9vdCA9PT0gdHJ1ZSA/IGVsZW1lbnQuY2hpbGRyZW4gOiBzaGFkb3dSb290LmNoaWxkcmVuLCB0cnVlLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZmxhdHRlbikge1xuICAgICAgICAgIGNhbmRpZGF0ZXMucHVzaC5hcHBseShjYW5kaWRhdGVzLCBfbmVzdGVkQ2FuZGlkYXRlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FuZGlkYXRlcy5wdXNoKHtcbiAgICAgICAgICAgIHNjb3BlUGFyZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgY2FuZGlkYXRlczogX25lc3RlZENhbmRpZGF0ZXNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhlcmUncyBub3Qgc2hhZG93IHNvIGp1c3QgZGlnIGludG8gdGhlIGVsZW1lbnQncyAobGlnaHQgZG9tKSBjaGlsZHJlblxuICAgICAgICAvLyAgX193aXRob3V0X18gZ2l2aW5nIHRoZSBlbGVtZW50IHNwZWNpYWwgc2NvcGUgdHJlYXRtZW50XG4gICAgICAgIGVsZW1lbnRzVG9DaGVjay51bnNoaWZ0LmFwcGx5KGVsZW1lbnRzVG9DaGVjaywgZWxlbWVudC5jaGlsZHJlbik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjYW5kaWRhdGVzO1xufTtcbnZhciBnZXRUYWJpbmRleCA9IGZ1bmN0aW9uIGdldFRhYmluZGV4KG5vZGUsIGlzU2NvcGUpIHtcbiAgaWYgKG5vZGUudGFiSW5kZXggPCAwKSB7XG4gICAgLy8gaW4gQ2hyb21lLCA8ZGV0YWlscy8+LCA8YXVkaW8gY29udHJvbHMvPiBhbmQgPHZpZGVvIGNvbnRyb2xzLz4gZWxlbWVudHMgZ2V0IGEgZGVmYXVsdFxuICAgIC8vIGB0YWJJbmRleGAgb2YgLTEgd2hlbiB0aGUgJ3RhYmluZGV4JyBhdHRyaWJ1dGUgaXNuJ3Qgc3BlY2lmaWVkIGluIHRoZSBET00sXG4gICAgLy8geWV0IHRoZXkgYXJlIHN0aWxsIHBhcnQgb2YgdGhlIHJlZ3VsYXIgdGFiIG9yZGVyOyBpbiBGRiwgdGhleSBnZXQgYSBkZWZhdWx0XG4gICAgLy8gYHRhYkluZGV4YCBvZiAwOyBzaW5jZSBDaHJvbWUgc3RpbGwgcHV0cyB0aG9zZSBlbGVtZW50cyBpbiB0aGUgcmVndWxhciB0YWJcbiAgICAvLyBvcmRlciwgY29uc2lkZXIgdGhlaXIgdGFiIGluZGV4IHRvIGJlIDAuXG4gICAgLy8gQWxzbyBicm93c2VycyBkbyBub3QgcmV0dXJuIGB0YWJJbmRleGAgY29ycmVjdGx5IGZvciBjb250ZW50RWRpdGFibGUgbm9kZXM7XG4gICAgLy8gc28gaWYgdGhleSBkb24ndCBoYXZlIGEgdGFiaW5kZXggYXR0cmlidXRlIHNwZWNpZmljYWxseSBzZXQsIGFzc3VtZSBpdCdzIDAuXG4gICAgLy9cbiAgICAvLyBpc1Njb3BlIGlzIHBvc2l0aXZlIGZvciBjdXN0b20gZWxlbWVudCB3aXRoIHNoYWRvdyByb290IG9yIHNsb3QgdGhhdCBieSBkZWZhdWx0XG4gICAgLy8gaGF2ZSB0YWJJbmRleCAtMSwgYnV0IG5lZWQgdG8gYmUgc29ydGVkIGJ5IGRvY3VtZW50IG9yZGVyIGluIG9yZGVyIGZvciB0aGVpclxuICAgIC8vIGNvbnRlbnQgdG8gYmUgaW5zZXJ0ZWQgaW4gdGhlIGNvcnJlY3QgcG9zaXRpb25cbiAgICBpZiAoKGlzU2NvcGUgfHwgL14oQVVESU98VklERU98REVUQUlMUykkLy50ZXN0KG5vZGUudGFnTmFtZSkgfHwgbm9kZS5pc0NvbnRlbnRFZGl0YWJsZSkgJiYgaXNOYU4ocGFyc2VJbnQobm9kZS5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JyksIDEwKSkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbm9kZS50YWJJbmRleDtcbn07XG52YXIgc29ydE9yZGVyZWRUYWJiYWJsZXMgPSBmdW5jdGlvbiBzb3J0T3JkZXJlZFRhYmJhYmxlcyhhLCBiKSB7XG4gIHJldHVybiBhLnRhYkluZGV4ID09PSBiLnRhYkluZGV4ID8gYS5kb2N1bWVudE9yZGVyIC0gYi5kb2N1bWVudE9yZGVyIDogYS50YWJJbmRleCAtIGIudGFiSW5kZXg7XG59O1xudmFyIGlzSW5wdXQgPSBmdW5jdGlvbiBpc0lucHV0KG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUudGFnTmFtZSA9PT0gJ0lOUFVUJztcbn07XG52YXIgaXNIaWRkZW5JbnB1dCA9IGZ1bmN0aW9uIGlzSGlkZGVuSW5wdXQobm9kZSkge1xuICByZXR1cm4gaXNJbnB1dChub2RlKSAmJiBub2RlLnR5cGUgPT09ICdoaWRkZW4nO1xufTtcbnZhciBpc0RldGFpbHNXaXRoU3VtbWFyeSA9IGZ1bmN0aW9uIGlzRGV0YWlsc1dpdGhTdW1tYXJ5KG5vZGUpIHtcbiAgdmFyIHIgPSBub2RlLnRhZ05hbWUgPT09ICdERVRBSUxTJyAmJiBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkobm9kZS5jaGlsZHJlbikuc29tZShmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICByZXR1cm4gY2hpbGQudGFnTmFtZSA9PT0gJ1NVTU1BUlknO1xuICB9KTtcbiAgcmV0dXJuIHI7XG59O1xudmFyIGdldENoZWNrZWRSYWRpbyA9IGZ1bmN0aW9uIGdldENoZWNrZWRSYWRpbyhub2RlcywgZm9ybSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG5vZGVzW2ldLmNoZWNrZWQgJiYgbm9kZXNbaV0uZm9ybSA9PT0gZm9ybSkge1xuICAgICAgcmV0dXJuIG5vZGVzW2ldO1xuICAgIH1cbiAgfVxufTtcbnZhciBpc1RhYmJhYmxlUmFkaW8gPSBmdW5jdGlvbiBpc1RhYmJhYmxlUmFkaW8obm9kZSkge1xuICBpZiAoIW5vZGUubmFtZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciByYWRpb1Njb3BlID0gbm9kZS5mb3JtIHx8IGdldFJvb3ROb2RlKG5vZGUpO1xuICB2YXIgcXVlcnlSYWRpb3MgPSBmdW5jdGlvbiBxdWVyeVJhZGlvcyhuYW1lKSB7XG4gICAgcmV0dXJuIHJhZGlvU2NvcGUucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdW25hbWU9XCInICsgbmFtZSArICdcIl0nKTtcbiAgfTtcbiAgdmFyIHJhZGlvU2V0O1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5DU1MgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuQ1NTLmVzY2FwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJhZGlvU2V0ID0gcXVlcnlSYWRpb3Mod2luZG93LkNTUy5lc2NhcGUobm9kZS5uYW1lKSk7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIHJhZGlvU2V0ID0gcXVlcnlSYWRpb3Mobm9kZS5uYW1lKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLmVycm9yKCdMb29rcyBsaWtlIHlvdSBoYXZlIGEgcmFkaW8gYnV0dG9uIHdpdGggYSBuYW1lIGF0dHJpYnV0ZSBjb250YWluaW5nIGludmFsaWQgQ1NTIHNlbGVjdG9yIGNoYXJhY3RlcnMgYW5kIG5lZWQgdGhlIENTUy5lc2NhcGUgcG9seWZpbGw6ICVzJywgZXJyLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICB2YXIgY2hlY2tlZCA9IGdldENoZWNrZWRSYWRpbyhyYWRpb1NldCwgbm9kZS5mb3JtKTtcbiAgcmV0dXJuICFjaGVja2VkIHx8IGNoZWNrZWQgPT09IG5vZGU7XG59O1xudmFyIGlzUmFkaW8gPSBmdW5jdGlvbiBpc1JhZGlvKG5vZGUpIHtcbiAgcmV0dXJuIGlzSW5wdXQobm9kZSkgJiYgbm9kZS50eXBlID09PSAncmFkaW8nO1xufTtcbnZhciBpc05vblRhYmJhYmxlUmFkaW8gPSBmdW5jdGlvbiBpc05vblRhYmJhYmxlUmFkaW8obm9kZSkge1xuICByZXR1cm4gaXNSYWRpbyhub2RlKSAmJiAhaXNUYWJiYWJsZVJhZGlvKG5vZGUpO1xufTtcblxuLy8gZGV0ZXJtaW5lcyBpZiBhIG5vZGUgaXMgdWx0aW1hdGVseSBhdHRhY2hlZCB0byB0aGUgd2luZG93J3MgZG9jdW1lbnRcbnZhciBpc05vZGVBdHRhY2hlZCA9IGZ1bmN0aW9uIGlzTm9kZUF0dGFjaGVkKG5vZGUpIHtcbiAgdmFyIF9ub2RlUm9vdEhvc3Q7XG4gIC8vIFRoZSByb290IG5vZGUgaXMgdGhlIHNoYWRvdyByb290IGlmIHRoZSBub2RlIGlzIGluIGEgc2hhZG93IERPTTsgc29tZSBkb2N1bWVudCBvdGhlcndpc2VcbiAgLy8gIChidXQgTk9UIF90aGVfIGRvY3VtZW50OyBzZWUgc2Vjb25kICdJZicgY29tbWVudCBiZWxvdyBmb3IgbW9yZSkuXG4gIC8vIElmIHJvb3ROb2RlIGlzIHNoYWRvdyByb290LCBpdCdsbCBoYXZlIGEgaG9zdCwgd2hpY2ggaXMgdGhlIGVsZW1lbnQgdG8gd2hpY2ggdGhlIHNoYWRvd1xuICAvLyAgaXMgYXR0YWNoZWQsIGFuZCB0aGUgb25lIHdlIG5lZWQgdG8gY2hlY2sgaWYgaXQncyBpbiB0aGUgZG9jdW1lbnQgb3Igbm90IChiZWNhdXNlIHRoZVxuICAvLyAgc2hhZG93LCBhbmQgYWxsIG5vZGVzIGl0IGNvbnRhaW5zLCBpcyBuZXZlciBjb25zaWRlcmVkIGluIHRoZSBkb2N1bWVudCBzaW5jZSBzaGFkb3dzXG4gIC8vICBiZWhhdmUgbGlrZSBzZWxmLWNvbnRhaW5lZCBET01zOyBidXQgaWYgdGhlIHNoYWRvdydzIEhPU1QsIHdoaWNoIGlzIHBhcnQgb2YgdGhlIGRvY3VtZW50LFxuICAvLyAgaXMgaGlkZGVuLCBvciBpcyBub3QgaW4gdGhlIGRvY3VtZW50IGl0c2VsZiBidXQgaXMgZGV0YWNoZWQsIGl0IHdpbGwgYWZmZWN0IHRoZSBzaGFkb3cnc1xuICAvLyAgdmlzaWJpbGl0eSwgaW5jbHVkaW5nIGFsbCB0aGUgbm9kZXMgaXQgY29udGFpbnMpLiBUaGUgaG9zdCBjb3VsZCBiZSBhbnkgbm9ybWFsIG5vZGUsXG4gIC8vICBvciBhIGN1c3RvbSBlbGVtZW50IChpLmUuIHdlYiBjb21wb25lbnQpLiBFaXRoZXIgd2F5LCB0aGF0J3MgdGhlIG9uZSB0aGF0IGlzIGNvbnNpZGVyZWRcbiAgLy8gIHBhcnQgb2YgdGhlIGRvY3VtZW50LCBub3QgdGhlIHNoYWRvdyByb290LCBub3IgYW55IG9mIGl0cyBjaGlsZHJlbiAoaS5lLiB0aGUgbm9kZSBiZWluZ1xuICAvLyAgdGVzdGVkKS5cbiAgLy8gVG8gZnVydGhlciBjb21wbGljYXRlIHRoaW5ncywgd2UgaGF2ZSB0byBsb29rIGFsbCB0aGUgd2F5IHVwIHVudGlsIHdlIGZpbmQgYSBzaGFkb3cgSE9TVFxuICAvLyAgdGhhdCBpcyBhdHRhY2hlZCAob3IgZmluZCBub25lKSBiZWNhdXNlIHRoZSBub2RlIG1pZ2h0IGJlIGluIG5lc3RlZCBzaGFkb3dzLi4uXG4gIC8vIElmIHJvb3ROb2RlIGlzIG5vdCBhIHNoYWRvdyByb290LCBpdCB3b24ndCBoYXZlIGEgaG9zdCwgYW5kIHNvIHJvb3ROb2RlIHNob3VsZCBiZSB0aGVcbiAgLy8gIGRvY3VtZW50IChwZXIgdGhlIGRvY3MpIGFuZCB3aGlsZSBpdCdzIGEgRG9jdW1lbnQtdHlwZSBvYmplY3QsIHRoYXQgZG9jdW1lbnQgZG9lcyBub3RcbiAgLy8gIGFwcGVhciB0byBiZSB0aGUgc2FtZSBhcyB0aGUgbm9kZSdzIGBvd25lckRvY3VtZW50YCBmb3Igc29tZSByZWFzb24sIHNvIGl0J3Mgc2FmZXJcbiAgLy8gIHRvIGlnbm9yZSB0aGUgcm9vdE5vZGUgYXQgdGhpcyBwb2ludCwgYW5kIHVzZSBgbm9kZS5vd25lckRvY3VtZW50YC4gT3RoZXJ3aXNlLFxuICAvLyAgdXNpbmcgYHJvb3ROb2RlLmNvbnRhaW5zKG5vZGUpYCB3aWxsIF9hbHdheXNfIGJlIHRydWUgd2UnbGwgZ2V0IGZhbHNlLXBvc2l0aXZlcyB3aGVuXG4gIC8vICBub2RlIGlzIGFjdHVhbGx5IGRldGFjaGVkLlxuICB2YXIgbm9kZVJvb3RIb3N0ID0gZ2V0Um9vdE5vZGUobm9kZSkuaG9zdDtcbiAgdmFyIGF0dGFjaGVkID0gISEoKF9ub2RlUm9vdEhvc3QgPSBub2RlUm9vdEhvc3QpICE9PSBudWxsICYmIF9ub2RlUm9vdEhvc3QgIT09IHZvaWQgMCAmJiBfbm9kZVJvb3RIb3N0Lm93bmVyRG9jdW1lbnQuY29udGFpbnMobm9kZVJvb3RIb3N0KSB8fCBub2RlLm93bmVyRG9jdW1lbnQuY29udGFpbnMobm9kZSkpO1xuICB3aGlsZSAoIWF0dGFjaGVkICYmIG5vZGVSb290SG9zdCkge1xuICAgIHZhciBfbm9kZVJvb3RIb3N0MjtcbiAgICAvLyBzaW5jZSBpdCdzIG5vdCBhdHRhY2hlZCBhbmQgd2UgaGF2ZSBhIHJvb3QgaG9zdCwgdGhlIG5vZGUgTVVTVCBiZSBpbiBhIG5lc3RlZCBzaGFkb3cgRE9NLFxuICAgIC8vICB3aGljaCBtZWFucyB3ZSBuZWVkIHRvIGdldCB0aGUgaG9zdCdzIGhvc3QgYW5kIGNoZWNrIGlmIHRoYXQgcGFyZW50IGhvc3QgaXMgY29udGFpbmVkXG4gICAgLy8gIGluIChpLmUuIGF0dGFjaGVkIHRvKSB0aGUgZG9jdW1lbnRcbiAgICBub2RlUm9vdEhvc3QgPSBnZXRSb290Tm9kZShub2RlUm9vdEhvc3QpLmhvc3Q7XG4gICAgYXR0YWNoZWQgPSAhISgoX25vZGVSb290SG9zdDIgPSBub2RlUm9vdEhvc3QpICE9PSBudWxsICYmIF9ub2RlUm9vdEhvc3QyICE9PSB2b2lkIDAgJiYgX25vZGVSb290SG9zdDIub3duZXJEb2N1bWVudC5jb250YWlucyhub2RlUm9vdEhvc3QpKTtcbiAgfVxuICByZXR1cm4gYXR0YWNoZWQ7XG59O1xudmFyIGlzWmVyb0FyZWEgPSBmdW5jdGlvbiBpc1plcm9BcmVhKG5vZGUpIHtcbiAgdmFyIF9ub2RlJGdldEJvdW5kaW5nQ2xpZSA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgd2lkdGggPSBfbm9kZSRnZXRCb3VuZGluZ0NsaWUud2lkdGgsXG4gICAgaGVpZ2h0ID0gX25vZGUkZ2V0Qm91bmRpbmdDbGllLmhlaWdodDtcbiAgcmV0dXJuIHdpZHRoID09PSAwICYmIGhlaWdodCA9PT0gMDtcbn07XG52YXIgaXNIaWRkZW4gPSBmdW5jdGlvbiBpc0hpZGRlbihub2RlLCBfcmVmKSB7XG4gIHZhciBkaXNwbGF5Q2hlY2sgPSBfcmVmLmRpc3BsYXlDaGVjayxcbiAgICBnZXRTaGFkb3dSb290ID0gX3JlZi5nZXRTaGFkb3dSb290O1xuICAvLyBOT1RFOiB2aXNpYmlsaXR5IHdpbGwgYmUgYHVuZGVmaW5lZGAgaWYgbm9kZSBpcyBkZXRhY2hlZCBmcm9tIHRoZSBkb2N1bWVudFxuICAvLyAgKHNlZSBub3RlcyBhYm91dCB0aGlzIGZ1cnRoZXIgZG93biksIHdoaWNoIG1lYW5zIHdlIHdpbGwgY29uc2lkZXIgaXQgdmlzaWJsZVxuICAvLyAgKHRoaXMgaXMgbGVnYWN5IGJlaGF2aW9yIGZyb20gYSB2ZXJ5IGxvbmcgd2F5IGJhY2spXG4gIC8vIE5PVEU6IHdlIGNoZWNrIHRoaXMgcmVnYXJkbGVzcyBvZiBgZGlzcGxheUNoZWNrPVwibm9uZVwiYCBiZWNhdXNlIHRoaXMgaXMgYVxuICAvLyAgX3Zpc2liaWxpdHlfIGNoZWNrLCBub3QgYSBfZGlzcGxheV8gY2hlY2tcbiAgaWYgKGdldENvbXB1dGVkU3R5bGUobm9kZSkudmlzaWJpbGl0eSA9PT0gJ2hpZGRlbicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgaXNEaXJlY3RTdW1tYXJ5ID0gbWF0Y2hlcy5jYWxsKG5vZGUsICdkZXRhaWxzPnN1bW1hcnk6Zmlyc3Qtb2YtdHlwZScpO1xuICB2YXIgbm9kZVVuZGVyRGV0YWlscyA9IGlzRGlyZWN0U3VtbWFyeSA/IG5vZGUucGFyZW50RWxlbWVudCA6IG5vZGU7XG4gIGlmIChtYXRjaGVzLmNhbGwobm9kZVVuZGVyRGV0YWlscywgJ2RldGFpbHM6bm90KFtvcGVuXSkgKicpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCFkaXNwbGF5Q2hlY2sgfHwgZGlzcGxheUNoZWNrID09PSAnZnVsbCcgfHwgZGlzcGxheUNoZWNrID09PSAnbGVnYWN5LWZ1bGwnKSB7XG4gICAgaWYgKHR5cGVvZiBnZXRTaGFkb3dSb290ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBmaWd1cmUgb3V0IGlmIHdlIHNob3VsZCBjb25zaWRlciB0aGUgbm9kZSB0byBiZSBpbiBhbiB1bmRpc2Nsb3NlZCBzaGFkb3cgYW5kIHVzZSB0aGVcbiAgICAgIC8vICAnbm9uLXplcm8tYXJlYScgZmFsbGJhY2tcbiAgICAgIHZhciBvcmlnaW5hbE5vZGUgPSBub2RlO1xuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgdmFyIHBhcmVudEVsZW1lbnQgPSBub2RlLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHZhciByb290Tm9kZSA9IGdldFJvb3ROb2RlKG5vZGUpO1xuICAgICAgICBpZiAocGFyZW50RWxlbWVudCAmJiAhcGFyZW50RWxlbWVudC5zaGFkb3dSb290ICYmIGdldFNoYWRvd1Jvb3QocGFyZW50RWxlbWVudCkgPT09IHRydWUgLy8gY2hlY2sgaWYgdGhlcmUncyBhbiB1bmRpc2Nsb3NlZCBzaGFkb3dcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gbm9kZSBoYXMgYW4gdW5kaXNjbG9zZWQgc2hhZG93IHdoaWNoIG1lYW5zIHdlIGNhbiBvbmx5IHRyZWF0IGl0IGFzIGEgYmxhY2sgYm94LCBzbyB3ZVxuICAgICAgICAgIC8vICBmYWxsIGJhY2sgdG8gYSBub24temVyby1hcmVhIHRlc3RcbiAgICAgICAgICByZXR1cm4gaXNaZXJvQXJlYShub2RlKTtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLmFzc2lnbmVkU2xvdCkge1xuICAgICAgICAgIC8vIGl0ZXJhdGUgdXAgc2xvdFxuICAgICAgICAgIG5vZGUgPSBub2RlLmFzc2lnbmVkU2xvdDtcbiAgICAgICAgfSBlbHNlIGlmICghcGFyZW50RWxlbWVudCAmJiByb290Tm9kZSAhPT0gbm9kZS5vd25lckRvY3VtZW50KSB7XG4gICAgICAgICAgLy8gY3Jvc3Mgc2hhZG93IGJvdW5kYXJ5XG4gICAgICAgICAgbm9kZSA9IHJvb3ROb2RlLmhvc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaXRlcmF0ZSB1cCBub3JtYWwgZG9tXG4gICAgICAgICAgbm9kZSA9IHBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5vZGUgPSBvcmlnaW5hbE5vZGU7XG4gICAgfVxuICAgIC8vIGVsc2UsIGBnZXRTaGFkb3dSb290YCBtaWdodCBiZSB0cnVlLCBidXQgYWxsIHRoYXQgZG9lcyBpcyBlbmFibGUgc2hhZG93IERPTSBzdXBwb3J0XG4gICAgLy8gIChpLmUuIGl0IGRvZXMgbm90IGFsc28gcHJlc3VtZSB0aGF0IGFsbCBub2RlcyBtaWdodCBoYXZlIHVuZGlzY2xvc2VkIHNoYWRvd3MpOyBvclxuICAgIC8vICBpdCBtaWdodCBiZSBhIGZhbHN5IHZhbHVlLCB3aGljaCBtZWFucyBzaGFkb3cgRE9NIHN1cHBvcnQgaXMgZGlzYWJsZWRcblxuICAgIC8vIFNpbmNlIHdlIGRpZG4ndCBmaW5kIGl0IHNpdHRpbmcgaW4gYW4gdW5kaXNjbG9zZWQgc2hhZG93IChvciBzaGFkb3dzIGFyZSBkaXNhYmxlZClcbiAgICAvLyAgbm93IHdlIGNhbiBqdXN0IHRlc3QgdG8gc2VlIGlmIGl0IHdvdWxkIG5vcm1hbGx5IGJlIHZpc2libGUgb3Igbm90LCBwcm92aWRlZCBpdCdzXG4gICAgLy8gIGF0dGFjaGVkIHRvIHRoZSBtYWluIGRvY3VtZW50LlxuICAgIC8vIE5PVEU6IFdlIG11c3QgY29uc2lkZXIgY2FzZSB3aGVyZSBub2RlIGlzIGluc2lkZSBhIHNoYWRvdyBET00gYW5kIGdpdmVuIGRpcmVjdGx5IHRvXG4gICAgLy8gIGBpc1RhYmJhYmxlKClgIG9yIGBpc0ZvY3VzYWJsZSgpYCAtLSByZWdhcmRsZXNzIG9mIGBnZXRTaGFkb3dSb290YCBvcHRpb24gc2V0dGluZy5cblxuICAgIGlmIChpc05vZGVBdHRhY2hlZChub2RlKSkge1xuICAgICAgLy8gdGhpcyB3b3JrcyB3aGVyZXZlciB0aGUgbm9kZSBpczogaWYgdGhlcmUncyBhdCBsZWFzdCBvbmUgY2xpZW50IHJlY3QsIGl0J3NcbiAgICAgIC8vICBzb21laG93IGRpc3BsYXllZDsgaXQgYWxzbyBjb3ZlcnMgdGhlIENTUyAnZGlzcGxheTogY29udGVudHMnIGNhc2Ugd2hlcmUgdGhlXG4gICAgICAvLyAgbm9kZSBpdHNlbGYgaXMgaGlkZGVuIGluIHBsYWNlIG9mIGl0cyBjb250ZW50czsgYW5kIHRoZXJlJ3Mgbm8gbmVlZCB0byBzZWFyY2hcbiAgICAgIC8vICB1cCB0aGUgaGllcmFyY2h5IGVpdGhlclxuICAgICAgcmV0dXJuICFub2RlLmdldENsaWVudFJlY3RzKCkubGVuZ3RoO1xuICAgIH1cblxuICAgIC8vIEVsc2UsIHRoZSBub2RlIGlzbid0IGF0dGFjaGVkIHRvIHRoZSBkb2N1bWVudCwgd2hpY2ggbWVhbnMgdGhlIGBnZXRDbGllbnRSZWN0cygpYFxuICAgIC8vICBBUEkgd2lsbCBfX2Fsd2F5c19fIHJldHVybiB6ZXJvIHJlY3RzICh0aGlzIGNhbiBoYXBwZW4sIGZvciBleGFtcGxlLCBpZiBSZWFjdFxuICAgIC8vICBpcyB1c2VkIHRvIHJlbmRlciBub2RlcyBvbnRvIGEgZGV0YWNoZWQgdHJlZSwgYXMgY29uZmlybWVkIGluIHRoaXMgdGhyZWFkOlxuICAgIC8vICBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzkxMTcjaXNzdWVjb21tZW50LTI4NDIyODg3MClcbiAgICAvL1xuICAgIC8vIEl0IGFsc28gbWVhbnMgdGhhdCBldmVuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLmRpc3BsYXkgd2lsbCByZXR1cm4gYHVuZGVmaW5lZGBcbiAgICAvLyAgYmVjYXVzZSBzdHlsZXMgYXJlIG9ubHkgY29tcHV0ZWQgZm9yIG5vZGVzIHRoYXQgYXJlIGluIHRoZSBkb2N1bWVudC5cbiAgICAvL1xuICAgIC8vIE5PVEU6IFRISVMgSEFTIEJFRU4gVEhFIENBU0UgRk9SIFlFQVJTLiBJdCBpcyBub3QgbmV3LCBub3IgaXMgaXQgY2F1c2VkIGJ5IHRhYmJhYmxlXG4gICAgLy8gIHNvbWVob3cuIFRob3VnaCBpdCB3YXMgbmV2ZXIgc3RhdGVkIG9mZmljaWFsbHksIGFueW9uZSB3aG8gaGFzIGV2ZXIgdXNlZCB0YWJiYWJsZVxuICAgIC8vICBBUElzIG9uIG5vZGVzIGluIGRldGFjaGVkIGNvbnRhaW5lcnMgaGFzIGFjdHVhbGx5IGltcGxpY2l0bHkgdXNlZCB0YWJiYWJsZSBpbiB3aGF0XG4gICAgLy8gIHdhcyBsYXRlciAoYXMgb2YgdjUuMi4wIG9uIEFwciA5LCAyMDIxKSBjYWxsZWQgYGRpc3BsYXlDaGVjaz1cIm5vbmVcImAgbW9kZSAtLSBlc3NlbnRpYWxseVxuICAgIC8vICBjb25zaWRlcmluZyBfX2V2ZXJ5dGhpbmdfXyB0byBiZSB2aXNpYmxlIGJlY2F1c2Ugb2YgdGhlIGlubmFiaWxpdHkgdG8gZGV0ZXJtaW5lIHN0eWxlcy5cbiAgICAvL1xuICAgIC8vIHY2LjAuMDogQXMgb2YgdGhpcyBtYWpvciByZWxlYXNlLCB0aGUgZGVmYXVsdCAnZnVsbCcgb3B0aW9uIF9fbm8gbG9uZ2VyIHRyZWF0cyBkZXRhY2hlZFxuICAgIC8vICBub2RlcyBhcyB2aXNpYmxlIHdpdGggdGhlICdub25lJyBmYWxsYmFjay5fX1xuICAgIGlmIChkaXNwbGF5Q2hlY2sgIT09ICdsZWdhY3ktZnVsbCcpIHtcbiAgICAgIHJldHVybiB0cnVlOyAvLyBoaWRkZW5cbiAgICB9XG4gICAgLy8gZWxzZSwgZmFsbGJhY2sgdG8gJ25vbmUnIG1vZGUgYW5kIGNvbnNpZGVyIHRoZSBub2RlIHZpc2libGVcbiAgfSBlbHNlIGlmIChkaXNwbGF5Q2hlY2sgPT09ICdub24temVyby1hcmVhJykge1xuICAgIC8vIE5PVEU6IEV2ZW4gdGhvdWdoIHRoaXMgdGVzdHMgdGhhdCB0aGUgbm9kZSdzIGNsaWVudCByZWN0IGlzIG5vbi16ZXJvIHRvIGRldGVybWluZVxuICAgIC8vICB3aGV0aGVyIGl0J3MgZGlzcGxheWVkLCBhbmQgdGhhdCBhIGRldGFjaGVkIG5vZGUgd2lsbCBfX2Fsd2F5c19fIGhhdmUgYSB6ZXJvLWFyZWFcbiAgICAvLyAgY2xpZW50IHJlY3QsIHdlIGRvbid0IHNwZWNpYWwtY2FzZSBmb3Igd2hldGhlciB0aGUgbm9kZSBpcyBhdHRhY2hlZCBvciBub3QuIEluXG4gICAgLy8gIHRoaXMgbW9kZSwgd2UgZG8gd2FudCB0byBjb25zaWRlciBub2RlcyB0aGF0IGhhdmUgYSB6ZXJvIGFyZWEgdG8gYmUgaGlkZGVuIGF0IGFsbFxuICAgIC8vICB0aW1lcywgYW5kIHRoYXQgaW5jbHVkZXMgYXR0YWNoZWQgb3Igbm90LlxuICAgIHJldHVybiBpc1plcm9BcmVhKG5vZGUpO1xuICB9XG5cbiAgLy8gdmlzaWJsZSwgYXMgZmFyIGFzIHdlIGNhbiB0ZWxsLCBvciBwZXIgY3VycmVudCBgZGlzcGxheUNoZWNrPW5vbmVgIG1vZGUsIHdlIGFzc3VtZVxuICAvLyAgaXQncyB2aXNpYmxlXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8vIGZvcm0gZmllbGRzIChuZXN0ZWQpIGluc2lkZSBhIGRpc2FibGVkIGZpZWxkc2V0IGFyZSBub3QgZm9jdXNhYmxlL3RhYmJhYmxlXG4vLyAgdW5sZXNzIHRoZXkgYXJlIGluIHRoZSBfZmlyc3RfIDxsZWdlbmQ+IGVsZW1lbnQgb2YgdGhlIHRvcC1tb3N0IGRpc2FibGVkXG4vLyAgZmllbGRzZXRcbnZhciBpc0Rpc2FibGVkRnJvbUZpZWxkc2V0ID0gZnVuY3Rpb24gaXNEaXNhYmxlZEZyb21GaWVsZHNldChub2RlKSB7XG4gIGlmICgvXihJTlBVVHxCVVRUT058U0VMRUNUfFRFWFRBUkVBKSQvLnRlc3Qobm9kZS50YWdOYW1lKSkge1xuICAgIHZhciBwYXJlbnROb2RlID0gbm9kZS5wYXJlbnRFbGVtZW50O1xuICAgIC8vIGNoZWNrIGlmIGBub2RlYCBpcyBjb250YWluZWQgaW4gYSBkaXNhYmxlZCA8ZmllbGRzZXQ+XG4gICAgd2hpbGUgKHBhcmVudE5vZGUpIHtcbiAgICAgIGlmIChwYXJlbnROb2RlLnRhZ05hbWUgPT09ICdGSUVMRFNFVCcgJiYgcGFyZW50Tm9kZS5kaXNhYmxlZCkge1xuICAgICAgICAvLyBsb29rIGZvciB0aGUgZmlyc3QgPGxlZ2VuZD4gYW1vbmcgdGhlIGNoaWxkcmVuIG9mIHRoZSBkaXNhYmxlZCA8ZmllbGRzZXQ+XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBjaGlsZCA9IHBhcmVudE5vZGUuY2hpbGRyZW4uaXRlbShpKTtcbiAgICAgICAgICAvLyB3aGVuIHRoZSBmaXJzdCA8bGVnZW5kPiAoaW4gZG9jdW1lbnQgb3JkZXIpIGlzIGZvdW5kXG4gICAgICAgICAgaWYgKGNoaWxkLnRhZ05hbWUgPT09ICdMRUdFTkQnKSB7XG4gICAgICAgICAgICAvLyBpZiBpdHMgcGFyZW50IDxmaWVsZHNldD4gaXMgbm90IG5lc3RlZCBpbiBhbm90aGVyIGRpc2FibGVkIDxmaWVsZHNldD4sXG4gICAgICAgICAgICAvLyByZXR1cm4gd2hldGhlciBgbm9kZWAgaXMgYSBkZXNjZW5kYW50IG9mIGl0cyBmaXJzdCA8bGVnZW5kPlxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMuY2FsbChwYXJlbnROb2RlLCAnZmllbGRzZXRbZGlzYWJsZWRdIConKSA/IHRydWUgOiAhY2hpbGQuY29udGFpbnMobm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoZSBkaXNhYmxlZCA8ZmllbGRzZXQ+IGNvbnRhaW5pbmcgYG5vZGVgIGhhcyBubyA8bGVnZW5kPlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICB9XG5cbiAgLy8gZWxzZSwgbm9kZSdzIHRhYmJhYmxlL2ZvY3VzYWJsZSBzdGF0ZSBzaG91bGQgbm90IGJlIGFmZmVjdGVkIGJ5IGEgZmllbGRzZXQnc1xuICAvLyAgZW5hYmxlZC9kaXNhYmxlZCBzdGF0ZVxuICByZXR1cm4gZmFsc2U7XG59O1xudmFyIGlzTm9kZU1hdGNoaW5nU2VsZWN0b3JGb2N1c2FibGUgPSBmdW5jdGlvbiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yRm9jdXNhYmxlKG9wdGlvbnMsIG5vZGUpIHtcbiAgaWYgKG5vZGUuZGlzYWJsZWQgfHwgaXNIaWRkZW5JbnB1dChub2RlKSB8fCBpc0hpZGRlbihub2RlLCBvcHRpb25zKSB8fFxuICAvLyBGb3IgYSBkZXRhaWxzIGVsZW1lbnQgd2l0aCBhIHN1bW1hcnksIHRoZSBzdW1tYXJ5IGVsZW1lbnQgZ2V0cyB0aGUgZm9jdXNcbiAgaXNEZXRhaWxzV2l0aFN1bW1hcnkobm9kZSkgfHwgaXNEaXNhYmxlZEZyb21GaWVsZHNldChub2RlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgaXNOb2RlTWF0Y2hpbmdTZWxlY3RvclRhYmJhYmxlID0gZnVuY3Rpb24gaXNOb2RlTWF0Y2hpbmdTZWxlY3RvclRhYmJhYmxlKG9wdGlvbnMsIG5vZGUpIHtcbiAgaWYgKGlzTm9uVGFiYmFibGVSYWRpbyhub2RlKSB8fCBnZXRUYWJpbmRleChub2RlKSA8IDAgfHwgIWlzTm9kZU1hdGNoaW5nU2VsZWN0b3JGb2N1c2FibGUob3B0aW9ucywgbm9kZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIGlzVmFsaWRTaGFkb3dSb290VGFiYmFibGUgPSBmdW5jdGlvbiBpc1ZhbGlkU2hhZG93Um9vdFRhYmJhYmxlKHNoYWRvd0hvc3ROb2RlKSB7XG4gIHZhciB0YWJJbmRleCA9IHBhcnNlSW50KHNoYWRvd0hvc3ROb2RlLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSwgMTApO1xuICBpZiAoaXNOYU4odGFiSW5kZXgpIHx8IHRhYkluZGV4ID49IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvLyBJZiBhIGN1c3RvbSBlbGVtZW50IGhhcyBhbiBleHBsaWNpdCBuZWdhdGl2ZSB0YWJpbmRleCxcbiAgLy8gYnJvd3NlcnMgd2lsbCBub3QgYWxsb3cgdGFiIHRhcmdldGluZyBzYWlkIGVsZW1lbnQncyBjaGlsZHJlbi5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5LjxFbGVtZW50fENhbmRpZGF0ZVNjb3BlPn0gY2FuZGlkYXRlc1xuICogQHJldHVybnMgRWxlbWVudFtdXG4gKi9cbnZhciBzb3J0QnlPcmRlciA9IGZ1bmN0aW9uIHNvcnRCeU9yZGVyKGNhbmRpZGF0ZXMpIHtcbiAgdmFyIHJlZ3VsYXJUYWJiYWJsZXMgPSBbXTtcbiAgdmFyIG9yZGVyZWRUYWJiYWJsZXMgPSBbXTtcbiAgY2FuZGlkYXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgdmFyIGlzU2NvcGUgPSAhIWl0ZW0uc2NvcGVQYXJlbnQ7XG4gICAgdmFyIGVsZW1lbnQgPSBpc1Njb3BlID8gaXRlbS5zY29wZVBhcmVudCA6IGl0ZW07XG4gICAgdmFyIGNhbmRpZGF0ZVRhYmluZGV4ID0gZ2V0VGFiaW5kZXgoZWxlbWVudCwgaXNTY29wZSk7XG4gICAgdmFyIGVsZW1lbnRzID0gaXNTY29wZSA/IHNvcnRCeU9yZGVyKGl0ZW0uY2FuZGlkYXRlcykgOiBlbGVtZW50O1xuICAgIGlmIChjYW5kaWRhdGVUYWJpbmRleCA9PT0gMCkge1xuICAgICAgaXNTY29wZSA/IHJlZ3VsYXJUYWJiYWJsZXMucHVzaC5hcHBseShyZWd1bGFyVGFiYmFibGVzLCBlbGVtZW50cykgOiByZWd1bGFyVGFiYmFibGVzLnB1c2goZWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9yZGVyZWRUYWJiYWJsZXMucHVzaCh7XG4gICAgICAgIGRvY3VtZW50T3JkZXI6IGksXG4gICAgICAgIHRhYkluZGV4OiBjYW5kaWRhdGVUYWJpbmRleCxcbiAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgaXNTY29wZTogaXNTY29wZSxcbiAgICAgICAgY29udGVudDogZWxlbWVudHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvcmRlcmVkVGFiYmFibGVzLnNvcnQoc29ydE9yZGVyZWRUYWJiYWJsZXMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBzb3J0YWJsZSkge1xuICAgIHNvcnRhYmxlLmlzU2NvcGUgPyBhY2MucHVzaC5hcHBseShhY2MsIHNvcnRhYmxlLmNvbnRlbnQpIDogYWNjLnB1c2goc29ydGFibGUuY29udGVudCk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwgW10pLmNvbmNhdChyZWd1bGFyVGFiYmFibGVzKTtcbn07XG52YXIgdGFiYmFibGUgPSBmdW5jdGlvbiB0YWJiYWJsZShlbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGNhbmRpZGF0ZXM7XG4gIGlmIChvcHRpb25zLmdldFNoYWRvd1Jvb3QpIHtcbiAgICBjYW5kaWRhdGVzID0gZ2V0Q2FuZGlkYXRlc0l0ZXJhdGl2ZWx5KFtlbF0sIG9wdGlvbnMuaW5jbHVkZUNvbnRhaW5lciwge1xuICAgICAgZmlsdGVyOiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yVGFiYmFibGUuYmluZChudWxsLCBvcHRpb25zKSxcbiAgICAgIGZsYXR0ZW46IGZhbHNlLFxuICAgICAgZ2V0U2hhZG93Um9vdDogb3B0aW9ucy5nZXRTaGFkb3dSb290LFxuICAgICAgc2hhZG93Um9vdEZpbHRlcjogaXNWYWxpZFNoYWRvd1Jvb3RUYWJiYWJsZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNhbmRpZGF0ZXMgPSBnZXRDYW5kaWRhdGVzKGVsLCBvcHRpb25zLmluY2x1ZGVDb250YWluZXIsIGlzTm9kZU1hdGNoaW5nU2VsZWN0b3JUYWJiYWJsZS5iaW5kKG51bGwsIG9wdGlvbnMpKTtcbiAgfVxuICByZXR1cm4gc29ydEJ5T3JkZXIoY2FuZGlkYXRlcyk7XG59O1xudmFyIGZvY3VzYWJsZSA9IGZ1bmN0aW9uIGZvY3VzYWJsZShlbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGNhbmRpZGF0ZXM7XG4gIGlmIChvcHRpb25zLmdldFNoYWRvd1Jvb3QpIHtcbiAgICBjYW5kaWRhdGVzID0gZ2V0Q2FuZGlkYXRlc0l0ZXJhdGl2ZWx5KFtlbF0sIG9wdGlvbnMuaW5jbHVkZUNvbnRhaW5lciwge1xuICAgICAgZmlsdGVyOiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yRm9jdXNhYmxlLmJpbmQobnVsbCwgb3B0aW9ucyksXG4gICAgICBmbGF0dGVuOiB0cnVlLFxuICAgICAgZ2V0U2hhZG93Um9vdDogb3B0aW9ucy5nZXRTaGFkb3dSb290XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY2FuZGlkYXRlcyA9IGdldENhbmRpZGF0ZXMoZWwsIG9wdGlvbnMuaW5jbHVkZUNvbnRhaW5lciwgaXNOb2RlTWF0Y2hpbmdTZWxlY3RvckZvY3VzYWJsZS5iaW5kKG51bGwsIG9wdGlvbnMpKTtcbiAgfVxuICByZXR1cm4gY2FuZGlkYXRlcztcbn07XG52YXIgaXNUYWJiYWJsZSA9IGZ1bmN0aW9uIGlzVGFiYmFibGUobm9kZSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKCFub2RlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBub2RlIHByb3ZpZGVkJyk7XG4gIH1cbiAgaWYgKG1hdGNoZXMuY2FsbChub2RlLCBjYW5kaWRhdGVTZWxlY3RvcikgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yVGFiYmFibGUob3B0aW9ucywgbm9kZSk7XG59O1xudmFyIGZvY3VzYWJsZUNhbmRpZGF0ZVNlbGVjdG9yID0gLyogI19fUFVSRV9fICovY2FuZGlkYXRlU2VsZWN0b3JzLmNvbmNhdCgnaWZyYW1lJykuam9pbignLCcpO1xudmFyIGlzRm9jdXNhYmxlID0gZnVuY3Rpb24gaXNGb2N1c2FibGUobm9kZSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKCFub2RlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBub2RlIHByb3ZpZGVkJyk7XG4gIH1cbiAgaWYgKG1hdGNoZXMuY2FsbChub2RlLCBmb2N1c2FibGVDYW5kaWRhdGVTZWxlY3RvcikgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBpc05vZGVNYXRjaGluZ1NlbGVjdG9yRm9jdXNhYmxlKG9wdGlvbnMsIG5vZGUpO1xufTtcblxuZXhwb3J0cy5mb2N1c2FibGUgPSBmb2N1c2FibGU7XG5leHBvcnRzLmlzRm9jdXNhYmxlID0gaXNGb2N1c2FibGU7XG5leHBvcnRzLmlzVGFiYmFibGUgPSBpc1RhYmJhYmxlO1xuZXhwb3J0cy50YWJiYWJsZSA9IHRhYmJhYmxlO1xuXG5cbn0se31dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnNhdmVQdXp6bGVTdGF0ZSA9IGV4cG9ydHMubG9hZFB1enpsZVN0YXRlID0gdm9pZCAwO1xudmFyIF9zdG9yYWdlID0gcmVxdWlyZShcIi4vc3RvcmFnZVwiKTtcbnZhciBsb2NhbFN0b3JhZ2VLZXkgPSBmdW5jdGlvbiBsb2NhbFN0b3JhZ2VLZXkoaWQpIHtcbiAgcmV0dXJuIFwiaG9wa2luc2h1cmRsZS5cIi5jb25jYXQoaWQpO1xufTtcbnZhciBzYXZlUHV6emxlU3RhdGUgPSBmdW5jdGlvbiBzYXZlUHV6emxlU3RhdGUoaWQsIHB1enpsZSkge1xuICB0cnkge1xuICAgIHJldHVybiBfc3RvcmFnZS5sb2NhbC5zZXQobG9jYWxTdG9yYWdlS2V5KGlkKSwgcHV6emxlKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbmV4cG9ydHMuc2F2ZVB1enpsZVN0YXRlID0gc2F2ZVB1enpsZVN0YXRlO1xudmFyIGxvYWRQdXp6bGVTdGF0ZSA9IGZ1bmN0aW9uIGxvYWRQdXp6bGVTdGF0ZShpZCkge1xuICByZXR1cm4gX3N0b3JhZ2UubG9jYWwuZ2V0KGxvY2FsU3RvcmFnZUtleShpZCkpO1xufTtcbmV4cG9ydHMubG9hZFB1enpsZVN0YXRlID0gbG9hZFB1enpsZVN0YXRlO1xuXG59LHtcIi4vc3RvcmFnZVwiOjh9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6IGZhbHNlIH0pOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cbnZhciBTdGF0aXN0aWNzID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3RhdGlzdGljcyhhdmFpbGFibGVHdWVzc2VzLCBsb2NhbFN0b3JhZ2UsIGxvZ2dlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdGF0aXN0aWNzKTtcbiAgICB0aGlzLmF2YWlsYWJsZUd1ZXNzZXMgPSBhdmFpbGFibGVHdWVzc2VzO1xuICAgIHRoaXMubG9jYWxTdG9yYWdlID0gbG9jYWxTdG9yYWdlO1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICAgIHRoaXMubG9jYWxTdG9yYWdlS2V5ID0gJ2hvcGtpbnNodXJkbGUuc3RhdHMnO1xuICAgIHRoaXMuc3RhdHMgPSB0aGlzLnZhbGlkYXRlU3RvcmVkU3RhdHModGhpcy5sb2NhbFN0b3JhZ2UuZ2V0KHRoaXMubG9jYWxTdG9yYWdlS2V5KSk7XG4gIH1cbiAgX2NyZWF0ZUNsYXNzKFN0YXRpc3RpY3MsIFt7XG4gICAga2V5OiBcImdldERlZmF1bHRTdGF0c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXREZWZhdWx0U3RhdHMoYXZhaWxhYmxlR3Vlc3Nlcykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2FtZXNQbGF5ZWQ6IDAsXG4gICAgICAgIGdhbWVzV29uOiAwLFxuICAgICAgICB3aW5TdHJlYWs6IDAsXG4gICAgICAgIG1heFN0cmVhazogMCxcbiAgICAgICAgZ3Vlc3NEaXN0cmlidXRpb246IEFycmF5LmFwcGx5KG51bGwsIEFycmF5KGF2YWlsYWJsZUd1ZXNzZXMpKS5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9KVxuICAgICAgfTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidmFsaWRhdGVTdG9yZWRTdGF0c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWxpZGF0ZVN0b3JlZFN0YXRzKHN0b3JlZFN0YXRzKSB7XG4gICAgICBpZiAoc3RvcmVkU3RhdHMgPT09IG51bGwpIHtcbiAgICAgICAgLy8gbm8gdXNlciBzdGF0cyBmb3VuZCBpbiBsb2NhbCBzdG9yYWdlOyByZXR1cm4gZGVmYXVsdCBzdGF0c1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0U3RhdHModGhpcy5hdmFpbGFibGVHdWVzc2VzKTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIFsnZ2FtZXNQbGF5ZWQnLCAnZ2FtZXNXb24nLCAnd2luU3RyZWFrJywgJ21heFN0cmVhayddLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHN0b3JlZFN0YXRzW2tleV0pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RhdDogJyArIGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHN0b3JlZFN0YXRzLmd1ZXNzRGlzdHJpYnV0aW9uKSB8fCBzdG9yZWRTdGF0cy5ndWVzc0Rpc3RyaWJ1dGlvbi5sZW5ndGggIT09IHRoaXMuYXZhaWxhYmxlR3Vlc3Nlcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdGF0OiBndWVzc0Rpc3RyaWJ1dGlvbicpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZygnSW52YWxpZCBzdGF0cyBmcm9tIGxvY2FsU3RvcmFnZScsIHtcbiAgICAgICAgICBsZXZlbDogJ3dhcm5pbmcnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcbiAgICAgICAgICAgIHN0b3JlZFN0YXRzOiBzdG9yZWRTdGF0c1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERlZmF1bHRTdGF0cyh0aGlzLmF2YWlsYWJsZUd1ZXNzZXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZFN0YXRzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJ1cGRhdGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKHN0YXR1cywgbnVtYmVyT2ZHdWVzc2VzKSB7XG4gICAgICB0aGlzLnN0YXRzLmdhbWVzUGxheWVkKys7XG4gICAgICBpZiAoc3RhdHVzID09PSAnUEFTUycpIHtcbiAgICAgICAgdGhpcy5zdGF0cy5nYW1lc1dvbisrO1xuICAgICAgICB0aGlzLnN0YXRzLndpblN0cmVhaysrO1xuICAgICAgICB0aGlzLnN0YXRzLmd1ZXNzRGlzdHJpYnV0aW9uW251bWJlck9mR3Vlc3NlcyAtIDFdKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRzLndpblN0cmVhayA9IDA7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zdGF0cy5tYXhTdHJlYWsgPCB0aGlzLnN0YXRzLndpblN0cmVhaykge1xuICAgICAgICB0aGlzLnN0YXRzLm1heFN0cmVhayA9IHRoaXMuc3RhdHMud2luU3RyZWFrO1xuICAgICAgfVxuICAgICAgdGhpcy5sb2NhbFN0b3JhZ2Uuc2V0KHRoaXMubG9jYWxTdG9yYWdlS2V5LCB0aGlzLnN0YXRzKTtcbiAgICAgIHJldHVybiB0aGlzLnN0YXRzO1xuICAgIH1cblxuICAgIC8vIGZvciB0ZXN0aW5nXG4gIH0sIHtcbiAgICBrZXk6IFwiaW5jcmVtZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluY3JlbWVudCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZSgnRkFJTCcpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU3RhdGlzdGljcztcbn0oKTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gU3RhdGlzdGljcztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xuXG59LHt9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5zZXNzaW9uID0gZXhwb3J0cy5sb2NhbCA9IHZvaWQgMDtcbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuLyogZXNsaW50IGNvbnNpc3RlbnQtcmV0dXJuOiAwICovXG52YXIgU3RvcmFnZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0b3JhZ2UodHlwZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdG9yYWdlKTtcbiAgICB0aGlzLnN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgdGhpcy5hdmFpbGFibGUgPSB0aGlzLmlzQXZhaWxhYmxlKCk7XG4gIH1cbiAgX2NyZWF0ZUNsYXNzKFN0b3JhZ2UsIFt7XG4gICAga2V5OiBcImlzQXZhaWxhYmxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzQXZhaWxhYmxlKCkge1xuICAgICAgdmFyIGtleSA9ICdsb2NhbC1zdG9yYWdlLW1vZHVsZS10ZXN0JztcbiAgICAgIGlmICh0aGlzLmF2YWlsYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF2YWlsYWJsZTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHRvIGZ1bGx5IHRlc3QsIG5lZWQgdG8gc2V0IGl0ZW1cbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy85MDc3MTAxL2lwaG9uZS1sb2NhbHN0b3JhZ2UtcXVvdGEtZXhjZWVkZWQtZXJyLWlzc3VlI2Fuc3dlci0xMjk3Njk4OFxuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShrZXksICdncmF1bicpO1xuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICB0aGlzLmF2YWlsYWJsZSA9IHRydWU7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5hdmFpbGFibGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmF2YWlsYWJsZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZ2V0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgIGlmICghdGhpcy5hdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGRhdGE7XG5cbiAgICAgIC8vIHRyeSBhbmQgcGFyc2UgdGhlIGRhdGFcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0UmF3KGtleSk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgICBpZiAoZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlKGtleSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICAvLyBoYXMgaXQgZXhwaXJlZD9cbiAgICAgIGlmIChkYXRhLmV4cGlyZXMgJiYgbmV3IERhdGUoKSA+IG5ldyBEYXRlKGRhdGEuZXhwaXJlcykpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoa2V5KTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGF0YS52YWx1ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgICBpZiAoIXRoaXMuYXZhaWxhYmxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBleHBpcmVzOiBvcHRpb25zLmV4cGlyZXNcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0SWZOb3RFeGlzdHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0SWZOb3RFeGlzdHMoa2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgaWYgKCF0aGlzLmF2YWlsYWJsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZXhwaXJlczogb3B0aW9ucy5leHBpcmVzXG4gICAgICB9KSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFJhd1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRSYXcoa2V5KSB7XG4gICAgICBpZiAodGhpcy5hdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbW92ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmUoa2V5KSB7XG4gICAgICBpZiAodGhpcy5hdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTdG9yYWdlO1xufSgpO1xudmFyIGxvY2FsID0gbmV3IFN0b3JhZ2UoJ2xvY2FsU3RvcmFnZScpO1xuZXhwb3J0cy5sb2NhbCA9IGxvY2FsO1xudmFyIHNlc3Npb24gPSBuZXcgU3RvcmFnZSgnc2Vzc2lvblN0b3JhZ2UnKTtcbmV4cG9ydHMuc2Vzc2lvbiA9IHNlc3Npb247XG5cbn0se31dLDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpeyhmdW5jdGlvbiAoKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVhY3QnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1JlYWN0J10gOiBudWxsKSk7XG52YXIgX3Byb3BUeXBlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb3BUeXBlcyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvcFR5cGVzJ10gOiBudWxsKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cbnZhciBBbnN3ZXIgPSBmdW5jdGlvbiBBbnN3ZXIoX3JlZikge1xuICB2YXIgYW5zd2VyID0gX3JlZi5hbnN3ZXI7XG4gIHJldHVybiAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBcIlNvcnJ5LCB0aGUgY29ycmVjdCBhbnN3ZXIgaXMgXCIsIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJzdHJvbmdcIiwgbnVsbCwgYW5zd2VyKSk7XG59O1xuQW5zd2VyLnByb3BUeXBlcyA9IHtcbiAgYW5zd2VyOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5zdHJpbmcuaXNSZXF1aXJlZFxufTtcbnZhciBfZGVmYXVsdCA9IEFuc3dlcjtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxufSkuY2FsbCh0aGlzKX0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpeyhmdW5jdGlvbiAoKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVhY3QnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1JlYWN0J10gOiBudWxsKSk7XG52YXIgX3Byb3BUeXBlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb3BUeXBlcyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvcFR5cGVzJ10gOiBudWxsKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cbnZhciBDbHVlID0gZnVuY3Rpb24gQ2x1ZShfcmVmKSB7XG4gIHZhciBjbHVlID0gX3JlZi5jbHVlLFxuICAgIGN1cnJlbnRSb3cgPSBfcmVmLmN1cnJlbnRSb3csXG4gICAgaGlkZGVuID0gX3JlZi5oaWRkZW47XG4gIHZhciBhdHRyaWJ1dGVzID0ge1xuICAgICdhcmlhLWhpZGRlbic6IGhpZGRlbixcbiAgICAnYXJpYS1sYWJlbCc6ICdDbHVlJyxcbiAgICAnYXJpYS1saXZlJzogJ3BvbGl0ZScsXG4gICAgY2xhc3NOYW1lOiAnY2x1ZScsXG4gICAgcm9sZTogJ3JlZ2lvbidcbiAgfTtcbiAgdmFyIGhlYWRlciA9IFwiQ2x1ZSAjXCIuY29uY2F0KGN1cnJlbnRSb3cgKyAxKTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgYXR0cmlidXRlcywgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImgyXCIsIG51bGwsIGhlYWRlciksIGNsdWUucGhvdG8gJiYgY2x1ZS5waG90by51cmwgJiYgY2x1ZS5waG90by5hbHRfdGV4dCAmJiAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHtcbiAgICBzcmM6IGNsdWUucGhvdG8udXJsLFxuICAgIGFsdDogY2x1ZS5waG90by5hbHRfdGV4dFxuICB9KSwgY2x1ZS50ZXh0ICYmIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIGNsdWUudGV4dCkpO1xufTtcbkNsdWUucHJvcFR5cGVzID0ge1xuICBjbHVlOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5vYmplY3QuaXNSZXF1aXJlZCxcbiAgY3VycmVudFJvdzogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0ubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGhpZGRlbjogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uYm9vbC5pc1JlcXVpcmVkXG59O1xudmFyIF9kZWZhdWx0ID0gQ2x1ZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxufSkuY2FsbCh0aGlzKX0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7fV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpeyhmdW5jdGlvbiAoKXtcblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfSwgX3R5cGVvZihvYmopOyB9XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlYWN0J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWFjdCddIDogbnVsbCkpO1xudmFyIF9wcm9wVHlwZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9wVHlwZXMnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb3BUeXBlcyddIDogbnVsbCkpO1xudmFyIF9QaHJhc2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL1BocmFzZVwiKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCkgeyBpZiAodHlwZW9mIFdlYWtNYXAgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7IHZhciBjYWNoZUJhYmVsSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHZhciBjYWNoZU5vZGVJbnRlcm9wID0gbmV3IFdlYWtNYXAoKTsgcmV0dXJuIChfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUgPSBmdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApIHsgcmV0dXJuIG5vZGVJbnRlcm9wID8gY2FjaGVOb2RlSW50ZXJvcCA6IGNhY2hlQmFiZWxJbnRlcm9wOyB9KShub2RlSW50ZXJvcCk7IH1cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaiwgbm9kZUludGVyb3ApIHsgaWYgKCFub2RlSW50ZXJvcCAmJiBvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBpZiAob2JqID09PSBudWxsIHx8IF90eXBlb2Yob2JqKSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqICE9PSBcImZ1bmN0aW9uXCIpIHsgcmV0dXJuIHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9IHZhciBjYWNoZSA9IF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCk7IGlmIChjYWNoZSAmJiBjYWNoZS5oYXMob2JqKSkgeyByZXR1cm4gY2FjaGUuZ2V0KG9iaik7IH0gdmFyIG5ld09iaiA9IHt9OyB2YXIgaGFzUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKGtleSAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgeyB2YXIgZGVzYyA9IGhhc1Byb3BlcnR5RGVzY3JpcHRvciA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpIDogbnVsbDsgaWYgKGRlc2MgJiYgKGRlc2MuZ2V0IHx8IGRlc2Muc2V0KSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3T2JqLCBrZXksIGRlc2MpOyB9IGVsc2UgeyBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gfSBuZXdPYmpbXCJkZWZhdWx0XCJdID0gb2JqOyBpZiAoY2FjaGUpIHsgY2FjaGUuc2V0KG9iaiwgbmV3T2JqKTsgfSByZXR1cm4gbmV3T2JqOyB9XG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6IGZhbHNlIH0pOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdWJDbGFzcywgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOyB9XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuZnVuY3Rpb24gX2NyZWF0ZVN1cGVyKERlcml2ZWQpIHsgdmFyIGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QgPSBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCk7IHJldHVybiBmdW5jdGlvbiBfY3JlYXRlU3VwZXJJbnRlcm5hbCgpIHsgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLCByZXN1bHQ7IGlmIChoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KSB7IHZhciBOZXdUYXJnZXQgPSBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3I7IHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7IH0gZWxzZSB7IHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0gcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIHJlc3VsdCk7IH07IH1cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHsgcmV0dXJuIGNhbGw7IH0gZWxzZSBpZiAoY2FsbCAhPT0gdm9pZCAwKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJEZXJpdmVkIGNvbnN0cnVjdG9ycyBtYXkgb25seSByZXR1cm4gb2JqZWN0IG9yIHVuZGVmaW5lZFwiKTsgfSByZXR1cm4gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTsgfVxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7IGlmIChzZWxmID09PSB2b2lkIDApIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBzZWxmOyB9XG5mdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7IGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7IGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7IHRyeSB7IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2YuY2FsbChSZWZsZWN0LmNvbnN0cnVjdChCb29sZWFuLCBbXSwgZnVuY3Rpb24gKCkge30pKTsgcmV0dXJuIHRydWU7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9IH1cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pOyB9OyByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pOyB9XG52YXIgR3Vlc3NlcyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoR3Vlc3NlcywgX0NvbXBvbmVudCk7XG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoR3Vlc3Nlcyk7XG4gIGZ1bmN0aW9uIEd1ZXNzZXMocHJvcHMpIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEd1ZXNzZXMpO1xuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcHJvcHMpO1xuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgdHJpZ2dlckZvY3VzOiBmYWxzZVxuICAgIH07XG4gICAgX3RoaXMudHJpZ2dlclJlZm9jdXMgPSBfdGhpcy50cmlnZ2VyUmVmb2N1cy5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5vblJlZm9jdXNDb21wbGV0ZSA9IF90aGlzLm9uUmVmb2N1c0NvbXBsZXRlLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgdGhlIHN0YXRlIHRcbiAgICovXG4gIF9jcmVhdGVDbGFzcyhHdWVzc2VzLCBbe1xuICAgIGtleTogXCJ0cmlnZ2VyUmVmb2N1c1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyUmVmb2N1cygpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB0cmlnZ2VyRm9jdXM6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvblJlZm9jdXNDb21wbGV0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblJlZm9jdXNDb21wbGV0ZSgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB0cmlnZ2VyRm9jdXM6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB7XG4gICAgICAgICdhcmlhLWhpZGRlbic6IHRoaXMucHJvcHMuaGlkZGVuLFxuICAgICAgICAnYXJpYS1sYWJlbCc6ICdHdWVzc2VzJyxcbiAgICAgICAgY2xhc3NOYW1lOiAnZ3Vlc3NlcycsXG4gICAgICAgIG9uQ2xpY2s6IHRoaXMudHJpZ2dlclJlZm9jdXMsXG4gICAgICAgIHJvbGU6ICdyZWdpb24nXG4gICAgICB9O1xuICAgICAgdmFyIGFuc3dlckRlc2NyaXB0aW9uID0gXCJUaGUgYW5zd2VyIGNvbnNpc3RzIG9mIFwiLmNvbmNhdCh0aGlzLnByb3BzLmFuc3dlckRlc2NyaXB0aW9uLCBcIi4gWW91IGhhdmUgXCIpLmNvbmNhdCh0aGlzLnByb3BzLnJlbWFpbmluZ0d1ZXNzZXMsIFwiIFwiKS5jb25jYXQodGhpcy5wcm9wcy5yZW1haW5pbmdHdWVzc2VzID09PSAxID8gJ2d1ZXNzJyA6ICdndWVzc2VzJywgXCIgcmVtYWluaW5nLlwiKTtcbiAgICAgIHJldHVybiAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIGF0dHJpYnV0ZXMsIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCBcIkd1ZXNzZXNcIiksIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHtcbiAgICAgICAgY2xhc3NOYW1lOiAndmlzdWFsbHloaWRkZW4nXG4gICAgICB9LCBhbnN3ZXJEZXNjcmlwdGlvbiksIHRoaXMucHJvcHMuZ3Vlc3Nlcy5tYXAoZnVuY3Rpb24gKGd1ZXNzLCBpKSB7XG4gICAgICAgIHJldHVybiAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9QaHJhc2VbXCJkZWZhdWx0XCJdLCB7XG4gICAgICAgICAgY29ycmVjdEFuc3dlcjogX3RoaXMyLnByb3BzLmNvcnJlY3RBbnN3ZXIsXG4gICAgICAgICAgZGlzcGxheU1lc3NhZ2U6IF90aGlzMi5wcm9wcy5kaXNwbGF5TWVzc2FnZSxcbiAgICAgICAgICBndWVzczogZ3Vlc3MsXG4gICAgICAgICAgaXNDb21wbGV0ZTogX3RoaXMyLnByb3BzLnN0YXR1cyAhPT0gJ0lOX1BST0dSRVNTJyB8fCBpIDwgX3RoaXMyLnByb3BzLmN1cnJlbnRSb3csXG4gICAgICAgICAgaXNDdXJyZW50Um93OiBfdGhpczIucHJvcHMuY3VycmVudFJvdyA9PT0gaSxcbiAgICAgICAgICBrZXk6IGksXG4gICAgICAgICAgb25GYWlsOiBfdGhpczIucHJvcHMub25HdWVzc0ZhaWwsXG4gICAgICAgICAgb25QYXNzOiBfdGhpczIucHJvcHMub25QdXp6bGVQYXNzLFxuICAgICAgICAgIG9uUmVmb2N1c0NvbXBsZXRlOiBfdGhpczIub25SZWZvY3VzQ29tcGxldGUsXG4gICAgICAgICAgcGhyYXNlTnVtYmVyOiBpLFxuICAgICAgICAgIHRyaWdnZXJGb2N1czogX3RoaXMyLnN0YXRlLnRyaWdnZXJGb2N1c1xuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEd1ZXNzZXM7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuR3Vlc3Nlcy5wcm9wVHlwZXMgPSB7XG4gIGFuc3dlckRlc2NyaXB0aW9uOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgY3VycmVudFJvdzogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0ubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGNvcnJlY3RBbnN3ZXI6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLnN0cmluZy5pc1JlcXVpcmVkLFxuICBkaXNwbGF5TWVzc2FnZTogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uZnVuYy5pc1JlcXVpcmVkLFxuICBndWVzc2VzOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5hcnJheS5pc1JlcXVpcmVkLFxuICBoaWRkZW46IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmJvb2wuaXNSZXF1aXJlZCxcbiAgb25HdWVzc0ZhaWw6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25QdXp6bGVQYXNzOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5mdW5jLmlzUmVxdWlyZWQsXG4gIHJlbWFpbmluZ0d1ZXNzZXM6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLm51bWJlci5pc1JlcXVpcmVkLFxuICBzdGF0dXM6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLnN0cmluZy5pc1JlcXVpcmVkXG59O1xudmFyIF9kZWZhdWx0ID0gR3Vlc3NlcztcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxufSkuY2FsbCh0aGlzKX0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCIuL1BocmFzZVwiOjE0fV0sMTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpeyhmdW5jdGlvbiAoKXtcblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfSwgX3R5cGVvZihvYmopOyB9XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlYWN0J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWFjdCddIDogbnVsbCkpO1xudmFyIF9wcm9wVHlwZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9wVHlwZXMnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb3BUeXBlcyddIDogbnVsbCkpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5mdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApIHsgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsOyB2YXIgY2FjaGVCYWJlbEludGVyb3AgPSBuZXcgV2Vha01hcCgpOyB2YXIgY2FjaGVOb2RlSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHJldHVybiAoX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKSB7IHJldHVybiBub2RlSW50ZXJvcCA/IGNhY2hlTm9kZUludGVyb3AgOiBjYWNoZUJhYmVsSW50ZXJvcDsgfSkobm9kZUludGVyb3ApOyB9XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmosIG5vZGVJbnRlcm9wKSB7IGlmICghbm9kZUludGVyb3AgJiYgb2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gaWYgKG9iaiA9PT0gbnVsbCB8fCBfdHlwZW9mKG9iaikgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiKSB7IHJldHVybiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfSB2YXIgY2FjaGUgPSBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApOyBpZiAoY2FjaGUgJiYgY2FjaGUuaGFzKG9iaikpIHsgcmV0dXJuIGNhY2hlLmdldChvYmopOyB9IHZhciBuZXdPYmogPSB7fTsgdmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChrZXkgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHsgdmFyIGRlc2MgPSBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IG51bGw7IGlmIChkZXNjICYmIChkZXNjLmdldCB8fCBkZXNjLnNldCkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTsgfSBlbHNlIHsgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IH0gbmV3T2JqW1wiZGVmYXVsdFwiXSA9IG9iajsgaWYgKGNhY2hlKSB7IGNhY2hlLnNldChvYmosIG5ld09iaik7IH0gcmV0dXJuIG5ld09iajsgfVxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3ViQ2xhc3MsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6IGZhbHNlIH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IGVsc2UgaWYgKGNhbGwgIT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRGVyaXZlZCBjb25zdHJ1Y3RvcnMgbWF5IG9ubHkgcmV0dXJuIG9iamVjdCBvciB1bmRlZmluZWRcIik7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxudmFyIExldHRlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoTGV0dGVyLCBfQ29tcG9uZW50KTtcbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihMZXR0ZXIpO1xuICBmdW5jdGlvbiBMZXR0ZXIocHJvcHMpIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIExldHRlcik7XG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBwcm9wcyk7XG4gICAgX3RoaXMub25DaGFuZ2UgPSBfdGhpcy5vbkNoYW5nZS5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5vbktleURvd24gPSBfdGhpcy5vbktleURvd24uYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7XG4gICAgX3RoaXMuaW5wdXQgPSAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVSZWYoKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgX2NyZWF0ZUNsYXNzKExldHRlciwgW3tcbiAgICBrZXk6IFwiY29tcG9uZW50RGlkTW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICB0aGlzLm1heWJlRm9jdXMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50RGlkVXBkYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgIHRoaXMubWF5YmVGb2N1cygpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJtYXliZUZvY3VzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1heWJlRm9jdXMoKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5mb2N1cykge1xuICAgICAgICB0aGlzLmlucHV0LmN1cnJlbnQuZm9jdXMoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudHJpZ2dlckZvY3VzKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vblJlZm9jdXNDb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlzU3BhY2UpIHtcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXJlY3Rpb24gPT09ICdmb3J3YXJkJykge1xuICAgICAgICAgICAgLy8gYXV0b2NoYW5nZSAoc2tpcCkgc3BhY2VzXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKCcgJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGJhY2tzcGFjZSBhZ2FpbiB0byBza2lwIHNwYWNlIGlucHV0XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQmFja3NwYWNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldENsYXNzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldENsYXNzKCkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBbXTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzU3BhY2UpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKCdzcGFjZScpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuc3RhdHVzKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCh0aGlzLnByb3BzLnN0YXR1cyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5wcm9wcy5hbmltYXRlKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnYW5pbWF0ZScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvbkNoYW5nZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNoYW5nZSh2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlID09PSAnICcgJiYgIXRoaXMucHJvcHMuaXNTcGFjZSB8fCB2YWx1ZSAhPT0gJyAnICYmICF2YWx1ZS5tYXRjaCgvW0EtWmEtel0vKSkge1xuICAgICAgICAvLyBzcGFjZSBvciBub3QgYWxldHRlclxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHZhbHVlLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvbktleURvd25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25LZXlEb3duKGUpIHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICB0aGlzLnByb3BzLm9uRW50ZXIoKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICdCYWNrc3BhY2UnKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25CYWNrc3BhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25Nb3VzZURvd25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25Nb3VzZURvd24oZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXROaWNlU3RhdHVzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldE5pY2VTdGF0dXMoKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5zdGF0dXMgPT09ICdwYXNzJykge1xuICAgICAgICByZXR1cm4gJ2NvcnJlY3QnO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnN0YXR1cyA9PT0gJ3NodWZmbGUnKSB7XG4gICAgICAgIHJldHVybiAnY29ycmVjdCBsZXR0ZXIsIGJ1dCBpbiB3cm9uZyBwb3NpdGlvbic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ2luY29ycmVjdCc7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldExhYmVsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldExhYmVsKCkge1xuICAgICAgdmFyIGxhYmVsID0gXCJMZXR0ZXIgI1wiLmNvbmNhdCh0aGlzLnByb3BzLmxldHRlck51bWJlciArIDEpO1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNTcGFjZSkge1xuICAgICAgICBsYWJlbCArPSBcIjogU3BhY2VcIjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5pc0NvbXBsZXRlKSB7XG4gICAgICAgIGxhYmVsICs9IFwiOiBcIi5jb25jYXQodGhpcy5nZXROaWNlU3RhdHVzKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxhYmVsO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG4gICAgICB2YXIgYW5pbWF0aW9uRGVsYXkgPSAxMDAgKiB0aGlzLnByb3BzLmxldHRlck51bWJlciArICdtcyc7XG4gICAgICByZXR1cm4gLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHtcbiAgICAgICAgXCJhcmlhLWxhYmVsXCI6IHRoaXMuZ2V0TGFiZWwoKSxcbiAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmdldENsYXNzKCksXG4gICAgICAgIGRpc2FibGVkOiB0aGlzLnByb3BzLmlzQ29tcGxldGUsXG4gICAgICAgIG1heExlbmd0aDogMSxcbiAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIG9uQ2hhbmdlKGUpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMyLm9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25LZXlEb3duOiB0aGlzLm9uS2V5RG93bixcbiAgICAgICAgb25Nb3VzZURvd246IHRoaXMub25Nb3VzZURvd24sXG4gICAgICAgIHJlYWRPbmx5OiB0aGlzLmlzU3BhY2UgfHwgIXRoaXMucHJvcHMuZm9jdXMsXG4gICAgICAgIHJlZjogdGhpcy5pbnB1dCxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBhbmltYXRpb25EZWxheTogYW5pbWF0aW9uRGVsYXlcbiAgICAgICAgfSxcbiAgICAgICAgdGFiSW5kZXg6IHRoaXMucHJvcHMuZm9jdXMgPyBudWxsIDogLTEsXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudmFsdWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTGV0dGVyO1xufShfcmVhY3QuQ29tcG9uZW50KTtcbkxldHRlci5wcm9wVHlwZXMgPSB7XG4gIGFuaW1hdGU6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmJvb2wuaXNSZXF1aXJlZCxcbiAgZGlyZWN0aW9uOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgZm9jdXM6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmJvb2wuaXNSZXF1aXJlZCxcbiAgaXNDb21wbGV0ZTogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uYm9vbC5pc1JlcXVpcmVkLFxuICBpc0N1cnJlbnRSb3c6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmJvb2wuaXNSZXF1aXJlZCxcbiAgaXNTcGFjZTogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uYm9vbC5pc1JlcXVpcmVkLFxuICBsZXR0ZXJOdW1iZXI6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLm51bWJlci5pc1JlcXVpcmVkLFxuICBvbkJhY2tzcGFjZTogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uZnVuYy5pc1JlcXVpcmVkLFxuICBvbkVudGVyOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQ2hhbmdlOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uUmVmb2N1c0NvbXBsZXRlOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5mdW5jLmlzUmVxdWlyZWQsXG4gIHRyaWdnZXJGb2N1czogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uYm9vbC5pc1JlcXVpcmVkLFxuICBzdGF0dXM6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLnN0cmluZyxcbiAgdmFsdWU6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLnN0cmluZ1xufTtcbnZhciBfZGVmYXVsdCA9IExldHRlcjtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxufSkuY2FsbCh0aGlzKX0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7fV0sMTM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpeyhmdW5jdGlvbiAoKXtcblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7IHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfSwgX3R5cGVvZihvYmopOyB9XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1JlYWN0J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydSZWFjdCddIDogbnVsbCkpO1xudmFyIF9wcm9wVHlwZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KCh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydQcm9wVHlwZXMnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1Byb3BUeXBlcyddIDogbnVsbCkpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgXCJkZWZhdWx0XCI6IG9iaiB9OyB9XG5mdW5jdGlvbiBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApIHsgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsOyB2YXIgY2FjaGVCYWJlbEludGVyb3AgPSBuZXcgV2Vha01hcCgpOyB2YXIgY2FjaGVOb2RlSW50ZXJvcCA9IG5ldyBXZWFrTWFwKCk7IHJldHVybiAoX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlID0gZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKSB7IHJldHVybiBub2RlSW50ZXJvcCA/IGNhY2hlTm9kZUludGVyb3AgOiBjYWNoZUJhYmVsSW50ZXJvcDsgfSkobm9kZUludGVyb3ApOyB9XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmosIG5vZGVJbnRlcm9wKSB7IGlmICghbm9kZUludGVyb3AgJiYgb2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gaWYgKG9iaiA9PT0gbnVsbCB8fCBfdHlwZW9mKG9iaikgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiKSB7IHJldHVybiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfSB2YXIgY2FjaGUgPSBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUobm9kZUludGVyb3ApOyBpZiAoY2FjaGUgJiYgY2FjaGUuaGFzKG9iaikpIHsgcmV0dXJuIGNhY2hlLmdldChvYmopOyB9IHZhciBuZXdPYmogPSB7fTsgdmFyIGhhc1Byb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChrZXkgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHsgdmFyIGRlc2MgPSBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IG51bGw7IGlmIChkZXNjICYmIChkZXNjLmdldCB8fCBkZXNjLnNldCkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTsgfSBlbHNlIHsgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IH0gbmV3T2JqW1wiZGVmYXVsdFwiXSA9IG9iajsgaWYgKGNhY2hlKSB7IGNhY2hlLnNldChvYmosIG5ld09iaik7IH0gcmV0dXJuIG5ld09iajsgfVxudmFyIE1lc3NhZ2UgPSBmdW5jdGlvbiBNZXNzYWdlKF9yZWYpIHtcbiAgdmFyIGhpZGRlbiA9IF9yZWYuaGlkZGVuLFxuICAgIG1lc3NhZ2UgPSBfcmVmLm1lc3NhZ2UsXG4gICAgdHlwZSA9IF9yZWYudHlwZSxcbiAgICB0dGwgPSBfcmVmLnR0bCxcbiAgICBvblR0bCA9IF9yZWYub25UdGw7XG4gIHZhciBhdHRyaWJ1dGVzID0ge1xuICAgICdhcmlhLWhpZGRlbic6IGhpZGRlbixcbiAgICAnYXJpYS1sYWJlbCc6ICdNZXNzYWdlcycsXG4gICAgJ2FyaWEtbGl2ZSc6ICdwb2xpdGUnLFxuICAgIGNsYXNzTmFtZTogXCJtZXNzYWdlIFwiLmNvbmNhdCh0eXBlKSxcbiAgICByb2xlOiAncmVnaW9uJ1xuICB9O1xuXG4gIC8vIHJ1bnMgYWZ0ZXIgdGhlIGNvbXBvbmVudCBpcyByZW5kZXJlZFxuICAoMCwgX3JlYWN0LnVzZUVmZmVjdCkoZnVuY3Rpb24gKCkge1xuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KG9uVHRsLCB0dGwpO1xuICB9KTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgYXR0cmlidXRlcywgbWVzc2FnZSk7XG59O1xuTWVzc2FnZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGhpZGRlbjogZmFsc2UsXG4gIHR5cGU6ICdpbmZvJyxcbiAgdHRsOiA1MDAwXG59O1xuTWVzc2FnZS5wcm9wVHlwZXMgPSB7XG4gIGhpZGRlbjogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uYm9vbC5pc1JlcXVpcmVkLFxuICBtZXNzYWdlOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5zdHJpbmcsXG4gIHR5cGU6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLnN0cmluZyxcbiAgdHRsOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5udW1iZXIsXG4gIG9uVHRsOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5mdW5jLmlzUmVxdWlyZWRcbn07XG52YXIgX2RlZmF1bHQgPSBNZXNzYWdlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xuXG59KS5jYWxsKHRoaXMpfSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHt9XSwxNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7KGZ1bmN0aW9uICgpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9LCBfdHlwZW9mKG9iaik7IH1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcbnZhciBfcmVhY3QgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCgodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVhY3QnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1JlYWN0J10gOiBudWxsKSk7XG52YXIgX3Byb3BUeXBlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb3BUeXBlcyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvcFR5cGVzJ10gOiBudWxsKSk7XG52YXIgX0xldHRlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vTGV0dGVyXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKSB7IGlmICh0eXBlb2YgV2Vha01hcCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDsgdmFyIGNhY2hlQmFiZWxJbnRlcm9wID0gbmV3IFdlYWtNYXAoKTsgdmFyIGNhY2hlTm9kZUludGVyb3AgPSBuZXcgV2Vha01hcCgpOyByZXR1cm4gKF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSA9IGZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCkgeyByZXR1cm4gbm9kZUludGVyb3AgPyBjYWNoZU5vZGVJbnRlcm9wIDogY2FjaGVCYWJlbEludGVyb3A7IH0pKG5vZGVJbnRlcm9wKTsgfVxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqLCBub2RlSW50ZXJvcCkgeyBpZiAoIW5vZGVJbnRlcm9wICYmIG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGlmIChvYmogPT09IG51bGwgfHwgX3R5cGVvZihvYmopICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIikgeyByZXR1cm4geyBcImRlZmF1bHRcIjogb2JqIH07IH0gdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKTsgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7IHJldHVybiBjYWNoZS5nZXQob2JqKTsgfSB2YXIgbmV3T2JqID0ge307IHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoa2V5ICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsOyBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7IH0gZWxzZSB7IG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSB9IG5ld09ialtcImRlZmF1bHRcIl0gPSBvYmo7IGlmIChjYWNoZSkgeyBjYWNoZS5zZXQob2JqLCBuZXdPYmopOyB9IHJldHVybiBuZXdPYmo7IH1cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN1YkNsYXNzLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7IH1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBvLl9fcHJvdG9fXyA9IHA7IHJldHVybiBvOyB9OyByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOyB9XG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkgeyB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTsgcmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVTdXBlckludGVybmFsKCkgeyB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksIHJlc3VsdDsgaWYgKGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QpIHsgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjsgcmVzdWx0ID0gUmVmbGVjdC5jb25zdHJ1Y3QoU3VwZXIsIGFyZ3VtZW50cywgTmV3VGFyZ2V0KTsgfSBlbHNlIHsgcmVzdWx0ID0gU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfSByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgcmVzdWx0KTsgfTsgfVxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkgeyByZXR1cm4gY2FsbDsgfSBlbHNlIGlmIChjYWxsICE9PSB2b2lkIDApIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRlcml2ZWQgY29uc3RydWN0b3JzIG1heSBvbmx5IHJldHVybiBvYmplY3Qgb3IgdW5kZWZpbmVkXCIpOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHsgaWYgKHNlbGYgPT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIHNlbGY7IH1cbmZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhUmVmbGVjdC5jb25zdHJ1Y3QpIHJldHVybiBmYWxzZTsgaWYgKFJlZmxlY3QuY29uc3RydWN0LnNoYW0pIHJldHVybiBmYWxzZTsgaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfVxuZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cbnZhciBQaHJhc2UgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFBocmFzZSwgX0NvbXBvbmVudCk7XG4gIHZhciBfc3VwZXIgPSBfY3JlYXRlU3VwZXIoUGhyYXNlKTtcbiAgZnVuY3Rpb24gUGhyYXNlKHByb3BzKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQaHJhc2UpO1xuICAgIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgcHJvcHMpO1xuICAgIF90aGlzLmxldHRlclBvb2wgPSBfdGhpcy5wcm9wcy5jb3JyZWN0QW5zd2VyLnJlcGxhY2UoL1xccy9nLCAnJykuc3BsaXQoJycpOyAvLyBzcGFjZXMgcmVtb3ZlZFxuXG4gICAgX3RoaXMuY29ycmVjdCA9IFtdO1xuICAgIF90aGlzLmluY29ycmVjdCA9IFtdO1xuXG4gICAgLy8gaW5pdGlhbCBwYXNzIHRvIHNlZSB3aGljaCBsZXR0ZXJzIGFyZSBjb3JyZWN0XG4gICAgdmFyIGd1ZXNzID0gX3RoaXMucHJvcHMuY29ycmVjdEFuc3dlci5zcGxpdCgnJykubWFwKGZ1bmN0aW9uIChsZXR0ZXIsIGkpIHtcbiAgICAgIHZhciBndWVzc2VkTGV0dGVyID0gX3RoaXMucHJvcHMuZ3Vlc3NbaV0gfHwgJyc7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpOiBpLFxuICAgICAgICBjb3JyZWN0TGV0dGVyOiBsZXR0ZXIsXG4gICAgICAgIGd1ZXNzZWRMZXR0ZXI6IGd1ZXNzZWRMZXR0ZXIsXG4gICAgICAgIHN0YXR1czogX3RoaXMucHJvcHMuaXNDb21wbGV0ZSA/IF90aGlzLmV2YWx1YXRlR3Vlc3NGb3JDb3JyZWN0bmVzcyhndWVzc2VkTGV0dGVyLCBsZXR0ZXIsIGkpIDogbnVsbFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vIHNlY29uZCBwYXNzIG9uIGluY29ycmVjdCBsZXR0ZXJzIHRvIHNlZSBpZiBtYXliZSB0aGV5IGp1c3QgbmVlZCB0byBiZSBzaHVmZmxlZFxuICAgIC8vIGhhZCB0byBkbyB0aGlzIHNlcGFyYXRlIHNvIHRoYXQgZ3Vlc3NlZCBsZXR0ZXJzIGxhdGVyIGluIHRoZSBndWVzcyBhcmVuJ3QgaW5jbHVkZWQgaW4gdGhlIHBvb2xcbiAgICAvLyBvZiBhdmFpbGFibGUgbGV0dGVyc1xuICAgIF90aGlzLmluY29ycmVjdC5tYXAoZnVuY3Rpb24gKGkpIHtcbiAgICAgIGd1ZXNzW2ldLnN0YXR1cyA9IF90aGlzLmV2YWx1YXRlV3JvbmdHdWVzc2VzKGd1ZXNzW2ldLmd1ZXNzZWRMZXR0ZXIpO1xuICAgIH0pO1xuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgYWN0aXZlTGV0dGVyOiAwLFxuICAgICAgZGlyZWN0aW9uOiAnZm9yd2FyZCcsXG4gICAgICAvLyBmb3J3YXJkIChuZXcgbGF0dGVyKSBPUiBiYWNrd2FyZCAoYmFja3NwYWNlKVxuICAgICAgZ3Vlc3M6IGd1ZXNzLFxuICAgICAgYW5pbWF0ZTogZmFsc2VcbiAgICB9O1xuICAgIF90aGlzLm9uQmFja3NwYWNlID0gX3RoaXMub25CYWNrc3BhY2UuYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7XG4gICAgX3RoaXMub25DaGFuZ2UgPSBfdGhpcy5vbkNoYW5nZS5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5vbkVudGVyID0gX3RoaXMub25FbnRlci5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgX2NyZWF0ZUNsYXNzKFBocmFzZSwgW3tcbiAgICBrZXk6IFwiZXZhbHVhdGVHdWVzc0ZvckNvcnJlY3RuZXNzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGV2YWx1YXRlR3Vlc3NGb3JDb3JyZWN0bmVzcyhndWVzc2VkTGV0dGVyLCBjb3JyZWN0TGV0dGVyLCBpKSB7XG4gICAgICBpZiAoZ3Vlc3NlZExldHRlciA9PT0gY29ycmVjdExldHRlcikge1xuICAgICAgICAvLyB0YWtlIHRoaXMgbGV0dGVyIG91dCBvZiB0aGlzLmxldHRlclBvb2xcbiAgICAgICAgdGhpcy5yZW1vdmVMZXR0ZXJGcm9tUG9vbChndWVzc2VkTGV0dGVyKTtcbiAgICAgICAgdGhpcy5jb3JyZWN0LnB1c2goaSk7XG4gICAgICAgIHJldHVybiAncGFzcyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmluY29ycmVjdC5wdXNoKGkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImV2YWx1YXRlV3JvbmdHdWVzc2VzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGV2YWx1YXRlV3JvbmdHdWVzc2VzKGd1ZXNzZWRMZXR0ZXIpIHtcbiAgICAgIGlmICh0aGlzLmxldHRlclBvb2wuaW5kZXhPZihndWVzc2VkTGV0dGVyKSAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMZXR0ZXJGcm9tUG9vbChndWVzc2VkTGV0dGVyKTtcbiAgICAgICAgcmV0dXJuICdzaHVmZmxlJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnZmFpbCc7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImV2YWx1YXRlR3Vlc3NcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZXZhbHVhdGVHdWVzcygpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBndWVzc1xuXG4gICAgICAgIC8vIGNoZWNrIGVhY2ggbGV0dGVyIGZvciBjb3JyZWN0bmVzcy4gaWYgY29ycmVjdDsgcmVtb3ZlIHRoYXQgbGV0dGVyIGZyb20gdGhlIGxldHRlciBwb29sXG4gICAgICAgIHN0YXRlLmd1ZXNzID0gc3RhdGUuZ3Vlc3MubWFwKGZ1bmN0aW9uIChnKSB7XG4gICAgICAgICAgZy5zdGF0dXMgPSBfdGhpczIuZXZhbHVhdGVHdWVzc0ZvckNvcnJlY3RuZXNzKGcuZ3Vlc3NlZExldHRlciwgZy5jb3JyZWN0TGV0dGVyLCBnLmkpO1xuICAgICAgICAgIGlmIChnLnN0YXR1cyAhPT0gJ3Bhc3MnKSBzdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIG5vdyB0aGF0IHdlIGtub3cgd2hpY2ggbGV0dGVycyBhcmUgY29ycmVjdCwgbGV0J3MgZXZhbHVhdGUgdGhlIHdyb25nIGxldHRlcnNcbiAgICAgICAgLy8gbmVlZCB0byBkbyB0aGlzIHNlcGFyYXRlbHkgYmVjYXVzZSBBcnJheS5tYXAoKSBjYW4ndCBkbyBhIGxvb2thaGVhZCBjaGVja1xuICAgICAgICBfdGhpczIuaW5jb3JyZWN0Lm1hcChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgIHN0YXRlLmd1ZXNzW2ldLnN0YXR1cyA9IF90aGlzMi5ldmFsdWF0ZVdyb25nR3Vlc3NlcyhzdGF0ZS5ndWVzc1tpXS5ndWVzc2VkTGV0dGVyKTtcbiAgICAgICAgICBpZiAoc3RhdGUuZ3Vlc3NbaV0uc3RhdHVzICE9PSAncGFzcycpIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBndWVzcyA9IHN0YXRlLmd1ZXNzLm1hcChmdW5jdGlvbiAoZykge1xuICAgICAgICAgIHJldHVybiBnLmd1ZXNzZWRMZXR0ZXI7XG4gICAgICAgIH0pLmpvaW4oJycpO1xuICAgICAgICBzdWNjZXNzID8gX3RoaXMyLnByb3BzLm9uUGFzcyhndWVzcywgX3RoaXMyLnByb3BzLnBocmFzZU51bWJlciArIDEpIDogX3RoaXMyLnByb3BzLm9uRmFpbChndWVzcywgX3RoaXMyLnByb3BzLnBocmFzZU51bWJlciArIDEpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFuaW1hdGU6IHRydWUsXG4gICAgICAgICAgZ3Vlc3M6IHN0YXRlLmd1ZXNzXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVtb3ZlTGV0dGVyRnJvbVBvb2xcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlTGV0dGVyRnJvbVBvb2wobGV0dGVyKSB7XG4gICAgICB2YXIgaW5kZXggPSB0aGlzLmxldHRlclBvb2wuaW5kZXhPZihsZXR0ZXIpO1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5sZXR0ZXJQb29sLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uQ2hhbmdlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uQ2hhbmdlKGxldHRlciwgaSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIHVwZGF0ZSA9IHtcbiAgICAgICAgICBkaXJlY3Rpb246ICdmb3J3YXJkJ1xuICAgICAgICB9O1xuICAgICAgICB2YXIgZ3Vlc3MgPSBzdGF0ZS5ndWVzcztcbiAgICAgICAgaWYgKHN0YXRlLmFjdGl2ZUxldHRlciAhPT0gZ3Vlc3MubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIC8vIG9ubHkgaW5jcmVhc2UgdGhlIGFjdGl2ZUxldHRlciBpZiB3ZSdyZSBOT1Qgb24gdGhlIGxhc3QgbGV0dGVyXG4gICAgICAgICAgdXBkYXRlLmFjdGl2ZUxldHRlciA9IHN0YXRlLmFjdGl2ZUxldHRlciArIDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgZ3Vlc3NcbiAgICAgICAgZ3Vlc3NbaV0uZ3Vlc3NlZExldHRlciA9IGxldHRlcjtcbiAgICAgICAgdXBkYXRlLmd1ZXNzID0gZ3Vlc3M7XG4gICAgICAgIHJldHVybiB1cGRhdGU7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25CYWNrc3BhY2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25CYWNrc3BhY2UoaSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgaWYgKHN0YXRlLmFjdGl2ZUxldHRlciA9PT0gMCkge1xuICAgICAgICAgIC8vIHdlJ3JlIGJhY2sgYXQgdGhlIGJlZ2lubmluZyBhbHJlYWR5XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIHZhciB1cGRhdGUgPSB7XG4gICAgICAgICAgZGlyZWN0aW9uOiAnYmFja3dhcmQnXG4gICAgICAgIH07XG4gICAgICAgIHZhciBndWVzcyA9IHN0YXRlLmd1ZXNzO1xuICAgICAgICBpZiAoc3RhdGUuYWN0aXZlTGV0dGVyID09PSBzdGF0ZS5ndWVzcy5sZW5ndGggLSAxICYmIGd1ZXNzW2ldLmd1ZXNzZWRMZXR0ZXIubWF0Y2goL1tBLVphLXpdLykpIHtcbiAgICAgICAgICAvLyBsYXN0IGxldHRlciBhbmQgTk9UIEVNUFRZLiByZW1vdmUgdGhlIGxldHRlciwgYnV0IGRvIG5vdCBtb3ZlIHRoZSBjdXJzb3JcbiAgICAgICAgICBndWVzc1tpXS5ndWVzc2VkTGV0dGVyID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbm90IHRoZSBsYXN0IGxldHRlci4gZ28gYmFjayBhIGxldHRlciBhbmQgcmVtb3ZlIGl0cyB2YWx1ZVxuICAgICAgICAgIHVwZGF0ZS5hY3RpdmVMZXR0ZXIgPSBzdGF0ZS5hY3RpdmVMZXR0ZXIgLSAxO1xuICAgICAgICAgIGd1ZXNzW2kgLSAxXS5ndWVzc2VkTGV0dGVyID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlLmd1ZXNzID0gZ3Vlc3M7XG4gICAgICAgIHJldHVybiB1cGRhdGU7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib25FbnRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkVudGVyKCkge1xuICAgICAgdmFyIGd1ZXNzID0gdGhpcy5zdGF0ZS5ndWVzcy5tYXAoZnVuY3Rpb24gKGd1ZXNzKSB7XG4gICAgICAgIHJldHVybiBndWVzcy5ndWVzc2VkTGV0dGVyO1xuICAgICAgfSkuam9pbignJyk7XG4gICAgICBpZiAoZ3Vlc3MubGVuZ3RoIDwgdGhpcy5wcm9wcy5jb3JyZWN0QW5zd2VyLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BsYXlNZXNzYWdlKHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIG1lc3NhZ2U6ICdOb3QgZW5vdWdoIGxldHRlcnMnXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ldmFsdWF0ZUd1ZXNzKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcbiAgICAgIHZhciBsYWJlbCA9IFwiR3Vlc3MgI1wiLmNvbmNhdCh0aGlzLnByb3BzLnBocmFzZU51bWJlciArIDEpO1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNDb21wbGV0ZSkge1xuICAgICAgICBsYWJlbCArPSAnOiBjb21wbGV0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuaXNDdXJyZW50Um93KSB7XG4gICAgICAgIGxhYmVsICs9ICc6IGluIHByb2dyZXNzJztcbiAgICAgIH1cbiAgICAgIHZhciBhdHRyaWJ1dGVzID0ge1xuICAgICAgICAnYXJpYS1sYWJlbCc6IGxhYmVsLFxuICAgICAgICBjbGFzc05hbWU6ICdndWVzcycsXG4gICAgICAgIHJvbGU6ICdncm91cCdcbiAgICAgIH07XG4gICAgICByZXR1cm4gLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImRpdlwiLCBhdHRyaWJ1dGVzLCB0aGlzLnN0YXRlLmd1ZXNzLm1hcChmdW5jdGlvbiAoY2hhcmFjdGVyLCBpKSB7XG4gICAgICAgIHJldHVybiAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9MZXR0ZXJbXCJkZWZhdWx0XCJdLCB7XG4gICAgICAgICAgYW5pbWF0ZTogX3RoaXMzLnN0YXRlLmFuaW1hdGUsXG4gICAgICAgICAgZGlyZWN0aW9uOiBfdGhpczMuc3RhdGUuZGlyZWN0aW9uLFxuICAgICAgICAgIGZvY3VzOiBfdGhpczMucHJvcHMuaXNDdXJyZW50Um93ICYmIF90aGlzMy5zdGF0ZS5hY3RpdmVMZXR0ZXIgPT09IGksXG4gICAgICAgICAgaXNDb21wbGV0ZTogX3RoaXMzLnByb3BzLmlzQ29tcGxldGUsXG4gICAgICAgICAgaXNDdXJyZW50Um93OiBfdGhpczMucHJvcHMuaXNDdXJyZW50Um93LFxuICAgICAgICAgIGlzU3BhY2U6IGNoYXJhY3Rlci5jb3JyZWN0TGV0dGVyID09PSAnICcsXG4gICAgICAgICAga2V5OiBpLFxuICAgICAgICAgIGxldHRlck51bWJlcjogaSxcbiAgICAgICAgICBvbkJhY2tzcGFjZTogZnVuY3Rpb24gb25CYWNrc3BhY2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMzLm9uQmFja3NwYWNlKGkpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uIG9uQ2hhbmdlKGxldHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzMy5vbkNoYW5nZShsZXR0ZXIsIGkpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FbnRlcjogX3RoaXMzLm9uRW50ZXIsXG4gICAgICAgICAgb25SZWZvY3VzQ29tcGxldGU6IF90aGlzMy5wcm9wcy5vblJlZm9jdXNDb21wbGV0ZSxcbiAgICAgICAgICBzdGF0dXM6IGNoYXJhY3Rlci5zdGF0dXMsXG4gICAgICAgICAgdHJpZ2dlckZvY3VzOiBfdGhpczMucHJvcHMudHJpZ2dlckZvY3VzICYmIF90aGlzMy5wcm9wcy5pc0N1cnJlbnRSb3cgJiYgX3RoaXMzLnN0YXRlLmFjdGl2ZUxldHRlciA9PT0gaSxcbiAgICAgICAgICB2YWx1ZTogY2hhcmFjdGVyLmd1ZXNzZWRMZXR0ZXJcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBQaHJhc2U7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuUGhyYXNlLnByb3BUeXBlcyA9IHtcbiAgY29ycmVjdEFuc3dlcjogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRpc3BsYXlNZXNzYWdlOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5mdW5jLmlzUmVxdWlyZWQsXG4gIGd1ZXNzOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgaXNDb21wbGV0ZTogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uYm9vbC5pc1JlcXVpcmVkLFxuICBpc0N1cnJlbnRSb3c6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmJvb2wuaXNSZXF1aXJlZCxcbiAgb25GYWlsOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uUGFzczogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uZnVuYy5pc1JlcXVpcmVkLFxuICBvblJlZm9jdXNDb21wbGV0ZTogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uZnVuYy5pc1JlcXVpcmVkLFxuICBwaHJhc2VOdW1iZXI6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLm51bWJlci5pc1JlcXVpcmVkLFxuICB0cmlnZ2VyRm9jdXM6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmJvb2wuaXNSZXF1aXJlZFxufTtcbnZhciBfZGVmYXVsdCA9IFBocmFzZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gX2RlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcblxufSkuY2FsbCh0aGlzKX0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCIuL0xldHRlclwiOjEyfV0sMTU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpeyhmdW5jdGlvbiAoKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVhY3QnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1JlYWN0J10gOiBudWxsKSk7XG52YXIgX3Byb3BUeXBlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb3BUeXBlcyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvcFR5cGVzJ10gOiBudWxsKSk7XG52YXIgX2ZvY3VzVHJhcFJlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiZm9jdXMtdHJhcC1yZWFjdFwiKSk7XG52YXIgX2pzVXRpbHMgPSByZXF1aXJlKFwianMtdXRpbHNcIik7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgcmV0dXJuIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBfbm9uSXRlcmFibGVTcHJlYWQoKTsgfVxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHsgaWYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgaXRlcltTeW1ib2wuaXRlcmF0b3JdICE9IG51bGwgfHwgaXRlcltcIkBAaXRlcmF0b3JcIl0gIT0gbnVsbCkgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7IH1cbmZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KGFycik7IH1cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxudmFyIFN0YXRpc3RpY3NNb2RhbCA9IGZ1bmN0aW9uIFN0YXRpc3RpY3NNb2RhbChfcmVmKSB7XG4gIHZhciBvbkNsb3NlID0gX3JlZi5vbkNsb3NlLFxuICAgIG9wZW4gPSBfcmVmLm9wZW4sXG4gICAgc3RhdHMgPSBfcmVmLnN0YXRzLFxuICAgIHRlc3RpbmcgPSBfcmVmLnRlc3Rpbmc7XG4gIHZhciBhdHRyaWJ1dGVzID0ge1xuICAgICdhcmlhLWxhYmVsJzogJ1N0YXRpc3RpY3MnLFxuICAgIGNsYXNzTmFtZTogJ3N0YXRzJyxcbiAgICByb2xlOiAncmVnaW9uJ1xuICB9O1xuICBpZiAob3Blbikge1xuICAgIGF0dHJpYnV0ZXMuY2xhc3NOYW1lICs9ICcgb3Blbic7XG4gICAgX2pzVXRpbHNbXCJjbGFzc1wiXS5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAnbW9kYWwtb3BlbicpO1xuICB9IGVsc2Uge1xuICAgIF9qc1V0aWxzW1wiY2xhc3NcIl0ucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ21vZGFsLW9wZW4nKTtcbiAgfVxuICB2YXIgd2luUGVyY2VudGFnZSA9IHN0YXRzLmdhbWVzUGxheWVkID4gMCAmJiBzdGF0cy5nYW1lc1dvbiA+IDAgPyBNYXRoLnJvdW5kKHN0YXRzLmdhbWVzV29uIC8gc3RhdHMuZ2FtZXNQbGF5ZWQgKiAxMDApIDogMDtcbiAgdmFyIG1heEd1ZXNzRGlzdHJpYnV0aW9uID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgX3RvQ29uc3VtYWJsZUFycmF5KHN0YXRzLmd1ZXNzRGlzdHJpYnV0aW9uKSk7XG4gIHZhciB1bml0V2lkdGggPSBtYXhHdWVzc0Rpc3RyaWJ1dGlvbiA+IDAgPyAxMDAgLyBtYXhHdWVzc0Rpc3RyaWJ1dGlvbiA6IDA7XG5cbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vZm9jdXMtdHJhcC9mb2N1cy10cmFwI3Rlc3RpbmctaW4tanNkb21cbiAgdmFyIGZvY3VzVHJhcE9wdGlvbnMgPSB0ZXN0aW5nID8ge1xuICAgIHRhYmJhYmxlT3B0aW9uczoge1xuICAgICAgZGlzcGxheUNoZWNrOiAnbm9uZSdcbiAgICB9XG4gIH0gOiB7fTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgYXR0cmlidXRlcywgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgY2xhc3NOYW1lOiAnb3ZlcmxheSdcbiAgfSksIG9wZW4gJiYgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfZm9jdXNUcmFwUmVhY3RbXCJkZWZhdWx0XCJdLCB7XG4gICAgZm9jdXNUcmFwT3B0aW9uczogZm9jdXNUcmFwT3B0aW9uc1xuICB9LCAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICBjbGFzc05hbWU6ICdzdGF0cy1jb250YWluZXInXG4gIH0sIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xuICAgIGNsYXNzTmFtZTogJ2Nsb3NlJyxcbiAgICBvbkNsaWNrOiBvbkNsb3NlXG4gIH0sIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwge1xuICAgIHNyYzogJy4uLy4uLy4uL2J1aWxkL2ltYWdlcy9jbG9zZS5zdmcnLFxuICAgIGFsdDogJ0Nsb3NlIG1vZGFsJ1xuICB9KSksIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCBudWxsLCBcIlN0YXRpc3RpY3NcIiksIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkbFwiLCB7XG4gICAgY2xhc3NOYW1lOiAnb3ZlcmFsbC1zdGF0cydcbiAgfSwgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImR0XCIsIG51bGwsIFwiR2FtZXMgcGxheWVkXCIpLCAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiZGRcIiwge1xuICAgIFwiZGF0YS10ZXN0aWRcIjogJ2dhbWVzUGxheWVkJ1xuICB9LCBzdGF0cy5nYW1lc1BsYXllZCksIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkdFwiLCBudWxsLCBcIldpbiBwZXJjZW50YWdlXCIpLCAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiZGRcIiwge1xuICAgIFwiZGF0YS10ZXN0aWRcIjogJ3dpblBlcmNlbnRhZ2UnXG4gIH0sIHdpblBlcmNlbnRhZ2UsIFwiJVwiKSwgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImR0XCIsIG51bGwsIFwiQ3VycmVudCBzdHJlYWtcIiksIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkZFwiLCB7XG4gICAgXCJkYXRhLXRlc3RpZFwiOiAnd2luU3RyZWFrJ1xuICB9LCBzdGF0cy53aW5TdHJlYWspLCAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiZHRcIiwgbnVsbCwgXCJNYXggc3RyZWFrXCIpLCAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiZGRcIiwge1xuICAgIFwiZGF0YS10ZXN0aWRcIjogJ21heFN0cmVhaydcbiAgfSwgc3RhdHMubWF4U3RyZWFrKSksIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCBcIkd1ZXNzIGRpc3RyaWJ1dGlvblwiKSwgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImRsXCIsIHtcbiAgICBjbGFzc05hbWU6ICdndWVzcy1kaXN0cmlidXRpb24nXG4gIH0sIHN0YXRzLmd1ZXNzRGlzdHJpYnV0aW9uLm1hcChmdW5jdGlvbiAoZ3Vlc3NDb3VudCwgZ3Vlc3NOdW1iZXIpIHtcbiAgICB2YXIgYmFyV2lkdGggPSBcIlwiLmNvbmNhdCh1bml0V2lkdGggKiBndWVzc0NvdW50LCBcIiVcIik7XG4gICAgcmV0dXJuIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX3JlYWN0W1wiZGVmYXVsdFwiXS5GcmFnbWVudCwge1xuICAgICAga2V5OiBndWVzc051bWJlclxuICAgIH0sIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkdFwiLCB7XG4gICAgICBcImRhdGEtdGVzdGlkXCI6IFwiZ3Vlc3NEaXN0cmlidXRpb24tbGFiZWwtXCIuY29uY2F0KGd1ZXNzTnVtYmVyKVxuICAgIH0sIFwiR2FtZXMgd29uIHdpdGggXCIsIGd1ZXNzTnVtYmVyICsgMSwgXCIgZ3Vlc3Nlc1wiKSwgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImRkXCIsIHtcbiAgICAgIFwiZGF0YS10ZXN0aWRcIjogXCJndWVzc0Rpc3RyaWJ1dGlvbi1jb3VudC1cIi5jb25jYXQoZ3Vlc3NOdW1iZXIpLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgd2lkdGg6IGJhcldpZHRoXG4gICAgICB9XG4gICAgfSwgZ3Vlc3NDb3VudCkpO1xuICB9KSkpKSk7XG59O1xuU3RhdGlzdGljc01vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgdGVzdGluZzogZmFsc2Vcbn07XG5TdGF0aXN0aWNzTW9kYWwucHJvcFR5cGVzID0ge1xuICBvbkNsb3NlOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5mdW5jLmlzUmVxdWlyZWQsXG4gIG9wZW46IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmJvb2wuaXNSZXF1aXJlZCxcbiAgc3RhdHM6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLm9iamVjdC5pc1JlcXVpcmVkLFxuICB0ZXN0aW5nOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5ib29sXG59O1xudmFyIF9kZWZhdWx0ID0gU3RhdGlzdGljc01vZGFsO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xuXG59KS5jYWxsKHRoaXMpfSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcImZvY3VzLXRyYXAtcmVhY3RcIjoxLFwianMtdXRpbHNcIjozfV0sMTY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpeyhmdW5jdGlvbiAoKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUmVhY3QnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1JlYWN0J10gOiBudWxsKSk7XG52YXIgX3Byb3BUeXBlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ1Byb3BUeXBlcyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUHJvcFR5cGVzJ10gOiBudWxsKSk7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBcImRlZmF1bHRcIjogb2JqIH07IH1cbnZhciBTdXBwb3J0aW5nQ29udGVudCA9IGZ1bmN0aW9uIFN1cHBvcnRpbmdDb250ZW50KF9yZWYpIHtcbiAgdmFyIGhpZGRlbiA9IF9yZWYuaGlkZGVuLFxuICAgIGhlYWRsaW5lID0gX3JlZi5oZWFkbGluZSxcbiAgICBsaW5rID0gX3JlZi5saW5rLFxuICAgIHN1bW1hcnkgPSBfcmVmLnN1bW1hcnksXG4gICAgdGh1bWJuYWlsID0gX3JlZi50aHVtYm5haWw7XG4gIHZhciBhdHRyaWJ1dGVzID0ge1xuICAgICdhcmlhLWhpZGRlbic6IGhpZGRlbixcbiAgICAnYXJpYS1sYWJlbCc6ICdTZWUgaXQgb24gdGhlIEh1YicsXG4gICAgJ2FyaWEtbGl2ZSc6ICdwb2xpdGUnLFxuICAgIGNsYXNzTmFtZTogJ3N1cHBvcnRpbmctY29udGVudCcsXG4gICAgcm9sZTogJ3JlZ2lvbidcbiAgfTtcbiAgcmV0dXJuIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgYXR0cmlidXRlcywgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImgyXCIsIG51bGwsIFwiU2VlIGl0IG9uIHRoZSBIdWJcIiksIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgIGNsYXNzTmFtZTogJ2FydGljbGUgdGVhc2VyJ1xuICB9KSk7XG5cbiAgLy8gPGRpdiBjbGFzcz1cImFydGljbGUgdGVhc2VyIGNvbHVtbiBmb3JjZSBoYXMtaW1hZ2VcIj5cblxuICAvLyAgIDxkaXYgY2xhc3M9XCJ0aHVtYm5haWxcIj5cbiAgLy8gICAgIDxhIGNsYXNzPVwiZm9yY2VcIiBocmVmPVwiaHR0cHM6Ly9odWIuamh1LmVkdS8yMDIyLzExLzEwL3ZldGVyYW5zLWhlYWx0aC1yaXRhLWRhb3VzdC9cIiBkYXRhLWxhYmVsPVwiT24gdGhlIGZyb250IGxpbmVzIG9mIHZldGVyYW4gaGVhbHRoIGNhcmVcIj5cbiAgLy8gICAgICAgPGRpdiBjbGFzcz1cImltYWdlIGNvbHVtbiBmb3JjZSBpbWFnZS1sYW5kc2NhcGVcIj48ZGl2IGNsYXNzPVwiaW1hZ2UtY29udGFpbmVyXCI+PGltZyBzcmM9XCJodHRwczovL2FwaS5odWIuamh1LmVkdS9mYWN0b3J5L3NpdGVzL2RlZmF1bHQvZmlsZXMvc3R5bGVzL2h1Yl90aHVtYm5haWwvcHVibGljLzIwMjItMTEvdmV0ZXJhbi1oZWFsdGgtdGh1bWJuYWlsLmpwZ1wiIGFsdD1cIkEgbWFuIHdlYXJpbmcgYSB2ZXRlcmFuJ3MgY2FwIHNpdHMgd2l0aCBhIGZsYWcgaW4gdGhlIGJhY2tncm91bmQgYW5kIGEgd2Fsa2VyIGluIHRoZSBmb3JlZ3JvdW5kXCIgY2xhc3M9XCJjb2x1bW5cIiBzaXplcz1cIihtaW4td2lkdGg6IDE2ODBweCkgMjEwcHgsIChtaW4td2lkdGg6IDEyODBweCkgMjEwcHgsIChtaW4td2lkdGg6IDEwMjRweCkgMTg3cHgsIChtaW4td2lkdGg6IDg2M3B4KSAxNTBweCwgKG1pbi13aWR0aDogNzY4cHgpIDEyNnB4LCAobWluLXdpZHRoOiA2NDBweCkgMTEycHgsIChtaW4td2lkdGg6IDQxMnB4KSA5NHB4LCAobWluLXdpZHRoOiAzNzVweCkgNjBweCwgNTVweFwiIHNyY3NldD1cImh0dHBzOi8vYXBpLmh1Yi5qaHUuZWR1L2ZhY3Rvcnkvc2l0ZXMvZGVmYXVsdC9maWxlcy9zdHlsZXMvaGFyZF9jcm9wX2xhbmRzY2FwZV8yNDAvcHVibGljLzIwMjItMTEvdmV0ZXJhbi1oZWFsdGgtdGh1bWJuYWlsLmpwZyAyNDB3LCBodHRwczovL2FwaS5odWIuamh1LmVkdS9mYWN0b3J5L3NpdGVzL2RlZmF1bHQvZmlsZXMvc3R5bGVzL2h1Yl90aHVtYm5haWwvcHVibGljLzIwMjItMTEvdmV0ZXJhbi1oZWFsdGgtdGh1bWJuYWlsLmpwZyAzNjB3LCBodHRwczovL2FwaS5odWIuamh1LmVkdS9mYWN0b3J5L3NpdGVzL2RlZmF1bHQvZmlsZXMvc3R5bGVzL2hhcmRfY3JvcF9sYW5kc2NhcGVfNTQwL3B1YmxpYy8yMDIyLTExL3ZldGVyYW4taGVhbHRoLXRodW1ibmFpbC5qcGcgNTQwdywgaHR0cHM6Ly9hcGkuaHViLmpodS5lZHUvZmFjdG9yeS9zaXRlcy9kZWZhdWx0L2ZpbGVzL3N0eWxlcy9oYXJkX2Nyb3BfbGFuZHNjYXBlXzcyMC9wdWJsaWMvMjAyMi0xMS92ZXRlcmFuLWhlYWx0aC10aHVtYm5haWwuanBnIDcyMHcsIGh0dHBzOi8vYXBpLmh1Yi5qaHUuZWR1L2ZhY3Rvcnkvc2l0ZXMvZGVmYXVsdC9maWxlcy9zdHlsZXMvbGFuZHNjYXBlL3B1YmxpYy8yMDIyLTExL3ZldGVyYW4taGVhbHRoLXRodW1ibmFpbC5qcGcgOTAwdywgaHR0cHM6Ly9hcGkuaHViLmpodS5lZHUvZmFjdG9yeS9zaXRlcy9kZWZhdWx0L2ZpbGVzL3N0eWxlcy9oYXJkX2Nyb3BfbGFuZHNjYXBlXzEwMDUvcHVibGljLzIwMjItMTEvdmV0ZXJhbi1oZWFsdGgtdGh1bWJuYWlsLmpwZyAxMDA1dywgaHR0cHM6Ly9hcGkuaHViLmpodS5lZHUvZmFjdG9yeS9zaXRlcy9kZWZhdWx0L2ZpbGVzL3N0eWxlcy9oYXJkX2Nyb3BfbGFuZHNjYXBlXzEyMzAvcHVibGljLzIwMjItMTEvdmV0ZXJhbi1oZWFsdGgtdGh1bWJuYWlsLmpwZyAxMjMwdywgaHR0cHM6Ly9hcGkuaHViLmpodS5lZHUvZmFjdG9yeS9zaXRlcy9kZWZhdWx0L2ZpbGVzL3N0eWxlcy9oYXJkX2Nyb3BfbGFuZHNjYXBlXzEzODAvcHVibGljLzIwMjItMTEvdmV0ZXJhbi1oZWFsdGgtdGh1bWJuYWlsLmpwZyAxMzgwd1wiPjwvZGl2PjwvZGl2PlxuICAvLyAgICAgPC9hPlxuICAvLyAgIDwvZGl2PlxuXG4gIC8vICAgPGRpdiBjbGFzcz1cInRleHRcIj5cblxuICAvLyAgICAgPGRpdiBjbGFzcz1cImFjY2VudC1lbGVtZW50XCI+XG5cbiAgLy8gICAgICAgPGRpdiBjbGFzcz1cImtpY2tlclwiPlE8c3BhbiBjbGFzcz1cInBsdXNcIj4rPC9zcGFuPkE8L2Rpdj5cblxuICAvLyAgICAgICA8aDU+PGEgaHJlZj1cImh0dHBzOi8vaHViLmpodS5lZHUvMjAyMi8xMS8xMC92ZXRlcmFucy1oZWFsdGgtcml0YS1kYW91c3QvXCIgZGF0YS1sYWJlbD1cIk9uIHRoZSBmcm9udCBsaW5lcyBvZiB2ZXRlcmFuIGhlYWx0aCBjYXJlXCI+XG5cbiAgLy8gICAgICAgICBPbiB0aGUgZnJvbnQgbGluZXMgb2YgdmV0ZXJhbiBoZWFsdGhcblxuICAvLyAgICAgICA8L2E+PC9oNT5cblxuICAvLyAgICAgICA8c3BhbiBjbGFzcz1cInZpc3VhbGx5aGlkZGVuXCI+UHVibGlzaGVkPC9zcGFuPlxuXG4gIC8vICAgICAgIDxzcGFuIGNsYXNzPVwicHVibGlzaC1kYXRlIGNvbnZlcnQtcHViZGF0ZVwiIGRhdGEtdGltZXN0YW1wPVwiMTY2ODExNzYxNFwiPiA8aSBjbGFzcz1cImZhIGZhLWNsb2NrLW9cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IGEgZGF5IGFnbzwvc3Bhbj5cblxuICAvLyAgICAgICA8ZGl2IGNsYXNzPVwic3VtbWFyeVwiPkpvaG5zIEhvcGtpbnMgbnVyc2luZyBleHBlcnQgUml0YSBEJ0FvdXN0IGFuZCBoZXIgbG9uZ3RpbWUgcmVzZWFyY2ggY29sbGVhZ3VlIEFsaWNpYSBHaWxsIFJvc3NpdGVyIGFyZSB3b3JraW5nIHRvIGNoYW5nZSBob3cgdmV0ZXJhbnMgYW5kIHRoZWlyIGZhbWlsaWVzIHJlY2VpdmUgaGVhbHRoIGNhcmUgaW4gdGhlIFVuaXRlZCBTdGF0ZXNcblxuICAvLyAgICAgICA8L2Rpdj5cblxuICAvLyAgICAgPC9kaXY+XG5cbiAgLy8gICA8L2Rpdj5cblxuICAvLyA8L2Rpdj5cbn07XG5cblN1cHBvcnRpbmdDb250ZW50LnByb3BUeXBlcyA9IHtcbiAgaGVhZGxpbmU6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLnN0cmluZy5pc1JlcXVpcmVkLFxuICBsaW5rOiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgc3VtbWFyeTogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRodW1ibmFpbDogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGhpZGRlbjogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0uYm9vbC5pc1JlcXVpcmVkXG59O1xudmFyIF9kZWZhdWx0ID0gU3VwcG9ydGluZ0NvbnRlbnQ7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5cbn0pLmNhbGwodGhpcyl9KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se31dLDE3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXsoZnVuY3Rpb24gKCl7XG5cInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH0sIF90eXBlb2Yob2JqKTsgfVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKCh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydSZWFjdCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnUmVhY3QnXSA6IG51bGwpKTtcbnZhciBfcHJvcFR5cGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdCgodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snUHJvcFR5cGVzJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydQcm9wVHlwZXMnXSA6IG51bGwpKTtcbnZhciBfcGVyc2lzdGFuY2UgPSByZXF1aXJlKFwiLi9saWIvaGVscGVycy9wZXJzaXN0YW5jZVwiKTtcbnZhciBfc3RvcmFnZSA9IHJlcXVpcmUoXCIuL2xpYi9oZWxwZXJzL3N0b3JhZ2VcIik7XG52YXIgX3N0YXRpc3RpY3MgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9oZWxwZXJzL3N0YXRpc3RpY3NcIikpO1xudmFyIF9BbnN3ZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9wdXp6bGUtcGFydHMvQW5zd2VyXCIpKTtcbnZhciBfQ2x1ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL3B1enpsZS1wYXJ0cy9DbHVlXCIpKTtcbnZhciBfR3Vlc3NlcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL3B1enpsZS1wYXJ0cy9HdWVzc2VzXCIpKTtcbnZhciBfTWVzc2FnZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL3B1enpsZS1wYXJ0cy9NZXNzYWdlXCIpKTtcbnZhciBfU3RhdGlzdGljc01vZGFsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvcHV6emxlLXBhcnRzL1N0YXRpc3RpY3NNb2RhbFwiKSk7XG52YXIgX1N1cHBvcnRpbmdDb250ZW50ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvcHV6emxlLXBhcnRzL1N1cHBvcnRpbmdDb250ZW50XCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IFwiZGVmYXVsdFwiOiBvYmogfTsgfVxuZnVuY3Rpb24gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKSB7IGlmICh0eXBlb2YgV2Vha01hcCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDsgdmFyIGNhY2hlQmFiZWxJbnRlcm9wID0gbmV3IFdlYWtNYXAoKTsgdmFyIGNhY2hlTm9kZUludGVyb3AgPSBuZXcgV2Vha01hcCgpOyByZXR1cm4gKF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSA9IGZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZShub2RlSW50ZXJvcCkgeyByZXR1cm4gbm9kZUludGVyb3AgPyBjYWNoZU5vZGVJbnRlcm9wIDogY2FjaGVCYWJlbEludGVyb3A7IH0pKG5vZGVJbnRlcm9wKTsgfVxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqLCBub2RlSW50ZXJvcCkgeyBpZiAoIW5vZGVJbnRlcm9wICYmIG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGlmIChvYmogPT09IG51bGwgfHwgX3R5cGVvZihvYmopICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmogIT09IFwiZnVuY3Rpb25cIikgeyByZXR1cm4geyBcImRlZmF1bHRcIjogb2JqIH07IH0gdmFyIGNhY2hlID0gX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlKG5vZGVJbnRlcm9wKTsgaWYgKGNhY2hlICYmIGNhY2hlLmhhcyhvYmopKSB7IHJldHVybiBjYWNoZS5nZXQob2JqKTsgfSB2YXIgbmV3T2JqID0ge307IHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoa2V5ICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsOyBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7IH0gZWxzZSB7IG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSB9IG5ld09ialtcImRlZmF1bHRcIl0gPSBvYmo7IGlmIChjYWNoZSkgeyBjYWNoZS5zZXQob2JqLCBuZXdPYmopOyB9IHJldHVybiBuZXdPYmo7IH1cbmZ1bmN0aW9uIF9leHRlbmRzKCkgeyBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9OyByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfVxuZnVuY3Rpb24gb3duS2V5cyhvYmplY3QsIGVudW1lcmFibGVPbmx5KSB7IHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7IGVudW1lcmFibGVPbmx5ICYmIChzeW1ib2xzID0gc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHN5bSkgeyByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHN5bSkuZW51bWVyYWJsZTsgfSkpLCBrZXlzLnB1c2guYXBwbHkoa2V5cywgc3ltYm9scyk7IH0gcmV0dXJuIGtleXM7IH1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBudWxsICE9IGFyZ3VtZW50c1tpXSA/IGFyZ3VtZW50c1tpXSA6IHt9OyBpICUgMiA/IG93bktleXMoT2JqZWN0KHNvdXJjZSksICEwKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHNvdXJjZSkpIDogb3duS2V5cyhPYmplY3Qoc291cmNlKSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpOyB9KTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3ViQ2xhc3MsIFwicHJvdG90eXBlXCIsIHsgd3JpdGFibGU6IGZhbHNlIH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7IG8uX19wcm90b19fID0gcDsgcmV0dXJuIG87IH07IHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7IH1cbmZ1bmN0aW9uIF9jcmVhdGVTdXBlcihEZXJpdmVkKSB7IHZhciBoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0ID0gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpOyByZXR1cm4gZnVuY3Rpb24gX2NyZWF0ZVN1cGVySW50ZXJuYWwoKSB7IHZhciBTdXBlciA9IF9nZXRQcm90b3R5cGVPZihEZXJpdmVkKSwgcmVzdWx0OyBpZiAoaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCkgeyB2YXIgTmV3VGFyZ2V0ID0gX2dldFByb3RvdHlwZU9mKHRoaXMpLmNvbnN0cnVjdG9yOyByZXN1bHQgPSBSZWZsZWN0LmNvbnN0cnVjdChTdXBlciwgYXJndW1lbnRzLCBOZXdUYXJnZXQpOyB9IGVsc2UgeyByZXN1bHQgPSBTdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpOyB9IHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCByZXN1bHQpOyB9OyB9XG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IGVsc2UgaWYgKGNhbGwgIT09IHZvaWQgMCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRGVyaXZlZCBjb25zdHJ1Y3RvcnMgbWF5IG9ubHkgcmV0dXJuIG9iamVjdCBvciB1bmRlZmluZWRcIik7IH0gcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7IH1cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuZnVuY3Rpb24gX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCgpIHsgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcInVuZGVmaW5lZFwiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB0cnVlOyB0cnkgeyBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5mdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgeyBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHsgcmV0dXJuIG8uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihvKTsgfTsgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsgfVxudmFyIFB1enpsZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoUHV6emxlLCBfQ29tcG9uZW50KTtcbiAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihQdXp6bGUpO1xuICBmdW5jdGlvbiBQdXp6bGUocHJvcHMpIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFB1enpsZSk7XG4gICAgcHJvcHMucHV6emxlLmFuc3dlciA9IHByb3BzLnB1enpsZS5hbnN3ZXIudG9VcHBlckNhc2UoKTtcbiAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHByb3BzKTtcbiAgICBfdGhpcy5hdmFpbGFibGVHdWVzc2VzID0gNjtcbiAgICBfdGhpcy5zdXBwb3J0aW5nQ29udGVudCA9IG51bGw7XG4gICAgX3RoaXMubG9hZFB1enpsZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcmV0dXJuICgwLCBfcGVyc2lzdGFuY2UubG9hZFB1enpsZVN0YXRlKShpZCk7XG4gICAgfTtcbiAgICBfdGhpcy5zYXZlUHV6emxlID0gZnVuY3Rpb24gKGlkLCBwdXp6bGUpIHtcbiAgICAgIHJldHVybiAoMCwgX3BlcnNpc3RhbmNlLnNhdmVQdXp6bGVTdGF0ZSkoaWQsIHB1enpsZSk7XG4gICAgfTtcbiAgICBfdGhpcy5vblB1enpsZUNvbXBsZXRlID0gcHJvcHMub25QdXp6bGVDb21wbGV0ZSB8fCBmdW5jdGlvbiAoc3RhdHVzLCBudW1iZXJPZkd1ZXNzZXMpIHt9O1xuICAgIF90aGlzLmZldGNoU3VwcG9ydGluZ0NvbnRlbnQgPSBwcm9wcy5mZXRjaFN1cHBvcnRpbmdDb250ZW50IHx8IGZ1bmN0aW9uIChlbmRwb2ludCkge307XG5cbiAgICAvLyBmZXRjaCBhbnkgc3RvcmVkIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICB2YXIgc3RvcmVkID0gX3RoaXMubG9hZFB1enpsZShfdGhpcy5wcm9wcy5pZCkgfHwge307XG4gICAgX3RoaXMuc3RhdHMgPSBuZXcgX3N0YXRpc3RpY3NbXCJkZWZhdWx0XCJdKF90aGlzLmF2YWlsYWJsZUd1ZXNzZXMsIF9zdG9yYWdlLmxvY2FsLCBfdGhpcy5wcm9wcy5sb2dnZXIpO1xuXG4gICAgLy8gY29tYmluZSBzdG9yZWQgYW5kIGRlZmF1bHQgc3RhdGVcbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1lc3NhZ2U6IHt9LFxuICAgICAgcHV6emxlOiBfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgZ3Vlc3NlczogQXJyYXkuYXBwbHkobnVsbCwgQXJyYXkoX3RoaXMuYXZhaWxhYmxlR3Vlc3NlcykpLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9KSxcbiAgICAgICAgY3VycmVudFJvdzogMCxcbiAgICAgICAgc3RhdHVzOiAnSU5fUFJPR1JFU1MnXG4gICAgICB9LCBzdG9yZWQpLFxuICAgICAgc3RhdE1vYmlsZU9wZW46IGZhbHNlXG4gICAgfTtcbiAgICBfdGhpcy5jbGVhclB1enpsZURhdGEgPSBfdGhpcy5jbGVhclB1enpsZURhdGEuYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7XG4gICAgX3RoaXMuY2xlYXJTdGF0c0RhdGEgPSBfdGhpcy5jbGVhclN0YXRzRGF0YS5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5pbmNyZW1lbnRTdGF0cyA9IF90aGlzLmluY3JlbWVudFN0YXRzLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLm9wZW5TdGF0c01vZGFsID0gX3RoaXMub3BlblN0YXRzTW9kYWwuYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7XG4gICAgX3RoaXMuY2xvc2VTdGF0c01vZGFsID0gX3RoaXMuY2xvc2VTdGF0c01vZGFsLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIF90aGlzLmRpc3BsYXlNZXNzYWdlID0gX3RoaXMuZGlzcGxheU1lc3NhZ2UuYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7XG4gICAgX3RoaXMub25HdWVzc0ZhaWwgPSBfdGhpcy5vbkd1ZXNzRmFpbC5iaW5kKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpKTtcbiAgICBfdGhpcy5vblB1enpsZVBhc3MgPSBfdGhpcy5vblB1enpsZVBhc3MuYmluZChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSk7XG4gICAgX3RoaXMuY2xlYXJNZXNzYWdlID0gX3RoaXMuY2xlYXJNZXNzYWdlLmJpbmQoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcykpO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICBfY3JlYXRlQ2xhc3MoUHV6emxlLCBbe1xuICAgIGtleTogXCJjb21wb25lbnREaWRNb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5wdXp6bGUuc3VwcG9ydGluZ0NvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIHRoaXMuZmV0Y2hTdXBwb3J0aW5nQ29udGVudCBzaG91bGQgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcga2V5czogaGVhZGxpbmUsIGxpbmssIHN1bW1hcnksIHRodW1ibmFpbFxuICAgICAgICB0aGlzLnN1cHBvcnRpbmdDb250ZW50ID0gdGhpcy5mZXRjaFN1cHBvcnRpbmdDb250ZW50KHRoaXMucHJvcHMucHV6emxlLnN1cHBvcnRpbmdDb250ZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xlYXJQdXp6bGVEYXRhXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyUHV6emxlRGF0YSgpIHtcbiAgICAgIF9zdG9yYWdlLmxvY2FsLnJlbW92ZSgnaG9wa2luc2h1cmRsZS4nICsgdGhpcy5wcm9wcy5pZCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNsZWFyU3RhdHNEYXRhXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyU3RhdHNEYXRhKCkge1xuICAgICAgX3N0b3JhZ2UubG9jYWwucmVtb3ZlKCdob3BraW5zaHVyZGxlLnN0YXRzJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImluY3JlbWVudFN0YXRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluY3JlbWVudFN0YXRzKCkge1xuICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0cy5pbmNyZW1lbnQoKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9wZW5TdGF0c01vZGFsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9wZW5TdGF0c01vZGFsKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHN0YXRNb2JpbGVPcGVuOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xvc2VTdGF0c01vZGFsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsb3NlU3RhdHNNb2RhbCgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBzdGF0TW9iaWxlT3BlbjogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvbkd1ZXNzRmFpbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkd1ZXNzRmFpbChndWVzcywgbnVtYmVyT2ZHdWVzc2VzKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICAgIHRoaXMuc2V0U3RhdGUoZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHZhciBwdXp6bGUgPSBzdGF0ZS5wdXp6bGU7XG5cbiAgICAgICAgLy8gdXBkYXRlIGd1ZXNzZXNcbiAgICAgICAgcHV6emxlLmd1ZXNzZXNbcHV6emxlLmN1cnJlbnRSb3ddID0gZ3Vlc3M7XG5cbiAgICAgICAgLy8gcmFuIG91dCBvZiBndWVzc2VzXG4gICAgICAgIGlmIChwdXp6bGUuY3VycmVudFJvdyArIDEgPT09IF90aGlzMi5hdmFpbGFibGVHdWVzc2VzKSB7XG4gICAgICAgICAgcHV6emxlLnN0YXR1cyA9ICdGQUlMJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwdXp6bGUuY3VycmVudFJvdyA9IHB1enpsZS5jdXJyZW50Um93ICsgMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHB1enpsZTogcHV6emxlXG4gICAgICAgIH07XG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi5zYXZlUHV6emxlKF90aGlzMi5wcm9wcy5pZCwgX3RoaXMyLnN0YXRlLnB1enpsZSk7XG4gICAgICAgIGlmIChfdGhpczIuc3RhdGUucHV6emxlLnN0YXR1cyA9PT0gJ0ZBSUwnKSB7XG4gICAgICAgICAgX3RoaXMyLm9uUHV6emxlRW5kKG51bWJlck9mR3Vlc3Nlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMyLmRpc3BsYXlNZXNzYWdlKHtcbiAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdZb3VyIGd1ZXNzIGlzIGluY29ycmVjdC4nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvblB1enpsZVBhc3NcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25QdXp6bGVQYXNzKGd1ZXNzLCBudW1iZXJPZkd1ZXNzZXMpIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuICAgICAgdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdmFyIHB1enpsZSA9IHN0YXRlLnB1enpsZTtcbiAgICAgICAgcHV6emxlLnN0YXR1cyA9ICdQQVNTJztcblxuICAgICAgICAvLyB1cGRhdGUgZ3Vlc3Nlc1xuICAgICAgICBwdXp6bGUuZ3Vlc3Nlc1twdXp6bGUuY3VycmVudFJvd10gPSBndWVzcztcbiAgICAgICAgcHV6emxlLmd1ZXNzZXMgPSBwdXp6bGUuZ3Vlc3NlcztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwdXp6bGU6IHB1enpsZVxuICAgICAgICB9O1xuICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczMuc2F2ZVB1enpsZShfdGhpczMucHJvcHMuaWQsIF90aGlzMy5zdGF0ZS5wdXp6bGUpO1xuICAgICAgICBfdGhpczMub25QdXp6bGVFbmQobnVtYmVyT2ZHdWVzc2VzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbGVhck1lc3NhZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXJNZXNzYWdlKCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG1lc3NhZ2U6IHt9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZGlzcGxheU1lc3NhZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzcGxheU1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvblB1enpsZUVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblB1enpsZUVuZChudW1iZXJPZkd1ZXNzZXMpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuICAgICAgdGhpcy5zdGF0cy5zdGF0cyA9IHRoaXMuc3RhdHMudXBkYXRlKHRoaXMuc3RhdGUucHV6emxlLnN0YXR1cywgbnVtYmVyT2ZHdWVzc2VzKTtcbiAgICAgIHRoaXMub25QdXp6bGVDb21wbGV0ZSh0aGlzLnN0YXRlLnB1enpsZS5zdGF0dXMsIG51bWJlck9mR3Vlc3Nlcyk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXM0LmRpc3BsYXlNZXNzYWdlKHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIG1lc3NhZ2U6IF90aGlzNC5zdGF0ZS5wdXp6bGUuc3RhdHVzID09PSAnUEFTUycgPyAnR3JlYXQgam9iIScgOiAnQmV0dGVyIGx1Y2sgbmV4dCB0aW1lLidcbiAgICAgICAgfSk7XG4gICAgICB9LCB0aGlzLnByb3BzLnB1enpsZS5hbnN3ZXIubGVuZ3RoICogMTAwICsgNzUwKTsgLy8gNzUwbXMgYWZ0ZXIgYW5pbWF0aW9uIGZpbmlzaGVzXG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgcmVtYWluaW5nR3Vlc3NlcyA9IHRoaXMuYXZhaWxhYmxlR3Vlc3NlcyAtIHRoaXMuc3RhdGUucHV6emxlLmd1ZXNzZXMuZmlsdGVyKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfSkubGVuZ3RoO1xuICAgICAgcmV0dXJuIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX3JlYWN0W1wiZGVmYXVsdFwiXS5GcmFnbWVudCwgbnVsbCwgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfU3RhdGlzdGljc01vZGFsW1wiZGVmYXVsdFwiXSwge1xuICAgICAgICBvbkNsb3NlOiB0aGlzLmNsb3NlU3RhdHNNb2RhbCxcbiAgICAgICAgb3BlbjogdGhpcy5zdGF0ZS5zdGF0TW9iaWxlT3BlbixcbiAgICAgICAgc3RhdHM6IHRoaXMuc3RhdHMuc3RhdHNcbiAgICAgIH0pLCAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9NZXNzYWdlW1wiZGVmYXVsdFwiXSwgX2V4dGVuZHMoe1xuICAgICAgICBoaWRkZW46IHRoaXMuc3RhdGUuc3RhdE1vYmlsZU9wZW4sXG4gICAgICAgIG9uVHRsOiB0aGlzLmNsZWFyTWVzc2FnZVxuICAgICAgfSwgdGhpcy5zdGF0ZS5tZXNzYWdlKSksIHRoaXMucHJvcHMucHV6emxlLmNsdWVzICYmIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoX0NsdWVbXCJkZWZhdWx0XCJdLCB7XG4gICAgICAgIGNsdWU6IHRoaXMucHJvcHMucHV6emxlLmNsdWVzW3RoaXMuc3RhdGUucHV6emxlLmN1cnJlbnRSb3ddLFxuICAgICAgICBjdXJyZW50Um93OiB0aGlzLnN0YXRlLnB1enpsZS5jdXJyZW50Um93LFxuICAgICAgICBoaWRkZW46IHRoaXMuc3RhdGUuc3RhdE1vYmlsZU9wZW5cbiAgICAgIH0pLCAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9HdWVzc2VzW1wiZGVmYXVsdFwiXSwge1xuICAgICAgICBhbnN3ZXJEZXNjcmlwdGlvbjogdGhpcy5wcm9wcy5wdXp6bGUuYW5zd2VyRGVzY3JpcHRpb24sXG4gICAgICAgIGN1cnJlbnRSb3c6IHRoaXMuc3RhdGUucHV6emxlLmN1cnJlbnRSb3csXG4gICAgICAgIGNvcnJlY3RBbnN3ZXI6IHRoaXMucHJvcHMucHV6emxlLmFuc3dlci50b1VwcGVyQ2FzZSgpLFxuICAgICAgICBkaXNwbGF5TWVzc2FnZTogdGhpcy5kaXNwbGF5TWVzc2FnZSxcbiAgICAgICAgZ3Vlc3NlczogdGhpcy5zdGF0ZS5wdXp6bGUuZ3Vlc3NlcyxcbiAgICAgICAgaGlkZGVuOiB0aGlzLnN0YXRlLnN0YXRNb2JpbGVPcGVuLFxuICAgICAgICBvbkd1ZXNzRmFpbDogdGhpcy5vbkd1ZXNzRmFpbCxcbiAgICAgICAgb25QdXp6bGVQYXNzOiB0aGlzLm9uUHV6emxlUGFzcyxcbiAgICAgICAgcmVtYWluaW5nR3Vlc3NlczogcmVtYWluaW5nR3Vlc3NlcyxcbiAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXRlLnB1enpsZS5zdGF0dXNcbiAgICAgIH0pLCB0aGlzLnN0YXRlLnB1enpsZS5zdGF0dXMgPT09ICdGQUlMJyAmJiAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KF9BbnN3ZXJbXCJkZWZhdWx0XCJdLCB7XG4gICAgICAgIGFuc3dlcjogdGhpcy5wcm9wcy5wdXp6bGUuYW5zd2VyXG4gICAgICB9KSwgdGhpcy5zdGF0ZS5wdXp6bGUuc3RhdHVzICE9PSAnSU5fUFJPR1JFU1MnICYmIHRoaXMuc3VwcG9ydGluZ0NvbnRlbnQgJiYgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChfU3VwcG9ydGluZ0NvbnRlbnRbXCJkZWZhdWx0XCJdLCBfZXh0ZW5kcyh7XG4gICAgICAgIGhpZGRlbjogdGhpcy5zdGF0ZS5zdGF0TW9iaWxlT3BlblxuICAgICAgfSwgdGhpcy5zdXBwb3J0aW5nQ29udGVudCkpLCB0aGlzLnByb3BzLmRlYnVnICYmIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICBjbGFzc05hbWU6ICdkZWJ1ZydcbiAgICAgIH0sIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuY2xlYXJQdXp6bGVEYXRhXG4gICAgICB9LCBcIkNsZWFyIHN0b3JlZCBwdXp6bGUgZGF0YVwiKSwgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XG4gICAgICAgIG9uQ2xpY2s6IHRoaXMuY2xlYXJTdGF0c0RhdGFcbiAgICAgIH0sIFwiQ2xlYXIgc3RvcmVkIHN0YXRzIGRhdGFcIikpLCAvKiNfX1BVUkVfXyovX3JlYWN0W1wiZGVmYXVsdFwiXS5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIC8qI19fUFVSRV9fKi9fcmVhY3RbXCJkZWZhdWx0XCJdLmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge1xuICAgICAgICBvbkNsaWNrOiB0aGlzLmluY3JlbWVudFN0YXRzXG4gICAgICB9LCBcIkluY3JlbWVudCBTdGF0c1wiKSwgLyojX19QVVJFX18qL19yZWFjdFtcImRlZmF1bHRcIl0uY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XG4gICAgICAgIG9uQ2xpY2s6IHRoaXMub3BlblN0YXRzTW9kYWxcbiAgICAgIH0sIFwiT3BlbiBTdGF0cyBNb2RhbFwiKSkpKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFB1enpsZTtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5QdXp6bGUuZGVmYXVsdFByb3BzID0ge1xuICBkZWJ1ZzogZmFsc2Vcbn07XG5QdXp6bGUucHJvcFR5cGVzID0ge1xuICBmZXRjaFN1cHBvcnRpbmdDb250ZW50OiBfcHJvcFR5cGVzW1wiZGVmYXVsdFwiXS5mdW5jLFxuICBpZDogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0ubnVtYmVyLmlzUmVxdWlyZWQsXG4gIHB1enpsZTogX3Byb3BUeXBlc1tcImRlZmF1bHRcIl0ub2JqZWN0LmlzUmVxdWlyZWQsXG4gIG9uUHV6emxlQ29tcGxldGU6IF9wcm9wVHlwZXNbXCJkZWZhdWx0XCJdLmZ1bmNcbn07XG52YXIgX2RlZmF1bHQgPSBQdXp6bGU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5cbn0pLmNhbGwodGhpcyl9KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wiLi9saWIvaGVscGVycy9wZXJzaXN0YW5jZVwiOjYsXCIuL2xpYi9oZWxwZXJzL3N0YXRpc3RpY3NcIjo3LFwiLi9saWIvaGVscGVycy9zdG9yYWdlXCI6OCxcIi4vbGliL3B1enpsZS1wYXJ0cy9BbnN3ZXJcIjo5LFwiLi9saWIvcHV6emxlLXBhcnRzL0NsdWVcIjoxMCxcIi4vbGliL3B1enpsZS1wYXJ0cy9HdWVzc2VzXCI6MTEsXCIuL2xpYi9wdXp6bGUtcGFydHMvTWVzc2FnZVwiOjEzLFwiLi9saWIvcHV6emxlLXBhcnRzL1N0YXRpc3RpY3NNb2RhbFwiOjE1LFwiLi9saWIvcHV6emxlLXBhcnRzL1N1cHBvcnRpbmdDb250ZW50XCI6MTZ9XX0se30sWzE3XSk7XG4iXSwiZmlsZSI6Im1haW4uanMifQ==
