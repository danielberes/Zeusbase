
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.EventTriage={};iAd.EventTriage.handleEvent=function(c){if(iAd.Utils.objectIsInstanceOfClass(this,iAd.Object)){this.callSuper(c)}var b=c.type;var a="handle"+b.charAt(0).toUpperCase()+b.substr(1);if(iAd.Utils.objectHasMethod(this,a)){this[a](c)}};iAd.Utils.setupDisplayNames(iAd.EventTriage,"iAd.EventTriage");