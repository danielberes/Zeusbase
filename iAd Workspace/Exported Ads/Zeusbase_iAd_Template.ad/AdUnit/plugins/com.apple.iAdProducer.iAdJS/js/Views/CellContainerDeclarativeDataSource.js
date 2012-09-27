
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class("iAd.CellContainerDeclarativeDataSource");iAd.CellContainerDeclarativeDataSource.prototype.init=function(d,f){this.managesLayers=!!f;this.callSuper();this.numberOfCells=d.childElementCount;this.cells=[];var c=Array.prototype.slice.call(d.children),a,g;for(var b=0,e=c.length;b<e;b++){a=c[b];g=a.hasOwnProperty("_view");if(!g){new iAd.View(a);iAd.Console.warn(this.constructor.displayName+" created a view for the child element at index "+b+". Non view-based cells are deprecated; please ensure all elements that should be cells are instances of iAd.View or one of its subclasses.")}this.cells.push(a._view);if(!f){if(g){a._view.removeFromSuperview()}else{d.removeChild(a)}}}};iAd.CellContainerDeclarativeDataSource.prototype.numberOfCellsInContainer=function(a){return this.numberOfCells};iAd.CellContainerDeclarativeDataSource.prototype.cellAtIndexInContainer=function(a,b){return this.cells[b]};