
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.LoaderBatch",superclass:iAd.LoaderManager});iAd.LoaderBatch.prototype.add=function(a){var b=this.callSuper(a);if(b&&this.loading){this.loadNextItem();this.notifyLoaderDidProgress()}};iAd.LoaderBatch.prototype.startLoad=function(){this.callSuper();var a=this.pendingLoaders;while(a.length>0){this.loadNextItem()}return true};iAd.LoaderBatch.prototype.loaderDidComplete=function(a){this.callSuper(a);this.checkLoaderDidComplete()};iAd.LoaderBatch.prototype.loaderDidFail=function(a,b){this.callSuper(a,b);this.checkLoaderDidComplete()};iAd.LoaderBatch.prototype.checkLoaderDidComplete=function(){if(this.openLoaders.length==0){this.notifyLoaderDidComplete()}};