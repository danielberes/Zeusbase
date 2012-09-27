
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAP.AudioAction",superclass:iAP.MediaAction});iAP.AudioAction.prototype.start=function(){if(this.url){var a=this.media=iAd.Audio.audioForURL(this.url);a.delegate=this;a.play()}else{this.end()}};iAP.AudioAction.prototype.mediaPlaybackDidEnd=function(a){this.callSuper(a);this.end()};