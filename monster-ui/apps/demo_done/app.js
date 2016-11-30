define(["require","jquery","underscore","monster","toastr"],function(t){var e=t("jquery"),n=(t("underscore"),t("monster")),i=(t("toastr"),{name:"demo",css:["app"],i18n:{"en-US":{customCss:!1}},load:function(t){var e=this;e.initApp(function(){t&&t(e)})},initApp:function(t){var e=this;n.pub("auth.initApp",{app:e,callback:t})},render:function(t){var i=this,t=t||e("#monster-content");i.listDevices(function(a){var c=e(n.template(i,"layout",{devices:a}));i.bindUIEvents(c),i.bindSocketsEvents(c,a),t.empty().append(c)})},bindUIEvents:function(t){t.find("#clearEvents").on("click",function(){t.find(".table tbody tr:not(.no-events)").remove()}),t.find(".device-item").on("click",function(){var n=!e(this).hasClass("active");if(t.find(".device-item").removeClass("active"),t.find("table tbody tr").removeClass("inactive"),n){var i=e(this).data("id");""!==i&&(e(this).addClass("active"),t.find('table tbody tr:not([data-deviceid="'+i+'"])').addClass("inactive"))}})},bindSocketsEvents:function(t,e){var i=this,a=function(e){var a=i.formatEvent(e),c=n.template(i,"event",a);a.extra.hasOwnProperty("deviceId")&&n.ui.highlight(t.find('.device-item[data-id="'+a.extra.deviceId+'"]')),t.find(".list-events tbody").prepend(c)};n.socket.emit("subscribe",{account_id:i.accountId,auth_token:i.authToken,binding:"call.CHANNEL_CREATE.*"}),n.socket.emit("subscribe",{account_id:i.accountId,auth_token:i.authToken,binding:"call.CHANNEL_ANSWER.*"}),n.socket.emit("subscribe",{account_id:i.accountId,auth_token:i.authToken,binding:"call.CHANNEL_DESTROY.*"}),n.socket.on("CHANNEL_CREATE",function(t){a(t)}),n.socket.on("CHANNEL_ANSWER",function(t){a(t)}),n.socket.on("CHANNEL_DESTROY",function(t){a(t)})},formatEvent:function(t){var e=this,n=t;return n.extra={},n.extra.to=t.To.substr(0,t.To.indexOf("@")),n.extra.friendlyEvent=e.i18n.active().demo.events[t["Event-Name"]],n.extra.classEvent="CHANNEL_CREATE"===t["Event-Name"]?"info":"CHANNEL_ANSWER"===t["Event-Name"]?"success":"error","Custom-Channel-Vars"in t&&"Authorizing-Type"in t["Custom-Channel-Vars"]&&"device"===t["Custom-Channel-Vars"]["Authorizing-Type"]&&(n.extra.deviceId=t["Custom-Channel-Vars"]["Authorizing-ID"]),n},listDevices:function(t){var e=this;e.callApi({resource:"device.list",data:{accountId:e.accountId},success:function(e){t(e.data)}})}});return i});