
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Device={};iAd.Device.iOS_VERSION=navigator.userAgent.match(/OS ([0-9_]+)/);iAd.Device.iOS_VERSION=iAd.Device.iOS_VERSION?iAd.Device.iOS_VERSION[1].replace(/_/g,"."):null;iAd.Device.IS_IPAD=(navigator.platform.indexOf("iPad")>-1);iAd.Device.HAS_HIDPI_DISPLAY=(window.devicePixelRatio>=2);iAd.Device.iOSVersionLessThan=function(a){if(iAd.Device.iOS_VERSION==null){iAd.Console.warn("iAd.Device.iOS_VERSION is null.");return false}return iAd.Device.compareiOSVersions(iAd.Device.iOS_VERSION,a)==-1};iAd.Device.compareiOSVersions=function(e,d){var h=e.split(".");var g=d.split(".");for(var c=0,f=Math.max(h.length,g.length);c<f;c++){var b=parseInt(h[c]||"0",10),a=parseInt(g[c]||"0",10);if(a>b){return -1}else{if(b>a){return 1}}}return 0};iAd.Device.ORIENTATION_PORTRAIT_CSS="ad-device-portrait";iAd.Device.ORIENTATION_LANDSCAPE_CSS="ad-device-landscape";iAd.Device.ORIENTATION_PORTRAIT=0;iAd.Device.ORIENTATION_PORTRAIT_UPSIDE_DOWN=180;iAd.Device.ORIENTATION_LANDSCAPE_LEFT=90;iAd.Device.ORIENTATION_LANDSCAPE_RIGHT=-90;iAd.Device.init=function(){if(iAd.Device.iOS_VERSION){window.addEventListener("orientationchange",iAd.Device.interfaceOrientationDidChange,true)}iAd.Device.setInterfaceOrientation(window.orientation||iAd.Device.ORIENTATION_PORTRAIT)};iAd.Device.interfaceOrientationDidChange=function(a){iAd.Device.setInterfaceOrientation(window.orientation)};iAd.Device.setInterfaceOrientation=function(c){var d=this.interfaceOrientation;this.interfaceOrientation=c;var b=(Math.abs(c)==90);var a=document.body;var e=a.addClassName(b?iAd.Device.ORIENTATION_LANDSCAPE_CSS:iAd.Device.ORIENTATION_PORTRAIT_CSS);if(e){a.removeClassName(b?iAd.Device.ORIENTATION_PORTRAIT_CSS:iAd.Device.ORIENTATION_LANDSCAPE_CSS)}if(d!=null&&iAd.ViewController){iAd.ViewController.orientationDidChange(d)}};window.addEventListener("DOMContentLoaded",iAd.Device.init,true);iAd.Utils.setupDisplayNames(iAd.Device,"iAd.Device");