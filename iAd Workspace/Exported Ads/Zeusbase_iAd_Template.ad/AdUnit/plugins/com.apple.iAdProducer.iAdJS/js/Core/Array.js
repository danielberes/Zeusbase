
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Array={};iAd.Array.removeObjectFromArray=function(b,c){var a=c.indexOf(b);if(a==-1){return false}c.splice(a,1);return true};iAd.Utils.setupDisplayNames(iAd.Array,"iAd.Array");