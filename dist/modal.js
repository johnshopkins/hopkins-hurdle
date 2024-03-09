/*! For license information please see modal.js.LICENSE.txt */
(()=>{var e={705:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",o=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),o&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),o&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,o,r,a){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(o)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var u=0;u<e.length;u++){var l=[].concat(e[u]);o&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),t.push(l))}},t}},738:e=>{"use strict";e.exports=function(e){return e[1]}},915:(e,t,n)=>{"use strict";function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function a(e,t){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},a(e,t)}function i(e,t){if(t&&("object"===o(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return c(e)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function s(e){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},s(e)}var u=n(497),l=n(74),f=n(681).createFocusTrap,p=n(859).isFocusable,d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}(d,e);var t,n,o,l,f=(o=d,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=s(o);if(l){var n=s(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return i(this,e)});function d(e){var t,n,o,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,d),r=function(e){var t,n=null!==(t=this.internalOptions[e])&&void 0!==t?t:this.originalOptions[e];if("function"==typeof n){for(var o=arguments.length,r=new Array(o>1?o-1:0),a=1;a<o;a++)r[a-1]=arguments[a];n=n.apply(void 0,r)}if(!0===n&&(n=void 0),!n){if(void 0===n||!1===n)return n;throw new Error("`".concat(e,"` was specified but was not a node, or did not return a node"))}var i,c=n;if("string"==typeof n&&!(c=null===(i=this.getDocument())||void 0===i?void 0:i.querySelector(n)))throw new Error("`".concat(e,"` as selector refers to no known node"));return c},(o="getNodeForOption")in(n=c(t=f.call(this,e)))?Object.defineProperty(n,o,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[o]=r,t.handleDeactivate=t.handleDeactivate.bind(c(t)),t.handlePostDeactivate=t.handlePostDeactivate.bind(c(t)),t.handleClickOutsideDeactivates=t.handleClickOutsideDeactivates.bind(c(t)),t.internalOptions={returnFocusOnDeactivate:!1,checkCanReturnFocus:null,onDeactivate:t.handleDeactivate,onPostDeactivate:t.handlePostDeactivate,clickOutsideDeactivates:t.handleClickOutsideDeactivates},t.originalOptions={returnFocusOnDeactivate:!0,onDeactivate:null,onPostDeactivate:null,checkCanReturnFocus:null,clickOutsideDeactivates:!1};var a=e.focusTrapOptions;for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&("returnFocusOnDeactivate"!==i&&"onDeactivate"!==i&&"onPostDeactivate"!==i&&"checkCanReturnFocus"!==i&&"clickOutsideDeactivates"!==i?t.internalOptions[i]=a[i]:t.originalOptions[i]=a[i]);return t.outsideClick=null,t.focusTrapElements=e.containerElements||[],t.updatePreviousElement(),t}return t=d,(n=[{key:"getDocument",value:function(){return this.props.focusTrapOptions.document||("undefined"!=typeof document?document:void 0)}},{key:"getReturnFocusNode",value:function(){var e=this.getNodeForOption("setReturnFocus",this.previouslyFocusedElement);return e||!1!==e&&this.previouslyFocusedElement}},{key:"updatePreviousElement",value:function(){var e=this.getDocument();e&&(this.previouslyFocusedElement=e.activeElement)}},{key:"deactivateTrap",value:function(){this.focusTrap&&this.focusTrap.active&&this.focusTrap.deactivate({returnFocus:!1,checkCanReturnFocus:null,onDeactivate:this.originalOptions.onDeactivate})}},{key:"handleClickOutsideDeactivates",value:function(e){var t="function"==typeof this.originalOptions.clickOutsideDeactivates?this.originalOptions.clickOutsideDeactivates.call(null,e):this.originalOptions.clickOutsideDeactivates;return t&&(this.outsideClick={target:e.target,allowDeactivation:t}),t}},{key:"handleDeactivate",value:function(){this.originalOptions.onDeactivate&&this.originalOptions.onDeactivate.call(null),this.deactivateTrap()}},{key:"handlePostDeactivate",value:function(){var e=this,t=function(){var t=e.getReturnFocusNode(),n=!(!e.originalOptions.returnFocusOnDeactivate||null==t||!t.focus||e.outsideClick&&(!e.outsideClick.allowDeactivation||p(e.outsideClick.target,e.internalOptions.tabbableOptions))),o=e.internalOptions.preventScroll,r=void 0!==o&&o;n&&t.focus({preventScroll:r}),e.originalOptions.onPostDeactivate&&e.originalOptions.onPostDeactivate.call(null),e.outsideClick=null};this.originalOptions.checkCanReturnFocus?this.originalOptions.checkCanReturnFocus.call(null,this.getReturnFocusNode()).then(t,t):t()}},{key:"setupFocusTrap",value:function(){this.focusTrap?this.props.active&&!this.focusTrap.active&&(this.focusTrap.activate(),this.props.paused&&this.focusTrap.pause()):this.focusTrapElements.some(Boolean)&&(this.focusTrap=this.props._createFocusTrap(this.focusTrapElements,this.internalOptions),this.props.active&&this.focusTrap.activate(),this.props.paused&&this.focusTrap.pause())}},{key:"componentDidMount",value:function(){this.props.active&&this.setupFocusTrap()}},{key:"componentDidUpdate",value:function(e){if(this.focusTrap){e.containerElements!==this.props.containerElements&&this.focusTrap.updateContainerElements(this.props.containerElements);var t=!e.active&&this.props.active,n=e.active&&!this.props.active,o=!e.paused&&this.props.paused,r=e.paused&&!this.props.paused;if(t&&(this.updatePreviousElement(),this.focusTrap.activate()),n)return void this.deactivateTrap();o&&this.focusTrap.pause(),r&&this.focusTrap.unpause()}else e.containerElements!==this.props.containerElements&&(this.focusTrapElements=this.props.containerElements),this.props.active&&(this.updatePreviousElement(),this.setupFocusTrap())}},{key:"componentWillUnmount",value:function(){this.deactivateTrap()}},{key:"render",value:function(){var e=this,t=this.props.children?u.Children.only(this.props.children):void 0;if(t){if(t.type&&t.type===u.Fragment)throw new Error("A focus-trap cannot use a Fragment as its child container. Try replacing it with a <div> element.");return u.cloneElement(t,{ref:function(n){var o=e.props.containerElements;t&&("function"==typeof t.ref?t.ref(n):t.ref&&(t.ref.current=n)),e.focusTrapElements=o||[n]}})}return null}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),d}(u.Component),v="undefined"==typeof Element?Function:Element;d.propTypes={active:l.bool,paused:l.bool,focusTrapOptions:l.shape({document:l.object,onActivate:l.func,onPostActivate:l.func,checkCanFocusTrap:l.func,onDeactivate:l.func,onPostDeactivate:l.func,checkCanReturnFocus:l.func,initialFocus:l.oneOfType([l.instanceOf(v),l.string,l.bool,l.func]),fallbackFocus:l.oneOfType([l.instanceOf(v),l.string,l.func]),escapeDeactivates:l.oneOfType([l.bool,l.func]),clickOutsideDeactivates:l.oneOfType([l.bool,l.func]),returnFocusOnDeactivate:l.bool,setReturnFocus:l.oneOfType([l.instanceOf(v),l.string,l.bool,l.func]),allowOutsideClick:l.oneOfType([l.bool,l.func]),preventScroll:l.bool,tabbableOptions:l.shape({displayCheck:l.oneOf(["full","legacy-full","non-zero-area","none"]),getShadowRoot:l.oneOfType([l.bool,l.func])})}),containerElements:l.arrayOf(l.instanceOf(v)),children:l.oneOfType([l.element,l.instanceOf(v)])},d.defaultProps={active:!0,paused:!1,focusTrapOptions:{},_createFocusTrap:f},e.exports=d},681:(e,t,n)=>{"use strict";n.r(t),n.d(t,{createFocusTrap:()=>d});var o=n(859);function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c,s=(c=[],{activateTrap:function(e){if(c.length>0){var t=c[c.length-1];t!==e&&t.pause()}var n=c.indexOf(e);-1===n||c.splice(n,1),c.push(e)},deactivateTrap:function(e){var t=c.indexOf(e);-1!==t&&c.splice(t,1),c.length>0&&c[c.length-1].unpause()}}),u=function(e){return setTimeout(e,0)},l=function(e,t){var n=-1;return e.every((function(e,o){return!t(e)||(n=o,!1)})),n},f=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return"function"==typeof e?e.apply(void 0,n):e},p=function(e){return e.target.shadowRoot&&"function"==typeof e.composedPath?e.composedPath()[0]:e.target},d=function(e,t){var n,r=(null==t?void 0:t.document)||document,i=a({returnFocusOnDeactivate:!0,escapeDeactivates:!0,delayInitialFocus:!0},t),c={containers:[],containerGroups:[],tabbableGroups:[],nodeFocusedBeforeActivation:null,mostRecentlyFocusedNode:null,active:!1,paused:!1,delayInitialFocusTimer:void 0},d=function(e,t,n){return e&&void 0!==e[t]?e[t]:i[n||t]},v=function(e){return c.containerGroups.findIndex((function(t){var n=t.container,o=t.tabbableNodes;return n.contains(e)||o.find((function(t){return t===e}))}))},b=function(e){var t=i[e];if("function"==typeof t){for(var n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];t=t.apply(void 0,o)}if(!0===t&&(t=void 0),!t){if(void 0===t||!1===t)return t;throw new Error("`".concat(e,"` was specified but was not a node, or did not return a node"))}var c=t;if("string"==typeof t&&!(c=r.querySelector(t)))throw new Error("`".concat(e,"` as selector refers to no known node"));return c},h=function(){var e=b("initialFocus");if(!1===e)return!1;if(void 0===e)if(v(r.activeElement)>=0)e=r.activeElement;else{var t=c.tabbableGroups[0];e=t&&t.firstTabbableNode||b("fallbackFocus")}if(!e)throw new Error("Your focus-trap needs to have at least one focusable element");return e},y=function(){if(c.containerGroups=c.containers.map((function(e){var t=(0,o.tabbable)(e,i.tabbableOptions),n=(0,o.focusable)(e,i.tabbableOptions);return{container:e,tabbableNodes:t,focusableNodes:n,firstTabbableNode:t.length>0?t[0]:null,lastTabbableNode:t.length>0?t[t.length-1]:null,nextTabbableNode:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=n.findIndex((function(t){return t===e}));if(!(r<0))return t?n.slice(r+1).find((function(e){return(0,o.isTabbable)(e,i.tabbableOptions)})):n.slice(0,r).reverse().find((function(e){return(0,o.isTabbable)(e,i.tabbableOptions)}))}}})),c.tabbableGroups=c.containerGroups.filter((function(e){return e.tabbableNodes.length>0})),c.tabbableGroups.length<=0&&!b("fallbackFocus"))throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times")},m=function e(t){!1!==t&&t!==r.activeElement&&(t&&t.focus?(t.focus({preventScroll:!!i.preventScroll}),c.mostRecentlyFocusedNode=t,function(e){return e.tagName&&"input"===e.tagName.toLowerCase()&&"function"==typeof e.select}(t)&&t.select()):e(h()))},g=function(e){var t=b("setReturnFocus",e);return t||!1!==t&&e},O=function(e){var t=p(e);v(t)>=0||(f(i.clickOutsideDeactivates,e)?n.deactivate({returnFocus:i.returnFocusOnDeactivate&&!(0,o.isFocusable)(t,i.tabbableOptions)}):f(i.allowOutsideClick,e)||e.preventDefault())},w=function(e){var t=p(e),n=v(t)>=0;n||t instanceof Document?n&&(c.mostRecentlyFocusedNode=t):(e.stopImmediatePropagation(),m(c.mostRecentlyFocusedNode||h()))},T=function(e){if(function(e){return"Escape"===e.key||"Esc"===e.key||27===e.keyCode}(e)&&!1!==f(i.escapeDeactivates,e))return e.preventDefault(),void n.deactivate();(function(e){return"Tab"===e.key||9===e.keyCode})(e)&&function(e){var t=p(e);y();var n=null;if(c.tabbableGroups.length>0){var r=v(t),a=r>=0?c.containerGroups[r]:void 0;if(r<0)n=e.shiftKey?c.tabbableGroups[c.tabbableGroups.length-1].lastTabbableNode:c.tabbableGroups[0].firstTabbableNode;else if(e.shiftKey){var s=l(c.tabbableGroups,(function(e){var n=e.firstTabbableNode;return t===n}));if(s<0&&(a.container===t||(0,o.isFocusable)(t,i.tabbableOptions)&&!(0,o.isTabbable)(t,i.tabbableOptions)&&!a.nextTabbableNode(t,!1))&&(s=r),s>=0){var u=0===s?c.tabbableGroups.length-1:s-1;n=c.tabbableGroups[u].lastTabbableNode}}else{var f=l(c.tabbableGroups,(function(e){var n=e.lastTabbableNode;return t===n}));if(f<0&&(a.container===t||(0,o.isFocusable)(t,i.tabbableOptions)&&!(0,o.isTabbable)(t,i.tabbableOptions)&&!a.nextTabbableNode(t))&&(f=r),f>=0){var d=f===c.tabbableGroups.length-1?0:f+1;n=c.tabbableGroups[d].firstTabbableNode}}}else n=b("fallbackFocus");n&&(e.preventDefault(),m(n))}(e)},E=function(e){var t=p(e);v(t)>=0||f(i.clickOutsideDeactivates,e)||f(i.allowOutsideClick,e)||(e.preventDefault(),e.stopImmediatePropagation())},D=function(){if(c.active)return s.activateTrap(n),c.delayInitialFocusTimer=i.delayInitialFocus?u((function(){m(h())})):m(h()),r.addEventListener("focusin",w,!0),r.addEventListener("mousedown",O,{capture:!0,passive:!1}),r.addEventListener("touchstart",O,{capture:!0,passive:!1}),r.addEventListener("click",E,{capture:!0,passive:!1}),r.addEventListener("keydown",T,{capture:!0,passive:!1}),n},k=function(){if(c.active)return r.removeEventListener("focusin",w,!0),r.removeEventListener("mousedown",O,!0),r.removeEventListener("touchstart",O,!0),r.removeEventListener("click",E,!0),r.removeEventListener("keydown",T,!0),n};return(n={get active(){return c.active},get paused(){return c.paused},activate:function(e){if(c.active)return this;var t=d(e,"onActivate"),n=d(e,"onPostActivate"),o=d(e,"checkCanFocusTrap");o||y(),c.active=!0,c.paused=!1,c.nodeFocusedBeforeActivation=r.activeElement,t&&t();var a=function(){o&&y(),D(),n&&n()};return o?(o(c.containers.concat()).then(a,a),this):(a(),this)},deactivate:function(e){if(!c.active)return this;var t=a({onDeactivate:i.onDeactivate,onPostDeactivate:i.onPostDeactivate,checkCanReturnFocus:i.checkCanReturnFocus},e);clearTimeout(c.delayInitialFocusTimer),c.delayInitialFocusTimer=void 0,k(),c.active=!1,c.paused=!1,s.deactivateTrap(n);var o=d(t,"onDeactivate"),r=d(t,"onPostDeactivate"),l=d(t,"checkCanReturnFocus"),f=d(t,"returnFocus","returnFocusOnDeactivate");o&&o();var p=function(){u((function(){f&&m(g(c.nodeFocusedBeforeActivation)),r&&r()}))};return f&&l?(l(g(c.nodeFocusedBeforeActivation)).then(p,p),this):(p(),this)},pause:function(){return c.paused||!c.active||(c.paused=!0,k()),this},unpause:function(){return c.paused&&c.active?(c.paused=!1,y(),D(),this):this},updateContainerElements:function(e){var t=[].concat(e).filter(Boolean);return c.containers=t.map((function(e){return"string"==typeof e?r.querySelector(e):e})),c.active&&y(),this}}).updateContainerElements(e),n}},433:(e,t,n)=>{"use strict";var o=n(642);function r(){}function a(){}a.resetWarningCache=r,e.exports=function(){function e(e,t,n,r,a,i){if(i!==o){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:r};return n.PropTypes=n,n}},74:(e,t,n)=>{e.exports=n(433)()},642:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},859:(e,t,n)=>{"use strict";n.r(t),n.d(t,{focusable:()=>g,isFocusable:()=>T,isTabbable:()=>O,tabbable:()=>m});var o=["input","select","textarea","a[href]","button","[tabindex]:not(slot)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])',"details>summary:first-of-type","details"],r=o.join(","),a="undefined"==typeof Element,i=a?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,c=!a&&Element.prototype.getRootNode?function(e){return e.getRootNode()}:function(e){return e.ownerDocument},s=function(e,t,n){var o=Array.prototype.slice.apply(e.querySelectorAll(r));return t&&i.call(e,r)&&o.unshift(e),o.filter(n)},u=function e(t,n,o){for(var a=[],c=Array.from(t);c.length;){var s=c.shift();if("SLOT"===s.tagName){var u=s.assignedElements(),l=e(u.length?u:s.children,!0,o);o.flatten?a.push.apply(a,l):a.push({scopeParent:s,candidates:l})}else{i.call(s,r)&&o.filter(s)&&(n||!t.includes(s))&&a.push(s);var f=s.shadowRoot||"function"==typeof o.getShadowRoot&&o.getShadowRoot(s),p=!o.shadowRootFilter||o.shadowRootFilter(s);if(f&&p){var d=e(!0===f?s.children:f.children,!0,o);o.flatten?a.push.apply(a,d):a.push({scopeParent:s,candidates:d})}else c.unshift.apply(c,s.children)}}return a},l=function(e,t){return e.tabIndex<0&&(t||/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName)||e.isContentEditable)&&isNaN(parseInt(e.getAttribute("tabindex"),10))?0:e.tabIndex},f=function(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex},p=function(e){return"INPUT"===e.tagName},d=function(e){var t=e.getBoundingClientRect(),n=t.width,o=t.height;return 0===n&&0===o},v=function(e,t){return!(t.disabled||function(e){return p(e)&&"hidden"===e.type}(t)||function(e,t){var n=t.displayCheck,o=t.getShadowRoot;if("hidden"===getComputedStyle(e).visibility)return!0;var r=i.call(e,"details>summary:first-of-type")?e.parentElement:e;if(i.call(r,"details:not([open]) *"))return!0;if(n&&"full"!==n&&"legacy-full"!==n){if("non-zero-area"===n)return d(e)}else{if("function"==typeof o){for(var a=e;e;){var s=e.parentElement,u=c(e);if(s&&!s.shadowRoot&&!0===o(s))return d(e);e=e.assignedSlot?e.assignedSlot:s||u===e.ownerDocument?s:u.host}e=a}if(function(e){for(var t,n=c(e).host,o=!!(null!==(t=n)&&void 0!==t&&t.ownerDocument.contains(n)||e.ownerDocument.contains(e));!o&&n;){var r;o=!(null===(r=n=c(n).host)||void 0===r||!r.ownerDocument.contains(n))}return o}(e))return!e.getClientRects().length;if("legacy-full"!==n)return!0}return!1}(t,e)||function(e){return"DETAILS"===e.tagName&&Array.prototype.slice.apply(e.children).some((function(e){return"SUMMARY"===e.tagName}))}(t)||function(e){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))for(var t=e.parentElement;t;){if("FIELDSET"===t.tagName&&t.disabled){for(var n=0;n<t.children.length;n++){var o=t.children.item(n);if("LEGEND"===o.tagName)return!!i.call(t,"fieldset[disabled] *")||!o.contains(e)}return!0}t=t.parentElement}return!1}(t))},b=function(e,t){return!(function(e){return function(e){return p(e)&&"radio"===e.type}(e)&&!function(e){if(!e.name)return!0;var t,n=e.form||c(e),o=function(e){return n.querySelectorAll('input[type="radio"][name="'+e+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)t=o(window.CSS.escape(e.name));else try{t=o(e.name)}catch(e){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",e.message),!1}var r=function(e,t){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===t)return e[n]}(t,e.form);return!r||r===e}(e)}(t)||l(t)<0||!v(e,t))},h=function(e){var t=parseInt(e.getAttribute("tabindex"),10);return!!(isNaN(t)||t>=0)},y=function e(t){var n=[],o=[];return t.forEach((function(t,r){var a=!!t.scopeParent,i=a?t.scopeParent:t,c=l(i,a),s=a?e(t.candidates):i;0===c?a?n.push.apply(n,s):n.push(i):o.push({documentOrder:r,tabIndex:c,item:t,isScope:a,content:s})})),o.sort(f).reduce((function(e,t){return t.isScope?e.push.apply(e,t.content):e.push(t.content),e}),[]).concat(n)},m=function(e,t){var n;return n=(t=t||{}).getShadowRoot?u([e],t.includeContainer,{filter:b.bind(null,t),flatten:!1,getShadowRoot:t.getShadowRoot,shadowRootFilter:h}):s(e,t.includeContainer,b.bind(null,t)),y(n)},g=function(e,t){return(t=t||{}).getShadowRoot?u([e],t.includeContainer,{filter:v.bind(null,t),flatten:!0,getShadowRoot:t.getShadowRoot}):s(e,t.includeContainer,v.bind(null,t))},O=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==i.call(e,r)&&b(t,e)},w=o.concat("iframe").join(","),T=function(e,t){if(t=t||{},!e)throw new Error("No node provided");return!1!==i.call(e,w)&&v(t,e)}},537:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var o=n(738),r=n.n(o),a=n(705),i=n.n(a)()(r());i.push([e.id,":root{--input-size: 30px;--correct-spot-bg: #286140;--correct-spot-text: #ffffff;--wrong-spot-bg: #f1c400;--wrong-spot-text: #000000;--wrong-bg: #a1a1a1;--wrong-text: #ffffff;--input-bg: #ffffff;--input-bg-focus: #ffffff;--input-border: #dddddd;--input-border-focus: #000000;--input-text: #000000;--input-text-focus: #000000;--submit-bg: var(--input-bg);--submit-bg-focus: var(--input-bg-focus);--submit-border: var(--input-border);--submit-border-focus: var(--input-border-focus);--submit-text: #a1a1a1;--submit-text-focus: var(--input-text-focus);--modal-bg: #ffffff;--model-overlay: #000000}.hh-modal-container{position:fixed;top:0;left:0;width:100%;height:100%;z-index:500}.hh-modal-container .overlay{background-color:var(--model-overlay);height:100%;left:0;opacity:.5;position:absolute;top:0;width:100%}.hh-modal-container .modal-content{background-color:var(--modal-bg);margin:auto;padding:20px;position:relative;text-align:left;width:50%;z-index:501}.hh-modal-container .modal-content button.close{float:right}.hh-modal-container .modal-content button.close:hover{cursor:pointer}",""]);const c=i},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,o=0;o<t.length;o++)if(t[o].identifier===e){n=o;break}return n}function o(e,o){for(var a={},i=[],c=0;c<e.length;c++){var s=e[c],u=o.base?s[0]+o.base:s[0],l=a[u]||0,f="".concat(u," ").concat(l);a[u]=l+1;var p=n(f),d={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)t[p].references++,t[p].updater(d);else{var v=r(d,o);o.byIndex=c,t.splice(c,0,{identifier:f,updater:v,references:1})}i.push(f)}return i}function r(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,r){var a=o(e=e||[],r=r||{});return function(e){e=e||[];for(var i=0;i<a.length;i++){var c=n(a[i]);t[c].references--}for(var s=o(e,r),u=0;u<a.length;u++){var l=n(a[u]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}a=s}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var o=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var o="";n.supports&&(o+="@supports (".concat(n.supports,") {")),n.media&&(o+="@media ".concat(n.media," {"));var r=void 0!==n.layer;r&&(o+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),o+=n.css,r&&(o+="}"),n.media&&(o+="}"),n.supports&&(o+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(o,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},497:e=>{"use strict";e.exports=require("react")}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={id:o,exports:{}};return e[o](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.nc=void 0;var o={};(()=>{"use strict";n.r(o),n.d(o,{default:()=>j});var e=n(497),t=n.n(e);const r=require("react-dom");var a=n(74),i=n.n(a),c=n(915),s=n.n(c);const u=function(){return t().createElement("svg",{xmlns:"http://www.w3.org/2000/svg",height:"40",width:"40","aria-hidden":"true"},t().createElement("path",{d:"m10.542 30.958-1.5-1.5 9.5-9.458-9.5-9.458 1.5-1.5 9.458 9.5 9.458-9.5 1.5 1.5-9.5 9.458 9.5 9.458-1.5 1.5-9.458-9.5Z"}))};var l=n(379),f=n.n(l),p=n(795),d=n.n(p),v=n(569),b=n.n(v),h=n(565),y=n.n(h),m=n(216),g=n.n(m),O=n(589),w=n.n(O),T=n(537),E={};function D(e){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D(e)}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},k.apply(this,arguments)}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function C(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function F(e,t){return F=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},F(e,t)}function P(e,t){if(t&&("object"===D(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return R(e)}function R(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function x(e){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},x(e)}E.styleTagTransform=w(),E.setAttributes=y(),E.insert=b().bind(null,"head"),E.domAPI=d(),E.insertStyleElement=g(),f()(T.Z,E),T.Z&&T.Z.locals&&T.Z.locals;var N=function(n){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&F(e,t)}(f,n);var o,a,i,c,l=(i=f,c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=x(i);if(c){var n=x(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return P(this,e)});function f(t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,f),(n=l.call(this,t)).state={open:n.props.open},n.focusTrapOptions=n.props.testing?{tabbableOptions:{displayCheck:"none"}}:{},n.modal=(0,e.createRef)(),n.onClose=n.onClose.bind(R(n)),n.onKeyDown=n.onKeyDown.bind(R(n)),n}return o=f,a=[{key:"onClose",value:function(){this.setState({open:!1}),document.body.classList.remove("modal-open"),this.props.onClose()}},{key:"onKeyDown",value:function(e){"Escape"===e.key&&this.onClose()}},{key:"componentDidUpdate",value:function(e){if(e.open!==this.props.open){this.setState({open:this.props.open}),this.props.open?document.body.classList.add("modal-open"):document.body.classList.remove("modal-open");var t,n=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return S(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,r=function(){};return{s:r,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw a}}}}(document.body.children);try{for(n.s();!(t=n.n()).done;){var o=t.value;this.props.open?o.setAttribute("aria-hidden",!0):o.removeAttribute("aria-hidden")}}catch(e){n.e(e)}finally{n.f()}}}},{key:"getAttributes",value:function(e){var t={className:"hh-modal-container",role:"dialog"};return e&&(t["aria-label"]=e),t}},{key:"getClasses",value:function(){return this.props.classes.push("modal-content"),this.props.classes.join(" ")}},{key:"render",value:function(){var e=this.getAttributes(this.props.label),n=t().createElement("div",k({},e,{onKeyDown:this.onKeyDown,ref:this.modal}),t().createElement(s(),{focusTrapOptions:this.focusTrapOptions},t().createElement("div",{className:this.getClasses()},t().createElement("button",{className:"close-box-x","aria-label":"Close modal",onClick:this.onClose},t().createElement(u,null)),this.props.children)),t().createElement("div",{className:"overlay"}));return this.state.open?(0,r.createPortal)(n,document.body):null}}],a&&C(o.prototype,a),Object.defineProperty(o,"prototype",{writable:!1}),f}(e.Component);N.defaultProps={classes:[],onClose:function(){},open:!1,testing:!1},N.propTypes={classes:i().array,label:i().string,onClose:i().func.isRequired,open:i().bool,testing:i().bool};const j=N})(),module.exports=o})();