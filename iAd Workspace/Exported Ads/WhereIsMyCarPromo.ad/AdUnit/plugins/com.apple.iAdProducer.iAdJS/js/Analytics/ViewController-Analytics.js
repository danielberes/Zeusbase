
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

(function viewControllerAnalytics(){iAd.Class.processMethod(iAd.ViewController,"init");var a=iAd.ViewController.prototype.init;iAd.ViewController.prototype.init=function(c){a.apply(this,arguments);var b=this.configuration.analytics;if(b){iAd.Analytics.processAnalyticsWithConfiguration(b)}}}());