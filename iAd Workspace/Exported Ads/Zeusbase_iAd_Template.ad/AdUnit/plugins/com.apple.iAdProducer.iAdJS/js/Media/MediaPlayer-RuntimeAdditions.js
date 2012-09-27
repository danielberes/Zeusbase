
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.MediaPlayer.prototype.getFilename=function(a){return this.media?this.media.getFilename():""};(function(){iAd.Class.processMethod(iAd.MediaPlayer,"init");var a=iAd.MediaPlayer.prototype.init;iAd.MediaPlayer.prototype.init=function(){a.apply(this,arguments);this.analyticsDetails={file:this.getFilename}}})();