;(function($){$.ui={plugin:{add:function(module,option,set){var proto=$.ui[module].prototype;for(var i in set){proto.plugins[i]=proto.plugins[i]||[];proto.plugins[i].push([option,set[i]]);}},call:function(instance,name,args){var set=instance.plugins[name];if(!set){return;}
for(var i=0;i<set.length;i++){if(instance.options[set[i][0]]){set[i][1].apply(instance.element,args);}}}},cssCache:{},css:function(name){if($.ui.cssCache[name]){return $.ui.cssCache[name];}
var tmp=$('<div class="ui-gen">').addClass(name).css({position:'absolute',top:'-5000px',left:'-5000px',display:'block'}).appendTo('body');$.ui.cssCache[name]=!!((!(/auto|default/).test(tmp.css('cursor'))||(/^[1-9]/).test(tmp.css('height'))||(/^[1-9]/).test(tmp.css('width'))||!(/none/).test(tmp.css('backgroundImage'))||!(/transparent|rgba\(0, 0, 0, 0\)/).test(tmp.css('backgroundColor'))));try{$('body').get(0).removeChild(tmp.get(0));}catch(e){}
return $.ui.cssCache[name];},disableSelection:function(el){$(el).attr('unselectable','on').css('MozUserSelect','none');},enableSelection:function(el){$(el).attr('unselectable','off').css('MozUserSelect','');},hasScroll:function(e,a){var scroll=/top/.test(a||"top")?'scrollTop':'scrollLeft',has=false;if(e[scroll]>0)return true;e[scroll]=1;has=e[scroll]>0?true:false;e[scroll]=0;return has;}};var _remove=$.fn.remove;$.fn.remove=function(){$("*",this).add(this).triggerHandler("remove");return _remove.apply(this,arguments);};function getter(namespace,plugin,method){var methods=$[namespace][plugin].getter||[];methods=(typeof methods=="string"?methods.split(/,?\s+/):methods);return($.inArray(method,methods)!=-1);}
$.widget=function(name,prototype){var namespace=name.split(".")[0];name=name.split(".")[1];$.fn[name]=function(options){var isMethodCall=(typeof options=='string'),args=Array.prototype.slice.call(arguments,1);if(isMethodCall&&getter(namespace,name,options)){var instance=$.data(this[0],name);return(instance?instance[options].apply(instance,args):undefined);}
return this.each(function(){var instance=$.data(this,name);if(isMethodCall&&instance&&$.isFunction(instance[options])){instance[options].apply(instance,args);}else if(!isMethodCall){$.data(this,name,new $[namespace][name](this,options));}});};$[namespace][name]=function(element,options){var self=this;this.widgetName=name;this.widgetBaseClass=namespace+'-'+name;this.options=$.extend({},$.widget.defaults,$[namespace][name].defaults,options);this.element=$(element).bind('setData.'+name,function(e,key,value){return self.setData(key,value);}).bind('getData.'+name,function(e,key){return self.getData(key);}).bind('remove',function(){return self.destroy();});this.init();};$[namespace][name].prototype=$.extend({},$.widget.prototype,prototype);};$.widget.prototype={init:function(){},destroy:function(){this.element.removeData(this.widgetName);},getData:function(key){return this.options[key];},setData:function(key,value){this.options[key]=value;if(key=='disabled'){this.element[value?'addClass':'removeClass'](this.widgetBaseClass+'-disabled');}},enable:function(){this.setData('disabled',false);},disable:function(){this.setData('disabled',true);}};$.widget.defaults={disabled:false};$.ui.mouse={mouseInit:function(){var self=this;this.element.bind('mousedown.'+this.widgetName,function(e){return self.mouseDown(e);});if($.browser.msie){this._mouseUnselectable=this.element.attr('unselectable');this.element.attr('unselectable','on');}
this.started=false;},mouseDestroy:function(){this.element.unbind('.'+this.widgetName);($.browser.msie&&this.element.attr('unselectable',this._mouseUnselectable));},mouseDown:function(e){(this._mouseStarted&&this.mouseUp(e));this._mouseDownEvent=e;var self=this,btnIsLeft=(e.which==1),elIsCancel=(typeof this.options.cancel=="string"?$(e.target).parents().add(e.target).filter(this.options.cancel).length:false);if(!btnIsLeft||elIsCancel||!this.mouseCapture(e)){return true;}
this._mouseDelayMet=!this.options.delay;if(!this._mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){self._mouseDelayMet=true;},this.options.delay);}
if(this.mouseDistanceMet(e)&&this.mouseDelayMet(e)){this._mouseStarted=(this.mouseStart(e)!==false);if(!this._mouseStarted){e.preventDefault();return true;}}
this._mouseMoveDelegate=function(e){return self.mouseMove(e);};this._mouseUpDelegate=function(e){return self.mouseUp(e);};$(document).bind('mousemove.'+this.widgetName,this._mouseMoveDelegate).bind('mouseup.'+this.widgetName,this._mouseUpDelegate);return false;},mouseMove:function(e){if($.browser.msie&&!e.button){return this.mouseUp(e);}
if(this._mouseStarted){this.mouseDrag(e);return false;}
if(this.mouseDistanceMet(e)&&this.mouseDelayMet(e)){this._mouseStarted=(this.mouseStart(this._mouseDownEvent,e)!==false);(this._mouseStarted?this.mouseDrag(e):this.mouseUp(e));}
return!this._mouseStarted;},mouseUp:function(e){$(document).unbind('mousemove.'+this.widgetName,this._mouseMoveDelegate).unbind('mouseup.'+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this.mouseStop(e);}
return false;},mouseDistanceMet:function(e){return(Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance);},mouseDelayMet:function(e){return this._mouseDelayMet;},mouseStart:function(e){},mouseDrag:function(e){},mouseStop:function(e){},mouseCapture:function(e){return true;}};$.ui.mouse.defaults={cancel:null,distance:1,delay:0};})(jQuery);(function($){$.fn.unwrap=$.fn.unwrap||function(expr){return this.each(function(){$(this).parents(expr).eq(0).after(this).remove();});};$.widget("ui.slider",{plugins:{},ui:function(e){return{options:this.options,handle:this.currentHandle,value:this.options.axis!="both"||!this.options.axis?Math.round(this.value(null,this.options.axis=="vertical"?"y":"x")):{x:Math.round(this.value(null,"x")),y:Math.round(this.value(null,"y"))},range:this.getRange()};},propagate:function(n,e){$.ui.plugin.call(this,n,[e,this.ui()]);this.element.triggerHandler(n=="slide"?n:"slide"+n,[e,this.ui()],this.options[n]);},destroy:function(){this.element.removeClass("ui-slider ui-slider-disabled").removeData("slider").unbind(".slider");if(this.handle&&this.handle.length){this.handle.unwrap("a");this.handle.each(function(){$(this).data("mouse").mouseDestroy();});}
this.generated&&this.generated.remove();},setData:function(key,value){$.widget.prototype.setData.apply(this,arguments);if(/min|max|steps/.test(key)){this.initBoundaries();}
if(key=="range"){value?this.handle.length==2&&this.createRange():this.removeRange();}},init:function(){var self=this;this.element.addClass("ui-slider");this.initBoundaries();this.handle=$(this.options.handle,this.element);if(!this.handle.length){self.handle=self.generated=$(self.options.handles||[0]).map(function(){var handle=$("<div/>").addClass("ui-slider-handle").appendTo(self.element);if(this.id)
handle.attr("id",this.id);return handle[0];});}
var handleclass=function(el){this.element=$(el);this.element.data("mouse",this);this.options=self.options;this.element.bind("mousedown",function(){if(self.currentHandle)this.blur(self.currentHandle);self.focus(this,1);});this.mouseInit();};$.extend(handleclass.prototype,$.ui.mouse,{mouseStart:function(e){return self.start.call(self,e,this.element[0]);},mouseStop:function(e){return self.stop.call(self,e,this.element[0]);},mouseDrag:function(e){return self.drag.call(self,e,this.element[0]);},mouseCapture:function(){return true;},trigger:function(e){this.mouseDown(e);}});$(this.handle).each(function(){new handleclass(this);}).wrap('<a href="javascript:void(0)" style="outline:none;border:none;"></a>').parent().bind('focus',function(e){self.focus(this.firstChild);}).bind('blur',function(e){self.blur(this.firstChild);}).bind('keydown',function(e){if(!self.options.noKeyboard)self.keydown(e.keyCode,this.firstChild);});this.element.bind('mousedown.slider',function(e){self.click.apply(self,[e]);self.currentHandle.data("mouse").trigger(e);self.firstValue=self.firstValue+1;});$.each(this.options.handles||[],function(index,handle){self.moveTo(handle.start,index,true);});if(!isNaN(this.options.startValue))
this.moveTo(this.options.startValue,0,true);this.previousHandle=$(this.handle[0]);if(this.handle.length==2&&this.options.range)this.createRange();},initBoundaries:function(){var element=this.element[0],o=this.options;this.actualSize={width:this.element.outerWidth(),height:this.element.outerHeight()};$.extend(o,{axis:o.axis||(element.offsetWidth<element.offsetHeight?'vertical':'horizontal'),max:!isNaN(parseInt(o.max,10))?{x:parseInt(o.max,10),y:parseInt(o.max,10)}:({x:o.max&&o.max.x||100,y:o.max&&o.max.y||100}),min:!isNaN(parseInt(o.min,10))?{x:parseInt(o.min,10),y:parseInt(o.min,10)}:({x:o.min&&o.min.x||0,y:o.min&&o.min.y||0})});o.realMax={x:o.max.x-o.min.x,y:o.max.y-o.min.y};o.stepping={x:o.stepping&&o.stepping.x||parseInt(o.stepping,10)||(o.steps?o.realMax.x/(o.steps.x||parseInt(o.steps,10)||o.realMax.x):0),y:o.stepping&&o.stepping.y||parseInt(o.stepping,10)||(o.steps?o.realMax.y/(o.steps.y||parseInt(o.steps,10)||o.realMax.y):0)};},keydown:function(keyCode,handle){if(/(37|38|39|40)/.test(keyCode)){this.moveTo({x:/(37|39)/.test(keyCode)?(keyCode==37?'-':'+')+'='+this.oneStep("x"):0,y:/(38|40)/.test(keyCode)?(keyCode==38?'-':'+')+'='+this.oneStep("y"):0},handle);}},focus:function(handle,hard){this.currentHandle=$(handle).addClass('ui-slider-handle-active');if(hard)
this.currentHandle.parent()[0].focus();},blur:function(handle){$(handle).removeClass('ui-slider-handle-active');if(this.currentHandle&&this.currentHandle[0]==handle){this.previousHandle=this.currentHandle;this.currentHandle=null;};},click:function(e){var pointer=[e.pageX,e.pageY];var clickedHandle=false;this.handle.each(function(){if(this==e.target)
clickedHandle=true;});if(clickedHandle||this.options.disabled||!(this.currentHandle||this.previousHandle))
return;if(!this.currentHandle&&this.previousHandle)
this.focus(this.previousHandle,true);this.offset=this.element.offset();this.moveTo({y:this.convertValue(e.pageY-this.offset.top-this.currentHandle[0].offsetHeight/2,"y"),x:this.convertValue(e.pageX-this.offset.left-this.currentHandle[0].offsetWidth/2,"x")},null,!this.options.distance);},createRange:function(){if(this.rangeElement)return;this.rangeElement=$('<div></div>').addClass('ui-slider-range').css({position:'absolute'}).appendTo(this.element);this.updateRange();},removeRange:function(){this.rangeElement.remove();this.rangeElement=null;},updateRange:function(){var prop=this.options.axis=="vertical"?"top":"left";var size=this.options.axis=="vertical"?"height":"width";this.rangeElement.css(prop,(parseInt($(this.handle[0]).css(prop),10)||0)+this.handleSize(0,this.options.axis=="vertical"?"y":"x")/2);this.rangeElement.css(size,(parseInt($(this.handle[1]).css(prop),10)||0)-(parseInt($(this.handle[0]).css(prop),10)||0));},getRange:function(){return this.rangeElement?this.convertValue(parseInt(this.rangeElement.css(this.options.axis=="vertical"?"height":"width"),10),this.options.axis=="vertical"?"y":"x"):null;},handleIndex:function(){return this.handle.index(this.currentHandle[0]);},value:function(handle,axis){if(this.handle.length==1)this.currentHandle=this.handle;if(!axis)axis=this.options.axis=="vertical"?"y":"x";var curHandle=$(handle!=undefined&&handle!==null?this.handle[handle]||handle:this.currentHandle);if(curHandle.data("mouse").sliderValue){return parseInt(curHandle.data("mouse").sliderValue[axis],10);}else{return parseInt(((parseInt(curHandle.css(axis=="x"?"left":"top"),10)/(this.actualSize[axis=="x"?"width":"height"]-this.handleSize(handle,axis)))*this.options.realMax[axis])+this.options.min[axis],10);}},convertValue:function(value,axis){return this.options.min[axis]+(value/(this.actualSize[axis=="x"?"width":"height"]-this.handleSize(null,axis)))*this.options.realMax[axis];},translateValue:function(value,axis){return((value-this.options.min[axis])/this.options.realMax[axis])*(this.actualSize[axis=="x"?"width":"height"]-this.handleSize(null,axis));},translateRange:function(value,axis){if(this.rangeElement){if(this.currentHandle[0]==this.handle[0]&&value>=this.translateValue(this.value(1),axis))
value=this.translateValue(this.value(1,axis)-this.oneStep(axis),axis);if(this.currentHandle[0]==this.handle[1]&&value<=this.translateValue(this.value(0),axis))
value=this.translateValue(this.value(0,axis)+this.oneStep(axis),axis);}
if(this.options.handles){var handle=this.options.handles[this.handleIndex()];if(value<this.translateValue(handle.min,axis)){value=this.translateValue(handle.min,axis);}else if(value>this.translateValue(handle.max,axis)){value=this.translateValue(handle.max,axis);}}
return value;},translateLimits:function(value,axis){if(value>=this.actualSize[axis=="x"?"width":"height"]-this.handleSize(null,axis))
value=this.actualSize[axis=="x"?"width":"height"]-this.handleSize(null,axis);if(value<=0)
value=0;return value;},handleSize:function(handle,axis){return $(handle!=undefined&&handle!==null?this.handle[handle]:this.currentHandle)[0]["offset"+(axis=="x"?"Width":"Height")];},oneStep:function(axis){return this.options.stepping[axis]||1;},start:function(e,handle){var o=this.options;if(o.disabled)return false;this.actualSize={width:this.element.outerWidth(),height:this.element.outerHeight()};if(!this.currentHandle)
this.focus(this.previousHandle,true);this.offset=this.element.offset();this.handleOffset=this.currentHandle.offset();this.clickOffset={top:e.pageY-this.handleOffset.top,left:e.pageX-this.handleOffset.left};this.firstValue=this.value();this.propagate('start',e);this.drag(e,handle);return true;},stop:function(e){this.propagate('stop',e);if(this.firstValue!=this.value())
this.propagate('change',e);this.focus(this.currentHandle,true);return false;},drag:function(e,handle){var o=this.options;var position={top:e.pageY-this.offset.top-this.clickOffset.top,left:e.pageX-this.offset.left-this.clickOffset.left};if(!this.currentHandle)this.focus(this.previousHandle,true);position.left=this.translateLimits(position.left,"x");position.top=this.translateLimits(position.top,"y");if(o.stepping.x){var value=this.convertValue(position.left,"x");value=Math.round(value/o.stepping.x)*o.stepping.x;position.left=this.translateValue(value,"x");}
if(o.stepping.y){var value=this.convertValue(position.top,"y");value=Math.round(value/o.stepping.y)*o.stepping.y;position.top=this.translateValue(value,"y");}
position.left=this.translateRange(position.left,"x");position.top=this.translateRange(position.top,"y");if(o.axis!="vertical")this.currentHandle.css({left:position.left});if(o.axis!="horizontal")this.currentHandle.css({top:position.top});this.currentHandle.data("mouse").sliderValue={x:Math.round(this.convertValue(position.left,"x"))||0,y:Math.round(this.convertValue(position.top,"y"))||0};if(this.rangeElement)
this.updateRange();this.propagate('slide',e);return false;},moveTo:function(value,handle,noPropagation){var o=this.options;this.actualSize={width:this.element.outerWidth(),height:this.element.outerHeight()};if(handle==undefined&&!this.currentHandle&&this.handle.length!=1)
return false;if(handle==undefined&&!this.currentHandle)
handle=0;if(handle!=undefined)
this.currentHandle=this.previousHandle=$(this.handle[handle]||handle);if(value.x!==undefined&&value.y!==undefined){var x=value.x,y=value.y;}else{var x=value,y=value;}
if(x!==undefined&&x.constructor!=Number){var me=/^\-\=/.test(x),pe=/^\+\=/.test(x);if(me||pe){x=this.value(null,"x")+parseInt(x.replace(me?'=':'+=',''),10);}else{x=isNaN(parseInt(x,10))?undefined:parseInt(x,10);}}
if(y!==undefined&&y.constructor!=Number){var me=/^\-\=/.test(y),pe=/^\+\=/.test(y);if(me||pe){y=this.value(null,"y")+parseInt(y.replace(me?'=':'+=',''),10);}else{y=isNaN(parseInt(y,10))?undefined:parseInt(y,10);}}
if(o.axis!="vertical"&&x!==undefined){if(o.stepping.x)x=Math.round(x/o.stepping.x)*o.stepping.x;x=this.translateValue(x,"x");x=this.translateLimits(x,"x");x=this.translateRange(x,"x");o.animate?this.currentHandle.stop().animate({left:x},(Math.abs(parseInt(this.currentHandle.css("left"))-x))*(!isNaN(parseInt(o.animate))?o.animate:5)):this.currentHandle.css({left:x});}
if(o.axis!="horizontal"&&y!==undefined){if(o.stepping.y)y=Math.round(y/o.stepping.y)*o.stepping.y;y=this.translateValue(y,"y");y=this.translateLimits(y,"y");y=this.translateRange(y,"y");o.animate?this.currentHandle.stop().animate({top:y},(Math.abs(parseInt(this.currentHandle.css("top"))-y))*(!isNaN(parseInt(o.animate))?o.animate:5)):this.currentHandle.css({top:y});}
if(this.rangeElement)
this.updateRange();this.currentHandle.data("mouse").sliderValue={x:Math.round(this.convertValue(x,"x"))||0,y:Math.round(this.convertValue(y,"y"))||0};if(!noPropagation){this.propagate('start',null);this.propagate('stop',null);this.propagate('change',null);this.propagate("slide",null);}}});$.ui.slider.getter="value";$.ui.slider.defaults={handle:".ui-slider-handle",distance:1,animate:false};})(jQuery);(function($){$.widget("ui.tabs",{init:function(){this.options.event+='.tabs';this.tabify(true);},setData:function(key,value){if((/^selected/).test(key))
this.select(value);else{this.options[key]=value;this.tabify();}},length:function(){return this.$tabs.length;},tabId:function(a){return a.title&&a.title.replace(/\s/g,'_').replace(/[^A-Za-z0-9\-_:\.]/g,'')||this.options.idPrefix+$.data(a);},ui:function(tab,panel){return{options:this.options,tab:tab,panel:panel,index:this.$tabs.index(tab)};},tabify:function(init){this.$lis=$('li:has(a[href])',this.element);this.$tabs=this.$lis.map(function(){return $('a',this)[0];});this.$panels=$([]);var self=this,o=this.options;this.$tabs.each(function(i,a){if(a.hash&&a.hash.replace('#',''))
self.$panels=self.$panels.add(a.hash);else if($(a).attr('href')!='#'){$.data(a,'href.tabs',a.href);$.data(a,'load.tabs',a.href);var id=self.tabId(a);a.href='#'+id;var $panel=$('#'+id);if(!$panel.length){$panel=$(o.panelTemplate).attr('id',id).addClass(o.panelClass).insertAfter(self.$panels[i-1]||self.element);$panel.data('destroy.tabs',true);}
self.$panels=self.$panels.add($panel);}
else
o.disabled.push(i+1);});if(init){this.element.addClass(o.navClass);this.$panels.each(function(){var $this=$(this);$this.addClass(o.panelClass);});if(o.selected===undefined){if(location.hash){this.$tabs.each(function(i,a){if(a.hash==location.hash){o.selected=i;if($.browser.msie||$.browser.opera){var $toShow=$(location.hash),toShowId=$toShow.attr('id');$toShow.attr('id','');setTimeout(function(){$toShow.attr('id',toShowId);},500);}
scrollTo(0,0);return false;}});}
else if(o.cookie){var index=parseInt($.cookie('ui-tabs'+$.data(self.element)),10);if(index&&self.$tabs[index])
o.selected=index;}
else if(self.$lis.filter('.'+o.selectedClass).length)
o.selected=self.$lis.index(self.$lis.filter('.'+o.selectedClass)[0]);}
o.selected=o.selected===null||o.selected!==undefined?o.selected:0;o.disabled=$.unique(o.disabled.concat($.map(this.$lis.filter('.'+o.disabledClass),function(n,i){return self.$lis.index(n);}))).sort();if($.inArray(o.selected,o.disabled)!=-1)
o.disabled.splice($.inArray(o.selected,o.disabled),1);this.$panels.addClass(o.hideClass);this.$lis.removeClass(o.selectedClass);if(o.selected!==null){this.$panels.eq(o.selected).show().removeClass(o.hideClass);this.$lis.eq(o.selected).addClass(o.selectedClass);var onShow=function(){$(self.element).triggerHandler('tabsshow',[self.fakeEvent('tabsshow'),self.ui(self.$tabs[o.selected],self.$panels[o.selected])],o.show);};if($.data(this.$tabs[o.selected],'load.tabs'))
this.load(o.selected,onShow);else
onShow();}
$(window).bind('unload',function(){self.$tabs.unbind('.tabs');self.$lis=self.$tabs=self.$panels=null;});}
for(var i=0,li;li=this.$lis[i];i++)
$(li)[$.inArray(i,o.disabled)!=-1&&!$(li).hasClass(o.selectedClass)?'addClass':'removeClass'](o.disabledClass);if(o.cache===false)
this.$tabs.removeData('cache.tabs');var hideFx,showFx,baseFx={'min-width':0,duration:1},baseDuration='normal';if(o.fx&&o.fx.constructor==Array)
hideFx=o.fx[0]||baseFx,showFx=o.fx[1]||baseFx;else
hideFx=showFx=o.fx||baseFx;var resetCSS={display:'',overflow:'',height:''};if(!$.browser.msie)
resetCSS.opacity='';function hideTab(clicked,$hide,$show){$hide.animate(hideFx,hideFx.duration||baseDuration,function(){$hide.addClass(o.hideClass).css(resetCSS);if($.browser.msie&&hideFx.opacity)
$hide[0].style.filter='';if($show)
showTab(clicked,$show,$hide);});}
function showTab(clicked,$show,$hide){if(showFx===baseFx)
$show.css('display','block');$show.animate(showFx,showFx.duration||baseDuration,function(){$show.removeClass(o.hideClass).css(resetCSS);if($.browser.msie&&showFx.opacity)
$show[0].style.filter='';$(self.element).triggerHandler('tabsshow',[self.fakeEvent('tabsshow'),self.ui(clicked,$show[0])],o.show);});}
function switchTab(clicked,$li,$hide,$show){$li.addClass(o.selectedClass).siblings().removeClass(o.selectedClass);hideTab(clicked,$hide,$show);}
this.$tabs.unbind('.tabs').bind(o.event,function(){var $li=$(this).parents('li:eq(0)'),$hide=self.$panels.filter(':visible'),$show=$(this.hash);if(($li.hasClass(o.selectedClass)&&!o.unselect)||$li.hasClass(o.disabledClass)||$(this).hasClass(o.loadingClass)||$(self.element).triggerHandler('tabsselect',[self.fakeEvent('tabsselect'),self.ui(this,$show[0])],o.select)===false){this.blur();return false;}
self.options.selected=self.$tabs.index(this);if(o.unselect){if($li.hasClass(o.selectedClass)){self.options.selected=null;$li.removeClass(o.selectedClass);self.$panels.stop();hideTab(this,$hide);this.blur();return false;}else if(!$hide.length){self.$panels.stop();var a=this;self.load(self.$tabs.index(this),function(){$li.addClass(o.selectedClass).addClass(o.unselectClass);showTab(a,$show);});this.blur();return false;}}
if(o.cookie)
$.cookie('ui-tabs'+$.data(self.element),self.options.selected,o.cookie);self.$panels.stop();if($show.length){var a=this;self.load(self.$tabs.index(this),$hide.length?function(){switchTab(a,$li,$hide,$show);}:function(){$li.addClass(o.selectedClass);showTab(a,$show);});}else
throw'jQuery UI Tabs: Mismatching fragment identifier.';if($.browser.msie)
this.blur();return false;});if(!(/^click/).test(o.event))
this.$tabs.bind('click.tabs',function(){return false;});},add:function(url,label,index){if(index==undefined)
index=this.$tabs.length;var o=this.options;var $li=$(o.tabTemplate.replace(/#\{href\}/g,url).replace(/#\{label\}/g,label));$li.data('destroy.tabs',true);var id=url.indexOf('#')==0?url.replace('#',''):this.tabId($('a:first-child',$li)[0]);var $panel=$('#'+id);if(!$panel.length){$panel=$(o.panelTemplate).attr('id',id).addClass(o.hideClass).data('destroy.tabs',true);}
$panel.addClass(o.panelClass);if(index>=this.$lis.length){$li.appendTo(this.element);$panel.appendTo(this.element[0].parentNode);}else{$li.insertBefore(this.$lis[index]);$panel.insertBefore(this.$panels[index]);}
o.disabled=$.map(o.disabled,function(n,i){return n>=index?++n:n});this.tabify();if(this.$tabs.length==1){$li.addClass(o.selectedClass);$panel.removeClass(o.hideClass);var href=$.data(this.$tabs[0],'load.tabs');if(href)
this.load(index,href);}
this.element.triggerHandler('tabsadd',[this.fakeEvent('tabsadd'),this.ui(this.$tabs[index],this.$panels[index])],o.add);},remove:function(index){var o=this.options,$li=this.$lis.eq(index).remove(),$panel=this.$panels.eq(index).remove();if($li.hasClass(o.selectedClass)&&this.$tabs.length>1)
this.select(index+(index+1<this.$tabs.length?1:-1));o.disabled=$.map($.grep(o.disabled,function(n,i){return n!=index;}),function(n,i){return n>=index?--n:n});this.tabify();this.element.triggerHandler('tabsremove',[this.fakeEvent('tabsremove'),this.ui($li.find('a')[0],$panel[0])],o.remove);},enable:function(index){var o=this.options;if($.inArray(index,o.disabled)==-1)
return;var $li=this.$lis.eq(index).removeClass(o.disabledClass);if($.browser.safari){$li.css('display','inline-block');setTimeout(function(){$li.css('display','block');},0);}
o.disabled=$.grep(o.disabled,function(n,i){return n!=index;});this.element.triggerHandler('tabsenable',[this.fakeEvent('tabsenable'),this.ui(this.$tabs[index],this.$panels[index])],o.enable);},disable:function(index){var self=this,o=this.options;if(index!=o.selected){this.$lis.eq(index).addClass(o.disabledClass);o.disabled.push(index);o.disabled.sort();this.element.triggerHandler('tabsdisable',[this.fakeEvent('tabsdisable'),this.ui(this.$tabs[index],this.$panels[index])],o.disable);}},select:function(index){if(typeof index=='string')
index=this.$tabs.index(this.$tabs.filter('[href$='+index+']')[0]);this.$tabs.eq(index).trigger(this.options.event);},load:function(index,callback){var self=this,o=this.options,$a=this.$tabs.eq(index),a=$a[0],bypassCache=callback==undefined||callback===false,url=$a.data('load.tabs');callback=callback||function(){};if(!url||!bypassCache&&$.data(a,'cache.tabs')){callback();return;}
var inner=function(parent){var $parent=$(parent),$inner=$parent.find('*:last');return $inner.length&&$inner.is(':not(img)')&&$inner||$parent;};var cleanup=function(){self.$tabs.filter('.'+o.loadingClass).removeClass(o.loadingClass).each(function(){if(o.spinner)
inner(this).parent().html(inner(this).data('label.tabs'));});self.xhr=null;};if(o.spinner){var label=inner(a).html();inner(a).wrapInner('<em></em>').find('em').data('label.tabs',label).html(o.spinner);}
var ajaxOptions=$.extend({},o.ajaxOptions,{url:url,success:function(r,s){$(a.hash).html(r);cleanup();if(o.cache)
$.data(a,'cache.tabs',true);$(self.element).triggerHandler('tabsload',[self.fakeEvent('tabsload'),self.ui(self.$tabs[index],self.$panels[index])],o.load);o.ajaxOptions.success&&o.ajaxOptions.success(r,s);callback();}});if(this.xhr){this.xhr.abort();cleanup();}
$a.addClass(o.loadingClass);setTimeout(function(){self.xhr=$.ajax(ajaxOptions);},0);},url:function(index,url){this.$tabs.eq(index).removeData('cache.tabs').data('load.tabs',url);},destroy:function(){var o=this.options;this.element.unbind('.tabs').removeClass(o.navClass).removeData('tabs');this.$tabs.each(function(){var href=$.data(this,'href.tabs');if(href)
this.href=href;var $this=$(this).unbind('.tabs');$.each(['href','load','cache'],function(i,prefix){$this.removeData(prefix+'.tabs');});});this.$lis.add(this.$panels).each(function(){if($.data(this,'destroy.tabs'))
$(this).remove();else
$(this).removeClass([o.selectedClass,o.unselectClass,o.disabledClass,o.panelClass,o.hideClass].join(' '));});},fakeEvent:function(type){return $.event.fix({type:type,target:this.element[0]});}});$.ui.tabs.defaults={unselect:false,event:'click',disabled:[],cookie:null,spinner:'Loading&#8230;',cache:false,idPrefix:'ui-tabs-',ajaxOptions:{},fx:null,tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>',panelTemplate:'<div></div>',navClass:'ui-tabs-nav',selectedClass:'ui-tabs-selected',unselectClass:'ui-tabs-unselect',disabledClass:'ui-tabs-disabled',panelClass:'ui-tabs-panel',hideClass:'ui-tabs-hide',loadingClass:'ui-tabs-loading'};$.ui.tabs.getter="length";$.extend($.ui.tabs.prototype,{rotation:null,rotate:function(ms,continuing){continuing=continuing||false;var self=this,t=this.options.selected;function start(){self.rotation=setInterval(function(){t=++t<self.$tabs.length?t:0;self.select(t);},ms);}
function stop(e){if(!e||e.clientX){clearInterval(self.rotation);}}
if(ms){start();if(!continuing)
this.$tabs.bind(this.options.event,stop);else
this.$tabs.bind(this.options.event,function(){stop();t=self.options.selected;start();});}
else{stop();this.$tabs.unbind(this.options.event,stop);}}});})(jQuery);;(function($){$.effects=$.effects||{};$.extend($.effects,{save:function(el,set){for(var i=0;i<set.length;i++){if(set[i]!==null)$.data(el[0],"ec.storage."+set[i],el[0].style[set[i]]);}},restore:function(el,set){for(var i=0;i<set.length;i++){if(set[i]!==null)el.css(set[i],$.data(el[0],"ec.storage."+set[i]));}},setMode:function(el,mode){if(mode=='toggle')mode=el.is(':hidden')?'show':'hide';return mode;},getBaseline:function(origin,original){var y,x;switch(origin[0]){case'top':y=0;break;case'middle':y=0.5;break;case'bottom':y=1;break;default:y=origin[0]/original.height;};switch(origin[1]){case'left':x=0;break;case'center':x=0.5;break;case'right':x=1;break;default:x=origin[1]/original.width;};return{x:x,y:y};},createWrapper:function(el){if(el.parent().attr('id')=='fxWrapper')
return el;var props={width:el.outerWidth({margin:true}),height:el.outerHeight({margin:true}),'float':el.css('float')};el.wrap('<div id="fxWrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');var wrapper=el.parent();if(el.css('position')=='static'){wrapper.css({position:'relative'});el.css({position:'relative'});}else{var top=el.css('top');if(isNaN(parseInt(top)))top='auto';var left=el.css('left');if(isNaN(parseInt(left)))left='auto';wrapper.css({position:el.css('position'),top:top,left:left,zIndex:el.css('z-index')}).show();el.css({position:'relative',top:0,left:0});}
wrapper.css(props);return wrapper;},removeWrapper:function(el){if(el.parent().attr('id')=='fxWrapper')
return el.parent().replaceWith(el);return el;},setTransition:function(el,list,factor,val){val=val||{};$.each(list,function(i,x){unit=el.cssUnit(x);if(unit[0]>0)val[x]=unit[0]*factor+unit[1];});return val;},animateClass:function(value,duration,easing,callback){var cb=(typeof easing=="function"?easing:(callback?callback:null));var ea=(typeof easing=="object"?easing:null);return this.each(function(){var offset={};var that=$(this);var oldStyleAttr=that.attr("style")||'';if(typeof oldStyleAttr=='object')oldStyleAttr=oldStyleAttr["cssText"];if(value.toggle){that.hasClass(value.toggle)?value.remove=value.toggle:value.add=value.toggle;}
var oldStyle=$.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(value.add)that.addClass(value.add);if(value.remove)that.removeClass(value.remove);var newStyle=$.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(value.add)that.removeClass(value.add);if(value.remove)that.addClass(value.remove);for(var n in newStyle){if(typeof newStyle[n]!="function"&&newStyle[n]&&n.indexOf("Moz")==-1&&n.indexOf("length")==-1&&newStyle[n]!=oldStyle[n]&&(n.match(/color/i)||(!n.match(/color/i)&&!isNaN(parseInt(newStyle[n],10))))&&(oldStyle.position!="static"||(oldStyle.position=="static"&&!n.match(/left|top|bottom|right/))))offset[n]=newStyle[n];}
that.animate(offset,duration,ea,function(){if(typeof $(this).attr("style")=='object'){$(this).attr("style")["cssText"]="";$(this).attr("style")["cssText"]=oldStyleAttr;}else $(this).attr("style",oldStyleAttr);if(value.add)$(this).addClass(value.add);if(value.remove)$(this).removeClass(value.remove);if(cb)cb.apply(this,arguments);});});}});$.fn.extend({_show:$.fn.show,_hide:$.fn.hide,__toggle:$.fn.toggle,_addClass:$.fn.addClass,_removeClass:$.fn.removeClass,_toggleClass:$.fn.toggleClass,effect:function(fx,o,speed,callback){return $.effects[fx]?$.effects[fx].call(this,{method:fx,options:o||{},duration:speed,callback:callback}):null;},show:function(){if(!arguments[0]||(arguments[0].constructor==Number||/(slow|normal|fast)/.test(arguments[0])))
return this._show.apply(this,arguments);else{var o=arguments[1]||{};o['mode']='show';return this.effect.apply(this,[arguments[0],o,arguments[2]||o.duration,arguments[3]||o.callback]);}},hide:function(){if(!arguments[0]||(arguments[0].constructor==Number||/(slow|normal|fast)/.test(arguments[0])))
return this._hide.apply(this,arguments);else{var o=arguments[1]||{};o['mode']='hide';return this.effect.apply(this,[arguments[0],o,arguments[2]||o.duration,arguments[3]||o.callback]);}},toggle:function(){if(!arguments[0]||(arguments[0].constructor==Number||/(slow|normal|fast)/.test(arguments[0]))||(arguments[0].constructor==Function))
return this.__toggle.apply(this,arguments);else{var o=arguments[1]||{};o['mode']='toggle';return this.effect.apply(this,[arguments[0],o,arguments[2]||o.duration,arguments[3]||o.callback]);}},addClass:function(classNames,speed,easing,callback){return speed?$.effects.animateClass.apply(this,[{add:classNames},speed,easing,callback]):this._addClass(classNames);},removeClass:function(classNames,speed,easing,callback){return speed?$.effects.animateClass.apply(this,[{remove:classNames},speed,easing,callback]):this._removeClass(classNames);},toggleClass:function(classNames,speed,easing,callback){return speed?$.effects.animateClass.apply(this,[{toggle:classNames},speed,easing,callback]):this._toggleClass(classNames);},morph:function(remove,add,speed,easing,callback){return $.effects.animateClass.apply(this,[{add:add,remove:remove},speed,easing,callback]);},switchClass:function(){return this.morph.apply(this,arguments);},cssUnit:function(key){var style=this.css(key),val=[];$.each(['em','px','%','pt'],function(i,unit){if(style.indexOf(unit)>0)
val=[parseFloat(style),unit];});return val;}});jQuery.each(['backgroundColor','borderBottomColor','borderLeftColor','borderRightColor','borderTopColor','color','outlineColor'],function(i,attr){jQuery.fx.step[attr]=function(fx){if(fx.state==0){fx.start=getColor(fx.elem,attr);fx.end=getRGB(fx.end);}
fx.elem.style[attr]="rgb("+[Math.max(Math.min(parseInt((fx.pos*(fx.end[0]-fx.start[0]))+fx.start[0]),255),0),Math.max(Math.min(parseInt((fx.pos*(fx.end[1]-fx.start[1]))+fx.start[1]),255),0),Math.max(Math.min(parseInt((fx.pos*(fx.end[2]-fx.start[2]))+fx.start[2]),255),0)].join(",")+")";}});function getRGB(color){var result;if(color&&color.constructor==Array&&color.length==3)
return color;if(result=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
return[parseInt(result[1]),parseInt(result[2]),parseInt(result[3])];if(result=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
return[parseFloat(result[1])*2.55,parseFloat(result[2])*2.55,parseFloat(result[3])*2.55];if(result=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
return[parseInt(result[1],16),parseInt(result[2],16),parseInt(result[3],16)];if(result=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
return[parseInt(result[1]+result[1],16),parseInt(result[2]+result[2],16),parseInt(result[3]+result[3],16)];if(result=/rgba\(0, 0, 0, 0\)/.exec(color))
return colors['transparent']
return colors[jQuery.trim(color).toLowerCase()];}
function getColor(elem,attr){var color;do{color=jQuery.curCSS(elem,attr);if(color!=''&&color!='transparent'||jQuery.nodeName(elem,"body"))
break;attr="backgroundColor";}while(elem=elem.parentNode);return getRGB(color);};var colors={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});})(jQuery);(function($){$.effects.blind=function(o){return this.queue(function(){var el=$(this),props=['position','top','left'];var mode=$.effects.setMode(el,o.options.mode||'hide');var direction=o.options.direction||'vertical';$.effects.save(el,props);el.show();var wrapper=$.effects.createWrapper(el).css({overflow:'hidden'});var ref=(direction=='vertical')?'height':'width';var distance=(direction=='vertical')?wrapper.height():wrapper.width();if(mode=='show')wrapper.css(ref,0);var animation={};animation[ref]=mode=='show'?distance:0;wrapper.animate(animation,o.duration,o.options.easing,function(){if(mode=='hide')el.hide();$.effects.restore(el,props);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(el[0],arguments);el.dequeue();});});};})(jQuery);(function($){$.effects.drop=function(o){return this.queue(function(){var el=$(this),props=['position','top','left','opacity'];var mode=$.effects.setMode(el,o.options.mode||'hide');var direction=o.options.direction||'left';$.effects.save(el,props);el.show();$.effects.createWrapper(el);var ref=(direction=='up'||direction=='down')?'top':'left';var motion=(direction=='up'||direction=='left')?'pos':'neg';var distance=o.options.distance||(ref=='top'?el.outerHeight({margin:true})/2:el.outerWidth({margin:true})/2);if(mode=='show')el.css('opacity',0).css(ref,motion=='pos'?-distance:distance);var animation={opacity:mode=='show'?1:0};animation[ref]=(mode=='show'?(motion=='pos'?'+=':'-='):(motion=='pos'?'-=':'+='))+distance;el.animate(animation,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(mode=='hide')el.hide();$.effects.restore(el,props);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(this,arguments);el.dequeue();}});});};})(jQuery);(function($){$.effects.fold=function(o){return this.queue(function(){var el=$(this),props=['position','top','left'];var mode=$.effects.setMode(el,o.options.mode||'hide');var size=o.options.size||15;var horizFirst=!(!o.options.horizFirst);$.effects.save(el,props);el.show();var wrapper=$.effects.createWrapper(el).css({overflow:'hidden'});var widthFirst=((mode=='show')!=horizFirst);var ref=widthFirst?['width','height']:['height','width'];var distance=widthFirst?[wrapper.width(),wrapper.height()]:[wrapper.height(),wrapper.width()];var percent=/([0-9]+)%/.exec(size);if(percent)size=parseInt(percent[1])/100*distance[mode=='hide'?0:1];if(mode=='show')wrapper.css(horizFirst?{height:0,width:size}:{height:size,width:0});var animation1={},animation2={};animation1[ref[0]]=mode=='show'?distance[0]:size;animation2[ref[1]]=mode=='show'?distance[1]:0;wrapper.animate(animation1,o.duration/2,o.options.easing).animate(animation2,o.duration/2,o.options.easing,function(){if(mode=='hide')el.hide();$.effects.restore(el,props);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(el[0],arguments);el.dequeue();});});};})(jQuery);;(function($){$.effects.highlight=function(o){return this.queue(function(){var el=$(this),props=['backgroundImage','backgroundColor','opacity'];var mode=$.effects.setMode(el,o.options.mode||'show');var color=o.options.color||"#ffff99";var oldColor=el.css("backgroundColor");$.effects.save(el,props);el.show();el.css({backgroundImage:'none',backgroundColor:color});var animation={backgroundColor:oldColor};if(mode=="hide")animation['opacity']=0;el.animate(animation,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(mode=="hide")el.hide();$.effects.restore(el,props);if(mode=="show"&&jQuery.browser.msie)this.style.removeAttribute('filter');if(o.callback)o.callback.apply(this,arguments);el.dequeue();}});});};})(jQuery);(function($){$.effects.slide=function(o){return this.queue(function(){var el=$(this),props=['position','top','left'];var mode=$.effects.setMode(el,o.options.mode||'show');var direction=o.options.direction||'left';$.effects.save(el,props);el.show();$.effects.createWrapper(el).css({overflow:'hidden'});var ref=(direction=='up'||direction=='down')?'top':'left';var motion=(direction=='up'||direction=='left')?'pos':'neg';var distance=o.options.distance||(ref=='top'?el.outerHeight({margin:true}):el.outerWidth({margin:true}));if(mode=='show')el.css(ref,motion=='pos'?-distance:distance);var animation={};animation[ref]=(mode=='show'?(motion=='pos'?'+=':'-='):(motion=='pos'?'-=':'+='))+distance;el.animate(animation,{queue:false,duration:o.duration,easing:o.options.easing,complete:function(){if(mode=='hide')el.hide();$.effects.restore(el,props);$.effects.removeWrapper(el);if(o.callback)o.callback.apply(this,arguments);el.dequeue();}});});};})(jQuery);
(function($) {

$.ui = $.ui || {};

$.ui.accordion = {};
$.extend($.ui.accordion, {
	defaults: {
		selectedClass: "selected",
		alwaysOpen: true,
		animated: 'slide',
		event: "click",
		header: "a",
		autoheight: true
	},
	animations: {
		slide: function(settings, additions) {
			settings = $.extend({
				easing: "swing",
				duration: 300
			}, settings, additions);
			if ( !settings.toHide.size() ) {
				settings.toShow.animate({height: "show"}, settings);
				return;
			}
			var hideHeight = settings.toHide.height(),
				showHeight = settings.toShow.height(),
				difference = showHeight / hideHeight;
			settings.toShow.css({ height: 0, overflow: 'hidden' }).show();
			settings.toHide.filter(":hidden").each(settings.complete).end().filter(":visible").animate({height:"hide"},{
				step: function(now){
					settings.toShow.height((hideHeight - (now)) * difference );
				},
				duration: settings.duration,
				easing: settings.easing,
				complete: settings.complete
			});
		},
		bounceslide: function(settings) {
			this.slide(settings, {
				easing: settings.down ? "bounceout" : "swing",
				duration: settings.down ? 1000 : 200
			});
		},
		easeslide: function(settings) {
			this.slide(settings, {
				easing: "easeinout",
				duration: 700
			})
		}
	}
});

$.fn.extend({
	accordion: function(settings) {
		if ( !this.length )
			return this;
	
		// setup configuration
		settings = $.extend({}, $.ui.accordion.defaults, settings);
		
		if ( settings.navigation ) {
			var current = this.find("a").filter(function() { return this.href == location.href; });
			if ( current.length ) {
				if ( current.filter(settings.header).length ) {
					settings.active = current;
				} else {
					settings.active = current.parent().parent().prev();
					current.addClass("current");
				}
			}
		}
		
		// calculate active if not specified, using the first header
		var container = this,
			headers = container.find(settings.header),
			active = findActive(settings.active),
			running = 0;

		if ( settings.fillSpace ) {
			var maxHeight = this.parent().height();
			headers.each(function() {
				maxHeight -= $(this).outerHeight();
			});
			var maxPadding = 0;
			headers.next().each(function() {
				maxPadding = Math.max(maxPadding, $(this).innerHeight() - $(this).height());
			}).height(maxHeight - maxPadding);
		} else if ( settings.autoheight ) {
			var maxHeight = 0;
			headers.next().each(function() {
				maxHeight = Math.max(maxHeight, $(this).outerHeight());
			}).height(maxHeight);
		}

		headers
			.not(active || "")
			.next()
			.hide();
		active.parent().andSelf().addClass(settings.selectedClass);
		
		
		function findActive(selector) {
			return selector != undefined
				? typeof selector == "number"
					? headers.filter(":eq(" + selector + ")")
					: headers.not(headers.not(selector))
				: selector === false
					? $("<div>")
					: headers.filter(":eq(0)");
		}
		
		function toggle(toShow, toHide, data, clickedActive, down) {
			var complete = function(cancel) {
				running = cancel ? 0 : --running;
				if ( running )
					return;
				if ( settings.clearStyle ) {
					toShow.add(toHide).css({
						height: "",
						overflow: ""
					});
				}
				// trigger custom change event
				container.trigger("change", data);
			};
			
			// count elements to animate
			running = toHide.size() == 0 ? toShow.size() : toHide.size();
			
			if ( settings.animated ) {
				if ( !settings.alwaysOpen && clickedActive ) {
					toShow.slideToggle(settings.animated);
					complete(true);
				} else {
					$.ui.accordion.animations[settings.animated]({
						toShow: toShow,
						toHide: toHide,
						complete: complete,
						down: down
					});
				}
			} else {
				if ( !settings.alwaysOpen && clickedActive ) {
					toShow.toggle();
				} else {
					toHide.hide();
					toShow.show();
				}
				complete(true);
			}
		}
		
		function clickHandler(event) {
			// called only when using activate(false) to close all parts programmatically
			if ( !event.target && !settings.alwaysOpen ) {
				active.parent().andSelf().toggleClass(settings.selectedClass);
				var toHide = active.next();
				var toShow = active = $([]);
				toggle( toShow, toHide );
				return false;
			}
			// get the click target
			var clicked = $(event.target);
			
			// due to the event delegation model, we have to check if one
			// of the parent elements is our actual header, and find that
			if ( clicked.parents(settings.header).length )
				while ( !clicked.is(settings.header) )
					clicked = clicked.parent();
			
			var clickedActive = clicked[0] == active[0];
			
			// if animations are still active, or the active header is the target, ignore click
			if(running || (settings.alwaysOpen && clickedActive) || !clicked.is(settings.header))
				return false;

			// switch classes
			active.parent().andSelf().toggleClass(settings.selectedClass);
			if ( !clickedActive ) {
				clicked.parent().andSelf().addClass(settings.selectedClass);
			}

			// find elements to show and hide
			var toShow = clicked.next(),
				toHide = active.next(),
				data = [clicked, active, toShow, toHide],
				down = headers.index( active[0] ) > headers.index( clicked[0] );
			
			active = clickedActive ? $([]) : clicked;
			toggle( toShow, toHide, data, clickedActive, down );

			return false;
		};
		function activateHandler(event, index) {
			// IE manages to call activateHandler on normal clicks
			if ( arguments.length == 1 )
				return;
			// call clickHandler with custom event
			clickHandler({
				target: findActive(index)[0]
			});
		};

		return container
			.bind(settings.event || "", clickHandler)
			.bind("activate", activateHandler);
	},
	activate: function(index) {
		return this.trigger('activate', [index]);
	},
	unaccordion: function() {
		return this.find("*").andSelf().unbind().end().end();
	}
});

})(jQuery);
(function($){
	
$.dimensions = {
	version: '@VERSION'
};

// Create innerHeight, innerWidth, outerHeight and outerWidth methods
$.each( [ 'Height', 'Width' ], function(i, name){
	
	// innerHeight and innerWidth
	$.fn[ 'inner' + name ] = function() {
		if (!this[0]) return;
		
		var torl = name == 'Height' ? 'Top'    : 'Left',  // top or left
		    borr = name == 'Height' ? 'Bottom' : 'Right'; // bottom or right
		
		return num( this, name.toLowerCase() ) + num(this, 'padding' + torl) + num(this, 'padding' + borr);
	};
	
	// outerHeight and outerWidth
	$.fn[ 'outer' + name ] = function(options) {
		if (!this[0]) return;
		
		var torl = name == 'Height' ? 'Top'    : 'Left',  // top or left
		    borr = name == 'Height' ? 'Bottom' : 'Right'; // bottom or right
		
		options = $.extend({ margin: false }, options || {});
		
		return num( this, name.toLowerCase() )
				+ num(this, 'border' + torl + 'Width') + num(this, 'border' + borr + 'Width')
				+ num(this, 'padding' + torl) + num(this, 'padding' + borr)
				+ (options.margin ? (num(this, 'margin' + torl) + num(this, 'margin' + borr)) : 0);
	};
});

// Create scrollLeft and scrollTop methods
$.each( ['Left', 'Top'], function(i, name) {
	$.fn[ 'scroll' + name ] = function(val) {
		if (!this[0]) return;
		
		return val != undefined ?
		
			// Set the scroll offset
			this.each(function() {
				this == window || this == document ?
					window.scrollTo( 
						name == 'Left' ? val : $(window)[ 'scrollLeft' ](),
						name == 'Top'  ? val : $(window)[ 'scrollTop'  ]()
					) :
					this[ 'scroll' + name ] = val;
			}) :
			
			// Return the scroll offset
			this[0] == window || this[0] == document ?
				self[ (name == 'Left' ? 'pageXOffset' : 'pageYOffset') ] ||
					$.boxModel && document.documentElement[ 'scroll' + name ] ||
					document.body[ 'scroll' + name ] :
				this[0][ 'scroll' + name ];
	};
});

$.fn.extend({
	position: function() {
		var left = 0, top = 0, elem = this[0], offset, parentOffset, offsetParent, results;
		
		if (elem) {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();
			
			// Get correct offsets
			offset       = this.offset();
			parentOffset = offsetParent.offset();
			
			// Subtract element margins
			offset.top  -= num(elem, 'marginTop');
			offset.left -= num(elem, 'marginLeft');
			
			// Add offsetParent borders
			parentOffset.top  += num(offsetParent, 'borderTopWidth');
			parentOffset.left += num(offsetParent, 'borderLeftWidth');
			
			// Subtract the two offsets
			results = {
				top:  offset.top  - parentOffset.top,
				left: offset.left - parentOffset.left
			};
		}
		
		return results;
	},
	
	offsetParent: function() {
		var offsetParent = this[0].offsetParent;
		while ( offsetParent && (!/^body|html$/i.test(offsetParent.tagName) && $.css(offsetParent, 'position') == 'static') )
			offsetParent = offsetParent.offsetParent;
		return $(offsetParent);
	}
});

function num(el, prop) {
	return parseInt($.css(el.jquery?el[0]:el,prop))||0;
};

})(jQuery);