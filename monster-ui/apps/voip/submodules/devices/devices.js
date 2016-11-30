define(["require","jquery","underscore","monster","toastr"],function(e){var i=e("jquery"),t=e("underscore"),a=e("monster"),n=e("toastr"),s={requests:{"provisioner.ui.getModel":{apiRoot:a.config.api.provisioner,url:"ui/{brand}/{family}/{model}",verb:"GET",generateError:!1},"provisioner.devices.unlock":{apiRoot:a.config.api.provisioner,url:"locks/{accountId}/{macAddress}",verb:"DELETE"}},subscribe:{"voip.devices.render":"devicesRender","voip.devices.renderAdd":"devicesRenderAdd","voip.devices.editDevice":"devicesRenderEdit"},devicesRender:function(e){var n=this,s=e||{},r=s.parent||i(".right-content"),c=s.deviceId||"",d=s.callback;n.devicesGetData(function(e){var s,o=n.devicesFormatListData(e),u=i(a.template(n,"devices-layout",o));if(t.each(o.devices,function(e){s=a.template(n,"devices-row",e),u.find(".devices-rows").append(s)}),n.devicesBindEvents(u,r,o),r.empty().append(u),c){var l=r.find(".grid-row[data-id="+c+"]");a.ui.highlight(l,{endColor:"#FCFCFC"})}0===o.devices.length?r.find(".no-devices-row").css("display","block"):r.find(".no-devices-row").css("display","none"),d&&d()})},devicesBindEvents:function(e,a,n){var s=this;setTimeout(function(){e.find(".search-query").focus()}),e.find(".devices-header .search-query").on("keyup",function(){var a=i(this).val().toLowerCase(),n=e.find(".devices-rows .grid-row:not(.title)"),s=e.find(".devices-rows .empty-search-row");t.each(n,function(e){var t=i(e);t.data("search").toLowerCase().indexOf(a)<0?t.hide():t.show()}),n.size()>0&&(n.is(":visible")?s.hide():s.show())}),e.find(".switch-state").on("change",function(){var e=i(this),a=e.parents(".grid-row"),r=a.data("id"),c=e.prop("checked");s.devicesGetDevice(r,function(i){i.enabled=c,s.devicesUpdateDevice(i,function(e){a.find(".type").removeClass("unregistered registered disabled");var i="disabled";e.enabled===!0&&(i="unregistered",t.each(n.devices,function(t){return t.id===e.id?(t.registered===!0&&(i="registered"),!1):void 0})),a.find(".type").addClass(i)},function(){e.prop("checked",!c)})},function(){e.prop("checked",!c)})}),e.find(".settings").on("click",function(){var e=i(this),t={id:e.parents(".grid-row").data("id"),isRegistered:e.parents(".grid-row").data("registered")===!0};s.devicesRenderEdit({data:t,callbackSave:function(e){s.devicesRender({deviceId:e.id})}})}),e.find(".create-device").on("click",function(){var e=i(this).data("type");s.devicesRenderAdd({type:e,callback:function(e){s.devicesRender({deviceId:e.id})}})})},devicesRenderEdit:function(e){var t=this,a=e.data,n=e.callbackSave,s=e.callbackDelete||function(e){t.devicesRender()};t.devicesGetEditData(a,function(e){e.hasOwnProperty("provision")?t.devicesGetIterator(e.provision,function(a){if(a.hasOwnProperty("feature_keys")&&a.feature_keys.iterate>0){e.provision.hasOwnProperty("feature_keys")||(e.provision.feature_keys={});for(var r=0,c=a.feature_keys.iterate;c>r;r++)e.provision.feature_keys.hasOwnProperty(r)||(e.provision.feature_keys[r]={type:"none"});t.callApi({resource:"user.list",data:{accountId:t.accountId},success:function(a,r){var c,d=["none","presence","parking","personal_parking","speed_dial"],o=[];a.data.sort(function(e,i){return e.last_name.toLowerCase()>i.last_name.toLowerCase()?1:-1});for(var u=0;10>u;u++)o[u]=u+1;d.forEach(function(e,i,a){a[i]={id:e,text:t.i18n.active().devices.popupSettings.featureKeys.types[e]},"none"!==e&&(a[i].info=t.i18n.active().devices.popupSettings.featureKeys.info.types[e])}),c={users:a.data,featureKeys:{parkingSpots:o,types:d}},e.extra=e.hasOwnProperty(c)?i.extend(!0,{},e.extra,c):c,t.devicesRenderDevice(e,n,s)}})}else t.devicesRenderDevice(e,n,s)},function(){t.devicesRenderDevice(e,n,s)}):t.devicesRenderDevice(e,n,s)})},devicesRenderAdd:function(e){var i=this,t=e.type,n=e.callback,s={device_type:t};"sip_device"===t&&a.config.api.provisioner?a.pub("common.chooseModel.render",{callback:function(e,t){i.callApi({resource:"device.create",data:{accountId:i.accountId,data:e},success:function(e,i){n(e.data),t&&t()}})},callbackMissingBrand:function(){i.devicesRenderEdit({data:s,callbackSave:function(e){n&&n(e)}})}}):i.devicesRenderEdit({data:s,callbackSave:function(e){n&&n(e)}})},devicesRenderDevice:function(e,s,r){var c=this,d=e.id?"edit":"add",o=e.device_type,u="edit"===d?a.template(c,"!"+c.i18n.active().devices[o].editTitle,{name:e.name}):c.i18n.active().devices[o].addTitle,l=i(a.template(c,"devices-"+o,i.extend(!0,{},e,{isProvisionerConfigured:a.config.api.hasOwnProperty("provisioner"),showEmergencyCnam:a.util.isNumberFeatureEnabled("cnam")&&a.util.isNumberFeatureEnabled("e911")}))),v=l.find("#form_device");if(e.hasOwnProperty("provision")&&e.provision.hasOwnProperty("feature_keys")){var p='.tabs-section[data-section="featureKeys"] ';t.each(e.provision.feature_keys,function(e,i){var t='.control-group[data-id="'+i+'"] ',a='.feature-key-value[data-type="'+e.type+'"]';l.find(p.concat(t,a)).addClass("active").find('[name="provision.feature_keys['+i+'].value"]').val(e.value)}),i.each(l.find(".feature-key-index"),function(e,t){i(t).text(parseInt(i(t).text(),10)+1)})}if(e.extra.hasE911Numbers){var f;e.caller_id&&e.caller_id.emergency&&e.caller_id.emergency.number&&(f=e.caller_id.emergency.number,c.devicesGetE911NumberAddress(e.caller_id.emergency.number,function(e){l.find(".number-address").show().find("p").html(e)})),a.pub("common.numberSelector.render",{container:l.find(".emergency-number"),inputName:"caller_id.emergency.number",number:f,customNumbers:e.extra.e911Numbers,noBuy:!0,labels:{empty:c.i18n.active().devices.popupSettings.callerId.notSet,remove:c.i18n.active().devices.popupSettings.callerId.useDefault,spare:c.i18n.active().devices.popupSettings.callerId.selectNumber,hideNumber:!0}})}if(a.ui.validate(v,{rules:{name:{required:!0},mac_address:{required:!0,mac:!0},"mobile.mdn":{number:!0},"sip.username":{required:!0},"sip.password":{required:!0},"call_forward.number":{required:!0}},ignore:""}),i.inArray(o,["sip_device","smartphone","mobile","softphone","fax","ata"])>-1)var m=a.ui.codecSelector("audio",l.find("#audio_codec_selector"),e.media.audio.codecs);if(i.inArray(o,["sip_device","smartphone","mobile","softphone"])>-1)var h=a.ui.codecSelector("video",l.find("#video_codec_selector"),e.media.video.codecs);a.ui.tabs(l),a.ui.protectField(l.find("#sip_password"),l),a.ui.tooltips(l),a.ui.mask(l.find("#mac_address"),"macAddress"),a.ui.mask(l.find('[name="call_forward.number"]'),"phoneNumber"),l.find(".chosen-feature-key-user").chosen({search_contains:!0,width:"inherit"}),e.media.encryption.enforce_security||l.find("#rtp_method").hide(),l.find("#secure_rtp").on("change",function(){l.find("#rtp_method").toggle()}),l.find("#restart_device").on("click",function(){i(this).hasClass("disabled")||c.devicesRestart(e.id,function(){n.success(c.i18n.active().devices.popupSettings.miscellaneous.restart.success)})}),l.find("#unlock_device").on("click",function(){c.devicesUnlock(e.mac_address.replace(/\:/g,""),function(){n.success(c.i18n.active().devices.popupSettings.miscellaneous.unlock.success)})}),l.find(".actions .save").on("click",function(){if(a.ui.valid(v)){l.find(".feature-key-value:not(.active)").remove();var i=c.devicesMergeData(e,l,m,h);c.devicesSaveDevice(i,function(e){_.dialog("close").remove(),s&&s(e)})}else l.find('.tabs-selector[data-section="basic"]').click()}),"mobile"!==o&&l.find("#delete_device").on("click",function(){var e=i(this).parents(".edit-device").data("id");a.ui.confirm(c.i18n.active().devices.confirmDeleteDevice,function(){c.devicesDeleteDevice(e,function(e){_.dialog("close").remove(),n.success(a.template(c,"!"+c.i18n.active().devices.deletedDevice,{deviceName:e.name})),r&&r(e)})})}),l.find(".actions .cancel-link").on("click",function(){_.dialog("close").remove()}),l.on("change",".caller-id-select",function(){var e=this.value,i=l.find(".number-address");i.find("p").empty(),""!==e?(c.devicesGetE911NumberAddress(e,function(e){i.find("p").html(e)}),i.slideDown()):i.slideUp()}),l.find(".restrictions-switch").on("change",function(){l.find(".restriction-matcher-sign").hide(),l.find(".restriction-message").hide()}),l.find(".restriction-matcher-button").on("click",function(e){e.preventDefault();var i=l.find(".restriction-matcher-input").val();i?c.callApi({resource:"numbers.matchClassifier",data:{accountId:c.accountId,phoneNumber:encodeURIComponent(i)},success:function(e,t){var n=l.find('.restriction-line[data-restriction="'+e.data.name+'"]'),s=n.find(".restriction-matcher-sign"),r=l.find(".restriction-message");l.find(".restriction-matcher-sign").hide(),n.find(".restrictions-switch").prop("checked")?(s.removeClass("monster-red fa-times").addClass("monster-green fa-check").css("display","inline-block"),r.removeClass("red-box").addClass("green-box").css("display","inline-block").empty().text(a.template(c,"!"+c.i18n.active().devices.popupSettings.restrictions.matcher.allowMessage,{phoneNumber:a.util.formatPhoneNumber(i)}))):(s.removeClass("monster-green fa-check").addClass("monster-red fa-times").css("display","inline-block"),r.removeClass("green-box").addClass("red-box").css("display","inline-block").empty().text(a.template(c,"!"+c.i18n.active().devices.popupSettings.restrictions.matcher.denyMessage,{phoneNumber:a.util.formatPhoneNumber(i)})))}}):(l.find(".restriction-matcher-sign").hide(),l.find(".restriction-message").hide())}),l.find(".feature-key-type").on("change",function(){var e=i(this).val();i(this).siblings(".feature-key-value.active").removeClass("active"),i(this).siblings('.feature-key-value[data-type="'+e+'"]').addClass("active")}),l.find('.tabs-section[data-section="featureKeys"] .type-info a').on("click",function(){var e=i(this);setTimeout(function(){var i=(e.hasClass("collapsed")?"show":"hide").concat("Info");e.find(".text").text(c.i18n.active().devices.popupSettings.featureKeys.info.link[i])})});var _=a.ui.dialog(l,{position:["center",20],title:u,dialogClass:"voip-edit-device-popup overflow-visible"})},devicesRestart:function(e,i){var t=this;t.callApi({resource:"device.restart",data:{accountId:t.accountId,deviceId:e},success:function(e){i&&i(e.data)}})},devicesUnlock:function(e,i){var t=this;a.request({resource:"provisioner.devices.unlock",data:{accountId:t.accountId,macAddress:e},success:function(e,t){i&&i()}})},devicesMergeData:function(e,n,s,r){var c=i.inArray(e.device_type,["sip_device","landline","fax","ata","softphone","smartphone","mobile","sip_uri"])>-1,d=i.inArray(e.device_type,["fax","ata","softphone","smartphone","mobile"])>-1,o=i.inArray(e.device_type,["landline","cellphone","smartphone"])>-1,u=i.inArray(e.device_type,["sip_device","mobile","softphone"])>-1,l=a.ui.getFormData("form_device");if("mac_address"in l&&(l.mac_address=a.util.formatMacAddress(l.mac_address)),o&&(l.call_forward=i.extend(!0,{enabled:!0,require_keypress:!0,keep_caller_id:!0},l.call_forward),"smartphone"===e.device_type&&(l.call_forward.failover=!0),l.hasOwnProperty("extra")&&l.extra.allowVMCellphone&&(l.call_forward.require_keypress=!l.extra.allowVMCellphone)),c&&(l.media=i.extend(!0,{audio:{codecs:[]},video:{codecs:[]}},l.media)),d&&(l.sip=i.extend(!0,{expire_seconds:360,invite_format:"username",method:"password"},l.sip)),"call_restriction"in l&&t.each(l.call_restriction,function(i,t){t in e.extra.restrictions&&e.extra.restrictions[t].disabled?i.action=e.extra.restrictions[t].action:i.action=i.action===!0?"inherit":"deny"}),l.hasOwnProperty("provision")&&l.provision.hasOwnProperty("feature_keys")){var v={};l.provision.feature_keys.forEach(function(e,i){v[i]=e}),l.provision.feature_keys=v}var p=i.extend(!0,{},e,l);if(u&&(p.media.encryption.methods=[],p.media.encryption.enforce_security&&p.media.encryption.methods.push(l.extra.rtpMethod)),p.extra.hasOwnProperty("notify_unregister")&&(p.suppress_unregister_notifications=!p.extra.notify_unregister),c&&(s&&(p.media.audio.codecs=s.getSelectedItems()),r&&(p.media.video.codecs=r.getSelectedItems())),p.hasOwnProperty("media")&&p.media.hasOwnProperty("fax_option")&&"auto"===p.media.fax_option&&delete p.media.fax_option,p.hasOwnProperty("media")&&p.media.hasOwnProperty("fax")&&p.media.fax.hasOwnProperty("option")&&delete p.media.fax.option,p.hasOwnProperty("provision")&&p.provision.hasOwnProperty("feature_keys")){for(var f in p.provision.feature_keys)"none"===p.provision.feature_keys[f].type&&delete p.provision.feature_keys[f];t.isEmpty(p.provision.feature_keys)&&delete p.provision.feature_keys}return delete p.media.secure_rtp,delete p.extra,p},devicesFormatData:function(e,n){var s=this,r={extra:{hasE911Numbers:!t.isEmpty(e.e911Numbers),e911Numbers:e.e911Numbers,restrictions:e.listClassifiers,rtpMethod:e.device.media&&e.device.media.encryption&&e.device.media.encryption.enforce_security?e.device.media.encryption.methods[0]:"",selectedCodecs:{audio:[],video:[]},availableCodecs:{audio:[],video:[]}},call_restriction:{},device_type:"sip_device",enabled:!0,media:{encryption:{enforce_security:!1},audio:{codecs:["PCMU","PCMA"]},video:{codecs:[]}},suppress_unregister_notifications:!0},c={sip_device:{sip:{password:a.util.randomString(12),realm:a.apps.auth.currentAccount.realm,username:"user_"+a.util.randomString(10)}},landline:{call_forward:{require_keypress:!0,keep_caller_id:!0},contact_list:{exclude:!0}},cellphone:{call_forward:{require_keypress:!0,keep_caller_id:!0},contact_list:{exclude:!0}},ata:{sip:{password:a.util.randomString(12),realm:a.apps.auth.currentAccount.realm,username:"user_"+a.util.randomString(10)}},fax:{media:{fax_option:"false"},outbound_flags:["fax"],sip:{password:a.util.randomString(12),realm:a.apps.auth.currentAccount.realm,username:"user_"+a.util.randomString(10)}},softphone:{sip:{password:a.util.randomString(12),realm:a.apps.auth.currentAccount.realm,username:"user_"+a.util.randomString(10)}},mobile:{sip:{password:a.util.randomString(12),realm:a.apps.auth.currentAccount.realm,username:"user_"+a.util.randomString(10)}},smartphone:{call_forward:{require_keypress:!0,keep_caller_id:!0},contact_list:{exclude:!0},sip:{password:a.util.randomString(12),realm:a.apps.auth.currentAccount.realm,username:"user_"+a.util.randomString(10)}},sip_uri:{sip:{password:a.util.randomString(12),username:"user_"+a.util.randomString(10),expire_seconds:360,invite_format:"route",method:"password"}}};t.each(e.listClassifiers,function(i,t){t in s.i18n.active().devices.classifiers&&(r.extra.restrictions[t].friendly_name=s.i18n.active().devices.classifiers[t].name,"help"in s.i18n.active().devices.classifiers[t]&&(r.extra.restrictions[t].help=s.i18n.active().devices.classifiers[t].help)),"call_restriction"in e.accountLimits&&t in e.accountLimits.call_restriction&&"deny"===e.accountLimits.call_restriction[t].action&&(r.extra.restrictions[t].disabled=!0,r.extra.hasDisabledRestrictions=!0),"call_restriction"in e.device&&t in e.device.call_restriction?r.extra.restrictions[t].action=e.device.call_restriction[t].action:r.extra.restrictions[t].action="inherit"});var d=i.extend(!0,{},c[e.device.device_type],r,e.device);return e.device.media&&e.device.media.audio&&e.device.media.audio.codecs&&(d.media.audio.codecs=e.device.media.audio.codecs),e.device.media&&e.device.media.video&&e.device.media.video.codecs&&(d.media.video.codecs=e.device.media.video.codecs),d.extra.isRegistered=n.isRegistered,d.hasOwnProperty("call_forward")&&d.call_forward.hasOwnProperty("require_keypress")&&(d.extra.allowVMCellphone=!d.call_forward.require_keypress),d},devicesFormatListData:function(e){var i=this,a={countDevices:0,devices:{}},n={},s=i.i18n.active().devices.unassignedDevice,r={cellphone:"fa fa-phone",smartphone:"icon-telicon-mobile-phone",landline:"icon-telicon-home",mobile:"icon-telicon-sprint-phone",softphone:"icon-telicon-soft-phone",sip_device:"icon-telicon-voip-phone",sip_uri:"icon-telicon-voip-phone",fax:"icon-telicon-fax",ata:"icon-telicon-ata"};t.each(e.users,function(e){n[e.id]=e}),t.each(e.devices,function(e){var t=e.owner_id?!0:!1;a.countDevices++,a.devices[e.id]={id:e.id,isAssigned:t+"",friendlyIconClass:r[e.device_type],macAddress:e.mac_address,name:e.name,userName:e.owner_id&&e.owner_id in n?n[e.owner_id].first_name+" "+n[e.owner_id].last_name:s,sortableUserName:e.owner_id&&e.owner_id in n?n[e.owner_id].last_name+" "+n[e.owner_id].first_name:s,enabled:e.enabled,type:e.device_type,friendlyType:i.i18n.active().devices.types[e.device_type],registered:!1,classStatus:e.enabled?"unregistered":"disabled",isRegistered:!1}}),t.each(e.status,function(e){if(e.registered===!0&&e.device_id in a.devices){var i=a.devices[e.device_id];i.registered=!0,i.enabled&&(i.classStatus="registered",i.isRegistered=!0)}});var c=[];return t.each(a.devices,function(e){c.push(e)}),c.sort(function(e,i){if(e.userName===i.userName){var t=e.name.toLowerCase(),a=i.name.toLowerCase();return t>a?1:a>t?-1:0}if(e.userName===s)return 1;if(i.userName===s)return-1;var n=e.sortableUserName.toLowerCase(),r=i.sortableUserName.toLowerCase();return n>r?1:r>n?-1:0}),a.devices=c,a},devicesDeleteDevice:function(e,i){var t=this;t.callApi({resource:"device.delete",data:{accountId:t.accountId,deviceId:e,data:{}},success:function(e){i(e.data)}})},devicesListClassifiers:function(e){var i=this;i.callApi({resource:"numbers.listClassifiers",data:{accountId:i.accountId},success:function(i){e(i.data)}})},devicesGetE911Numbers:function(e){var i=this;i.callApi({resource:"numbers.list",data:{accountId:i.accountId,filters:{paginate:"false"}},success:function(n){a.pub("common.numbers.getListFeatures",function(a){var s={};t.each(n.data.numbers,function(e,t){e.features.indexOf("dash_e911")>=0&&(s[t]=i.devicesFormatNumber(e,a))}),e(s)})}})},devicesFormatNumber:function(e,a){return e.viewFeatures=i.extend(!0,{},a),"locality"in e&&(e.isoCountry=e.locality.country||"",e.friendlyLocality="city"in e.locality?e.locality.city+("state"in e.locality?", "+e.locality.state:""):""),t.each(e.features,function(i){i in e.viewFeatures&&(e.viewFeatures[i].active="active")}),e},devicesGetEditData:function(e,i){var t=this;a.parallel({listClassifiers:function(e){t.devicesListClassifiers(function(i){e(null,i)})},device:function(i){e.id?t.devicesGetDevice(e.id,function(e){i(null,e)}):i(null,e)},e911Numbers:function(e){t.devicesGetE911Numbers(function(i){e(null,i)})},accountLimits:function(e){t.callApi({resource:"limits.get",data:{accountId:t.accountId},success:function(i,t){e(null,i.data)}})}},function(a,n){var s=t.devicesFormatData(n,e);i&&i(s)})},devicesGetDevice:function(e,i,t){var a=this;a.callApi({resource:"device.get",data:{accountId:a.accountId,deviceId:e},success:function(e){i&&i(e.data)},error:function(e){t&&t(e)}})},devicesSaveDevice:function(e,i){var t=this;e.id?t.devicesUpdateDevice(e,i):t.devicesCreateDevice(e,i)},devicesCreateDevice:function(e,i){var t=this;t.callApi({resource:"device.create",data:{accountId:t.accountId,data:e},success:function(e){i(e.data)}})},devicesUpdateDevice:function(e,i,t){var a=this;a.callApi({resource:"device.update",data:{accountId:a.accountId,data:e,deviceId:e.id},success:function(e){i&&i(e.data)},error:function(e){t&&t(e)}})},devicesGetData:function(e){var i=this;a.parallel({users:function(e){i.callApi({resource:"user.list",data:{accountId:i.accountId,filters:{paginate:"false"}},success:function(i){e&&e(null,i.data)}})},status:function(e){i.callApi({resource:"device.getStatus",data:{accountId:i.accountId,filters:{paginate:"false"}},success:function(i){e&&e(null,i.data)}})},devices:function(e){i.callApi({resource:"device.list",data:{accountId:i.accountId,filters:{paginate:"false"}},success:function(i){e(null,i.data)}})}},function(i,t){e&&e(t)})},devicesGetE911NumberAddress:function(e,i){var t=this;t.callApi({resource:"numbers.get",data:{accountId:t.accountId,phoneNumber:encodeURIComponent(e)},success:function(e,t){var a=e.data.dash_e911.street_address,n=e.data.dash_e911.locality,s=e.data.dash_e911.postal_code,r=e.data.dash_e911.region;i("undefined"!=typeof e.data.dash_e911.extended_address?a+", "+e.data.dash_e911.extended_address+"<br>"+n+", "+r+" "+s:a+", <br>"+n+", "+r+" "+s)}})},devicesGetIterator:function(e,i,t){e.hasOwnProperty("endpoint_brand")&&e.hasOwnProperty("endpoint_family")&&e.hasOwnProperty("endpoint_model")?a.request({resource:"provisioner.ui.getModel",data:{brand:e.endpoint_brand,family:e.endpoint_family,model:e.endpoint_model},success:function(e,t){i&&i(e.data.template)},error:function(e,i){}}):t&&t()}};return s});