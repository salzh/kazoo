winkstart.module("browserphone","browserphone",{subscribe:{"browserphone.activate":"activate","browserphone.initialized":"initialized","browserphone.module_activate":"module_activate","browserphone.make_call":"make_call"},css:["css/credentials_popup.css"],templates:{credentials_popup:"tmpl/credentials_popup.html"},resources:{"account.get":{url:"{api_url}/accounts/{account_id}",contentType:"application/json",verb:"GET"},"account.get_registered_devices":{url:"{api_url}/accounts/{account_id}/devices/status",contentType:"application/json",verb:"GET"},"user.get":{url:"{api_url}/accounts/{account_id}/users/{user_id}",contentType:"application/json",verb:"GET"},"user.update":{url:"{api_url}/accounts/{account_id}/users/{user_id}",contentType:"application/json",verb:"POST"},"user_device.get":{url:"{api_url}/accounts/{account_id}/devices/{device_id}",contentType:"application/json",verb:"GET"},"user_device.create":{url:"{api_url}/accounts/{account_id}/devices",contentType:"application/json",verb:"PUT"}}},function(){var e=this;e.module="browserphone",winkstart.registerResources(this.__whapp,this.config.resources),"modules"in winkstart.apps[e.__module]&&("whitelist"in winkstart.apps[e.__module].modules&&(e.modules={},$.each(winkstart.apps[e.__module].modules.whitelist,function(t,n){e.modules[n]=!1})),"blacklist"in winkstart.apps[e.__module].modules&&$.each(winkstart.apps[e.__module].modules.blacklist,function(t,n){n in e.modules&&delete e.modules[n]})),e.uninitialized_count=e._count(e.modules),e.whapp_auth(function(){winkstart.publish("whappnav.add",{name:e.__module,weight:0}),e.initialization_check()}),e.whapp_config(),winkstart.publish("browserphone.loaded")},{modules:{},is_initialized:!0,uninitialized_count:1337,initialized:function(){var e=this;e.is_initialized=!0,winkstart.apps.browserphone["default"]&&($('[data-whapp="browserphone"] > a').addClass("activate"),e.setup_page())},activate:function(){var e=this;e.whapp_auth(function(){e.initialization_check()})},initialization_check:function(){var e=this;e.is_initialized?e.setup_page():$.each(e.modules,function(t,n){n||(e.modules[t]=!0,winkstart.module(e.__module,t).init(function(){winkstart.log(e.__module+": Initialized "+t),--e.uninitialized_count||winkstart.publish(e.__module+".initialized",{})}))})},module_activate:function(e){var t=this;t.whapp_auth(function(){winkstart.publish(e.name+".activate")})},whapp_auth:function(e){var t=this;"auth_token"in winkstart.apps[t.__module]&&winkstart.apps[t.__module].auth_token?e():winkstart.publish("auth.shared_auth",{app_name:t.__module,callback:typeof e=="function"?e:undefined})},_count:function(e){var t=0;return $.each(e,function(){t++}),t},whapp_config:function(){var e=this},setup_page:function(){var e=this;e.maybe_start_softphone()},get_account:function(e,t){winkstart.request("account.get",{api_url:winkstart.apps.browserphone.api_url,account_id:winkstart.apps.browserphone.account_id},function(t,n){typeof e=="function"&&e(t,n)},function(e,n){typeof t=="function"&&t(e,n)})},get_registered_devices:function(e,t){winkstart.request("account.get_registered_devices",{api_url:winkstart.apps.browserphone.api_url,account_id:winkstart.apps.browserphone.account_id},function(t,n){typeof e=="function"&&e(t,n)},function(e,n){typeof t=="function"&&t(e,n)})},get_user:function(e,t){winkstart.request("user.get",{api_url:winkstart.apps.browserphone.api_url,account_id:winkstart.apps.browserphone.account_id,user_id:winkstart.apps.browserphone.user_id},function(t,n){typeof e=="function"&&e(t,n)},function(e,n){typeof t=="function"&&t(e,n)})},update_user:function(e,t,n){winkstart.request("user.update",{api_url:winkstart.apps.browserphone.api_url,account_id:winkstart.apps.browserphone.account_id,user_id:winkstart.apps.browserphone.user_id,data:e||{}},function(e,n){typeof t=="function"&&t(e,n)},function(e,t){typeof n=="function"&&n(e,t)})},get_device:function(e,t,n){winkstart.request("user_device.get",{api_url:winkstart.apps.browserphone.api_url,account_id:winkstart.apps.browserphone.account_id,api_url:winkstart.apps.browserphone.api_url,device_id:e},function(e,n){typeof t=="function"&&t(e,n)},function(e,t){typeof n=="function"&&n(e,t)})},create_browserphone_device:function(e,t,n){winkstart.request("user_device.create",{api_url:winkstart.apps.browserphone.api_url,account_id:winkstart.apps.browserphone.account_id,api_url:winkstart.apps.browserphone.api_url,data:e||{}},function(e,n){typeof t=="function"&&t(e,n)},function(e,t){typeof error=="function"&&error(e,t)})},browserphone_error:function(e,t,n){winkstart.alert(e)},maybe_start_softphone:function(e){var t=this,n="menubar=no,location=no,resizable=no,scrollbars=no,status=no,addressbar=no,width=320,height=480";t.phoneWindow===undefined||!t.phoneWindow||t.phoneWindow.closed?t.get_sip_credentials(function(r,i){localStorage.setItem("SIPCreds",JSON.stringify(r)),t.phoneWindow=window.open("js/external/phone","ctxPhone",n),t.phoneWindow===undefined?t.browserphone_error("To ensure your browserphone works correctly, please enable popups for this site."):($(t.phoneWindow).load(function(){t.phoneWindow.ctxSip.phone.on("invite",function(e){t.incoming_call(e)}),typeof e=="function"&&e()}),$(window).unload(function(){t.phoneWindow.ctxSip.phone.unregister(),t.phoneWindow.close()}))}):(t.phoneWindow.focus(),typeof e=="function"&&e())},get_sip_credentials:function(e){var t,n;THIS=this,fnSuccess=function(t){typeof e=="function"&&e(t)},fnFailure=function(e){return function(t,n){THIS.browserphone_error(e,t,n)}},THIS.get_user(function(e){"browserphone_id"in e.data&&e.data.browserphone_id?(t=e.data.browserphone_id,THIS.get_registered_devices(function(n){var r=!1;$.each(n.data,function(e,n){r=r||n.device_id===t&&n.registered}),r?THIS.popup_get_credentials(fnSuccess):THIS.get_device(t,function(e){THIS.creds_from_device_data(e,fnSuccess)},function(t,n){delete e.data.browserphone_id,THIS.update_user(e.data),THIS.browserphone_error("Could not retrieve browserphone device info",t,n)})},fnFailure("Could not retrieve browserphone registration info"))):(n=THIS.new_browserphone_data(e.data),THIS.create_browserphone_device(n,function(t){e.data.browserphone_id=t.data.id,THIS.update_user(e.data),THIS.creds_from_device_data(t,fnSuccess)},fnFailure("Could not create browserphone device")))},fnFailure("Could not retrieve user data"))},popup_get_credentials:function(e){var t,n,r=this,i="",s=r.templates.credentials_popup.tmpl(),o=function(){t=winkstart.dialog(s,{title:"Enter SIP Credentials"})};r.get_account(function(e,t){$("#Realm",s).val(e.data.realm),o()},o),$(".submit",s).click(function(s){s.preventDefault(),n=form2object("credentials"),i="",$(".invalid").removeClass("invalid"),$.each(n,function(e,t){t===""&&(i+=e+": Field is empty. <br/>",$("#"+e).addClass("invalid"))}),i===""?(n.WSServer=winkstart.config.ws_server,t.dialog("close"),e(n)):r.browserphone_error(i)})},new_browserphone_data:function(e){var t=e.first_name+" "+e.last_name+"'s Browserphone",n={sip:{username:"user_"+winkstart.random_string(6),password:winkstart.random_string(12),invite_format:"username",method:"password",expire_seconds:"360"},media:{secure_rtp:"none",peer_to_peer:"false",audio:{codecs:["PCMU","PCMA"]},video:{codecs:[]},fax:{option:"true"},fax_option:!0},call_forward:{},music_on_hold:{},owner_id:e.id,name:t};return n},creds_from_device_data:function(e,t){var n={};n.User=e.data.sip.username,n.Pass=e.data.sip.password,n.WSServer=winkstart.config.ws_server,THIS.get_account(function(e,r){n.Realm=e.data.realm,t(n)},function(e,t){THIS.browserphone_error("Could not retrieve account realm data")})},make_call:function(e,t,n){var r,i=this;i.maybe_start_softphone(function(){r=i.phoneWindow.ctxSip.sipCall(e),i.bind_call_events(r,t,n)})},bind_call_events:function(e,t,n){e!=null&&typeof t=="function"&&$.each(n,function(n,r){e.on(r,function(e){t(r,e)})})},incoming_call:function(e){var t,n=this;n.phoneWindow.focus(),t=function(t,r){n.bind_call_events(e,t,r)},winkstart.publish("browserphone.incoming_call",e,t)},outgoing_call:function(e){var t,n=this;t=function(t,r){n.bind_call_events(e,t,r)},winkstart.publish("browserphone.outgoing_call",e,t)}});