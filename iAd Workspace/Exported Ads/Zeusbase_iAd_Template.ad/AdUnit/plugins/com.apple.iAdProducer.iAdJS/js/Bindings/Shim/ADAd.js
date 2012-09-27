
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

window._ad={shim:true};if(!window.ADAd){window._ADAd={ADInterfaceOrientationLandscapeLeft:4,ADInterfaceOrientationLandscapeRight:8,ADInterfaceOrientationPortrait:1,ADInterfaceOrientationPortraitUpsideDown:2,kInvalidOrCorruptImageError:4,kInvalidURL:100,kURLInvalidSchemeViolation:105,kURLRelativePathViolation:103,kURLSameOriginPolicyViolation:104}}if(!window.ADNetworkTypeListener){window._ADNetworkTypeListener={kADNetworkTypeListenerNetworkType3G:3,kADNetworkTypeListenerNetworkTypeEDGE:2,kADNetworkTypeListenerNetworkTypeGPRS:1,kADNetworkTypeListenerNetworkTypeUnknown:0,kADNetworkTypeListenerNetworkTypeWiFi:4};window._ad.networkType=window._ADNetworkTypeListener.kADNetworkTypeListenerNetworkTypeUnknown}if(!window.ad||!window.ad.hasOwnProperty("currentSupportedInterfaceOrientations")){window._ad.currentSupportedInterfaceOrientations=0}if(!window.ad||!window.ad.hasOwnProperty("locationServicesEnabled")){window._ad.locationServicesEnabled=false}if(!window.ad){Object.defineProperty(window._ad,"deviceOrientationListener",{set:function(a){if(iAd.Bindings.SHIMS_ENABLED){a.deviceOrientationDidChange(0)}}})};