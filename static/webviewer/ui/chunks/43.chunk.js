(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{1438:function(e,t,n){var o=n(31),i=n(1439);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var r={insert:function(e){if(!window.isApryseWebViewerWebComponent)return void document.head.appendChild(e);let t;t=document.getElementsByTagName("apryse-webviewer"),t.length||(t=function e(t,n=document){const o=[];return n.querySelectorAll(t).forEach(e=>o.push(e)),n.querySelectorAll("*").forEach(n=>{n.shadowRoot&&o.push(...e(t,n.shadowRoot))}),o}("apryse-webviewer"));const n=[];for(let o=0;o<t.length;o++){const i=t[o];if(0===o)i.shadowRoot.appendChild(e),e.onload=function(){n.length>0&&n.forEach(t=>{t.innerHTML=e.innerHTML})};else{const t=e.cloneNode(!0);i.shadowRoot.appendChild(t),n.push(t)}}},singleton:!1};o(i,r);e.exports=i.locals||{}},1439:function(e,t,n){(e.exports=n(32)(!1)).push([e.i,"",""])},1506:function(e,t,n){"use strict";n(27),n(28),n(12),n(14),n(7),n(26),n(22),n(44),n(62),n(43),n(79),n(39),n(13),n(9),n(10),n(11);var o=n(0),i=n.n(o),r=n(4),a=n.n(r),l=n(6),c=n(3);n(1438);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,b(o.key),o)}}function d(e,t){return(d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=f(e);if(t){var i=f(this).constructor;n=Reflect.construct(o,arguments,i)}else n=o.apply(this,arguments);return h(this,n)}}function h(e,t){if(t&&("object"===p(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e){var t=function(e,t){if("object"!==p(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,t||"default");if("object"!==p(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===p(t)?t:String(t)}var y,x,g,w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(a,e);var t,n,o,r=m(a);function a(){return u(this,a),r.apply(this,arguments)}return t=a,(n=[{key:"render",value:function(){var e=this.props,t=e.isDisabled,n=e.className,o=e.dataElement,r=e.children;return t?null:i.a.createElement("div",{className:n,"data-element":o},r)}}])&&s(t.prototype,n),o&&s(t,o),Object.defineProperty(t,"prototype",{writable:!1}),a}(i.a.PureComponent);y=w,x="propTypes",g={isDisabled:a.a.bool,className:a.a.string.isRequired,dataElement:a.a.string.isRequired,children:a.a.node},(x=b(x))in y?Object.defineProperty(y,x,{value:g,enumerable:!0,configurable:!0,writable:!0}):y[x]=g;var v=Object(l.b)((function(e,t){return{isDisabled:c.a.isElementDisabled(e,t.dataElement)}}))(w);t.a=v},1683:function(e,t,n){var o=n(31),i=n(1684);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var r={insert:function(e){if(!window.isApryseWebViewerWebComponent)return void document.head.appendChild(e);let t;t=document.getElementsByTagName("apryse-webviewer"),t.length||(t=function e(t,n=document){const o=[];return n.querySelectorAll(t).forEach(e=>o.push(e)),n.querySelectorAll("*").forEach(n=>{n.shadowRoot&&o.push(...e(t,n.shadowRoot))}),o}("apryse-webviewer"));const n=[];for(let o=0;o<t.length;o++){const i=t[o];if(0===o)i.shadowRoot.appendChild(e),e.onload=function(){n.length>0&&n.forEach(t=>{t.innerHTML=e.innerHTML})};else{const t=e.cloneNode(!0);i.shadowRoot.appendChild(t),n.push(t)}}},singleton:!1};o(i,r);e.exports=i.locals||{}},1684:function(e,t,n){(t=e.exports=n(32)(!1)).push([e.i,":host{display:inline-block;container-type:inline-size;width:100%;height:100%;overflow:hidden}@media(min-width:901px){.App:not(.is-web-component) .hide-in-desktop{display:none}}@container (min-width: 901px){.hide-in-desktop{display:none}}@media(min-width:641px)and (max-width:900px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .hide-in-tablet{display:none}}@container (min-width: 641px) and (max-width: 900px){.App.is-web-component:not(.is-in-desktop-only-mode) .hide-in-tablet{display:none}}@media(max-width:640px)and (min-width:431px){.App:not(.is-web-component) .hide-in-mobile{display:none}}@container (max-width: 640px) and (min-width: 431px){.App.is-web-component .hide-in-mobile{display:none}}@media(max-width:430px){.App:not(.is-web-component) .hide-in-small-mobile{display:none}}@container (max-width: 430px){.App.is-web-component .hide-in-small-mobile{display:none}}.always-hide{display:none}.mathSymbolsContainer{display:flex;flex-wrap:wrap;overflow-y:auto;display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:5px}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.mathSymbolsContainer{width:196px}}.mathSymbolsContainer.padding{padding:4px 20px 8px}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .mathSymbolsContainer{max-width:450px;width:auto}}@media(max-width:640px)and (-ms-high-contrast:active),(max-width:640px)and (-ms-high-contrast:none){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .mathSymbolsContainer{width:308px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .mathSymbolsContainer{max-width:450px;width:auto}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.App.is-web-component:not(.is-in-desktop-only-mode) .mathSymbolsContainer{width:308px}}}.mathSymbolsContainer .cell-container{padding:0;border:none;background-color:transparent;flex:1 0 14%;cursor:pointer;border-radius:4px;width:28px;height:28px;display:flex;align-items:center;justify-content:center}:host(:not([data-tabbing=true])) .mathSymbolsContainer .cell-container,html:not([data-tabbing=true]) .mathSymbolsContainer .cell-container{outline:none}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .mathSymbolsContainer .cell-container{width:44px;height:44px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .mathSymbolsContainer .cell-container{width:44px;height:44px}}.mathSymbolsContainer .cell-container:hover{background:var(--popup-button-hover)}",""]),t.locals={LEFT_HEADER_WIDTH:"41px",RIGHT_HEADER_WIDTH:"41px"}},1685:function(e,t,n){var o=n(31),i=n(1686);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var r={insert:function(e){if(!window.isApryseWebViewerWebComponent)return void document.head.appendChild(e);let t;t=document.getElementsByTagName("apryse-webviewer"),t.length||(t=function e(t,n=document){const o=[];return n.querySelectorAll(t).forEach(e=>o.push(e)),n.querySelectorAll("*").forEach(n=>{n.shadowRoot&&o.push(...e(t,n.shadowRoot))}),o}("apryse-webviewer"));const n=[];for(let o=0;o<t.length;o++){const i=t[o];if(0===o)i.shadowRoot.appendChild(e),e.onload=function(){n.length>0&&n.forEach(t=>{t.innerHTML=e.innerHTML})};else{const t=e.cloneNode(!0);i.shadowRoot.appendChild(t),n.push(t)}}},singleton:!1};o(i,r);e.exports=i.locals||{}},1686:function(e,t,n){(t=e.exports=n(32)(!1)).push([e.i,".open.RichTextPopup{visibility:visible}.closed.RichTextPopup{visibility:hidden}:host{display:inline-block;container-type:inline-size;width:100%;height:100%;overflow:hidden}@media(min-width:901px){.App:not(.is-web-component) .hide-in-desktop{display:none}}@container (min-width: 901px){.hide-in-desktop{display:none}}@media(min-width:641px)and (max-width:900px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .hide-in-tablet{display:none}}@container (min-width: 641px) and (max-width: 900px){.App.is-web-component:not(.is-in-desktop-only-mode) .hide-in-tablet{display:none}}@media(max-width:640px)and (min-width:431px){.App:not(.is-web-component) .hide-in-mobile{display:none}}@container (max-width: 640px) and (min-width: 431px){.App.is-web-component .hide-in-mobile{display:none}}@media(max-width:430px){.App:not(.is-web-component) .hide-in-small-mobile{display:none}}@container (max-width: 430px){.App.is-web-component .hide-in-small-mobile{display:none}}.always-hide{display:none}.RichTextPopup{position:absolute;z-index:70;display:flex;justify-content:center;align-items:center}.RichTextPopup:empty{padding:0}.RichTextPopup .buttons{display:flex}.RichTextPopup .Button{margin:4px;width:32px;height:32px}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .RichTextPopup .Button{width:42px;height:42px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .RichTextPopup .Button{width:42px;height:42px}}.RichTextPopup .Button:hover{background:var(--popup-button-hover)}.RichTextPopup .Button .Icon{width:18px;height:18px}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .RichTextPopup .Button .Icon{width:24px;height:24px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .RichTextPopup .Button .Icon{width:24px;height:24px}}.is-vertical.RichTextPopup .Button.main-menu-button{width:100%;border-radius:0;justify-content:flex-start;padding-left:var(--padding-small);padding-right:var(--padding-small);margin:0 0 var(--padding-tiny) 0}.is-vertical.RichTextPopup .Button.main-menu-button:first-child{margin-top:var(--padding-tiny)}@media(max-width:640px){.App:not(.is-in-desktop-only-mode):not(.is-web-component) .is-vertical.RichTextPopup .Button.main-menu-button{width:100%;height:32px}}@container (max-width: 640px){.App.is-web-component:not(.is-in-desktop-only-mode) .is-vertical.RichTextPopup .Button.main-menu-button{width:100%;height:32px}}.is-vertical.RichTextPopup .Button.main-menu-button .Icon{margin-right:10px}.is-vertical.RichTextPopup .Button.main-menu-button span{white-space:nowrap}@-webkit-keyframes bottom-up{0%{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes bottom-up{0%{transform:translateY(100%)}to{transform:translateY(0)}}@-webkit-keyframes up-bottom{0%{transform:translateY(0)}to{transform:translateY(100%)}}@keyframes up-bottom{0%{transform:translateY(0)}to{transform:translateY(100%)}}.RichTextPopup{overflow:visible;flex-direction:column;background:var(--component-background);border-radius:4px;box-shadow:0 0 3px 0 var(--document-box-shadow);width:220px;padding:6px 12px;align-items:flex-start}.RichTextPopup.legacy{padding:0;width:auto;align-items:center}.RichTextPopup.legacy .ColorPalette.padding{padding:4px 12px 8px}.RichTextPopup.legacy .colorPicker{padding:0 12px 8px}.RichTextPopup .rich-text-format-legacy{display:flex;width:100%;justify-content:center}.RichTextPopup .ColorPalette.padding{padding:0}.RichTextPopup .menu-items{width:100%;padding:6px 4px}.RichTextPopup .collapsible-menu{width:100%;display:flex;cursor:pointer;align-items:center;justify-content:space-between}.RichTextPopup .collapsible-menu .menu-title{padding-left:4px;padding-top:6px;padding-bottom:6px;font-weight:700;font-size:14px}.RichTextPopup .collapsible-menu .Icon{height:18px;width:18px}.RichTextPopup .divider{background-color:var(--divider);width:100%;height:1px;margin:6px 0}",""]),t.locals={LEFT_HEADER_WIDTH:"41px",RIGHT_HEADER_WIDTH:"41px"}},1841:function(e,t,n){"use strict";n.r(t);n(38),n(51),n(55),n(19),n(82),n(312),n(409),n(411),n(12),n(14),n(7),n(13),n(9),n(10),n(11),n(16),n(15),n(20),n(17),n(27),n(28),n(26),n(22),n(34),n(33),n(56),n(23),n(24),n(58),n(57);var o=n(0),i=n.n(o),r=n(164),a=n.n(r),l=n(18),c=n.n(l),p=n(6),u=n(121),s=n.n(u),d=n(4),m=n.n(d),h=n(1506),f=n(270),b=n(47),y=n(172),x=n(35),g=n(1),w=(n(154),n(265)),v=n(21),T=function(e,t){if(t&&t.current){var n=Object(v.a)().querySelector("#pageWidgetContainer".concat(e.PageNumber,' [id="freetext-editor-').concat(e.Id,'"]')),o=g.a.getScrollViewElement(),i=2*parseFloat(e.StrokeThickness)*g.a.getZoom(),r=n.getBoundingClientRect(),a={topLeft:{x:r.left+o.scrollLeft-i,y:r.top+o.scrollTop-i},bottomRight:{x:r.right+o.scrollLeft+i,y:r.bottom+o.scrollTop+i}},l=t.current.getBoundingClientRect();return{left:Object(w.a)(a,l),top:Object(w.b)(a,l)}}},E=n(1370),S=(n(42),n(1683),["+","−","×","÷","=","≠","±","¬","<",">","⋜","⋝","°","¹","²","³","ƒ","%","‰","‱","∀","∁","∂","∃","∄","∅","∆","∇","∈","∉","∊","∋","∌","∍","∎","∏","∐","∑","∓","∔","∕","∖","∗","∘","∙","√","∛","∜","∝","∞","∟","∠","∡","∢","∣","∤","∥","∦","∧","∨","∩","∪","∫","∬","∭","∮","∯","∰","∱","∲","∳","∴","∵","∶","∷","∸","∹","∺","∻","∼","∽","∾","∿","≀","≁","≂","≃","≄","≅","≆","≇","≈","≉","≊","≋","≌"]),P=function(e){var t=e.onClickHandler,n=e.maxHeight;return i.a.createElement("div",{className:"mathSymbolsContainer padding",style:{maxHeight:"".concat(n,"px")}},S.map((function(e,n){return i.a.createElement("button",{key:n,className:"cell-container",onClick:function(){t(e)}},e)})))},O=n(299),C=n(2),R=n(3),A=(n(1685),n(5)),_=n(46),k=n(37),j=n(272),N=n(1391);function L(e){return(L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function B(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?B(Object(n),!0).forEach((function(t){D(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):B(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function D(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==L(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,t||"default");if("object"!==L(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===L(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function H(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,i,r,a,l=[],c=!0,p=!1;try{if(r=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(o=r.call(n)).done)&&(l.push(o.value),l.length!==t);c=!0);}catch(e){p=!0,i=e}finally{try{if(!c&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(p)throw i}}return l}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return F(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return F(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var z={annotation:m.a.object,editor:m.a.object},Y=function(e){var t,n=e.annotation,r=e.editor,l=H(Object(p.e)((function(e){return[R.a.isElementDisabled(e,A.a.RICH_TEXT_POPUP),R.a.isElementOpen(e,A.a.RICH_TEXT_POPUP),R.a.isElementDisabled(e,"colorPalette"),R.a.getCustomColors(e,"customColors"),R.a.isInDesktopOnlyMode(e),R.a.isElementOpen(e,A.a.STYLE_POPUP_TEXT_STYLE_CONTAINER),R.a.isElementOpen(e,A.a.STYLE_POPUP_COLORS_CONTAINER),R.a.getFonts(e),!R.a.isElementDisabled(e,A.a.LEGACY_RICH_TEXT_POPUP)]}),p.c),9),u=l[0],d=l[1],m=l[2],w=l[3],v=l[4],S=l[5],L=l[6],B=l[7],F=l[8],z=H(Object(o.useState)(!1),2),Y=z[0],M=z[1],U=H(Object(o.useState)({left:0,top:0}),2),q=U[0],W=U[1],V=H(Object(o.useState)({x:0,y:0}),2),X=V[0],G=V[1],J=H(Object(o.useState)({}),2),K=J[0],Z=J[1],$=Object(o.useRef)(null),Q=Object(o.useRef)(null),ee=Object(o.useRef)(null),te=Object(o.useRef)({}),ne=Object(p.d)(),oe=Object(o.useRef)(),ie=H(Object(o.useState)(n.isAutoSizeFont()),2),re=ie[0],ae=ie[1];Object(o.useEffect)((function(){return ne(C.a.disableElements([A.a.ANNOTATION_STYLE_POPUP])),ne(C.a.closeElement(A.a.ANNOTATION_POPUP)),function(){ne(C.a.enableElements([A.a.ANNOTATION_STYLE_POPUP]))}}),[]),Object(o.useEffect)((function(){var e=function(e,t){!e&&t&&Q.current&&Q.current.setSelection(t.index,t.length),e&&Q.current&&Z(ce(e))},t=function(){var e,t;if(null!==(e=ee.current)&&void 0!==e&&e.isAutoSized()&&$.current){var n=T(ee.current,$);W(n)}Z(ce(null===(t=Q.current)||void 0===t?void 0:t.getSelection()))};return g.a.addEventListener("editorSelectionChanged",e),g.a.addEventListener("editorTextChanged",t),function(){g.a.removeEventListener("editorSelectionChanged",e),g.a.removeEventListener("editorTextChanged",t)}}),[]),Object(o.useEffect)((function(){var e,t,o,i,a,l,c;G({x:0,y:0}),Q.current=r,ee.current=n;var p="solid";try{p="dash"===n.Style?"".concat(n.Style,",").concat(n.Dashes):n.Style}catch(e){console.error(e)}var u=n.getRichTextStyle()[0];te.current={Font:n.Font,FontSize:n.FontSize,TextAlign:n.TextAlign,TextVerticalAlign:n.TextVerticalAlign,bold:null!==(e="bold"===(null==u?void 0:u["font-weight"]))&&void 0!==e&&e,italic:null!==(t="italic"===(null==u?void 0:u["font-style"]))&&void 0!==t&&t,underline:(null==u||null===(o=u["text-decoration"])||void 0===o?void 0:o.includes("underline"))||(null==u||null===(i=u["text-decoration"])||void 0===i?void 0:i.includes("word")),strikeout:null!==(a=null==u||null===(l=u["text-decoration"])||void 0===l?void 0:l.includes("line-through"))&&void 0!==a&&a,size:null==u?void 0:u["font-size"],font:null==u?void 0:u["font-family"],StrokeStyle:p,calculatedFontSize:n.getCalculatedFontSize()},Z(ce(null===(c=Q.current)||void 0===c?void 0:c.getSelection())),oe.current&&(Q.current.setSelection(oe.current),oe.current=null)}),[n,r]),Object(o.useEffect)((function(){var e=function(){ne(C.a.closeElements([A.a.RICH_TEXT_POPUP])),Q.current=null,ee.current=null};return g.a.addEventListener("editorBlur",e),function(){g.a.removeEventListener("editorBlur",e)}}),[ne]);var le=function(){if($.current){var e=T(n,$);W(e)}};Object(o.useLayoutEffect)((function(){le()}),[n]),Object(o.useLayoutEffect)((function(){var e=s()((function(){$.current&&le()}),100),t=g.a.getDocumentViewer().getScrollViewElement();return null==t||t.addEventListener("scroll",e),function(){return null==t?void 0:t.removeEventListener("scroll",e)}}),[n,Y]);var ce=function(e){if(!e)return{};var t=Q.current.getFormat(e.index,e.length);if("string"==typeof t.color)t.color=new window.Core.Annotations.Color(t.color);else if(Array.isArray(t.color)){var n=new window.Core.Annotations.Color(t.color[t.color.length-1]);t.color=n}else t.color||(t.color=ee.current.TextColor);return t},pe=function(e){return function(){var t=Q.current.getSelection(),n=t.index,o=t.length;if(0===o){oe.current={index:n,length:o};var i=Q.current.getSelection();n=i.index,o=i.length}var r=Q.current.getFormat(n,o);se(e,!r[e])}},ue=function(e,t){se("color",t.toHexString())},se=function(e,t){var n,o;"size"===e?null===(n=Q.current)||void 0===n||n.format("applyCustomFontSize",t):null===(o=Q.current)||void 0===o||o.format(e,t);"color"===e&&(t=new window.Core.Annotations.Color(t)),Z(I(I({},K),{},D({},e,t)))},de=function(e,t){var n=t.x,o=t.y;G({x:n,y:o})},me=(D(t={},A.a.STYLE_POPUP_TEXT_STYLE_CONTAINER,S),D(t,A.a.STYLE_POPUP_COLORS_CONTAINER,L),t),he=function(e){ne(me[e]?C.a.closeElement(e):C.a.openElement(e))},fe=function(){return he(A.a.STYLE_POPUP_TEXT_STYLE_CONTAINER)},be=function(){return he(A.a.STYLE_POPUP_COLORS_CONTAINER)};return te.current.bold=K.bold,te.current.italic=K.italic,te.current.underline=K.underline,te.current.strikeout=K.strike,te.current.quillFont=K.font||te.current.Font,te.current.quillFontSize=K.originalSize||te.current.FontSize,u||Object(x.l)()&&!v?null:i.a.createElement(a.a,{position:X,onDrag:de,onStop:de,enableUserSelectHack:!1,cancel:".Button, .cell, .mathSymbolsContainer, .Dropdown, .Dropdown__item",onMouseDown:function(e){"touchstart"!==e.type&&e.preventDefault()}},i.a.createElement("div",{className:c()({Popup:!0,RichTextPopup:!0,open:d,closed:!d,legacy:F}),ref:$,"data-element":A.a.RICH_TEXT_POPUP,style:I({},q)},F?i.a.createElement(i.a.Fragment,null,i.a.createElement(h.a,{className:"rich-text-format-legacy",dataElement:"richTextFormats"},i.a.createElement(b.a,{isActive:K.bold,dataElement:"richTextBoldButton",onClick:pe("bold"),img:"icon-text-bold",title:"option.richText.bold"}),i.a.createElement(b.a,{isActive:K.italic,dataElement:"richTextItalicButton",onClick:pe("italic"),img:"icon-text-italic",title:"option.richText.italic"}),i.a.createElement(b.a,{isActive:K.underline,dataElement:"richTextUnderlineButton",onClick:pe("underline"),img:"ic_annotation_underline_black_24px",title:"option.richText.underline"}),i.a.createElement(b.a,{isActive:K.strike,dataElement:"richTextStrikeButton",onClick:pe("strike"),img:"ic_annotation_strikeout_black_24px",title:"option.richText.strikeout"}),i.a.createElement(b.a,{dataElement:"mathSymbolsButton",onClick:function(){M(!Y)},img:"ic_thumbnails_grid_black_24px",title:"option.mathSymbols"})),i.a.createElement(y.a,{style:{paddingTop:0}})):i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"collapsible-menu",onClick:fe,onTouchStart:fe,role:"toolbar"},i.a.createElement("div",{className:"menu-title"},_.a.t("option.stylePopup.textStyle")),i.a.createElement(k.a,{glyph:"icon-chevron-".concat(S?"up":"down")})),S&&i.a.createElement("div",{className:"menu-items"},i.a.createElement(j.a,{fonts:B,onPropertyChange:function(e,t){var n=Q.current.getSelection(),o=n.index,i=n.length,r=ee.current;r[e]=t,Q.current.blur(),"FontSize"!==e&&"Font"!==e||Object(E.a)(r),setTimeout((function(){oe.current={index:o,length:i},g.a.getAnnotationManager().getEditBoxManager().focusBox(r)}),0)},onRichTextStyleChange:function(e,t){var n={"font-weight":"bold","font-style":"italic",underline:"underline","line-through":"strike","font-family":"font","font-size":"size"};if("font-family"===e||"font-size"===e){se(n[e],t);var o=ee.current;if(o.isAutoSized())g.a.getAnnotationManager().getEditBoxManager().resizeAnnotation(o)}else pe(n[e])()},properties:te.current,stateless:!0,isFreeText:!0,onFreeTextSizeToggle:function(){return Object(N.a)(n,ae,re)},isFreeTextAutoSize:re,isRichTextEditMode:!0})),i.a.createElement("div",{className:"divider"}),!m&&i.a.createElement("div",{className:"collapsible-menu",onClick:be,onTouchStart:be,role:"toolbar"},i.a.createElement("div",{className:"menu-title"},_.a.t("option.stylePopup.colors")),i.a.createElement(k.a,{glyph:"icon-chevron-".concat(L?"up":"down")}))),!m&&(F||L)&&i.a.createElement(i.a.Fragment,null,i.a.createElement(f.a,{colorMapKey:"freeText",color:K.color,property:"TextColor",onStyleChange:ue,hasPadding:!0}),w.length>0&&i.a.createElement(O.a,{color:K.color,property:"TextColor",onStyleChange:ue,enableEdit:!1})),Y&&i.a.createElement(P,{onClickHandler:function(e){var t=Q.current.getSelection(),n=t.index,o=t.length;o>0&&Q.current.deleteText(n,o),Q.current.insertText(n,e),Q.current.setSelection(n+1)},maxHeight:150})))};Y.propTypes=z;var M=i.a.memo(Y);t.default=M}}]);
//# sourceMappingURL=43.chunk.js.map