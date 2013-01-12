iAP.EventDelegate.registerViewEventDelegate('video6', 'Videos', function() {

this.onViewActivate = function (event) {
	this.viewController.startAction({
  "className" : "iAP.VideoPlayerAction",
  "delay" : 0,
  "properties" : {
    "duration" : 0.0001,
    "id" : "ToggleVideoPlayback5",
    "methodName" : "togglePlayback",
    "targetViewId" : "Videos-video6"
  }
});
}
});
