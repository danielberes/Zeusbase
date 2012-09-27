
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.ScriptAction",mixins:[iAd.EventTarget],synthesizedProperties:["viewController","delay"]});iAd.ScriptAction.ACTION_DID_COMPLETE="scriptActionDidComplete";iAd.ScriptAction.prototype.init=function(a){this.callSuper();this.viewController=a;this.delay=0;this.eventTarget=document};iAd.ScriptAction.prototype.run=function(){return this.callMethodNameAfterDelay("start",this.delay)};iAd.ScriptAction.prototype.prepare=function(){};iAd.ScriptAction.prototype.start=function(){this.end()};iAd.ScriptAction.prototype.end=function(){this.dispatchNotification(iAd.ScriptAction.ACTION_DID_COMPLETE,this.delegate)};iAd.ScriptAction.prototype.reset=function(){};