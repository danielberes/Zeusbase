
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.MapView",superclass:iAd.View,cssClassName:"ad-map-view",synthesizedProperties:["mapType","scrollEnabled","zoomEnabled","region","centerCoordinate","annotations","selectedAnnotations","overlays","showsUserLocation","userLocation","userLocationVisible","longPressDropsPin","droppedPinIdentifier","droppedPinTitle"],archivedProperties:["mapType","scrollEnabled","zoomEnabled","region","centerCoordinate","annotations","selectedAnnotations","overlays","showsUserLocation","userLocationVisible","longPressDropsPin","droppedPinIdentifier","droppedPinTitle"],collectionAccessor:"mapViews"});iAd.MapView.MAPS_PLUGIN_MEDIA_TYPE="application/x-geomap";iAd.MapView.MAPS_PLUGIN_PRESENT=!!navigator.mimeTypes[iAd.MapView.MAPS_PLUGIN_MEDIA_TYPE];iAd.MapView.MAP_TYPE_STANDARD="standard";iAd.MapView.MAP_TYPE_SATELLITE="satellite";iAd.MapView.MAP_TYPE_HYBRID="hybrid";iAd.MapView.MAP_TYPES_ENUM={standard:0,satellite:1,hybrid:2};iAd.MapView.MAP_TYPES_ARRAY=["standard","satellite","hybrid"];iAd.MapView.ANNOTATION_LEFT_CALLOUT_TAPPED="mapViewAnnotationLeftCalloutTapped";iAd.MapView.ANNOTATION_RIGHT_CALLOUT_TAPPED="mapViewAnnotationRightCalloutTapped";iAd.MapView.ANNOTATION_DID_FINISH_DRAG="mapViewAnnotationDidFinishDrag";iAd.MapView.DID_SELECT_ANNOTATION="mapViewDidSelectAnnotation";iAd.MapView.DID_DESELECT_ANNOTATION="mapViewDidDeselectAnnotation";iAd.MapView.DID_ADD_VIEWS_FOR_ANNOTATIONS="mapViewDidAddViewsForAnnotations";iAd.MapView.DID_ADD_OVERLAYS="mapViewDidAddOverlays";iAd.MapView.FAILED_RETRIEVING_IMAGE_FOR_ANNOTATION="mapViewDidFailToRetrieveImageForAnnotation";iAd.MapView.WILL_START_LOADING_MAP="mapViewWillStartLoadingMap";iAd.MapView.DID_FINISH_LOADING_MAP="mapViewDidFinishLoadingMap";iAd.MapView.DID_FAIL_LOADING_MAP="mapViewDidFailLoadingMap";iAd.MapView.REGION_WILL_CHANGE="mapViewRegionWillChange";iAd.MapView.REGION_DID_CHANGE="mapViewRegionDidChange";iAd.MapView.WILL_START_UPDATING_USER_LOCATION="mapViewWillStartUpdatingUserLocation";iAd.MapView.DID_STOP_UPDATING_USER_LOCATION="mapViewDidStopUpdatingUserLocation";iAd.MapView.DID_UPDATE_USER_LOCATION="mapViewDidUpdateUserLocation";iAd.MapView.UPDATE_USER_LOCATION_FAILED="mapViewUserLocationUpdateDidFail";iAd.MapView.prototype.init=function(a){this._mapType=0;this._scrollEnabled=true;this._zoomEnabled=true;this._region=null;this._centerCoordinate=null;this._annotationsById={};this._selectedAnnotations=null;this._overlaysById={};this._showsUserLocation=false;this._userLocation=null;this._userLocationVisible=false;this._longPressDropsPin=false;this._droppedPinIdentifier=null;this._droppedPinTitle=null;this.delegate=null;this.initMapObject();this.callSuper(a)};iAd.MapView.prototype.initMapObject=function(){if(iAd.MapView.MAPS_PLUGIN_PRESENT){this.mapObject=document.createElement("object");this.mapObject.listener=this;this.mapObject.type=iAd.MapView.MAPS_PLUGIN_MEDIA_TYPE}else{if(!iAd.Bindings.SHIMS_ENABLED){throw iAd.BindingUtils.BINDING_UNAVAILABLE_ERROR;return}this.mapObject=new iAd.MapView.MapPluginShim()}};iAd.MapView.prototype.layerWasCreated=function(){this.callSuper();if(iAd.MapView.MAPS_PLUGIN_PRESENT){this.layer.appendChild(this.mapObject)}};iAd.MapView.prototype.readPropertiesFromLayerAttributes=function(a){var b="ad-shows-user-location";if(a.hasOwnProperty(b)){var c=a[b];delete a[b];this.callSuper(a);this.setValueForAttribute(c,b)}else{this.callSuper(a)}};iAd.MapView.prototype.layerWasInsertedIntoDocument=function(){this.callSuper();if(this.wasPreviouslyRemovedFromDocument){this.wasPreviouslyRemovedFromDocument=false;this.mapRestorationTimeout=this.callMethodNameAfterDelay("restoreState",0.4);return}this.restoreState()};iAd.MapView.prototype.layerWasRemovedFromDocument=function(){if(iAd.Device.iOS_VERSION&&iAd.Device.iOSVersionLessThan("6.0")){if(this.mapRestorationTimeout){window.clearTimeout(this.mapRestorationTimeout);this.mapRestorationTimeout=null}this.wasPreviouslyRemovedFromDocument=true}this.callSuper()};iAd.MapView.prototype.getMapProperty=function(a,b){if(!this.layerIsInDocument){return this["_"+a]}var c=this.mapObject[a];if(b){if(c===1){return true}if(c===0){return false}}return c};iAd.MapView.prototype.setMapProperty=function(c,b){this["_"+c]=b;if(this.layerIsInDocument){var a=this.mapObject,d=a[c];if(d!=b){a[c]=b}}return b};iAd.MapView.prototype.restoreState=function(){var a=this.mapObject,d=this.getAnnotations(),b=this.getOverlays(),c=this._region;a.listener=this;["mapType","droppedPinIdentifier","droppedPinTitle","longPressDropsPin","scrollEnabled","zoomEnabled","showsUserLocation"].forEach(function(e){this[e]=this[e]},this);c&&a.setRegion(c,false);b&&a.addOverlays(b);d&&a.addAnnotations(d)};iAd.MapView.prototype.setMapType=function(a){return this.setMapProperty("mapType",iAd.MapView.MAP_TYPES_ENUM[a])};iAd.MapView.prototype.getMapType=function(){return iAd.MapView.MAP_TYPES_ARRAY[this.getMapProperty("mapType")]};iAd.MapView.prototype.setZoomEnabled=function(a){return this.setMapProperty("zoomEnabled",a)};iAd.MapView.prototype.getZoomEnabled=function(){return this.getMapProperty("zoomEnabled",true)};iAd.MapView.prototype.setScrollEnabled=function(a){return this.setMapProperty("scrollEnabled",a)};iAd.MapView.prototype.getScrollEnabled=function(){return this.getMapProperty("scrollEnabled",true)};iAd.MapView.prototype.setShowsUserLocation=function(a){return this.setMapProperty("showsUserLocation",a)};iAd.MapView.prototype.getShowsUserLocation=function(){return this.getMapProperty("showsUserLocation",true)};iAd.MapView.prototype.setUserLocation=function(){iAd.Console.warn("iAd.MapView.userLocation is read-only.")};iAd.MapView.prototype.getUserLocation=function(){var a=this._userLocation;if(!a&&this.layerIsInDocument&&this.mapObject.showsUserLocation){a=this.mapObject.userLocation;if(a){this._userLocation=this.processUserLocation(a)}}return this._userLocation};iAd.MapView.prototype.setUserLocationVisible=function(){iAd.Console.warn("iAd.MapView.userLocationVisible is read-only.")};iAd.MapView.prototype.getUserLocationVisible=function(){return this.mapObject.userLocationVisible};iAd.MapView.prototype.setLongPressDropsPin=function(a){return this.setMapProperty("longPressDropsPin",a)};iAd.MapView.prototype.getLongPressDropsPin=function(){return this.getMapProperty("longPressDropsPin",true)};iAd.MapView.prototype.setDroppedPinTitle=function(a){return this.setMapProperty("droppedPinTitle",a)};iAd.MapView.prototype.getDroppedPinTitle=function(){return this.getMapProperty("droppedPinTitle")};iAd.MapView.prototype.setDroppedPinIdentifier=function(a){return this.setMapProperty("droppedPinIdentifier",a)};iAd.MapView.prototype.getDroppedPinIdentifier=function(){return this.getMapProperty("droppedPinIdentifier")};iAd.MapView.prototype.setCenterCoordinate=function(a){if(!this.layerIsInDocument){this._centerCoordinate=a;return}this.setCenterCoordinateAnimated(a,true)};iAd.MapView.prototype.setCenterCoordinateAnimated=function(b,a){this.mapObject.setCenterCoordinate(b,a)};iAd.MapView.prototype.getCenterCoordinate=function(){if(this.layerIsInDocument){var a=this.mapObject.centerCoordinate;return new iAd.MapCoordinate(a.latitude,a.longitude)}else{return this._centerCoordinate}};iAd.MapView.prototype.setRegion=function(a){this.setRegionAnimated(a,true)};iAd.MapView.prototype.setRegionAnimated=function(b,a){this._region=b;if(!this.layerIsInDocument){return}this.mapObject.setRegion(b,a)};iAd.MapView.prototype.getRegion=function(){if(this._region){return this._region}else{if(this.layerIsInDocument&&this.mapObject.region){var a=this.mapObject.region;return new iAd.MapRegion(a.latitude,a.longitude,a.latitudeDelta,a.longitudeDelta)}}};iAd.MapView.prototype.mapRegionWillChange=function(){this.dispatchNotification(iAd.MapView.REGION_WILL_CHANGE,this.delegate,[])};iAd.MapView.prototype.mapRegionDidChange=function(a){a=new iAd.MapRegion(a.latitude,a.longitude,a.latitudeDelta,a.longitudeDelta);if(a.equals(this._region)){return}this._region=a;this.dispatchNotification(iAd.MapView.REGION_DID_CHANGE,this.delegate,[["region",a]])};iAd.MapView.prototype.convertCoordinateToPoint=function(b){var a=this.mapObject.convertCoordinateToPoint(b);return new iAd.Point(a.x,a.y)};iAd.MapView.prototype.convertPointToCoordinate=function(a){var b=this.mapObject.convertPointToCoordinate(a);return new iAd.MapCoordinate(b.latitude,b.longitude)};iAd.MapView.prototype.convertRectToRegion=function(a){var b=this.mapObject.convertRectToRegion(a);return new iAd.MapRegion(b.latitude,b.longitude,b.latitudeDelta,b.longitudeDelta)};iAd.MapView.prototype.convertRegionToRect=function(b){var a=this.mapObject.convertRegionToRect(b);return new iAd.Rect(a.x,a.y,a.width,a.height)};iAd.MapView.prototype.getAnnotations=function(){return this.annotationsForIds(Object.keys(this._annotationsById))};iAd.MapView.prototype.setAnnotations=function(a){iAd.Console.warn("iAd.MapView.annotations is read-only. Please use iAd.MapView.addAnnotations() instead.")};iAd.MapView.prototype.addAnnotations=function(d){for(var b=0,c=d.length,a;b<c;b++){a=d[b];this._annotationsById[a.id]=a}this.mapObject.addAnnotations(d)};iAd.MapView.prototype.selectAnnotation=function(a,b){this.mapObject.selectAnnotation(a.id,b)};iAd.MapView.prototype.deselectAnnotation=function(a,b){this.mapObject.deselectAnnotation(a.id,b)};iAd.MapView.prototype.removeAnnotations=function(d){var a=[];for(var b=0,c=d.length,e;b<c;b++){e=d[b].id;delete this._annotationsById[e];a.push(e)}this.mapObject.removeAnnotations(a)};iAd.MapView.prototype.setSelectedAnnotations=function(){iAd.Console.warn("iAd.MapView.selectedAnnotations is read-only. Please use iAd.MapView.selectAnnotation() instead.")};iAd.MapView.prototype.getSelectedAnnotations=function(){return this.annotationsForIds(this.mapObject.selectedAnnotations)};iAd.MapView.prototype.annotationsForIds=function(a){var b=[];a.forEach(function(d){var c=this._annotationsById[d];if(c){b.push(c)}},this);return b};iAd.MapView.prototype.mapDidSelectAnnotation=function(a){this.dispatchNotification(iAd.MapView.DID_SELECT_ANNOTATION,this.delegate,[["annotation",this._annotationsById[a]]])};iAd.MapView.prototype.mapDidDeselectAnnotation=function(a){this.dispatchNotification(iAd.MapView.DID_DESELECT_ANNOTATION,this.delegate,[["annotation",this._annotationsById[a]]])};iAd.MapView.prototype.mapDidAddViewsForAnnotations=function(a){this.dispatchNotification(iAd.MapView.DID_ADD_VIEWS_FOR_ANNOTATIONS,this.delegate,[["annotations",this.annotationsForIds(a)]])};iAd.MapView.prototype.mapAnnotationLeftCalloutTapped=function(a){this.dispatchNotification(iAd.MapView.ANNOTATION_LEFT_CALLOUT_TAPPED,this.delegate,[["annotation",this._annotationsById[a]]])};iAd.MapView.prototype.mapAnnotationRightCalloutTapped=function(a){this.dispatchNotification(iAd.MapView.ANNOTATION_RIGHT_CALLOUT_TAPPED,this.delegate,[["annotation",this._annotationsById[a]]])};iAd.MapView.prototype.mapAnnotationDidFinishDrag=function(a,b){this.dispatchNotification(iAd.MapView.ANNOTATION_DID_FINISH_DRAG,this.delegate,[["annotation",this._annotationsById[a]],["coordinate",new iAd.MapCoordinate(b.latitude,b.longitude)]])};iAd.MapView.prototype.mapFailedRetrievingImageForAnnotation=function(b,c,a){this.dispatchNotification(iAd.MapView.FAILED_RETRIEVING_IMAGE_FOR_ANNOTATION,this.delegate,[["annotation",this._annotationsById[b]],["errorCode",c],["url",a]])};iAd.MapView.prototype.getOverlays=function(){return this.overlaysForIds(Object.keys(this._overlaysById))};iAd.MapView.prototype.setOverlays=function(){iAd.Console.warn("iAd.MapView.overlays is read-only. Please use iAd.MapView.addOverlays() instead.")};iAd.MapView.prototype.addOverlays=function(c){for(var b=0,d=c.length,a;b<d;b++){a=c[b];this._overlaysById[a.id]=a}this.mapObject.addOverlays(c)};iAd.MapView.prototype.removeOverlays=function(c){var e=[];for(var a=0,d=c.length,b;a<d;a++){b=c[a].id;delete this._overlaysById[b];e.push(b)}this.mapObject.removeOverlays(e)};iAd.MapView.prototype.exchangeOverlaysAtIndices=function(a,b){this.mapObject.exchangeOverlays(index1,index2)};iAd.MapView.prototype.insertOverlayAtIndex=function(b,a){this.mapObject.insertOverlayAtIndex(b,a)};iAd.MapView.prototype.insertOverlayAboveOverlay=function(a,b){this.mapObject.insertOverlayAboveOverlay(a,b.identifier)};iAd.MapView.prototype.insertOverlayBelowOverlay=function(a,b){this.mapObject.insertOverlayBelowOverlay(a,identifier)};iAd.MapView.prototype.overlaysForIds=function(b){var a=[];b.forEach(function(d){var c=this._overlaysById[d];if(c){a.push(c)}},this);return a};iAd.MapView.prototype.mapDidAddOverlays=function(a){if(!Array.isArray(a)){a=[a]}this.dispatchNotification(iAd.MapView.DID_ADD_OVERLAYS,this.delegate,[["overlays",this.overlaysForIds(a)]])};iAd.MapView.prototype.mapDidUpdateUserLocation=function(a){a=this.processUserLocation(a);this._userLocation=a;this.dispatchNotification(iAd.MapView.DID_UPDATE_USER_LOCATION,this.delegate,[["location",a]])};iAd.MapView.prototype.processUserLocation=function(a){return{latitude:a.latitude,longitude:a.longitude,altitude:a.altitude,horizontalAccuracy:a.horizontalAccuracy,verticalAccuracy:a.verticalAccuracy}};iAd.MapView.prototype.mapUpdateUserLocationFailed=function(a){this.dispatchNotification(iAd.MapView.UPDATE_USER_LOCATION_FAILED,this.delegate,[["errorCode",a]])};iAd.MapView.prototype.mapWillStartUpdatingUserLocation=function(){this.dispatchNotification(iAd.MapView.WILL_START_UPDATING_USER_LOCATION,this.delegate,[])};iAd.MapView.prototype.mapDidStopUpdatingUserLocation=function(){this.dispatchNotification(iAd.MapView.DID_STOP_UPDATING_USER_LOCATION,this.delegate,[])};iAd.MapView.prototype.mapWillStartLoadingMap=function(){this.dispatchNotification(iAd.MapView.WILL_START_LOADING_MAP,this.delegate,[])};iAd.MapView.prototype.mapDidFinishLoadingMap=function(){this.dispatchNotification(iAd.MapView.DID_FINISH_LOADING_MAP,this.delegate,[])};iAd.MapView.prototype.mapDidFailLoadingMap=function(){this.dispatchNotification(iAd.MapView.DID_FAIL_LOADING_MAP,this.delegate,[])};iAd.MapView.MapPluginShim=function(){this.shim=true;this.style={};["addAnnotation","addAnnotations","removeAnnotation","removeAnnotations","addOverlay","addOverlays","removeOverlay","removeOverlays","convertCoordinateToPoint","convertPointToCoordinate","convertRectToRegion","convertRegionToRect","deselectAnnotation","exchangeOverlays","insertOverlayAboveOverlay","insertOverlayAtIndex","insertOverlayBelowOverlay","regionThatFits","setRegion","setCenterCoordinate"].forEach(function(a){this[a]=function(){iAd.Console.log("iAd.MapView # "+a+" : shim implementation called")}},this)};