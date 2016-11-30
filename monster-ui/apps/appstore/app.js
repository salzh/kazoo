define(["require","jquery","underscore","monster","toastr","isotope"],function(e){var n=e("jquery"),i=e("underscore"),t=e("monster"),s=(e("toastr"),e("isotope"),{name:"appstore",css:["app"],i18n:{"en-US":{customCss:!1},"fr-FR":{customCss:!1},"ru-RU":{customCss:!1}},requests:{},subscribe:{},load:function(e){var n=this;n.initApp(function(){e&&e(n)})},initApp:function(e){var n=this;t.pub("auth.initApp",{app:n,callback:e})},render:function(e){var i=this,s=n(t.template(i,"app")),a=e||n("#monster-content");i.loadData(function(e){i.renderApps(s,e),i.bindEvents(s,e)}),a.empty().append(s)},bindEvents:function(e,i){var t=this,s=e.find(".search-bar input.search-query");setTimeout(function(){s.focus()}),e.find(".app-filter").on("click",function(i){var t=n(this),a=t.data("filter");e.find(".app-filter").removeClass("active"),t.addClass("active"),e.find(".app-list").isotope({filter:".app-element"+(a?"."+a:"")}),s.val("").focus()}),e.find(".app-list-container").on("click",".app-element",function(e){t.showAppPopup(n(this).data("id"),i)}),s.on("keyup",function(i){var t=n(this).val(),s=e.find(".app-filter.active").data("filter"),a=".app-element"+(s?"."+s:"");t&&(a+='[data-name*="'+t+'"]'),e.find(".app-list").isotope({filter:".app-element"+a})})},loadData:function(e){var n=this;t.parallel({apps:function(e){n.callApi({resource:"appsStore.list",data:{accountId:n.accountId},success:function(n,i){e(null,n.data)}})},account:function(e){n.callApi({resource:"account.get",data:{accountId:n.accountId},success:function(n,i){e(null,n.data)}})},users:function(e){n.callApi({resource:"user.list",data:{accountId:n.accountId},success:function(n,i){e(null,n.data)}})}},function(s,a){var p=function(e,i){n.callApi({resource:"appsStore.getIcon",data:{accountId:n.accountId,appId:e,generateError:!1},success:function(t,s){i&&i(n.apiUrl+"accounts/"+n.accountId+"/apps_store/"+e+"/icon?auth_token="+n.authToken)},error:function(e,n){i&&i(null)}})},o=[];a.apps.forEach(function(e,n){(e.hasOwnProperty("allowed_users")&&"specific"!==e.allowed_users||e.hasOwnProperty("users")&&e.users.length>0)&&(e.tags?e.tags.push("installed"):e.tags=["installed"]);var i=e.i18n[t.config.whitelabel.language]||e.i18n["en-US"];e.label=i.label,e.description=i.description,o.push(function(n){p(e.id,function(e){n(null,e)})}),delete e.i18n}),t.parallel(o,function(n,t){i.each(a.apps,function(e,n){e.icon=t[n]}),e(a)})})},renderApps:function(e,i){var s=this,a=i.apps,p=n(t.template(s,"appList",{apps:a}));e.find(".app-list-container").empty().append(p),e.find(".app-list").isotope({getSortData:{name:function(e){return e.find(".app-title").text()}},sortBy:"name"})},showAppPopup:function(e,s){var a=this,p=n.extend(!0,[],s.users);a.callApi({resource:"appsStore.get",data:{accountId:a.accountId,appId:e},success:function(e,o){var c=e.data,r=c.i18n[t.config.whitelabel.language]||c.i18n["en-US"],l=n.extend(!0,c,{extra:{label:r.label,description:r.description,extendedDescription:r.extended_description,features:r.features,icon:i.find(s.apps,function(e){return e.id===c.id}).icon,screenshots:i.map(c.screenshots||[],function(e,n){return a.apiUrl+"apps_store/"+c.id+"/screenshot/"+n+"?auth_token="+a.authToken})}}),u=l.users?l.users.length:0,d=i.map(l.users||[],function(e){return e.id}),f=i.map(p,function(e,n){return d.indexOf(e.id)>=0&&(e.selected=!0),e}),h=n(t.template(a,"appPopup",{isWhitelabeling:t.util.isWhitelabeling(),app:l,users:f,i18n:{selectedUsers:u,totalUsers:f.length}})),m=(h.find(".left-container"),h.find(".right-container"));m.find(".user-list");!l.hasOwnProperty("allowed_users")||"specific"===l.allowed_users&&0===(l.users||[]).length?(m.find("#app_switch").prop("checked",!1),m.find(".permissions-bloc").hide()):"admins"===l.allowed_users?m.find("#app_popup_admin_only_radiobtn").prop("checked",!0):l.users&&l.users.length>0&&(m.find("#app_popup_specific_users_radiobtn").prop("checked",!0),m.find(".permissions-link").show(),m.find("#app_popup_select_users_link").html(t.template(a,"!"+a.i18n.active().selectUsersLink,{selectedUsers:u}))),a.bindPopupEvents(h,l,s),m.find(".selected-users-number").html(u),m.find(".total-users-number").html(f.length),t.ui.dialog(h,{title:l.extra.label}),h.find("#screenshot_carousel").carousel()}})},bindPopupEvents:function(e,s,a){var p=this,o=e.find(".user-list"),c=function(e,i,t){var a=e.hasOwnProperty("allowed_users")?s.hasOwnProperty("allowed_users")?"appsStore.update":"appsStore.add":"appsStore.delete";p.callApi({resource:a,data:{accountId:p.accountId,appId:s.id,data:e},success:function(e,t){n("#apploader").remove(),i&&i()},error:function(e,n){t&&t()}})};e.find("#app_switch").on("change",function(){n(this).is(":checked")?e.find(".permissions-bloc").slideDown():e.find(".permissions-bloc").slideUp()}),e.find('.permissions-bloc input[name="permissions"]').on("change",function(i){var t=n(this).val();"specific"===t?e.find(".permissions-link").show():e.find(".permissions-link").hide()}),e.find("#app_popup_select_users_link").on("click",function(n){n.preventDefault(),e.find(".app-details-view").hide(),e.find(".user-list-view").show(),e.find(".search-query").focus(),e.find(".user-list").css("height",e.find(".user-list-buttons").position().top-(e.find(".user-list-links").position().top+e.find(".user-list-links").outerHeight())+"px")}),o.on("change","input",function(n){e.find(".selected-users-number").html(o.find('input[type="checkbox"]:checked').length)}),e.find(".user-list-links a").on("click",function(i){i.preventDefault(),o.find('input[type="checkbox"]').prop("checked","check"===n(this).data("action")),e.find(".selected-users-number").html(o.find('input[type="checkbox"]:checked').length)}),e.find(".user-list-filter input.search-query").on("keyup",function(e){var i=n(this).val().toLowerCase();i?n.each(o.find(".user-list-element"),function(){var e=n(this);e.data("name").toLowerCase().indexOf(i)>=0?e.show():e.hide()}):o.find(".user-list-element").show()}),e.find("#user_list_cancel").on("click",function(i){i.preventDefault(),n.each(o.find("input"),function(){var e=n(this);e.prop("checked","check"===e.data("original"))}),e.find(".user-list-view").hide(),e.find(".app-details-view").show()}),e.find("#user_list_save").on("click",function(i){i.preventDefault();var s=t.ui.getFormData("app_popup_user_list_form").users;s?(n.each(o.find("input"),function(){n(this).data("original",this.checked?"check":"uncheck")}),e.find("#app_popup_select_users_link").html(t.template(p,"!"+p.i18n.active().selectUsersLink,{selectedUsers:s.length})),e.find(".user-list-view").hide(),e.find(".app-details-view").show()):t.ui.alert(p.i18n.active().alerts.noUserSelected)}),e.find("#appstore_popup_cancel").on("click",function(){e.closest(":ui-dialog").dialog("close")}),e.find("#appstore_popup_save").on("click",function(){if(e.find("#app_switch").is(":checked")){var a=e.find('.permissions-bloc input[name="permissions"]:checked').val(),o=t.ui.getFormData("app_popup_user_list_form").users||[];"specific"===a&&0===o.length?t.ui.alert(p.i18n.active().alerts.noUserSelected):c({allowed_users:a,users:"specific"===a?n.map(o,function(e){return{id:e}}):[]},function(){var a=t.config.whitelabel.language,o=a.substr(0,3).concat(a.substr(a.length-2,2).toUpperCase()),c=s.i18n.hasOwnProperty(o)?o:"en-US",r={api_url:s.api_url,icon:p.apiUrl+"accounts/"+p.accountId+"/apps_store/"+s.id+"/icon?auth_token="+p.authToken,id:s.id,label:s.i18n[c].label,name:s.name};s.hasOwnProperty("source_url")&&(r.source_url=s.source_url),t.util.isMasquerading()||i.find(t.apps.auth.installedApps,function(e){return e.id===s.id})||t.apps.auth.installedApps.push(r),n('#appstore_container .app-element[data-id="'+s.id+'"]').addClass("installed"),n("#appstore_container .app-filter.active").click(),e.closest(":ui-dialog").dialog("close")})}else c({},function(){t.util.isMasquerading()||(t.apps.auth.installedApps=t.apps.auth.installedApps.filter(function(e,n){return e.id!==s.id})),n('#appstore_container .app-element[data-id="'+s.id+'"]').removeClass("installed"),n("#appstore_container .app-filter.active").click(),e.closest(":ui-dialog").dialog("close")})})}});return s});