winkstart.module("auth","onboarding",{css:[_t("onboarding","css_onboarding")],templates:{new_onboarding:"tmpl/onboarding.html",step1:"tmpl/step1.html",step2:"tmpl/step2.html",step3:"tmpl/step3.html",small_office:"tmpl/small_office.html",reseller:"tmpl/reseller.html"},subscribe:{"nav.get_started":"render_onboarding","onboard.register":"render_onboarding","onboard.error_handling":"error_handling"},validation:{step1:[],step2:[{name:"#cardholder_name",regex:_t("onboarding","cardholder_name_regex")},{name:"#card_number",regex:/^[0-9\s\-]{10,22}$/},{name:"#cvv",regex:/^[0-9]{2,6}$/},{name:"#street_address",regex:/^.+$/},{name:"#extended_address",regex:/^.*/},{name:"#region",regex:_t("onboarding","region_locality_regex")},{name:"#locality",regex:_t("onboarding","region_locality_regex")},{name:"#country",regex:_t("onboarding","country_regex")},{name:"#postal_code",regex:/^[0-9\-]{4,10}$/}],step3:[{name:"#password",regex:/^.{3,16}$/},{name:"#verify_password",regex:/^.{3,16}$/},{name:"#email",regex:_t("onboarding","email_regex")},{name:"#verify_email",regex:_t("onboarding","email_regex")},{name:"#company_name",regex:/^.*$/},{name:"#name",regex:/^.*$/}]},resources:{"onboard.create":{url:"{api_url}/onboard",contentType:"application/json",verb:"PUT"},"phone_number.get":{url:"{api_url}/phone_numbers?prefix={prefix}&quantity={quantity}",contentType:"application/json",verb:"GET"},"phone_number.create":{url:"{api_url}/accounts/{account_id}/phone_numbers/{number}/activate",contentType:"application/json",verb:"PUT"},"phone_number.update":{url:"{api_url}/accounts/{account_id}/phone_numbers/{number}",contentType:"application/json",verb:"POST"},"braintree.create":{url:"{api_url}/accounts/{account_id}/braintree/customer",contentType:"application/json",verb:"POST"}}},function(e){var t=this;winkstart.registerResources(t.__whapp,t.config.resources)},{error_handling:function(e,t){var n=this,r=$("#onboarding-view"),i=winkstart.print_r(e),s="Errors: ",o=e.data.errors;$.each(o,function(e,n){e=="braintree"&&(s+=o.braintree.data.api_error.message),e=="phone_numbers"&&(o.phone_numbers[t].data.provider_fault&&(s+=_t("onboarding","incorrect_address")),o.phone_numbers[t].data.carrier_fault&&(s+=_t("onboarding","number_already_used")))}),winkstart.alert("error",{text:s,data:i})},parse_username:function(e){var t={first_name:"",last_name:""},n=e.indexOf(" ");return t.first_name=e.substring(0,n),t.last_name=e.substring(n+1),t.first_name==""&&(t.first_name=t.last_name,t.last_name=""),t},clean_form_data:function(e,t){var n=this,r=e.extra.number,s=$.md5(e.extra.email+":"+e.extra.password),o=n.parse_username(e.extra.name),u=n.parse_username(e.braintree.credit_card.cardholder_name),a;e.extra.braintree_country_other!=""&&(e.braintree.credit_card.billing_address.country=e.extra.braintree_country_other),e.braintree.credit_card.number=e.braintree.credit_card.number.replace(/\s\-/g,""),e.braintree.credit_card.expiration_date=e.extra.expiration_month+"/"+e.extra.expiration_year,e.braintree.first_name=u.first_name,e.braintree.last_name=u.last_name,e.braintree.credit_card.make_default=!0,e.braintree.credit_card.billing_address.first_name=u.first_name,e.braintree.credit_card.billing_address.last_name=u.last_name,e.braintree.email=e.extra.email,e.braintree.company=e.account.name,e.account.role=$("input:radio[name=account.role]:checked",t).val(),e.extensions=[{user:{credentials:s,priv_level:"admin",first_name:o.first_name,last_name:o.last_name,email:e.extra.email,apps:winkstart.config.onboard_roles?winkstart.config.onboard_roles[e.account.role||"default"].apps:winkstart.config.register_apps},callflow:{numbers:[r]}}],(e.account.role=="api_developer"||e.account.role=="voip_minutes")&&delete e.extensions[0].callflow;if(e.account.role=="small_office"||e.account.role=="reseller"){a=$("#extension_1",t).val(),e.extensions[0].callflow.numbers.push(a);for(i=2;i<6;i++){o=n.parse_username($("#name_"+i,t).val()),a=$("#extension_"+i,t).val();if(o.first_name){var f={user:{first_name:o.first_name,last_name:o.last_name,priv_level:"user"},callflow:{numbers:[a]}};e.extensions.push(f)}}}return e.account.caller_id={"default":{number:r},emergency:{number:r}},e.account.available_apps=winkstart.config.onboard_roles?winkstart.config.onboard_roles[e.account.role||"default"].available_apps:[],e.phone_numbers={},e.phone_numbers[r]={},delete e.e911,delete e.field_data,delete e.extra,e},load_step1:function(e,t){var n=this,r=1,i="",s="",o,u=15,a,f=0,l,c,h=t;$(".pick_number_right",h).hide(),$("#e911_block",h).hide(),$("#e911_country_block",h).hide(),$("#e911_country",h).attr("disabled","disabled"),$("#change_number, #change_number_link",h).click(function(e){e.preventDefault(),i=$("#area_code",h).val(),$("#e911_block",h).hide(),$(".pick_number_right",h).hide(),$(".pick_number_left",h).css("float","none");if(i.match(/[0-9]{3}/)){var t=function(){$(".pick_number_left",h).css("float","left"),$(".pick_number_right",h).show(),$("#e911_block",h).show(),$("#e911_postal_code",h).focus()};!c||o!=i?winkstart.request(!0,"phone_number.get",{api_url:winkstart.apps.auth.api_url,prefix:i,quantity:u},function(e,n){e.data.length>0?(a=e.data.length,c=e.data,l=0,f=Math.floor(Math.random()*a),o=i,s=c[f],$(".pick_number_left",h).css("float","left"),$("#picked_number",h).attr("data-number",s),$("#picked_number",h).show().html(s.replace(/(\+1)([0-9]{3})([0-9]{3})([0-9]{4})/,"$1 ($2) $3-$4")),t()):winkstart.alert("error",_t("onboarding","no_dids_were_found"))}):a>1?(f=Math.floor(Math.random()*a),f==l?f!=0?f--:f++:!0,l=f,s=c[f],$("#picked_number",h).attr("data-number",s),$("#picked_number",h).show().html(s.replace(/(\+1)([0-9]{3})([0-9]{3})([0-9]{4})/,"$1 ($2) $3-$4")),t()):winkstart.alert(_t("onboarding","this_number_is_the_only_number_available"))}else winkstart.alert(_t("onboarding","you_need_to_input_a_valid"))}),$("#e911_country",h).change(function(){$(this).val()=="Other"?$("#e911_country_block",h).show():$("#e911_country_block",h).hide()}),$("#e911_postal_code",h).blur(function(){$("#e911_country",h).val()!="Other"&&$(this).val()!=""&&$.getJSON("http://www.geonames.org/postalCodeLookupJSON?&country="+$("#e911_country",h).val()+"&callback=?",{postalcode:$(this).val()},function(e){e&&e.postalcodes.length&&e.postalcodes[0].placeName&&($("#e911_locality",h).val(e.postalcodes[0].placeName),$("#e911_region",h).val(e.postalcodes[0].adminName1))})})},load_step2:function(e,t){var n=this,r=2,i=t;$("#country",i).attr("disabled","disabled"),$("#billing_country_text",i).hide(),$("#country",i).change(function(){$(this).val()==="Other"?$("#billing_country_text",i).show():$("#billing_country_text",i).hide()}),$(".cvv_help_icon",i).hover(function(){$(".cvv_help",i).show(),$(".credit_card_help",i).hide()},function(){$(".cvv_help",i).hide(),$(".credit_card_help",i).show()}),$("#postal_code",i).blur(function(){$("#country",i).val()!="Other"&&$(this).val()!=""&&$.getJSON("http://www.geonames.org/postalCodeLookupJSON?&country="+$("#country",i).val()+"&callback=?",{postalcode:$(this).val()},function(e){e&&e.postalcodes.length&&e.postalcodes[0].placeName&&($("#locality",i).val(e.postalcodes[0].placeName),$("#region",i).val(e.postalcodes[0].adminName1))})}),$("#use_e911",i).change(function(){$(this).is(":checked")?($("#street_address",i).val($("#e911_street_address",i).val()),$("#extended_address",i).val($("#e911_extended_address",i).val()),$("#country",i).val($("#e911_country",i).val()),$("#region",i).val($("#e911_region",i).val()),$("#locality",i).val($("#e911_locality",i).val()),$("#postal_code",i).val($("#e911_postal_code",i).val())):($("#street_address",i).val(""),$("#extended_address",i).val(""),$("#region",i).val(""),$("#locality",i).val(""),$("#postal_code",i).val(""),$("#country",i).val("US"))})},load_step3:function(e,t){var n=this,r=3,i=t,s=function(e){var t=e[0],n=e[1],r=function(){t.val()!=n.val()?n.parent(".validated").removeClass("valid").addClass("invalid"):n.parent(".validated").removeClass("invalid")};t.bind("keyup blur onchange",function(){r()}),n.bind("keyup blur onchange",function(){r()})};s([$("#email",i),$("#verify_email",i)]),s([$("#password",i),$("#verify_password",i)]),$("#name",i).bind("keyup blur onchange",function(){$(".your_extension",i).text($(this).val())}),$(".role_radio",i).click(function(){var e=$("input:radio[name=account.role]:checked").val(),t=$(this).parents(".role_div").first(),r={_t:function(e){return window.translate.onboarding[e]}};$(".role_content").slideUp().empty();if(e in n.templates){if(e==="small_office"||e==="reseller")r.username=$("#name",i).val();$(".role_content",t).hide().append(n.templates[e].tmpl(r)).slideDown()}})},move_to_step:function(e,t,n){var r=$("#fast_onboarding_form",t),i=parseFloat(r.dataset("maxstep"));r.attr("data-step",e),$(".step_buttons > button",t).hide(),n?($(".onboarding_title",t).empty().html(n),$(".steps_nav",t).hide(),$("#save_account",t).show()):(e===i?$("#save_account",t).show():$(".next_step",t).show(),e>1&&$(".prev_step",t).show(),$(".step_title").removeClass("current"),$("#step_title_"+e,t).addClass("current")),$(".step_content",t).hide(),$("#step"+e,t).show();switch(e){case 1:$("#area_code",t).focus();case 2:$("#cardholder_name",t).focus();case 3:$("#name",t).focus()}$("html, body").scrollTop(0)},load_step:function(e,t,n){var r=this;$("#fast_onboarding_form",t).append(r.templates["step"+e].tmpl({_t:function(e){return window.translate.onboarding[e]}}));switch(e){case 1:r.load_step1(n,t);break;case 2:r.load_step2(n,t);break;case 3:r.load_step3(n,t)}},render_onboarding:function(e){var t=this,n=t.templates.new_onboarding.tmpl({_t:function(e){return window.translate.onboarding[e]}}),r=$("#fast_onboarding_form",n),i=r.dataset("max-step"),s=1;t.load_step(1,n),t.load_step(2,n),t.load_step(3,n),t.move_to_step(s,n),$.each(t.config.validation,function(){winkstart.validate.set(this,n)}),$(".next_step",n).click(function(){var e=function(){winkstart.validate.is_valid(t.config.validation["step"+s],n,function(){t.move_to_step(++s,n)},function(){winkstart.alert(_t("onboarding","you_cant_go_to_the_next"))})};switch(s){case 1:$("#picked_number",n).attr("data-number").replace(/\-\+\(\)\s/g,"").match(/[0-9]{10}/)?e():(winkstart.alert(_t("onboarding","you_need_to_give_an_area_code")),$("#area_code",n).focus());break;default:e()}}),$(".prev_step",n).click(function(){t.move_to_step(--s,n)}),$("#save_account",n).click(function(){if($("#password",n).val()!=$("#verify_password",n).val())return winkstart.alert(_t("onboarding","passwords_are_not_matching")),$("#password",n).val(""),$("#verify_password",n).val(""),winkstart.validate.is_valid(t.config.validation.step3,n,function(){},function(){}),!0;if($("#email",n).val()!=$("#verify_email",n).val())return winkstart.alert(_t("onboarding","email_addresses_are_not_matching")),$("#email",n).val(""),$("#verify_email",n).val(""),winkstart.validate.is_valid(t.config.validation.step3,n,function(){},function(){}),!0;winkstart.validate.is_valid(t.config.validation.step3,n,function(){$("html, body").scrollTop(0);var e=form2object("fast_onboarding_form");number=$("#picked_number",n).dataset("number"),e.extra.number=number,t.clean_form_data(e,n),winkstart.request(!0,"onboard.create",{api_url:winkstart.apps.auth.api_url,data:e},function(e,t){var n=[],r;if(e&&e.data.owner_id&&e.data.account_id&&e.data.auth_token){var i=function(){$("#ws-content").empty(),winkstart.apps.auth.user_id=e.data.owner_id,winkstart.apps.auth.account_id=e.data.account_id,winkstart.apps.auth.auth_token=e.data.auth_token,$.cookie("c_winkstart_auth",JSON.stringify(winkstart.apps.auth)),winkstart.publish("auth.load_account")};i()}else winkstart.alert("error",_t("onboarding","error_while_creating_your_account"))},function(e,r){e.data.errors=e.data.errors||{},winkstart.publish("onboard.error_handling",e,number),s=1,t.move_to_step(1,n)})},function(){winkstart.alert(_t("onboarding","you_cant_finish"))})}),$("#ws-content").empty().append(n)}});