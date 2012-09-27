
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Cell={};iAd.Cell.CELL_CLASS_CSS="ad-cell";iAd.Cell.CELL_FOCUSED_CSS="ad-focused-cell";iAd.Cell.getFocusedWithinContainer=function(){return !!this._focusedWithinContainer};iAd.Cell.setFocusedWithinContainer=function(a){this.setFocusedWithinContainerAnimated(a,false)};iAd.Cell.setFocusedWithinContainerAnimated=function(b,a){this._focusedWithinContainer=b;this.layer.toggleClassName(iAd.Cell.CELL_FOCUSED_CSS,b)};iAd.Cell.prepareForReuse=function(){this.setFocusedWithinContainerAnimated(false,false)};iAd.Utils.setupDisplayNames(iAd.Cell,"iAd.Cell");