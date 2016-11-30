define(["require","jquery","underscore","monster"],function(i){var n=i("jquery"),t=i("underscore"),e=i("monster"),r={requests:{},subscribe:{"common.ringingDurationControl.render":"ringingDurationControlRender","common.ringingDurationControl.addEndpoint":"ringingDurationControlAddEndpoint","common.ringingDurationControl.getEndpoints":"ringingDurationControlGetEndpoints"},ringingDurationControlRender:function(i){var t=this,r=i.container,a=i.endpoints,o=i.callback,d=n(e.template(t,"ringingDurationControl-layout",i));r.empty().append(d),e.ui.tooltips(d),d.find(".grid-time").sortable({items:".grid-time-row:not(.title)",placeholder:"grid-time-row-placeholder"}),t.ringingDurationControlRenderSliders(d,a),t.ringingDurationControlBindEvents(n.extend(i,{template:d})),o&&o({template:d,data:a})},ringingDurationControlBindEvents:function(i){var t=this,e=i.template;i.endpoints;e.find(".distribute-button").on("click",function(){var i=e.find(".grid-time-row:not(.disabled) .slider-time");max=i.first().slider("option","max"),section=Math.floor(max/i.length),current=0,n.each(i,function(){n(this).slider("values",[current,current+=section])})}),e.find(".disable-row").on("change",function(){var i=n(this).parents(".grid-time-row");n(this).prop("checked")?(i.find(".times").stop().animate({opacity:0}),i.find(".name").stop().animate({opacity:.5}),i.addClass("disabled")):(i.find(".times").stop().animate({opacity:1}),i.find(".name").stop().animate({opacity:1}),i.removeClass("disabled"))}),e.on("click",".grid-time-row.title .scale-max",function(){var i=n(this),t=i.siblings(".scale-max-input");t.show().focus().select(),i.hide()}),e.on("blur",".grid-time-row.title .scale-max-input",function(i){var r=n(this),a=r.val();if(intValue=parseInt(r.val()),a!=r.data("current")&&!isNaN(intValue)&&intValue>=30){var o=t.ringingDurationControlGetEndpoints({container:e,includeDisabled:!0});t.ringingDurationControlRenderSliders(e,o,intValue)}else r.val(r.data("current")).hide(),r.siblings(".scale-max").show()}),e.on("keydown",".grid-time-row.title .scale-max-input",function(i){var t=i.which?i.which:event.keyCode;if(t>57&&96>t)return!1;if(13===t)n(this).blur();else if(27===t){var e=n(this);e.val(e.data("current")).blur()}}),e.on("click",".remove-user",function(){var i=n(this).parents(".grid-time-row"),t=i.data("id");e.find('.add-user[data-id="'+t+'"]').removeClass("in-use"),i.remove()})},ringingDurationControlRenderSliders:function(i,e,r){var a=6,o=r&&r>=30?r:120;if(!r){var d=0;t.each(e,function(i){d=i.delay+i.timeout>d?i.delay+i.timeout:d}),o=d>o?60*Math.ceil(d/60):o}var l=function(i,t){var e=t.value,r='<div class="slider-tooltip"><div class="slider-tooltip-inner">'+e+"</div></div>";n(t.handle).html(r)},s=function(n,t,e,r){var a=r.slider("values",0),o=r.slider("values",1),d='<div class="slider-tooltip"><div class="slider-tooltip-inner">'+a+"</div></div>",l='<div class="slider-tooltip"><div class="slider-tooltip-inner">'+o+"</div></div>";i.find('.grid-time-row[data-id="'+e+'"] .slider-time .ui-slider-handle').first().html(d),i.find('.grid-time-row[data-id="'+e+'"] .slider-time .ui-slider-handle').last().html(l)},c=function(t){var e=i.find('.grid-time-row[data-id="'+t.id+'"]'),r=e.find(".slider-time").slider({range:!0,min:0,max:o,values:[t.delay,t.delay+t.timeout],slide:l,change:l,create:function(i,e){s(i,e,t.id,n(this))}});e.hasClass("deleted")&&r.slider("disable"),u(e)},u=function(i,n){var t=i.find(".scale-container");n=n||!1,t.empty();for(var e=1;a>=e;e++){var r='<div class="scale-element" style="width:'+100/a+'%;">'+(n?(e==a?'<input type="text" value="'+o+'" data-current="'+o+'" class="scale-max-input" maxlength="3"><span class="scale-max">':"<span>")+Math.floor(e*o/a)+" Sec</span>":"")+"</div>";t.append(r)}n&&t.append("<span>0 Sec</span>")};t.each(e,function(i){c(i)}),u(i.find(".grid-time-row.title"),!0)},ringingDurationControlAddEndpoint:function(i){var n=this,t=i.container;t.find(".grid-time").append(e.template(n,"ringingDurationControl-row",i)),n.ringingDurationControlRenderSliders(t,[i.endpoint],parseInt(t.find(".grid-time-row.title .scale-max-input").val()))},ringingDurationControlGetEndpoints:function(i){var t=i.container,e=i.includeDisabled,r=n.map(t.find(".grid-time-row[data-id]"),function(i){var t=n(i),r=t.find(".slider-time").slider("values");return e||!t.hasClass("disabled")?{id:t.data("id"),delay:r[0],timeout:r[1]-r[0],name:t.find(".name").text()}:void 0});return i.callback&&i.callback(r),r}};return r});