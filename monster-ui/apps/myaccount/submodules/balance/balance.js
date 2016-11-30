define(["require","jquery","underscore","monster","datatables","toastr"],function(a){var t=a("jquery"),e=(a("underscore"),a("monster")),n=(a("datatables"),a("toastr")),c={requests:{},subscribe:{"myaccount.balance.renderContent":"_balanceRenderContent","myaccount.balance.addCreditDialog":"_balanceRenderAddCredit","myaccount.refreshBadges":"_balanceRefreshBadge"},balanceRange:"monthly",_balanceRefreshBadge:function(a){var t=this;a.hasOwnProperty("except")&&"balance"===a.except||t.balanceGet(function(n){var c={module:"balance",data:t.i18n.active().currencyUsed+parseFloat(n.data.balance).toFixed(2),callback:a.callback};e.pub("myaccount.updateMenu",c)})},_balanceRenderContent:function(a){var n=this,c=a.callback,i={fieldData:{accounts:{}}};e.parallel({accounts:function(a){n.balanceGetAccounts(function(e){t.each(e.data,function(a,t){i.fieldData.accounts[t.id]=t}),a(null,i)})},balance:function(a){n.balanceGet(function(t){i.amount=parseFloat(t.data.balance).toFixed(2),a(null,t)})},transactions:function(a){n.balanceGetTransactions(function(t){a(null,t)})}},function(a,o){e.pub("myaccount.UIRestrictionsCompatibility",{restrictions:e.apps.auth.originalAccount.ui_restrictions,callback:function(a){var l=t.extend(!0,{},i,n.balanceFormatTableData(o.transactions.data,i.fieldData.accounts),{uiRestrictions:a});l.uiRestrictions.balance.show_header=l.uiRestrictions.balance.show_credit===!1&&l.uiRestrictions.balance.show_minutes===!1?!1:!0;var r=t(e.template(n,"balance-layout",l)),d={module:"balance",data:n.i18n.active().currencyUsed+l.amount};n.balanceBindEvents(r),e.pub("myaccount.updateMenu",d),e.pub("myaccount.renderSubmodule",r),n.balanceInitTable(r),t.fn.dataTableExt.afnFiltering.pop(),r.find("div.table-custom-actions").html(e.template(n,"balance-tableActionBar"));var s={container:r,range:n.balanceRange};e.ui.initRangeDatepicker(s);var u=new Date(r.find("#startDate").val()),f=new Date(r.find("#endDate").val());r.find(".refresh-filter").on("click",function(){n._balanceRenderContent(d)}),r.find(".filter-transactions").on("click",function(){e.ui.table.balance.find("tbody tr").remove(),e.ui.table.balance.fnClearTable(),u=r.find("#startDate").datepicker("getDate"),f=r.find("#endDate").datepicker("getDate"),n.balanceRefreshTransactionsTable(r,u,f,i.fieldData.accounts)}),r.find(".download-transactions").on("click",function(){var a=e.util.dateToBeginningOfGregorianDay(u),t=e.util.dateToEndOfGregorianDay(f);window.location.href=n.apiUrl+"accounts/"+n.accountId+"/transactions?created_from="+a+"&created_to="+t+"&depth=1&reason=only_calls&accept=csv&auth_token="+n.authToken}),e.ui.table.balance.fnAddData(l.tabData),r.find(".popup-marker").clickover(),"function"==typeof c&&c(r)}})})},balanceGetDialogData:function(a){var t=this;e.parallel({account:function(a){t.callApi({resource:"account.get",data:{accountId:t.accountId},success:function(t){a(null,t.data)}})},balance:function(a){t.callApi({resource:"balance.get",data:{accountId:t.accountId},success:function(t){a(null,t.data)}})}},function(e,n){var c=t.balanceFormatDialogData(n);a&&a(c)})},balanceFormatDialogData:function(a){var e=a.balance.balance.toFixed(2)||"0.00",n={},c={enabled:!1};a.account.hasOwnProperty("notifications")&&a.account.notifications.hasOwnProperty("low_balance")?t.extend(!0,n,a.account.notifications.low_balance):a.account.hasOwnProperty("threshold")&&(t.extend(!0,n,a.account.threshold),n.enabled=!0),n.hasOwnProperty("enabled")||(n.enabled=!0,n.hasOwnProperty("threshold")||(n.threshold=5)),a.account.hasOwnProperty("topup")&&(c.enabled=!0,t.extend(!0,c,a.account.topup));var i={amount:e,threshold:n,topup:c};return i},_balanceRenderAddCredit:function(a){var n,c=this;c.balanceGetDialogData(function(i){var o=t(e.template(c,"balance-addCreditDialog",t.extend({disableBraintree:e.config.disableBraintree},i))),l={module:c.name,data:parseFloat(i.amount).toFixed(2)};e.pub("myaccount.updateMenu",l),n=e.ui.dialog(o,{title:c.i18n.active().balance.addCreditDialogTitle});var r={parent:n,data:i,callback:a.callback};c.balanceBindEventsDialog(r)})},balanceRefreshTransactionsTable:function(a,t,n,c){var i=this,o={from:t,to:n};i.balanceGetTransactions(o,function(t){var n=i.balanceFormatTableData(t.data,c);e.ui.table.balance.addData(n.tabData),a.find("#call_charges").html(n.totalCharges),a.find("#minutes_used").html(n.totalMinutes)})},balanceFormatTableData:function(a,n){var c=this,i={tabData:[],totalMinutes:0,totalCharges:0};return a.length>0&&(t.each(a,function(a,t){t.metadata=t.metadata||{to:"-",from:"-"},t.metadata.call={direction:t.metadata.direction||"inbound",call_id:t.call_id};var o=c.i18n.active().balance.active_call,l=e.util.toFriendlyDate(t.created),r="-",d=c.i18n.active().currencyUsed+parseFloat(t.amount).toFixed(3),s=e.util.formatPhoneNumber(t.metadata.from||"").replace(/@.*/,""),u=e.util.formatPhoneNumber(t.metadata.to||"").replace(/@.*/,"");"duration"in t.metadata&&(o=Math.ceil(parseInt(t.metadata.duration)/60),i.totalMinutes+=o),t.hasOwnProperty("sub_account_name")?r=t.sub_account_name:t.hasOwnProperty("sub_account_id")&&(r=n.hasOwnProperty(t.sub_account_id)?n[t.sub_account_id].name:"-"),i.totalCharges+=parseFloat(t.amount),i.tabData.push([t.created||"-",t.call_id||"-",t.metadata.call||"-",l||"-",s||"-",u||"-",r||"-",o||"-",d||"-"])}),i.totalCharges=i.totalCharges.toFixed(3)),i},balanceInitTable:function(a){var t=this;e.pub("myaccount.UIRestrictionsCompatibility",{restrictions:e.apps.auth.originalAccount.ui_restrictions,callback:function(n){var c=n.balance&&0==n.balance.show_credit?!1:!0,i=[{sTitle:"timestamp",bVisible:!1},{sTitle:"call_id",bVisible:!1},{sTitle:t.i18n.active().balance.directionColumn,fnRender:function(a){var t='<i class="fa fa-arrow-left monster-orange popup-marker" data-placement="right" data-original-title="Call ID" data-content="'+a.aData[a.iDataColumn].call_id+'"></i>';return"inbound"===a.aData[a.iDataColumn].direction&&(t='<i class="fa fa-arrow-right monster-green popup-marker" data-placement="right" data-original-title="Call ID" data-content="'+a.aData[a.iDataColumn].call_id+'"></i>'),t},sWidth:"5%"},{sTitle:t.i18n.active().balance.dateColumn,sWidth:"20%"},{sTitle:t.i18n.active().balance.fromColumn,sWidth:"20%"},{sTitle:t.i18n.active().balance.toColumn,sWidth:"20%"},{sTitle:t.i18n.active().balance.accountColumn,sWidth:"25%"},{sTitle:t.i18n.active().balance.durationColumn,sWidth:"10%"}];c&&(i[7].sWidth="5%",i.push({sTitle:t.i18n.active().balance.amountColumn,sWidth:"5%"})),e.ui.table.create("balance",a.find("#transactions_grid"),i,{},{bScrollInfinite:!0,bScrollCollapse:!0,sScrollY:"300px",sDom:'<"table-custom-actions">frtlip',aaSorting:[[0,"desc"]]})}})},balanceCleanFormData:function(a,t){return delete t.extra,t},balanceFormatThresholdData:function(a){return a.notifications=a.notifications||{},a.notifications.low_balance=a.notifications.low_balance||{},a.hasOwnProperty("threshold")&&(a.notifications.low_balance.enabled=!0,a.notifications.low_balance.threshold=a.threshold.threshold,delete a.threshold),a.notifications.low_balance.hasOwnProperty("enabled")||(a.notifications.low_balance.enabled=!0,a.notifications.low_balance.threshold=5),a},balanceBindEventsDialog:function(a){var c=this,i=a.parent,o=a.data,l=o.threshold.enabled,r=o.topup.enabled||!1,d=!1,s=i.find("#threshold_alerts_content"),u=i.find("#threshold_alerts_switch"),f=i.find("#auto_recharge_content"),b=i.find("#auto_recharge_switch");i.find(".navbar-menu-item-link").on("click",function(a){a.preventDefault();var n=t(this),o=function(){d||(d=!0,i.find(".add-credits-content-wrapper.active").fadeOut(function(){i.find(".navbar-menu-item-link.active").removeClass("active"),n.addClass("active"),t(this).removeClass("active"),i.find(a.target.hash).fadeIn(function(){t(this).addClass("active"),d=!1})}))};if(i.find('.add-credits-content-wrapper.active input[type="checkbox"]').is(":checked")){var l=i.find(".add-credits-content-wrapper.active form").prop("id"),r=!1,s=e.ui.getFormData(l);for(var u in s)if(""===s[u]){r=!0;break}r?e.ui.alert("warning",c.i18n.active().balance.addCreditPopup.alerts.missingValue[l],function(){},{title:c.i18n.active().balance.addCreditPopup.alerts.missingValue.title}):o()}else o()}),i.find("#add_credit").on("click",function(t){t.preventDefault();var o=parseFloat(i.find("#amount").val().replace(",","."));o?c.balanceAddCredits(o,function(){var t={amount:c.i18n.active().currencyUsed+o};n.success(e.template(c,"!"+c.i18n.active().balance.creditsAdded,t)),"function"==typeof a.callback?c.balanceGet(function(t){a.callback(t.data.balance),i.dialog("close")}):i.dialog("close")}):e.ui.alert(c.i18n.active().balance.invalidAmount)}),u.on("change",function(){t(this).is(":checked")?s.slideDown():(l&&c.balanceTurnOffThreshold(function(){s.slideUp(function(){l=!1,n.success(c.i18n.active().balance.thresholdAlertsCancelled)})}),s.slideUp())}),u.prop("checked",l),s.toggle(l),i.find("#save_threshold").on("click",function(a){a.preventDefault();var t=e.ui.getFormData("threshold_alerts_content"),o={threshold:parseFloat(t.threshold_alerts_amount.replace(",","."))};o.threshold&&o.threshold?c.balanceUpdateThreshold(o.threshold,function(){i.dialog("close"),n.success(c.i18n.active().balance.thresholdAlertsEnabled)}):e.ui.alert(c.i18n.active().balance.invalidAmount)}),b.on("change",function(){t(this).is(":checked")?f.slideDown():r?c.balanceTurnOffTopup(function(){f.slideUp(function(){r=!1,n.success(c.i18n.active().balance.autoRechargeCancelled)})}):f.slideUp()}),b.prop("checked",r),f.toggle(r),i.find("#confirm_recharge").on("click",function(a){a.preventDefault();var t=e.ui.getFormData("auto_recharge_content"),o={threshold:parseFloat(t.auto_recharge_threshold.replace(",",".")),amount:parseFloat(t.auto_recharge_amount.replace(",","."))};o.threshold&&o.amount&&o.threshold&&o.amount?c.balanceUpdateTopUp(o,function(){i.dialog("close"),n.success(c.i18n.active().balance.autoRechargeEnabled)}):e.ui.alert(c.i18n.active().balance.invalidAmount)})},balanceBindEvents:function(a){var t=this;setTimeout(function(){a.find(".search-query").focus()}),a.find("#add_credits").on("click",function(){var n={callback:function(n){var c=parseFloat(n).toFixed(2),i=t.i18n.active().currencyUsed+c,o={module:"balance",data:i};e.pub("myaccount.updateMenu",o),a.find("#amount").html(c)}};t._balanceRenderAddCredit(n)})},balanceTurnOffThreshold:function(a){var t=this;t.callApi({resource:"account.get",data:{accountId:t.accountId},success:function(e,n){e.data=t.balanceFormatThresholdData(e.data),e.data.notifications.low_balance.enabled=!1,t.callApi({resource:"account.update",data:{accountId:t.accountId,data:e.data},success:function(t){a&&a(t)}})}})},balanceUpdateThreshold:function(a,t){var e=this;e.callApi({resource:"account.get",data:{accountId:e.accountId},success:function(n,c){n.data=e.balanceFormatThresholdData(n.data),n.data.notifications.low_balance.enabled=!0,n.data.notifications.low_balance.threshold=a,e.callApi({resource:"account.update",data:{accountId:e.accountId,data:n.data},success:function(a){t&&t(a)}})}})},balanceTurnOffTopup:function(a){var t=this;t.callApi({resource:"account.get",data:{accountId:t.accountId},success:function(e){e.data.hasOwnProperty("topup")&&(delete e.data.topup,t.callApi({resource:"account.update",data:{accountId:t.accountId,data:e.data},success:function(t){a&&a(t)}}))}})},balanceUpdateTopUp:function(a,t){var e=this;e.callApi({resource:"account.get",data:{accountId:e.accountId},success:function(n){n.data.topup=a,e.callApi({resource:"account.update",data:{accountId:e.accountId,data:n.data},success:function(a){t&&t(a)}})}})},balanceGetAccounts:function(a,t){var e=this;e.callApi({resource:"account.listDescendants",data:{accountId:e.accountId},success:function(t,e){a&&a(t,e)},error:function(a,e){t&&t(a,e)}})},balanceGetLimits:function(a,t){var e=this;e.callApi({resource:"limits.get",data:{accountId:e.accountId},success:function(t,e){a&&a(t,e)},error:function(a,e){t&&t(a,e)}})},balanceGetTransactions:function(a,t,n){var c=this;if("function"==typeof a){t=a,n=t;var i=e.util.getDefaultRangeDates(c.balanceRange),a={};a.to=i.to,a.from=i.from}var o=e.util.dateToBeginningOfGregorianDay(a.from),l=e.util.dateToEndOfGregorianDay(a.to);c.callApi({resource:"balance.filtered",data:{accountId:c.accountId,from:o,to:l,reason:"only_calls"},success:function(a,e){t&&t(a,e)},error:function(a,t){n&&n(a,t)}})},balanceUpdateLimits:function(a,t,e){var n=this;n.callApi({resource:"limits.update",data:{accountId:n.accountId,data:a},success:function(a,e){t&&t(a,e)},error:function(a,t){e&&e(a,t)}})},balanceGet:function(a,t){var e=this;e.callApi({resource:"balance.get",data:{accountId:e.accountId},success:function(t,e){a&&a(t,e)},error:function(a,e){t&&t(a,e)}})},balanceAddCredits:function(a,t,e){var n=this,c={amount:a};n.balanceUpdateRecharge(c,t,e)},balanceUpdateRecharge:function(a,t,e){var n=this;n.callApi({resource:"balance.add",data:{accountId:n.accountId,data:a},success:function(a,e){t&&t(a,e)},error:function(a,t){e&&e(a,t)}})}};return c});