define(["require","jquery","underscore","monster"],function(n){var t=n("jquery"),u=(n("underscore"),n("monster")),e={requests:{},subscribe:{"myaccount.trunks.renderContent":"_trunksRenderContent","myaccount.refreshBadges":"_trunksRefreshBadges"},_trunksRenderContent:function(n){var t=this;"inbound"===n.key?t.trunksRenderInbound(n.callback):"outbound"===n.key?t.trunksRenderOutbound(n.callback):"twoway"===n.key&&t.trunksRenderTwoway(n.callback)},_trunksRefreshBadges:function(n){var t=this;t.trunksGetLimits(function(t){var e={module:"trunks",key:"inbound",data:t.data.inbound_trunks||0,callback:n.callback},a={module:"trunks",key:"outbound",data:t.data.outbound_trunks||0,callback:n.callback},d={module:"trunks",key:"twoway",data:t.data.twoway_trunks||0,callback:n.callback};u.pub("myaccount.updateMenu",e),u.pub("myaccount.updateMenu",a),u.pub("myaccount.updateMenu",d)})},trunksRenderInbound:function(n){var e=this;e.trunksGetLimits(function(a){var d=6.99,i=a.data.inbound_trunks||0,o=d*i,s={inbound:i,amountInbound:d.toFixed(2),totalAmountInbound:o.toFixed(2)},r=t(u.template(e,"trunks-inbound",s));u.ui.tooltips(r),r.find("#slider_inbound").slider({min:0,max:100,range:"min",value:a.data.inbound_trunks>0?a.data.inbound_trunks:0,slide:function(n,t){r.find(".slider-value").html(t.value),o=t.value*d,r.find(".total-amount .total-amount-value").html(o.toFixed(2)),r.find(".slider-value").css("left",r.find("#slider_inbound .ui-slider-handle").css("left"))},change:function(n,t){r.find(".slider-value").css("left",r.find("#slider_inbound .ui-slider-handle").css("left"))}}),r.find(".update-limits").on("click",function(n){n.preventDefault(),e.trunksGetLimits(function(n){var d={inbound_trunks:r.find("#slider_inbound").slider("value"),twoway_trunks:"data"in a?a.data.twoway_trunks||0:0};d=t.extend(!0,n.data,d),e.trunksUpdateLimits(d,function(n){var t={module:e.name,key:"inbound",data:d.inbound_trunks};u.pub("myaccount.updateMenu",t),e.trunksRenderInbound()})})}),u.pub("myaccount.renderSubmodule",r),r.find(".slider-value").css("left",r.find("#slider_inbound .ui-slider-handle").css("left")),n&&n()})},trunksRenderOutbound:function(n){var e=this;e.trunksGetLimits(function(a){var d=29.99,i=a.data.outbound_trunks||0,o=d*i,s={outbound:i,amountOutbound:d.toFixed(2),totalAmountOutbound:o.toFixed(2)},r=t(u.template(e,"trunks-outbound",s));u.ui.tooltips(r),r.find("#slider_outbound").slider({min:0,max:100,range:"min",value:a.data.outbound_trunks>0?a.data.outbound_trunks:0,slide:function(n,t){r.find(".slider-value").html(t.value),o=t.value*d,r.find(".total-amount .total-amount-value").html(o.toFixed(2)),r.find(".slider-value").css("left",r.find("#slider_outbound .ui-slider-handle").css("left"))},change:function(n,t){r.find(".slider-value").css("left",r.find("#slider_outbound .ui-slider-handle").css("left"))}}),r.find(".update-limits").on("click",function(n){n.preventDefault(),e.trunksGetLimits(function(n){var d={outbound_trunks:r.find("#slider_outbound").slider("value"),inbound_trunks:"data"in a?a.data.inbound_trunks||0:0,twoway_trunks:"data"in a?a.data.twoway_trunks||0:0};d=t.extend(!0,n.data,d),e.trunksUpdateLimits(d,function(n){var t={module:e.name,data:d.outbound_trunks,key:"outbound"};u.pub("myaccount.updateMenu",t),e.trunksRenderOutbound()})})}),u.pub("myaccount.renderSubmodule",r),r.find(".slider-value").css("left",r.find("#slider_outbound .ui-slider-handle").css("left")),n&&n()})},trunksRenderTwoway:function(n){var e=this;e.trunksGetLimits(function(a){var d=29.99,i=a.data.twoway_trunks||0,o=d*i,s={twoway:i,amountTwoway:d.toFixed(2),totalAmountTwoway:o.toFixed(2)},r=t(u.template(e,"trunks-twoway",s));u.ui.tooltips(r),r.find("#slider_twoway").slider({min:0,max:100,range:"min",value:a.data.twoway_trunks>0?a.data.twoway_trunks:0,slide:function(n,t){r.find(".slider-value").html(t.value),o=t.value*d,r.find(".total-amount .total-amount-value").html(o.toFixed(2)),r.find(".slider-value").css("left",r.find("#slider_twoway .ui-slider-handle").css("left"))},change:function(n,t){r.find(".slider-value").css("left",r.find("#slider_twoway .ui-slider-handle").css("left"))}}),r.find(".update-limits").on("click",function(n){n.preventDefault(),e.trunksGetLimits(function(n){var d={twoway_trunks:r.find("#slider_twoway").slider("value"),inbound_trunks:"data"in a?a.data.inbound_trunks||0:0};d=t.extend(!0,n.data,d),e.trunksUpdateLimits(d,function(n){var t={module:e.name,data:d.twoway_trunks,key:"twoway"};u.pub("myaccount.updateMenu",t),e.trunksRenderTwoway()})})}),u.pub("myaccount.renderSubmodule",r),r.find(".slider-value").css("left",r.find("#slider_twoway .ui-slider-handle").css("left")),n&&n()})},trunksGetLimits:function(n,t){var u=this;u.callApi({resource:"limits.get",data:{accountId:u.accountId},success:function(t,u){n&&n(t,u)},error:function(n,u){t&&t(n,u)}})},trunksUpdateLimits:function(n,t,u){var e=this;e.callApi({resource:"limits.update",data:{accountId:e.accountId,data:n},success:function(n,u){t&&t(n,u)},error:function(n,t){u&&u(n,t)}})}};return e});