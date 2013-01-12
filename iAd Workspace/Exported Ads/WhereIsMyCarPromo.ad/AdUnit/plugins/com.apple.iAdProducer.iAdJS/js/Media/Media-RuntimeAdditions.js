
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Media.prototype.getFilename=function(a){return this.url?decodeURIComponent(this.url).replace(/^.*\/|\.[^.]*$/g,""):""};