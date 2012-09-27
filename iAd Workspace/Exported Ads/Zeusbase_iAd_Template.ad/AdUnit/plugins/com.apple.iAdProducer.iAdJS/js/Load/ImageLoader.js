
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.ImageLoader",superclass:iAd.Loader});iAd.ImageLoader.DEFAULT_TIMEOUT=5;iAd.ImageLoader.prototype.init=function(b,a){this.callSuper(b);this.hasHiDPIVersion=a};iAd.ImageLoader.prototype.startLoad=function(){var a=this._img=document.createElement("img");this.addImageEventListeners();a.src=this.processImageURL(this._url,this.hasHiDPIVersion)};iAd.ImageLoader.prototype.processImageURL=function(b,a){return(a&&iAd.Device.HAS_HIDPI_DISPLAY)?iAd.Path.appendHiDPISuffix(b):b};iAd.ImageLoader.prototype.abortLoad=function(){this.removeImageEventListeners()};iAd.ImageLoader.prototype.getSupportingObject=function(){return this._img};iAd.ImageLoader.prototype.getResolvedURL=function(){return this.processImageURL(this.callSuper(),this.hasHiDPIVersion)};iAd.ImageLoader.prototype.handleEvent=function(a){this.removeImageEventListeners();if(a.type=="load"){this.notifyLoaderDidComplete()}else{if(a.type=="error"){this.notifyLoaderDidFail(iAd.Loader.LOAD_ERROR)}}};iAd.ImageLoader.prototype.addImageEventListeners=function(){if(this._img){this._img.addEventListener("load",this);this._img.addEventListener("error",this)}};iAd.ImageLoader.prototype.removeImageEventListeners=function(){if(this._img){this._img.removeEventListener("load",this);this._img.removeEventListener("error",this)}};