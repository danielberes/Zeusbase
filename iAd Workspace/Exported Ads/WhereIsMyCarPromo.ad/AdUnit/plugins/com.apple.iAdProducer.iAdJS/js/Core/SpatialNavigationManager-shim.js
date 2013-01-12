
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.SpatialNavigationManager={};iAd.SpatialNavigationManager.ENABLED=false;iAd.SpatialNavigationManager.FOCUSED_CSS_CLASS="ad-focused";iAd.SpatialNavigationManager.INACTIVE_CSS_CLASS="ad-inactive";iAd.SpatialNavigationManager.NAVIGABLE_CSS_CLASS="ad-navigable";iAd.SpatialNavigationManager.BACK_CSS_CLASS="ad-back-button";iAd.SpatialNavigationManager.ENABLED_CSS_CLASS="ad-supports-spatial-navigation";iAd.SpatialNavigationManager.INITIALLY_FOCUSED_ATTR="ad-initially-focused";iAd.SpatialNavigationManager.EXPLICIT_LEFT_ATTR="ad-left-navigable-element";iAd.SpatialNavigationManager.EXPLICIT_RIGHT_ATTR="ad-right-navigable-element";iAd.SpatialNavigationManager.EXPLICIT_UP_ATTR="ad-top-navigable-element";iAd.SpatialNavigationManager.EXPLICIT_DOWN_ATTR="ad-bottom-navigable-element";iAd.SpatialNavigationManager.FOCUS_IN_EVENT="ad-focus-in";iAd.SpatialNavigationManager.FOCUS_OUT_EVENT="ad-focus-out";iAd.SpatialNavigationManager.ACTIVATE_EVENT="ad-activate";iAd.SpatialNavigationManager.NAVIGATE_EVENT="ad-navigate";iAd.SpatialNavigationManager.sharedManager={init:function(){}};["navigableElementsInSubtree","registerSubtree","unregisterSubtree","addNavigableElement","removeNavigableElement","handleEvent","handleKeydown","handleNavigationEvent","handleNavigationCommand","navigateBack","activateFocusedElement","navigateInDirection","preferredElementInDirection","nearestElementIndexInDirection","topMostIndex","rightMostIndex","bottomMostIndex","leftMostIndex","metricsForElement","metricsForElementAtIndex","isElementAtIndexNavigable","focusElement"].forEach(function(a){iAd.SpatialNavigationManager.sharedManager[a]=iAd.SpatialNavigationManager.sharedManager.init});