
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAP.MediaAction",superclass:iAd.ScriptAction,synthesizedProperties:["url","methodName"]});iAP.MediaAction.prototype.init=function(){this.callSuper.apply(this,arguments);this.analyticsDetails={file:this.getFilename}};iAP.MediaAction.prototype.reset=function(){this.media&&this.media.stop()};iAP.MediaAction.prototype.mediaPlaybackDidStart=function(a){iAd.Analytics.logEvent(iAd.Media.PLAYBACK_DID_START,this)};iAP.MediaAction.prototype.mediaPlaybackDidPause=function(a){iAd.Analytics.logEvent(iAd.Media.PLAYBACK_DID_PAUSE,this)};iAP.MediaAction.prototype.mediaPlaybackDidEnd=function(a){iAd.Analytics.logEvent(iAd.Media.PLAYBACK_DID_END,this)};iAP.MediaAction.prototype.mediaPlaybackDidBeginWaiting=function(a){iAd.Analytics.logEvent(iAd.Media.PLAYBACK_DID_BEGIN_WAITING,this)};iAP.MediaAction.prototype.mediaPlaybackDidEndWaiting=function(a){iAd.Analytics.logEvent(iAd.Media.PLAYBACK_DID_END_WAITING,this)};iAP.MediaAction.prototype.mediaDidUpdateTime=function(b,a){iAd.Analytics.logEvent(iAd.Media.DID_UPDATE_TIME,this)};iAP.MediaAction.prototype.getFilename=function(){return this.media?this.media.getFilename():""};iAP.MediaAction.prototype.summaryText=function(){if(this.url){return iAd.Path.lastPathComponent(this.url)}else{return"None"}};