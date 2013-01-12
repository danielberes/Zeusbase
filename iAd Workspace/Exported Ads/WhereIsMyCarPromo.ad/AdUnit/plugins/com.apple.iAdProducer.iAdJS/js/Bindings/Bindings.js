
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Bindings={};iAd.Bindings.SHIMS_ENABLED=false;iAd.BindingUtils={};iAd.BindingUtils.BINDING_UNAVAILABLE_ERROR="This binding is unavailable.";iAd.BindingUtils.initializeBindingObject=function(b,a){var c=a?b:b.constructor;b._binding=c.BINDING_OBJECT;if(!iAd.Bindings.SHIMS_ENABLED&&b._binding.shim){b._binding=null}b._bindingClass=c.BINDING_CLASS;b._bindingProtocol=c.BINDING_PROTOCOL};iAd.BindingUtils.registerBindingClass=function(a){Object.defineProperty(a,"available",{get:function(){if(this.hasOwnProperty("getAvailable")){return this.getAvailable()}else{return iAd.BindingUtils.isBindingClassAvailable(this)}}})};iAd.BindingUtils.isBindingClassAvailable=function(a){return !!(a.BINDING_OBJECT&&(iAd.Bindings.SHIMS_ENABLED||!a.BINDING_OBJECT.shim))};iAd.BindingUtils.isErrorFromModalActivity=function(a){var b=this.sanitizeMessageFromError(a);return(b&&b.indexOf("modal activity is in progress")!==-1)};iAd.BindingUtils.sanitizeMessageFromError=function(a){if(!a){return""}if(a.hasOwnProperty("message")){return a.message}return a.toString()};