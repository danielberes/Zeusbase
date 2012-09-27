
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

(function(){iAd.Class.processMethod(iAd.Button,"setValueForAttribute");var a=iAd.Button.prototype.setValueForAttribute;iAd.Button.prototype.setValueForAttribute=function(c,b){if(b=="ad-title"){this.setTitleForState(c,iAd.Control.STATE_NORMAL)}else{if(b=="ad-vertical-alignment"){if(this.titleLabel){this.titleLabel.verticalAlignment=c}}else{a.apply(this,arguments)}}}})();