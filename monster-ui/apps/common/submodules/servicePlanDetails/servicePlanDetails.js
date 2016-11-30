define(["require","jquery","underscore","monster"],function(e){var a=e("jquery"),t=e("underscore"),i=e("monster"),n={requests:{},subscribe:{"common.servicePlanDetails.render":"servicePlanDetailsRender","common.servicePlanDetails.getServicePlanTemplate":"servicePlanCustomizeGetTemplate","common.servicePlanDetails.customizeSave":"servicePlanCustomizeSave"},servicePlanDetailsRender:function(e){var a=this,t=e.container,i=e.servicePlan||null,n=e.useOwnPlans||!1,r=e.callback,s=e.accountId||a.accountId;if(!t)throw"You must provide a container!";"string"==typeof i?a.callApi({resource:n?"servicePlan.get":"servicePlan.getAvailable",data:{accountId:s,planId:i},success:function(e,i){a.renderServicePlanDetails(t,e.data,r)}}):a.renderServicePlanDetails(t,i,r)},servicePlanDetailsFormatData:function(e){var a=this,i={servicePlan:{}};e.hasOwnProperty("items")&&!e.hasOwnProperty("plan")&&(e.plan=e.items);var n=function(e){var i,n={},r=[],s={},c=a.i18n.active().servicePlanDetails.keys;return t.each(e,function(e,a){i=e.hasOwnProperty("name")?e.name:c.hasOwnProperty(a)?c[a]:a,s={key:a,value:i.toLowerCase()},r.push(s)}),r.sort(function(e,a){return e.value>a.value?1:-1}),t.each(r,function(a){n[a.key]=e[a.key]}),n};return e.plan=n(e.plan),t.each(e.plan,function(a,t){e.plan[t]=n(a)}),i.servicePlan=e,i},renderServicePlanDetails:function(e,t,n){var r=this,s=r.servicePlanDetailsFormatData(t),c=a(i.template(r,"servicePlanDetails-layout",s));i.ui.tooltips(c),e.empty().append(c),n&&n({template:c,data:t})},servicePlanCustomizeGetOverrideDefault:function(){var e={number_services:{_all:{rate:{},activation_charge:{},minimum:{},exceptions:{},as:{},discounts:{maximum:{},rate:{}}},port:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},cnam:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},e911:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}}},devices:{_all:{rate:{},activation_charge:{},minimum:{},exceptions:{},as:{},discounts:{maximum:{},rate:{}}},ata:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},cellphone:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},fax:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},landline:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},mobile:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},sip_device:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},sip_uri:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},smartphone:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},softphone:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}}},limits:{_all:{rate:{},activation_charge:{},minimum:{},exceptions:{},as:{},discounts:{maximum:{},rate:{}}},outbound_trunks:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},inbound_trunks:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},twoway_trunks:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}}},phone_numbers:{_all:{rate:{},activation_charge:{},minimum:{},exceptions:{},as:{},discounts:{maximum:{},rate:{}}},tollfree_us:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},toll_us:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},emergency:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},caribbean:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},did_us:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},international:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},unknown:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}}},users:{_all:{rate:{},activation_charge:{},minimum:{},exceptions:{},as:{},discounts:{maximum:{},rate:{}}},user:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}},admin:{rate:{},activation_charge:{},minimum:{},discounts:{maximum:{},rate:{}}}},ui_apps:function(){var e={};return t.each(i.appsStore,function(a,t){e[t]={}}),e}()};return t.each(e,function(e){t.each(e,function(e){e.hasOptions=!t.isEmpty(e),t.each(e,function(e){e.hasOptions=!t.isEmpty(e)})})}),e},servicePlanCustomizeGetTemplate:function(e){var n=this,r=e,s=e.mode||"edit",c=e.useOwnPlans||!1,l=r.accountId||n.accountId;i.parallel({current:function(e){"new"===s?e(null,{}):n.servicePlanDetailsGetCurrentSP(l,function(a){var r={details:a,selectedPlans:{}};if(a&&a.plans&&!t.isEmpty(a.plans)){var s={};t.each(a.plans,function(e,a){s[a]=function(e){n.servicePlanDetailsGetSP(a,l,!1,function(a){e&&e(null,a)},function(a){e(null,a)})}}),i.parallel(s,function(a,i){t.each(i,function(e,a){t.isEmpty(e)&&delete i[a]}),r.selectedPlans=i,e&&e(null,r)})}else e(null,r)})},listAvailable:function(e){n.servicePlanDetailsListSP(l,c,function(a){e(null,a)})}},function(e,s){var o,u,d=n.servicePlanCustomizeFormatData(s),m=a(i.template(n,"servicePlanDetails-customizeView",d));t.each(d.selectedPlans,function(e,a){o=m.find('[value="'+a+'"]:selected').parents(".customize-details-wrapper").find(".details-selected-service-plan"),n.servicePlanDetailsRender({accountId:l,servicePlan:e,container:o})}),t.each(d.categories,function(e,a){u=m.find('select[name="'+a+'"]').parents(".customize-details-wrapper").find(".customize-override-wrapper"),n.servicePlanDetailsRenderOverride(u,e.overrides)}),m.find(".service-plan-selector").on("change",function(){var e=a(this),t=e.val(),i=e.parents(".customize-details-wrapper").find(".details-selected-service-plan");i.empty(),"none"!==t?(e.parents(".category-wrapper").addClass("has-selected"),n.servicePlanDetailsGetSP(t,l,c,function(e){n.servicePlanDetailsRender({accountId:l,servicePlan:e,container:i})})):e.parents(".category-wrapper").removeClass("has-selected")}),r.afterRender&&r.afterRender(m,d)})},servicePlanCustomizeFormatData:function(e){var a=this,i={},n={};return t.each(e.listAvailable,function(a){n.hasOwnProperty(a.category)||(n[a.category]={friendlierName:a.category,plans:[]}),i={id:a.id,name:a.name},e.current&&e.current.details&&e.current.details.hasOwnProperty("plans")&&e.current.details.plans.hasOwnProperty(a.id)&&(i.selected=!0,n[a.category].hasSelected=!0,n[a.category].overrides=e.current.details.plans[a.id].overrides,e.current.details.plans[a.id].overrides&&(n[a.category].overrides=e.current.details.plans[a.id].overrides)),n[a.category].plans.push(i)}),{categories:n,selectedPlans:e.current.selectedPlans,allowedOverrides:a.servicePlanCustomizeGetOverrideDefault()}},servicePlanDetailsGetDataToSave:function(e,n,r){var s={},c={accountId:e,plansToDelete:[],plansToAdd:[],overrides:{}};return t.each(r,function(e,a){s[a]=!0}),n.find("select.service-plan-selector").each(function(){var e=a(this).val();"none"!==e&&(s.hasOwnProperty(e)?delete s[e]:c.plansToAdd.push(e))}),t.each(s,function(e,a){c.plansToDelete.push(a)}),n.find(".details-overrides [data-key]").each(function(){var e=a(this),t=e.parents(".category-wrapper").find(":selected").val(),n=e.parents("[data-category]").data("category"),r=e.data("key"),s=e.find("[data-field]").length>0;if("none"!==t&&(c.overrides[t]=c.overrides[t]||{},c.overrides[t][n]=c.overrides[t][n]||{},c.overrides[t][n][r]=c.overrides[t][n][r]||{},"ui_apps"===n&&(c.overrides[t][n][r]={enabled:!0,app_id:i.appsStore[r].id,name:i.appsStore[r].i18n["en-US"].label,account_id:i.apps.auth.originalAccount.id}),s)){var l,o,u;e.find("[data-field]").each(function(e){var i=a(this);l=i.data("field"),o=i.find(".input-value").val(),u=i.data("subfield"),"exceptions"===l&&(o=o.split(",")),u?(c.overrides[t][n][r][l]=c.overrides[t][n][r][l]||{},"discounts"===!l?c.overrides[t][n][r][l][u]=o:(c.overrides[t][n][r][l].hasOwnProperty("cumulative")||(c.overrides[t][n][r][l].cumulative={}),c.overrides[t][n][r][l].cumulative[u]=o)):c.overrides[t][n][r][l]=o})}}),c},servicePlanCustomizeInternalSaveData:function(e,a){var t=this;t.servicePlanDetailsUpdateSP(e.plansToDelete,e.plansToAdd,e.accountId,function(){t.servicePlanDetailsAddManyOverrideSP(e.overrides,e.accountId,function(){t.servicePlanDetailsGetCurrentSP(e.accountId,function(e){a&&a(e)})})})},servicePlanDetailsFormatOverride:function(e){var a=this,i=a.servicePlanCustomizeGetOverrideDefault(),n={overrides:e,allowedOverrides:{}},r={};return t.each(i,function(e,a){r[a]=[],t.each(e,function(e,t){"_all"!==t&&r[a].push(t)})}),t.each(e,function(a,n){t.each(a,function(a,s){"ui_apps"===n?(delete i[n][s],e.ui_apps[s]={}):t.each(a,function(c,l){"discounts"===l?(c.hasOwnProperty("cumulative")&&(e[n][s][l]=c.cumulative,c=c.cumulative),t.each(c,function(e,a){i.hasOwnProperty(n)&&i[n].hasOwnProperty(s)&&i[n][s].hasOwnProperty(l)&&delete i[n][s][l][a]})):i.hasOwnProperty(n)&&i[n].hasOwnProperty(s)&&("as"===l&&(a.asCategories=r[n]),delete i[n][s][l])})})}),n.allowedOverrides=i,n},servicePlanDetailsRenderOverride:function(e,n,r){var s=this,c=r||"",l=n||{},o=s.servicePlanDetailsFormatOverride(l),u=a(i.template(s,"servicePlanDetails-overrideView",o)),d=function(){var e={};return u.find(".details-overrides [data-key]").each(function(){var t=a(this),i=t.parents("[data-category]").data("category"),n=t.data("key"),r=t.find("[data-field]").length>0;if(e[i]=e[i]||{},e[i][n]=e[i][n]||{},r){var s,c;t.find("[data-field]").each(function(t){var r=a(this);s=r.data("field"),subField=r.data("subfield"),c=r.find(".input-value").val(),subField?(e[i][n][s]=e[i][n][s]||{},e[i][n][s][subField]=c):e[i][n][s]=c})}}),e};u.find(".remove-line").on("click",function(){var i=d(),n=a(this),r=0===n.parents("[data-field]").length,c=n.parents("[data-subfield]").length>0,l=n.parents("[data-category]").data("category"),o=n.parents("[data-key]").data("key"),u=r?"":n.parents("[data-field]").data("field"),m=c?n.parents("[data-subfield]").data("subfield"):"";r?delete i[l][o]:c?delete i[l][o][u][m]:delete i[l][o][u],i[l].hasOwnProperty(o)&&i[l][o].hasOwnProperty(u)&&t.isEmpty(i[l][o][u])&&delete i[l][o][u],i[l].hasOwnProperty(o)&&t.isEmpty(i[l][o])&&delete i[l][o],t.isEmpty(i[l])&&delete i[l],s.servicePlanDetailsRenderOverride(e,i)}),u.find(".select-field-override .selectable").on("click",function(){var t=a(this),i="undefined"!=typeof t.attr("data-key"),n="undefined"!=typeof t.attr("data-subfield"),r=d(),l=t.parents("[data-category]").data("category"),o=i?t.data("key"):t.parents("[data-key]").data("key"),u=i?"":n?t.parents("[data-field]").data("field"):t.data("field"),m=n?t.data("subfield"):"";r[l]=r[l]||{},r[l][o]=r[l][o]||{},u&&(r[l][o][u]=r[l][o][u]||{},m?r[l][o][u][m]="":r[l][o][u]=""),c='[data-category="'+l+'"] [data-key="'+o+'"] [data-field="'+u+'"] input',s.servicePlanDetailsRenderOverride(e,r,c)}),e.empty().append(u),c&&u.find(c).focus()},servicePlanCustomizeSave:function(e){var a=this,t=e,i=t.accountId||a.accountId,n=t.previousPlans||{},r=t.divResult||void 0,s=t.container,c=a.servicePlanDetailsGetDataToSave(i,s,n);a.servicePlanCustomizeInternalSaveData(c,function(e){r&&a.servicePlanDetailsRender({accountId:i,servicePlan:e,container:r}),t.callback&&t.callback(e)})},servicePlanDetailsListSP:function(e,a,t){var i=this;i.callApi({resource:a?"servicePlan.list":"servicePlan.listAvailable",data:{accountId:e},success:function(e){t&&t(e.data)}})},servicePlanDetailsGetSP:function(e,a,t,i,n){var r=this;r.callApi({resource:t?"servicePlan.get":"servicePlan.getAvailable",data:{planId:e,accountId:a,generateError:!1},success:function(e){i&&i(e.data)},error:function(e,a,t){e&&e.data&&e.data.hasOwnProperty("message")&&"bad identifier"===e.data.message?n&&n({}):t(e,{generateError:!0})}})},servicePlanDetailsGetCurrentSP:function(e,a){var t=this;t.callApi({resource:"servicePlan.listCurrent",data:{accountId:e},success:function(e){a&&a(e.data)}})},servicePlanDetailsAddManySP:function(e,a,t){var i=this;e.length?i.callApi({resource:"servicePlan.addMany",data:{accountId:a,data:{plans:e}},success:function(e){t&&t(e.data)}}):t&&t({})},servicePlanDetailsRemoveSP:function(e,a,t){var i=this;i.callApi({resource:"servicePlan.remove",data:{planId:e,accountId:a},success:function(e){t&&t(e.data)}})},servicePlanDetailsRemoveManySP:function(e,a,t){var i=this;i.callApi({resource:"servicePlan.removeMany",data:{accountId:a,data:{plans:e}},success:function(e){t&&t(e.data)}})},servicePlanDetailsAddManyOverrideSP:function(e,a,t){var i=this;i.callApi({resource:"servicePlan.addManyOverrides",data:{accountId:a,data:{overrides:e}},success:function(e){t&&t(e.data)}})},servicePlanDetailsUpdateSP:function(e,a,t,i){var n=this;a.length+e.length?n.callApi({resource:"servicePlan.update",data:{accountId:t,data:{add:a,"delete":e}},success:function(e){i&&i(e.data)}}):i&&i()}};return n});