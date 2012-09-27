iAP.EventDelegate.registerViewControllerEventDelegate('Menu', function() {

this.onViewControllerViewDidAppear = function (event) {
	this.startAction({
  "className" : "iAP.AudioAction",
  "delay" : 0,
  "properties" : {
    "duration" : 227,
    "id" : "PlayBackgroundAudio",
    "methodName" : "play",
    "url" : "assets/03%20Ready%20Or%20Not.m4p"
  }
});
}

this.onViewControllerViewWillDisappear = function (event) {
	this.startAction({
  "className" : "iAP.CancelActionListAction",
  "delay" : 0,
  "properties" : {
    "duration" : 0.0001,
    "id" : "StopActionList1"
  }
});
}
});
