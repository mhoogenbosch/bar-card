function e(e,t,i,r){var n,a=arguments.length,o=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(a<3?n(o):a>3?n(t,i,o):n(t,i))||o);return a>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=new WeakMap,i=e=>"function"==typeof e&&t.has(e),r=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},a={},o={},s=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${s}--\x3e`,l=new RegExp(`${s}|${c}`),d="$lit$";class h{constructor(e,t){this.parts=[],this.element=t;const i=[],r=[],n=document.createTreeWalker(t.content,133,null,!1);let a=0,o=-1,c=0;const{strings:h,values:{length:p}}=e;for(;c<p;){const e=n.nextNode();if(null!==e){if(o++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let r=0;for(let e=0;e<i;e++)u(t[e].name,d)&&r++;for(;r-- >0;){const t=h[c],i=f.exec(t)[2],r=i.toLowerCase()+d,n=e.getAttribute(r);e.removeAttribute(r);const a=n.split(l);this.parts.push({type:"attribute",index:o,name:i,strings:a}),c+=a.length-1}}"TEMPLATE"===e.tagName&&(r.push(e),n.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const r=e.parentNode,n=t.split(l),a=n.length-1;for(let t=0;t<a;t++){let i,a=n[t];if(""===a)i=m();else{const e=f.exec(a);null!==e&&u(e[2],d)&&(a=a.slice(0,e.index)+e[1]+e[2].slice(0,-d.length)+e[3]),i=document.createTextNode(a)}r.insertBefore(i,e),this.parts.push({type:"node",index:++o})}""===n[a]?(r.insertBefore(m(),e),i.push(e)):e.data=n[a],c+=a}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&o!==a||(o++,t.insertBefore(m(),e)),a=o,this.parts.push({type:"node",index:o}),null===e.nextSibling?e.data="":(i.push(e),o--),c++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),c++}}else n.currentNode=r.pop()}for(const e of i)e.parentNode.removeChild(e)}}const u=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},p=e=>-1!==e.index,m=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class g{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=r?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let a,o=0,s=0,c=n.nextNode();for(;o<i.length;)if(a=i[o],p(a)){for(;s<a.index;)s++,"TEMPLATE"===c.nodeName&&(t.push(c),n.currentNode=c.content),null===(c=n.nextNode())&&(n.currentNode=t.pop(),c=n.nextNode());if("node"===a.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(c.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,a.name,a.strings,this.options));o++}else this.__parts.push(void 0),o++;return r&&(document.adoptNode(e),customElements.upgrade(e)),e}}const b=` ${s} `;class _{constructor(e,t,i,r){this.strings=e,this.values=t,this.type=i,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let r=0;r<e;r++){const e=this.strings[r],n=e.lastIndexOf("\x3c!--");i=(n>-1||i)&&-1===e.indexOf("--\x3e",n+1);const a=f.exec(e);t+=null===a?e+(i?b:c):e.substr(0,a.index)+a[1]+a[2]+d+a[3]+s}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}const y=e=>null===e||!("object"==typeof e||"function"==typeof e),v=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class w{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new x(this)}_getValue(){const e=this.strings,t=e.length-1;let i="";for(let r=0;r<t;r++){i+=e[r];const t=this.parts[r];if(void 0!==t){const e=t.value;if(y(e)||!v(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class x{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===a||y(e)&&e===this.value||(this.value=e,i(e)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const e=this.value;this.value=a,e(this)}this.value!==a&&this.committer.commit()}}class S{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(m()),this.endNode=e.appendChild(m())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=m()),e.__insert(this.endNode=m())}insertAfterPart(e){e.__insert(this.startNode=m()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}const e=this.__pendingValue;e!==a&&(y(e)?e!==this.value&&this.__commitText(e):e instanceof _?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):v(e)?this.__commitIterable(e):e===o?(this.value=o,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof g&&this.value.template===t)this.value.update(e.values);else{const i=new g(t,e.processor,this.options),r=i._clone();i.update(e.values),this.__commitNode(r),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,r=0;for(const n of e)void 0===(i=t[r])&&(i=new S(this.options),t.push(i),0===r?i.appendIntoPart(this):i.insertAfterPart(t[r-1])),i.setValue(n),i.commit(),r++;r<t.length&&(t.length=r,this.clear(i&&i.endNode))}clear(e=this.startNode){n(this.startNode.parentNode,e.nextSibling,this.endNode)}}class k{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}if(this.__pendingValue===a)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=a}}class N extends w{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new $(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class $ extends x{}let A=!1;try{const e={get capture(){return A=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}class P{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;i(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=a,e(this)}if(this.__pendingValue===a)return;const e=this.__pendingValue,t=this.value,r=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),n=null!=e&&(null==t||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=C(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=a}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const C=e=>e&&(A?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);const E=new class{handleAttributeExpressions(e,t,i,r){const n=t[0];if("."===n){return new N(e,t.slice(1),i).parts}return"@"===n?[new P(e,t.slice(1),r.eventContext)]:"?"===n?[new k(e,t.slice(1),i)]:new w(e,t,i).parts}handleTextExpression(e){return new S(e)}};function T(e){let t=V.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},V.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const r=e.strings.join(s);return void 0===(i=t.keyString.get(r))&&(i=new h(e,e.getTemplateElement()),t.keyString.set(r,i)),t.stringsArray.set(e.strings,i),i}const V=new Map,O=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.2");const j=(e,...t)=>new _(e,t,"html",E),z=133;function M(e,t){const{element:{content:i},parts:r}=e,n=document.createTreeWalker(i,z,null,!1);let a=U(r),o=r[a],s=-1,c=0;const l=[];let d=null;for(;n.nextNode();){s++;const e=n.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(l.push(e),null===d&&(d=e)),null!==d&&c++;void 0!==o&&o.index===s;)o.index=null!==d?-1:o.index-c,o=r[a=U(r,a)]}l.forEach(e=>e.parentNode.removeChild(e))}const R=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,z,null,!1);for(;i.nextNode();)t++;return t},U=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(p(t))return i}return-1};const L=(e,t)=>`${e}--${t}`;let I=!0;void 0===window.ShadyCSS?I=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),I=!1);const q=e=>t=>{const i=L(t.type,e);let r=V.get(i);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},V.set(i,r));let n=r.stringsArray.get(t.strings);if(void 0!==n)return n;const a=t.strings.join(s);if(void 0===(n=r.keyString.get(a))){const i=t.getTemplateElement();I&&window.ShadyCSS.prepareTemplateDom(i,e),n=new h(t,i),r.keyString.set(a,n)}return r.stringsArray.set(t.strings,n),n},B=["html","svg"],H=new Set,F=(e,t,i)=>{H.add(e);const r=i?i.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:a}=n;if(0===a)return void window.ShadyCSS.prepareTemplateStyles(r,e);const o=document.createElement("style");for(let e=0;e<a;e++){const t=n[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}(e=>{B.forEach(t=>{const i=V.get(L(t,e));void 0!==i&&i.keyString.forEach(e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach(e=>{i.add(e)}),M(e,i)})})})(e);const s=r.content;i?function(e,t,i=null){const{element:{content:r},parts:n}=e;if(null==i)return void r.appendChild(t);const a=document.createTreeWalker(r,z,null,!1);let o=U(n),s=0,c=-1;for(;a.nextNode();){for(c++,a.currentNode===i&&(s=R(t),i.parentNode.insertBefore(t,i));-1!==o&&n[o].index===c;){if(s>0){for(;-1!==o;)n[o].index+=s,o=U(n,o);return}o=U(n,o)}}}(i,o,s.firstChild):s.insertBefore(o,s.firstChild),window.ShadyCSS.prepareTemplateStyles(r,e);const c=s.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(i){s.insertBefore(o,s.firstChild);const e=new Set;e.add(o),M(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const D={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},W=(e,t)=>t!==e&&(t==t||e==e),J={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:W},Y=Promise.resolve(!0),X=1,G=4,K=8,Q=16,Z=32,ee="finalized";class te extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=Y,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const r=this._attributeNameForProperty(i,t);void 0!==r&&(this._attributeToPropertyMap.set(r,i),e.push(r))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=J){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`;Object.defineProperty(this.prototype,e,{get(){return this[i]},set(t){const r=this[e];this[i]=t,this._requestUpdate(e,r)},configurable:!0,enumerable:!0})}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(ee)||e.finalize(),this[ee]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=W){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,r=t.converter||D,n="function"==typeof r?r:r.fromAttribute;return n?n(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,r=t.converter;return(r&&r.toAttribute||D.toAttribute)(e,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Z,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=J){const r=this.constructor,n=r._attributeNameForProperty(e,i);if(void 0!==n){const e=r._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=this._updateState|K,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=this._updateState&~K}}_attributeToProperty(e,t){if(this._updateState&K)return;const i=this.constructor,r=i._attributeToPropertyMap.get(e);if(void 0!==r){const e=i._classProperties.get(r)||J;this._updateState=this._updateState|Q,this[r]=i._propertyValueFromAttribute(t,e),this._updateState=this._updateState&~Q}}_requestUpdate(e,t){let i=!0;if(void 0!==e){const r=this.constructor,n=r._classProperties.get(e)||J;r._valueHasChanged(this[e],t,n.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==n.reflect||this._updateState&Q||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,n))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(e,t){return this._requestUpdate(e,t),this.updateComplete}async _enqueueUpdate(){let e,t;this._updateState=this._updateState|G;const i=this._updatePromise;this._updatePromise=new Promise((i,r)=>{e=i,t=r});try{await i}catch(e){}this._hasConnected||await new Promise(e=>this._hasConnectedResolver=e);try{const e=this.performUpdate();null!=e&&await e}catch(e){t(e)}e(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Z}get _hasRequestedUpdate(){return this._updateState&G}get hasUpdated(){return this._updateState&X}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{(e=this.shouldUpdate(t))&&this.update(t)}catch(t){throw e=!1,t}finally{this._markUpdated()}e&&(this._updateState&X||(this._updateState=this._updateState|X,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~G}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0)}updated(e){}firstUpdated(e){}}te[ee]=!0;const ie=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:r}=t;return{kind:i,elements:r,finisher(t){window.customElements.define(e,t)}}})(e,t),re=(e,t)=>"method"!==t.kind||!t.descriptor||"value"in t.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}}:Object.assign({},t,{finisher(i){i.createProperty(t.key,e)}}),ne=(e,t,i)=>{t.constructor.createProperty(i,e)};function ae(e){return(t,i)=>void 0!==i?ne(e,t,i):re(e,t)}const oe="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol();class ce{constructor(e,t){if(t!==se)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(oe?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const le=(e,...t)=>{const i=t.reduce((t,i,r)=>t+(e=>{if(e instanceof ce)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[r+1],e[0]);return new ce(i,se)};(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const de=e=>e.flat?e.flat(1/0):function e(t,i=[]){for(let r=0,n=t.length;r<n;r++){const n=t[r];Array.isArray(n)?e(n,i):i.push(n)}return i}(e);class he extends te{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const e=this.styles,t=[];if(Array.isArray(e)){de(e).reduceRight((e,t)=>(e.add(t),e),new Set).forEach(e=>t.unshift(e))}else e&&t.push(e);return t}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?oe?this.renderRoot.adoptedStyleSheets=e.map(e=>e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){super.update(e);const t=this.render();t instanceof _&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){}}var ue,pe,me;function fe(e){return e.substr(0,e.indexOf("."))}he.finalized=!0,he.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const r=i.scopeName,a=O.has(t),o=I&&11===t.nodeType&&!!t.host,s=o&&!H.has(r),c=s?document.createDocumentFragment():t;if(((e,t,i)=>{let r=O.get(t);void 0===r&&(n(t,t.firstChild),O.set(t,r=new S(Object.assign({templateFactory:T},i))),r.appendInto(t)),r.setValue(e),r.commit()})(e,c,Object.assign({templateFactory:q(r)},i)),s){const e=O.get(c);O.delete(c);const i=e.value instanceof g?e.value.template:void 0;F(r,c,i),n(t,t.firstChild),t.appendChild(c),O.set(t,e)}!a&&o&&window.ShadyCSS.styleElement(t.host)},(me=ue||(ue={})).language="language",me.system="system",me.comma_decimal="comma_decimal",me.decimal_comma="decimal_comma",me.space_comma="space_comma",me.none="none",function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(pe||(pe={}));var ge=["closed","locked","off"],be=function(e,t,i,r){r=r||{},i=null==i?{}:i;var n=new Event(t,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return n.detail=i,e.dispatchEvent(n),n},_e={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function ye(e,t){if(e in _e)return _e[e];switch(e){case"alarm_control_panel":switch(t){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return t&&"off"===t?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===t?"mdi:window-closed":"mdi:window-open";case"lock":return t&&"unlocked"===t?"mdi:lock-open":"mdi:lock";case"media_player":return t&&"off"!==t&&"idle"!==t?"mdi:cast-connected":"mdi:cast";case"zwave":switch(t){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+e+" ("+t+")"),"mdi:bookmark"}}var ve=function(e){be(window,"haptic",e)},we=function(e,t){return function(e,t,i){void 0===i&&(i=!0);var r,n=fe(t),a="group"===n?"homeassistant":n;switch(n){case"lock":r=i?"unlock":"lock";break;case"cover":r=i?"open_cover":"close_cover";break;default:r=i?"turn_on":"turn_off"}return e.callService(a,r,{entity_id:t})}(e,t,ge.includes(e.states[t].state))},xe=function(e,t,i,r){if(r||(r={action:"more-info"}),!r.confirmation||r.confirmation.exemptions&&r.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(ve("warning"),confirm(r.confirmation.text||"Are you sure you want to "+r.action+"?")))switch(r.action){case"more-info":(i.entity||i.camera_image)&&be(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":r.navigation_path&&function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),be(window,"location-changed",{replace:i})}(0,r.navigation_path);break;case"url":r.url_path&&window.open(r.url_path);break;case"toggle":i.entity&&(we(t,i.entity),ve("success"));break;case"call-service":if(!r.service)return void ve("failure");var n=r.service.split(".",2);t.callService(n[0],n[1],r.service_data,r.target),ve("success");break;case"fire-dom-event":be(e,"ll-custom",r)}};function Se(e){return void 0!==e&&"none"!==e.action}const ke={select:{mode:"dropdown",options:["inside","outside","off"]}},Ne={name:"entity",selector:{entity:{}}},$e=[{type:"grid",name:"",schema:[{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"unit_of_measurement",selector:{text:{}}},{name:"direction",selector:{select:{mode:"dropdown",options:["right","left","up","down","right-reverse","left-reverse","up-reverse","down-reverse"]}}}]},{type:"grid",name:"",schema:[{name:"min",selector:{text:{}}},{name:"max",selector:{text:{}}},{name:"target",selector:{number:{mode:"box",step:"any"}}},{name:"decimal",selector:{number:{mode:"box",min:0,max:10}}}]},{type:"grid",name:"",schema:[{name:"height",selector:{text:{}}},{name:"width",selector:{text:{}}},{name:"columns",selector:{number:{mode:"box",min:1}}},{name:"stack",selector:{select:{mode:"dropdown",options:["vertical","horizontal"]}}}]},{type:"grid",name:"",schema:[{name:"entity_row",selector:{boolean:{}}},{name:"limit_value",selector:{boolean:{}}},{name:"complementary",selector:{boolean:{}}}]},{type:"expandable",name:"positions",title:"Positions",schema:[{type:"grid",name:"",schema:[{name:"icon",selector:ke},{name:"indicator",selector:ke},{name:"name",selector:ke},{name:"minmax",selector:ke},{name:"value",selector:ke}]}]},{type:"expandable",name:"animation",title:"Animation",schema:[{type:"grid",name:"",schema:[{name:"state",selector:{select:{mode:"dropdown",options:["on","off"]}}},{name:"speed",selector:{number:{mode:"box",min:0,step:"any"}}}]}]}],Ae={entity:"Entity (required)",name:"Name",icon:"Icon",unit_of_measurement:"Unit of measurement",direction:"Direction",min:"Min (number or entity)",max:"Max (number or entity)",target:"Target",decimal:"Decimals",height:"Height (e.g. 40px)",width:"Width (e.g. 100%)",columns:"Columns",stack:"Stack",entity_row:"Entity row",limit_value:"Limit value to min/max",complementary:"Show complementary value",positions:"Positions",animation:"Animation",state:"State",speed:"Speed",indicator:"Indicator",minmax:"Min/max",value:"Value"};let Pe=class extends he{setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return j``;const e=Array.isArray(this._config.entities),t=e?$e:[Ne,...$e];return j`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${t}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <p class="note">
        ${e?j`This card uses an <code>entities</code> list; edit the entities and their per-entity options in the
              YAML editor.`:""}
        Options such as <code>severity</code>, <code>tap_action</code> and per-entity overrides are configured in the
        YAML editor.
      </p>
    `}_computeLabel(e){return Ae[e.name]||e.name}_valueChanged(e){if(e.stopPropagation(),!this._config||!this.hass)return;const t=Object.assign({},e.detail.value);for(const e of Object.keys(t))if(""===t[e]||null===t[e]||void 0===t[e])delete t[e];else if("object"==typeof t[e]&&!Array.isArray(t[e])){const i=Object.assign({},t[e]);for(const e of Object.keys(i))""!==i[e]&&null!==i[e]&&void 0!==i[e]||delete i[e];0===Object.keys(i).length?delete t[e]:t[e]=i}be(this,"config-changed",{config:t})}static get styles(){return le`
      .note {
        color: var(--secondary-text-color);
        font-size: 12px;
        margin: 12px 4px 0px;
      }
    `}};e([ae()],Pe.prototype,"hass",void 0),e([ae()],Pe.prototype,"_config",void 0),Pe=e([ie("bar-card-editor")],Pe);const Ce="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;customElements.define("action-handler-bar",class extends HTMLElement{constructor(){super(),this.holdTime=500,this.ripple=document.createElement("mwc-ripple"),this.timer=void 0,this.held=!1,this.cooldownStart=!1,this.cooldownEnd=!1}connectedCallback(){Object.assign(this.style,{position:"absolute",width:Ce?"100px":"50px",height:Ce?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(e=>{document.addEventListener(e,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(e,t){if(e.actionHandler)return;e.actionHandler=!0,e.addEventListener("contextmenu",e=>{const t=e||window.event;t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0,t.returnValue=!1});const i=e=>{if(this.cooldownStart)return;let t,i;this.held=!1,e.touches?(t=e.touches[0].pageX,i=e.touches[0].pageY):(t=e.pageX,i=e.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(t,i),this.held=!0},this.holdTime),this.cooldownStart=!0,window.setTimeout(()=>this.cooldownStart=!1,100)},r=i=>{this.cooldownEnd||["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?be(e,"action",{action:"hold"}):t.hasDoubleTap?1===i.detail||"keyup"===i.type?this.dblClickTimeout=window.setTimeout(()=>{be(e,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),be(e,"action",{action:"double_tap"})):be(e,"action",{action:"tap"}),this.cooldownEnd=!0,window.setTimeout(()=>this.cooldownEnd=!1,100))};e.addEventListener("touchstart",i,{passive:!0}),e.addEventListener("touchend",r),e.addEventListener("touchcancel",r),e.addEventListener("keyup",e=>{if(13===e.keyCode)return r(e)}),/iPhone OS 13_/.test(window.navigator.userAgent)||(e.addEventListener("mousedown",i,{passive:!0}),e.addEventListener("click",r))}startAnimation(e,t){Object.assign(this.style,{left:`${e}px`,top:`${t}px`,display:null}),this.ripple.disabled=!1,this.ripple.active=!0,this.ripple.unbounded=!0}stopAnimation(){this.ripple.active=!1,this.ripple.disabled=!0,this.style.display="none"}});const Ee=(e,t)=>{const i=(()=>{const e=document.body;if(e.querySelector("action-handler-bar"))return e.querySelector("action-handler-bar");const t=document.createElement("action-handler-bar");return e.appendChild(t),t})();i&&i.bind(e,t)},Te=(e=>(...i)=>{const r=e(...i);return t.set(r,!0),r})((e={})=>t=>{Ee(t.committer.element,e)});var Ve={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",entity_not_available:"Entity not available"},Oe={common:Ve},je={version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel"},ze={common:je},Me={en:Object.freeze({__proto__:null,common:Ve,default:Oe}),nb:Object.freeze({__proto__:null,common:je,default:ze})};function Re(e,t="",i=""){const r=e.split(".")[0],n=e.split(".")[1],a=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");var o;try{o=Me[a][r][n]}catch(e){o=Me.en[r][n]}return void 0===o&&(o=Me.en[r][n]),""!==t&&""!==i&&(o=o.replace(t,i)),o}function Ue(...e){const t=e=>e&&"object"==typeof e;return e.reduce((e,i)=>(Object.keys(i).forEach(r=>{const n=e[r],a=i[r];Array.isArray(n)&&Array.isArray(a)?e[r]=n.concat(...a):t(n)&&t(a)?e[r]=Ue(n,a):e[r]=a}),e),{})}function Le(e,t){if("number"==typeof t)return t;if(null==t)return NaN;const i=Number(t);return isNaN(i)?e&&e.states[t]?Number(e.states[t].state):NaN:i}const Ie=j`
  <style>
    .warning {
      display: block;
      color: black;
      background-color: #fce588;
      padding: 8px;
    }
    #states {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    #states > * {
      margin-bottom: 8px;
    }
    #states > :last-child {
      margin-top: 0px;
      margin-bottom: 0px;
    }
    #states > :first-child {
      margin-top: 0px;
    }
    ha-card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    bar-card-row {
      display: flex;
      flex-grow: 1;
    }
    bar-card-row > div {
      flex-basis: 100%;
    }
    bar-card-row:empty {
      display: none;
    }
    bar-card-card {
      display: flex;
      flex-basis: 100%;
      flex-direction: row;
      margin-right: 8px;
      min-width: 0;
    }
    bar-card-card:last-child {
      margin-right: 0px;
    }
    bar-card-background {
      cursor: pointer;
      flex-grow: 1;
      position: relative;
      border-radius: var(--bar-card-border-radius, var(--ha-card-border-radius, 4px));
      overflow: hidden;
    }
    bar-card-iconbar {
      color: var(--bar-card-icon-color, var(--icon-color, var(--paper-item-icon-color, var(--state-icon-color, #44739e))));
      align-items: center;
      align-self: center;
      display: flex;
      height: 40px;
      justify-content: center;
      position: relative;
      width: 40px;
    }
    bar-card-currentbar,
    bar-card-backgroundbar,
    bar-card-contentbar,
    bar-card-targetbar,
    bar-card-animationbar {
      position: absolute;
      height: 100%;
      width: 100%;
      border-radius: var(--bar-card-border-radius, var(--ha-card-border-radius));
    }
    bar-card-contentbar {
      align-items: center;
      color: var(--primary-text-color);
      display: flex;
      justify-content: flex-start;
    }
    .contentbar-direction-right {
      flex-direction: row;
    }
    .contentbar-direction-up {
      flex-direction: column;
    }
    bar-card-backgroundbar {
      background: var(--bar-card-background-color, var(--bar-color));
      filter: brightness(0.5);
      opacity: 0.25;
    }
    bar-card-currentbar {
      background: linear-gradient(
        to var(--bar-direction),
        var(--bar-color) var(--bar-percent),
        #0000 var(--bar-percent),
        #0000 var(--bar-percent)
      );
    }
    bar-card-targetbar {
      background: linear-gradient(
        to var(--bar-direction),
        #0000 var(--bar-percent),
        var(--bar-color) var(--bar-percent),
        var(--bar-color) var(--bar-target-percent),
        #0000 var(--bar-target-percent)
      );
      display: var(--target-display);
      filter: brightness(0.66);
      opacity: 0.33;
    }
    bar-card-markerbar {
      background: var(--bar-color);
      filter: brightness(0.75);
      opacity: 50%;
      position: absolute;
    }
    bar-card-animationbar {
      background-repeat: no-repeat;
      filter: brightness(0.75);
      opacity: 0%;
    }
    .animationbar-horizontal {
      background: linear-gradient(to var(--animation-direction), var(--bar-color) 0%, var(--bar-color) 1%, #0000 1%);
    }
    .animationbar-vertical {
      background: linear-gradient(to var(--animation-direction), #0000 0%, #0000 1%, var(--bar-color) 1%);
    }
    @keyframes animation-increase {
      0% {
        opacity: 50%;
        background-size: var(--bar-percent) 100%;
      }
      100% {
        opacity: 0%;
        background-size: 10000% 100%;
      }
    }
    @keyframes animation-decrease {
      0% {
        opacity: 0%;
        background-size: 10000%;
      }
      100% {
        opacity: 50%;
        background-size: var(--bar-percent);
      }
    }
    @keyframes animation-increase-vertical {
      0% {
        opacity: 50%;
        background-size: 100% var(--bar-percent);
      }
      100% {
        background-size: 100% 0%;
        opacity: 0%;
      }
    }
    @keyframes animation-decrease-vertical {
      0% {
        background-size: 100% 100%;
        opacity: 0%;
      }
      100% {
        opacity: 50%;
        background-size: 100% var(--bar-percent);
      }
    }
    bar-card-indicator {
      align-self: center;
      color: var(--bar-color);
      filter: brightness(0.75);
      height: 16px;
      width: 16px;
      position: relative;
      text-align: center;
      opacity: 0;
    }
    @keyframes bar-card-indicator-fade-a {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }
    @keyframes bar-card-indicator-fade-b {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }
    .indicator-direction-right {
      margin-right: -16px;
      left: -6px;
    }
    .indicator-direction-up {
      margin: 4px;
    }
    bar-card-name,
    bar-card-value {
      line-height: 1;
    }
    bar-card-name {
      align-items: center;
      align-self: center;
      justify-content: center;
      margin: 4px;
      overflow: hidden;
      position: relative;
      text-align: left;
      text-overflow: ellipsis;
    }
    .name-outside {
      margin-left: 16px;
    }
    bar-card-value,
    bar-card-min,
    bar-card-max,
    bar-card-divider {
      align-self: center;
      position: relative;
    }
    bar-card-min,
    bar-card-max,
    bar-card-divider {
      font-size: 10px;
      margin: 2px;
      opacity: 0.5;
    }
    .min-direction-up {
      margin-top: auto;
    }
    .min-direction-right {
      margin-left: auto;
    }
    bar-card-divider {
      margin-left: 0px;
      margin-right: 0px;
    }
    bar-card-value {
      white-space: nowrap;
      margin: 4px;
    }
    .value-direction-right {
      margin-left: auto;
    }
    .value-direction-up {
      margin-top: auto;
    }
  </style>
`;console.info(`%c  BAR-CARD \n%c  ${Re("common.version")} 3.5.0    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");let qe=class extends he{constructor(){super(...arguments),this._configArray=[],this._stateArray=[],this._animationState=[],this._indicatorToggle=[],this._rowAmount=1}static async getConfigElement(){return document.createElement("bar-card-editor")}static getStubConfig(){return{}}shouldUpdate(e){return function(e,t,i){if(t.has("config")||i)return!0;for(const i of e._configArray)if(i.entity){const r=t.get("hass");if(r){if(r.states[i.entity]!==e.hass.states[i.entity])return!0;continue}return!0}return!1}(this,e,!1)}setConfig(e){if(!e)throw new Error(Re("common.invalid_configuration"));this._config=Ue({animation:{state:"off",speed:5},color:"var(--bar-card-color, var(--primary-color))",columns:1,direction:"right",max:100,min:0,positions:{icon:"outside",indicator:"outside",name:"inside",minmax:"off",value:"inside"}},e),"horizontal"==this._config.stack&&this._config.entities&&(this._config.columns=this._config.entities.length),this._configArray=function(e){const t=[];if(e.entities){for(const i of e.entities)if("string"==typeof i){const r=Ue({},e);delete r.entities;const n=Ue(r,{entity:i});t.push(n)}else if("object"==typeof i){const r=Ue({},e);delete r.entities;const n=Ue(r,i);t.push(n)}}else t.push(e);return t}(this._config),this._rowAmount=this._configArray.length/this._config.columns}render(){return this._config&&this.hass?j`
      <ha-card
        .header=${this._config.title?this._config.title:null}
        style="${this._config.entity_row?"background: #0000; box-shadow: none; border: none;":""}"
      >
        <div
          id="states"
          class="card-content"
          style="${this._config.entity_row?"padding: 0px;":""} ${["up","up-reverse","down","down-reverse"].includes(this._config.direction)?"":"flex-grow: 0;"}"
        >
          ${this._createBarArray()}
        </div>
      </ha-card>
      ${Ie}
    `:j``}_createBarArray(){var e,t,i,r;const n=[];for(let e=0;e<this._configArray.length;e++)(n.length+1)*this._config.columns==e&&n.push(this._config.columns),this._configArray.length==e+1&&n.push(this._configArray.length-n.length*this._config.columns);const a=[];for(let o=0;o<n.length;o++){const s=[];for(let a=0;a<n[o];a++){const n=o*this._config.columns+a,c=this._configArray[n],l=this.hass.states[c.entity];if(!l){s.push(j`
            <div class="warning" style="margin-bottom: 8px;">
              ${Re("common.entity_not_available")}: ${c.entity}
            </div>
          `);continue}let d;if(d=c.attribute?l.attributes[c.attribute]:l.state,c.severity&&this._computeSeverityVisibility(d,n))continue;const h=Le(this.hass,c.min),u=Le(this.hass,c.max);if(!c.limit_value||isNaN(h)||isNaN(u)||(d=Math.min(d,u),d=Math.max(d,h)),!isNaN(Number(d)))if(0==c.decimal)d=Number(d).toFixed(0);else if(c.decimal)d=Number(d).toFixed(c.decimal);else if(!c.attribute){const i=null===(t=null===(e=this.hass.entities)||void 0===e?void 0:e[c.entity])||void 0===t?void 0:t.display_precision;null!=i&&(d=Number(d).toFixed(i))}let p=40;c.height&&(p=c.height);const m=["up","up-reverse","down","down-reverse"].includes(c.direction);let f,g,b,_="stretch",y="0px 0px 0px 13px",v="right",w="row",x="left",S="height: 100%; width: 2px;";switch(c.direction){case"right":case"right-reverse":v="right",x="left";break;case"left":case"left-reverse":v="left",x="right";break;case"up":case"up-reverse":y="0px",v="top",w="column-reverse",x="bottom",S="height: 2px; width: 100%;";break;case"down":case"down-reverse":y="0px",v="bottom",w="column",x="top",S="height: 2px; width: 100%;"}switch(b=this._computeSeverityIcon(d,n)?this._computeSeverityIcon(d,n):c.icon?c.icon:l.attributes.icon?l.attributes.icon:(null===(r=null===(i=this.hass.entities)||void 0===i?void 0:i[c.entity])||void 0===r?void 0:r.icon)?this.hass.entities[c.entity].icon:ye(fe(c.entity),d),c.positions.icon){case"outside":f=j`
              <bar-card-iconbar>
                <ha-icon icon="${b}"></ha-icon>
              </bar-card-iconbar>
            `;break;case"inside":g=j`
              <bar-card-iconbar>
                <ha-icon icon="${b}"></ha-icon>
              </bar-card-iconbar>
            `,y="0px";break;case"off":y="0px"}const k=c.name?c.name:l.attributes.friendly_name;let N,$,A,P,C,E,T;switch(c.positions.name){case"outside":N=j`
              <bar-card-name
                class="${c.entity_row?"name-outside":""}"
                style="${m?"":c.width?`width: calc(100% - ${c.width});`:""}"
                >${k}</bar-card-name
              >
            `,y="0px";break;case"inside":$=j`
              <bar-card-name>${k}</bar-card-name>
            `}switch(A=isNaN(Number(d))?"":c.unit_of_measurement?c.unit_of_measurement:l.attributes.unit_of_measurement,c.positions.minmax){case"outside":P=j`
              <bar-card-min>${h}${A}</bar-card-min>
              <bar-card-divider>/</bar-card-divider>
              <bar-card-max>${u}${A}</bar-card-max>
            `;break;case"inside":C=j`
              <bar-card-min class="${m?"min-direction-up":"min-direction-right"}"
                >${h}${A}</bar-card-min
              >
              <bar-card-divider>/</bar-card-divider>
              <bar-card-max> ${u}${A}</bar-card-max>
            `}switch(c.positions.value){case"outside":E=j`
              <bar-card-value class="${m?"value-direction-up":"value-direction-right"}"
                >${c.complementary?u-d:d} ${A}</bar-card-value
              >
            `;break;case"inside":T=j`
              <bar-card-value
                class="${"inside"==c.positions.minmax?"":m?"value-direction-up":"value-direction-right"}"
                >${c.complementary?u-d:d} ${A}</bar-card-value
              >
            `;break;case"off":y="0px"}let V=this._stateArray[n],O=d;isNaN(Number(d))||isNaN(Number(V))||(O=Number(d),V=Number(V));let z="";O>V?(z="▲","up"==c.direction?this._animationState[n]="animation-increase-vertical":this._animationState[n]="animation-increase"):O<V?(z="▼","up"==c.direction?this._animationState[n]="animation-decrease-vertical":this._animationState[n]="animation-decrease"):this._animationState[n]=this._animationState[n],isNaN(Number(d))&&(z="");const M=this._computeBarColor(d,n),R=this._indicatorToggle[n]?"bar-card-indicator-fade-a":"bar-card-indicator-fade-b",U=z?`opacity: 1; animation: ${R} 2s forwards;`:"";let L,I;switch(c.positions.indicator){case"outside":L=j`
              <bar-card-indicator
                class="${m?"":"indicator-direction-right"}"
                style="--bar-color: ${M}; ${U}"
                >${z}</bar-card-indicator
              >
            `;break;case"inside":I=j`
              <bar-card-indicator style="--bar-color: ${M}; ${U}">${z}</bar-card-indicator>
            `}const q=this._computePercent(d,n,h,u),B=this._computePercent(c.target,n,h,u);let H=q,F=this._computePercent(c.target,n,h,u);F<H&&(H=F,F=q);let D="";c.width&&(_="center",D=`width: ${c.width}; flex-grow: 0;`);const W=this._animationState[n];let J="right",Y=100*q,X="animationbar-horizontal";"animation-increase-vertical"!=W&&"animation-decrease-vertical"!=W||(J="bottom",X="animationbar-vertical",Y=100*(100-q)),s.push(j`
          <bar-card-card
            style="flex-direction: ${w}; align-items: ${_};"
            @action=${this._handleAction}
            .config=${c}
            .actionHandler=${Te({hasHold:Se(c.hold_action),hasDoubleClick:Se(c.double_tap_action)})}
          >
            ${f} ${L} ${N}
            <bar-card-background
              style="margin: ${y}; height: ${p}${"number"==typeof p?"px":""}; ${D}"
            >
              <bar-card-backgroundbar style="--bar-color: ${M};"></bar-card-backgroundbar>
              ${"on"==c.animation.state?j`
                    <bar-card-animationbar
                      style="animation: ${W} ${c.animation.speed}s infinite ease-out; --bar-percent: ${Y}%; --bar-color: ${M}; --animation-direction: ${J};"
                      class="${X}"
                    ></bar-card-animationbar>
                  `:""}
              <bar-card-currentbar
                style="--bar-color: ${M}; --bar-percent: ${q}%; --bar-direction: ${v}"
              ></bar-card-currentbar>
              ${c.target?j`
                    <bar-card-targetbar
                      style="--bar-color: ${M}; --bar-percent: ${H}%; --bar-target-percent: ${F}%; --bar-direction: ${v};"
                    ></bar-card-targetbar>
                    <bar-card-markerbar
                      style="--bar-color: ${M}; --bar-target-percent: ${B}%; ${x}: calc(${B}% - 1px); ${S}}"
                    ></bar-card-markerbar>
                  `:""}
              <bar-card-contentbar
                class="${m?"contentbar-direction-up":"contentbar-direction-right"}"
              >
                ${g} ${I} ${$} ${C} ${T}
              </bar-card-contentbar>
            </bar-card-background>
            ${P} ${E}
          </bar-card-card>
        `),d!==this._stateArray[n]&&(this._stateArray[n]=d),this._indicatorToggle[n]=!this._indicatorToggle[n]}a.push(s)}let o="column";(this._config.columns||this._config.stack)&&(o="row");const s=[];for(const e of a)s.push(j`
        <bar-card-row style="flex-direction: ${o};">${e}</bar-card-row>
      `);return s}_computeBarColor(e,t){const i=this._configArray[t];let r;return r=i.severity?this._computeSeverityColor(e,t):"unavailable"==e?`var(--bar-card-disabled-color, ${i.color})`:i.color}_computeSeverityColor(e,t){const i=this._configArray[t],r=Number(e),n=i.severity;let a;return isNaN(r)?n.forEach(t=>{e==t.text&&(a=t.color)}):n.forEach(e=>{r>=e.from&&r<=e.to&&(a=e.color)}),null==a&&(a=i.color),a}_computeSeverityVisibility(e,t){const i=this._configArray[t],r=Number(e),n=i.severity;let a=!1;return isNaN(r)?n.forEach(t=>{e==t.text&&(a=t.hide)}):n.forEach(e=>{r>=e.from&&r<=e.to&&(a=e.hide)}),a}_computeSeverityIcon(e,t){const i=this._configArray[t],r=Number(e),n=i.severity;let a=!1;return!!n&&(isNaN(r)?n.forEach(t=>{e==t.text&&(a=t.icon)}):n.forEach(e=>{r>=e.from&&r<=e.to&&(a=e.icon)}),a)}_computePercent(e,t,i,r){const n=this._configArray[t],a=Number(e);if("unavailable"==e)return 0;if(isNaN(a))return 100;if(isNaN(i)||isNaN(r))return 0;if(r===i)return a>=r?100:0;if(r<i)return 0;let o;switch(n.direction){case"right-reverse":case"left-reverse":case"up-reverse":case"down-reverse":o=100-100*(a-i)/(r-i);break;default:o=100*(a-i)/(r-i)}return Math.max(0,Math.min(100,o))}_handleAction(e){this.hass&&e.target.config&&e.detail.action&&function(e,t,i,r){var n;"double_tap"===r&&i.double_tap_action?n=i.double_tap_action:"hold"===r&&i.hold_action?n=i.hold_action:"tap"===r&&i.tap_action&&(n=i.tap_action),xe(e,t,i,n)}(this,this.hass,this._normalizeActionConfig(e.target.config),e.detail.action)}_normalizeActionConfig(e){const t=Object.assign({},e);for(const i of["tap_action","hold_action","double_tap_action"]){const r=e[i];r&&"perform-action"===r.action&&(t[i]=Object.assign(Object.assign({},r),{action:"call-service",service:r.perform_action,data:r.data||r.service_data}))}return t}getCardSize(){if(this._config.height){const e=this._config.height.toString();return Math.trunc(Number(e.replace("px",""))/50*this._rowAmount)+1}return this._rowAmount+1}};e([ae()],qe.prototype,"hass",void 0),e([ae()],qe.prototype,"_config",void 0),e([ae()],qe.prototype,"_configArray",void 0),qe=e([ie("bar-card")],qe);export{qe as BarCard};
