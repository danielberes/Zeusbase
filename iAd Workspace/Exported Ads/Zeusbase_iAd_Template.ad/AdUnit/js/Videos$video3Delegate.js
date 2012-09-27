iAP.EventDelegate.registerViewEventDelegate('video3', 'Videos', function() {

this.onViewActivate = function (event) {
	this.viewController.startAction({
  "className" : "iAP.VideoPlayerAction",
  "delay" : 0,
  "properties" : {
    "duration" : 0.0001,
    "id" : "ToggleVideoPlayback2",
    "methodName" : "togglePlayback",
    "targetViewId" : "Videos-video3"
  }
});
}
});
