
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Media.resolveMediaClass=function(a){return this._adapterByClassType[a.displayName]||a};iAd.Media._adapterByClassType=[];iAd.Media.registerMediaAdapter=function(d,e){var c=d.displayName;if(!iAd.Device.iOS_VERSION){if(window.iTunes&&e.context=="iTunes"){this._adapterByClassType[c]=e;return true}else{return false}}var a=e.iOSVersion;if(!a||iAd.Device.iOSVersionLessThan(a)){return false}var b=this._adapterByClassType[c];if(!b||iAd.Device.compareiOSVersions(a,b.iOSVersion)>=0){this._adapterByClassType[c]=e;return true}return false};