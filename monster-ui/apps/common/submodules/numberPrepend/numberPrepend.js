define(["require","jquery","underscore","monster","toastr"],function(e){var n=e("jquery"),r=(e("underscore"),e("monster")),t=e("toastr"),u={requests:{},subscribe:{"common.numberPrepend.renderPopup":"numberPrependEdit"},numberPrependEdit:function(e){var n=this,t={success:function(r){n.numberPrependRender(r,e.callbacks)},number:e.phoneNumber};r.pub("common.numbers.editFeatures",t)},numberPrependRender:function(e,u){var o,c=this,d=n(r.template(c,"numberPrepend-layout",e.prepend||{}));d.find(".save").on("click",function(d){d.preventDefault();var a=r.ui.getFormData("number_prepend");a.enabled=a.name&&a.name.length>0?!0:!1,n.extend(!0,e,{prepend:a}),c.numberPrependUpdateNumber(e.id,e,function(e){var n=r.util.formatPhoneNumber(e.data.id),d=r.template(c,"!"+c.i18n.active().numberPrepend.successUpdate,{phoneNumber:n});t.success(d),o.dialog("destroy").remove(),u.success&&u.success(e)},function(e){u.error&&u.error(e)})}),d.find(".cancel-link").on("click",function(e){e.preventDefault(),o.dialog("destroy").remove()}),o=r.ui.dialog(d,{title:c.i18n.active().numberPrepend.dialogTitle})},numberPrependUpdateNumber:function(e,n,r,t){var u=this;u.callApi({resource:"numbers.update",data:{accountId:u.accountId,phoneNumber:encodeURIComponent(e),data:n},success:function(e,n){r&&r(e)},error:function(e,n){t&&t(e)}})}};return u});