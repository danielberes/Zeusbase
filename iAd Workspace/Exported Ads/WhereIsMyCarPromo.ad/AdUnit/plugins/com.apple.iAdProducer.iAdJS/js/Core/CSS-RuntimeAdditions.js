
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.CSS.widthForTextAndFont=function(d,c){if(!this.textMeasuringCanvasContext){this.textMeasuringCanvasContext=document.createElement("canvas").getContext("2d")}var a=this.textMeasuringCanvasContext.font;if(c){this.textMeasuringCanvasContext.font=c}var b=0;d.split("\n").forEach(function(e){b=Math.max(b,this.textMeasuringCanvasContext.measureText(e).width)},this);this.textMeasuringCanvasContext.font=a;return b};(function(){if(iAP.Context.IS_ITUNES_EXTRA){var b=iAd.CSS.concatenateTransforms;var a=/(matrix3d|translate3d|translateZ|rotate3d|rotateZ|scale3d|scaleZ)/i;iAd.CSS.concatenateTransforms=function(){var e=b.apply(this,arguments),d=new WebKitCSSMatrix(e),c="";if(e.match(a)){var f=[d.m11,d.m12,d.m13,d.m14,d.m21,d.m22,d.m23,d.m24,d.m31,d.m32,d.m33,d.m34,d.m41,d.m42,d.m43,d.m44];c="matrix3d("+f.join(", ")+")"}else{c=d.toString()}return c}}})();