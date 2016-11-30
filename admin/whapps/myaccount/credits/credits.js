winkstart.module("myaccount","credits",{css:["css/credits.css"],subscribe:{"credits.activate":"nav_activate"},templates:{credits:"tmpl/credits.html",stat_credits:"tmpl/stat_credits.html"},resources:{"myaccount_credits.get_user":{url:"{api_url}/accounts/{account_id}/users/{user_id}",contentType:"application/json",verb:"GET"},"myaccount_credits.update":{url:"{api_url}/accounts/{account_id}/{billing_provider}/credits",contentType:"application/json",verb:"PUT"},"myaccount_credits.get_no_loading":{url:"{api_url}/accounts/{account_id}/{billing_provider}/credits",contentType:"application/json",trigger_events:!1,verb:"GET"},"myaccount_credits.get":{url:"{api_url}/accounts/{account_id}/{billing_provider}/credits",contentType:"application/json",verb:"GET"},"myaccount_limits.get":{url:"{api_url}/accounts/{account_id}/limits",contentType:"application/json",verb:"GET"},"myaccount_limits.update":{url:"{api_url}/accounts/{account_id}/limits",contentType:"application/json",verb:"POST"}}},function(e){var t=this;winkstart.registerResources(t.__whapp,t.config.resources)},{nav_activate:function(){var e=this;winkstart.request("myaccount_credits.get_user",{api_url:winkstart.apps.myaccount.api_url,account_id:winkstart.apps.myaccount.account_id,user_id:winkstart.apps.myaccount.user_id},function(t,n){!("hide_credits"in winkstart.config&&winkstart.config.hide_credits===!0)&&(!t.data.priv_level||t.data.priv_level==="admin")&&winkstart.publish("statistics.add_stat",e.define_stats())})},get_credits:function(e,t){var n=this;winkstart.request("myaccount_credits.get",{account_id:winkstart.apps.myaccount.account_id,api_url:winkstart.apps.myaccount.api_url,billing_provider:winkstart.apps.myaccount.billing_provider},function(t,n){typeof e=="function"&&e(t,n)},function(e,n){typeof t=="function"&&t(e,n)})},get_credits_no_loading:function(e,t){var n=this;winkstart.request("myaccount_credits.get_no_loading",{account_id:winkstart.apps.myaccount.account_id,api_url:winkstart.apps.myaccount.api_url,billing_provider:winkstart.apps.myaccount.billing_provider},function(t,n){typeof e=="function"&&e(t,n)},function(e,n){typeof t=="function"&&t(e,n)})},add_credits:function(e,t,n){var r=this;winkstart.request("myaccount_credits.update",{account_id:winkstart.apps.myaccount.account_id,api_url:winkstart.apps.myaccount.api_url,billing_provider:winkstart.apps.myaccount.billing_provider,data:{amount:e}},function(e,n){typeof t=="function"&&t(e,n)},winkstart.error_message.process_error())},get_limits:function(e,t){var n=this;winkstart.request("myaccount_limits.get",{account_id:winkstart.apps.myaccount.account_id,api_url:winkstart.apps.myaccount.api_url},function(t,n){typeof e=="function"&&e(t,n)},function(e,n){typeof t=="function"&&t(e,n)})},update_limits:function(e,t,n){var r=this;winkstart.request("myaccount_limits.update",{account_id:winkstart.apps.myaccount.account_id,api_url:winkstart.apps.myaccount.api_url,data:e},function(e,n){typeof t=="function"&&t(e,n)},winkstart.error_message.process_error())},render_credits_dialog:function(e){var t=this,n={credits:e.credits.amount,limits:e.limits,extra:{inbound_trunks_price:winkstart.config.inbound_trunks_price||"$6.99",twoway_trunks_price:winkstart.config.twoway_trunks_price||"$24.99"},_t:function(e){return window.translate.credits[e]}},r=t.templates.credits.tmpl(n),i;$("ul.settings1 > li",r).click(function(e){$(".pane_content",r).hide(),$("ul.settings1 > li",r).removeClass("current");var t=$(this).attr("id");t==="flat_rate_link"?$("#flat_rate",r).show():t==="per_minute_link"&&$("#per_minute",r).show(),$(this).addClass("current")}),$(".purchase_credits",r).click(function(e){e.preventDefault(),winkstart.confirm(_t("credits","your_on_file_credit_card_will_immediately"),function(){var e=parseFloat($("#add_credits",r).val().replace(",","."));t.add_credits(e,function(){$(".current_balance",r).html((parseFloat($(".current_balance",r).html())+e).toFixed(2)),winkstart.publish("statistics.update_stat","credits")})})}),$(".submit_channels",r).click(function(n){n.preventDefault(),winkstart.confirm(_t("credits","your_on_file_credit_card_will_immediately"),function(){var n={twoway_trunks:$("#outbound_calls",r).size()>0?parseInt($("#outbound_calls",r).val()||0):-1,inbound_trunks:$("#inbound_calls",r).size()>0?parseInt($("#inbound_calls",r).val()||0):-1};n=$.extend({},e.limits,n),t.update_limits(n,function(e){i.dialog("close"),winkstart.alert("info",_t("credits","your_changes_have_been_saved"))})})}),i=winkstart.dialog(r,{title:_t("credits","manage_your_credits_and_limits")})},define_stats:function(){var e=this,t={credits:{number:"loading",color:"green",get_stat:function(t){e.get_credits_no_loading(function(e,n){var r={number:e.data.amount,color:e.data.amount<1?"red":e.data.amount>10?"green":"orange"};typeof t=="function"&&t(r)},function(e,n){t({error:!0})})},click_handler:function(){e.get_limits(function(t,n){e.get_credits(function(n,r){e.render_credits_dialog({limits:t.data,credits:n.data})})})},container:function(t){return t._t=function(e){return window.translate.credits[e]},e.templates.stat_credits.tmpl(t)},update_container:function(e){$("#credits_label",e).removeClass("green orange red").addClass(this.color).html("$ "+this.number.toFixed(2))}}};return t}});