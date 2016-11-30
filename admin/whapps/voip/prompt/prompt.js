winkstart.module("voip","prompt",{css:["css/prompt.css"],templates:{prompt:"tmpl/prompt.html",create:"tmpl/create.html",edit:"tmpl/edit.html",add_language:"tmpl/add_language.html",dialog_add_language:"tmpl/dialog_add_language.html"},subscribe:{"prompt.activate":"activate","prompt.create":"render_create_prompt","prompt.edit":"render_edit_prompt"},validation:[{name:"#name",regex:/^.+$/}],resources:{"prompt.list":{url:"{api_url}/accounts/{account_id}/media/prompts",contentType:"application/json",verb:"GET"},"prompt.get":{url:"{api_url}/accounts/{account_id}/media/prompts/{prompt_id}",contentType:"application/json",verb:"GET"},"prompt.create":{url:"{api_url}/accounts/{account_id}/media",contentType:"application/json",verb:"PUT"},"prompt.delete":{url:"{api_url}/accounts/{account_id}/media/{prompt_id}",contentType:"application/json",verb:"DELETE"},"prompt.upload":{url:"{api_url}/accounts/{account_id}/media/{prompt_id}/raw",contentType:"application/x-base64",verb:"POST"},"prompt.listGlobal":{url:"{api_url}/media/prompts",contentType:"application/json",verb:"GET"},"prompt.getGlobal":{url:"{api_url}/media/prompts/{prompt_id}",contentType:"application/json",verb:"GET"},"prompt.createGlobal":{url:"{api_url}/media",contentType:"application/json",verb:"PUT"},"prompt.uploadGlobal":{url:"{api_url}/media/{prompt_id}/raw",contentType:"application/x-base64",verb:"POST"},"prompt.deleteGlobal":{url:"{api_url}/media/{prompt_id}",contentType:"application/json",verb:"DELETE"}}},function(e){var t=this;winkstart.registerResources(t.__whapp,t.config.resources),winkstart.publish("whappnav.subnav.add",{whapp:"voip",module:t.__module,label:_t("prompt","prompt_label"),icon:"earth",weight:"45",category:_t("config","advanced_menu_cat")})},{adminMode:!1,render_create_prompt:function(){var e=this,t=$("#prompt-view");e.getListAvailablePrompts(function(n){var r={_t:function(e){return window.translate.prompt[e]},data:{},field_data:{prompts:n}},i,s=e.templates.create.tmpl(r);s.find(".basic_view").append(e.templates.add_language.tmpl(r)),$("#file",s).bind("change",function(e){var t=e.target.files;if(t.length>0){var n=new FileReader;i="updating",n.onloadend=function(e){var t=e.target.result;i=t},n.readAsDataURL(t[0])}}),$(".prompt-save",s).click(function(t){t.preventDefault();var n=form2object("prompt-form"),r=e.clean_form_data(n);i==="updating"?winkstart.alert(_t("prompt","the_file_you_want_to_apply")):e.save_prompt(r,function(t){e.upload_file(i,t.data.id,function(){e.refresh_view(r.prompt_id)})})}),t.empty().append(s)})},render_edit_prompt:function(e){var t=this,n=$("#prompt-view");t.getDataEditPrompt(e.id,function(r){var i={_t:function(e){return window.translate.prompt[e]},data:{prompt_id:e.id,prompts:r}},s=t.templates.edit.tmpl(i);s.find(".delete-prompt").click(function(){var e=$(this),n=e.data("id"),r=e.parents("#prompt-form").data("promptid");t.delete_prompt(n,function(e){t.refresh_view(r)})}),s.find("#add_language").click(function(n){n.preventDefault(),t.display_add_language_dialog(e.id)}),n.empty().append(s)})},display_add_language_dialog:function(e){var t=this,n={_t:function(e){return window.translate.prompt[e]},data:{prompt_id:e}},r,i=t.templates.dialog_add_language.tmpl(n),s=t.templates.add_language.tmpl(n);i.find(".add-language-content").append(s),i.find("#add_language").click(function(n){n.preventDefault();var i=form2object("language-form"),s=t.clean_form_data(i);s.prompt_id=e,r==="updating"?winkstart.alert(_t("prompt","the_file_you_want_to_apply")):t.save_prompt(s,function(n){t.upload_file(r,n.data.id,function(){o.dialog("close").remove(),t.refresh_view(e)})})}),i.find("#file").bind("change",function(e){var t=e.target.files;if(t.length>0){var n=new FileReader;r="updating",n.onloadend=function(e){var t=e.target.result;r=t},n.readAsDataURL(t[0])}});var o=winkstart.dialog(i,{title:_t("prompt","language"),width:"500px"})},refresh_view:function(e,t){var n=this,r=!1,i=$("#prompt-view");n.render_list(function(s){s.length>0&&$.each(s[0],function(t,n){if(e===t)return r=!0,!1}),r?n.render_edit_prompt({id:e}):i.empty(),t&&t()})},getDataEditPrompt:function(e,t){var n=this;n.get_prompt(e,function(e){var r=n.formatListPrompts(e.data);t&&t(r)})},formatListPrompts:function(e){var t=this,n=winkstart.apps.voip.api_url,r=winkstart.apps.voip.auth_token,i=winkstart.apps.voip.account_id,s=[];return $.each(e,function(e,o){var u=o.id,a=u.split("%2F"),f={};f.language=a.length>1?a[0]:"-",t.adminMode?f.link=n+"/accounts/media/"+u+"/raw?auth_token="+r:f.link=n+"/accounts/"+i+"/media/"+u+"/raw?auth_token="+r,f.id=u,s.push(f)}),s},clean_form_data:function(e){return e.description=e.extra.upload_prompt,e.name=e.language+"%2F"+e.prompt_id,delete e.extra,e},format_data:function(e){return e.data.description!=undefined&&e.data.description.substr(0,12)=="C:\\fakepath\\"&&(e.data.description=e.data.description.substr(12)),e},normalize_data:function(e){return delete e.upload_prompt,"field_data"in e&&delete e.field_data,e.prompt_source=="upload"&&delete e.tts,e},render_list:function(e){var t=this,n=$("#prompt-content"),r=function(e,t){var r=e.hasOwnProperty("data")?e.data:[],i=function(e){var t=[];return e.length>0&&($.each(e[0],function(e,n){t.push({id:e,title:e+" ("+n+")"})}),t.sort(function(e,t){return e.title.toLowerCase()<t.title.toLowerCase()?-1:1})),t};$("#prompt-listpanel",n).empty().listpanel({label:_t("prompt","prompt_label"),identifier:"prompt-listview",new_entity_label:_t("prompt","add_prompt_label"),data:i(r),publisher:winkstart.publish,notifyMethod:"prompt.edit",notifyCreateMethod:"prompt.create",notifyParent:n}),t&&t(r)};t.adminMode?t.getGlobalPrompts(function(t){r&&r(t,e)}):t.getAccountPrompts(function(t){r&&r(t,e)})},activate:function(e){var t=this,n={isAdmin:winkstart.apps.auth.superduper_admin,_t:function(e){return window.translate.prompt[e]}},r=t.templates.prompt.tmpl(n);t.adminMode?r.find(".admin-mode-off").hide():r.find(".admin-mode-on").hide(),r.find("#enable_admin_mode").click(function(){t.adminMode=!0,t.refresh_view(undefined,function(){r.find(".admin-mode-off").hide(),r.find(".admin-mode-on").show()})}),r.find("#disable_admin_mode").click(function(){t.adminMode=!1,t.refresh_view(undefined,function(){r.find(".admin-mode-off").show(),r.find(".admin-mode-on").hide()})}),(e||$("#ws-content")).empty().append(r),t.getGlobalPrompts(function(e){t.arrayPrompts=[],$.each(e.data[0],function(e,n){t.arrayPrompts.push(e)}),t.render_list()})},get_list_prompts:function(e){var t=this;return t.arrayPrompts},getListAvailablePrompts:function(e){var t=this,n=t.get_list_prompts();t.list_prompts(function(t){var r=[];$.each(n,function(e,n){t.data.length>0&&t.data[0].hasOwnProperty(n)&&t.data[0][n]>0||r.push(n)}),e&&e(r)})},getGlobalPrompts:function(e){var t=this;winkstart.request("prompt.listGlobal",{api_url:winkstart.apps.voip.api_url},function(t,n){e&&e(t)})},getAccountPrompts:function(e){var t=this;winkstart.request("prompt.list",{account_id:winkstart.apps.voip.account_id,api_url:winkstart.apps.voip.api_url},function(t){e&&e(t)})},list_prompts:function(e){var t=this;t.adminMode?t.getGlobalPrompts(function(t){e&&e(t)}):t.getAccountPrompts(function(t){e&&e(t)})},get_prompt:function(e,t){var n=this,r="prompt.getGlobal",i={api_url:winkstart.apps.voip.api_url,prompt_id:e};n.adminMode||(r="prompt.get",i.account_id=winkstart.apps.voip.account_id),winkstart.request(r,i,function(e,n){t&&t(e)})},save_prompt:function(e,t){var n=this,r="prompt.createGlobal",i={api_url:winkstart.apps.voip.api_url,data:e};n.adminMode||(r="prompt.create",i.account_id=winkstart.apps.voip.account_id),winkstart.request(r,i,function(e,n){t&&t(e)})},upload_file:function(e,t,n){var r=this,i="prompt.uploadGlobal",s={api_url:winkstart.apps.voip.api_url,prompt_id:t,data:e};r.adminMode||(i="prompt.upload",s.account_id=winkstart.apps.voip.account_id),winkstart.request(i,s,function(e,t){n&&n()})},delete_prompt:function(e,t){var n=this,r="prompt.deleteGlobal",i={api_url:winkstart.apps.voip.api_url,prompt_id:e};n.adminMode||(r="prompt.delete",i.account_id=winkstart.apps.voip.account_id),winkstart.request(r,i,function(e,n){t&&t(e)})}});