
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAP.TransitionToPageAction",superclass:iAd.ScriptAction,synthesizedProperties:["destinationPage"]});iAP.TransitionToPageAction.prototype.start=function(){if(this.viewController instanceof iAd.ViewController&&this.destinationPage){if(this.destinationPage===iAd.NavigationViewProcessor.PREVIOUS_ITEM_ID){var a=iAd.RootViewController.sharedRootViewController.navigationController;if(a){a.popViewControllerAnimated(true)}}else{this.viewController.transitionToViewControllerWithID(this.destinationPage)}}};iAP.TransitionToPageAction.prototype.summaryText=function(){if(!this.destinationPage){return"None"}else{if(this.destinationPage==iAd.NavigationViewProcessor.PREVIOUS_ITEM_ID){return"Previous Page"}else{return this.destinationPage}}};