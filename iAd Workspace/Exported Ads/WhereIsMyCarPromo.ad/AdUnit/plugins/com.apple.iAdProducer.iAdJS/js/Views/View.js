
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.View",superclass:iAd.Object,mixins:[iAd.EventTarget],synthesizedProperties:["id","position","size","frame","transform","anchorPoint","anchorPointZ","doubleSided","zIndex","opacity","clipsToBounds","hidden","wantsHardwareLayerBacking","transitionsEnabled","transitionsDuration","hostingLayer","userInteractionEnabled","declarativeLayerWasInitialized","eventTarget","layerIsInDocument","touchLayer","tracking","navigable","focused"],archivedProperties:["id","position","size","autoresizingMask","transform","anchorPoint","anchorPointZ","doubleSided","zIndex","opacity","clipsToBounds","hidden","wantsHardwareLayerBacking","transitionsEnabled","transitionsDuration","subviews","userInteractionEnabled","navigable","focused"],cssClassName:"ad-view",collectionAccessor:"views"});iAd.View.prototype.init=function(a){this.callSuper();if(iAd.Utils.objectIsString(a)){a=document.querySelector(a)}this.layer=a;this.superview=null;this.subviews=[];this.tracksAllTouchesOnceTouchesBegan=true;this.autoresizesSubviews=true;this.autoresizingMask=iAd.View.AUTORESIZING_NONE;this._layerIsInDocument=false;this._position=new iAd.Point();this._size=new iAd.Size();this._anchorPoint=new iAd.Point(0.5,0.5);this._anchorPointZ=0;this._doubleSided=true;this._zIndex=0;this._opacity=1;this._transform="none";this._clipsToBounds=false;this._hidden=false;this._wantsHardwareLayerBacking=false;this._transitionsEnabled=false;this._transitionsDuration=0.5;this._hostingLayer=null;this._userInteractionEnabled=false;this._touchLayer=null;this._navigable=false;this._focused=false;this._tracking=false;this.touchInside=false;this.mouseInside=false;this.gestureRecognizers=[];this.usesDeclarativeBacking=(a instanceof Element);this._declarativeLayerWasInitialized=false;if(this.usesDeclarativeBacking){if(document.body.contains(this.layer)){this._layerIsInDocument=true;this.initWithDeclarativeBacking();this.layerWasInsertedIntoDocument()}}else{this.createLayer();this.setupCSSClasses();this.layerWasCreated()}this.layer._view=this};iAd.View.MANAGED_BY_VIEW_CONTROLLER_ATTR="ad-managed-by-view-controller";iAd.View.AUTORESIZING_NONE=0;iAd.View.AUTORESIZING_FLEXIBLE_LEFT_MARGIN=1<<0;iAd.View.AUTORESIZING_FLEXIBLE_WIDTH=1<<1;iAd.View.AUTORESIZING_FLEXIBLE_RIGHT_MARGIN=1<<2;iAd.View.AUTORESIZING_FLEXIBLE_TOP_MARGIN=1<<3;iAd.View.AUTORESIZING_FLEXIBLE_HEIGHT=1<<4;iAd.View.AUTORESIZING_FLEXIBLE_BOTTOM_MARGIN=1<<5;iAd.View.PROPERTY_MAPPING={opacity:"opacity",transform:"-webkit-transform",position:"-webkit-transform",anchorPoint:"-webkit-transform-origin",doubleSided:"-webkit-backface-visibility",zIndex:"z-index"};iAd.View.EVENT_ATTRIBUTE_PREFIX=iAd.Element.ATTRIBUTE_PREFIX+"on";iAd.View.LAYER_STYLE_DID_CHANGE_EVENT="viewLayerStyleDidChange";iAd.View.INSIDE_PADDING=(iAd.Device.IS_IPAD?25:70);iAd.View.TOUCH_DOWN_EVENT="viewTouchDown";iAd.View.TOUCH_DRAG_INSIDE_EVENT="viewTouchDragInside";iAd.View.TOUCH_DRAG_OUTSIDE_EVENT="viewTouchDragOutside";iAd.View.TOUCH_DRAG_ENTER_EVENT="viewTouchDragEnter";iAd.View.TOUCH_DRAG_EXIT_EVENT="viewTouchDragExit";iAd.View.TOUCH_UP_INSIDE_EVENT="viewTouchUpInside";iAd.View.TOUCH_UP_OUTSIDE_EVENT="viewTouchUpOutside";iAd.View.TOUCH_CANCEL_EVENT="viewTouchCancel";iAd.View.TOUCH_STATE_CHANGE_EVENT="viewTouchStateChange";iAd.View.FOCUS_IN_EVENT="viewFocusIn";iAd.View.FOCUS_OUT_EVENT="viewFocusOut";iAd.View.ACTIVATE_EVENT="viewActivate";iAd.View.synthesizedEvents=[iAd.View.TOUCH_DOWN_EVENT,iAd.View.TOUCH_DRAG_INSIDE_EVENT,iAd.View.TOUCH_DRAG_OUTSIDE_EVENT,iAd.View.TOUCH_DRAG_ENTER_EVENT,iAd.View.TOUCH_DRAG_EXIT_EVENT,iAd.View.TOUCH_UP_INSIDE_EVENT,iAd.View.TOUCH_UP_OUTSIDE_EVENT,iAd.View.TOUCH_CANCEL_EVENT,iAd.View.TOUCH_STATE_CHANGE_EVENT];iAd.View.dispatchesStyleChangeEvents=false;iAd.View.FOCUSED_CSS_CLASS="ad-focused";iAd.View.prototype.createLayer=function(){this.layer=document.createElement("div")};iAd.View.prototype.initWithDeclarativeBacking=function(){this.setupLayer();this.layerWasCreated();this.setupCSSClasses();this.readPropertiesFromLayerComputedStyle(window.getComputedStyle(this.layer));this.readPropertiesFromLayerAttributes(this.getCustomLayerAttributes());this.declarativeLayerWasInitialized=true};iAd.View.prototype.setupLayer=function(){this.lookupViewLayersInLayer(this.hostingLayer);if(this.layer.hasClassName(iAd.SpatialNavigationManager.NAVIGABLE_CSS_CLASS)){this.navigable=true}};iAd.View.prototype.lookupViewLayersInLayer=function(c){var d=c.firstElementChild;while(d){if(!d.hasOwnProperty("_view")){var b=iAd.View.viewClassForLayer(d);if(b){var a=new b(d);a._indexInSuperviewSubviews=this.subviews.push(a)-1;a.willMoveToSuperview(this);a.superview=this;a.didMoveToSuperview()}else{this.lookupViewLayersInLayer(d)}}d=d.nextElementSibling}};iAd.View.prototype.setupCSSClasses=function(){var a=this.constructor,b;while(a.superclass){b=a.cssClassName;if(b){this.layer.addClassName(b)}if(a===iAd.View){break}a=a.superclass}};iAd.View.prototype.readPropertiesFromLayerComputedStyle=function(b){this._size.width=parseInt(b.width,10)||0;this._size.height=parseInt(b.height,10)||0;this._position.x=parseInt(b.left,10)||0;this._position.y=parseInt(b.top,10)||0;this._zIndex=parseInt(b.zIndex,10)||0;this._clipsToBounds=(b.overflow=="hidden");this._doubleSided=(b.webkitBackfaceVisibility=="visible");this._transform=b.webkitTransform;this._hidden=(b.visibility=="hidden");this._opacity=parseFloat(b.opacity);var a=iAd.CSS.matrixFromString(this._transform);var c=new WebKitCSSMatrix();if(!iAd.CSS.matrixEqualsToMatrix(a,c)){this._position.x+=a.m41;this._position.y+=a.m42;a=a.translate(a.m41*-1,a.m42*-1,0);this._transform=a.toString()}if(this._transform!="none"){this._wantsHardwareLayerBacking=true}};iAd.View.prototype.readPropertiesFromLayerAttributes=function(b){if(iAd.ViewController!=null&&b.hasOwnProperty(iAd.View.MANAGED_BY_VIEW_CONTROLLER_ATTR)){this.createManagingViewController()}var c,e,d;var a=this.constructor.synthesizedEventMap;for(c in b){d=b[c];e=a[c.toLowerCase()];if(e){this.addEventListener(e,iAd.Event.eventHandlerForString(d),false)}else{this.setValueForAttribute(d,c)}}};iAd.View.prototype.createManagingViewController=function(){new iAd.ViewController({id:this.layer.hasAttribute("id")?this.layer.getAttribute("id"):"",properties:{view:this}})};iAd.View.prototype.setValueForAttribute=function(c,b){var a=this.propertyNameForAttribute(b);switch(typeof(this[a])){case"string":this[a]=c;break;case"number":this[a]=parseFloat(c);break;case"boolean":this[a]=!(c=="false");break;default:this[a]=c}};iAd.View.prototype.propertyNameForAttribute=function(a){return iAd.String.dashedStringToCamelCase(a.substr(iAd.Element.ATTRIBUTE_PREFIX.length))};iAd.View.prototype.attributeNameForProperty=function(a){return iAd.Element.ATTRIBUTE_PREFIX+iAd.String.camelCaseStringToDashed(a)};iAd.View.prototype.getCustomLayerAttributes=function(){var a={};var d=iAd.Element.HTML5_CUSTOM_ATTRIBUTE_PREFIX+iAd.Element.ATTRIBUTE_PREFIX;var g=this.layer.attributes;var f,b;for(var c=0,e=g.length;c<e;c++){f=g.item(c);b=f.name;if(b.indexOf(d)==0){a[b.substr(iAd.Element.HTML5_CUSTOM_ATTRIBUTE_PREFIX.length)]=f.value}else{if(b.indexOf(iAd.Element.ATTRIBUTE_PREFIX)==0){a[b]=f.value}}}this.customLayerAttributes=a;return a};iAd.View.prototype.layerHasCustomAttribute=function(a){if(this.customLayerAttributes){return this.customLayerAttributes.hasOwnProperty(a)}return iAd.Element.hasCustomAttribute(this.layer,a)};iAd.View.prototype.getLayerCustomAttributeValue=function(a){if(this.customLayerAttributes){return this.customLayerAttributes[a]||null}else{return iAd.Element.getCustomAttribute(this.layer,a)}};iAd.View.prototype.setLayerStyle=function(a){for(var b in a){this.layer.style.setProperty(b,a[b])}if(iAd.View.dispatchesStyleChangeEvents){this.createAndDispatchEvent(iAd.View.LAYER_STYLE_DID_CHANGE_EVENT,[["changedProperties",a]])}};iAd.View.prototype.toString=function(){return[this.constructor.displayName,"[",this._size.width,"x",this._size.height,"@",this._position.x,",",this._position.y,"]"].join("")};iAd.View.prototype.getId=function(){return this.layer.id};iAd.View.prototype.setId=function(a){this.layer.id=a};iAd.View.prototype.setPosition=function(a){if(!a||this._position.equals(a)){return}this._position=a;this.updatePositionAndTransform()};iAd.View.prototype.setSize=function(a){if(!a||this._size.equals(a)){return}var b=this._size.copy();this._size=a;this.setLayerStyle({width:a.width+"px",height:a.height+"px"});if(this.autoresizesSubviews){this.resizeSubviewsWithOldSize(b)}};iAd.View.prototype.getFrame=function(){return new iAd.Rect(this.position.x,this.position.y,this.size.width,this.size.height)};iAd.View.prototype.setFrame=function(a){this.position=a.origin;this.size=a.size};iAd.View.prototype.setTransform=function(a){this._transform=a;this.updatePositionAndTransform()};iAd.View.prototype.setAnchorPoint=function(a){if(!a){return}this._anchorPoint=a;this.updateLayerTransformOrigin()};iAd.View.prototype.setAnchorPointZ=function(a){this._anchorPointZ=a;this.updateLayerTransformOrigin()};iAd.View.prototype.updateLayerTransformOrigin=function(){this.setLayerStyle({"-webkit-transform-origin":Math.round(this._anchorPoint.x*100)+"% "+Math.round(this._anchorPoint.y*100)+"% "+this._anchorPointZ+"px"})};iAd.View.prototype.setDoubleSided=function(a){this._doubleSided=a;this.setLayerStyle({"-webkit-backface-visibility":a?"visible":"hidden"})};iAd.View.prototype.setZIndex=function(a){this._zIndex=a;this.setLayerStyle({"z-index":a})};iAd.View.prototype.setHidden=function(a){this._hidden=a;this.setLayerStyle({visibility:(a?"hidden":"visible")})};iAd.View.prototype.updatePositionAndTransform=function(){if(this._wantsHardwareLayerBacking||this._transitionsEnabled){this.setLayerStyle({left:"0",top:"0","-webkit-transform":iAd.CSS.concatenateTransforms(iAd.CSS.tm(iAd.CSS.roundedPxValue(this._position.x),iAd.CSS.roundedPxValue(this._position.y)),this._transform)})}else{this.setLayerStyle({left:this._position.x+"px",top:this._position.y+"px","-webkit-transform":this._transform})}};iAd.View.prototype.setOpacity=function(a){this._opacity=a;this.setLayerStyle({opacity:a})};iAd.View.prototype.setTransitionsEnabled=function(a){this.setLayerStyle({"-webkit-transition-duration":a?this._transitionsDuration+"s":"0s"});this._transitionsEnabled=a;this.updatePositionAndTransform()};iAd.View.prototype.setWantsHardwareLayerBacking=function(a){if(this._wantsHardwareLayerBacking==a){return}this._wantsHardwareLayerBacking=a;this.updatePositionAndTransform()};iAd.View.prototype.setTransitionsDuration=function(a){this.setLayerStyle({"-webkit-transition-duration":a+"s"});this._transitionsDuration=a};iAd.View.prototype.setClipsToBounds=function(a){this._clipsToBounds=a;this.setLayerStyle({overflow:a?"hidden":"visible"})};iAd.View.prototype.getTouchLayer=function(){return this._touchLayer||this.layer};iAd.View.prototype.getHostingLayer=function(){return(this._hostingLayer!=null)?this._hostingLayer:this.layer};iAd.View.prototype.addSubview=function(a){return this.insertSubviewAtIndex(a,this.subviews.length)};iAd.View.prototype.removeFromSuperview=function(){if(this.superview==null){return}this.willMoveToSuperview(null);this.superview.removeSubview(this);this.layer.parentNode.removeChild(this.layer);this.superview=null;this.didMoveToSuperview();this.dispatchNotificationOfLayerRemovalFromDocument()};iAd.View.prototype.removeSubview=function(e){if(e.superview!=this){return}this.willRemoveSubview(e);var d=this.subviews;var a=e._indexInSuperviewSubviews;d.splice(a,1);for(var b=a,c=d.length;b<c;b++){d[b]._indexInSuperviewSubviews=b}};iAd.View.prototype.insertSubviewAtIndex=function(g,f){var j=this.subviews;if(f>j.length){return}var b=g.superview;var a;if(b==this){a=g._indexInSuperviewSubviews;if(f===a){return}j.splice(a,1);if(f>a){f--}}else{if(b){b.removeSubview(g)}g.willMoveToSuperview(this)}j.splice(f,0,g);g._indexInSuperviewSubviews=f;var h=(a!=null&&a<f)?a:f+1;for(var d=h,e=j.length;d<e;d++){j[d]._indexInSuperviewSubviews=d}var c=j[f+1];this.hostingLayer.insertBefore(g.layer,c?c.layer:null);if(b!=this){g.superview=this;g.didMoveToSuperview()}this.didAddSubview(g);if(this._layerIsInDocument&&!g._layerIsInDocument){g.dispatchNotificationOfLayerInsertionIntoDocument()}return g};iAd.View.prototype.insertSubviewAfterSubview=function(b,a){if(a.superview!==this){return}var c=a._indexInSuperviewSubviews+1;if(c<this.subviews.length){this.insertSubviewAtIndex(b,c)}else{this.addSubview(b)}return b};iAd.View.prototype.insertSubviewBeforeSubview=function(b,a){if(a.superview!==this){return}return this.insertSubviewAtIndex(b,a._indexInSuperviewSubviews)};iAd.View.prototype.exchangeSubviewsAtIndices=function(b,a){if(b>=this.subviews.length||a>=this.subviews.length){return}var d=this.subviews[b];var g=this.subviews[a];this.subviews[b]=g;this.subviews[a]=d;d._indexInSuperviewSubviews=a;g._indexInSuperviewSubviews=b;var h=d.layer;var f=g.layer;var i=this.hostingLayer;var e=h.nextSibling;var c=f.nextSibling;if(e!=null){i.insertBefore(f,e)}else{i.appendChild(f)}if(c!=null){i.insertBefore(h,c)}else{i.appendChild(h)}};iAd.View.prototype.isDescendantOfView=function(b){var c=false;var a=this;while(a.superview!=null){if(a.superview===b){c=true;break}a=a.superview}return c};iAd.View.prototype.layerWasCreated=function(){};iAd.View.prototype.willMoveToSuperview=function(a){};iAd.View.prototype.didMoveToSuperview=function(){};iAd.View.prototype.didAddSubview=function(a){};iAd.View.prototype.willRemoveSubview=function(a){};iAd.View.prototype.layerWasInsertedIntoDocument=function(){if(this.usesDeclarativeBacking){if(!this.declarativeLayerWasInitialized){this.initWithDeclarativeBacking()}else{var a=window.getComputedStyle(this.layer);if(isNaN(this._size.width)){this._size.width=parseInt(a.width,10);this._size.height=parseInt(a.height,10)}if(isNaN(this._position.x)){this._position.x=parseInt(a.left,10);this._position.y=parseInt(a.top,10)}}}this.layerIsInDocument=true};iAd.View.prototype.layerWasRemovedFromDocument=function(){this.layerIsInDocument=false};iAd.View.prototype.dispatchNotificationOfLayerInsertionIntoDocument=function(){var c=this.subviews;for(var a=0,b=c.length;a<b;a++){c[a].dispatchNotificationOfLayerInsertionIntoDocument()}this.layerWasInsertedIntoDocument()};iAd.View.prototype.dispatchNotificationOfLayerRemovalFromDocument=function(){var c=this.subviews;for(var a=0,b=c.length;a<b;a++){c[a].dispatchNotificationOfLayerRemovalFromDocument()}this.layerWasRemovedFromDocument()};iAd.View.prototype.setUserInteractionEnabled=function(a){if(this._userInteractionEnabled==a){return}var c=Element.prototype[a?"addEventListener":"removeEventListener"];c.call(this.touchLayer,iAd.Event.START_EVENT,this,false);if(!iAd.Event.SUPPORTS_TOUCHES){var b=this.layer;c.call(b,"mouseover",this,false);c.call(b,"mouseout",this,false)}this._userInteractionEnabled=a};iAd.View.prototype.handleEvent=function(a){switch(a.type){case iAd.Event.START_EVENT:this.touchesBegan(a);break;case iAd.Event.MOVE_EVENT:this.touchesMoved(a);break;case iAd.Event.END_EVENT:this.touchesEnded(a);break;case iAd.Event.CANCEL_EVENT:this.touchesCancelled(a);break;case"mouseover":this.handleMouseover(a);break;case"mouseout":this.handleMouseout(a);break;case iAd.SpatialNavigationManager.ACTIVATE_EVENT:this.handleSNMActivate(a);break;case iAd.SpatialNavigationManager.FOCUS_IN_EVENT:this.handleSNMFocusIn(a);break;case iAd.SpatialNavigationManager.FOCUS_OUT_EVENT:this.handleSNMFocusOut(a);break}};iAd.View.prototype.handleSNMActivate=function(a){this.createAndDispatchEvent(iAd.View.ACTIVATE_EVENT,[["originalEvent",a]])};iAd.View.prototype.handleSNMFocusIn=function(a){this.focused=true};iAd.View.prototype.handleSNMFocusOut=function(a){if(this.mouseInside){this.layer.addClassName(iAd.View.FOCUSED_CSS_CLASS);return}this.focused=false};iAd.View.prototype.touchesBegan=function(a){if(this.tracksAllTouchesOnceTouchesBegan){window.addEventListener(iAd.Event.MOVE_EVENT,this,true);window.addEventListener(iAd.Event.END_EVENT,this,true);window.addEventListener(iAd.Event.CANCEL_EVENT,this,true)}a.preventDefault();this.tracking=true;this.touchInside=true;this.dispatchEvent(this.createUIEvent(iAd.View.TOUCH_DOWN_EVENT,a));this.createAndDispatchEvent(iAd.View.TOUCH_STATE_CHANGE_EVENT);this.lastProcessedEvent=a};iAd.View.prototype.touchesMoved=function(b){if(this.shouldPreventEventDefault(b)){b.preventDefault()}var a=this.pointInsidePaddedBounds(iAd.Point.fromEventInElement(b,this.layer));var c=a?iAd.View.TOUCH_DRAG_INSIDE_EVENT:iAd.View.TOUCH_DRAG_OUTSIDE_EVENT;if(a!=this.touchInside){this.touchInside=a;c=a?iAd.View.TOUCH_DRAG_ENTER_EVENT:iAd.View.TOUCH_DRAG_EXIT_EVENT;this.createAndDispatchEvent(iAd.View.TOUCH_STATE_CHANGE_EVENT)}this.dispatchEvent(this.createUIEvent(c,b));this.lastProcessedEvent=b};iAd.View.prototype.shouldPreventEventDefault=function(a){return true};iAd.View.prototype.touchesEnded=function(b){window.removeEventListener(iAd.Event.MOVE_EVENT,this,true);window.removeEventListener(iAd.Event.END_EVENT,this,true);window.removeEventListener(iAd.Event.CANCEL_EVENT,this,true);this.tracking=false;var a=this.touchInside?iAd.View.TOUCH_UP_INSIDE_EVENT:iAd.View.TOUCH_UP_OUTSIDE_EVENT;this.dispatchEvent(this.createUIEvent(a,this.lastProcessedEvent));if(this.touchInside){this.createAndDispatchEvent(iAd.View.ACTIVATE_EVENT,[["originalEvent",b]])}this.touchInside=false;this.createAndDispatchEvent(iAd.View.TOUCH_STATE_CHANGE_EVENT)};iAd.View.prototype.touchesCancelled=function(a){window.removeEventListener(iAd.Event.MOVE_EVENT,this,true);window.removeEventListener(iAd.Event.END_EVENT,this,true);window.removeEventListener(iAd.Event.CANCEL_EVENT,this,true);this.tracking=false;this.touchInside=false;this.dispatchEvent(this.createUIEvent(iAd.View.TOUCH_CANCEL_EVENT,a))};iAd.View.prototype.handleMouseover=function(a){if(a.target===a.currentTarget){this.mouseEntered(a)}};iAd.View.prototype.handleMouseout=function(a){if(a.target===a.currentTarget&&!this.pointInside(iAd.Point.fromEventInElement(a,this.layer))){this.mouseExited(a)}};iAd.View.prototype.mouseEntered=function(a){this.mouseInside=true;this.focused=true};iAd.View.prototype.mouseExited=function(a){this.mouseInside=false;if(iAd.SpatialNavigationManager.sharedManager.focusedElement===this.layer){return}this.focused=false};iAd.View.prototype.createUIEvent=function(b,c){var a=iAd.Event.createUIEvent(b,c);if(!a.ad){a.ad={}}a.ad.sender=this;return a};iAd.View.prototype.pointInsidePaddedBounds=function(a){var b=iAd.View.INSIDE_PADDING;return(a.x>=-b&&a.x<this.size.width+b&&a.y>=-b&&a.y<this.size.height+b)};iAd.View.prototype.pointInside=function(a){return(a.x>=0&&a.x<this.size.width&&a.y>=0&&a.y<this.size.height)};iAd.View.prototype.resizeSubviewsWithOldSize=function(c){for(var a=0,b=this.subviews.length;a<b;a++){this.subviews[a].resizeWithOldSuperviewSize(c)}};iAd.View.prototype.resizeWithOldSuperviewSize=function(f){var a=this._position.copy();var e=this._size.copy();var c=this.autoresizingMask;if(f.width!=0||e.width==0){var d=(c&iAd.View.AUTORESIZING_FLEXIBLE_LEFT_MARGIN)+(c&iAd.View.AUTORESIZING_FLEXIBLE_WIDTH)+(c&iAd.View.AUTORESIZING_FLEXIBLE_RIGHT_MARGIN);var h;switch(d){case iAd.View.AUTORESIZING_NONE:break;case iAd.View.AUTORESIZING_FLEXIBLE_LEFT_MARGIN:a.x+=this.superview._size.width-f.width;break;case iAd.View.AUTORESIZING_FLEXIBLE_WIDTH:e.width=this.superview._size.width-(f.width-this._size.width);break;case iAd.View.AUTORESIZING_FLEXIBLE_LEFT_MARGIN|iAd.View.AUTORESIZING_FLEXIBLE_WIDTH:h=(f.width-this._size.width-this._position.x);a.x=(this._position.x/(f.width-h))*(this.superview._size.width-h);e.width=this.superview._size.width-a.x-h;break;case iAd.View.AUTORESIZING_FLEXIBLE_RIGHT_MARGIN:break;case iAd.View.AUTORESIZING_FLEXIBLE_LEFT_MARGIN|iAd.View.AUTORESIZING_FLEXIBLE_RIGHT_MARGIN:h=(f.width-this._size.width-this._position.x);a.x+=(this.superview._size.width-f.width)*(this.position.x/(this.position.x+h));break;case iAd.View.AUTORESIZING_FLEXIBLE_RIGHT_MARGIN|iAd.View.AUTORESIZING_FLEXIBLE_WIDTH:h=(f.width-this._size.width-this._position.x);scaled_right_margin=(h/(f.width-this._position.x))*(this.superview._size.width-this._position.x);e.width=this.superview._size.width-a.x-scaled_right_margin;break;case iAd.View.AUTORESIZING_FLEXIBLE_LEFT_MARGIN|iAd.View.AUTORESIZING_FLEXIBLE_WIDTH|iAd.View.AUTORESIZING_FLEXIBLE_RIGHT_MARGIN:a.x=(this._position.x/f.width)*this.superview._size.width;e.width=(this._size.width/f.width)*this.superview._size.width;break}}if(f.height!=0||e.height==0){var b=(c&iAd.View.AUTORESIZING_FLEXIBLE_TOP_MARGIN)+(c&iAd.View.AUTORESIZING_FLEXIBLE_HEIGHT)+(c&iAd.View.AUTORESIZING_FLEXIBLE_BOTTOM_MARGIN);var g;switch(b){case iAd.View.AUTORESIZING_NONE:break;case iAd.View.AUTORESIZING_FLEXIBLE_TOP_MARGIN:a.y+=this.superview._size.height-f.height;break;case iAd.View.AUTORESIZING_FLEXIBLE_HEIGHT:e.height=this.superview._size.height-(f.height-this._size.height);break;case iAd.View.AUTORESIZING_FLEXIBLE_TOP_MARGIN|iAd.View.AUTORESIZING_FLEXIBLE_HEIGHT:g=(f.height-this._size.height-this._position.y);a.y=(this._position.y/(f.height-g))*(this.superview._size.height-g);e.height=this.superview._size.height-a.y-g;break;case iAd.View.AUTORESIZING_FLEXIBLE_BOTTOM_MARGIN:break;case iAd.View.AUTORESIZING_FLEXIBLE_TOP_MARGIN|iAd.View.AUTORESIZING_FLEXIBLE_BOTTOM_MARGIN:g=(f.height-this._size.height-this._position.y);a.y+=(this.superview._size.height-f.height)*(this.position.y/(this.position.y+g));break;case iAd.View.AUTORESIZING_FLEXIBLE_BOTTOM_MARGIN|iAd.View.AUTORESIZING_FLEXIBLE_HEIGHT:g=(f.height-this._size.height-this._position.y);scaled_bottom_margin=(g/(f.height-this._position.y))*(this.superview._size.height-this._position.y);e.height=this.superview._size.height-a.y-scaled_bottom_margin;break;case iAd.View.AUTORESIZING_FLEXIBLE_TOP_MARGIN|iAd.View.AUTORESIZING_FLEXIBLE_HEIGHT|iAd.View.AUTORESIZING_FLEXIBLE_BOTTOM_MARGIN:a.y=(this._position.y/f.height)*this.superview._size.height;e.height=(this._size.height/f.height)*this.superview._size.height;break}}this.position=a;this.size=e};iAd.View.prototype.cssPropertyNameForJSProperty=function(a){return iAd.View.PROPERTY_MAPPING[a]};iAd.View.prototype.applyTransition=function(a,c){if(a==null){return null}var b=new iAd.Transition(a,c);b.target=this;b.start();return b};iAd.View.prototype.descendantViewsOfClass=function(a){return iAd.View.viewsForClassAndNode(a,this.layer)};iAd.View.prototype.getEventTarget=function(){return this.layer};iAd.View.prototype.addGestureRecognizer=function(a){if(this.gestureRecognizers.indexOf(a)!=-1){return}if(a.view!=null&&a.view!==this){a.view.removeGestureRecognizer(a)}this.gestureRecognizers.push(a);a.view=this};iAd.View.prototype.removeGestureRecognizer=function(a){if(iAd.Array.removeObjectFromArray(a,this.gestureRecognizers)){a.view=null}};iAd.View.prototype.convertRectToView=function(d,a){var c=this.convertPointToView(d.origin,a);var b=this.convertPointToView(new iAd.Point(d.maxX(),d.maxY()),a);return new iAd.Rect(c.x,c.y,b.x-c.x,b.y-c.y)};iAd.View.prototype.convertRectFromView=function(b,a){return a.convertRectToView(b,this)};iAd.View.prototype.convertPointToView=function(b,a){var c=window.webkitConvertPointFromNodeToPage(this.layer,new WebKitPoint(b.x,b.y));var d=window.webkitConvertPointFromPageToNode(a.layer,c);return new iAd.Point(d.x,d.y)};iAd.View.prototype.convertPointFromView=function(a,b){return b.convertPointToView(a,this)};iAd.View.prototype.restoreProperty=function(d,c){switch(d){case"subviews":for(var a=0,b=c.length;a<b;a++){this.addSubview(c[a])}break;default:this.callSuper(d,c)}};iAd.View.prototype.setNavigable=function(b){if(this._navigable==b){return}this._navigable=b;var a=(b?"add":"remove");var c=this.layer;c.toggleClassName(iAd.SpatialNavigationManager.NAVIGABLE_CSS_CLASS,b);if(this.layerIsInDocument){iAd.SpatialNavigationManager.sharedManager[a+"NavigableElement"](c)}var d=a+"EventListener";c[d].call(c,iAd.SpatialNavigationManager.ACTIVATE_EVENT,this,false);c[d].call(c,iAd.SpatialNavigationManager.FOCUS_IN_EVENT,this,false);c[d].call(c,iAd.SpatialNavigationManager.FOCUS_OUT_EVENT,this,false)};iAd.View.prototype.setFocused=function(c){if(c==this._focused){return}this._focused=c;var b=this.layer;b.toggleClassName(iAd.View.FOCUSED_CSS_CLASS,c);if(!c){var a=iAd.SpatialNavigationManager.sharedManager;if(a.focusedElement===b){a.focusElement(null)}}this.createAndDispatchEvent(c?iAd.View.FOCUS_IN_EVENT:iAd.View.FOCUS_OUT_EVENT)};iAd.View.getViewById=function(b){var a=document.getElementById(b);return(a&&a._view!=undefined)?a._view:null};iAd.View.registeredHTMLViewLoadingClasses={};iAd.View.registerClassForHTMLViewLoading=function(a){iAd.View.registeredHTMLViewLoadingClasses[a.cssClassName]=a};iAd.View.viewClassForLayer=function(d){var f=this.registeredHTMLViewLoadingClasses;var c=d.className.trim().split(/\s+/);for(var b=0,e=c.length;b<e;b++){var a=f.hasOwnProperty(c[b])?f[c[b]]:null;if(a){return a}}return null};iAd.View.viewForLayer=function(b){var a=iAd.View.viewClassForLayer(b)||iAd.View;return new a(b)};iAd.View.viewsForClassAndNode=function(f,a){var e=[];if(!f.hasOwnProperty("cssClassName")){return e}var d=a.querySelectorAll("."+f.cssClassName);for(var b=0,c=d.length;b<c;b++){e.push(d[b]._view)}return e};iAd.View.nearestViewForElement=function(a){while(a._view==undefined&&a.parentNode){a=a.parentNode}return(a._view==undefined)?null:a._view};iAd.Utils.setupDisplayNames(Node,"Node");iAd.View.initialize=function(){var g=this;if(this.hasOwnProperty("cssClassName")){Object.defineProperty(this,"views",{get:function(){return iAd.View.viewsForClassAndNode(g,document)}});iAd.View.registerClassForHTMLViewLoading(this);if(g.hasOwnProperty("collectionAccessor")){if(Object.getOwnPropertyDescriptor(iAd.View.prototype,this.collectionAccessor)){iAd.Console.warn("The class "+this._name+' has a .collectionAccessor "'+this.collectionAccessor+'" in conflict with another iAd.View subclass, this collection accessor will be ignored.')}else{Object.defineProperty(iAd.View.prototype,this.collectionAccessor,{get:function(){return this.descendantViewsOfClass(g)}})}}}if(!this.hasOwnProperty("synthesizedEventMap")){this.synthesizedEventMap={}}var e=this;while(e){if(e.hasOwnProperty("synthesizedEvents")){var d=e.synthesizedEvents;for(var b=0,c=d.length;b<c;b++){var f=d[b],a=iAd.View.EVENT_ATTRIBUTE_PREFIX+f.toLowerCase();this.synthesizedEventMap[a]=f}}e=e.superclass}};