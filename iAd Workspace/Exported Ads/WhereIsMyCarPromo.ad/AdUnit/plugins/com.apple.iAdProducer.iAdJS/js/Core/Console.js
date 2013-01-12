
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Console={};iAd.Console.log=function(){if(window.console&&console.log){console.log.apply(console,arguments)}};iAd.Console._fallbackLog=function(b,a){a.unshift(b.toUpperCase()+":");iAd.Console.log.apply(iAd.Console,a)};iAd.Console._log=function(b,a){if(window.console&&console[b]){console[b].apply(console,a);return}iAd.Console._fallbackLog(b,Array.prototype.slice.call(a))};iAd.Console.warn=function(){iAd.Console._log("warn",arguments)};iAd.Console.error=function(){iAd.Console._log("error",arguments)};iAd.Console.debug=function(){iAd.Console._log("debug",arguments)};iAd.Console.assert=function(){if(window.console&&console.assert){console.assert.apply(console,arguments);return}if(!arguments[0]){iAd.Console._fallbackLog("assert",[arguments[1]||""])}};iAd.Console.info=function(){iAd.Console._log("info",arguments)};