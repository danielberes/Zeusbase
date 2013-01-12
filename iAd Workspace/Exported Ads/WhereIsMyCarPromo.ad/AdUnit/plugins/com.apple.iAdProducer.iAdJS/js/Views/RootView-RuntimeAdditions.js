
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

(function(){iAd.Class.processMethod(iAd.RootView,"init");var a=iAd.RootView.prototype.init;iAd.RootView.prototype.init=function(c){a.apply(this,arguments);if(iAP.Context.IS_SAFARI){this._size=new iAd.Size(document.body.offsetWidth,document.body.offsetHeight)}if(iAP.Context.IS_IAD_PRODUCER||iAP.Context.IS_SAFARI){window.removeEventListener("resize",this,true)}};iAd.Class.processMethod(iAd.RootView,"updateSize");var b=iAd.RootView.prototype.updateSize;iAd.RootView.prototype.updateSize=function(){var c=this;setTimeout(function(){if(iAP.Context.IS_SAFARI){c._size=new iAd.Size(document.body.offsetWidth,document.body.offsetHeight);c.notifyPropertyChange("size")}else{b.apply(c)}},0)};iAd.RootView.prototype.setIsLandscape=function(e){var d=new iAd.Size(document.body.offsetWidth,document.body.offsetHeight);var c=(d.width>d.height);if(e!=c){d=new iAd.Size(d.height,d.width)}this.size=d}})();