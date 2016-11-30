winkstart.module("call_center","dashboard",{css:["css/dashboard.css"],templates:{dashboard:"tmpl/dashboard.html",agents_dashboard:"tmpl/agents_dashboard.html",calls_dashboard:"tmpl/calls_dashboard.html",queues_dashboard:"tmpl/queues_dashboard.html",list_devices:"tmpl/list_devices.html",call:"tmpl/call_list_element.html"},subscribe:{"dashboard.activate":"activate","dashboard.activate_queue_stat":"activate_queue_stat"},resources:{"dashboard.queue_eavesdrop":{url:"{api_url}/accounts/{account_id}/queues/{queue_id}/eavesdrop",contentType:"application/json",verb:"PUT"},"dashboard.call_eavesdrop":{url:"{api_url}/accounts/{account_id}/queues/eavesdrop",contentType:"application/json",verb:"PUT"},"dashboard.list_devices":{url:"{api_url}/accounts/{account_id}/devices",contentType:"application/json",verb:"GET"},"dashboard.agents.livestats":{url:"{api_url}/accounts/{account_id}/agents/stats",contentType:"application/json",verb:"GET",trigger_events:!1},"dashboard.agents.status":{url:"{api_url}/accounts/{account_id}/agents/status",contentType:"application/json",verb:"GET",trigger_events:!1},"dashboard.queues.livestats":{url:"{api_url}/accounts/{account_id}/queues/stats",contentType:"application/json",verb:"GET",trigger_events:!1},"dashboard.queues.stats":{url:"{api_url}/accounts/{account_id}/queues/stats",contentType:"application/json",verb:"GET",trigger_events:!1},"dashboard.agents.stats":{url:"{api_url}/accounts/{account_id}/agents/stats",contentType:"application/json",verb:"GET",trigger_events:!1},"dashboard.queues.list":{url:"{api_url}/accounts/{account_id}/queues",contentType:"application/json",verb:"GET",trigger_events:!1},"dashboard.agents.list":{url:"{api_url}/accounts/{account_id}/agents",contentType:"application/json",verb:"GET",trigger_events:!1},"dashboard.queues.stats_loading":{url:"{api_url}/accounts/{account_id}/queues/stats",contentType:"application/json",verb:"GET"},"dashboard.agents.stats_loading":{url:"{api_url}/accounts/{account_id}/agents/stats",contentType:"application/json",verb:"GET"},"dashboard.agents.status_loading":{url:"{api_url}/accounts/{account_id}/agents/status",contentType:"application/json",verb:"GET"},"dashboard.queues.list_loading":{url:"{api_url}/accounts/{account_id}/queues",contentType:"application/json",verb:"GET"},"dashboard.agents.list_loading":{url:"{api_url}/accounts/{account_id}/agents",contentType:"application/json",verb:"GET"},"dashboard.agents.livestats_loading":{url:"{api_url}/accounts/{account_id}/agents/stats",contentType:"application/json",verb:"GET"},"dashboard.queues.livestats_loading":{url:"{api_url}/accounts/{account_id}/queues/stats",contentType:"application/json",verb:"GET"}}},function(e){var t=this;winkstart.registerResources(t.__whapp,t.config.resources),winkstart.publish("whappnav.subnav.add",{whapp:"call_center",module:t.__module,label:_t("dashboard","dashboard"),icon:"graph1_box",weight:"20"})},{global_timer:!1,current_queue_id:undefined,hide_logout:!1,map_timers:{calls_waiting:{},calls_in_progress:{}},render_global_data:function(e,t,n){var r=this,i=$.extend({},e,{show_queues:r.show_queues,hide_logout:r.hide_logout,_t:function(e){return window.translate.dashboard[e]}}),s=r.templates.agents_dashboard.tmpl(i),o=r.templates.queues_dashboard.tmpl(i),u=r.templates.calls_dashboard.tmpl(i),a=n||$("#ws-content"),f=$(".topbar-right .list_queues_inner",a).scrollLeft()||0;$("#dashboard-view",a).empty().append(s),$(".topbar-right",a).empty().append(o),$(".topbar-right .list_queues_inner",a).animate({scrollLeft:f},0),$("#callwaiting-list .list-panel-anchor ul",a).empty().append(u),r.render_timers(i),t&&r.detail_stat(t,a)},poll_agents:function(e,t){var n=this,r=t,i=2,s={},o=0,u,a=e,f=!1,l=function(){var e=$.extend(!0,{},{agents:a.agents,queues:a.queues});f===!1&&winkstart.parallel({get_queues:function(e){n.get_queues_livestats(!1,function(t){e(null,t)})},get_agents:function(e){n.get_agents_livestats(!1,function(t){e(null,t)})},get_status:function(e){n.get_agents_status(!1,function(t){e(null,t)},function(t){e(null,{})})}},function(t,r){e=n.format_live_data(e,{queues_live_stats:r.get_queues.data,agents_live_stats:r.get_agents.data,agents_live_status:r.get_status.data}),n.render_global_data(e,n.current_queue_id)})},c=function(){$("#dashboard-content").size()===0?n.clean_timers():++o%30===0?n.fetch_all_data(!1,function(e){n.render_global_data(e,n.current_queue_id),a=e}):l()};$.each(e.agents,function(e,t){s[t.id]="logged_out"}),n.global_timer=setInterval(c,i*1e3)},get_queues_livestats:function(e,t,n){var r=e?"dashboard.queues.livestats_loading":"dashboard.queues.livestats";winkstart.request(r,{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(e,n){typeof t=="function"&&t(e,n)},function(e,t){typeof n=="function"&&n(e,t)})},get_agents_status:function(e,t,n){var r=e?"dashboard.agents.status_loading":"dashboard.agents.status";winkstart.request(r,{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(e,n){typeof t=="function"&&t(e,n)},function(e,t){typeof n=="function"&&n(e,t)})},get_agents_livestats:function(e,t,n){var r=e?"dashboard.agents.livestats_loading":"dashboard.agents.livestats";winkstart.request(r,{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(e,n){typeof t=="function"&&t(e,n)},function(e,t){typeof n=="function"&&n(e,t)})},get_agents_stats:function(e,t,n){var r=e?"dashboard.agents.stats_loading":"dashboard.agents.stats";winkstart.request(r,{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(e,n){typeof t=="function"&&t(e,n)},function(e,t){typeof n=="function"&&n(e,t)})},get_queues_stats:function(e,t,n){var r=e?"dashboard.queues.stats_loading":"dashboard.queues.stats";winkstart.request(r,{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(e,n){typeof t=="function"&&t(e,n)},function(e,t){typeof n=="function"&&n(e,t)})},get_queues:function(e,t,n){var r=e?"dashboard.queues.list_loading":"dashboard.queues.list";winkstart.request(r,{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(e,n){typeof t=="function"&&t(e,n)},function(e,t){typeof n=="function"&&n(e,t)})},get_agents:function(e,t,n){var r=e?"dashboard.agents.list_loading":"dashboard.agents.list";winkstart.request(r,{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(e,n){typeof t=="function"&&t(e,n)},function(e,t){typeof n=="function"&&n(e,t)})},render_callwaiting_list:function(e){var t=this,n=e||$("#dashboard-content");$("#callwaiting-list",n).empty().listpanel({label:"Call Waiting",identifier:"callwaiting-listview",data:[]}),$(".add_flow",n).empty().html(_t("dashboard","call_waiting_log"))},get_time_seconds:function(e){var e=Math.floor(e),t=Math.floor(e/3600),n=Math.floor(e/60)%60,r=e%60,i=(t<10?"0"+t:""+t)+":"+(n<10?"0"+n:""+n)+":"+(r<10?"0"+r:""+r);return e>=0?i:"00:00:00"},start_timer:function(e,t,n){var r=this,i,s=t.id,o=t.data,u=n||"increment";e==="in_progress"||e==="agent_status"?i=$(".agent_wrapper#"+s+" .call_time .data_value"):e==="waiting"&&(i=$('.call-waiting[data-call_id="'+s+'"] .timer')),r.map_timers[e]||(r.map_timers[e]={}),r.map_timers[e][s]=o,r.map_timers[e][s].timer=setInterval(function(){if(i.size()>0)if(u==="decrement"){var t=--r.map_timers[e][s].duration;i.html(r.get_time_seconds(t>0?t:0))}else i.html(r.get_time_seconds(++r.map_timers[e][s].duration));else clearInterval(r.map_timers[e][s].timer),delete r.map_timers[e][s]},1e3)},render_timers:function(e){var t=this;$.each(t.map_timers,function(e,t){$.each(t,function(e,t){clearInterval(t.timer)})}),t.map_timers={waiting:{},in_progress:{}},e.calls_waiting&&$.each(e.calls_waiting,function(n,r){r.duration=e.current_timestamp-r.entered_timestamp,t.start_timer("waiting",{data:r,id:n})}),e.calls_in_progress&&$.each(e.calls_in_progress,function(n,r){r.duration=e.current_timestamp-r.handled_timestamp,t.start_timer("in_progress",{data:r,id:r.agent_id})}),e.agent_status&&("busy"in e.agent_status&&$.each(e.agent_status.busy,function(n,r){r.duration=e.current_timestamp-r.timestamp,t.start_timer("agent_status",{data:r,id:n})}),"wrapup"in e.agent_status&&$.each(e.agent_status.wrapup,function(n,r){r.duration=r.wait_time-(e.current_timestamp-r.timestamp),t.start_timer("agent_status",{data:r,id:n},"decrement")}),"paused"in e.agent_status&&$.each(e.agent_status.paused,function(n,r){"pause_time"in r?(r.duration=r.pause_time-(e.current_timestamp-r.timestamp),t.start_timer("agent_status",{data:r,id:n},"decrement")):(r.duration=e.current_timestamp-r.timestamp,t.start_timer("agent_status",{data:r,id:n}))}))},format_live_data:function(e,t){var n=this,r={};return e.current_timestamp=t.queues_live_stats.current_timestamp,e.calls_waiting={},e.calls_in_progress={},e.agent_status={busy:{},wrapup:{},paused:{}},$.each(e.queues,function(e,t){t.abandoned_calls=0,t.average_hold_time=n.get_time_seconds(0),t.current_calls=0,t.total_calls=0,t.total_wait_time=0}),t.agents_live_status&&$.each(t.agents_live_status,function(t,i){if(t in e.agents){i.status==="outbound"&&(i.status="busy"),i.status==="connected"&&(i.status="handling");var s=i.status;e.agents[t].status=s,e.agents[t].status_started=i.timestamp,$.inArray(s,["busy","wrapup","paused"])>=0?(e.agent_status[s][t]=i,s==="busy"?e.agents[t].call_time=n.get_time_seconds(e.current_timestamp-i.timestamp):s==="paused"?"pause_time"in i?e.agents[t].call_time=n.get_time_seconds(i.pause_time-(e.current_timestamp-i.timestamp)):e.agents[t].call_time=n.get_time_seconds(e.current_timestamp-i.timestamp):e.agents[t].call_time=n.get_time_seconds(i.wait_time-(e.current_timestamp-i.timestamp))):s==="connecting"&&(e.agents[t].current_call={friendly_title:i.caller_id_name||i.caller_id_number||i.call_id}),s!=="logged_out"&&$.each(e.agents[t].queues_list,function(e,t){e in r?r[e]++:r[e]=1})}}),$.each(r,function(t,n){t in e.queues&&(e.queues[t].current_agents=n||0)}),$.each(t.agents_live_stats,function(t,n){t in e.agents&&(e.agents[t].missed_calls=n.missed_calls||0,e.agents[t].total_calls=n.total_calls||0,"queues"in n&&$.each(n.queues,function(n,r){n in e.agents[t].queues_list&&(e.agents[t].queues_list[n]={missed_calls:r.missed_calls||0,total_calls:r.total_calls||0})}))}),"stats"in t.queues_live_stats&&$.each(t.queues_live_stats.stats,function(t,r){var i=r.queue_id,s=r.call_id;e.queues[i].current_calls=e.queues[i].current_calls||0,"wait_time"in r&&r.status!=="abandoned"&&(e.queues[i].total_wait_time+=r.wait_time),r.status==="abandoned"?(e.queues[i].abandoned_calls++,e.queues[i].total_calls++):r.status==="waiting"?(e.calls_waiting[s]=r,e.calls_waiting[s].friendly_duration=n.get_time_seconds(e.current_timestamp-r.entered_timestamp),e.calls_waiting[s].friendly_title=r.caller_id_name||r.caller_id_number||s,e.queues[i].current_calls++):r.status==="handled"?(e.calls_in_progress[s]=r,e.agents[r.agent_id].call_time=n.get_time_seconds(e.current_timestamp-r.handled_timestamp),e.agents[r.agent_id].current_call=r,e.agents[r.agent_id].current_call.friendly_title=r.caller_id_name||r.caller_id_number||s,e.queues[i].total_calls++,e.queues[i].current_calls++):r.status==="processed"&&e.queues[i].total_calls++}),$.each(e.queues,function(e,t){if(t.total_calls>0){var r=t.total_calls-t.abandoned_calls;t.average_hold_time=n.get_time_seconds(t.total_wait_time/r)}}),e},format_data:function(e){var t=this,n={};return n.queues={},$.each(e.queues,function(e,r){n.queues[r.id]=$.extend(!0,{current_calls:0,total_calls:0,current_agents:0,max_agents:0,average_hold_time:t.get_time_seconds(0),total_wait_time:0,abandoned_calls:0},r)}),n.agents={},$.each(e.agents,function(e,t){t.queues&&t.queues.length>0&&(n.agents[t.id]=$.extend(!0,{status:"logged_out",missed_calls:0,total_calls:0,queues_list:{}},t)),$.each(t.queues,function(e,r){r in n.queues&&(n.queues[r].max_agents++,n.agents[t.id].queues_list[r]={missed_calls:0,total_calls:0})})}),n=t.format_live_data(n,e),n},render_dashboard:function(e,t){var n=this,r=e;n.clean_timers(),n.fetch_all_data(!0,function(e){e._t=function(e){return window.translate.dashboard[e]},dashboard_html=n.templates.dashboard.tmpl({_t:function(e){return window.translate.dashboard[e]}}),n.templates.queues_dashboard.tmpl(e).appendTo($(".topbar-right",dashboard_html)),n.templates.agents_dashboard.tmpl(e).appendTo($("#dashboard-view",dashboard_html)),n.templates.calls_dashboard.tmpl(e).appendTo($("#callwaiting-list .list-panel-anchor ul",dashboard_html)),n.poll_agents(e,r),r.empty().append(dashboard_html),n.render_callwaiting_list(dashboard_html),n.bind_live_events(r),n.render_timers(e),typeof t=="function"&&t()})},fetch_all_data:function(e,t){var n=this;winkstart.parallel({queues_livestats:function(t){n.get_queues_livestats(e,function(e){t(null,e)})},agents_livestats:function(t){n.get_agents_livestats(e,function(e){t(null,e)})},agents_status:function(t){n.get_agents_status(e,function(e){t(null,e)},function(e){t(null,{})})},queues:function(t){n.get_queues(e,function(e){t(null,e)})},agents:function(t){n.get_agents(e,function(e){t(null,e)})}},function(e,r){var i={queues:r.queues.data,agents:r.agents.data,agents_live_stats:r.agents_livestats.data,queues_live_stats:r.queues_livestats.data,agents_live_status:r.agents_status.data};i=n.format_data(i),typeof t=="function"&&t(i)})},eavesdrop_popup:function(e,t){var n=this;winkstart.request("dashboard.list_devices",{account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url},function(r,i){var s=n.templates.list_devices.tmpl({objects:{items:r.data},_t:function(e){return window.translate.dashboard[e]}});$("#ring",s).click(function(){var n={account_id:winkstart.apps.call_center.account_id,api_url:winkstart.apps.call_center.api_url,data:{id:$("#object-selector",s).val()}};e==="call"?n.data.call_id=t.call_id:e==="queue"&&(n.queue_id=t.queue_id),winkstart.request("dashboard."+e+"_eavesdrop",n,function(e,t){popup.dialog("close")},function(e,t){winkstart.alert(_t("dashboard","eavesdrop_request_failed")+t)})}),$("#cancel",s).click(function(){popup.dialog("close")}),popup=winkstart.dialog(s,{title:_t("dashboard","devices_title")})})},bind_live_events:function(e){var t=this;$("#hide_logout_agents",e).die().live("click",function(n){var r=$(this).is(":checked");t.hide_logout=r,r?$("#agents-view",e).addClass("hide-logout"):$("#agents-view",e).removeClass("hide-logout")}),$(".toggle-button",e).die().live("click",function(t){var n=$(".topbar-right",e),r=$(".list-panel-anchor",e),i;n.is(":hidden")?(i=r.outerHeight()-n.outerHeight()+"px",$(".toggle-button",e).html(_t("dashboard","hide_queues_html"))):(i=r.outerHeight()+n.outerHeight()+"px",$(".toggle-button",e).html(_t("dashboard","show_queues_html"))),r.css({"min-height":i,height:i}),r.data("jsp").reinitialise(),n.toggle()}),$(".list_queues_inner > li",e).die().live("click",function(n){if(!$(n.target).hasClass("eavesdrop_queue")){var r=$(this),i=r.attr("id");r.hasClass("active")?(t.current_queue_id=undefined,$(".agent_wrapper",e).css("display","inline-block"),$(".all_data",e).show(),$(".queue_data",e).hide(),$("#callwaiting-list li",e).show(),$(".icon.edit_queue",e).hide(),$(".icon.eavesdrop_queue",e).hide(),$(".list_queues_inner > li",e).removeClass("active")):t.detail_stat(i,e)}}),$(".agent_wrapper .call .eavesdrop",e).die().live("click",function(){var e={call_id:$(this).data("call_id")};t.eavesdrop_popup("call",e)}),$(".list_queues_inner > li .eavesdrop_queue",e).die().live("click",function(){var e={queue_id:$(this).parents("li").first().attr("id")};t.eavesdrop_popup("queue",e)}),$(".list_queues_inner > li .edit_queue",e).die().live("click",function(){var e=$(this).parents("li").first().attr("id");winkstart.publish("queue.activate",{parent:$("#ws-content"),callback:function(){winkstart.publish("queue.edit",{id:e})}})})},detail_stat:function(e,t){var n=this,r=$("#"+e,t);n.current_queue_id=e,$(".list_queues_inner > li",t).removeClass("active"),$(".icon.edit_queue",t).hide(),$(".icon.eavesdrop_queue",t).hide(),$(".icon.edit_queue",r).show(),$(".icon.eavesdrop_queue",r).show(),r.addClass("active"),$("#callwaiting-list li",t).each(function(t,n){var r=$(n);r.dataset("queue_id")!==e?r.hide():r.show()}),$(".agent_wrapper",t).each(function(t,r){var i=$(r);i.dataset("queues").indexOf(e)<0?i.hide():(n.hide_logout||i.css("display","inline-block"),$(".all_data",i).hide(),$(".queue_stat",i).hide(),$(".queue_stat[data-id="+e+"]",i).show(),$(".queue_data",i).show())})},clean_timers:function(){var e=this;e.global_timer!==!1&&(clearInterval(e.global_timer),e.global_timer=!1),$.each(e.map_timers,function(e,t){$.each(t,function(e,t){clearInterval(t.timer)})}),e.map_timers={}},activate_queue_stat:function(e){var t=this,n=e.parent||$("#ws-content");n.empty(),t.render_dashboard(n,function(){var r=$("#"+e.id,n);t.detail_stat(e.id,n)})},activate:function(e){var t=this,n=e||$("#ws-content");n.empty(),t.current_queue_id=undefined,t.hide_logout=!1,t.render_dashboard(n)}});