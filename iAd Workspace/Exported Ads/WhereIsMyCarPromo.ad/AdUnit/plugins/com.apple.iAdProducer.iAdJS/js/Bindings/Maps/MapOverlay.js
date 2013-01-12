
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.MapOverlay",synthesizedProperties:["identifier"]});iAd.MapOverlay.prototype.init=function(a){this.callSuper();iAd.Utils.copyPropertiesFromSourceToTarget(a,this)};iAd.MapOverlay.prototype.getIdentifier=function(){return this.id};iAd.MapOverlay.prototype.setIdentifier=function(a){iAd.Console.warn("iAd.MapOverlay's .identifier property is read-only. Please use the .id property instead.")};iAd.MapOverlay.LINE_CAP_ROUND="round";iAd.MapOverlay.LINE_CAP_SQUARE="square";iAd.MapOverlay.LINE_CAP_BUTT="butt";iAd.MapOverlay.LINE_JOIN_ROUND="round";iAd.MapOverlay.LINE_JOIN_MITER="miter";iAd.MapOverlay.LINE_JOIN_BEVEL="bevel";