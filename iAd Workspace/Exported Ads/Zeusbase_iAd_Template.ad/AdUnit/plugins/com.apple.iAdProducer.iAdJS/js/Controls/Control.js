
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.Control",superclass:iAd.View,synthesizedProperties:["state","enabled","selected","highlighted"],archivedProperties:["highlighted","enabled","selected","tag"],cssClassName:"ad-control",collectionAccessor:"controls"});iAd.Control.UNHIGHLIGHT_DELAY=0.1;iAd.Control.prototype.init=function(a){this.tag=0;this._enabled=true;this._selected=false;this._highlighted=false;this.callSuper(a);this.layer._control=this;this.userInteractionEnabled=this._enabled;this.navigable=true};iAd.Control.VALUE_CHANGE_EVENT="controlValueChange";iAd.Control.STATE_NORMAL=0;iAd.Control.STATE_NORMAL_CSS="ad-normal";iAd.Control.STATE_HIGHLIGHTED=1<<0;iAd.Control.STATE_HIGHLIGHTED_CSS="ad-highlighted";iAd.Control.STATE_DISABLED=1<<1;iAd.Control.STATE_DISABLED_CSS="ad-disabled";iAd.Control.STATE_SELECTED=1<<2;iAd.Control.STATE_SELECTED_CSS="ad-selected";iAd.Control.synthesizedEvents=[iAd.Control.VALUE_CHANGE_EVENT];iAd.Control.prototype.getState=function(){return(iAd.Control.STATE_NORMAL|(this._highlighted?iAd.Control.STATE_HIGHLIGHTED:0)|(this._enabled?0:iAd.Control.STATE_DISABLED)|(this._selected?iAd.Control.STATE_SELECTED:0))};iAd.Control.prototype.setEnabled=function(a){if(a==this._enabled){return}var b=this.layer;b.toggleClassName(iAd.Control.STATE_DISABLED_CSS,!a);b.setAttribute("aria-disabled",a?"false":"true");this._enabled=a;this.userInteractionEnabled=a;this.notifyPropertyChange("state")};iAd.Control.prototype.setSelected=function(a){if(a==this._selected){return}this.layer.toggleClassName(iAd.Control.STATE_SELECTED_CSS,a);this._selected=a;this.notifyPropertyChange("state")};iAd.Control.prototype.setHighlighted=function(a){if(this._snmHighlightedTimer){clearTimeout(this._snmHighlightedTimer)}if(a==this._highlighted){return}this.layer.toggleClassName(iAd.Control.STATE_HIGHLIGHTED_CSS,a);this._highlighted=a;this.notifyPropertyChange("state")};iAd.Control.prototype.handleSNMActivate=function(a){this.highlighted=true;this._snmHighlightedTimer=this.callMethodNameAfterDelay("setHighlighted",iAd.Control.UNHIGHLIGHT_DELAY,false);this.callSuper(a)};iAd.Control.prototype.touchesBegan=function(a){if(!this._enabled){return}this.callSuper(a);this.highlighted=true};iAd.Control.prototype.touchesMoved=function(b){var a=this.touchInside;this.callSuper(b);if(a!=this.touchInside){this.highlighted=this.touchInside}};iAd.Control.prototype.touchesEnded=function(a){this.callSuper(a);this.highlighted=false};iAd.Control.prototype.touchesCancelled=function(a){this.callSuper(a);this.highlighted=false};iAd.Control.isNodeInControlHierarchyBoundedByElement=function(b,a){while(b.parentNode){if(b.hasOwnProperty("_view")&&b._view instanceof iAd.Control){return true}if(b===a){return false}b=b.parentNode}return false};