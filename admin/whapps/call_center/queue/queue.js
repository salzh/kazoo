winkstart.module("call_center","queue",{css:["css/queue.css"],templates:{queue:"tmpl/queue.html",edit:"tmpl/edit.html",queue_callflow:"tmpl/queue_callflow.html",agent_pause_callflow:"tmpl/agent_pause_callflow.html",agent_presence_callflow:"tmpl/agent_presence_callflow.html",add_agents:"tmpl/add_agents.html",edit_agents:"tmpl/edit_agents.html",selected_agent:"tmpl/selected_agent.html",available_user:"tmpl/available_user.html",account_fields:"tmpl/account_fields.html"},subscribe:{"queue.activate":"activate","queue.edit":"edit_queue","callflow.define_callflow_nodes":"define_callflow_nodes","queue.popup_edit":"popup_edit_queue","call_center.render_account_fields":"render_account_fields"},validation:[{name:"#name",regex:/.+/}],resources:{"queue.list":{url:"{api_url}/accounts/{account_id}/queues",contentType:"application/json",verb:"GET"},"queue.get":{url:"{api_url}/accounts/{account_id}/queues/{queue_id}",contentType:"application/json",verb:"GET"},"queue.get_stats":{url:"{api_url}/accounts/{account_id}/queues/{queue_id}/stats",contentType:"application/json",verb:"GET"},"queue.create":{url:"{api_url}/accounts/{account_id}/queues",contentType:"application/json",verb:"PUT"},"queue.update":{url:"{api_url}/accounts/{account_id}/queues/{queue_id}",contentType:"application/json",verb:"POST"},"queue.update_users":{url:"{api_url}/accounts/{account_id}/queues/{queue_id}/roster",contentType:"application/json",verb:"POST"},"queue.delete":{url:"{api_url}/accounts/{account_id}/queues/{queue_id}",contentType:"application/json",verb:"DELETE"},"queue.user_list":{url:"{api_url}/accounts/{account_id}/users",contentType:"application/json",verb:"GET"},"queue.media_list":{url:"{api_url}/accounts/{account_id}/media",contentType:"application/json",verb:"GET"}}},function(e){var t=this;winkstart.registerResources(t.__whapp,t.config.resources),winkstart.publish("whappnav.subnav.add",{whapp:"call_center",module:t.__module,label:_t("queue","manage_queues"),icon:"wrench_left",weight:"10"})},{queue_get_stats:function(e,t,n){winkstart.request(!0,"queue.get_stats",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url,queue_id:e},function(e,n){typeof t=="function"&&t(e,n)},function(e,t){typeof n=="function"&&n(e,t)})},queue_update_users:function(e,t,n,r){winkstart.request(!0,"queue.update_users",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url,queue_id:t,data:e},function(e,t){typeof n=="function"&&n(e,t)},function(e,t){typeof r=="function"&&r(e,t)})},save_queue:function(e,t,n,r){var i=this,s=i.normalize_data($.extend(!0,{},t.data,e));typeof t.data=="object"&&t.data.id?winkstart.request(!0,"queue.update",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url,queue_id:t.data.id,data:s},function(e,t){typeof n=="function"&&n(e,t,"update")},function(e,t){typeof r=="function"&&r(e,t,"update")}):winkstart.request(!0,"queue.create",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url,data:s},function(e,t){typeof n=="function"&&n(e,t,"create")},function(e,t){typeof r=="function"&&r(e,t,"update")})},update_single_user:function(e,t,n,r){var i=this;winkstart.request(!1,"user.get",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url,user_id:e},function(i,s){if(n=="add"){if(!i.data.queues||typeof i.data.queues!="object")i.data.queues=[];i.data.queues.push(t),"queue_pin"in i.data||(i.data.queue_pin="")}else i.data.queues.splice(i.data.queues.indexOf(t),1);winkstart.request(!1,"user.update",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url,user_id:e,data:i.data},function(e,t){typeof r=="function"&&r(t)},function(e,t){typeof r=="function"&&r(t)})})},update_users:function(e,t,n){var r=this;r.queue_update_users(e.new_list,t,function(){typeof n=="function"&&n()})},edit_queue:function(e,t,n,r,i){var s=this,o=t||$("#queue-content"),u=n||$("#queue-view",o),r=r||{},a={save_success:r.save_success||function(e){s.render_list(o),s.edit_queue({id:e.data.id},o,u,a)},save_error:r.save_error,delete_success:r.delete_success||function(){u.empty(),s.render_list(o)},delete_error:r.delete_error,after_render:r.after_render},f={data:$.extend(!0,{connection_timeout:"0",member_timeout:"5",agent_wrapup_time:"30",record_caller:!0,moh:{},notifications:{},max_queue_size:"0"},i||{}),field_data:{}};winkstart.request(!0,"queue.media_list",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(t,n){t.data.unshift({id:"",name:_t("queue","default_music")},{id:"silence_stream://300000",name:_t("queue","silence")}),f.field_data.media=t.data,winkstart.request(!0,"queue.user_list",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(t,n){f.field_data.users={},$.each(t.data,function(e,t){f.field_data.users[t.id]=t}),typeof e=="object"&&e.id?winkstart.request(!0,"queue.get",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url,queue_id:e.id},function(e,t){var n=$.extend(!0,f,e);n.field_data.old_list=[],n.stats={},"agents"in e.data&&(n.field_data.old_list=e.data.agents),s.render_edit_agents(n,u,a),typeof a.after_render=="function"&&a.after_render()}):(s.render_queue(f,u,a),typeof a.after_render=="function"&&a.after_render())})})},delete_queue:function(e,t,n){var r=this;typeof e.data=="object"&&e.data.id&&winkstart.request(!0,"queue.delete",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url,queue_id:e.data.id},function(e,n){typeof t=="function"&&t(e,n)},function(e,t){typeof n=="function"&&n(e,t)})},render_account_fields:function(e,t,n){t._t=function(e){return window.translate.queue[e]};var r=this,i=r.templates.account_fields.tmpl(t);return $("*[rel=popover]",i).popover({trigger:"focus"}),$('*[rel=popover]:not([type="text"])',i).popover({trigger:"hover"}),e.find("#options").append(i),n&&n(),!1},render_edit_agents:function(e,t,n){e._t=function(e){return window.translate.queue[e]};var r=this,i=r.templates.edit_agents.tmpl(e);r.render_reports(e,i),r.render_user_list(e,i),$(".detail_queue",i).click(function(){r.popup_edit_queue(e,n)}),$(".view_stats",i).click(function(){winkstart.publish("dashboard.activate_queue_stat",{id:$(this).dataset("id"),parent:$("#ws-content")})}),t.empty().append(i)},render_queue:function(e,t,n){e._t=function(e){return window.translate.queue[e]};var r=this,i=r.templates.edit.tmpl(e);winkstart.validate.set(r.config.validation,i),$("*[rel=popover]",i).popover({trigger:"focus"}),$('*[rel=popover]:not([type="text"])',i).popover({trigger:"hover"}),winkstart.tabs($(".view-buttons",i),$(".tabs",i)),$("#moh",i).val()||$("#edit_link_media",i).hide(),$("#moh",i).change(function(){$("#moh option:selected",i).val()?$("#edit_link_media",i).show():$("#edit_link_media",i).hide()}),$(".inline_action_media",i).click(function(e){var t=$(this).dataset("action")=="edit"?{id:$("#moh",i).val()}:{},n=t.id;e.preventDefault(),winkstart.publish("media.popup_edit",t,function(e){n?"id"in e.data?$("#moh #"+e.data.id,i).text(e.data.name):($("#moh #"+n,i).remove(),$("#edit_link_media",i).hide()):($("#moh",i).append('<option id="'+e.data.id+'" value="'+e.data.id+'">'+e.data.name+"</option>"),$("#moh",i).val(e.data.id),$("#edit_link_media",i).show())})}),$(".queue-save",i).click(function(t){t.preventDefault(),winkstart.validate.is_valid(r.config.validation,i,function(){var t=form2object("queue-form");r.clean_form_data(t),r.save_queue(t,e,n.save_success,winkstart.error_message.process_error(n.save_error))},function(){winkstart.alert(_t("queue","there_were_errors_on_the_form"))})}),$(".queue-delete",i).click(function(t){t.preventDefault(),winkstart.confirm(_t("queue","this_will_remove_this_queue"),function(){r.delete_queue(e,n.delete_success,n.delete_error)})}),t.empty().append(i)},normalize_data:function(e){return delete e.users,e},clean_form_data:function(e){delete e.user_id},render_list:function(e,t){var n=this,r=e||$("#queue-content");winkstart.request(!0,"queue.list",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(e,n){var i=function(e){var t=[];return e.length>0&&$.each(e,function(e,n){t.push({id:n.id,title:n.name||_t("queue","no_name")})}),t.sort(function(e,t){return e.title.toLowerCase()<t.title.toLowerCase()?-1:1}),t};$("#queue-listpanel",r).empty().listpanel({label:"Queues",identifier:"queue-listview",new_entity_label:_t("queue","add_acd"),data:i(e.data),publisher:winkstart.publish,notifyMethod:"queue.edit",notifyCreateMethod:"queue.edit",notifyParent:r}),typeof t=="function"&&t()})},activate:function(e){var t=this,n=t.templates.queue.tmpl(),e=e||{};(e.parent||$("#ws-content")).empty().append(n),t.render_list(n,e.callback)},render_reports:function(e,t){var n=this,r=[];n.setup_reports(t),e.stats&&$.each(e.stats,function(t,n){n.calls&&$.each(n.calls,function(t,i){i.duration&&i.wait_time&&i.agent_id?i.agent_id in e.field_data.users?r.push([t,winkstart.friendly_seconds(i.duration),e.field_data.users[i.agent_id].first_name+" "+e.field_data.users[i.agent_id].last_name,n.recorded_at]):r.push([t,winkstart.friendly_seconds(i.duration),"Unknown",n.recorded_at]):r.push([t,"-","None ("+i.abandoned+")",n.recorded_at])})}),winkstart.table.reports.fnAddData(r)},render_user_list:function(e,t){var n=this,r={},i=[],s=[];n.setup_table(t),$.each(e.field_data.users,function(e,t){t.last_name&&s.indexOf(t.last_name.toLowerCase())<0&&s.push(t.last_name.toLowerCase())}),s.sort();var o=function(e,t){t.last_name&&(i[s.indexOf(t.last_name.toLowerCase())]?i[s.indexOf(t.last_name.toLowerCase())].push({first_name:t.first_name,last_name:t.last_name,id:t.id}):i[s.indexOf(t.last_name.toLowerCase())]=[{first_name:t.first_name,last_name:t.last_name,id:t.id}])};e.data.id&&"agents"in e.data&&e.data.agents.length>0?($.each(e.field_data.users,function(t,n){e.data.agents.indexOf(n.id)>=0&&(r[n.id]={first_name:n.first_name,last_name:n.last_name,id:n.id}),o(t,n)}),n.refresh_table(r)):$.each(e.field_data.users,function(e,t){o(e,t)}),$("#select_all_agents",t).click(function(){$(".select_agent",t).prop("checked",$(this).is(":checked"))}),$("#add_agents",t).click(function(t){t.preventDefault();var s=n.templates.add_agents.tmpl({_t:function(e){return window.translate.queue[e]}}),o=winkstart.dialog(s,{title:_t("queue","select_agents")}),u=0;$.each(i,function(e,t){$.each(t,function(e,t){t.id in r?(u++,$(".list_agents",o).append(n.templates.selected_agent.tmpl(t))):$(".unassigned_users",o).append(n.templates.available_user.tmpl(t))})}),$(".count_agents",o).html(u),$(".new_searchfield",o).keyup(function(){var e=$(this),t=$(".unassigned_users .user_box",o),n=$.trim(e.val().toLowerCase()),r=[],i={};$.each(t,function(e,t){var n=$(this).dataset(),r=n.first_name.toLowerCase()+" "+n.last_name.toLowerCase();i[r]?i[r].push($(this)):i[r]=[$(this)]}),n?(t.hide(),$.each(i,function(e,t){e.indexOf(n)>-1&&$.each(t,function(e,t){r.push(t)})}),$.each(r,function(e,t){$(t).show()})):t.show()}),$(o).delegate(".queue_agent","click",function(){$(".unassigned_users",o).prepend(n.templates.available_user.tmpl($(this).dataset())),$(this).remove(),$(".count_agents",o).html(--u)}),$(o).delegate(".user_box","click",function(){$(".list_agents",o).prepend(n.templates.selected_agent.tmpl($(this).dataset())),$(this).remove(),$(".count_agents",o).html(++u)}),$(".create-agent",o).click(function(){var e={};t.preventDefault(),winkstart.publish("user.popup_edit",e,function(e){var t={first_name:e.data.first_name,last_name:e.data.last_name,id:e.data.id};$(".unassigned_users",o).prepend(n.templates.available_user.tmpl(t))})}),$(".add-agents",o).click(function(){new_list=[],$(".list_agents .queue_agent",o).each(function(e,t){new_list.push($(this).dataset("id"))}),e.field_data.user_list={old_list:e.data.agents||[],new_list:new_list},n.update_users(e.field_data.user_list,e.data.id,function(){n.edit_queue({id:e.data.id}),$(o).dialog("close")})})}),$("#remove_agents",t).click(function(r){r.preventDefault();if($(".select_agent:checked",t).size()>0){var i={};$.each(e.data.agents,function(e,t){i[t]=!0}),$(".select_agent:checked",t).each(function(e,t){delete i[$(this).dataset("id")]}),e.field_data.user_list={old_list:e.data.agents||[],new_list:[]},$.each(i,function(t,n){e.field_data.user_list.new_list.push(t)}),n.update_users(e.field_data.user_list,e.data.id,function(){n.edit_queue({id:e.data.id})})}else winkstart.alert(_t("queue","you_didnt_select_any_agent"))}),$(t).delegate(".action_user.edit","click",function(){var e={id:$(this).parents("tr").first().attr("id")};winkstart.publish("user.popup_edit",e,function(e){r[e.data.id]={first_name:e.data.first_name,last_name:e.data.last_name},n.refresh_table(r)})})},refresh_table:function(e){var t=this,n=[];winkstart.table.agents.fnClearTable(),$.each(e,function(e,t){n.push([e,e,t.first_name+" "+t.last_name,e])}),winkstart.table.agents.fnAddData(n)},setup_reports:function(e){var t=this,n=[{sTitle:_t("queue","call_id_title")},{sTitle:_t("queue","duration_title")},{sTitle:_t("queue","agent_title")},{sTitle:_t("queue","recorded_at_title"),fnRender:function(e){var t=e.aData[e.iDataColumn];return winkstart.friendly_timestamp(t)}}];winkstart.table.create("reports",$("#reports-grid",e),n,{},{sDom:'<"buttons_div">frtlip',bAutoWidth:!1,aaSorting:[[3,"desc"]]}),$("#reports-grid_filter input[type=text]",e).first().focus(),$(".cancel-search",e).click(function(){$("#reports-grid_filter input[type=text]",e).val(""),winkstart.table.reports.fnFilter("")})},setup_table:function(e){var t=this,n=[{sTitle:'<input type="checkbox" id="select_all_agents"/>',fnRender:function(e){var t=e.aData[e.iDataColumn];return'<input data-id="'+t+'" type="checkbox" class="select_agent"/>'},bSortable:!1,sWidth:"5%"},{sTitle:"ID",bVisible:!1},{sTitle:'<span class="icon medium user"></span> User',sWidth:"80%",fnRender:function(e){var t=e.aData[e.iDataColumn];return'<a class="action_user edit">'+t+"</a>"}},{sTitle:_t("queue","actions_title"),sWidth:"15%",bSortable:!1,fnRender:function(e){var t=e.aData[e.iDataColumn];return'<a class="action_user edit icon medium pencil" data-id="'+t+'"></a>'}}];winkstart.table.create("agents",$("#agents-grid",e),n,{},{sDom:'<"buttons_div">frtlip',bAutoWidth:!1,aaSorting:[[2,"asc"]],fnRowCallback:function(e,t,n){return $(e).attr("id",t[1]),e}}),$("#agents .buttons_div",e).html('<button class="btn primary" id="add_agents">'+_t("queue","add_agents")+'</button>&nbsp;<button class="btn danger" id="remove_agents">'+_t("queue","remove_selected_agents")+"</button>"),$("#agents-grid_filter input[type=text]",e).first().focus(),$(".cancel-search",e).click(function(){$("#agents-grid_filter input[type=text]",e).val(""),winkstart.table.agents.fnFilter("")})},popup_edit_queue:function(e,t,n){var r=this,i=winkstart.dialog($('<div class="inline_popup"><div class="inline_content main_content"/></div>'),{title:_t("queue","edit_queue_title"),position:["center",100]});r.render_queue(e,$(".main_content",i),{save_success:function(e){i.dialog("close"),typeof t.save_success=="function"&&t.save_success(e)},delete_success:function(){i.dialog("close"),typeof t.delete_success=="function"&&t.delete_success({data:{}})}},n)},define_callflow_nodes:function(e){var t=this;$.extend(e,{"acdc_member[id=*]":{name:_t("queue","queue"),icon:"queue",category:_t("config","call_center_cat"),module:"acdc_member",tip:_t("queue","queue_tip"),data:{id:"null"},rules:[{type:"quantity",maxSize:"1"}],isUsable:"true",caption:function(e,t){var n=e.getMetadata("id"),r="";return n in t&&(r=t[n].name),r},edit:function(e,n){var r=this;winkstart.request(!0,"queue.list",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(r,i){var s,o;o=t.templates.queue_callflow.tmpl({_t:function(e){return window.translate.queue[e]},title:_t("queue","connect_a_caller_to_a_queue"),items:r.data,selected:e.getMetadata("id")||"",route_var:e.getMetadata("var")||""}),$("#queue_selector option:selected",o).val()==undefined&&$("#edit_link",o).hide(),$(".inline_action",o).click(function(t){var n=$(this).dataset("action")=="edit"?{id:$("#queue_selector",o).val()}:{};t.preventDefault(),winkstart.publish("queue.popup_edit",n,function(t){e.setMetadata("id",t.data.id||"null"),$("#route_var",o).val().length>0?e.setMetadata("var",$("#route_var",o).val()):e.deleteMetadata("var"),e.caption=t.data.name||"",s.dialog("close")})}),$("#toggle_advanced",o).click(function(){$("#route_var_div",o).toggle()}),$("#add",o).click(function(){e.setMetadata("id",$("#queue_selector",s).val()),$("#route_var",o).val().length>0?e.setMetadata("var",$("#route_var",o).val()):e.deleteMetadata("var"),e.caption=$("#queue_selector option:selected",s).text(),s.dialog("close")}),s=winkstart.dialog(o,{title:_t("queue","queue_title"),minHeight:"0",beforeClose:function(){typeof n=="function"&&n()}})})}},"acdc_queue[id=*,action=login]":{name:_t("queue","queue_login"),icon:"queue",category:_t("config","call_center_cat"),module:"acdc_queue",tip:_t("queue","queue_login_tip"),data:{id:"null",action:"login"},rules:[{type:"quantity",maxSize:"1"}],isUsable:"true",caption:function(e,t){var n=e.getMetadata("id"),r="";return n in t&&(r=t[n].name),r},edit:function(e,n){var r=this;winkstart.request(!0,"queue.list",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(r,i){var s,o;o=t.templates.queue_callflow.tmpl({_t:function(e){return window.translate.queue[e]},title:_t("queue","connects_an_agent_to_a_queue"),items:r.data,selected:e.getMetadata("id")||""}),$("#queue_selector option:selected",o).val()==undefined&&$("#edit_link",o).hide(),$(".inline_action",o).click(function(t){var n=$(this).dataset("action")=="edit"?{id:$("#queue_selector",o).val()}:{};t.preventDefault(),winkstart.publish("queue.popup_edit",n,function(t){e.setMetadata("id",t.data.id||"null"),e.caption=t.data.name||"",s.dialog("close")})}),$("#add",o).click(function(){e.setMetadata("id",$("#queue_selector",s).val()),e.caption=$("#queue_selector option:selected",s).text(),s.dialog("close")}),s=winkstart.dialog(o,{title:_t("queue","queue_title"),minHeight:"0",beforeClose:function(){typeof n=="function"&&n()}})})}},"acdc_queue[id=*,action=logout]":{name:_t("queue","queue_logout"),icon:"queue",category:_t("config","call_center_cat"),module:"acdc_queue",tip:_t("queue","queue_logout_tip"),data:{id:"null",action:"logout"},rules:[{type:"quantity",maxSize:"1"}],isUsable:"true",caption:function(e,t){var n=e.getMetadata("id"),r="";return n in t&&(r=t[n].name),r},edit:function(e,n){var r=this;winkstart.request(!0,"queue.list",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(r,i){var s,o;o=t.templates.queue_callflow.tmpl({_t:function(e){return window.translate.queue[e]},title:_t("queue","disconnects_an_agent_from_a_queue"),items:r.data,selected:e.getMetadata("id")||""}),$("#queue_selector option:selected",o).val()==undefined&&$("#edit_link",o).hide(),$(".inline_action",o).click(function(t){var n=$(this).dataset("action")=="edit"?{id:$("#queue_selector",o).val()}:{};t.preventDefault(),winkstart.publish("queue.popup_edit",n,function(t){e.setMetadata("id",t.data.id||"null"),e.caption=t.data.name||"",s.dialog("close")})}),$("#add",o).click(function(){e.setMetadata("id",$("#queue_selector",s).val()),e.caption=$("#queue_selector option:selected",s).text(),s.dialog("close")}),s=winkstart.dialog(o,{title:_t("queue","queue_title"),minHeight:"0",beforeClose:function(){typeof n=="function"&&n()}})})}},"acdc_agent[action=pause]":{name:_t("queue","agent_pause"),icon:"rightarrow",category:_t("config","call_center_cat"),module:"acdc_agent",tip:_t("queue","agent_pause_tip"),data:{action:"pause",timeout:"900",presence_id:""},rules:[{type:"quantity",maxSize:"1"}],isUsable:"true",caption:function(e,t){var n=e.getMetadata("timeout");return n+" seconds"},edit:function(e,n){var r,i;i=t.templates.agent_pause_callflow.tmpl({_t:function(e){return window.translate.queue[e]},data_agent:{timeout:e.getMetadata("timeout")||"900",presence_id:e.getMetadata("presence_id")}}),$("#add",i).click(function(){var t=parseInt($("#timeout",i).val()),n=$("#presence_id",i).val();t>0?(e.setMetadata("timeout",t),e.setMetadata("presence_id",n),e.caption=t+_t("queue","seconds"),r.dialog("close")):winkstart.alert(_t("queue","please_enter_a_valid_number_of_seconds"))}),r=winkstart.dialog(i,{title:_t("queue","pause_agent_title"),minHeight:"0",beforeClose:function(){typeof n=="function"&&n()}}),typeof n=="function"&&n()}},"acdc_agent[action=resume]":{name:_t("queue","agent_resume"),icon:"rightarrow",category:_t("config","call_center_cat"),module:"acdc_agent",tip:_t("queue","agent_resume_tip"),data:{action:"resume",presence_id:""},rules:[{type:"quantity",maxSize:"1"}],isUsable:"true",caption:function(e,t){return""},edit:function(e,n){var r,i;i=t.templates.agent_presence_callflow.tmpl({_t:function(e){return window.translate.queue[e]},data_agent:{action:_t("queue","resume_action"),presence_id:e.getMetadata("presence_id")}}),$("#add",i).click(function(){var t=$("#presence_id",i).val();e.setMetadata("presence_id",t),r.dialog("close")}),r=winkstart.dialog(i,{title:_t("queue","agent_resume_title"),minHeight:"0",beforeClose:function(){typeof n=="function"&&n()}}),typeof n=="function"&&n()}},"acdc_agent[action=logout]":{name:_t("queue","logout_agent"),icon:"rightarrow",category:_t("config","call_center_cat"),module:"acdc_agent",tip:_t("queue","logout_agent_tip"),data:{action:"logout",presence_id:""},rules:[{type:"quantity",maxSize:"1"}],isUsable:"true",caption:function(e,t){return""},edit:function(e,n){var r,i;i=t.templates.agent_presence_callflow.tmpl({_t:function(e){return window.translate.queue[e]},data_agent:{action:_t("queue","logout_action"),presence_id:e.getMetadata("presence_id")}}),$("#add",i).click(function(){var t=$("#presence_id",i).val();e.setMetadata("presence_id",t),r.dialog("close")}),r=winkstart.dialog(i,{title:_t("queue","logout_agent_title"),minHeight:"0",beforeClose:function(){typeof n=="function"&&n()}}),typeof n=="function"&&n()}},"acdc_agent[action=login]":{name:_t("queue","login_agent"),icon:"rightarrow",category:_t("config","call_center_cat"),module:"acdc_agent",tip:_t("queue","login_agent_tip"),data:{action:"login",presence_id:""},rules:[{type:"quantity",maxSize:"1"}],isUsable:"true",caption:function(e,t){return""},edit:function(e,n){var r,i;i=t.templates.agent_presence_callflow.tmpl({_t:function(e){return window.translate.queue[e]},data_agent:{action:_t("queue","login_action"),presence_id:e.getMetadata("presence_id")}}),$("#add",i).click(function(){var t=$("#presence_id",i).val();e.setMetadata("presence_id",t),r.dialog("close")}),r=winkstart.dialog(i,{title:_t("queue","login_agent_title"),minHeight:"0",beforeClose:function(){typeof n=="function"&&n()}}),typeof n=="function"&&n()}}})}});