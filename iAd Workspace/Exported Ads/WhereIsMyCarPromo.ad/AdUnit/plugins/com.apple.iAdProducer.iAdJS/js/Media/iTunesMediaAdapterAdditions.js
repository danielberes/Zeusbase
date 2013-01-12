
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.Video_iTunes",superclass:iAd.Video,context:"iTunes"});iAd.Video_iTunes.ITUNES_MEDIA_EVENTS=["play","playing","timeupdate","pause","ended","error"];iAd.Video_iTunes.prototype.setPlaysInline=function(a){if(this._playsInline!=a&&this._playbackState==iAd.Media.PLAYBACK_STATE_PLAYING){iAd.Console.warn("iAd.Video: Cannot change the .playsInline property in iTunes while the video is playing.");return this._playsInline}if(this._playsInline!=a){this.unload();if(!a){this.loop=false}this.callSuper(a)}};iAd.Video_iTunes.prototype.setLoop=function(a){if(!this.playsInline&&a){iAd.Console.warn("iAd.Video: Cannot set the .loop property to true in iTunes when playsInline is false.");return}this.callSuper(a)};iAd.Video_iTunes.prototype.getCanPlay=function(){if(this.playsInline){return this.callSuper()}return true};iAd.Video_iTunes.prototype.getCanPlayThrough=function(){if(this.playsInline){return this.callSuper()}return true};iAd.Video_iTunes.prototype.getRenderable=function(){if(this.playsInline){return this.callSuper()}return true};iAd.Video_iTunes.prototype.getSeeking=function(){if(this.playsInline){return this.callSuper()}iAd.Console.warn("iAd.Video: Cannot access .seeking property in iTunes when playsInline is false.");return false};iAd.Video_iTunes.prototype.getDuration=function(){if(this.playsInline){return this.callSuper()}return NaN};iAd.Video_iTunes.prototype.closestBufferedIndex=function(){if(this.playsInline){return this.callSuper()}return -1};iAd.Video_iTunes.prototype.getPercentLoaded=function(){if(this.playsInline){return this.callSuper()}return 1};iAd.Video_iTunes.prototype.playElement=function(){if(this.playsInline){return this.callSuper()}this._targetPlaybackState=iAd.Media.PLAYBACK_STATE_PLAYING;this.addMediaEventListeners();window.iTunes.play(this.resolvedURL)};iAd.Video_iTunes.prototype.pause=function(){if(this.playsInline){return this.callSuper()}iAd.Console.warn("iAd.Video: Cannot pause() in iTunes when playsInline is false.");return false};iAd.Video_iTunes.prototype.stop=function(){if(this.playsInline){return this.callSuper()}return !(this._playbackState==iAd.Media.PLAYBACK_STATE_PAUSED&&this.time==0)};iAd.Video_iTunes.prototype.canSeekToTime=function(a){if(this.playsInline){return this.callSuper(a)}return false};iAd.Video_iTunes.prototype.seekToTime=function(){if(this.playsInline){return this.callSuper()}iAd.Console.warn("iAd.Video: Cannot seekToTime() in iTunes when playsInline is false.");return false};iAd.Video_iTunes.prototype.load=function(){if(this.playsInline){return this.callSuper()}this.dispatchMediaNotification(iAd.Media.LOAD_WILL_START);this.dispatchMediaNotification(iAd.Media.LOAD_DID_START);this.dispatchMediaNotification(iAd.Media.LOAD_DID_PROGRESS,[["percentLoaded",this.percentLoaded]]);this.dispatchMediaNotification(iAd.Media.LOAD_DATA_AVAILABLE);this.dispatchMediaNotification(iAd.Media.LOAD_CAN_PLAY);this._loadReady=true;this.dispatchMediaNotification(iAd.Media.LOAD_IS_READY);this.enterLoadState(iAd.Media.LOAD_STATE_SUSPENDED);return true};iAd.Video_iTunes.prototype.unload=function(){if(this.playsInline){return this.callSuper()}};iAd.Video_iTunes.prototype.enterFullscreen=function(){try{return this.callSuper()}catch(a){iAd.Console.warn("Fullscreen playback is not supported without user interaction.");return false}};iAd.Video_iTunes.prototype.addMediaEventListeners=function(){if(this.playsInline){return this.callSuper()}var b=iAd.Video_iTunes.ITUNES_MEDIA_EVENTS;for(var a=0,c=b.length;a<c;a++){window.addEventListener(b[a],this)}};iAd.Video_iTunes.prototype.removeMediaEventListeners=function(){if(this.playsInline){return this.callSuper()}var b=iAd.Video_iTunes.ITUNES_MEDIA_EVENTS;for(var a=0,c=b.length;a<c;a++){window.removeEventListener(b[a],this)}};iAd.Video_iTunes.prototype.handleTimeupdate=function(b){if(this.playsInline){return this.callSuper(b)}var a=window.iTunes.currentTime;this.clearTimeupdateWatchdogTimeout();if(this._time==a){return}this._time=a;this.dispatchMediaNotification(iAd.Media.DID_UPDATE_TIME,[["time",this._time]])};iAd.Video_iTunes.prototype.handleEnded=function(a){if(!this.playsInline){this.enterPlaybackState(iAd.Media.PLAYBACK_STATE_ENDED);this.removeMediaEventListeners()}else{this.callSuper(a)}};iAd.Media.registerMediaAdapter(iAd.Video,iAd.Video_iTunes);