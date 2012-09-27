
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.FlowView",superclass:iAd.View,mixins:[iAd.CellContainer],synthesizedProperties:["sidePadding","focusedZOffset","sideZOffset","cellGap","dragMultiplier","cellRotation","flipDuration","perspective","priorityOrdering","delegateIndexNotificationDelay","trackCamera","focusedIndex","frontCellIndex","frontZOffset"],archivedProperties:["sidePadding","focusedZOffset","sideZOffset","cellGap","dragMultiplier","cellRotation","flipDuration","perspective","priorityOrdering","delegateIndexNotificationDelay","trackCamera","focusedIndex","cellSize"],excludedProperties:["subviews"],cssClassName:"ad-flow-view",collectionAccessor:"flowViews"});iAd.FlowView.DID_TAP_FRONT_CELL_NOTIFICATION="flowViewDidTapFrontCell";iAd.FlowView.DID_SELECT_CELL_NOTIFICATION="flowViewDidSelectCell";iAd.FlowView.DID_BEGIN_SWIPE_NOTIFICATION="flowViewDidBeginSwipe";iAd.FlowView.DID_END_SWIPE_NOTIFICATION="flowViewDidEndSwipe";iAd.FlowView.ANIMATED_CELL_CSS="ad-animated-cells";iAd.FlowView.ACCELERATION=8;iAd.FlowView.MAX_TRACKING_TIME=200;iAd.FlowView.TAP_EVENT_DURATION=300;iAd.FlowView.SWIPE_THRESHOLD_ANGLE=iAd.Number.degreesToRadians(45);iAd.FlowView.DECELERATION_FRICTION_FACTOR=0.9;iAd.FlowView.DESIRED_ANIMATION_FRAME_RATE=1/60;iAd.FlowView.MINIMUM_VELOCITY=0.05;iAd.FlowView.MIN_VELOCITY_FOR_DECELERATION=1;iAd.FlowView.NUM_MOVE_EVENTS=3;iAd.FlowView.PENETRATION_DECELERATION=0.03;iAd.FlowView.PENETRATION_ACCELERATION=0.08;iAd.FlowView.prototype.init=function(a){this.dataSource=null;this.delegate=null;this._sidePadding=160;this._focusedZOffset=0;this._sideZOffset=-100;this._cellGap=25;this._cellRotation=45;this._dragMultiplier=1;this._flipDuration=0.5;this._perspective=400;this._delegateIndexNotificationDelay=0.25;this._priorityOrdering=false;this._trackCamera=true;this.cellSize=iAd.Size.ZERO_SIZE;this.cellRotations=[];this._cameraOffset=0;this.timerSet=false;this._moveHistory=[];iAd.CellContainer.init.call(this,a);this.callSuper(a);this.userInteractionEnabled=true};iAd.FlowView.prototype.willRestoreFromArchive=function(a){this.callSuper(a);this.archivedProperties={focusedIndex:a.focusedIndex}};iAd.FlowView.prototype.layerWasCreated=function(){this.callSuper();this.camera=this.layer.appendChild(document.createElement("div"));this.camera.addClassName("ad-flow-view-camera");this.hostingLayer=this.camera};iAd.FlowView.prototype.setupLayer=function(){this.callSuper();this.normalizeListDeclarativeStyle();this.dataSource=new iAd.CellContainerDeclarativeDataSource(this.hostingLayer,false)};iAd.FlowView.prototype.setValueForAttribute=function(b,a){switch(a){case"ad-focused-index":this.archivedProperties={focusedIndex:parseInt(b,10)};break;case"ad-cell-size-width":this.cellSize=new iAd.Size(b,this.cellSize.height);break;case"ad-cell-size-height":this.cellSize=new iAd.Size(this.cellSize.width,b);break;default:this.callSuper(b,a)}};iAd.FlowView.prototype.layerWasInsertedIntoDocument=function(){this.callSuper();if(this.dataSource&&this.numberOfCells==0){this.reloadData()}this.updateLayoutAnimated(false)};iAd.FlowView.prototype.setFlipDuration=function(a){this._flipDuration=a};iAd.FlowView.prototype.setCellGap=function(a){this._cellGap=a;this.updateLayoutAnimated(false)};iAd.FlowView.prototype.setSidePadding=function(a){this._sidePadding=a;this.updateLayoutAnimated(false)};iAd.FlowView.prototype.setFocusedZOffset=function(a){this._focusedZOffset=a;this.updateLayoutAnimated(false)};iAd.FlowView.prototype.setSideZOffset=function(a){this._sideZOffset=a;this.updateLayoutAnimated(false)};iAd.FlowView.prototype.setCellRotation=function(a){this._cellRotation=a;this.updateLayoutAnimated(false)};iAd.FlowView.prototype.setPriorityOrdering=function(c){this._priorityOrdering=c;for(var b=0;b<this.numberOfCells;b++){var a=this.cells[b];a._layoutIndex=this.layoutIndexForOrderIndex(b)}this.updateLayoutAnimated(false)};iAd.FlowView.prototype.setPerspective=function(a){this._perspective=a;this.setLayerStyle({"-webkit-perspective":this._perspective})};iAd.FlowView.prototype.reloadData=function(){iAd.CellContainer.reloadData.call(this);var a=this.archivedProperties;if(a){this.focusCellAtIndexAnimated(a.focusedIndex,false);delete this.archivedProperties}};iAd.FlowView.prototype.viewForCellAtIndex=function(c){var a=this.cells[c];var d=a.superview;if(d&&d.layer.hasClassName("ad-flow-view-cell-wrapper")){return d}var b=new iAd.View();b.layer.addClassName("ad-flow-view-cell-wrapper");b.addSubview(a);return b};iAd.FlowView.prototype.insertCellsAtIndexesAnimated=function(a,b){iAd.CellContainer.insertCellsAtIndexesAnimated.call(this,a,b);this.updateCellsLayout();this.updateLayoutAnimated(b)};iAd.FlowView.prototype.removeCellsAtIndexesAnimated=function(a,b){iAd.CellContainer.removeCellsAtIndexesAnimated.call(this,a,b);this.updateCellsLayout();this.updateLayoutAnimated(b)};iAd.FlowView.prototype.focusCellAtIndexAnimated=function(d,f,c){if(d<0||d>=this.numberOfCells){return}if(!c&&this._focusedIndex==d){return}this.changedTime=Date.now();if(!this.timerSet){this.timerSet=true;this.callMethodNameAfterDelay("testForInteractionDelegate",this._delegateIndexNotificationDelay)}var b=this.cellAtIndex(d);var a=!this.trackingMoved;if(a){this.willFocusCell(b,d,f)}this._focusedIndex=d;var e=!!f;this.setAnimatesCells(e);if(!this.trackingMoved){this.setAnimatesCamera(e);this.centerCamera()}this.layoutCells();if(f){if(a){this.camera.addEventListener("webkitTransitionEnd",this,false)}}else{this.didFocusCell(b,d,false)}};iAd.FlowView.prototype.layoutIndexForOrderIndex=function(b){if(this._priorityOrdering){var a=Math.floor((this.numberOfCells-1)/2);if(b%2==1){return(a+Math.ceil(b/2))}else{return(a-Math.floor(b/2))}}else{return b}};iAd.FlowView.prototype.orderIndexForLayoutIndex=function(a){if(this._priorityOrdering){var b=Math.floor((this.numberOfCells-1)/2);var c=a-b;if(c>0){return c*2-1}else{return c*-2}}else{return a}};iAd.FlowView.prototype.testForInteractionDelegate=function(){var a=(Date.now()-this.changedTime)/1000;if(a<this._delegateIndexNotificationDelay){this.callMethodNameAfterDelay("testForInteractionDelegate",this._delegateIndexNotificationDelay-a)}else{this.timerSet=false;this.dispatchNotification(iAd.FlowView.DID_SELECT_CELL_NOTIFICATION,this.delegate,[["cellIndex",this._focusedIndex]])}};iAd.FlowView.prototype.updateLayoutAnimated=function(a){this.setAnimatesCamera(a);this.setAnimatesCells(a);this.layoutCells();this.centerCamera()};iAd.FlowView.prototype.setAnimatesCamera=function(a){this.camera.style.webkitTransitionDuration=a?"":"0s"};iAd.FlowView.prototype.centerCamera=function(){this._cameraOffset=this._focusedIndex*this._cellGap;this.layoutCamera()};iAd.FlowView.prototype.layoutCamera=function(){this.camera.style.webkitTransform=iAd.CSS.t(this._cameraOffset*-1,0)};iAd.FlowView.prototype.setAnimatesCells=function(a){if(a==this._animatesCells){return}this._animatesCells=a;this.layer.toggleClassName(iAd.FlowView.ANIMATED_CELL_CSS,a)};iAd.FlowView.prototype.layoutCells=function(){for(var g=0;g<this.numberOfCells;g++){var d=this.cells[g]._layoutIndex;var f=this._focusedIndex-d;var c=Math.abs(f);var a=d*this._cellGap-this.sidePadding;var j=this._cellRotation;var k=0.1*c+this._sideZOffset;if(f==0){a=d*this._cellGap;j=0;k=this._focusedZOffset}else{if(f<0){a=this._focusedIndex*this._cellGap+this.sidePadding+c*this._cellGap;j=-this._cellRotation}}this.cellRotations[g]=j;var b=iAd.CSS.t3d(a,0,k);var e=iAd.CSS.r3d(0,1,0,iAd.Number.degreesToRadians(j));var h=this.viewForCellAtIndex(g);h.transform=b;this.cells[g].transform=e}};iAd.FlowView.prototype.updateCellsLayout=function(){var f=this.cellSize,b=new iAd.Point(-f.width/2,(this._size.height-f.height)/2),c=this.cells,a;for(var d=0,e=c.length;d<e;d++){a=c[d];a._orderIndex=d;a._layoutIndex=this.layoutIndexForOrderIndex(d);a.layer.addClassName("ad-flow-view-cell");a.size=f;a.position=b;a.superview._orderIndex=d;this.cellRotations.push(null)}};iAd.FlowView.prototype.cellAtIndex=function(a){return this.cells[a]};iAd.FlowView.prototype.handleEvent=function(c){this.callSuper(c);if(c.type=="webkitTransitionEnd"){var a=this.camera;if(c.target==a){a.removeEventListener("webkitTransitionEnd",this,false);var b=this._focusedIndex;this.didFocusCell(this.cellAtIndex(b),b,false)}}};iAd.FlowView.prototype.touchesBegan=function(b){if(this.tracking||(b.touches&&b.touches.length>1)){return}this.stopDecelerationAnimation();this.previousIndex=this._focusedIndex;this.downTime=b.timeStamp;this.downOffset=this._cameraOffset;this.downTimePosition=this._cameraOffset;this.downPoint=iAd.Point.fromEventInElement(b,this.layer);var a=b.target;while(a&&!a.hasClassName("ad-flow-view-cell")){a=a.parentNode}this.downIndex=(a&&a.hasClassName("ad-flow-view-cell"))?a._view._layoutIndex:this._focusedIndex;this.trackingMoved=false;if(this._trackCamera){this.setAnimatesCamera(false)}this.setAnimatesCells(true);this.callSuper(b)};iAd.FlowView.prototype.touchesMoved=function(e){if(e.touches&&e.touches.length>1){return}this.lastEventTime=e.timeStamp;var c=iAd.Point.fromEventInElement(e,this.layer);var b=c.x-this.downPoint.x;var g=c.y-this.downPoint.y;if(!this.trackingMoved){if(Math.abs(b)<3&&Math.abs(g)<3){return}var a=false;if(b!=0&&g!=0){var f=Math.abs(Math.atan(g/b));a=(f<=iAd.FlowView.SWIPE_THRESHOLD_ANGLE)}else{if(b!=0){a=true}}if(!a){this.touchesCancelled(e);return}this.trackingMoved=true;this.downPoint=c;this.dispatchNotification(iAd.FlowView.DID_BEGIN_SWIPE_NOTIFICATION,this.delegate);return}if(this.trackingMoved){e.preventDefault();this._cameraOffset=this.downOffset-b;if(this._cameraOffset<0){this._cameraOffset/=2}else{if(this._cameraOffset>((this.numberOfCells-1)*this._cellGap)){this._cameraOffset=((this.numberOfCells-1)*this._cellGap+this._cameraOffset)/2}}if(!this._trackCamera){this._cameraOffset=Math.round(this._cameraOffset/this._cellGap)*this._cellGap}this.layoutCamera();var d=this.previousIndex-Math.round(b/this._cellGap);if(d!=this._focusedIndex){this.focusCellAtIndexAnimated(d,true)}if(this._moveHistory.push({time:e.timeStamp,offset:this._cameraOffset})>iAd.FlowView.NUM_MOVE_EVENTS){this._moveHistory.shift()}if(this.lastEventTime-this.downTime>iAd.FlowView.MAX_TRACKING_TIME){this.downTime=this.lastEventTime;this.downTimePosition=this._cameraOffset}}};iAd.FlowView.prototype.touchesEnded=function(c){c.preventDefault();if(c.touches&&c.touches.length>1){return}this.callSuper(c);var b=c.timeStamp,a=this.downIndex;if(!this.trackingMoved&&(b-this.downTime)<iAd.FlowView.TAP_EVENT_DURATION){if(a==this._focusedIndex){this.dispatchNotification(iAd.FlowView.DID_TAP_FRONT_CELL_NOTIFICATION,this.delegate,[["cellIndex",this._focusedIndex]])}else{this.focusCellAtIndexAnimated(a,true)}}else{if(b-this.lastEventTime<=iAd.FlowView.MAX_TRACKING_TIME){this.startDecelerationAnimation()}else{if(this.trackingMoved){this.swipeEnded()}else{this.focusCellAtIndexAnimated(a,true)}}}this._moveHistory=[];this.trackingMoved=false};iAd.FlowView.prototype.swipeEnded=function(){if(this._trackCamera){this.setAnimatesCamera(true)}this.centerCamera();this.dispatchNotification(iAd.FlowView.DID_END_SWIPE_NOTIFICATION,this.delegate);var a=this._focusedIndex;var b=this.cellAtIndex(a);this.willFocusCell(b,a,true);this.camera.addEventListener("webkitTransitionEnd",this,false)};iAd.FlowView.prototype.getOffsetVelocity=function(){var a=this._moveHistory.length;if(a<2){return 0}var c=this._moveHistory[a-1].offset-this._moveHistory[a-2].offset;var b=this._moveHistory[a-1].time-this._moveHistory[a-2].time;return c/b};iAd.FlowView.prototype.startDecelerationAnimation=function(){var b=this._cameraOffset-this.downTimePosition;var f=(event.timeStamp-this.downTime)/iAd.FlowView.ACCELERATION;this.decelerationVelocity=this.getOffsetVelocity();this.minDecelerationPoint=0;this.maxDecelerationPoint=(this.numberOfCells-1)*this._cellGap;this.penetrationDeceleration=iAd.FlowView.PENETRATION_DECELERATION;this.penetrationAcceleration=iAd.FlowView.PENETRATION_ACCELERATION;if(Math.abs(this.decelerationVelocity)>iAd.FlowView.MIN_VELOCITY_FOR_DECELERATION){var c=this._cameraOffset+(this.decelerationVelocity/(1-iAd.FlowView.DECELERATION_FRICTION_FACTOR));var a=Math.round(c/this._cellGap);if(a>=0&&a<=(this.numberOfCells-1)){var d=a*this._cellGap;this.decelerationVelocity=(1-iAd.FlowView.DECELERATION_FRICTION_FACTOR)*(d-this._cameraOffset);c=this._cameraOffset+(this.decelerationVelocity/(1-iAd.FlowView.DECELERATION_FRICTION_FACTOR))}var e=iAd.Number.clampValue(Math.round(c/this._cellGap),0,this.numberOfCells-1);if(e!=this._focusedIndex){this.focusedIndex=e}this.decelerating=true;this.decelerationTimer=this.callMethodNameAfterDelay("stepThroughDecelerationAnimation",iAd.FlowView.DESIRED_ANIMATION_FRAME_RATE);this.lastFrame=new Date()}else{this.swipeEnded()}};iAd.FlowView.prototype.stopDecelerationAnimation=function(){this.decelerating=false;clearTimeout(this.decelerationTimer)};iAd.FlowView.prototype.stepThroughDecelerationAnimation=function(a){if(!this.decelerating){return}var d=new Date();var g=d-this.lastFrame;var h=a?0:(Math.round(g/iAd.FlowView.DESIRED_ANIMATION_FRAME_RATE)-1);for(var e=0;e<h;e++){this.stepThroughDecelerationAnimation(true)}var f=this._cameraOffset+this.decelerationVelocity;this._cameraOffset=f;if(!a){this.layoutCamera()}this.decelerationVelocity*=iAd.FlowView.DECELERATION_FRICTION_FACTOR;var c=Math.abs(this.decelerationVelocity);if(!a&&c<=iAd.FlowView.MINIMUM_VELOCITY){this.decelerating=false;this.swipeEnded();return}if(!a){this.decelerationTimer=this.callMethodNameAfterDelay("stepThroughDecelerationAnimation",iAd.FlowView.DESIRED_ANIMATION_FRAME_RATE)}var b=0;if(f<this.minDecelerationPoint){b=this.minDecelerationPoint-f}else{if(f>this.maxDecelerationPoint){b=this.maxDecelerationPoint-f}}if(b!=0){if(b*this.decelerationVelocity<=0){this.decelerationVelocity+=b*this.penetrationDeceleration}else{this.decelerationVelocity=b*this.penetrationAcceleration}}if(!a){this.lastFrame=d}};iAd.FlowView.prototype.getFrontCellIndex=function(){iAd.Console.warn("iAd.FlowView: the .frontCellIndex property was deprecated in iAd JS 1.6 in favor of the .focusedIndex property.");return this.focusedIndex};iAd.FlowView.prototype.setFrontCellIndex=function(a){iAd.Console.warn("iAd.FlowView: the .frontCellIndex property was deprecated in iAd JS 1.6 in favor of the .focusedIndex property.");this.focusedIndex=a};iAd.FlowView.prototype.getFrontZOffset=function(){iAd.Console.warn("iAd.FlowView: the .frontZOffset property was deprecated in iAd JS 1.6 in favor of the .focusedZOffset property.");return this.focusedZOffset};iAd.FlowView.prototype.setFrontZOffset=function(a){iAd.Console.warn("iAd.FlowView: the .frontZOffset property was deprecated in iAd JS 1.6 in favor of the .focusedZOffset property.");this.focusedZOffset=a};iAd.FlowView.prototype.normalizeListDeclarativeStyle=function(){var a=this.layer.querySelector("ul");if(!a||a.parentNode!==this.layer){return}a.parentNode.removeChild(a);var b=a.children,g,f,d;for(var c=0,e=b.length;c<e;c++){f=b[c];d=document.createElement("div");while(f.childNodes.length){d.appendChild(f.firstChild)}this.addSubview(new iAd.View(d))}};