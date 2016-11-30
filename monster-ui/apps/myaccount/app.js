define(["require","jquery","underscore","monster","toastr"],function(t){var e=t("jquery"),n=t("underscore"),a=t("monster"),i=t("toastr"),o={name:"myaccount",css:["app"],i18n:{"en-US":{customCss:!1},"fr-FR":{customCss:!1},"ru-RU":{customCss:!1}},requests:{"myaccount.getAccount":{url:"accounts/{accountId}",verb:"GET"}},subscribe:{"myaccount.hide":"_hide","myaccount.updateMenu":"_updateMenu","myaccount.events":"_myaccountEvents","myaccount.renderNavLinks":"_renderNavLinks","myaccount.renderSubmodule":"_renderSubmodule","myaccount.openAccordionGroup":"_openAccordionGroup","myaccount.UIRestrictionsCompatibility":"_UIRestrictionsCompatibility","myaccount.showCreditCardTab":"showCreditCardTab","myaccount.hasCreditCards":"hasCreditCards","core.changedAccount":"refreshMyAccount","myaccount.hasToShowWalkthrough":"hasToShowWalkthrough","myaccount.renderDropdown":"clickMyAccount"},subModules:["account","balance","billing","servicePlan","transactions","trunks","user","errorTracker"],mainContainer:"#myaccount",load:function(t){var e=this;e.initApp(function(){e.render(),t&&t(e)})},initApp:function(t){var e=this;a.pub("auth.initApp",{app:e,callback:t})},getDefaultCategory:function(){var t={name:"user"};return a.util.isMasquerading()&&(t.name="account"),t},getDefaultRestrictions:function(){return{account:{show_tab:!0},balance:{show_credit:!0,show_header:!0,show_minutes:!0,show_tab:!0},billing:{show_tab:!0},inbound:{show_tab:!0},outbound:{show_tab:!0},twoway:{show_tab:!0},service_plan:{show_tab:!0},transactions:{show_tab:!0},user:{show_tab:!0},errorTracker:{show_tab:!0}}},_UIRestrictionsCompatibility:function(t){var i=this,o=!1;t.hasOwnProperty("restrictions")&&"undefined"!=typeof t.restrictions&&t.restrictions.hasOwnProperty("myaccount")?t.restrictions=e.extend(!0,{},i.getDefaultRestrictions(),t.restrictions.myaccount):t.restrictions=i.getDefaultRestrictions(),"user"===a.apps.auth.currentUser.priv_level&&n.each(t.restrictions,function(t,e){"user"!==e&&"errorTracker"!==e&&(t.show_tab=!1)}),t.restrictions.hasOwnProperty("user")||(t.restrictions=e.extend(t.restrictions,{account:{show_tab:!0},billing:{show_tab:!0},user:{show_tab:!0}}),delete t.restrictions.profile),n.each(t.restrictions,function(t,e){t.show_tab&&(o=!0)}),t.callback(t.restrictions,o)},formatUiRestrictions:function(t,e){var a=this,i={settings:["account","user"],billing:["billing","transactions","service_plan","balance"],trunking:["inbound","outbound"],misc:["errorTracker"]},o=function(t,a){n.isEmpty(t)&&(a.billing.show_tab=!1),a.categories={};for(var o in i){var c=i[o],r=c.length;c.forEach(function(t){a.hasOwnProperty(t)&&a[t].show_tab||r--}),a.categories[o]={show:r>0?!0:!1}}e(a)};a._UIRestrictionsCompatibility({restrictions:t,callback:function(t){a.callApi({resource:"billing.get",data:{accountId:a.accountId,generateError:!1},success:function(e,n){o(e.data,t)},error:function(e,n){o({},t)}})}})},render:function(){var t=this;t.formatUiRestrictions(a.apps.auth.originalAccount.ui_restrictions,function(n){var i={restrictions:n},o=e(a.template(t,"app",i));a.apps.auth.originalAccount.hasOwnProperty("ui_restrictions")||t.callApi({resource:"account.get",data:{accountId:t.accountId},success:function(e,n){e.data.ui_restrictions=e.data.ui_restrictions||{},e.data.ui_restrictions.myaccount=t.getDefaultRestrictions(),t.callApi({resource:"account.update",data:{accountId:t.accountId,data:e.data}})}}),e(".core-absolute").append(o),t._renderNavLinks(),t.bindEvents(o),t.afterRender(o,n)})},afterRender:function(t,e){var n=this,i=a.apps.auth.currentAccount,o=a.apps.auth.currentUser,c=o.hasOwnProperty("require_password_update")&&o.require_password_update;c||(i.hasOwnProperty("trial_time_left")&&a.config.api.hasOwnProperty("screwdriver")?a.pub("auth.showTrialInfo",i.trial_time_left):n.hasToShowWalkthrough()?n.showWalkthrough(t,function(){n.updateWalkthroughFlagUser()}):n.checkCreditCard(e))},_renderNavLinks:function(t){var n=this;n._UIRestrictionsCompatibility({restrictions:a.apps.auth.originalAccount.ui_restrictions,callback:function(i,o){var c=e("#main_topbar_nav"),r={name:t&&t.name||a.apps.auth.currentUser.first_name+" "+a.apps.auth.currentUser.last_name,showMyaccount:o},s=e(a.template(n,"nav",r));e(n.mainContainer);c.find(".myaccount-common-link").remove(),s.insertAfter(c.find("#main_topbar_apploader"))}})},renderDropdown:function(t,e){var n=this,i=3;a.pub("myaccount.refreshBadges",{callback:function(){t&&(--i||(a.pub("core.showAppName","myaccount"),n.toggle({callback:e})))}})},refreshMyAccount:function(){var t=this,n=e(t.mainContainer);if(n.hasClass("myaccount-open")){t.displayUserSection();var i=n.find(".myaccount-menu .myaccount-element.active").first(),o=i.data("module"),c={module:o,title:t.i18n.active()[o].title};i.data("key")&&(c.key=i.data("key")),t.activateSubmodule(c),a.pub("myaccount.refreshBadges",{except:o})}},bindEvents:function(t){var n=this,i=(e(n.mainContainer),e("#main_topbar_nav"));t.find(".myaccount-close").on("click",function(){n.toggle()}),t.find(".myaccount-element").on("click",function(){var t=e(this),i=t.data("key"),o=t.data("module"),c={module:o};i?(c.title=n.i18n.active()[o][i+"Title"],c.key=i):c.title=n.i18n.active()[o].title,n.activateSubmodule(c),a.pub("myaccount.refreshBadges",{except:c.module})}),i.on("click","#main_topbar_myaccount",function(t){t.preventDefault(),n.clickMyAccount()})},clickMyAccount:function(){var t=this,n=e(t.mainContainer);t._UIRestrictionsCompatibility({restrictions:a.apps.auth.originalAccount.ui_restrictions,callback:function(e,a){a&&(n.hasClass("myaccount-open")?t.hide():t.hasToShowWalkthrough()?t.showWalkthrough(n,function(){t.updateWalkthroughFlagUser()}):t.renderDropdown(!0))}})},toggle:function(t){var n=this,i=(t||{}).callback;n._UIRestrictionsCompatibility({restrictions:a.apps.auth.originalAccount.ui_restrictions,callback:function(t){var a=e(n.mainContainer),o=a.find(".myaccount-menu .myaccount-element").first(),c=n.getDefaultCategory();if(t&&t[c.name]&&t[c.name].show_tab===!1&&(c.name=o.data("module"),o.data("key")&&(c.key=o.data("key"))),a.hasClass("myaccount-open"))n.hide(a);else{var r={title:n.i18n.active()[c.name].title,module:c.name,callback:function(){n.displayUserSection(),a.addClass("myaccount-open"),setTimeout(function(){e("#monster-content").hide()},300),i&&i()}};c.key&&(r.key=c.key),n.activateSubmodule(r)}}})},displayUserSection:function(){if(a.util.isMasquerading()){var t=e('.myaccount-menu .myaccount-element[data-module="user"]');t.hide(),t.hasClass("active")&&(t.removeClass("active"),e(".myaccount-menu .myaccount-element:visible").first().addClass("active"))}else e('.myaccount-menu .myaccount-element[data-module="user"]').show()},activateSubmodule:function(t){var n=this,i=e(n.mainContainer),o=t.key?i.find('[data-module="'+t.module+'"][data-key="'+t.key+'"]'):i.find('[data-module="'+t.module+'"]');i.find(".myaccount-menu .nav li").removeClass("active"),o.addClass("active"),i.find(".myaccount-module-title").html(t.title),i.find(".myaccount-content").empty(),a.pub("myaccount."+t.module+".renderContent",t)},_renderSubmodule:function(t){var n=e("#myaccount");n.find(".myaccount-right .myaccount-content").html(t),n.find(".myaccount-menu .nav li.active")&&(n.find(".myaccount-right .nav li").first().addClass("active"),n.find(".myaccount-right .tab-content div").first().addClass("active"))},hide:function(t,n){var i=this,t=t||e(i.mainContainer);a.pub("core.showAppName",e("#main_topbar_current_app_name").data("originalName")),t.find(".myaccount-right .myaccount-content").empty(),t.removeClass("myaccount-open"),e("#monster-content").show(),a.pub("myaccount.closed")},_hide:function(){var t=this,n=e(t.mainContainer);n.hasClass("myaccount-open")&&t.hide(n)},_updateMenu:function(t){if(void 0!==t.data){var n=t.hasOwnProperty("key")?'[data-key="'+t.key+'"] .badge':'[data-module="'+t.module+'"] .badge';e(n).html(t.data)}t.callback&&t.callback()},checkCreditCard:function(t){var e=this;a.apps.auth.resellerId===a.config.resellerId&&t.billing.show_tab&&!a.util.isSuperDuper()&&e.hasCreditCards(function(t){t===!1&&e.showCreditCardTab()})},hasCreditCards:function(t){var e=this,n=!1;e.getBraintree(function(e){n=(e.credit_cards||[]).length>0,t&&t(n)},function(){t&&t(n)})},showCreditCardTab:function(){var t=this;t.renderDropdown(!0,function(){var n="billing";t.activateSubmodule({title:t.i18n.active()[n].title,module:n,callback:function(){var n=e("#myaccount .myaccount-content .billing-content-wrapper");t._openAccordionGroup({link:n.find('.settings-item[data-name="credit_card"] .settings-link')}),i.error(t.i18n.active().billing.missingCard)}})})},hasToShowWalkthrough:function(t){var e=this,n=e.uiFlags.user.get("showfirstUseWalkthrough")!==!1;return"function"!=typeof t?n:void t(n)},updateWalkthroughFlagUser:function(t){var e=this,n=e.uiFlags.user.set("showfirstUseWalkthrough",!1);e.updateUser(n,function(e){t&&t(e)})},showWalkthrough:function(t,e){var n=this;n.showMyAccount(function(){a.apps.auth.currentAccount.hasOwnProperty("trial_time_left")?n.renderStepByStepWalkthrough(t,e):n.showGreetingWalkthrough(function(){n.renderStepByStepWalkthrough(t,e)},e)})},showMyAccount:function(t){var e=this,n="user";e.renderDropdown(!0,function(){e.activateSubmodule({title:e.i18n.active()[n].title,module:n,callback:function(){t&&t()}})})},showGreetingWalkthrough:function(t,n){var i=this,o=e(a.template(i,"walkthrough-greetingsDialog"));o.find("#start_walkthrough").on("click",function(){c.dialog("close").remove(),t&&t()});var c=a.ui.dialog(o,{title:i.i18n.active().walkthrough.greetingsDialog.title});c.siblings().find(".ui-dialog-titlebar-close").on("click",function(){n&&n()})},showEndWalkthrough:function(t){var n=this,i=e(a.template(n,"walkthrough-endDialog"));i.find("#end_walkthrough").on("click",function(){o.dialog("close").remove(),t&&t()});var o=a.ui.dialog(i,{title:n.i18n.active().walkthrough.endDialog.title})},renderStepByStepWalkthrough:function(t,n){var i=this,o=[{element:e("#main_topbar_myaccount")[0],intro:i.i18n.active().walkthrough.steps[1],position:"left"},{element:t.find('.myaccount-element[data-module="user"]')[0],intro:i.i18n.active().walkthrough.steps[2],position:"right"},{element:t.find('.myaccount-element[data-module="account"]')[0],intro:i.i18n.active().walkthrough.steps[3],position:"right"},{element:t.find('.myaccount-element[data-module="billing"]')[0],intro:i.i18n.active().walkthrough.steps[4],position:"right"},{element:t.find('.myaccount-element[data-module="balance"]')[0],intro:i.i18n.active().walkthrough.steps[5],position:"right"},{element:t.find('.myaccount-element[data-module="servicePlan"]')[0],intro:i.i18n.active().walkthrough.steps[6],position:"right"},{element:t.find('.myaccount-element[data-module="transactions"]')[0],intro:i.i18n.active().walkthrough.steps[7],position:"right"}];a.ui.stepByStep(o,function(){i.showEndWalkthrough(n)})},getBraintree:function(t){var e=this;e.callApi({resource:"billing.get",data:{accountId:e.accountId,generateError:!1},success:function(e){t&&t(e.data)},error:function(e,n){t&&t({})}})},validatePasswordForm:function(t,e){a.ui.validate(t,{rules:{password:{minlength:6},confirm_password:{equalTo:'input[name="password"]'}}}),a.ui.valid(t)&&e&&e()},_myaccountEvents:function(t){var i=this,o=t.data,c=t.template,r=function(){var t=c.find("li.settings-item.open"),e=t.find("a.settings-link");t.find(".settings-item-content").slideUp("fast",function(){e.find(".update .text").text(i.i18n.active().editSettings),e.find(".update i").removeClass("fa-times").addClass("fa-cog"),t.removeClass("open"),t.find(".uneditable").show(),t.find(".edition").hide()})},s=function(t,e,n){var a=c.find("#form_password");a.length?i.validatePasswordForm(a,n):n&&n()};c.find(".settings-link").on("click",function(){var t=e(this).parent().hasClass("open");if(r(),!t){var a={link:e(this)};o.hasOwnProperty("billing")&&(a.hasEmptyCreditCardInfo=n.isEmpty(o.billing.credit_cards)),i._openAccordionGroup(a)}}),c.find(".cancel").on("click",function(t){t.preventDefault(),r(),e(this).parents("form").first().find("input").each(function(t,n){var a=e(n);a.val(a.data("original_value"))})}),c.find(".change").on("click",function(t){t.preventDefault();var n=e(this),c=n.parents("#myaccount").find(".myaccount-menu .myaccount-element.active").data("module"),r=n.data("module");fieldName=n.data("field"),newData=function(t,e){return"billing"===t&&(e.credit_card.expiration_date=e.extra.expiration_date.month+"/"+e.extra.expiration_date.year),e}(r,a.ui.getFormData("form_"+fieldName)),s(fieldName,newData,function(){i.settingsUpdateData(r,o[r],newData,function(t){var n={callback:function(n){"credit_card"===fieldName?(n.find(".edition").hide(),n.find(".uneditable").show()):"colorblind"===fieldName&&e("body").toggleClass("colorblind",t.data.ui_flags.colorblind),i.highlightField(n,fieldName),"function"==typeof callbackUpdate&&callbackUpdate()}};a.pub("myaccount."+c+".renderContent",n)})})})},highlightField:function(t,e){var n=t.find("li[data-name="+e+"]");n.find(".update").hide(),n.find(".changes-saved").show().fadeOut(1500,function(){n.find(".update").fadeIn(500)}),n.css("background-color","#22a5ff").animate({backgroundColor:"#f6f6f6"},2e3),t.find("li.settings-item .settings-item-content").hide(),t.find("li.settings-item a.settings-link").show()},_openAccordionGroup:function(t){var e=this,n=t.link,a=n.parents(".settings-item"),i=t.hasEmptyCreditCardInfo===!1?!1:!0;a.addClass("open"),n.find(".update .text").text(e.i18n.active().close),n.find(".update i").removeClass("fa-cog").addClass("fa-times"),a.find(".settings-item-content").slideDown("fast"),"credit_card"===a.data("name")&&i&&(a.find(".uneditable").hide(),a.find(".edition").show())},settingsUpdateData:function(t,n,i,o,c){var r=this,s={accountId:r.accountId,data:e.extend(!0,{},n,i)};"user"===t?(s.accountId=a.apps.auth.originalAccount.id,s.userId=r.userId,s.data.timezone&&"inherit"===s.data.timezone&&delete s.data.timezone):"billing"===t&&(s.data=i),"language"in s.data&&"auto"===s.data.language&&delete s.data.language,s.data=function(t){return delete t.extra,delete t[""],t}(s.data),r.callApi({resource:t.concat(".update"),data:s,success:function(t,e){"function"==typeof o&&o(t,e)},error:function(t,e){"function"==typeof c&&c(t,e)}})},updateUser:function(t,e){var n=this;n.callApi({resource:"user.update",data:{userId:t.id,accountId:a.apps.auth.originalAccount.id,data:t},success:function(t){e&&e(t.data)}})}};return o});