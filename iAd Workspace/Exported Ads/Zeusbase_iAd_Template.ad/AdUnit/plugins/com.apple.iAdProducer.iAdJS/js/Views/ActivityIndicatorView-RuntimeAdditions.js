
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

(function(){iAd.Class.processMethod(iAd.ActivityIndicatorView,"setSize");var a=iAd.ActivityIndicatorView.prototype.setSize;iAd.ActivityIndicatorView.prototype.setSize=function(b){var c=Math.min(b.width,b.height);a.call(this,new iAd.Size(c,c))}})();