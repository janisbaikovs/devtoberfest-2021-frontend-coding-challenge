/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library","sap/f/cards/BaseContent","sap/m/HBox","sap/m/VBox","sap/m/Text","sap/m/Title","sap/f/Avatar","sap/m/Link","sap/m/Label","sap/ui/core/ResizeHandler","sap/ui/layout/AlignedFlowLayout","sap/ui/dom/units/Rem","sap/f/cards/BindingHelper","sap/f/cards/IconFormatter"],function(e,t,a,r,s,i,n,o,d,l,p,u,c,f){"use strict";var h=e.cards.AreaType;var m=t.extend("sap.f.cards.ObjectContent",{renderer:{}});m.prototype._getRootContainer=function(){if(this._bIsBeingDestroyed){return null}var e=this.getAggregation("_content");if(!e){e=new p;this.setAggregation("_content",e)}this._sResizeListenerId=l.register(e,this.onAlignedFlowLayoutResize.bind(this));return e};m.prototype.onAlignedFlowLayoutResize=function(e){if(e&&e.size.width===e.oldSize.width&&!e.control){return}var t=e.control,a=t.getMinItemWidth(),r=t.getContent().length,s;if(a.lastIndexOf("rem")!==-1){s=u.toPx(a)}else if(a.lastIndexOf("px")!==-1){s=parseFloat(a)}var i=Math.floor(e.size.width/s);if(i>r){i=r}if(this._iColsOld===i){return}this._iColsOld=i;var n=i-1,o=Math.ceil(r/i);t.getContent().forEach(function(e,t){e.addStyleClass("sapFCardObjectSpaceBetweenGroup");if(n===t&&n<r){e.removeStyleClass("sapFCardObjectSpaceBetweenGroup");n+=i}if(t+1>(o-1)*i){e.addStyleClass("sapFCardObjectGroupLastInColumn")}else{e.removeStyleClass("sapFCardObjectGroupLastInColumn")}})};m.prototype.exit=function(){t.prototype.exit.apply(this,arguments);if(this._sResizeListenerId){l.deregister(this._sResizeListenerId);this._sResizeListenerId=""}};m.prototype.setConfiguration=function(e){t.prototype.setConfiguration.apply(this,arguments);if(!e){return this}if(e.groups){this._addGroups(e)}return this};m.prototype._addGroups=function(e){var t=this._getRootContainer();var l=e.groups||[];l.forEach(function(e){var l=(new r).addStyleClass("sapFCardObjectGroup");var p=new i({text:e.title}).addStyleClass("sapFCardObjectItemTitle");l.addItem(p);e.items.forEach(function(e){var t,i=e.label,p=e.value,u,h,m=[];if(i){i=c.formattedProperty(i,function(e){return e&&e[e.length-1]===":"?e:e+=":"});u=new d({text:i}).addStyleClass("sapFCardObjectItemLabel")}if(p){switch(e.type){case"link":t=new o({href:e.url||p,text:p,target:e.target||"_blank"});break;case"email":if(e.value){m.push(jQuery.extend({},e.value))}if(e.emailSubject){m.push(jQuery.extend({},e.emailSubject))}h=c.formattedProperty(m,function(e,t){if(t){return"mailto:"+e+"?subject="+t}else{return"mailto:"+e}});t=new o({href:h,text:p});break;case"phone":h=c.formattedProperty(p,function(e){return"tel:"+e});t=new o({href:h,text:p});break;default:t=new s({text:p});break}}if(t){t.addStyleClass("sapFCardObjectItemText")}if(e.icon){var y=c.formattedProperty(e.icon.src,function(e){return f.formatSrc(e,this._sAppId)}.bind(this));var C=new n({customDisplaySize:"2.5rem",displaySize:"Custom",src:y}).addStyleClass("sapFCardObjectItemAvatar sapFCardObjectItemLabel");var b=new r({items:[u,t]});var g=new a({items:[C,b]});l.addItem(g)}else{l.addItem(u);l.addItem(t)}},this);t.addContent(l)},this);this._oActions.setAreaType(h.Content);this._oActions.attach(e,this)};return m});