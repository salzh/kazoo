(function(e){function r(e,n){if(n!==undefined)return this.attr(t+e,n);switch(typeof e){case"string":return this.attr(t+e);case"object":return s.call(this,e);case"undefined":return i.call(this);default:throw"dataset: invalid argument "+e}}function i(){return this.foldAttr(function(e,t,r){var i=n.exec(this.name);i&&(r[i[1]]=this.value)})}function s(e){for(var n in e)this.attr(t+n,e[n]);return this}function o(e){return typeof e=="string"?this.removeAttr(t+e):u(e)}function u(e){var n,r=e&&e.length;if(r===undefined)for(n in e)this.removeAttr(t+n);else for(n=0;n<r;n++)this.removeAttr(t+e[n]);return this}var t="data-",n=/^data\-(.*)$/;e.fn.dataset=r,e.fn.removeDataset=u})(jQuery),function(e){function t(t){return this.length>0&&e.each(this[0].attributes,t),this}function n(e,t){return r(this.length>0&&this[0].attributes,e,t)}function r(e,t,n){var r=e&&e.length;n===undefined&&(n={});if(!e)return n;if(r!==undefined)for(var i=0,s=e[i];i<r&&t.call(s,i,s,n)!==!1;s=e[++i]);else for(var o in e)if(t.call(e[o],o,e[o],n)===!1)break;return n}function i(e,t){return t===undefined&&(t=[]),r(this,e,t)}e.fn.eachAttr=t,e.fn.foldAttr=n,e.fn.fold=i,e.fold=r}(jQuery);