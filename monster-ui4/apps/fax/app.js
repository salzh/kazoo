define("apps/fax/app",["require","jquery","underscore","monster","chosen","toastr"],function(t){var a=t("jquery"),n=t("underscore"),e=t("monster"),l=(t("chosen"),t("toastr")),i={name:"fax",css:["app"],i18n:{"en-US":{customCss:!1}},requests:{},subscribe:{},load:function(t){var a=this;a.initApp(function(){t&&t(a)})},appFlags:{ranges:{default:7,max:31},faxboxes:{}},initApp:function(t){var a=this;e.pub("auth.initApp",{app:a,callback:t})},render:function(t){var a=this;a.listFaxboxes(function(t){a.appFlags.faxboxes=n.indexBy(t,"id"),e.ui.generateAppLayout(a,{menus:[{tabs:[{text:a.i18n.active().fax.menuTitles.inbound,callback:a.renderInbound},{text:a.i18n.active().fax.menuTitles.outbound,callback:a.renderOutbound},{text:a.i18n.active().fax.menuTitles.logs,callback:a.renderLogs}]}]})})},renderFaxes:function(t){var n=this,l=t||{},i=l.container||a("#fax_app_container .app-content-wrapper"),s=e.util.getDefaultRangeDates(n.appFlags.ranges.default),o=s.from,r=s.to,u=t.type,d=a(e.template(n,u+"-faxes",{faxboxes:n.appFlags.faxboxes}));n.bindCommon(d),"inbound"===u?n.bindInbound(d):n.bindOutbound(d),n.initDatePicker(d,o,r),i.fadeOut(function(){a(this).empty().append(d).fadeIn()}),n.displayFaxesList(u,d,o,r)},renderInbound:function(t){var a=this;t.type="inbound",a.renderFaxes(t)},renderOutbound:function(t){var a=this;t.type="outbound",a.renderFaxes(t)},displayFaxesList:function(t,a,n,l,i){var s=this;a.find(".data-state").hide(),a.find(".loading-state").show(),s.getTemplateData(t,a,n,l,i,function(t){e.ui.footable(t.find(".footable")),s.bindTableCommon(t),a.removeClass("empty"),a.find(".main-select-message").prop("checked",!1),a.find(".data-state").empty().append(t).show(),a.find(".loading-state").hide(),i&&"none"!==i&&a.find("#select_faxbox").val(i).trigger("change")})},getTemplateData:function(t,n,l,i,s,o){var r=this;"inbound"===t?r.getInboundData(l,i,function(t){var n=r.formatInboundData(t),l=a(e.template(r,"inbound-faxes-list",{faxes:n}));o&&o(l)}):r.getOutboundData(l,i,function(t){var n=r.formatOutboundData(t),l=a(e.template(r,"outbound-faxes-list",{faxes:n}));o&&o(l)})},bindTableCommon:function(t){var n=this;t.find("#fax_list").on("click",".details-fax",function(){var t=a(this),e=t.parents(".faxes-table").data("type"),l=a(this).parents("tr").data("id");n.renderDetailsFax(e,l)})},renderDetailsFax:function(t,n){var l=this;l.getFaxDetails(t,n,function(t){var n=a(e.template(l,"fax-CDRDialog"));e.ui.renderJSON(t,n.find("#jsoneditor")),e.ui.dialog(n,{title:l.i18n.active().fax.CDRPopup.title})})},initDatePicker:function(t,a,n){var l=this,i={container:t,range:l.appFlags.ranges.max};e.ui.initRangeDatepicker(i),t.find("#startDate").datepicker("setDate",a),t.find("#endDate").datepicker("setDate",n),t.find(".apply-filter").on("click",function(a){l.refreshFaxes(t)})},refreshFaxes:function(t){var a=this,n=t.hasClass("inbound-faxes")?"inbound":"outbound",e=t.find("input.filter-from").datepicker("getDate"),l=t.find("input.filter-to").datepicker("getDate"),i=t.find("#select_faxbox").val();a.displayFaxesList(n,t,e,l,i)},bindCommon:function(t){function n(){t.find(".select-fax:checked").length?(t.find(".main-select-fax").prop("checked",!0),t.find(".actionable").show()):(t.find(".main-select-fax").prop("checked",!1),t.find(".actionable").hide())}var i=this,s=t.find("#select_faxbox");e.ui.tooltips(t),s.chosen({search_contains:!0,width:"220px",placeholder_text_single:i.i18n.active().fax.actionBar.selectFax.none}),s.on("change",function(t){var e=FooTable.get("#fax_list").use(FooTable.Filtering),l=a(this).val();"all"===l?e.removeFilter("faxbox_filter"):e.addFilter("faxbox_filter",l,[0]),e.filter(),n()}),t.find("#refresh_faxbox").on("click",function(){i.refreshFaxes(t)}),t.on("click",".select-fax",function(){n()}),t.find(".main-select-fax").on("click",function(){var e=a(this),l=e.prop("checked");t.find(".select-fax").prop("checked",l),n()}),t.find(".select-some-faxes").on("click",function(){var e=a(this),l=e.data("type");t.find(".select-fax").prop("checked",!1),"none"!==l&&("all"===l?t.find(".select-fax").prop("checked",!0):t.find('.select-fax[data-status="'+l+'"]').prop("checked",!0)),n()}),t.find("#delete_faxes").on("click",function(){var n=[],s=a(this).data("type");t.find(".select-fax:checked").each(function(t,e){n.push(a(e).data("id"))});var o=e.template(i,"!"+i.i18n.active().fax.deleteConfirm.content,{variable:n.length});e.ui.confirm(o,function(){t.find(".select-fax:checked").each(function(t,e){n.push(a(e).data("id"))}),i.deleteFaxes(n,s,function(){l.success(i.i18n.active().fax.deleteConfirm.success),i.refreshFaxes(t)})},void 0,{title:i.i18n.active().fax.deleteConfirm.title,confirmButtonText:i.i18n.active().fax.deleteConfirm.confirmButtonText,confirmButtonClass:"monster-button-danger"})})},bindInbound:function(t){},bindOutbound:function(t){var n=this;t.find("#resend_faxes").on("click",function(){var i=[];t.find(".select-fax:checked").each(function(t,n){i.push(a(n).data("id"))});var s=e.template(n,"!"+n.i18n.active().fax.resendConfirm.content,{variable:i.length});e.ui.confirm(s,function(){n.resendFaxes(i,function(){l.success(n.i18n.active().fax.resendConfirm.success),n.refreshFaxes(t)})},void 0,{title:n.i18n.active().fax.resendConfirm.title,confirmButtonText:n.i18n.active().fax.resendConfirm.confirmButtonText})})},getInboundData:function(t,a,n){var e=this;e.getInboundFaxes(t,a,function(t){n&&n(t)})},getOutboundData:function(t,a,n){var e=this;e.getOutboundFaxes(t,a,function(t){n&&n(t)})},formatInboundData:function(t){var a=this,n=a.formatFaxes(t,"inbound");return n},formatOutboundData:function(t){var a=this,n=a.formatFaxes(t,"outbound");return n},formatFaxes:function(t,a){var l=this;return n.each(t,function(t){var n=t.hasOwnProperty("rx_result")?t.rx_result:t.hasOwnProperty("tx_result")?t.tx_result:{};t.status=n.success===!0?"success":"failed",t.formatted={},n.success===!1&&(t.formatted.error=n.result_text),t.formatted.timestamp=e.util.toFriendlyDate(t.hasOwnProperty("timestamp")?t.timestamp:n.pvt_delivered_date),t.formatted.receivingFaxbox=l.appFlags.faxboxes.hasOwnProperty(t.faxbox_id)?l.appFlags.faxboxes[t.faxbox_id].name:"-",t.formatted.receivingNumber=e.util.formatPhoneNumber(t.to_number),t.formatted.sendingFaxbox=l.appFlags.faxboxes.hasOwnProperty(t.faxbox_id)?l.appFlags.faxboxes[t.faxbox_id].name:"-",t.formatted.sendingNumber=e.util.formatPhoneNumber(t.from_number),t.formatted.pages=n.hasOwnProperty("total_pages")?n.total_pages:l.i18n.active().fax.table.noData,t.formatted.uri=l.formatFaxURI(t.id,a)}),t},formatFaxURI:function(t,a){var n=this,e="inbound"===a?"inbox":"outbox";return n.apiUrl+"accounts/"+n.accountId+"/faxes/"+e+"/"+t+"/attachment?auth_token="+n.getAuthToken()},oldRenderLogs:function(t){var n=this,l=t||{},i=l.container||a("#fax_app_container .app-content-wrapper"),s=a(e.template(n,"logs-layout"));n.logsInitTable(s,function(){n.logsBindEvents(s),i.fadeOut(function(){a(this).empty().append(s).fadeIn()})})},renderLogs:function(t){var n=this,l=t||{},i=l.container||a("#fax_app_container .app-content-wrapper");n.logsGetData(function(t){var l=n.logsFormatDataTable(t),s=a(e.template(n,"logs-layout",{logs:l}));e.ui.footable(s.find(".footable")),n.logsBindEvents(s),i.fadeOut(function(){a(this).empty().append(s).fadeIn()})})},logsBindEvents:function(t){var n=this;t.on("click",".detail-link",function(){var t=a(this).parents("tr").data("id");n.logsRenderDetailPopup(t)})},logsRenderDetailPopup:function(t){var n=this;n.logsGetDetails(t,function(t){var l=a(e.template(n,"logs-detail",t));l.find("#close").on("click",function(){i.dialog("close").remove()});var i=e.ui.dialog(l,{title:n.i18n.active().fax.logs.detailDialog.popupTitle,position:["center",20]})})},logsFormatDataTable:function(t){return n.each(t,function(t){t.formatted={},t.formatted.hasError=t.hasOwnProperty("error"),t.formatted.from=t.from||"-",t.formatted.to=t.to||"-",t.formatted.date=e.util.toFriendlyDate(t.created)}),t},logsFormatDetailData:function(t){var a=this,e={metadata:{},errors:[]},l="";return n.each(t,function(t,n){"errors"===n?e.errors=t:(l=a.i18n.active().fax.logs.detailDialog.apiKeys.hasOwnProperty(n)?a.i18n.active().fax.logs.detailDialog.apiKeys[n]:n.replace(/_/g," "),e.metadata[n]={friendlyKey:l,value:t})}),e},logsGetData:function(t){var a=this;a.callApi({resource:"faxes.getLogs",data:{accountId:a.accountId},success:function(a){t&&t(a.data)}})},logsGetDetails:function(t,a){var n=this;n.callApi({resource:"faxes.getLogDetails",data:{accountId:n.accountId,logId:t},success:function(t){var e=n.logsFormatDetailData(t.data);a&&a(e)}})},getInboundFaxes:function(t,a,n){var l=this;l.callApi({resource:"faxes.listInbound",data:{accountId:l.accountId,filters:{created_from:e.util.dateToBeginningOfGregorianDay(t),created_to:e.util.dateToEndOfGregorianDay(a),paginate:!1}},success:function(t){n&&n(t.data)}})},getOutboundFaxes:function(t,a,n){var l=this;l.callApi({resource:"faxes.listOutbound",data:{accountId:l.accountId,filters:{created_from:e.util.dateToBeginningOfGregorianDay(t),created_to:e.util.dateToEndOfGregorianDay(a),paginate:!1}},success:function(t){n&&n(t.data)}})},listFaxboxes:function(t){var a=this;a.callApi({resource:"faxbox.list",data:{accountId:a.accountId,filters:{paginate:!1}},success:function(a){t&&t(a.data)}})},getFaxDetails:function(t,a,n){var e=this,l="faxes."+("inbound"===t?"getDetailsInbound":"getDetailsOutbound");e.callApi({resource:l,data:{accountId:e.accountId,faxId:a},success:function(t){n&&n(t.data)}})},deleteFaxes:function(t,a,l){var i=this,s="inbound"===a?"inbound":"outbound",o={};n.each(t,function(t){o[t]=function(a){i.deleteFax(t,s,function(t){a&&a(null,t)})}}),e.parallel(o,function(t,a){l&&l(a)})},deleteFax:function(t,a,n){var e=this,l="inbound"===a?"deleteInbound":"deleteOutbound";e.callApi({resource:"faxes."+l,data:{accountId:e.accountId,faxId:t},success:function(t){n&&n(t.data)}})},resendFaxes:function(t,a){var l=this,i={};n.each(t,function(t){i[t]=function(a){l.resendFax(t,function(t){a&&a(null,t)})}}),e.parallel(i,function(t,a){globalCallback&&globalCallback(a)})},resendFax:function(t,a){var n=this;n.callApi({resource:"faxes.updateOutbound",data:{accountId:n.accountId,faxId:t,data:{},envelopeKeys:{action:"resubmit"}},success:function(t){a&&a(t.data)}})}};return i}),this.monster=this.monster||{},this.monster.cache=this.monster.cache||{},this.monster.cache.templates=this.monster.cache.templates||{},this.monster.cache.templates.fax=this.monster.cache.templates.fax||{},this.monster.cache.templates.fax["fax-CDRDialog"]=Handlebars.template({compiler:[7,">= 4.0.0"],main:function(t,a,n,e,l){return'<div id="faxbox_cdr_details_dialog">\n\t<div id="jsoneditor">\n\t</div>\n</div>'},useData:!0}),this.monster.cache.templates.fax["inbound-faxes-list"]=Handlebars.template({1:function(t,a,n,e,l){var i,s,o,r=null!=a?a:{},u=n.helperMissing,d="function",c=t.escapeExpression,f=t.lambda,p='\t\t\t<tr class="fax-row" data-faxbox-id="'+c((s=null!=(s=n.faxbox_id||(null!=a?a.faxbox_id:a))?s:u,typeof s===d?s.call(r,{name:"faxbox_id",hash:{},data:l}):s))+'" data-id="'+c((s=null!=(s=n.id||(null!=a?a.id:a))?s:u,typeof s===d?s.call(r,{name:"id",hash:{},data:l}):s))+'">\n\t\t\t\t<td data-filter-value="'+c((s=null!=(s=n.id||(null!=a?a.id:a))?s:u,typeof s===d?s.call(r,{name:"id",hash:{},data:l}):s))+" "+c((s=null!=(s=n.faxbox_id||(null!=a?a.faxbox_id:a))?s:u,typeof s===d?s.call(r,{name:"faxbox_id",hash:{},data:l}):s))+'">\n';return s=null!=(s=n.monsterCheckbox||(null!=a?a.monsterCheckbox:a))?s:u,o={name:"monsterCheckbox",hash:{},fn:t.program(2,l,0),inverse:t.noop,data:l},i=typeof s===d?s.call(r,o):s,n.monsterCheckbox||(i=n.blockHelperMissing.call(a,i,o)),null!=i&&(p+=i),p+'\t\t\t\t</td>\n\t\t\t\t<td data-sort-value="'+c((s=null!=(s=n.timestamp||(null!=a?a.timestamp:a))?s:u,typeof s===d?s.call(r,{name:"timestamp",hash:{},data:l}):s))+'">'+c(f(null!=(i=null!=a?a.formatted:a)?i.timestamp:i,a))+"</td>\n\t\t\t\t<td>"+c(f(null!=(i=null!=a?a.formatted:a)?i.receivingFaxbox:i,a))+"</td>\n\t\t\t\t<td>"+c(f(null!=(i=null!=a?a.formatted:a)?i.receivingNumber:i,a))+"</td>\n\t\t\t\t<td>"+c(f(null!=(i=null!=a?a.formatted:a)?i.sendingNumber:i,a))+"</td>\n\t\t\t\t<td>"+c(f(null!=(i=null!=a?a.formatted:a)?i.pages:i,a))+'</td>\n\t\t\t\t<td class="actions">\n\t\t\t\t\t<!-- <a class="action-item" target="_blank" href="'+c(f(null!=(i=null!=a?a.formatted:a)?i.uri:i,a))+'">\n\t\t\t\t\t\t<i class="fa fa-file-o action-item view-fax"></i>\n\t\t\t\t\t</a> -->\n\t\t\t\t\t<a class="action-item" download target="_blank" href="'+c(f(null!=(i=null!=a?a.formatted:a)?i.uri:i,a))+'">\n\t\t\t\t\t\t<i class="fa fa-cloud-download download-fax"></i>\n\t\t\t\t\t</a>\n\t\t\t\t\t<i class="fa fa-list action-item details-fax"></i>\n\t\t\t\t</td>\n\t\t\t</tr>\n'},2:function(t,a,n,e,l){var i;return'\t\t\t\t\t\t<input class="select-fax" type="checkbox" data-id="'+t.escapeExpression((i=null!=(i=n.id||(null!=a?a.id:a))?i:n.helperMissing,"function"==typeof i?i.call(null!=a?a:{},{name:"id",hash:{},data:l}):i))+'"/>\n'},compiler:[7,">= 4.0.0"],main:function(t,a,n,e,l){var i,s=t.lambda,o=t.escapeExpression;return'<div data-type="inbound" class="faxes-table">\n\t<table id="fax_list" class="monster-table footable">\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th data-filterable="false" data-type="html" data-sortable="false"></th>\n\t\t\t\t<th data-type="html" data-sorted="true" data-direction="DESC">'+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.table:i)?i.columns:i)?i.received:i,a))+"</th>\n\t\t\t\t<th>"+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.table:i)?i.columns:i)?i.receivingFaxbox:i,a))+"</th>\n\t\t\t\t<th>"+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.table:i)?i.columns:i)?i.receivingNumber:i,a))+"</th>\n\t\t\t\t<th>"+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.table:i)?i.columns:i)?i.from:i,a))+'</th>\n\t\t\t\t<th data-breakpoints="xs">'+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.table:i)?i.columns:i)?i.pages:i,a))+'</th>\n\t\t\t\t<th data-filterable="false" data-type="html" data-sortable="false"></th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody>\n\n'+(null!=(i=n.each.call(null!=a?a:{},null!=a?a.faxes:a,{name:"each",hash:{},fn:t.program(1,l,0),inverse:t.noop,data:l}))?i:"")+"\n\t\t</tbody>\n\t</table>\n</div>"},useData:!0}),this.monster.cache.templates.fax["inbound-faxes"]=Handlebars.template({1:function(t,a,n,e,l){return'\t\t\t\t\t\t\t<input class="main-select-fax" type="checkbox"/>\n'},3:function(t,a,n,e,l){var i,s=null!=a?a:{},o=n.helperMissing,r="function",u=t.escapeExpression;return'\t\t\t\t\t<option value="'+u((i=null!=(i=n.id||(null!=a?a.id:a))?i:o,typeof i===r?i.call(s,{name:"id",hash:{},data:l}):i))+'">'+u((i=null!=(i=n.name||(null!=a?a.name:a))?i:o,typeof i===r?i.call(s,{name:"name",hash:{},data:l}):i))+"</option>\n"},compiler:[7,">= 4.0.0"],main:function(t,a,n,e,l){var i,s,o,r=t.lambda,u=t.escapeExpression,d=null!=a?a:{},c='<div class="inbound-faxes faxes-container empty">\n\t<div class="action-bar clearfix">\n\t\t<div class="filters basic-actions pull-left">\n\t\t\t<div class="select-faxbox-wrapper monster-select-dropdown pull-left" data-toggle="tooltip" data-placement="top" data-original-title="'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.tooltips:i)?i.select:i,a))+'">\n\t\t\t\t<li class="dropdown">\n\t\t\t\t\t<a data-toggle="dropdown" class="dropdown-toggle" href="javascript:void(0);">\n';return s=null!=(s=n.monsterCheckbox||(null!=a?a.monsterCheckbox:a))?s:n.helperMissing,o={name:"monsterCheckbox",hash:{},fn:t.program(1,l,0),inverse:t.noop,data:l},i="function"==typeof s?s.call(d,o):s,n.monsterCheckbox||(i=n.blockHelperMissing.call(a,i,o)),null!=i&&(c+=i),c+'\t\t\t\t\t\t<i class="icon-telicon-caret-down"></i>\n\t\t\t\t\t</a>\n\t\t\t\t\t<ul class="dropdown-menu">\n\t\t\t\t\t\t<li><a href="javascript:void(0);" class="select-some-faxes" data-type="all">'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.select:i)?i.all:i,a))+'</a></li>\n\t\t\t\t\t\t<li><a href="javascript:void(0);" class="select-some-faxes" data-type="none">'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.select:i)?i.none:i,a))+'</a></li>\n\t\t\t\t\t</ul>\n\t\t\t\t</li>\n\t\t\t</div>\n\n\t\t\t<div class="filters selected-actions pull-left margin-left">\n\t\t\t\t<button id="delete_faxes" data-type="inbound" class="monster-button-secondary monster-button-fit margin-left actionable" data-toggle="tooltip" data-placement="top" data-original-title="'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.tooltips:i)?i.delete:i,a))+'">\n\t\t\t\t\t<i class="fa fa-trash"></i>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class="filters faxbox-selector">\n\t\t\t<select id="select_faxbox">\n\t\t\t\t<option value="none"></option>\n\t\t\t\t<option value="all">'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.selectFax:i)?i.all:i,a))+"</option>\n"+(null!=(i=n.each.call(d,null!=a?a.faxboxes:a,{name:"each",hash:{},fn:t.program(3,l,0),inverse:t.noop,data:l}))?i:"")+'\t\t\t</select>\n\n\t\t\t<button id="refresh_faxbox" class="monster-button-secondary monster-button-fit margin-left" data-toggle="tooltip" data-placement="top" data-original-title="'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.tooltips:i)?i.refresh:i,a))+'">\n\t\t\t\t<i class="fa fa-refresh"></i>\n\t\t\t</button>\n\t\t</div>\n\n\t\t<div class="sub-ranges">\n\t\t\t<div class="custom-range">\n\t\t\t\t<span>'+u(r(null!=(i=null!=a?a.i18n:a)?i.startDate:i,a))+'</span>\n\t\t\t\t<input id="startDate" type="text" class="date-filter filter-from">\n\t\t\t\t<span>'+u(r(null!=(i=null!=a?a.i18n:a)?i.endDate:i,a))+'</span>\n\t\t\t\t<input id="endDate" type="text" class="date-filter filter-to">\n\t\t\t\t<button type="button" class="apply-filter monster-button monster-button-primary">'+u(r(null!=(i=null!=a?a.i18n:a)?i.filter:i,a))+'</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class="content">\n\t\t<div class="data-state">\n\n\t\t</div>\n\t\t<div class="loading-state">\n\t\t\t<i class="fa fa-spin fa-spinner monster-primary-color"></i>\n\t\t</div>\n\t</div>\n</div>'},useData:!0}),this.monster.cache.templates.fax["logs-detail"]=Handlebars.template({1:function(t,a,n,e,l){var i=t.lambda,s=t.escapeExpression;return"\t\t\t<tr>\n\t\t\t\t<td>"+s(i(null!=a?a.friendlyKey:a,a))+"</td>\n\t\t\t\t<td>"+s(i(null!=a?a.value:a,a))+" </td>\n\t\t\t</tr>\n"},3:function(t,a,n,e,l){return"\t\t\t<tr>\n\t\t\t\t<td>"+t.escapeExpression(t.lambda(a,a))+"</td>\n\t\t\t</tr>\n"},compiler:[7,">= 4.0.0"],main:function(t,a,n,e,l){var i,s=t.lambda,o=t.escapeExpression,r=null!=a?a:{};return'<div id="smtp_logs_detail_dialog">\n\t<h3>'+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.logs:i)?i.detailDialog:i)?i.metadataTitle:i,a))+'</h3>\n\t\n\t<table class="table table-striped technical-data-table">\n\t\t<tbody>\n'+(null!=(i=n.each.call(r,null!=a?a.metadata:a,{name:"each",hash:{},fn:t.program(1,l,0),inverse:t.noop,data:l}))?i:"")+"\t\t</tbody>\n\t</table>\n\n\t<h3>"+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.logs:i)?i.detailDialog:i)?i.errorTitle:i,a))+'</h3>\n\n\t<table class="table table-striped error-data-table">\n\t\t<tbody>\n'+(null!=(i=n.each.call(r,null!=a?a.errors:a,{name:"each",hash:{},fn:t.program(3,l,0),inverse:t.noop,data:l}))?i:"")+'\t\t</tbody>\n\t</table>\n\n\t<div class="dialog-buttons-wrapper">\n\t\t<button id="close" class="monster-button-primary">'+o(s(null!=(i=null!=a?a.i18n:a)?i.close:i,a))+"</button>\n\t</div>\n</div>\n"},useData:!0}),this.monster.cache.templates.fax["logs-layout"]=Handlebars.template({1:function(t,a,n,e,l){var i,s,o=null!=a?a:{},r=n.helperMissing,u="function",d=t.escapeExpression,c=t.lambda;return'\t\t\t\t<tr class="log-row" data-id="'+d((s=null!=(s=n.id||(null!=a?a.id:a))?s:r,typeof s===u?s.call(o,{name:"id",hash:{},data:l}):s))+'" data-id="'+d((s=null!=(s=n.id||(null!=a?a.id:a))?s:r,typeof s===u?s.call(o,{name:"id",hash:{},data:l}):s))+'">\n\t\t\t\t\t<td>\n'+(null!=(i=n.if.call(o,null!=(i=null!=a?a.formatted:a)?i.hasError:i,{name:"if",hash:{},fn:t.program(2,l,0),inverse:t.program(4,l,0),data:l}))?i:"")+"\t\t\t\t\t</td>\n\t\t\t\t\t<td>"+d(c(null!=(i=null!=a?a.formatted:a)?i.from:i,a))+"</td>\n\t\t\t\t\t<td>"+d(c(null!=(i=null!=a?a.formatted:a)?i.to:i,a))+'</td>\n\t\t\t\t\t<td data-sort-value="'+d((s=null!=(s=n.created||(null!=a?a.created:a))?s:r,typeof s===u?s.call(o,{name:"created",hash:{},data:l}):s))+'">'+d(c(null!=(i=null!=a?a.formatted:a)?i.date:i,a))+'</td>\n\t\t\t\t\t<td><a href="#" class="detail-link monster-link"><i class="fa fa-eye"></i></a></td>\n\t\t\t\t</tr>\n'},2:function(t,a,n,e,l){return'\t\t\t\t\t\t\t<i class="monster-red fa fa-thumbs-down"></i>\n'},4:function(t,a,n,e,l){return'\t\t\t\t\t\t\t<i class="monster-green fa fa-thumbs-up"></i>\n'},compiler:[7,">= 4.0.0"],main:function(t,a,n,e,l){var i,s=t.lambda,o=t.escapeExpression;return'<div id="smtp_logs_container">\n\t<div class="table-wrapper">\n\t\t<table id="smtp_logs_grid" class="monster-table footable">\n\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<th data-filterable="false" data-type="html">'+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.logs:i)?i.tableTitles:i)?i.status:i,a))+"</th>\n\t\t\t\t\t<th>"+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.logs:i)?i.tableTitles:i)?i.from:i,a))+"</th>\n\t\t\t\t\t<th>"+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.logs:i)?i.tableTitles:i)?i.to:i,a))+'</th>\n\t\t\t\t\t<th data-sorted="true" data-direction="DESC" data-breakpoints="xs">'+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.logs:i)?i.tableTitles:i)?i.date:i,a))+'</th>\n\t\t\t\t\t<th data-filterable="false" data-type="html">'+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.logs:i)?i.tableTitles:i)?i.details:i,a))+"</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody>\n\n"+(null!=(i=n.each.call(null!=a?a:{},null!=a?a.logs:a,{name:"each",hash:{},fn:t.program(1,l,0),inverse:t.noop,data:l}))?i:"")+"\t\t\t</tbody>\n\t\t</table>\n\t</div>\n</div>\n"},useData:!0}),this.monster.cache.templates.fax["outbound-faxes-list"]=Handlebars.template({1:function(t,a,n,e,l){var i,s,o,r=null!=a?a:{},u=n.helperMissing,d="function",c=t.escapeExpression,f=t.lambda,p='\t\t\t<tr class="fax-row" data-faxbox-id="'+c((s=null!=(s=n.faxbox_id||(null!=a?a.faxbox_id:a))?s:u,typeof s===d?s.call(r,{name:"faxbox_id",hash:{},data:l}):s))+'" data-id="'+c((s=null!=(s=n.id||(null!=a?a.id:a))?s:u,typeof s===d?s.call(r,{name:"id",hash:{},data:l}):s))+'">\n\t\t\t\t<td data-filter-value="'+c((s=null!=(s=n.id||(null!=a?a.id:a))?s:u,typeof s===d?s.call(r,{name:"id",hash:{},data:l}):s))+" "+c((s=null!=(s=n.faxbox_id||(null!=a?a.faxbox_id:a))?s:u,typeof s===d?s.call(r,{name:"faxbox_id",hash:{},data:l}):s))+'">\n';return s=null!=(s=n.monsterCheckbox||(null!=a?a.monsterCheckbox:a))?s:u,o={name:"monsterCheckbox",hash:{},fn:t.program(2,l,0),inverse:t.noop,data:l},i=typeof s===d?s.call(r,o):s,n.monsterCheckbox||(i=n.blockHelperMissing.call(a,i,o)),null!=i&&(p+=i),p+'\t\t\t\t</td>\n\t\t\t\t<td class="status" data-sort-value="'+c((s=null!=(s=n.status||(null!=a?a.status:a))?s:u,typeof s===d?s.call(r,{name:"status",hash:{},data:l}):s))+'" data-filter-value="'+c((s=null!=(s=n.status||(null!=a?a.status:a))?s:u,typeof s===d?s.call(r,{name:"status",hash:{},data:l}):s))+'" data-status="'+c((s=null!=(s=n.status||(null!=a?a.status:a))?s:u,typeof s===d?s.call(r,{name:"status",hash:{},data:l}):s))+'">\n\t\t\t\t\t<span data-toggle="tooltip" data-placement="top" data-original-title="'+c(f(null!=(i=null!=a?a.formatted:a)?i.error:i,a))+'">'+c((s=null!=(s=n.status||(null!=a?a.status:a))?s:u,typeof s===d?s.call(r,{name:"status",hash:{},data:l}):s))+'</span>\n\t\t\t\t</td>\n\t\t\t\t<td data-sort-value="'+c((s=null!=(s=n.timestamp||(null!=a?a.timestamp:a))?s:u,typeof s===d?s.call(r,{name:"timestamp",hash:{},data:l}):s))+'">'+c(f(null!=(i=null!=a?a.formatted:a)?i.timestamp:i,a))+"</td>\n\t\t\t\t<td>"+c(f(null!=(i=null!=a?a.formatted:a)?i.sendingFaxbox:i,a))+"</td>\n\t\t\t\t<td>"+c(f(null!=(i=null!=a?a.formatted:a)?i.sendingNumber:i,a))+"</td>\n\t\t\t\t<td>"+c(f(null!=(i=null!=a?a.formatted:a)?i.receivingNumber:i,a))+"</td>\n\t\t\t\t<td>"+c(f(null!=(i=null!=a?a.formatted:a)?i.pages:i,a))+'</td>\n\t\t\t\t<td class="actions">\n\t\t\t\t\t<!-- <a class="action-item" target="_blank" href="'+c(f(null!=(i=null!=a?a.formatted:a)?i.uri:i,a))+'">\n\t\t\t\t\t\t<i class="fa fa-file-o action-item view-fax"></i>\n\t\t\t\t\t</a> -->\n\t\t\t\t\t<a class="action-item" download target="_blank" href="'+c(f(null!=(i=null!=a?a.formatted:a)?i.uri:i,a))+'">\n\t\t\t\t\t\t<i class="fa fa-cloud-download download-fax"></i>\n\t\t\t\t\t</a>\n\t\t\t\t\t<i class="fa fa-list action-item details-fax"></i>\n\t\t\t\t</td>\n\t\t\t</tr>\n'},2:function(t,a,n,e,l){var i,s=null!=a?a:{},o=n.helperMissing,r="function",u=t.escapeExpression;return'\t\t\t\t\t\t<input class="select-fax" type="checkbox" data-id="'+u((i=null!=(i=n.id||(null!=a?a.id:a))?i:o,typeof i===r?i.call(s,{name:"id",hash:{},data:l}):i))+'" data-status="'+u((i=null!=(i=n.status||(null!=a?a.status:a))?i:o,typeof i===r?i.call(s,{name:"status",hash:{},data:l}):i))+'"/>\n'},compiler:[7,">= 4.0.0"],main:function(t,a,n,e,l){var i,s=t.lambda,o=t.escapeExpression;return'<div data-type="outbound" class="faxes-table">\n\t<table id="fax_list" class="monster-table footable">\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th data-filterable="false" data-type="html" data-sortable="false"></th>\n\t\t\t\t<th data-type="html">'+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.table:i)?i.columns:i)?i.status:i,a))+'</th>\n\t\t\t\t<th data-type="html" data-sorted="true" data-direction="DESC">'+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.table:i)?i.columns:i)?i.sent:i,a))+"</th>\n\t\t\t\t<th>"+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.table:i)?i.columns:i)?i.sendingFaxbox:i,a))+"</th>\n\t\t\t\t<th>"+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.table:i)?i.columns:i)?i.sendingNumber:i,a))+"</th>\n\t\t\t\t<th>"+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.table:i)?i.columns:i)?i.receivingNumber:i,a))+'</th>\n\t\t\t\t<th data-breakpoints="xs">'+o(s(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.table:i)?i.columns:i)?i.pages:i,a))+'</th>\n\t\t\t\t<th data-filterable="false" data-type="html" data-sortable="false"></th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody>\n\n'+(null!=(i=n.each.call(null!=a?a:{},null!=a?a.faxes:a,{name:"each",hash:{},fn:t.program(1,l,0),inverse:t.noop,data:l}))?i:"")+"\n\t\t</tbody>\n\t</table>\n</div>"},useData:!0}),this.monster.cache.templates.fax["outbound-faxes"]=Handlebars.template({1:function(t,a,n,e,l){return'\t\t\t\t\t\t\t<input class="main-select-fax" type="checkbox"/>\n'},3:function(t,a,n,e,l){var i,s=null!=a?a:{},o=n.helperMissing,r="function",u=t.escapeExpression;return'\t\t\t\t\t<option value="'+u((i=null!=(i=n.id||(null!=a?a.id:a))?i:o,typeof i===r?i.call(s,{name:"id",hash:{},data:l}):i))+'">'+u((i=null!=(i=n.name||(null!=a?a.name:a))?i:o,typeof i===r?i.call(s,{name:"name",hash:{},data:l}):i))+"</option>\n"},compiler:[7,">= 4.0.0"],main:function(t,a,n,e,l){var i,s,o,r=t.lambda,u=t.escapeExpression,d=null!=a?a:{},c='<div class="outbound-faxes faxes-container empty">\n\t<div class="action-bar clearfix">\n\t\t<div class="filters basic-actions pull-left">\n\t\t\t<div class="select-faxbox-wrapper monster-select-dropdown pull-left" data-toggle="tooltip" data-placement="top" data-original-title="'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.tooltips:i)?i.select:i,a))+'">\n\t\t\t\t<li class="dropdown">\n\t\t\t\t\t<a data-toggle="dropdown" class="dropdown-toggle" href="javascript:void(0);">\n';return s=null!=(s=n.monsterCheckbox||(null!=a?a.monsterCheckbox:a))?s:n.helperMissing,o={name:"monsterCheckbox",hash:{},fn:t.program(1,l,0),inverse:t.noop,data:l},i="function"==typeof s?s.call(d,o):s,n.monsterCheckbox||(i=n.blockHelperMissing.call(a,i,o)),null!=i&&(c+=i),c+'\t\t\t\t\t\t<i class="icon-telicon-caret-down"></i>\n\t\t\t\t\t</a>\n\t\t\t\t\t<ul class="dropdown-menu">\n\t\t\t\t\t\t<li><a href="javascript:void(0);" class="select-some-faxes" data-type="all">'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.select:i)?i.all:i,a))+'</a></li>\n\t\t\t\t\t\t<li><a href="javascript:void(0);" class="select-some-faxes" data-type="failed">'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.select:i)?i.failed:i,a))+'</a></li>\n\t\t\t\t\t\t<li><a href="javascript:void(0);" class="select-some-faxes" data-type="success">'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.select:i)?i.completed:i,a))+'</a></li>\n\t\t\t\t\t\t<li><a href="javascript:void(0);" class="select-some-faxes" data-type="none">'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.select:i)?i.none:i,a))+'</a></li>\n\t\t\t\t\t</ul>\n\t\t\t\t</li>\n\t\t\t</div>\n\n\t\t\t<div class="filters selected-actions pull-left margin-left">\n\t\t\t\t<button id="delete_faxes" data-type="outbound" class="monster-button-secondary monster-button-fit margin-left actionable" data-toggle="tooltip" data-placement="top" data-original-title="'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.tooltips:i)?i.delete:i,a))+'">\n\t\t\t\t\t<i class="fa fa-trash"></i>\n\t\t\t\t</button>\n\n\t\t\t\t<button id="resend_faxes" class="monster-button-secondary monster-button-fit margin-left actionable" data-toggle="tooltip" data-placement="top" data-original-title="'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.tooltips:i)?i.resend:i,a))+'">\n\t\t\t\t\t<i class="fa fa-mail-forward"></i>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class="filters faxbox-selector">\n\t\t\t<select id="select_faxbox">\n\t\t\t\t<option value="none"></option>\n\t\t\t\t<option value="all">'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.selectFax:i)?i.all:i,a))+"</option>\n"+(null!=(i=n.each.call(d,null!=a?a.faxboxes:a,{name:"each",hash:{},fn:t.program(3,l,0),inverse:t.noop,data:l}))?i:"")+'\t\t\t</select>\n\n\t\t\t<button id="refresh_faxbox" class="monster-button-secondary monster-button-fit margin-left" data-toggle="tooltip" data-placement="top" data-original-title="'+u(r(null!=(i=null!=(i=null!=(i=null!=(i=null!=a?a.i18n:a)?i.fax:i)?i.actionBar:i)?i.tooltips:i)?i.refresh:i,a))+'">\n\t\t\t\t<i class="fa fa-refresh"></i>\n\t\t\t</button>\n\t\t</div>\n\n\t\t<div class="sub-ranges">\n\t\t\t<div class="custom-range">\n\t\t\t\t<span>'+u(r(null!=(i=null!=a?a.i18n:a)?i.startDate:i,a))+'</span>\n\t\t\t\t<input id="startDate" type="text" class="date-filter filter-from">\n\t\t\t\t<span>'+u(r(null!=(i=null!=a?a.i18n:a)?i.endDate:i,a))+'</span>\n\t\t\t\t<input id="endDate" type="text" class="date-filter filter-to">\n\t\t\t\t<button type="button" class="apply-filter monster-button monster-button-primary">'+u(r(null!=(i=null!=a?a.i18n:a)?i.filter:i,a))+'</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class="content">\n\t\t<div class="data-state">\n\n\t\t</div>\n\t\t<div class="loading-state">\n\t\t\t<i class="fa fa-spin fa-spinner monster-primary-color"></i>\n\t\t</div>\n\t</div>\n</div>'},useData:!0});