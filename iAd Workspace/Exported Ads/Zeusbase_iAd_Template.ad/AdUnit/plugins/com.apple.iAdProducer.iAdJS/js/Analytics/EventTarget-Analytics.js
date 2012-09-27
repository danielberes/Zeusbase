
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

(function eventTargetAnalytics(){var a=iAd.EventTarget.createAndDispatchEvent;iAd.EventTarget.createAndDispatchEvent=function(c,d){a.apply(this,arguments);if(!iAd.Event.notificationEvents[c]){iAd.Analytics.logEvent(c,this)}};var b=iAd.EventTarget.dispatchEvent;iAd.EventTarget.dispatchEvent=function(c){b.apply(this,arguments);iAd.Analytics.logEvent(c.type,this)}}());