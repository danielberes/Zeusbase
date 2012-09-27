
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Path={};iAd.Path.HIDPI_SUFFIX="@2x";iAd.Path.escapeRegExp=function(b){var a=new RegExp("[.*+?|()\\[\\]{}\\\\]","g");return b.replace(a,"\\$&")};iAd.Path.appendHiDPISuffix=function(a){var c="("+iAd.Path.escapeRegExp(iAd.Path.HIDPI_SUFFIX)+"|"+iAd.Path.escapeRegExp(encodeURIComponent(iAd.Path.HIDPI_SUFFIX))+")(\\.[^\\./]+)?$",b=new RegExp(c,"i");if(!b.test(a)){if(/~ipad/.test(a)){var d=a.lastIndexOf("~ipad");a=a.substr(0,d)+iAd.Path.HIDPI_SUFFIX+a.substr(d)}else{if(/\.[^\.\/]+/.test(a)){var d=a.lastIndexOf(".");a=a.substr(0,d)+iAd.Path.HIDPI_SUFFIX+a.substr(d)}else{a+=iAd.Path.HIDPI_SUFFIX}}}return a};iAd.Path.HREF_PROXY=null;iAd.Path.resolveAbsolutePath=function(b){if(!iAd.Path.HREF_PROXY){iAd.Path.HREF_PROXY=document.createElement("a")}var a=iAd.Path.HREF_PROXY;a.href=b;return a.href};iAd.Path.objectToQueryString=function(a,b){return iAd.Path.objectToQueryStringForKey(a,b,null)};iAd.Path.objectToQueryStringForKey=function(a,h,d){h=h||"&";d=d||"";if(iAd.Utils.objectIsPrimitive(a)){var c=a?encodeURIComponent(a):"";if(d&&c){return encodeURIComponent(d)+"="+c}return c}var f=[],g=d;if(iAd.Utils.objectIsArray(a)){if(g){g+="[]"}for(var b=0,e=a.length;b<e;b++){f.push(iAd.Path.objectToQueryStringForKey(a[b],h,g))}}else{if(typeof(a)=="object"){for(var d in a){f.push(iAd.Path.objectToQueryStringForKey(a[d],h,g?g+"["+d+"]":d))}}}return f.join(h)};Object.defineProperty(iAd.Path,"assetsPath",{get:function(){if(this._assetsPath){return this._assetsPath}var a=/\/?iAd(-\w+)?\.cssz?(\?.*)?$/;var c,d,f;for(var b=0,e=document.styleSheets.length;b<e;b++){c=document.styleSheets[b];if(c.href){d=c.href.split("/");f=d.pop();if(a.test(f)){d.push("assets/");this._assetsPath=d.join("/");return this._assetsPath}}}},set:function(a){this._assetsPath=a}});iAd.Utils.setupDisplayNames(iAd.Path,"iAd.Path");