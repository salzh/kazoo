define(["require","jquery","underscore","monster"],function(e){var t=e("jquery"),n=(e("underscore"),e("monster")),i={requests:{},subscribe:{"callflows.fetchActions":"groupsDefineActions"},groupsDefineActions:function(e){var n=this,i=e.actions;t.extend(i,{"ring_group[]":{name:n.i18n.active().oldCallflows.ring_group,icon:"ring_group",category:n.i18n.active().oldCallflows.basic_cat,module:"ring_group",tip:n.i18n.active().oldCallflows.ring_group_tip,data:{name:""},rules:[{type:"quantity",maxSize:"1"}],isUsable:"true",weight:20,caption:function(e,t){return e.getMetadata("name")||""},edit:function(e,t){n.groupsEditRingGroup(e,t)}},"page_group[]":{name:n.i18n.active().oldCallflows.page_group,icon:"ring_group",category:n.i18n.active().oldCallflows.advanced_cat,module:"page_group",tip:n.i18n.active().oldCallflows.page_group_tip,data:{name:""},rules:[{type:"quantity",maxSize:"1"}],isUsable:"true",weight:30,caption:function(e,t){return e.getMetadata("name")||""},edit:function(e,t){n.groupsEditPageGroup(e,t)}}})},groupsEditPageGroup:function(e,i){var a=this;a.groupsDeviceList(function(o){var s,c,l,r={},u=[],d=[],p=[];(l=e.getMetadata("endpoints"))&&t.each(t.extend(!0,{},l),function(e,t){t.name="Undefined Device",r[t.id]=t}),t.each(o,function(e,t){t.endpoint_type="device",t.id in r?(r[t.id].endpoint_type="device",r[t.id].owner_id=t.owner_id,r[t.id].name=t.name):d.push(t)}),d=n.util.sort(d),a.groupsGroupList(function(o){t.each(o,function(e,t){t.endpoint_type="group",t.id in r?(r[t.id].endpoint_type="group",r[t.id].name=t.name):u.push(t)}),u=n.util.sort(u),a.groupsUserList(function(o){t.each(o,function(e,t){t.name=t.first_name+" "+t.last_name,t.endpoint_type="user",t.id in r?(r[t.id].endpoint_type="user",r[t.id].name=t.name):p.push(t)}),p=n.util.sort(p),c=t(n.template(a,"groups-page_group_dialog",{form:{name:e.getMetadata("name")||""}})),t.each(u,function(){t("#groups_pane .connect.left",c).append(t(n.template(a,"groups-page_group_element",this)))}),t.each(d,function(){t("#devices_pane .connect.left",c).append(t(n.template(a,"groups-page_group_element",this)))}),t.each(p,function(){t("#users_pane .connect.left",c).append(t(n.template(a,"groups-page_group_element",this)))}),t.each(r,function(){this.endpoint_type&&t(".connect.right",c).append(t(n.template(a,"groups-page_group_element",this)))}),t("#name",c).bind("keyup blur change",function(){t(".column.right .title",c).html("Page Group - "+t(this).val())}),t("ul.settings1 > li > a",c).click(function(e){t(".pane_content",c).hide(),t(".searchfield",c).val(""),t(".column.left li",c).show(),t("ul.settings1 > li",c).removeClass("current");var n=t(this).attr("id");"users_tab_link"===n?t("#users_pane",c).show():"devices_tab_link"===n?t("#devices_pane",c).show():"groups_tab_link"===n&&t("#groups_pane",c).show(),t(this).parent().addClass("current")}),t(".searchsubmit2",c).click(function(){t(".searchfield",c).val(""),t(".column li",c).show()}),t("#devices_pane .searchfield",c).keyup(function(){t("#devices_pane .column.left li").each(function(){-1==t(".item_name",t(this)).html().toLowerCase().indexOf(t("#devices_pane .searchfield",c).val().toLowerCase())?t(this).hide():t(this).show()})}),t("#users_pane .searchfield",c).keyup(function(){t("#users_pane .column.left li").each(function(){-1==t(".item_name",t(this)).html().toLowerCase().indexOf(t("#users_pane .searchfield",c).val().toLowerCase())?t(this).hide():t(this).show()})}),t("#groups_pane .searchfield",c).keyup(function(){t("#groups_pane .column.left li").each(function(){-1==t(".item_name",t(this)).html().toLowerCase().indexOf(t("#groups_pane .searchfield",c).val().toLowerCase())?t(this).hide():t(this).show()})}),t.isEmptyObject(r)?t(".column.right .connect",c).addClass("no_element"):t(".column.right .connect",c).removeClass("no_element"),t(".column.left .options",c).hide(),t(".column.left .actions",c).hide(),t(".options .option.delay",c).bind("keyup",function(){t(this).parents("li").data("delay",t(this).val())}),t(".options .option.timeout",c).bind("keyup",function(){t(this).parents("li").data("timeout",t(this).val())}),t("#save_ring_group",c).click(function(){var n=t("#name",c).val();l=[],t(".right .connect li",c).each(function(){var e=t(this).data();delete e.owner_id,l.push(e)}),e.setMetadata("endpoints",l),e.setMetadata("name",n),e.caption=n,s.dialog("close")}),s=n.ui.dialog(c,{title:a.i18n.active().oldCallflows.page_group_title,beforeClose:function(){"function"==typeof i&&i()}}),t(".connect",s).sortable({connectWith:t(".connect.right",s),zIndex:2e3,helper:"clone",appendTo:t(".wrapper",s),scroll:!1,tolerance:"pointer",receive:function(e,i){var o,l=i.item[0].dataset,r=[];"device"===l.endpoint_type?(o=a.i18n.active().oldCallflows.the_owner_of_this_device_is_already,t(".connect.right li",c).each(function(){t(this).data("id")===l.owner_id&&r.push(t(this))})):"user"===l.endpoint_type&&(o=a.i18n.active().oldCallflows.this_user_has_already_some_devices,t(".connect.right li",c).each(function(){t(this).data("owner_id")===l.id&&r.push(t(this))})),r.length>0&&n.ui.confirm(o,function(){t.each(r,function(){h(this)})},function(){h(i.item)}),t(this).hasClass("right")&&(t(".options",i.item).show(),t(".actions",i.item).show(),t(".column.right .connect",s).removeClass("no_element"))}}),t(c).delegate(".trash","click",function(){var e=t(this).parents("li").first();h(e)}),t(".pane_content",c).hide(),t("#users_pane",c).show();var h=function(e){var i=e,o=i.data();o.name=jQuery.trim(t(".item_name",i).html()),t("#"+o.endpoint_type+"s_pane .connect.left",c).append(t(n.template(a,"groups-page_group_element",o))),i.remove(),0==t(".connect.right li",c).size()&&t(".column.right .connect",s).addClass("no_element"),-1==o.name.toLowerCase().indexOf(t("#"+o.endpoint_type+"s_pane .searchfield",c).val().toLowerCase())&&t("#"+o.id,c).hide()}})})})},groupsEditRingGroup:function(e,i){var a=this,o="20",s="0";a.groupsDeviceList(function(c){var l,r,u,d={},p=[],h=[],m=[];(u=e.getMetadata("endpoints"))&&t.each(t.extend(!0,{},u),function(e,t){t.name=a.i18n.active().oldCallflows.undefined_device,d[t.id]=t}),t.each(c,function(e,t){t.endpoint_type="device",t.id in d?(d[t.id].endpoint_type="device",d[t.id].owner_id=t.owner_id,d[t.id].name=t.name):(t.delay=s,t.timeout=o,h.push(t))}),h=n.util.sort(h),a.groupsGroupList(function(c){t.each(c,function(e,t){t.endpoint_type="group",t.id in d?(d[t.id].endpoint_type="group",d[t.id].name=t.name):(t.delay=s,t.timeout=o,p.push(t))}),p=n.util.sort(p),a.groupsUserList(function(c,f){t.each(c,function(e,t){t.name=t.first_name+" "+t.last_name,t.endpoint_type="user",t.id in d?(d[t.id].endpoint_type="user",d[t.id].name=t.name):(t.delay=s,t.timeout=o,m.push(t))}),m=n.util.sort(m),a.groupsMediaList(function(o){var s=o.sort(function(e,t){return e.name.toLowerCase()>t.name.toLowerCase()?1:-1});r=t(n.template(a,"groups-ring_group_dialog",{form:{name:e.getMetadata("name")||"",strategy:{items:[{id:"simultaneous",name:a.i18n.active().oldCallflows.at_the_same_time},{id:"single",name:a.i18n.active().oldCallflows.in_order}],selected:e.getMetadata("strategy")||"simultaneous"},timeout:e.getMetadata("timeout")||"30",ringback:{items:t.merge([{id:"default",name:a.i18n.active().oldCallflows["default"],"class":"uneditable"},{id:"silence_stream://300000",name:a.i18n.active().oldCallflows.silence,"class":"uneditable"}],s),selected:e.getMetadata("ringback")||"default"}}})),t.each(p,function(){t("#groups_pane .connect.left",r).append(t(n.template(a,"groups-ring_group_element",this)))}),t.each(h,function(){t("#devices_pane .connect.left",r).append(t(n.template(a,"groups-ring_group_element",this)))}),t.each(m,function(){t("#users_pane .connect.left",r).append(t(n.template(a,"groups-ring_group_element",this)))}),t.each(d,function(){this.endpoint_type&&t(".connect.right",r).append(t(n.template(a,"groups-ring_group_element",this)))}),t("#name",r).bind("keyup blur change",function(){t(".column.right .title",r).html(a.i18n.active().oldCallflows.ring_group_val+t(this).val())}),t("#ringback",r).change(function(e){t(this).find("option:selected").hasClass("uneditable")?t('.media_action[data-action="edit"]',r).hide():t('.media_action[data-action="edit"]',r).show()}),t(".media_action",r).click(function(e){var i="create"===t(this).data("action"),a=i?{}:{id:t("#ringback",r).val()};n.pub("callflows.media.editPopup",{data:a,callback:function(e){e.data&&e.data.id&&(i?t("#ringback",r).append('<option value="'+e.data.id+'">'+e.data.name+"</option>"):t('#ringback option[value="'+e.data.id+'"]',r).text(e.data.name),t("#ringback",r).val(e.data.id))}})}),t("ul.settings1 > li > a",r).click(function(e){t(".pane_content",r).hide(),t(".searchfield",r).val(""),t(".column.left li",r).show(),t("ul.settings1 > li",r).removeClass("current");var n=t(this).attr("id");"users_tab_link"===n?t("#users_pane",r).show():"devices_tab_link"===n?t("#devices_pane",r).show():"groups_tab_link"===n&&t("#groups_pane",r).show(),t(this).parent().addClass("current")}),t(".searchsubmit2",r).click(function(){t(".searchfield",r).val(""),t(".column li",r).show()}),t("#devices_pane .searchfield",r).keyup(function(){t("#devices_pane .column.left li").each(function(){-1==t(".item_name",t(this)).html().toLowerCase().indexOf(t("#devices_pane .searchfield",r).val().toLowerCase())?t(this).hide():t(this).show()})}),t("#users_pane .searchfield",r).keyup(function(){t("#users_pane .column.left li").each(function(){-1==t(".item_name",t(this)).html().toLowerCase().indexOf(t("#users_pane .searchfield",r).val().toLowerCase())?t(this).hide():t(this).show()})}),t("#groups_pane .searchfield",r).keyup(function(){t("#groups_pane .column.left li").each(function(){-1==t(".item_name",t(this)).html().toLowerCase().indexOf(t("#groups_pane .searchfield",r).val().toLowerCase())?t(this).hide():t(this).show()})}),t.isEmptyObject(d)?t(".column.right .connect",r).addClass("no_element"):t(".column.right .connect",r).removeClass("no_element"),t(".column.left .options",r).hide(),t(".column.left .actions",r).hide(),t(".options .option.delay",r).bind("keyup",function(){t(this).parents("li").data("delay",t(this).val())}),t(".options .option.timeout",r).bind("keyup",function(){t(this).parents("li").data("timeout",t(this).val())}),t("#save_ring_group",r).click(function(){var n=t("#name",r).val(),i=0,a=t("#strategy",r).val(),o=t("#ringback",r).val();if(u=[],"simultaneous"===a)var s=function(e,t,n){var i=e+t;return i>n&&(n=i),n};else var s=function(e,t,n){return n+=e+t};t(".right .connect li",r).each(function(){var e=t(this).data();delete e.owner_id,u.push(e),i=s(parseFloat(e.delay),parseFloat(e.timeout),i)}),e.setMetadata("endpoints",u),e.setMetadata("name",n),e.setMetadata("strategy",a),e.setMetadata("timeout",i),"default"===o?e.deleteMetadata("ringback",o):e.setMetadata("ringback",o),e.caption=n,l.dialog("close")}),l=n.ui.dialog(r,{title:a.i18n.active().oldCallflows.ring_group,beforeClose:function(){"function"==typeof i&&i()}}),t(".connect",l).sortable({connectWith:t(".connect.right",l),zIndex:2e3,helper:"clone",appendTo:t(".wrapper",l),scroll:!1,tolerance:"pointer",receive:function(e,i){var o,s=i.item[0].dataset,u=[];"device"===s.endpoint_type?(o=a.i18n.active().oldCallflows.the_owner_of_this_device_is_already,t(".connect.right li",r).each(function(){t(this).data("id")===s.owner_id&&u.push(t(this))})):"user"===s.endpoint_type&&(o=a.i18n.active().oldCallflows.this_user_has_already_some_devices,t(".connect.right li",r).each(function(){t(this).data("owner_id")===s.id&&u.push(t(this))})),u.length>0&&n.ui.confirm(o,function(){t.each(u,function(){c(this)})},function(){c(i.item)}),t(this).hasClass("right")&&(t(".options",i.item).show(),t(".actions",i.item).show(),t(".column.right .connect",l).removeClass("no_element"))}}),t(r).delegate(".trash","click",function(){var e=t(this).parents("li").first();c(e)}),t(".pane_content",r).hide(),t("#users_pane",r).show(),t("#ringback option:selected").hasClass("uneditable")?t('.media_action[data-action="edit"]',r).hide():t('.media_action[data-action="edit"]',r).show();var c=function(e){var i=e,o=i.data();o.name=jQuery.trim(t(".item_name",i).html()),t("#"+o.endpoint_type+"s_pane .connect.left",r).append(t(n.template(a,"groups-ring_group_element",o))),i.remove(),0==t(".connect.right li",r).size()&&t(".column.right .connect",l).addClass("no_element"),-1==o.name.toLowerCase().indexOf(t("#"+o.endpoint_type+"s_pane .searchfield",r).val().toLowerCase())&&t("#"+o.id,r).hide()}})})})})},groupsDeviceList:function(e){var t=this;t.callApi({resource:"device.list",data:{accountId:t.accountId,filters:{paginate:!1}},success:function(t,n){e&&e(t.data)}})},groupsGroupList:function(e){var t=this;t.callApi({resource:"group.list",data:{accountId:t.accountId,filters:{paginate:!1}},success:function(t,n){e&&e(t.data)}})},groupsUserList:function(e){var t=this;t.callApi({resource:"user.list",data:{accountId:t.accountId,filters:{paginate:!1}},success:function(t,n){e&&e(t.data)}})},groupsMediaList:function(e){var t=this;t.callApi({resource:"media.list",data:{accountId:t.accountId,filters:{paginate:!1}},success:function(t,n){e&&e(t.data)}})}};return i});