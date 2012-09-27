iAP.EventDelegate.registerViewEventDelegate('mapView', 'Map', function() {this.onMapViewDidReceiveDataFailure = function (event) {
	var error = event.ad.error;
	if (error) {
		alert('MapView: ' + error);
	}
};

this.onMapViewDidReceiveResponseData = function (event) {
	// clear the previous annotations
	this.removeAnnotations(this.annotations);
	// add and zoom to the annotations
	var annotations = event.ad.annotations;
	var coordinates = annotations.map(function (annotation) { return annotation.coordinate; });
	this.region = iAd.MapRegion.fromCoordinates(coordinates);
	this.callMethodNameAfterDelay('addAnnotations', 1.5, annotations);
};

});
