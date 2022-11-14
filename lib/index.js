/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 483:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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

var React = __webpack_require__(497);

var PropTypes = __webpack_require__(697);

var _require = __webpack_require__(303),
    createFocusTrap = _require.createFocusTrap;

var _require2 = __webpack_require__(388),
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

/***/ }),

/***/ 303:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFocusTrap": () => (/* binding */ createFocusTrap)
/* harmony export */ });
/* harmony import */ var tabbable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(388);
/*!
* focus-trap 7.0.0
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/


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
      var tabbableNodes = (0,tabbable__WEBPACK_IMPORTED_MODULE_0__.tabbable)(container, config.tabbableOptions); // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
      //  are a superset of tabbable nodes

      var focusableNodes = (0,tabbable__WEBPACK_IMPORTED_MODULE_0__.focusable)(container, config.tabbableOptions);
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
              return (0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(n, config.tabbableOptions);
            });
          }

          return focusableNodes.slice(0, nodeIdx).reverse().find(function (n) {
            return (0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(n, config.tabbableOptions);
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
        returnFocus: config.returnFocusOnDeactivate && !(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isFocusable)(target, config.tabbableOptions)
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

        if (startOfGroupIndex < 0 && (containerGroup.container === target || (0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isFocusable)(target, config.tabbableOptions) && !(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
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

        if (lastOfGroupIndex < 0 && (containerGroup.container === target || (0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isFocusable)(target, config.tabbableOptions) && !(0,tabbable__WEBPACK_IMPORTED_MODULE_0__.isTabbable)(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
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


//# sourceMappingURL=focus-trap.esm.js.map


/***/ }),

/***/ 738:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  class: __webpack_require__(218)
};


/***/ }),

/***/ 218:
/***/ ((module) => {

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


/***/ }),

/***/ 703:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(414);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 697:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(703)();
}


/***/ }),

