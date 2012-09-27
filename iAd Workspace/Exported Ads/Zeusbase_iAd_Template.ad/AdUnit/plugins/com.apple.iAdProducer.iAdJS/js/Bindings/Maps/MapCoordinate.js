
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.MapCoordinate"});iAd.MapCoordinate.prototype.init=function(b,a){this.callSuper();this.latitude=b;this.longitude=a};iAd.MapCoordinate.prototype.equals=function(a){return(!!a&&this.latitude==a.latitude&&this.longitude==a.longitude)};iAd.MapCoordinate.prototype.copy=function(){return new iAd.MapCoordinate(this.latitude,this.longitude)};