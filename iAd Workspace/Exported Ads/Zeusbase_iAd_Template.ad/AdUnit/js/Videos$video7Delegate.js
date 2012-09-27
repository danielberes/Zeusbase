iAP.EventDelegate.registerViewEventDelegate('video7', 'Videos', function() {

this.onViewActivate = function (event) {
	this.viewController.startAction({
  "className" : "iAP.VideoPlayerAction",
  "delay" : 0,
  "properties" : {
    "duration" : 0.0001,
    "id" : "ToggleVideoPlayback6",
    "methodName" : "togglePlayback",
    "targetViewId" : "Videos-video7"
  }
});
}
});
