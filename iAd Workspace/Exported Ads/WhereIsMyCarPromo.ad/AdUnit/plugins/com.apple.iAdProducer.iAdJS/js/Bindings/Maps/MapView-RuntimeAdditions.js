
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.MapView.DID_RECEIVE_RESPONSE_DATA_EVENT="mapViewDidReceiveResponseData";iAd.MapView.DID_RECEIVE_DATA_FAILURE_EVENT="mapViewDidReceiveDataFailure";iAd.Class.synthesizeProperty(iAd.MapView.prototype,"pinImage");iAd.Class.synthesizeProperty(iAd.MapView.prototype,"pinOffsetX");iAd.Class.synthesizeProperty(iAd.MapView.prototype,"pinOffsetY");iAd.Class.synthesizeProperty(iAd.MapView.prototype,"searchRadius");iAd.Class.synthesizeProperty(iAd.MapView.prototype,"siteId");iAd.Class.synthesizeProperty(iAd.MapView.prototype,"reloadAnnotationsOnUserLocationUpdate");iAd.Class.synthesizeProperty(iAd.MapView.prototype,"distanceFilter");iAd.Class.synthesizeProperty(iAd.MapView.prototype,"pinLeftCalloutVisible");iAd.Class.synthesizeProperty(iAd.MapView.prototype,"pinRightCalloutVisible");(function(){iAd.Class.processMethod(iAd.MapView,"init");var b=iAd.MapView.prototype.init;iAd.MapView.prototype.init=function(){this._pinImage=null;this._pinOffsetX=null;this._pinOffsetY=null;this._pinLeftCalloutVisible=false;this._pinRightCalloutVisible=false;this._searchRadius=null;this._siteId=null;this._reloadAnnotationsOnUserLocationUpdate=true;this._distanceFilter=1000;b.apply(this,arguments);if(!window.editorProxy&&!iAd.MapView.MAPS_PLUGIN_PRESENT){alert("Maps can only be displayed inside an AdSheet.")}};iAd.Class.processMethod(iAd.MapView,"initMapObject");var a=iAd.MapView.prototype.initMapObject;iAd.MapView.prototype.initMapObject=function(){if(iAd.MapView.MAPS_PLUGIN_PRESENT){a.apply(this,arguments)}else{this.mapObject=new iAd.MapView.MapPluginShim()}}})();iAd.MapView.prototype.setValueForAttribute=function(b,a){switch(a){case"ad-pin-image":this.pinImage=iAd.Image.imageForURL(b,this.layerHasCustomAttribute("ad-has-hidpi-version")&&!iAd.Utils.urlHasValidProtocol(b));break;default:this.callSuper(b,a)}};iAd.MapView.prototype.setPinImage=function(a){if(iAd.Image.isEqual(this._pinImage,a)){return}this._pinImage=a};iAd.MapView.prototype.setPinOffsetX=function(a){if(!a){return}this._pinOffsetX=a};iAd.MapView.prototype.setPinOffsetY=function(a){if(!a){return}this._pinOffsetY=a};iAd.MapView.prototype.setSearchRadius=function(a){this._searchRadius=parseInt(a,10)};iAd.MapView.prototype.setSiteId=function(a){return this._siteId=a};iAd.MapView.prototype.loadAnnotations=function(a){if(a==null){return}var b=new iAP.MapViewDataSource({format:"json",siteId:this.siteId,radius:this.searchRadius,location:a,delegate:this});b.send()};iAd.MapView.prototype.loadAnnotationsByZipCode=function(a){this.loadAnnotations(a)};iAd.MapView.prototype.loadAnnotationsAtUserLocation=function(){this.loadAnnotations(this.userLocation)};iAd.MapView.prototype.loadAnnotationsAtCurrentLocation=function(){this.loadAnnotations([this.latitude,this.longitude])};iAd.MapView.prototype.mapViewDidReceiveResponseData=function(a){if(a.success){var c=a.annotations;if(c.length==0){this.createAndDispatchEvent(iAd.MapView.DID_RECEIVE_DATA_FAILURE_EVENT,[["response",a],["error","No locations are found."]])}else{this.createAndDispatchEvent(iAd.MapView.DID_RECEIVE_RESPONSE_DATA_EVENT,[["annotations",c]])}}else{var b=a.error;this.mapViewDidReceiveDataFailure(a.object,b)}};iAd.MapView.prototype.mapViewDidReceiveDataFailure=function(a,b){var c=[["response",a]];if(b){c.push(["error",b])}this.createAndDispatchEvent(iAd.MapView.DID_RECEIVE_DATA_FAILURE_EVENT,c)};(function(){iAd.MapView.haversin=function(b){return Math.pow(Math.sin(b/2),2)};iAd.MapView.distanceBetweenLatLonPairs=function(i,n){var f=iAd.Number.degreesToRadians(i.latitude);var k=iAd.Number.degreesToRadians(i.longitude);var e=iAd.Number.degreesToRadians(n.latitude);var j=iAd.Number.degreesToRadians(n.longitude);var c=e-f;var m=j-k;var b=6371000;var g=this.haversin(c)+Math.cos(f)*Math.cos(e)*this.haversin(m);var l=(2*b)*Math.asin(Math.sqrt(g));return l};iAd.Class.processMethod(iAd.MapView,"mapDidUpdateUserLocation");var a=iAd.MapView.prototype.mapDidUpdateUserLocation;iAd.MapView.prototype.mapDidUpdateUserLocation=function(b){if(b&&this._userLocation&&b.latitude==this.userLocation.latitude&&b.longitude==this.userLocation.longitude){return}if(this._userLocation&&iAd.MapView.distanceBetweenLatLonPairs(this.userLocation,b)<this.distanceFilter){return}a.apply(this,arguments);if(this._reloadAnnotationsOnUserLocationUpdate||this.annotations.length==0){this.callMethodNameAfterDelay("loadAnnotationsAtUserLocation",0.5)}}})();iAd.Class({name:"iAP.MapViewDataSource"});iAP.MapViewDataSource.TIMEOUT_MS_VALUES={};if(window.ADNetworkTypeListener){iAP.MapViewDataSource.TIMEOUT_MS_VALUES[ADNetworkTypeListener.kADNetworkTypeListenerNetworkTypeUnknown]=15*1000;iAP.MapViewDataSource.TIMEOUT_MS_VALUES[ADNetworkTypeListener.kADNetworkTypeListenerNetworkTypeGPRS]=12*1000;iAP.MapViewDataSource.TIMEOUT_MS_VALUES[ADNetworkTypeListener.kADNetworkTypeListenerNetworkTypeEDGE]=10*1000;iAP.MapViewDataSource.TIMEOUT_MS_VALUES[ADNetworkTypeListener.kADNetworkTypeListenerNetworkType3G]=8*1000;iAP.MapViewDataSource.TIMEOUT_MS_VALUES[ADNetworkTypeListener.kADNetworkTypeListenerNetworkTypeWiFi]=5*1000}iAP.MapViewDataSource.parse=function(d){var f=d&&d.responseXML;var g=d&&d.responseText;var h=function(i,j){if(!j){j={}}Array.prototype.forEach.call(i.childNodes,function(k){if(k.childNodes.length>0){if(k.childNodes.length===1){j[k.nodeName]=k.childNodes[0].nodeValue}else{h(k,j[k.nodeName]={})}}});return j};var a=[];if(f){var b=f.getElementsByTagName("StoreLocations")[0];var c=b&&b.childNodes;a=Array.prototype.map.call(c||[],function(i){return h(i,{})})}else{try{a=JSON.parse(g)}catch(e){iAd.Console.error("Locator - "+e)}if(!iAd.Utils.objectIsArray(a)){a=[]}}return a};iAP.MapViewDataSource.prototype.TIMEOUT_MS=iAP.MapViewDataSource.TIMEOUT_MS_VALUES[window.ad&&window.ad.networkType]||15*1000;iAP.MapViewDataSource.prototype.MAX_ATTEMPTS=3;iAP.MapViewDataSource.prototype.PROXY_REQUEST_URL="http://iadfeed.qwapi.com/feedserverUtils/psFeedHandler.jsp";iAP.MapViewDataSource.prototype.init=function(a){if(!a){a={}}if(!a.siteId){iAd.Console.warn("siteId is required");return}if(!a.delegate){iAd.Console.warn("delegate is required");return}this.attempts=0;this.delegate=a.delegate;this.url=this.createProxyURL(a);this.setupXHR(a.headers)};iAP.MapViewDataSource.prototype.createProxyURL=function(g){if(!g){g={}}var b="getStoreLocations";var f="getStoreLocationsByZip";var a=g.location;var e={id:iAd.Utils.unique("id","iAP.MapViewDataSource"),"class":g["class"]||"com.qwapi.feeds.mongo.StoreLocator",radius:g.radius||25,max:g.max||15};e.sid=g.siteId.toLowerCase();e.format=(g.format&&g.format.match(/json/))?"json":"xml";if(a){if(typeof a==="object"&&a.hasOwnProperty("latitude")){e.method=g.method||b;e.lat=a.latitude;e.lon=a.longitude}else{if(iAd.Utils.objectIsArray(a)){e.method=g.method||b;e.lat=a[0];e.lon=a[1]}else{if(isFinite(a)||iAd.Utils.objectIsString(a)){e.method=g.method||f;e.zip=a}}}}var d=[];for(var c in e){d.push([encodeURIComponent(c)+"="+encodeURIComponent(e[c])])}var h=d.length?"?"+d.join("&"):"";return this.PROXY_REQUEST_URL+h};iAP.MapViewDataSource.prototype.setupXHR=function(c){var b=new XMLHttpRequest();if(!this.url){iAd.Console.error("A URL is required");return}else{if(!b){iAd.Console.error("Could not create XHR object");return}}b.open("GET",this.url,true);b.setRequestHeader("Content-Type","application/x-www-form-urlencoded");if(c){for(var d in c){b.setRequestHeader(d,c[d])}}var a=this;b.onreadystatechange=function(){if(this.readyState===4){if(this.status){clearTimeout(a.timeout);a.delegate.mapViewDidReceiveResponseData({success:this.status===200,annotations:a.createAnnotations(b),object:b})}}};this.xhr=b};iAP.MapViewDataSource.prototype.retry=function(){clearTimeout(this.timeout);this.xhr.abort.call(this.xhr,null);this.xhr.open.call(this.xhr,"GET",this.url,true);this.send()};iAP.MapViewDataSource.prototype.send=function(){clearTimeout(this.timeout);this.timeout=setTimeout(function(a){a.handleTimeout()},this.TIMEOUT_MS,this);++this._attempts;this.xhr.send.call(this.xhr,null)};iAP.MapViewDataSource.prototype.handleTimeout=function(){if(this._attempts<this.MAX_ATTEMPTS){this.retry()}else{var a="Connection timed out. Maximum number ("+this.MAX_ATTEMPTS+") of connections attempted.";this.delegate.mapViewDidReceiveResponseData({success:(this.xhr.readyState===this.xhr.DONE&&this.xhr.status===200),object:this.xhr,error:new Error(a)})}};iAP.MapViewDataSource.prototype.createAnnotations=function(a){var f=0;var e=document.location.toString().replace(/(?:[^\/]+)$/,"");var d=this.delegate;var c=null;if(d.pinImage){var b=d.pinImage.resolvedURL;if(iAd.Utils.urlHasValidProtocol(b)){c=decodeURIComponent(b)}else{c=e+decodeURIComponent(d.pinImage.resolvedURL)}}return iAP.MapViewDataSource.parse(a).map(function(j){var h;if(!j.address){h=[];if(j.street&&j.street.length){h.push(j.street)}if(j.city&&j.city.length){var i=j.city;if(j.state&&j.state.length){i+=", "+j.state;if(j.zip&&j.zip.length){i+=" "+j.zip}}h.push(i)}h=h.join("\n")}else{h=j.address}var g=new iAd.MapAnnotation({coordinate:new iAd.MapCoordinate(j.latitude||j.loc.latitude,j.longitude||j.loc.longitude),id:(j.identifier||j.id)||"randomId"+(f+=1),title:j.title||j.name||"",subtitle:j.subtitle||"",imageURL:c,xOffset:parseInt(j.xOffset||d.pinOffsetX,10)||0,yOffset:parseInt(j.yOffset||d.pinOffsetY,10)||0,hasLeftCalloutButton:d.pinLeftCalloutVisible,hasRightCalloutButton:d.pinRightCalloutVisible});g.image=j.image_url&&iAd.Image.imageForURL(j.image_url)||null;g.address=h;g.street=j.street||null;g.city=j.city||null;g.state=j.state||null;g.zip=j.zip||null;g.country=j.country||null;g.area_code=j.area_code||null;g.phone=j.phone||null;g.url=j.url||null;return g})};