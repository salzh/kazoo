!function(n){n.fn.animatescroll=function(e){var t=n.extend({},n.fn.animatescroll.defaults,e);if(n.easing.jswing=n.easing.swing,n.extend(n.easing,{def:"easeOutQuad",swing:function(e,t,a,u,r){return n.easing[n.easing.def](e,t,a,u,r)},easeInQuad:function(n,e,t,a,u){return a*(e/=u)*e+t},easeOutQuad:function(n,e,t,a,u){return-a*(e/=u)*(e-2)+t},easeInOutQuad:function(n,e,t,a,u){return(e/=u/2)<1?a/2*e*e+t:-a/2*(--e*(e-2)-1)+t},easeInCubic:function(n,e,t,a,u){return a*(e/=u)*e*e+t},easeOutCubic:function(n,e,t,a,u){return a*((e=e/u-1)*e*e+1)+t},easeInOutCubic:function(n,e,t,a,u){return(e/=u/2)<1?a/2*e*e*e+t:a/2*((e-=2)*e*e+2)+t},easeInQuart:function(n,e,t,a,u){return a*(e/=u)*e*e*e+t},easeOutQuart:function(n,e,t,a,u){return-a*((e=e/u-1)*e*e*e-1)+t},easeInOutQuart:function(n,e,t,a,u){return(e/=u/2)<1?a/2*e*e*e*e+t:-a/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(n,e,t,a,u){return a*(e/=u)*e*e*e*e+t},easeOutQuint:function(n,e,t,a,u){return a*((e=e/u-1)*e*e*e*e+1)+t},easeInOutQuint:function(n,e,t,a,u){return(e/=u/2)<1?a/2*e*e*e*e*e+t:a/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(n,e,t,a,u){return-a*Math.cos(e/u*(Math.PI/2))+a+t},easeOutSine:function(n,e,t,a,u){return a*Math.sin(e/u*(Math.PI/2))+t},easeInOutSine:function(n,e,t,a,u){return-a/2*(Math.cos(Math.PI*e/u)-1)+t},easeInExpo:function(n,e,t,a,u){return 0==e?t:a*Math.pow(2,10*(e/u-1))+t},easeOutExpo:function(n,e,t,a,u){return e==u?t+a:a*(-Math.pow(2,-10*e/u)+1)+t},easeInOutExpo:function(n,e,t,a,u){return 0==e?t:e==u?t+a:(e/=u/2)<1?a/2*Math.pow(2,10*(e-1))+t:a/2*(-Math.pow(2,-10*--e)+2)+t},easeInCirc:function(n,e,t,a,u){return-a*(Math.sqrt(1-(e/=u)*e)-1)+t},easeOutCirc:function(n,e,t,a,u){return a*Math.sqrt(1-(e=e/u-1)*e)+t},easeInOutCirc:function(n,e,t,a,u){return(e/=u/2)<1?-a/2*(Math.sqrt(1-e*e)-1)+t:a/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(n,e,t,a,u){var r=1.70158,i=0,s=a;if(0==e)return t;if(1==(e/=u))return t+a;if(i||(i=.3*u),s<Math.abs(a)){s=a;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(a/s);return-(s*Math.pow(2,10*(e-=1))*Math.sin((e*u-r)*(2*Math.PI)/i))+t},easeOutElastic:function(n,e,t,a,u){var r=1.70158,i=0,s=a;if(0==e)return t;if(1==(e/=u))return t+a;if(i||(i=.3*u),s<Math.abs(a)){s=a;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(a/s);return s*Math.pow(2,-10*e)*Math.sin((e*u-r)*(2*Math.PI)/i)+a+t},easeInOutElastic:function(n,e,t,a,u){var r=1.70158,i=0,s=a;if(0==e)return t;if(2==(e/=u/2))return t+a;if(i||(i=u*(.3*1.5)),s<Math.abs(a)){s=a;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(a/s);return 1>e?-.5*(s*Math.pow(2,10*(e-=1))*Math.sin((e*u-r)*(2*Math.PI)/i))+t:s*Math.pow(2,-10*(e-=1))*Math.sin((e*u-r)*(2*Math.PI)/i)*.5+a+t},easeInBack:function(n,e,t,a,u,r){return void 0==r&&(r=1.70158),a*(e/=u)*e*((r+1)*e-r)+t},easeOutBack:function(n,e,t,a,u,r){return void 0==r&&(r=1.70158),a*((e=e/u-1)*e*((r+1)*e+r)+1)+t},easeInOutBack:function(n,e,t,a,u,r){return void 0==r&&(r=1.70158),(e/=u/2)<1?a/2*(e*e*(((r*=1.525)+1)*e-r))+t:a/2*((e-=2)*e*(((r*=1.525)+1)*e+r)+2)+t},easeInBounce:function(e,t,a,u,r){return u-n.easing.easeOutBounce(e,r-t,0,u,r)+a},easeOutBounce:function(n,e,t,a,u){return(e/=u)<1/2.75?a*(7.5625*e*e)+t:2/2.75>e?a*(7.5625*(e-=1.5/2.75)*e+.75)+t:2.5/2.75>e?a*(7.5625*(e-=2.25/2.75)*e+.9375)+t:a*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(e,t,a,u,r){return r/2>t?.5*n.easing.easeInBounce(e,2*t,0,u,r)+a:.5*n.easing.easeOutBounce(e,2*t-r,0,u,r)+.5*u+a}}),"html,body"==t.element){var a=this.offset().top;n(t.element).stop().animate({scrollTop:a-t.padding},t.scrollSpeed,t.easing)}else n(t.element).stop().animate({scrollTop:this.offset().top-this.parent().offset().top+this.parent().scrollTop()-t.padding},t.scrollSpeed,t.easing)},n.fn.animatescroll.defaults={easing:"swing",scrollSpeed:800,padding:0,element:"html,body"}}(jQuery);