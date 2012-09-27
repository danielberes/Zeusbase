
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAP.CancelActionListAction",superclass:iAd.ScriptAction,synthesizedProperties:["actionList"]});iAP.CancelActionListAction.prototype.start=function(){this.viewController.cancelActionList(this.actionList);this.end()};iAP.CancelActionListAction.prototype.summaryText=function(){return this.actionList||"None"};