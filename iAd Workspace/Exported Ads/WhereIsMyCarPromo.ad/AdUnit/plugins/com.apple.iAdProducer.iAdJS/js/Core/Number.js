
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Number={};iAd.Number.degreesToRadians=function(a){return(a/360)*(Math.PI*2)};iAd.Number.radiansToDegrees=function(a){return(a/(Math.PI*2))*360};iAd.Number.clampValue=function(b,a,c){return Math.min(Math.max(b,a),c)};iAd.Utils.setupDisplayNames(iAd.Number,"iAd.Number");