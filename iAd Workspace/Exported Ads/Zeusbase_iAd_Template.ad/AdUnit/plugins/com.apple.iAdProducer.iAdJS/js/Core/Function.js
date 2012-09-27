
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

if(!Function.prototype.hasOwnProperty("bind")){Function.prototype.bind=function(b){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - cannot bind something that is not callable")}var e=Array.prototype.slice.call(arguments,1),d=this,c=function(){},a=function(){var f=(this instanceof c)?this:(b||window);return d.apply(f,e.concat(Array.prototype.slice.call(arguments)))};c.prototype=this.prototype;a.prototype=new c();return a}};