/***/ 414:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 388:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "focusable": () => (/* binding */ focusable),
/* harmony export */   "isFocusable": () => (/* binding */ isFocusable),
/* harmony export */   "isTabbable": () => (/* binding */ isTabbable),
/* harmony export */   "tabbable": () => (/* binding */ tabbable)
/* harmony export */ });
/*!
* tabbable 6.0.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
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


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ 497:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ main)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(497);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
;// CONCATENATED MODULE: ./src/js/lib/helpers/storage.js
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
var session = new Storage('sessionStorage');
;// CONCATENATED MODULE: ./src/js/lib/helpers/persistance.js

var localStorageKey = function localStorageKey(id) {
  return "hopkinshurdle.".concat(id);
};
var savePuzzleState = function savePuzzleState(id, puzzle) {
  try {
    return local.set(localStorageKey(id), puzzle);
  } catch (e) {
    return false;
  }
};
var loadPuzzleState = function loadPuzzleState(id) {
  return local.get(localStorageKey(id));
};

;// CONCATENATED MODULE: ./src/js/lib/helpers/statistics.js
function statistics_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function statistics_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function statistics_createClass(Constructor, protoProps, staticProps) { if (protoProps) statistics_defineProperties(Constructor.prototype, protoProps); if (staticProps) statistics_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Statistics = /*#__PURE__*/function () {
  function Statistics(availableGuesses, localStorage, logger) {
    statistics_classCallCheck(this, Statistics);
    this.availableGuesses = availableGuesses;
    this.localStorage = localStorage;
    this.logger = logger;
    this.localStorageKey = 'hopkinshurdle.stats';
    this.stats = this.validateStoredStats(this.localStorage.get(this.localStorageKey));
  }
  statistics_createClass(Statistics, [{
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

;// CONCATENATED MODULE: ./src/js/lib/puzzle-parts/Answer.js


var Answer = function Answer(_ref) {
  var answer = _ref.answer;
  return /*#__PURE__*/external_react_default().createElement("p", null, "Sorry, the correct answer is ", /*#__PURE__*/external_react_default().createElement("strong", null, answer));
};
Answer.propTypes = {
  answer: (prop_types_default()).string.isRequired
};
/* harmony default export */ const puzzle_parts_Answer = (Answer);
;// CONCATENATED MODULE: ./src/js/lib/puzzle-parts/Clue.js


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
  return /*#__PURE__*/external_react_default().createElement("div", attributes, /*#__PURE__*/external_react_default().createElement("h2", null, header), clue.photo && clue.photo.url && clue.photo.alt_text && /*#__PURE__*/external_react_default().createElement("img", {
    src: clue.photo.url,
    alt: clue.photo.alt_text
  }), clue.text && /*#__PURE__*/external_react_default().createElement("p", null, clue.text));
};
Clue.propTypes = {
  clue: (prop_types_default()).object.isRequired,
  currentRow: (prop_types_default()).number.isRequired,
  hidden: (prop_types_default()).bool.isRequired
};
/* harmony default export */ const puzzle_parts_Clue = (Clue);
;// CONCATENATED MODULE: ./src/js/lib/puzzle-parts/Letter.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function Letter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Letter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function Letter_createClass(Constructor, protoProps, staticProps) { if (protoProps) Letter_defineProperties(Constructor.prototype, protoProps); if (staticProps) Letter_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
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
    Letter_classCallCheck(this, Letter);
    _this = _super.call(this, props);
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    _this.input = /*#__PURE__*/external_react_default().createRef();
    return _this;
  }
  Letter_createClass(Letter, [{
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
      return /*#__PURE__*/external_react_default().createElement("input", {
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
}(external_react_.Component);
Letter.propTypes = {
  animate: (prop_types_default()).bool.isRequired,
  direction: (prop_types_default()).string.isRequired,
  focus: (prop_types_default()).bool.isRequired,
  isComplete: (prop_types_default()).bool.isRequired,
  isCurrentRow: (prop_types_default()).bool.isRequired,
  isSpace: (prop_types_default()).bool.isRequired,
  letterNumber: (prop_types_default()).number.isRequired,
  onBackspace: (prop_types_default()).func.isRequired,
  onEnter: (prop_types_default()).func.isRequired,
  onChange: (prop_types_default()).func.isRequired,
  onRefocusComplete: (prop_types_default()).func.isRequired,
  triggerFocus: (prop_types_default()).bool.isRequired,
  status: (prop_types_default()).string,
  value: (prop_types_default()).string
};
/* harmony default export */ const puzzle_parts_Letter = (Letter);
;// CONCATENATED MODULE: ./src/js/lib/puzzle-parts/Phrase.js
function Phrase_typeof(obj) { "@babel/helpers - typeof"; return Phrase_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Phrase_typeof(obj); }
function Phrase_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Phrase_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function Phrase_createClass(Constructor, protoProps, staticProps) { if (protoProps) Phrase_defineProperties(Constructor.prototype, protoProps); if (staticProps) Phrase_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Phrase_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) Phrase_setPrototypeOf(subClass, superClass); }
function Phrase_setPrototypeOf(o, p) { Phrase_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Phrase_setPrototypeOf(o, p); }
function Phrase_createSuper(Derived) { var hasNativeReflectConstruct = Phrase_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Phrase_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Phrase_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Phrase_possibleConstructorReturn(this, result); }; }
function Phrase_possibleConstructorReturn(self, call) { if (call && (Phrase_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return Phrase_assertThisInitialized(self); }
function Phrase_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function Phrase_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function Phrase_getPrototypeOf(o) { Phrase_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Phrase_getPrototypeOf(o); }



var Phrase = /*#__PURE__*/function (_Component) {
  Phrase_inherits(Phrase, _Component);
  var _super = Phrase_createSuper(Phrase);
  function Phrase(props) {
    var _this;
    Phrase_classCallCheck(this, Phrase);
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
    _this.onBackspace = _this.onBackspace.bind(Phrase_assertThisInitialized(_this));
    _this.onChange = _this.onChange.bind(Phrase_assertThisInitialized(_this));
    _this.onEnter = _this.onEnter.bind(Phrase_assertThisInitialized(_this));
    return _this;
  }
  Phrase_createClass(Phrase, [{
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
      return /*#__PURE__*/external_react_default().createElement("div", attributes, this.state.guess.map(function (character, i) {
        return /*#__PURE__*/external_react_default().createElement(puzzle_parts_Letter, {
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
}(external_react_.Component);
Phrase.propTypes = {
  correctAnswer: (prop_types_default()).string.isRequired,
  displayMessage: (prop_types_default()).func.isRequired,
  guess: (prop_types_default()).string.isRequired,
  isComplete: (prop_types_default()).bool.isRequired,
  isCurrentRow: (prop_types_default()).bool.isRequired,
  onFail: (prop_types_default()).func.isRequired,
  onPass: (prop_types_default()).func.isRequired,
  onRefocusComplete: (prop_types_default()).func.isRequired,
  phraseNumber: (prop_types_default()).number.isRequired,
  triggerFocus: (prop_types_default()).bool.isRequired
};
/* harmony default export */ const puzzle_parts_Phrase = (Phrase);
;// CONCATENATED MODULE: ./src/js/lib/puzzle-parts/Guesses.js
function Guesses_typeof(obj) { "@babel/helpers - typeof"; return Guesses_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Guesses_typeof(obj); }
function Guesses_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Guesses_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function Guesses_createClass(Constructor, protoProps, staticProps) { if (protoProps) Guesses_defineProperties(Constructor.prototype, protoProps); if (staticProps) Guesses_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Guesses_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) Guesses_setPrototypeOf(subClass, superClass); }
function Guesses_setPrototypeOf(o, p) { Guesses_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Guesses_setPrototypeOf(o, p); }
function Guesses_createSuper(Derived) { var hasNativeReflectConstruct = Guesses_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Guesses_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Guesses_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Guesses_possibleConstructorReturn(this, result); }; }
function Guesses_possibleConstructorReturn(self, call) { if (call && (Guesses_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return Guesses_assertThisInitialized(self); }
function Guesses_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function Guesses_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function Guesses_getPrototypeOf(o) { Guesses_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Guesses_getPrototypeOf(o); }



var Guesses = /*#__PURE__*/function (_Component) {
  Guesses_inherits(Guesses, _Component);
  var _super = Guesses_createSuper(Guesses);
  function Guesses(props) {
    var _this;
    Guesses_classCallCheck(this, Guesses);
    _this = _super.call(this, props);
    _this.state = {
      triggerFocus: false
    };
    _this.triggerRefocus = _this.triggerRefocus.bind(Guesses_assertThisInitialized(_this));
    _this.onRefocusComplete = _this.onRefocusComplete.bind(Guesses_assertThisInitialized(_this));
    return _this;
  }

  /**
   * Change the state t
   */
  Guesses_createClass(Guesses, [{
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
      return /*#__PURE__*/external_react_default().createElement("div", attributes, /*#__PURE__*/external_react_default().createElement("h2", null, "Guesses"), /*#__PURE__*/external_react_default().createElement("p", {
        className: 'visuallyhidden'
      }, answerDescription), this.props.guesses.map(function (guess, i) {
        return /*#__PURE__*/external_react_default().createElement(puzzle_parts_Phrase, {
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
}(external_react_.Component);
Guesses.propTypes = {
  answerDescription: (prop_types_default()).string.isRequired,
  currentRow: (prop_types_default()).number.isRequired,
  correctAnswer: (prop_types_default()).string.isRequired,
  displayMessage: (prop_types_default()).func.isRequired,
  guesses: (prop_types_default()).array.isRequired,
  hidden: (prop_types_default()).bool.isRequired,
  onGuessFail: (prop_types_default()).func.isRequired,
  onPuzzlePass: (prop_types_default()).func.isRequired,
  remainingGuesses: (prop_types_default()).number.isRequired,
  status: (prop_types_default()).string.isRequired
};
/* harmony default export */ const puzzle_parts_Guesses = (Guesses);
;// CONCATENATED MODULE: ./src/js/lib/puzzle-parts/Message.js


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
  (0,external_react_.useEffect)(function () {
    if (!message) {
      return;
    }
    setTimeout(onTtl, ttl);
  });
  return /*#__PURE__*/external_react_default().createElement("div", attributes, message);
};
Message.defaultProps = {
  hidden: false,
  type: 'info',
  ttl: 5000
};
Message.propTypes = {
  hidden: (prop_types_default()).bool.isRequired,
  message: (prop_types_default()).string,
  type: (prop_types_default()).string,
  ttl: (prop_types_default()).number,
  onTtl: (prop_types_default()).func.isRequired
};
/* harmony default export */ const puzzle_parts_Message = (Message);
// EXTERNAL MODULE: ./node_modules/focus-trap-react/dist/focus-trap-react.js
var focus_trap_react = __webpack_require__(483);
var focus_trap_react_default = /*#__PURE__*/__webpack_require__.n(focus_trap_react);
// EXTERNAL MODULE: ./node_modules/js-utils/index.js
var js_utils = __webpack_require__(738);
;// CONCATENATED MODULE: ./src/js/lib/puzzle-parts/StatisticsModal.js
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
    js_utils["class"].addClass(document.body, 'modal-open');
  } else {
    js_utils["class"].removeClass(document.body, 'modal-open');
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
  return /*#__PURE__*/external_react_default().createElement("div", attributes, /*#__PURE__*/external_react_default().createElement("div", {
    className: 'overlay'
  }), open && /*#__PURE__*/external_react_default().createElement((focus_trap_react_default()), {
    focusTrapOptions: focusTrapOptions
  }, /*#__PURE__*/external_react_default().createElement("div", {
    className: 'stats-container'
  }, /*#__PURE__*/external_react_default().createElement("button", {
    className: 'close',
    onClick: onClose
  }, /*#__PURE__*/external_react_default().createElement("img", {
    src: '../../../build/images/close.svg',
    alt: 'Close modal'
  })), /*#__PURE__*/external_react_default().createElement("h2", null, "Statistics"), /*#__PURE__*/external_react_default().createElement("dl", {
    className: 'overall-stats'
  }, /*#__PURE__*/external_react_default().createElement("dt", null, "Games played"), /*#__PURE__*/external_react_default().createElement("dd", {
    "data-testid": 'gamesPlayed'
  }, stats.gamesPlayed), /*#__PURE__*/external_react_default().createElement("dt", null, "Win percentage"), /*#__PURE__*/external_react_default().createElement("dd", {
    "data-testid": 'winPercentage'
  }, winPercentage, "%"), /*#__PURE__*/external_react_default().createElement("dt", null, "Current streak"), /*#__PURE__*/external_react_default().createElement("dd", {
    "data-testid": 'winStreak'
  }, stats.winStreak), /*#__PURE__*/external_react_default().createElement("dt", null, "Max streak"), /*#__PURE__*/external_react_default().createElement("dd", {
    "data-testid": 'maxStreak'
  }, stats.maxStreak)), /*#__PURE__*/external_react_default().createElement("h3", null, "Guess distribution"), /*#__PURE__*/external_react_default().createElement("dl", {
    className: 'guess-distribution'
  }, stats.guessDistribution.map(function (guessCount, guessNumber) {
    var barWidth = "".concat(unitWidth * guessCount, "%");
    return /*#__PURE__*/external_react_default().createElement((external_react_default()).Fragment, {
      key: guessNumber
    }, /*#__PURE__*/external_react_default().createElement("dt", {
      "data-testid": "guessDistribution-label-".concat(guessNumber)
    }, "Games won with ", guessNumber + 1, " guesses"), /*#__PURE__*/external_react_default().createElement("dd", {
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
  onClose: (prop_types_default()).func.isRequired,
  open: (prop_types_default()).bool.isRequired,
  stats: (prop_types_default()).object.isRequired,
  testing: (prop_types_default()).bool
};
/* harmony default export */ const puzzle_parts_StatisticsModal = (StatisticsModal);
;// CONCATENATED MODULE: ./src/js/lib/puzzle-parts/SupportingContent.js


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
  return /*#__PURE__*/external_react_default().createElement("div", attributes, /*#__PURE__*/external_react_default().createElement("h2", null, "See it on the Hub"), /*#__PURE__*/external_react_default().createElement("div", {
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
  headline: (prop_types_default()).string.isRequired,
  link: (prop_types_default()).string.isRequired,
  summary: (prop_types_default()).string.isRequired,
  thumbnail: (prop_types_default()).string.isRequired,
  hidden: (prop_types_default()).bool.isRequired
};
/* harmony default export */ const puzzle_parts_SupportingContent = (SupportingContent);
;// CONCATENATED MODULE: ./src/js/main.js
function main_typeof(obj) { "@babel/helpers - typeof"; return main_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, main_typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function main_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function main_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function main_createClass(Constructor, protoProps, staticProps) { if (protoProps) main_defineProperties(Constructor.prototype, protoProps); if (staticProps) main_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function main_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) main_setPrototypeOf(subClass, superClass); }
function main_setPrototypeOf(o, p) { main_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return main_setPrototypeOf(o, p); }
function main_createSuper(Derived) { var hasNativeReflectConstruct = main_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = main_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = main_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return main_possibleConstructorReturn(this, result); }; }
function main_possibleConstructorReturn(self, call) { if (call && (main_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return main_assertThisInitialized(self); }
function main_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function main_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function main_getPrototypeOf(o) { main_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return main_getPrototypeOf(o); }











var Puzzle = /*#__PURE__*/function (_Component) {
  main_inherits(Puzzle, _Component);
  var _super = main_createSuper(Puzzle);
  function Puzzle(props) {
    var _this;
    main_classCallCheck(this, Puzzle);
    props.puzzle.answer = props.puzzle.answer.toUpperCase();
    _this = _super.call(this, props);
    _this.availableGuesses = 6;
    _this.supportingContent = null;
    _this.loadPuzzle = function (id) {
      return loadPuzzleState(id);
    };
    _this.savePuzzle = function (id, puzzle) {
      return savePuzzleState(id, puzzle);
    };
    _this.onPuzzleComplete = props.onPuzzleComplete || function (status, numberOfGuesses) {};
    _this.fetchSupportingContent = props.fetchSupportingContent || function (endpoint) {};

    // fetch any stored data from localStorage
    var stored = _this.loadPuzzle(_this.props.id) || {};
    _this.stats = new Statistics(_this.availableGuesses, local, _this.props.logger);

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
    _this.clearPuzzleData = _this.clearPuzzleData.bind(main_assertThisInitialized(_this));
    _this.clearStatsData = _this.clearStatsData.bind(main_assertThisInitialized(_this));
    _this.incrementStats = _this.incrementStats.bind(main_assertThisInitialized(_this));
    _this.openStatsModal = _this.openStatsModal.bind(main_assertThisInitialized(_this));
    _this.closeStatsModal = _this.closeStatsModal.bind(main_assertThisInitialized(_this));
    _this.displayMessage = _this.displayMessage.bind(main_assertThisInitialized(_this));
    _this.onGuessFail = _this.onGuessFail.bind(main_assertThisInitialized(_this));
    _this.onPuzzlePass = _this.onPuzzlePass.bind(main_assertThisInitialized(_this));
    _this.clearMessage = _this.clearMessage.bind(main_assertThisInitialized(_this));
    return _this;
  }
  main_createClass(Puzzle, [{
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
      local.remove('hopkinshurdle.' + this.props.id);
    }
  }, {
    key: "clearStatsData",
    value: function clearStatsData() {
      local.remove('hopkinshurdle.stats');
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
      return /*#__PURE__*/external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/external_react_default().createElement(puzzle_parts_StatisticsModal, {
        onClose: this.closeStatsModal,
        open: this.state.statMobileOpen,
        stats: this.stats.stats
      }), /*#__PURE__*/external_react_default().createElement(puzzle_parts_Message, _extends({
        hidden: this.state.statMobileOpen,
        onTtl: this.clearMessage
      }, this.state.message)), this.props.puzzle.clues && /*#__PURE__*/external_react_default().createElement(puzzle_parts_Clue, {
        clue: this.props.puzzle.clues[this.state.puzzle.currentRow],
        currentRow: this.state.puzzle.currentRow,
        hidden: this.state.statMobileOpen
      }), /*#__PURE__*/external_react_default().createElement(puzzle_parts_Guesses, {
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
      }), this.state.puzzle.status === 'FAIL' && /*#__PURE__*/external_react_default().createElement(puzzle_parts_Answer, {
        answer: this.props.puzzle.answer
      }), this.state.puzzle.status !== 'IN_PROGRESS' && this.supportingContent && /*#__PURE__*/external_react_default().createElement(puzzle_parts_SupportingContent, _extends({
        hidden: this.state.statMobileOpen
      }, this.supportingContent)), this.props.debug && /*#__PURE__*/external_react_default().createElement("div", {
        className: 'debug'
      }, /*#__PURE__*/external_react_default().createElement("div", null, /*#__PURE__*/external_react_default().createElement("button", {
        onClick: this.clearPuzzleData
      }, "Clear stored puzzle data"), /*#__PURE__*/external_react_default().createElement("button", {
        onClick: this.clearStatsData
      }, "Clear stored stats data")), /*#__PURE__*/external_react_default().createElement("div", null, /*#__PURE__*/external_react_default().createElement("button", {
        onClick: this.incrementStats
      }, "Increment Stats"), /*#__PURE__*/external_react_default().createElement("button", {
        onClick: this.openStatsModal
      }, "Open Stats Modal"))));
    }
  }]);
  return Puzzle;
}(external_react_.Component);
Puzzle.defaultProps = {
  debug: false
};
Puzzle.propTypes = {
  fetchSupportingContent: (prop_types_default()).func,
  id: (prop_types_default()).number.isRequired,
  puzzle: (prop_types_default()).object.isRequired,
  onPuzzleComplete: (prop_types_default()).func
};
/* harmony default export */ const main = (Puzzle);
})();

module.exports = __webpack_exports__;
/******/ })()
;