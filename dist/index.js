!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).index=t()}(this,function(){"use strict";var e=function(){if(!window.Alpine)throw new Error("[Magic Helpers] Alpine is required for the magic helpers to function correctly.")},t=function(e,t,n){return void 0===n&&(n={}),"function"==typeof e?e.call(t):new Function(["$data"].concat(Object.keys(n)),"var __alpine_result; with($data) { __alpine_result = "+e+" }; return __alpine_result").apply(void 0,[t].concat(Object.values(n)))},n={start:function(){e(),Alpine.addMagicProperty("parent",function(e){if(void 0!==e.$parent)return e.$parent;var n,o=e.parentNode.closest("[x-data]");if(!o)throw new Error("Parent component not found");return n=o.__x?o.__x.getUnobservedData():t(o.getAttribute("x-data"),o),e.$parent=r(n,o),new MutationObserver(function(t){for(var n=0;n<t.length;n++){var a=t[n].target.closest("[x-data]");if(!a||a.isSameNode(o)){if(!a.__x)throw"Error locating $parent data";e.$parent=r(a.__x.getUnobservedData(),o),e.__x.updateElements(e)}}}).observe(o,{attributes:!0,childList:!0,characterData:!0,subtree:!0}),n}),Alpine.addMagicProperty("component",function(){return function(e){var n=this;if(void 0!==this[e])return this[e];var o,a=document.querySelector('[x-data][x-id="'+e+'"], [x-data]#'+e);if(!a)throw"Component not found";return o=a.__x?a.__x.getUnobservedData():t(a.getAttribute("x-data"),a),this[e]=r(o,a),new MutationObserver(function(t){for(var o=0;o<t.length;o++){var i=t[o].target.closest("[x-data]");if(!i||!i.isSameNode(n.$el)){if(!i.__x)throw"Error locating $component data";n[e]=r(i.__x.getUnobservedData(),a)}}}).observe(a,{attributes:!0,childList:!0,characterData:!0,subtree:!0}),this[e]}})}},r=function(e,t){return new Proxy(e,{set:function(e,n,r){if(!t.__x)throw new Error("Failed to communicate with observed component");return t.__x.$data[n]=r,!0}})},o=window.deferLoadingAlpine||function(e){return e()};window.deferLoadingAlpine=function(e){o(e),n.start()};var a=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}},i=Object.prototype.toString;function s(e){return"[object Array]"===i.call(e)}function u(e){return void 0===e}function c(e){return null!==e&&"object"==typeof e}function f(e){if("[object Object]"!==i.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function d(e){return"[object Function]"===i.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),s(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var p={isArray:s,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:function(e){return null!==e&&!u(e)&&null!==e.constructor&&!u(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:c,isPlainObject:f,isUndefined:u,isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:d,isStream:function(e){return c(e)&&d(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function e(){var t={};function n(n,r){t[r]=f(t[r])&&f(n)?e(t[r],n):f(n)?e({},n):s(n)?n.slice():n}for(var r=0,o=arguments.length;r<o;r++)l(arguments[r],n);return t},extend:function(e,t,n){return l(t,function(t,r){e[r]=n&&"function"==typeof t?a(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}};function h(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var m=function(e,t,n){if(!t)return e;var r;if(n)r=n(t);else if(p.isURLSearchParams(t))r=t.toString();else{var o=[];p.forEach(t,function(e,t){null!=e&&(p.isArray(e)?t+="[]":e=[e],p.forEach(e,function(e){p.isDate(e)?e=e.toISOString():p.isObject(e)&&(e=JSON.stringify(e)),o.push(h(t)+"="+h(e))}))}),r=o.join("&")}if(r){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+r}return e};function g(){this.handlers=[]}g.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},g.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},g.prototype.forEach=function(e){p.forEach(this.handlers,function(t){null!==t&&e(t)})};var v=g,y=function(e,t,n){return p.forEach(n,function(n){e=n(e,t)}),e},w=function(e){return!(!e||!e.__CANCEL__)},b=function(e,t){p.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})},A=function(e,t,n,r,o){return function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}(new Error(e),t,n,r,o)},x=p.isStandardBrowserEnv()?{write:function(e,t,n,r,o,a){var i=[];i.push(e+"="+encodeURIComponent(t)),p.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),p.isString(r)&&i.push("path="+r),p.isString(o)&&i.push("domain="+o),!0===a&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}},E=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],L=p.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function r(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=r(window.location.href),function(t){var n=p.isString(t)?r(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0},O={"Content-Type":"application/x-www-form-urlencoded"};function j(e,t){!p.isUndefined(e)&&p.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var C,S={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(C=function(e){return new Promise(function(t,n){var r=e.data,o=e.headers;p.isFormData(r)&&delete o["Content-Type"],(p.isBlob(r)||p.isFile(r))&&r.type&&delete o["Content-Type"];var a=new XMLHttpRequest;if(e.auth){var i=e.auth.username||"",s=unescape(encodeURIComponent(e.auth.password))||"";o.Authorization="Basic "+btoa(i+":"+s)}var u,c,f=(c=e.url,(u=e.baseURL)&&!/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(c)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(u,c):c);if(a.open(e.method.toUpperCase(),m(f,e.params,e.paramsSerializer),!0),a.timeout=e.timeout,a.onreadystatechange=function(){if(a&&4===a.readyState&&(0!==a.status||a.responseURL&&0===a.responseURL.indexOf("file:"))){var r,o,i,s,u,c="getAllResponseHeaders"in a?(r=a.getAllResponseHeaders(),u={},r?(p.forEach(r.split("\n"),function(e){if(s=e.indexOf(":"),o=p.trim(e.substr(0,s)).toLowerCase(),i=p.trim(e.substr(s+1)),o){if(u[o]&&E.indexOf(o)>=0)return;u[o]="set-cookie"===o?(u[o]?u[o]:[]).concat([i]):u[o]?u[o]+", "+i:i}}),u):u):null;!function(e,t,n){var r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(A("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}(t,n,{data:e.responseType&&"text"!==e.responseType?a.response:a.responseText,status:a.status,statusText:a.statusText,headers:c,config:e,request:a}),a=null}},a.onabort=function(){a&&(n(A("Request aborted",e,"ECONNABORTED",a)),a=null)},a.onerror=function(){n(A("Network Error",e,null,a)),a=null},a.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(A(t,e,"ECONNABORTED",a)),a=null},p.isStandardBrowserEnv()){var d=(e.withCredentials||L(f))&&e.xsrfCookieName?x.read(e.xsrfCookieName):void 0;d&&(o[e.xsrfHeaderName]=d)}if("setRequestHeader"in a&&p.forEach(o,function(e,t){void 0===r&&"content-type"===t.toLowerCase()?delete o[t]:a.setRequestHeader(t,e)}),p.isUndefined(e.withCredentials)||(a.withCredentials=!!e.withCredentials),e.responseType)try{a.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&a.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&a.upload&&a.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){a&&(a.abort(),n(e),a=null)}),r||(r=null),a.send(r)})}),C),transformRequest:[function(e,t){return b(t,"Accept"),b(t,"Content-Type"),p.isFormData(e)||p.isArrayBuffer(e)||p.isBuffer(e)||p.isStream(e)||p.isFile(e)||p.isBlob(e)?e:p.isArrayBufferView(e)?e.buffer:p.isURLSearchParams(e)?(j(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):p.isObject(e)?(j(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};p.forEach(["delete","get","head"],function(e){S.headers[e]={}}),p.forEach(["post","put","patch"],function(e){S.headers[e]=p.merge(O)});var _=S;function P(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var R=function(e){return P(e),e.headers=e.headers||{},e.data=y(e.data,e.headers,e.transformRequest),e.headers=p.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),p.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||_.adapter)(e).then(function(t){return P(e),t.data=y(t.data,t.headers,e.transformResponse),t},function(t){return w(t)||(P(e),t&&t.response&&(t.response.data=y(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})},T=function(e,t){t=t||{};var n={},r=["url","method","data"],o=["headers","auth","proxy","params"],a=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],i=["validateStatus"];function s(e,t){return p.isPlainObject(e)&&p.isPlainObject(t)?p.merge(e,t):p.isPlainObject(t)?p.merge({},t):p.isArray(t)?t.slice():t}function u(r){p.isUndefined(t[r])?p.isUndefined(e[r])||(n[r]=s(void 0,e[r])):n[r]=s(e[r],t[r])}p.forEach(r,function(e){p.isUndefined(t[e])||(n[e]=s(void 0,t[e]))}),p.forEach(o,u),p.forEach(a,function(r){p.isUndefined(t[r])?p.isUndefined(e[r])||(n[r]=s(void 0,e[r])):n[r]=s(void 0,t[r])}),p.forEach(i,function(r){r in t?n[r]=s(e[r],t[r]):r in e&&(n[r]=s(void 0,e[r]))});var c=r.concat(o).concat(a).concat(i),f=Object.keys(e).concat(Object.keys(t)).filter(function(e){return-1===c.indexOf(e)});return p.forEach(f,u),n};function N(e){this.defaults=e,this.interceptors={request:new v,response:new v}}N.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=T(this.defaults,e)).method=e.method?e.method.toLowerCase():this.defaults.method?this.defaults.method.toLowerCase():"get";var t=[R,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},N.prototype.getUri=function(e){return e=T(this.defaults,e),m(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},p.forEach(["delete","get","head","options"],function(e){N.prototype[e]=function(t,n){return this.request(T(n||{},{method:e,url:t}))}}),p.forEach(["post","put","patch"],function(e){N.prototype[e]=function(t,n,r){return this.request(T(r||{},{method:e,url:t,data:n}))}});var U=N;function B(e){this.message=e}B.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},B.prototype.__CANCEL__=!0;var q=B;function I(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new q(e),t(n.reason))})}I.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},I.source=function(){var e;return{token:new I(function(t){e=t}),cancel:e}};var M=I;function D(e){var t=new U(e),n=a(U.prototype.request,t);return p.extend(n,U.prototype,t),p.extend(n,t),n}var k=D(_);k.Axios=U,k.create=function(e){return D(T(k.defaults,e))},k.Cancel=q,k.CancelToken=M,k.isCancel=w,k.all=function(e){return Promise.all(e)},k.spread=function(e){return function(t){return e.apply(null,t)}};var F=k;F.default=k;var $=F,H={start:function(){e(),Alpine.addMagicProperty("fetch",function(){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return"string"==typeof t[0]&&t[0].length?$(t[0]).then(function(e){return e.hasOwnProperty("data")?e.data:e}):"object"==typeof t[0]?$(t[0]):t[0]}})}},z=window.deferLoadingAlpine||function(e){return e()};window.deferLoadingAlpine=function(e){H.start(),z(e)};var X={start:function(){e(),Alpine.addMagicProperty("interval",function(){return function(){for(var e=this,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if("function"!=typeof n[0])return n[0];var o=n[1],a=0,i=!1;"object"==typeof n[1]&&(n[1].hasOwnProperty("timer")&&(o=n[1].timer),n[1].hasOwnProperty("delay")&&(a=n[1].delay),n[1].hasOwnProperty("forceInterval")&&(i=n[1].forceInterval));var s=function(){var t=!e.hasOwnProperty("autoIntervalTest")||e.autoIntervalTest;setTimeout(function(){e.autoIntervalLoop&&(t&&n[0].call(e),i?e.autoIntervalLoop():requestAnimationFrame(e.autoIntervalLoop))},o)};this.autoIntervalLoop=s,setTimeout(function(){e.autoIntervalLoop&&(i?e.autoIntervalLoop():requestAnimationFrame(e.autoIntervalLoop))},a),this.$watch("autoIntervalTest",function(t){t?(e.autoIntervalLoop=s,i?e.autoIntervalLoop():requestAnimationFrame(e.autoIntervalLoop)):(clearTimeout(e.autoIntervalLoop),e.autoIntervalLoop=null)})}})}},J=window.deferLoadingAlpine||function(e){return e()};window.deferLoadingAlpine=function(e){X.start(),J(e)};var V={start:function(){e(),Alpine.addMagicProperty("truncate",function(){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];if("string"!=typeof t[0])return t[0];var r="…";return t[1]?"object"!=typeof t[1]?(void 0!==t[2]&&(r=t[2]),t[0].slice(0,t[1])+r):(t[1].hasOwnProperty("ellipsis")&&(r=t[1].ellipsis),t[1].hasOwnProperty("words")&&t[1].words?t[0].split(" ").splice(0,t[1].words).join(" ")+r:t[1].hasOwnProperty("characters")&&t[1].characters?t[0].slice(0,t[1].characters)+r:t[0]):t[0]}})}},K=window.deferLoadingAlpine||function(e){return e()};window.deferLoadingAlpine=function(e){V.start(),K(e)};var G=window.deferLoadingAlpine||function(e){return e()};return window.deferLoadingAlpine=function(e){n.start(),H.start(),X.start(),V.start(),G(e)},{AlpineComponentMagicMethod:n,AlpineFetchMagicMethod:H,AlpineIntervalMagicMethod:X,AlpineTruncateMagicMethod:V}});
//# sourceMappingURL=index.js.map
