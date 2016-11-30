winkstart.module("myaccount","statistics",{css:["css/statistics.css"],templates:{statistics:"tmpl/statistics.html",stat:"tmpl/stat.html"},subscribe:{"myaccount.initialized":"activate","voip.loaded":"voip_loaded","statistics.update_stat":"update_stat","statistics.get_nav":"get_stat_html","statistics.add_stat":"add_stat"},targets:{stats_nav:"#ws-topbar #statistics_navbar"}},function(e){var t=this},{stats:{},activate:function(){var e=this;e.poll_stat()},poll_stat:function(){var e=this,t=15,n=function(){$.each(e.stats,function(t,n){e.update_stat(t)}),setTimeout(n,t*1e3)};setTimeout(n,t*1e3)},add_stat:function(e){var t=this,n,r;$.isEmptyObject(t.stats)&&winkstart.publish("linknav.add",{name:"stats",weight:"05",content:t.templates.statistics.tmpl()});var i=$(t.config.targets.stats_nav);$.each(e,function(e,s){s.active=s.active||!1,s.number=s.number||0,s.color=s.color||"green",s.name=e,s.clickable=s.click_handler?!0:!1,n=("container"in s?s.container({stat:s}):t.templates.stat.tmpl({stat:s})).prependTo(i),s.click_handler&&typeof s.click_handler=="function"&&$(n,i).click(function(){s.click_handler()}),r={},r[e]=s,$.extend(t.stats,r),t.update_stat(e)})},update_stat:function(e,t){var n=this,r=n.stats[e];(!("nb_error"in r)||r.nb_error<3)&&n.stats[e].get_stat(function(t){r=$.extend(r,t),t.error?"nb_error"in r&&typeof r.nb_error=="number"?r.nb_error++:r.nb_error=1:(delete r.nb_error,winkstart.publish("statistics.get_nav",{name:e},function(e){"container"in r?r.update_container(e):(r.active?($(".icon",e).addClass("blue"),$(".bubble",e).removeClass("inactive")):($(".icon",e).removeClass("blue"),$(".bubble",e).addClass("inactive")),$(".bubble",e).html(r.number),$(".bubble",e).removeClass("green orange red").addClass(r.color))}))}),typeof t=="function"&&t()},get_stat_html:function(e,t){var n=this,r=$(n.config.targets.stats_nav),i=$('.stat_wrapper[data-name="'+e.name+'"]',r);typeof t=="function"&&t(i)}});