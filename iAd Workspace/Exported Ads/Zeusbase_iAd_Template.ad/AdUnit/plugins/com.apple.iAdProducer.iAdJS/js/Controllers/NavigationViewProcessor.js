
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.NavigationViewProcessor",superclass:iAd.ViewControllerReferencingViewProcessor});iAd.NavigationViewProcessor.PREVIOUS_ITEM_ID="{previous-item}";iAd.NavigationViewProcessor.ATTR_NAME="ad-navigates-to";iAd.NavigationViewProcessor.PROCESSED_KEY="_adProcessedNavigatesTo";iAd.NavigationViewProcessor.prototype.handleEvent=function(e){if(!this.shouldHandleEvent(e)){return}var d=e.currentTarget;var f=iAd.Element.getCustomAttribute(d,iAd.NavigationViewProcessor.ATTR_NAME);var b=iAd.RootViewController.sharedRootViewController.navigationController;if(f==iAd.NavigationViewProcessor.PREVIOUS_ITEM_ID){b.popViewControllerAnimated(true)}else{var a=iAd.ViewController.instances[f];if(a){var c=(b.viewControllers.indexOf(a)!=-1);if(c){b.popToViewControllerAnimated(a,true)}else{b.pushViewControllerAnimated(a,true)}}}};iAd.ViewController.addViewProcessor(iAd.NavigationViewProcessor);