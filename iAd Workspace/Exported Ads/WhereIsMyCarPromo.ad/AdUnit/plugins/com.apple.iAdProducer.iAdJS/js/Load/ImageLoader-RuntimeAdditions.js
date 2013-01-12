
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

(function(){iAd.Class.processMethod(iAd.ImageLoader,"init");var a=iAd.ImageLoader.prototype.init;iAd.ImageLoader.prototype.init=function(c,b){a.apply(this,arguments);this.hasHiDPIVersion=b&&!iAd.Utils.urlHasValidProtocol(c)}})();