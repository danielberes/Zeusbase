
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.MapRegion"});iAd.MapRegion.prototype.init=function(d,c,a,b){this.callSuper();this.latitude=d;this.longitude=c;this.latitudeDelta=a;this.longitudeDelta=b};iAd.MapRegion.prototype.equals=function(a){return(!!a&&this.latitude==a.latitude&&this.longitude==a.longitude&&this.latitudeDelta==a.latitudeDelta&&this.longitudeDelta==a.longitudeDelta)};iAd.MapRegion.prototype.copy=function(){return new iAd.MapRegion(this.latitude,this.longitude,this.latitudeDelta,this.longitudeDelta)};iAd.MapRegion.fromCoordinates=function(k){var h=k.length,j=h==1?0.08:1.25,l=90,c=-90,f=360,g=-360,i,a,b,e,m,d;while(h--){m=k[h].latitude;d=k[h].longitude;l=Math.min(l,m);c=Math.max(c,m);f=Math.min(f,d);g=Math.max(g,d)}i=l+((c-l)/2);a=f+((g-f)/2);if(k.length>1){b=(c-l)*1.25;e=(g-f)*1.25}else{b=e=0.08}return new iAd.MapRegion(i,a,b,e)};