/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/Context"],function(t,e,n,i){"use strict";var o="sap.ui.model.odata.v4.Context",r,s=0,h=-9007199254740991;function u(t,e,i,o){var r,s=[t.fetchValue(e,null,o)],h=t.getPath(e);if(i){s.push(t.oModel.getMetaModel().fetchUI5Type(h))}return n.all(s).then(function(t){var e=t[1],n=t[0];if(n&&typeof n==="object"){r=new Error("Accessed value is not primitive: "+h);r.isNotPrimitive=true;throw r}return i?e.formatValue(n,"string"):n})}var a=i.extend("sap.ui.model.odata.v4.Context",{constructor:function(t,e,o,r,s,h){if(o[0]!=="/"){throw new Error("Not an absolute path: "+o)}if(o.slice(-1)==="/"){throw new Error("Unsupported trailing slash: "+o)}i.call(this,t,o);this.oBinding=e;this.oCreatePromise=s&&Promise.resolve(s).then(function(){});this.oSyncCreatePromise=s&&n.resolve(s);this.iIndex=r;this.iReturnValueContextId=h}});a.prototype._delete=function(t,e){var n=this;if(this.isTransient()){return this.oBinding._delete(t,"n/a",this)}return this.fetchCanonicalPath().then(function(i){return n.oBinding._delete(t,i.slice(1),n,e)})};a.prototype.adjustPredicate=function(t,e,n){var i=this.sPath;if(i.includes(t)){this.sPath=i.split("/").map(function(n){if(n.endsWith(t)){n=n.slice(0,-t.length)+e}return n}).join("/");if(n){n(i,this.sPath)}this.oModel.getDependentBindings(this).forEach(function(n){n.adjustPredicate(t,e)})}};a.prototype.checkUpdate=function(){return n.all(this.oModel.getDependentBindings(this).map(function(t){return t.checkUpdate()}))};a.prototype.created=function(){return this.oCreatePromise};a.prototype.delete=function(t){var e,n=this.oModel,i=this;n.checkGroupId(t);this.oBinding.checkSuspended();if(!this.isTransient()&&this.hasPendingChanges()){throw new Error("Cannot delete due to pending changes")}e=this.oBinding.lockGroup(t,true,true);return this._delete(e).then(function(){var t=i.sPath.slice(1);n.getAllBindings().forEach(function(e){e.removeCachesAndMessages(t,true)})}).catch(function(t){e.unlock(true);n.reportError("Failed to delete "+i,o,t);throw t})};a.prototype.destroy=function(){this.oModel.getDependentBindings(this).forEach(function(t){t.setContext(undefined)});this.oBinding=undefined;this.oModel=undefined;i.prototype.destroy.call(this)};a.prototype.doSetProperty=function(e,n,i,r){var s=this.oModel.getMetaModel(),h=this;if(this.oModel.bAutoExpandSelect){e=s.getReducedPath(t.buildPath(this.sPath,e),this.oBinding.getBaseForPathReduction())}return this.withCache(function(u,a,d){return d.doSetProperty(a,n,i)||s.fetchUpdateData(e,h,!i).then(function(a){var c=t.getRelativePath(a.entityPath,h.oModel.resolve(d.sPath,d.oContext)),l=false;function f(t){h.oModel.reportError("Failed to update path "+h.oModel.resolve(e,h),o,t);p(false)}function p(t){if(l){d.firePatchCompleted(t);l=false}}function g(){l=true;d.firePatchSent()}if(!i){return u.setProperty(a.propertyPath,n,c)}return u.update(i,a.propertyPath,n,r?undefined:f,a.editUrl,c,s.getUnitOrCurrencyPath(h.oModel.resolve(e,h)),d.isPatchWithoutSideEffects(),g).then(function(){p(true)},function(t){p(false);throw t})})},e,false,true)};a.prototype.fetchCanonicalPath=function(){return this.oModel.getMetaModel().fetchCanonicalPath(this)};a.prototype.fetchValue=function(e,i,o){if(this.iIndex===h){return n.resolve()}if(!e||e[0]!=="/"){e=t.buildPath(this.sPath,e);if(this.oModel.bAutoExpandSelect){e=this.oModel.getMetaModel().getReducedPath(e,this.oBinding.getBaseForPathReduction())}}return this.oBinding.fetchValue(e,i,o)};a.prototype.getBinding=function(){return this.oBinding};a.prototype.getCanonicalPath=t.createGetMethod("fetchCanonicalPath",true);a.prototype.getGroupId=function(){return this.oBinding.getGroupId()};a.prototype.getIndex=function(){if(this.oBinding.bCreatedAtEnd){return this.iIndex<0?this.oBinding.iMaxLength-this.iIndex-1:this.iIndex}return this.getModelIndex()};a.prototype.getModelIndex=function(){if(this.oBinding.iCreatedContexts){return this.iIndex+this.oBinding.iCreatedContexts}return this.iIndex};a.prototype.getObject=function(e){return t.publicClone(this.getValue(e))};a.prototype.getProperty=function(t,n){var i,r;this.oBinding.checkSuspended();r=u(this,t,n,true);if(r.isRejected()){r.caught();i=r.getResult();if(i.isNotPrimitive){throw i}else if(!i.$cached){e.warning(i.message,t,o)}}return r.isFulfilled()?r.getResult():undefined};a.prototype.getReturnValueContextId=function(){if(this.iReturnValueContextId){return this.iReturnValueContextId}if(this.oBinding.bRelative&&this.oBinding.oContext&&this.oBinding.oContext.getReturnValueContextId){return this.oBinding.oContext.getReturnValueContextId()}};a.prototype.getQueryOptionsForPath=function(t){return this.oBinding.getQueryOptionsForPath(t)};a.prototype.getUpdateGroupId=function(){return this.oBinding.getUpdateGroupId()};a.prototype.getValue=function(t){var e,n=this;this.oBinding.checkSuspended();e=this.fetchValue(t,null,true).catch(function(t){if(!t.$cached){n.oModel.reportError("Unexpected error",o,t)}});if(e.isFulfilled()){return e.getResult()}};a.prototype.hasPendingChanges=function(){return this.isTransient()||this.oModel.getDependentBindings(this).some(function(t){return t.hasPendingChanges()})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.sPath.slice(1))};a.prototype.isTransient=function(){return this.oSyncCreatePromise&&this.oSyncCreatePromise.isPending()};a.prototype.patch=function(t){return this.withCache(function(e,n){e.patch(n,t)},"")};a.prototype.refresh=function(t,e){this.oModel.checkGroupId(t);this.oBinding.checkSuspended();if(this.hasPendingChanges()){throw new Error("Cannot refresh entity due to pending changes: "+this)}if(this.oBinding.refreshSingle){this.oBinding.refreshSingle(this,this.oBinding.lockGroup(t,true),e)}else{if(arguments.length>1){throw new Error("Unsupported parameter bAllowRemoval: "+e)}if(!this.oBinding.refreshReturnValueContext(this,t)){this.oBinding.refresh(t)}}this.oModel.withUnresolvedBindings("removeCachesAndMessages",this.sPath.slice(1))};a.prototype.requestCanonicalPath=t.createRequestMethod("fetchCanonicalPath");a.prototype.requestObject=function(e){this.oBinding.checkSuspended();return Promise.resolve(this.fetchValue(e)).then(t.publicClone)};a.prototype.requestProperty=function(t,e){this.oBinding.checkSuspended();return Promise.resolve(u(this,t,e))};a.prototype.requestSideEffects=function(t,e){var i,o=this;function r(t){if(!t){return false}if(t==="*"){return true}if(t.endsWith("/*")){t=t.slice(0,-2)}return!t.includes("*")}this.oBinding.checkSuspended();this.oModel.checkGroupId(e);if(this.isTransient()){throw new Error("Unsupported context: "+this)}if(!t||!t.length){throw new Error("Missing edm:(Navigation)PropertyPath expressions")}if(this.oBinding.isRelative()&&!this.oBinding.getContext()){throw new Error("Cannot request side effects of unresolved binding's context: "+this)}i=t.map(function(t){if(t&&typeof t==="object"){if(r(t.$PropertyPath)){return t.$PropertyPath}if(typeof t.$NavigationPropertyPath==="string"&&!t.$NavigationPropertyPath.includes("*")){return t.$NavigationPropertyPath}}throw new Error("Not an edm:(Navigation)PropertyPath expression: "+JSON.stringify(t))});e=e||this.getUpdateGroupId();return Promise.resolve(n.resolve(this.oModel.isAutoGroup(e)&&this.oModel.oRequestor.waitForRunningChangeRequests(e).then(function(){o.oModel.oRequestor.relocateAll("$parked."+e,e)})).then(function(){return o.requestSideEffectsInternal(i,e)})).then(function(){})};a.prototype.requestSideEffectsInternal=function(e,i){var o=this,r,s,h=o,u,a=this.oModel.getMetaModel(),d=[],c,l=[],f,p,g="",P=[];for(;;){s=h.getBinding();p=s.getPath();c=s.getContext();if(s.oCache&&(!u||s.oCache.hasChangeListeners())){u=h}if(u&&p){break}if(!s.getBoundContext){throw new Error("Not a context binding: "+s)}g=t.buildPath(p,g);h=c}if(g){e=e.map(function(t){return t?g+"/"+t:g})}s=u.getBinding();r=s.getBaseForPathReduction();e.forEach(function(e){var n=a.getReducedPath(t.buildPath(u.getPath(),e),r),i=t.getRelativePath(n,u.getPath());if(i===undefined){l.push(e)}else{d.push(i)}});if(l.length){f=t.getRelativePath(u.getPath(),s.getContext().getPath());l=l.map(function(e){return t.buildPath(f,e)});P.push(s.getContext().requestSideEffectsInternal(l,i))}if(d.length){P.push(s.requestSideEffects(i,d,u))}return n.all(P)};a.prototype.setProperty=function(t,e,n){var i=null;this.oBinding.checkSuspended();if(typeof e==="function"||e&&typeof e==="object"){throw new Error("Not a primitive value")}if(n!==null){this.oModel.checkGroupId(n);i=this.oModel.lockGroup(n||this.getUpdateGroupId(),this,true,true)}return Promise.resolve(this.doSetProperty(t,e,i,true)).catch(function(t){if(i){i.unlock(true)}throw t})};a.prototype.toString=function(){var t="";if(this.iIndex!==undefined){t="["+this.iIndex+(this.isTransient()?"|transient":"")+"]"}return this.sPath+t};a.prototype.withCache=function(e,i,o,r){if(this.iIndex===h){return n.resolve()}return this.oBinding.withCache(e,i[0]==="/"?i:t.buildPath(this.sPath,i),o,r)};r={create:function(t,e,n,i,o){return new a(t,e,n,i,o)},createReturnValueContext:function(t,e,n){s+=1;return new a(t,e,n,undefined,undefined,s)}};Object.defineProperty(r,"VIRTUAL",{value:h});return r},false);