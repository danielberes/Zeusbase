
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.Audio",superclass:iAd.Media});iAd.Audio.prototype.getElement=function(){if(!this._element){this._element=document.createElement("audio")}return this.callSuper()};iAd.Audio.prototype.play=function(){if(iAd.Audio.playEnabled){return this.callSuper()}return false};iAd.Audio.updatePlayEnabled=function(){if(this._playEnabled){return}var c,d=iAd.Media.activeMedia;for(var a=0,b=d.length;a<b;a++){c=d[a];if(c instanceof iAd.Audio&&c.playbackState==iAd.Media.PLAYBACK_STATE_PLAYING){c.pause()}}};Object.defineProperty(iAd.Audio,"playEnabled",{get:function(){return iAd.Audio._playEnabled},set:function(a){if(iAd.Audio._playEnabled==a){return}iAd.Audio._playEnabled=a;iAd.Audio.updatePlayEnabled()}});iAd.Audio.playEnabled=true;iAd.Audio.audioForURL=function(a){return iAd.Media.mediaTypeForURL(iAd.Audio,a)};iAd.Audio.restoreFromArchive=function(a){return this.audioForURL(a.url)};iAd.Audio.prototype.urlStrategy=function(a){return iAd.Audio.urlStrategy?iAd.Audio.urlStrategy(a):this.callSuper(a)};iAd.Audio.prototype.loadReadyStrategy=function(b,a){return iAd.Audio.loadReadyStrategy?iAd.Audio.loadReadyStrategy(b,a):this.callSuper(b,a)};iAd.Audio.loadReadyStrategy=null;iAd.Audio.urlStrategy=null;