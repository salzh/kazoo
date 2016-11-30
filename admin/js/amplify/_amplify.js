(function(e,t,n){function r(t,r){e.store.addType(t,function(e,t){var i=t;if(!e){i={};for(e in r)i[e.replace(/^__amplify__/,"")]=JSON.parse(r[e]);return i}return e in r&&typeof r[e]!="string"&&(e="__amplify__"+e),t===n?r[e]&&JSON.parse(r[e]):(t===null?delete r[e]:r[e]=JSON.stringify(t),i)})}e.store=function(t,n,r){var i=e.store.type;return r&&r.type&&r.type in e.store.types&&(i=r.type),e.store.types[i](t,n)},t.extend(e.store,{types:{},type:null,addType:function(n,r){this.type||(this.type=n),this.types[n]=r,e.store[n]=function(r,i,s){return e.store(r,i,t.extend({type:n},s))}}}),t.each(["localStorage","sessionStorage"],function(e,t){try{t in window&&window[t]!==null&&r(t,window[t])}catch(n){}}),function(){var r=t("<div>").hide().appendTo("html"),i="amplify",s;r[0].addBehavior&&(r[0].addBehavior("#default#userdata"),r[0].load(i),s=r.attr(i)?JSON.parse(r.attr(i)):{},e.store.addType("userData",function(e,t){var o=t;if(!e){o={};for(e in s)o[e]=JSON.parse(r.attr(e));return o}return t===n?e in s?JSON.parse(r.attr(e)):n:(t===null?(r.remoteAttr(e),delete s[e]):(r.attr(e,JSON.stringify(t)),s[e]=!0),r.attr(i,JSON.stringify(s)),r[0].save("amplify"),o)}))}(),r("memory",{}),t.cookie&&t.support.cookie&&e.store.addType("cookie",function(e,n){return t.cookie(e,n,{expires:31e9,path:"/"})})})(this.amplify=this.amplify||{},jQuery),function(e,t,n){function f(e){return e.replace(/\/\//g,"/").replace(/^\/\s*/,"").replace(/\s*\/$/,"")}function l(t){var n=e.route.path(),r=t._regex.exec(n);for(var i=0;i<t.params.length;i++){var s=r[i+1];t.values[t.params[i]]=f(s)}}function y(t){h=e.route.path();var n=e.route.active();for(var r=0;r<o.length;r++){var i=o[r],s=!1;if(i.routeName!==n.name){if(!(i.routeName.indexOf("*")>=0))continue;var a=new RegExp(f(i.routeName).replace("*","(.*?)"));if(!a.test(h))continue;s=!0}var l=i.params?!1:!0;for(label in i.params){var c=i.params[label];if(!u||n.values[label]!==u.values[label]){l=!0;break}}(l||s)&&i.callback(n)}u=e.route.active()}function b(){if(c)return;if(v||d){var t=v?"popstate":"hashchange";window.addEventListener?window.addEventListener(t,y,!1):window.attachEvent("on"+t,y),c=1}else c=setInterval(function(){var t=e.route.path();h!==t&&(h=t,y())},50);p&&p<=7&&!d&&w()}function w(){g=e.route.iframe=document.createElement("iframe"),g.style.display="none",g.src="javascript:0",g.go=function(e){var t=g.contentDocument;t.open(),t.close(),t.location.hash=e},document.body.parentNode.insertBefore(g,document.body.nextSibling)}var r=/\{(.+?)\}/g,i=/[.*+?|()\\[\\]\\\\]/g,s={},o=[],u=null,a="",c=null,h="",p=document.documentMode,d="onhashchange"in window&&(p===n||p>7),v=history.pushState?!0:!1,m={},g;e.route=function(e,t,n){var e=arguments[0],t=arguments[arguments.length>1?1:0],n=arguments[e==t?1:2]||{},o=f(t).split("/"),u,a=[];if(s[e])return s[e];n.constraints=n.constraints||{},n.defaults=n.defaults||{};for(var l=0;l<o.length;l++){var c=o[l].replace(i,"\\$&");while(match=r.exec(c))c=c.replace(match[0],"(.+)?"),a.push(match[1]);o[l]=c}var h={name:e,path:t,params:a,_regex:new RegExp(o.join("/")+(v?"$":"")),values:{},_constraints:n.constraints,_defaults:n.defaults};return s[e]=h,b(),h},e.route.pushSupported=v,e.route.active=function(){var t=f(e.route.path());for(label in s){var n=s[label];n._regex.lastIndex=0;if(n._regex.test(t)){m=n,l(n);break}}return m},e.route.go=function(){var t=arguments[0],r=arguments[1];if(arguments.length>=2&&typeof arguments[1]=="object"){var i=arguments[0],s=arguments[1];r=arguments.length>2?arguments[2]:n,t=e.route.path(i,s)}if(typeof t=="number"){window.history.go(t),g&&g.go(e.route.path());return}r&&(document.title=r);if(v){if(!t||!t.length)return;history.pushState(null,r,t),y();return}window.location.hash=t&&t.length?a+t:"",g&&g.go(e.route.path())},e.route.path=function(){if(!arguments.length)return v?window.location.href:window.location.hash.substring(a?2:1);var e=arguments[0],t=arguments[1];route=s[e];var n=route.path;while(match=r.exec(route.path)){var i=match[0],o=match[1];n=n.replace(i,t[o])}return n},e.route.supportGoogle=function(e){a=e?"!":""},e.route.watch=function(){if(arguments.length<2||!t.isFunction(arguments[1]))return;var e=arguments.length>2?arguments[2]:null,n={routeName:arguments[0],callback:arguments[1],params:e&&e.params?e.params:null};n.params&&typeof n.params=="string"&&(n.params=[n.params]),o.push(n)}}(this.amplify=this.amplify||{},jQuery),function(e,t,n){var r={};e.module=function(n,i,s,o,u){var a=i.toLowerCase(),f=n.toLowerCase();return arguments.length>2&&(r[f]||(r[f]={}),r[f][a]||(r[f][a]={module:i,config:s,construct:o,methods:u})),{init:function(n,i){if(r[f][a]){var s=r[f][a];t.isFunction(n)&&!i&&(i=n,n={});var o={__module:s.module,__whapp:f,config:{}};return t.extend(o.config,s.config),t.extend(o,s.methods),e.module.constructor&&e.module.constructor.call(o,n,function(){s.construct.call(o,n),t.isFunction(i)&&i()}),o}var u=arguments.callee,l=this,c=arguments;return e.module.loadModule(f,a,function(){!r[f][a]||u.apply(l,c)}),null}}},e.module.loadApp=function(t,n){e.cache===!1?$LAB.script("whapps/"+t+"/"+t+".js?_="+new Date).wait(function(){n.call(e.module(t,t))}):$LAB.script("whapps/"+t+"/"+t+".js").wait(function(){n.call(e.module(t,t))})},e.module.loadModule=function(t,n,r){e.cache===!1?$LAB.script("whapps/"+t+"/"+n+"/"+n+".js?_="+new Date).wait(function(){r.call(e.module(t,n))}):$LAB.script("whapps/"+t+"/"+n+"/"+n+".js").wait(function(){r.call(e.module(t,n))})},e.module.constructor=function(e,t){t()},e.module.using=e.module.loadApp}(this.amplify=this.amplify||{},jQuery);