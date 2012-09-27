
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.VideoLoader",superclass:iAd.Loader});iAd.VideoLoader.DEFAULT_TIMEOUT=5;iAd.VideoLoader.prototype.startLoad=function(){this.video=iAd.Video.videoForURL(this._url);this.video.delegate=this;if(this.video.loadReady){this.notifyLoaderDidComplete()}else{this.video.load()}};iAd.VideoLoader.prototype.notifyLoaderDidComplete=function(){this.callSuper();iAd.Media.preloadedMedia=this.video};iAd.VideoLoader.prototype.getSupportingObject=function(){return this.video};iAd.VideoLoader.prototype.getResolvedURL=function(){return this.video.resolvedURL};iAd.VideoLoader.prototype.mediaLoadIsReady=function(a){this.notifyLoaderDidComplete()};iAd.VideoLoader.prototype.mediaLoadDidFail=function(b,a){this.notifyLoaderDidFail(iAd.Loader.LOAD_ERROR)};