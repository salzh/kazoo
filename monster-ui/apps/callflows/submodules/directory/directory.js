define(["require","jquery","underscore","monster"],function(e){var t=e("jquery"),i=(e("underscore"),e("monster")),r={requests:{},subscribe:{"callflows.fetchActions":"directoryDefineActions","callflows.directory.edit":"_directoryEdit"},directoryRender:function(e,r,a){var o=this,c=t(i.template(o,"directory-edit",e)),d=c.find("#directory-form");o.directoryRenderUserList(e,c),i.ui.validate(d,{rules:{min_dtmf:{digits:!0},max_dtmf:{digits:!0}}}),t('*[rel=popover]:not([type="text"])',c).popover({trigger:"hover"}),t('*[rel=popover][type="text"]',c).popover({trigger:"focus"}),o.winkstartTabs(c),t(".directory-save",c).click(function(r){if(r.preventDefault(),i.ui.valid(d)){var n=i.ui.getFormData("directory-form");o.directoryCleanFormData(n);var l={};t(".rows .row:not(#row_no_data)",c).each(function(){l[t(this).data("id")]=t("#user_callflow_id",t(this)).val()}),e.field_data.user_list={old_list:e.field_data.old_list,new_list:l},o.directorySave(n,e,a.save_success)}else i.ui.alert(o.i18n.active().callflows.directory.there_were_errors_on_the_form)}),t(".directory-delete",c).click(function(t){t.preventDefault(),i.ui.confirm(o.i18n.active().callflows.directory.are_you_sure_you_want_to_delete,function(){o.directoryDelete(e.data.id,a.delete_success)})}),t(".add_user_div",c).click(function(){var r=t("#select_user_id",c),a=t("#callflow_id",c);if("empty_option_user"!=r.val()&&"empty_option_callflow"!=a.val()){var d=r.val(),n={user_id:d,user_name:t("#option_user_"+d,c).text(),callflow_id:a.val(),field_data:{callflows:e.field_data.callflows},_t:function(e){return window.translate.directory[e]}};t("#row_no_data",c).size()>0&&t("#row_no_data",c).remove(),t(".rows",c).prepend(i.template(o,"directory-userRow",n)),t("#option_user_"+d,c).hide(),r.val("empty_option_user"),a.val("empty_option_callflow")}else i.ui.alert("warning",o.i18n.active().callflows.directory.noDataSelected)}),t(c).delegate(".action_user.delete","click",function(){var e=t(this).data("id");t("#row_user_"+e,c).remove(),t("#option_user_"+e,c).show(),0==t(".rows .row",c).size()&&t(".rows",c).append(i.template(o,"directory-userRow"))}),r.empty().append(c)},directoryRenderUserList:function(e,r){var a=this;if(e.data.id)if("users"in e.data&&e.data.users.length>0){var o;t.each(e.field_data.users,function(c,d){d.id in e.field_data.old_list&&(o={user_id:d.id,user_name:d.first_name+" "+d.last_name,callflow_id:e.field_data.old_list[d.id],field_data:{callflows:e.field_data.callflows}},t(".rows",r).append(i.template(a,"directory-userRow",o)),t("#option_user_"+d.id,r).hide())})}else t(".rows",r).empty().append(i.template(a,"directory-userRow"));else t(".rows",r).empty().append(i.template(a,"directory-userRow"))},_directoryEdit:function(e){var t=this;t.directoryEdit(e.data,e.parent,e.target,e.callbacks,e.data_defaults)},directoryEdit:function(e,r,a,o,c){var d=this,n=r||t("#directory-content"),l=a||t("#directory-view",n),o=o||{},s={save_success:o.save_success,save_error:o.save_error,delete_success:o.delete_success,delete_error:o.delete_error,after_render:o.after_render},u={data:t.extend(!0,{min_dtmf:"3",max_dtmf:"0",sort_by:"last_name",confirm_match:!1},c||{}),field_data:{sort_by:{first_name:d.i18n.active().callflows.directory.first_name,last_name:d.i18n.active().callflows.directory.last_name}}};i.parallel({callflow_list:function(e){d.callApi({resource:"callflow.list",data:{accountId:d.accountId,filters:{paginate:"false"}},success:function(i){var r=[];t.each(i.data,function(){0==this.featurecode&&r.push(this)}),r.sort(function(e,t){var i=(e.name||e.numbers[0]+"").toLowerCase(),r=(t.name||t.numbers[0]+"").toLowerCase();return i>r}),u.field_data.callflows=r,e(null,i)}})},user_list:function(e){d.callApi({resource:"user.list",data:{accountId:d.accountId,filters:{paginate:"false"}},success:function(t){t.data.sort(function(e,t){var i=(e.first_name+" "+e.last_name).toLowerCase(),r=(t.first_name+" "+t.last_name).toLowerCase();return i>r}),u.field_data.users=t.data,e(null,t)}})},directory_get:function(i){"object"==typeof e&&e.id?d.directoryGet(e.id,function(e,r){u.field_data.old_list={},"users"in e&&t.each(e.users,function(e,t){u.field_data.old_list[t.user_id]=t.callflow_id}),i(null,e)}):i(null,{})}},function(i,r){var a=u;"object"==typeof e&&e.id&&(a=t.extend(!0,u,{data:r.directory_get})),d.directoryRender(a,l,s),"function"==typeof s.after_render&&s.after_render()})},directoryPopupEdit:function(e){var r,a,o=this,c=e.data,d=e.callback,n=e.data_defaults;a=t('<div class="inline_popup callflows-port"><div class="inline_content main_content"/></div>'),o.directoryEdit(c,a,t(".inline_content",a),{save_success:function(e){r.dialog("close"),"function"==typeof d&&d(e)},delete_success:function(){r.dialog("close"),"function"==typeof d&&d({data:{}})},after_render:function(){r=i.ui.dialog(a,{title:c.id?o.i18n.active().callflows.directory.edit_directory:o.i18n.active().callflows.directory.create_directory})}},n)},directoryNormalizeData:function(e){return delete e.users,e},directoryCleanFormData:function(e){e.max_dtmf>0||delete e.max_dtmf,delete e.user_callflow_id,delete e.user_id,delete e.callflow_id},directorySave:function(e,i,r){var a=this,o=a.directoryNormalizeData(t.extend(!0,{},i.data,e));"object"==typeof i.data&&i.data.id?a.directoryUpdate(o,function(e,t){a.directoryUpdateUsers(i.field_data.user_list,e.id,function(){r&&r(e,t,"update")})}):a.directoryCreate(o,function(e,t){a.directoryUpdateUsers(i.field_data.user_list,e.id,function(){r&&r(e,t,"create")})})},directoryUpdateSingleUser:function(e,i,r,a){var o=this;o.callApi({resource:"user.get",data:{accountId:o.accountId,userId:e},success:function(c,d){r?((!c.data.directories||t.isArray(c.data.directories))&&(c.data.directories={}),c.data.directories[i]=r):delete c.data.directories[i],o.callApi({resource:"user.update",data:{accountId:o.accountId,userId:e,data:c.data},success:a})}})},directoryUpdateUsers:function(e,i,r){var a=e.old_list,o=e.new_list,c=this,d=0,n=0,l=function(){d++,d>=n&&r()};a?(t.each(a,function(e,t){e in o||(n++,c.directoryUpdateSingleUser(e,i,void 0,l))}),t.each(o,function(e,t){e in a?a[e]!=t&&(n++,c.directoryUpdateSingleUser(e,i,t,l)):(n++,c.directoryUpdateSingleUser(e,i,t,l))})):o&&t.each(o,function(e,t){n++,c.directoryUpdateSingleUser(e,i,t,l)}),0===n&&r()},directoryDefineActions:function(e){var r=this,a=e.actions;t.extend(a,{"directory[id=*]":{name:r.i18n.active().callflows.directory.directory,icon:"book",category:r.i18n.active().oldCallflows.advanced_cat,module:"directory",tip:r.i18n.active().callflows.directory.directory_tip,data:{id:"null"},rules:[{type:"quantity",maxSize:"1"}],isUsable:"true",weight:160,caption:function(e,t){var i=e.getMetadata("id"),r="";return i in t&&(r=t[i].name),r},edit:function(e,a){r.directoryList(function(o){var c,d;d=t(i.template(r,"directory-callflowEdit",{items:i.util.sort(o),selected:e.getMetadata("id")||""})),void 0==t("#directory_selector option:selected",d).val()&&t("#edit_link",d).hide(),t(".inline_action",d).click(function(i){var a="edit"==t(this).data("action")?{id:t("#directory_selector",d).val()}:{};i.preventDefault(),r.directoryPopupEdit({data:a,callback:function(t){e.setMetadata("id",t.data.id||"null"),e.caption=t.data.name||"",c.dialog("close")}})}),t("#add",d).click(function(){e.setMetadata("id",t("#directory_selector",c).val()),e.caption=t("#directory_selector option:selected",c).text(),c.dialog("close")}),c=i.ui.dialog(d,{title:r.i18n.active().callflows.directory.directory_title,beforeClose:function(){"function"==typeof a&&a()}})})},listEntities:function(e){r.callApi({resource:"directory.list",data:{accountId:r.accountId,filters:{paginate:!1}},success:function(t,i){e&&e(t.data)}})},editEntity:"callflows.directory.edit"}})},directoryList:function(e){var t=this;t.callApi({resource:"directory.list",data:{accountId:t.accountId,filters:{paginate:!1}},success:function(t){e&&e(t.data)}})},directoryGet:function(e,t){var i=this;i.callApi({resource:"directory.get",data:{accountId:i.accountId,directoryId:e},success:function(e){t&&t(e.data)}})},directoryCreate:function(e,t){var i=this;i.callApi({resource:"directory.create",data:{accountId:i.accountId,data:e},success:function(e){t&&t(e.data)}})},directoryUpdate:function(e,t){var i=this;i.callApi({resource:"directory.update",data:{accountId:i.accountId,directoryId:e.id,data:e},success:function(e){t&&t(e.data)}})},directoryDelete:function(e,t){var i=this;i.callApi({resource:"directory.delete",data:{accountId:i.accountId,directoryId:e},success:function(e){t&&t(e.data)}})}};return r});