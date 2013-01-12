
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.VideoDOMReconstruct={};iAd.VideoDOMReconstruct.elementWasRemovedFromDocument=function(){this.unload(false);this._element=null};iAd.VideoTouchEvents={};iAd.VideoTouchEvents.updateElementAttributes=function(){this.callSuper();if(this._element){this._element.style.webkitTransform=this._showsControls?"none":iAd.CSS.t(0,0)}};iAd.VideoFullscreen={};iAd.VideoFullscreen.enterFullscreen=function(){try{return this.callSuper()}catch(a){iAd.Console.warn("Fullscreen playback is not supported without user interaction.");return false}};iAd.VideoFullscreen.setPlaysInline=function(a){if(!a&&iAd.Device.IS_IPAD){iAd.Console.warn("Fullscreen playback is not supported on iPad.");a=true}this.callSuper(a)};iAd.VideoFullscreenLaunch={};iAd.VideoFullscreenLaunch.handlePlaying=function(){this.callSuper();if(!this.playsInline&&iAd.Device.IS_IPAD){this.enterFullscreen()}};iAd.VideoInlineLock={};iAd.VideoInlineLock.setPlaysInline=function(a){if(this.playsInline==a){return}if(this._loadState!=iAd.Media.LOAD_STATE_NONE){iAd.Console.warn('iAd.Video: Adjusting "playsInline" after loading is not supported on this iOS version.');return}this.callSuper(a)};iAd.MediaCompetitionPause={};iAd.MediaCompetitionPause.prepareForCompetition=function(){this.pause();this.callMethodNameAfterDelay("setPausedForCompetition",0)};iAd.MediaCompetitionPause.setPausedForCompetition=function(){this._pausedForCompetition=true};iAd.MediaCompetitionUnload={};iAd.MediaCompetitionUnload.prepareForCompetition=function(){this.unload(true)};iAd.MediaUnloadTearDown={};iAd.MediaUnloadTearDown.unloadElement=function(){this.callSuper();this.tearDownElement()};iAd.MediaUnloadTearDown.handleUnloadEvent=function(){this.callSuper();this.tearDownElement()};iAd.MediaUnloadTearDown.tearDownElement=function(){var a=this.element;if(a.parentNode){a.parentNode.removeChild(a)}this._element=null};iAd.MediaUnloadAndRestoreTime={};iAd.MediaUnloadAndRestoreTime.unload=function(a){if(a&&this._loadState!=iAd.Media.LOAD_STATE_NONE){this._timeWhenUnloaded=this._time}this.callSuper()};iAd.MediaUnloadAndRestoreTime.enterPlaybackState=function(a){delete this.seekTargetTime;this.callSuper(a)};iAd.MediaUnloadAndRestoreTime.handleEmptied=function(a){if(this._loadState!=iAd.Media.LOAD_STATE_NONE){this._timeWhenUnloaded=this._time}var b=(this._targetPlaybackState==iAd.Media.PLAYBACK_STATE_PLAYING);this.callSuper(a);if(b){this.play()}};iAd.MediaUnloadAndRestoreTime.handleProgress=function(a){if(this._timeWhenUnloaded){this.seekToTime(this._timeWhenUnloaded,true)}if(this.seekTargetTime){this.evaluateSeekTime()}this.callSuper(a)};iAd.MediaUnloadAndRestoreTime.seekToTime=function(c,b){if(!b){delete this._timeWhenUnloaded}var a=this.callSuper(c);if(a){this.awaitingSeekedEvent=true;this.seekTargetTime=c}return a};iAd.MediaUnloadAndRestoreTime.getRenderable=function(){return this._timeWhenUnloaded?false:this.callSuper()};iAd.MediaUnloadAndRestoreTime.getTime=function(){return this._timeWhenUnloaded||this.callSuper()};iAd.MediaUnloadAndRestoreTime.handleSeeked=function(a){this.awaitingSeekedEvent=false;if(this._timeWhenUnloaded){this._restoredUnloadedTime=this._timeWhenUnloaded;delete this._timeWhenUnloaded}var b=this._time;if(this.seekTargetTime){this.callMethodNameAfterDelay("evaluateSeekTime",0)}else{this.callSuper(a)}};iAd.MediaUnloadAndRestoreTime.handleTimeupdate=function(a){if(this.seekTargetTime){if(iAd.Media.activeMedia[0]!=this){this.notifyDidSeek()}else{if(!this._element.seeking){this.callMethodNameAfterDelay("evaluateSeekTime",0)}}}var b=this._pausedForCompetition;if(b){delete this._pausedForCompetition}if(b&&this._element.currentTime==0){return}if(!this._timeWhenUnloaded){this.callSuper(a)}if(this._time>=this._restoredUnloadedTime){delete this._restoredUnloadedTime;this.callMethodNameAfterDelay("notifyPropertyChange",0,"renderable")}};iAd.MediaUnloadAndRestoreTime.evaluateSeekTime=function(){if(!this.seeking||this.awaitingSeekedEvent){return}var a=this.isTimeInBufferedRange(this._time);if(this.isTimeInBufferedRange(this._time)){this.notifyDidSeek()}};iAd.MediaUnloadAndRestoreTime.getSeeking=function(){return(this.seekTargetTime!=undefined)};iAd.MediaUnloadAndRestoreTime.notifyDidSeek=function(){if(!this.seeking){return}delete this.seekTargetTime;this.dispatchMediaNotification(iAd.Media.DID_SEEK)};iAd.MediaForceLoad={};iAd.MediaForceLoad.loadElement=function(){var a=this.element;a.load();this.ignorePlayEvent=true;this.ignorePauseEvent=true;a.play();a.pause()};iAd.MediaForceLoad.handlePlay=function(a){if(this.ignorePlayEvent){this.ignorePlayEvent=false;return}this.callSuper(a)};iAd.MediaForceLoad.handlePause=function(a){if(this.ignorePauseEvent){this.ignorePauseEvent=false;return}this.callSuper(a)};iAd.MediaForceLoad.handleWaiting=function(a){if(this.ignorePlayEvent||this.ignorePauseEvent){return}this.callSuper(a)};iAd.MediaLoop={};iAd.MediaLoop.handleEnded=function(a){if(this._adapterLoop){this.playElement();return}this.callSuper(a)};iAd.MediaLoop.setLoop=function(a){this._adapterLoop=a};iAd.MediaLoop.getLoop=function(){return this._adapterLoop};