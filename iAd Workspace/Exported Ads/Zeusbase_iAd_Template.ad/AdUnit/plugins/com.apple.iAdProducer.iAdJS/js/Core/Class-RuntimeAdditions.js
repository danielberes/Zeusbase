
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class.runtimeMethodOverride=function(d,b,a){iAd.Class.processMethod(d,b);var c=d.prototype[b];d.prototype[b]=a;return c};