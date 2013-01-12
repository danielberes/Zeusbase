
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.ActivityIndicatorView",superclass:iAd.View,synthesizedProperties:["activityIndicatorViewStyle","hidesWhenStopped","animating","animationStyle","customIndicatorImage","autoSized"],archivedProperties:["activityIndicatorViewStyle","hidesWhenStopped","animating","animationStyle","customIndicatorImage","autoSized"],cssClassName:"ad-activity-indicator-view"});iAd.ActivityIndicatorView.collectionAccessor="activityIndicatorViews";iAd.ActivityIndicatorView.STYLE_WHITE="ad-white";iAd.ActivityIndicatorView.STYLE_GRAY="ad-gray";iAd.ActivityIndicatorView.STYLE_CUSTOM="ad-custom";iAd.ActivityIndicatorView.ANIMATING_CSS="ad-animating";iAd.ActivityIndicatorView.SEGMENTS_CONTAINER_CSS="ad-segments-container";iAd.ActivityIndicatorView.ANIMATION_STYLE_STEPPED="ad-animation-stepped";iAd.ActivityIndicatorView.ANIMATION_STYLE_SMOOTH="ad-animation-smooth";iAd.ActivityIndicatorView.NUMBER_OF_SEGMENTS=12;iAd.ActivityIndicatorView.OPTIMAL_DIMENSION=74;iAd.ActivityIndicatorView.prototype.init=function(b,a){this._activityIndicatorViewStyle=a||iAd.ActivityIndicatorView.STYLE_WHITE;this._hidesWhenStopped=true;this._autoSized=true;this.segmentsContainer=null;this._animating=false;this._animationStyle="";this.segments=[];this.callSuper(b);this.updateVisibility();this.animationStyle=this._animationStyle||iAd.ActivityIndicatorView.ANIMATION_STYLE_STEPPED;this.updateSegments()};iAd.ActivityIndicatorView.prototype.setupLayer=function(){this.callSuper();if(this.layer.hasClassName(iAd.ActivityIndicatorView.STYLE_WHITE)){this._activityIndicatorViewStyle=iAd.ActivityIndicatorView.STYLE_WHITE}else{if(this.layer.hasClassName(iAd.ActivityIndicatorView.STYLE_GRAY)){this._activityIndicatorViewStyle=iAd.ActivityIndicatorView.STYLE_GRAY}else{if(this.layer.hasClassName(iAd.ActivityIndicatorView.STYLE_CUSTOM)){this._activityIndicatorViewStyle=iAd.ActivityIndicatorView.STYLE_CUSTOM}}}};iAd.ActivityIndicatorView.prototype.layerWasCreated=function(){this.callSuper();this.activityIndicatorViewStyle=this._activityIndicatorViewStyle;this.scaleContainer=document.createElement("div");this.scaleContainer.className="ad-scale-container";this.segmentsContainer=document.createElement("div");this.segmentsContainer.className=iAd.ActivityIndicatorView.SEGMENTS_CONTAINER_CSS;this.scaleContainer.appendChild(this.segmentsContainer);if(this._size.equals(iAd.Size.ZERO_SIZE)){this._size=new iAd.Size(37,37)}if(this._activityIndicatorViewStyle!==iAd.ActivityIndicatorView.STYLE_CUSTOM){this.createSegments()}this.layer.appendChild(this.scaleContainer)};iAd.ActivityIndicatorView.prototype.setSize=function(a){if(a.width!=a.height){a.width=a.height}this.callSuper(a);this.updateSegments()};iAd.ActivityIndicatorView.prototype.setValueForAttribute=function(b,a){switch(a){case"ad-custom-indicator-image":this.customIndicatorImage=iAd.Image.imageForURL(b,this.layerHasCustomAttribute("ad-has-hidpi-version"));break;default:this.callSuper(b,a)}};iAd.ActivityIndicatorView.prototype.setHidesWhenStopped=function(a){this._hidesWhenStopped=a;this.updateVisibility()};iAd.ActivityIndicatorView.prototype.setActivityIndicatorViewStyle=function(a){if(this.layer){this.layer.removeClassName(this._activityIndicatorViewStyle);this.layer.addClassName(a)}this._activityIndicatorViewStyle=a};iAd.ActivityIndicatorView.prototype.setAnimating=function(a){if(this._animating==a){return}this._animating=a;this.layer.toggleClassName(iAd.ActivityIndicatorView.ANIMATING_CSS,a);this.updateVisibility()};iAd.ActivityIndicatorView.prototype.setAnimationStyle=function(a){if(a==this._animationStyle){return}this.layer.removeClassName(this._animationStyle);this.layer.addClassName(a);this._animationStyle=a};iAd.ActivityIndicatorView.prototype.setCustomIndicatorImage=function(a){if(a==null||a.url==null){this._customIndicatorImage=null;this.layer.removeClassName(iAd.ActivityIndicatorView.STYLE_CUSTOM);this.segmentsContainer.style.backgroundImage="";if(!this.segments.length){this.createSegments()}this.updateSegments();return}this._customIndicatorImage=a;if(a.loaded){this.renderImage()}else{a.addPropertyObserver("loaded",this)}};iAd.ActivityIndicatorView.prototype.setAutoSized=function(a){if(a==this._autoSized){return}this._autoSized=a;if(a){this.autoSize()}};iAd.ActivityIndicatorView.prototype.handlePropertyChange=function(b,a){if(a=="loaded"){this.renderImage();this.removePropertyObserver("loaded",this)}};iAd.ActivityIndicatorView.prototype.renderImage=function(){if(this._autoSized){this.autoSize()}this.layer.addClassName(iAd.ActivityIndicatorView.STYLE_CUSTOM);this.segmentsContainer.style.backgroundImage="url("+this._customIndicatorImage.resolvedURL+")";this.segmentsContainer.style.webkitTransformOrigin="";this.scaleContainer.style.webkitTransform="scale(1)"};iAd.ActivityIndicatorView.prototype.autoSize=function(){if(this._customIndicatorImage&&this._customIndicatorImage.loaded){this.size=new iAd.Size(this._customIndicatorImage.width,this._customIndicatorImage.height)}};iAd.ActivityIndicatorView.prototype.updateVisibility=function(){this.hidden=(this._hidesWhenStopped&&!this._animating)};iAd.ActivityIndicatorView.prototype.createSegments=function(){var c=[];var b=iAd.ActivityIndicatorView.NUMBER_OF_SEGMENTS;var a=this.segmentsContainer;while(b--){var d=document.createElement("div");d.style.opacity=Math.max(1-b/10,0.3);a.appendChild(d);c.push(d)}this.segments=c};iAd.ActivityIndicatorView.prototype.updateSegments=function(){if(!this.segments.length||this.layer.hasClassName(iAd.ActivityIndicatorView.STYLE_CUSTOM)){return}var d=this._size.width/iAd.ActivityIndicatorView.OPTIMAL_DIMENSION,l=d<1?iAd.ActivityIndicatorView.OPTIMAL_DIMENSION:this._size.width,m=Math.floor(l/2),h=l/74,b=Math.floor(3*h)*2,k=Math.floor(10*h)*2,c=Math.floor((l-b)/2),j=Math.floor((l-k)/2),e=Math.floor(3*h),a=this.segments.length;angle_increment=360/a;var g;for(var f=0;f<a;f++){g=this.segments[f];g.style.left=c+"px";g.style.top=j+"px";g.style.width=b+"px";g.style.height=k+"px";g.style.webkitBorderRadius=e+"px";g.style.webkitTransform="rotate("+angle_increment*f+"deg) translateY(-"+j+"px)"}this.segmentsContainer.style.webkitTransformOrigin=m+"px "+m+"px";this.scaleContainer.style.webkitTransform=d<1?"scale("+d+")":""};