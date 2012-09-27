
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Class({name:"iAd.XHRLoader",superclass:iAd.Loader,synthesizedProperties:["xmlContent","content"]});iAd.XHRLoader.SUPPORTS_CONTENT_TYPE=(new XMLHttpRequest()).hasOwnProperty("responseType");iAd.XHRLoader.XHR_EVENTS=["loadstart","progress","abort","error","load","timeout","loadend","readystatechange"];iAd.XHRLoader.DEFAULT_TIMEOUT=0;iAd.XHRLoader.prototype.init=function(a,c,b){this.callSuper(a);this.method=c||"GET";this.params=b;this.headers={};this.urlEncoded=true;this.contentType=""};iAd.XHRLoader.prototype.getContent=function(){if(this._xhr){return iAd.XHRLoader.SUPPORTS_CONTENT_TYPE?this._xhr.response:this._xhr.responseText}return null};iAd.XHRLoader.prototype.getXmlContent=function(){try{return this._xhr?this._xhr.responseXML:null}catch(a){return null}};iAd.XHRLoader.prototype.getSupportingObject=function(){return this._xhr};iAd.XHRLoader.prototype.getProgress=function(){if(this.loaded){return 1}return this.bytesTotal?this.bytesLoaded/this.bytesTotal:0};iAd.XHRLoader.prototype.getResolvedURL=function(){return iAd.Path.resolveAbsolutePath(this.shouldSerializeURL()?this.serializeURL():this._url)};iAd.XHRLoader.prototype.startLoad=function(){var a=this.shouldSerializeURL()?this.serializeURL():this._url;var f=this.method.toUpperCase();var b=this.params;if(f=="GET"){b=null}if(this.urlEncoded&&(f=="POST"||f=="PUT")){this.headers["Content-type"]="application/x-www-form-urlencoded; charset=utf-8";if(b){b=this.serializeParams()}}if(!this._xhr){this._xhr=new XMLHttpRequest()}this.addXHRListeners();this._xhr.open(f,a,true);for(var d in this.headers){try{this._xhr.setRequestHeader(d,this.headers[d])}catch(c){iAd.Console.warn('iAd.XHRLoader: Error when attempting to set header "'+d+'".')}}if(iAd.XHRLoader.SUPPORTS_CONTENT_TYPE){try{this._xhr.responseType=this.contentType}catch(c){iAd.Console.warn('iAd.XHRLoader: Invalid contentType "'+this.contentType+'".');this.contentType=""}}this.bytesTotal=0;this.bytesLoaded=0;this._xhr.send(b)};iAd.XHRLoader.prototype.abortLoad=function(){if(this._xhr){this.removeXHRListeners();this._xhr.abort();this._xhr=null}};iAd.XHRLoader.prototype.serializeURL=function(){var a=this._url;var b=(a.indexOf("?")!=-1)?"&":"?";return this.params?a+b+this.serializeParams():a};iAd.XHRLoader.prototype.serializeParams=function(){return iAd.Path.objectToQueryString(this.params)};iAd.XHRLoader.prototype.shouldSerializeURL=function(){return this.method.toUpperCase()=="GET"&&!!this.params};iAd.XHRLoader.prototype.addXHRListeners=function(){var b=iAd.XHRLoader.XHR_EVENTS;for(var a=0,c=b.length;a<c;a++){this._xhr.addEventListener(b[a],this)}};iAd.XHRLoader.prototype.removeXHRListeners=function(){var b=iAd.XHRLoader.XHR_EVENTS;for(var a=0,c=b.length;a<c;a++){this._xhr.removeEventListener(b[a],this)}};iAd.XHRLoader.prototype.handleEvent=function(a){switch(a.type){case"load":this.handleLoadEvent(a);break;case"progress":this.handleProgressEvent(a);break;case"abort":this.handleAbortEvent(a);break;case"error":this.handleErrorEvent(a);break}};iAd.XHRLoader.prototype.handleLoadEvent=function(a){this.notifyLoaderDidComplete()};iAd.XHRLoader.prototype.handleProgressEvent=function(a){if(a.lengthComputable){this.bytesLoaded=a.loaded;this.bytesTotal=a.total}this.notifyLoaderDidProgress()};iAd.XHRLoader.prototype.handleAbortEvent=function(a){this.notifyLoaderDidFail(iAd.Loader.LOAD_ABORTED)};iAd.XHRLoader.prototype.handleErrorEvent=function(a){this.notifyLoaderDidFail(iAd.Loader.LOAD_ERROR)};