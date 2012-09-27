
/**
*
* Copyright © 2009-2011 Apple Inc.  All rights reserved.
*
**/

iAd.Transaction={transitions:[],openTransactions:0,defaults:{},defaultsStates:[]};iAd.Transaction.begin=function(){if(this.openTransactions==0){this.transitions=[];this.defaults={}}else{var a={};iAd.Utils.copyPropertiesFromSourceToTarget(this.defaults,a);this.defaultsStates.push(a)}this.openTransactions++};iAd.Transaction.addTransition=function(b){for(var a in this.defaults){if(b[a]==null){b[a]=this.defaults[a]}}this.transitions.push(b)};iAd.Transaction.commit=function(){if(this.openTransactions==0){return}this.openTransactions--;if(this.openTransactions!=0){this.defaults=this.defaultsStates.pop();return}var c=this.transitions;for(var a=0,b=c.length;a<b;a++){c[a].applyFromState()}iAd.CSS.flushPendingUpdates();setTimeout(function(){while(c.length){c.pop().applyToState()}},0)};iAd.Utils.setupDisplayNames(iAd.Transaction,"iAd.Transaction");