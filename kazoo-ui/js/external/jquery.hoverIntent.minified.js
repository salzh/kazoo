(function(e){e.fn.hoverIntent=function(t,n){var r={sensitivity:7,interval:100,timeout:0};r=e.extend(r,n?{over:t,out:n}:t);var i,s,o,u,a=function(e){i=e.pageX,s=e.pageY},f=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(o-i)+Math.abs(u-s)<r.sensitivity)return e(n).unbind("mousemove",a),n.hoverIntent_s=1,r.over.apply(n,[t]);o=i,u=s,n.hoverIntent_t=setTimeout(function(){f(t,n)},r.interval)},l=function(e,t){return t.hoverIntent_t=clearTimeout(t.hoverIntent_t),t.hoverIntent_s=0,r.out.apply(t,[e])},c=function(t){var n=(t.type=="mouseover"?t.fromElement:t.toElement)||t.relatedTarget;while(n&&n!=this)try{n=n.parentNode}catch(t){n=this}if(n==this)return!1;var i=jQuery.extend({},t),s=this;s.hoverIntent_t&&(s.hoverIntent_t=clearTimeout(s.hoverIntent_t)),t.type=="mouseover"?(o=i.pageX,u=i.pageY,e(s).bind("mousemove",a),s.hoverIntent_s!=1&&(s.hoverIntent_t=setTimeout(function(){f(i,s)},r.interval))):(e(s).unbind("mousemove",a),s.hoverIntent_s==1&&(s.hoverIntent_t=setTimeout(function(){l(i,s)},r.timeout)))};return this.mouseover(c).mouseout(c)}})(jQuery);