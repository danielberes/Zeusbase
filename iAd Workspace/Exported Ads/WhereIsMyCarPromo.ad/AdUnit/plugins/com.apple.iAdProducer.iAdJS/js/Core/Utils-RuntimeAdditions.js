
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

var iAP={};iAP.Context={};(function(){var b={};var a=window.navigator.platform;b.IS_IOS=["iPhone","iPod","iPad"].indexOf(a)!=-1;b.IS_IOS_SIMULATOR=navigator.platform=="iPhone Simulator"||navigator.platform=="iPad Simulator";b.IS_OSX=a.indexOf("Mac")!=-1;b.IS_WINDOWS=a.indexOf("Win")!=-1;b.IS_IAD=!!window.ad;b.IS_IAD_PRODUCER=!!window.editorProxy;b.IS_ITUNES_EXTRA=!!window.iTunes;b.IS_IBOOKS=!!window.widget;b.IS_SAFARI=!b.IS_IAD_PRODUCER&&!b.IS_IAD&&!b.IS_ITUNES_EXTRA&&!b.IS_IBOOKS;iAP.Context=b})();iAP.Context.projectIsOfType=function(a){return document.body.hasClassName("iap-"+a)};iAd.Utils.isRunningInAdContext=window.hasOwnProperty("ad");iAd.Utils.unique=(function(){var a={};function b(d){var c=a[d];if(!c){c=a[d]={count:0}}return c}return function(d,e){var f,c;f=e||"IAD_UTILS_SHARED_UNIQUE";c=b(f);c.count+=1;if(!d){return c.count}if(typeof d==="function"){return d(c.count)}return d+c.count}}());iAd.Utils.setImageAsWallpaper=function(c){iAd.Console.warn("iAd.Utils.setImageAsWallpaper is deprecated. Use window.ad.setImageAsWallpaper instead.");function a(){}a.setImageAsWallpaperSucceeded=function(d){};a.setImageAsWallpaperFailed=function(d,e){alert("An error occurred while attempting to set the wallpaper.")};var b=c.element.src;window.ad.setImageAsWallpaper(b,"Set Wallpaper",new a())};(function(){if(iAP.Context.IS_IOS){return}var h=document.createElement("div"),e=false,f=null,j={},a={"background-position":"10px 10px","background-size":"400px 300px","-webkit-border-horizontal-spacing":"10px","-webkit-border-vertical-spacing":"10px","border-top-style":"solid","border-top-width":"2px","border-right-style":"solid","border-right-width":"2px","border-bottom-style":"solid","border-bottom-width":"2px","border-left-style":"solid","border-left-width":"2px","border-top-left-radius":"5px","border-top-right-radius":"5px","border-bottom-left-radius":"5px","border-bottom-right-radius":"5px","-webkit-column-rule-style":"solid","-webkit-column-rule-width":"10px","-webkit-column-width":"80px","-webkit-column-gap":"20px","-webkit-marquee-increment":"10px","-webkit-mask-position":"10px 10px","-webkit-mask-size":"10px 10px","-webkit-perspective":"400","-webkit-perspective-origin":"20px 20px","-webkit-text-stroke-width":"2px","-webkit-transform-origin":"10px 10px",position:"absolute",left:"20px",top:"20px",right:"50px",bottom:"50px","font-size":"20px",width:"400px","max-width":"900px","min-width":"200px",height:"250px","max-height":"600px","min-height":"200px","letter-spacing":"2px","word-spacing":"10px","margin-top":"10px","margin-right":"10px","margin-bottom":"10px","margin-left":"10px","padding-top":"10px","padding-right":"10px","padding-bottom":"10px","padding-left":"10px","text-indent":"10px"};for(var g in a){if(a.hasOwnProperty(g)){h.style[g]=a[g]}}h.style.zoom="2";document.documentElement.appendChild(h);f=window.getComputedStyle(h);for(var g in a){if(a.hasOwnProperty(g)){if(a[g]!=f[g]&&parseFloat(a[g])!=parseFloat(f[g])){e=true;j[g]="always"}}}h.style.display="none";for(var g in a){if(a.hasOwnProperty(g)){if(a[g]!=f[g]&&parseFloat(a[g])!=parseFloat(f[g])){e=true;j[g]=j[g]||"hidden"}}}document.documentElement.removeChild(h);h=undefined;f=undefined;if(e){window._getComputedStyle=window.getComputedStyle;window.getComputedStyle=function(l){var m=window._getComputedStyle.apply(window,arguments);if(e){var i=1/iAd.Utils.pageZoom();if(i!=1){return new iAd.Utils.StyleProxy(m,i)}}return m};iAd.Utils.StyleProxy=function(l,i){if(!(l instanceof CSSStyleDeclaration)){return l}this._computedObj=l;this._ratio=i};iAd.Utils.StyleProxy.prototype._fixValue=function(l){if(typeof(l)==="string"){var i=this._ratio;l=l.split(" ").map(function(m){if(~m.indexOf("px")){return(parseFloat(m)*i)+"px"}return m}).join(" ")}return l};var k=_getComputedStyle(document.documentElement);var b=function(i){var l;if(j.hasOwnProperty(i)){l=function(){var n=this._computedObj[i];if(j[i]==="always"||this._computedObj.display==="none"){n=this._fixValue(n)}return n}}else{l=function(){return this._computedObj[i]}}Object.defineProperty(iAd.Utils.StyleProxy.prototype,i,{get:l});if(i.indexOf("-")>-1){var m=i.replace(/-([a-zA-Z])/g,function(n,o){return o.toUpperCase()});m=m[0].toLowerCase()+m.substr(1);Object.defineProperty(iAd.Utils.StyleProxy.prototype,m,{get:l})}};iAd.Utils.StyleProxy.prototype.parentRule=null;iAd.Utils.StyleProxy.prototype.length=k.length;Object.defineProperty(iAd.Utils.StyleProxy.prototype,"cssText",{get:function(){return this._computedObj.cssText}});for(var c=0,d=k.length;c<d;c++){b(k[c])}k=undefined;b=undefined}})();(function(){var a=window.webkitConvertPointFromPageToNode;window.webkitConvertPointFromPageToNode=function(d,f){var e=a.apply(window,arguments);if(iAd.Utils.pageZoomElement()==d||iAd.Utils.pageZoomElement().contains(d)){var c=iAd.Utils.pageZoom();if(c!=1){e.x/=c;e.y/=c}}return e};var b=window.webkitConvertPointFromNodeToPage;window.webkitConvertPointFromNodeToPage=function(d,e){if(iAd.Utils.pageZoomElement()==d||iAd.Utils.pageZoomElement().contains(d)){var c=iAd.Utils.pageZoom();if(c!=1){e.x*=c;e.y*=c}}return b.call(window,d,e)}})();iAd.Utils.pageZoomElement=function(){return document.body};iAd.Utils.pageZoom=function(){return parseFloat((window._getComputedStyle||window.getComputedStyle)(iAd.Utils.pageZoomElement()).zoom)||1};iAd.Utils.ITMS_URL_REGEX=/^http(:\/\/(phobos|itunes)\.apple\.com\/)/;iAd.Utils.openURL=function(a){var c=document.createElement("a");if(iAP.Context.IS_ITUNES_EXTRA||iAP.Context.IS_SAFARI){c.target="_blank"}a=a.replace(iAd.Utils.ITMS_URL_REGEX,"itms$1");c.href=a;var b=document.createEvent("Event");b.initEvent("click",true,false);c.dispatchEvent(b)};iAd.Utils.urlHasValidProtocol=function(a){return a&&a.match(/^[a-z0-9]+:/i)};iAd.Utils.archiveOriginalValue=function(b,a){if(!b._originalValues){b._originalValues={}}if(b._originalValues[a]!==undefined){return}b._originalValues[a]=b[a]};iAd.Utils.restoreOriginalValue=function(b,a){if(!b._originalValues||b._originalValues[a]===undefined){b[a]=b[a];return}b[a]=b._originalValues[a]};iAd.Utils.getOriginalValue=function(b,a){if(!b._originalValues||b._originalValues[a]===undefined){return b[a]}return b._originalValues[a]};iAd.Utils.updateOriginalValue=function(b,a){if(!b._originalValues||b._originalValues[a]===undefined){return}b._originalValues[a]=b[a]};iAd.Utils.humanRandomIndex=function(b){if(!b.length){return -1}b.humanRandomIndexPreviousIndices=b.humanRandomIndexPreviousIndices||[];b.humanRandomIndexI=b.humanRandomIndexI||0;var a;do{a=Math.floor(Math.random()*b.length)}while(b.length>1&&b.humanRandomIndexPreviousIndices.indexOf(a)!=-1);b.humanRandomIndexPreviousIndices[b.humanRandomIndexI]=a;b.humanRandomIndexI=(b.humanRandomIndexI+1)%Math.ceil(b.length/5);return a};