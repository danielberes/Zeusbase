
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.String={};iAd.String.dashedStringToCamelCase=function(a){var b=a.split("-");return b.shift()+b.map(iAd.String.capitalizeString).join("")};iAd.String.capitalizeString=function(a){return a.charAt(0).toUpperCase()+a.substr(1)};iAd.String.camelCaseStringToDashed=function(a){return a.replace(/([A-Z])/g,function(b){return"-"+b.toLowerCase()})};iAd.String.REPLACEMENT_SENTINEL="%@";iAd.String.REPLACEMENT_SENTINEL_LENGTH=iAd.String.REPLACEMENT_SENTINEL.length;iAd.String.format=function(){var g=arguments.length;if(!g){return""}var c=arguments[0];var a="";var f=0;var e=0;var d;for(d=1;d<g&&(e=c.indexOf(iAd.String.REPLACEMENT_SENTINEL,f))>=0;++d){a+=c.slice(f,e);a+=arguments[d];f=e+iAd.String.REPLACEMENT_SENTINEL_LENGTH}var b=c.slice(f);a+=b;if(d<g){iAd.Console.warn("String.format - More arguments than specifiers")}if(b.indexOf(iAd.String.REPLACEMENT_SENTINEL)!==-1){iAd.Console.warn("String.format - More specifiers than arguments")}return a};iAd.Utils.setupDisplayNames(iAd.String,"iAd.String");