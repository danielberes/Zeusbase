
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class.synthesizeProperty(iAd.ScriptAction.prototype,"targetView");iAd.ScriptAction.prototype.getTargetView=function(){if(!this._targetView&&this.targetViewId){this._targetView=iAd.View.getViewById(this.targetViewId)}return this._targetView};