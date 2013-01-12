
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.HostScrollView",superclass:iAd.ScrollView});iAd.HostScrollView.prototype.init=function(){this.callSuper();this._usesNativeScrolling=true;var a=iAd.RootView.sharedRoot;a.addPropertyObserver("disablesDefaultScrolling",this,"rootViewDisablesDefaultScrollingDidChange");this.rootViewDisablesDefaultScrollingDidChange();a.addPropertyObserver("scrollsHorizontally",this,"rootViewScrollingAxesDidChange");a.addPropertyObserver("scrollsVertically",this,"rootViewScrollingAxesDidChange");this.rootViewScrollingAxesDidChange()};iAd.HostScrollView.prototype.rootViewDisablesDefaultScrollingDidChange=function(){this.scrollEnabled=!iAd.RootView.sharedRoot.disablesDefaultScrolling};iAd.HostScrollView.prototype.rootViewScrollingAxesDidChange=function(){var a=iAd.RootView.sharedRoot;this.canScrollVertically=a.scrollsVertically;this.canScrollHorizontally=a.scrollsHorizontally};iAd.HostScrollView.prototype.shouldPreventEventDefault=function(a){if(a.type==iAd.Event.MOVE_EVENT&&!this.scrollEnabled){return !iAd.ScrollViewPanGestureRecognizer.hasRecognizerTrackingNativeScrollView()}return false};iAd.HostScrollView.prototype.dispatchUIEventToContent=function(a){};iAd.HostScrollView.prototype.adjustContentSize=function(a){};iAd.ScrollView._hostScrollView=null;Object.defineProperty(iAd.ScrollView,"hostScrollView",{get:function(){if(iAd.ScrollView._hostScrollView==null){iAd.ScrollView._hostScrollView=new iAd.HostScrollView()}return iAd.ScrollView._hostScrollView},set:function(a){iAd.ScrollView._hostScrollView=a}});