winkstart.module("skeleton","sub_module",{css:["css/sub_module.css"],templates:{sub_module:"tmpl/sub_module.html"},subscribe:{"sub_module.activate":"activate"},resources:{"sub_module.get_account":{url:"{api_url}/accounts/{account_id}",contentType:"application/json",verb:"GET"}}},function(e){winkstart.registerResources(this.__whapp,this.config.resources),winkstart.publish("whappnav.subnav.add",{whapp:"skeleton",module:this.__module,label:"Skeleton Sub-Module",icon:"device",weight:"05"})},{activate:function(e){var t=this;winkstart.request("sub_module.get_account",{api_url:winkstart.apps.skeleton.api_url,account_id:winkstart.apps.skeleton.account_id},function(e,n){var r=$("#ws-content").empty().append(t.templates.sub_module.tmpl(e.data))},function(e,t){winkstart.alert("Couldn't get your account!")})}});