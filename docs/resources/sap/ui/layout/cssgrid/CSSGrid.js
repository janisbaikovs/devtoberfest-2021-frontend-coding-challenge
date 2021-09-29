/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/layout/cssgrid/GridLayoutBase","sap/ui/layout/cssgrid/GridBasicLayout","sap/ui/layout/cssgrid/GridLayoutDelegate","sap/ui/base/ManagedObjectObserver","sap/ui/layout/library","./CSSGridRenderer"],function(t,e,i,r,o){"use strict";var a=t.extend("sap.ui.layout.cssgrid.CSSGrid",{metadata:{library:"sap.ui.layout",defaultAggregation:"items",interfaces:["sap.ui.layout.cssgrid.IGridConfigurable"],properties:{width:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},gridTemplateColumns:{type:"sap.ui.layout.cssgrid.CSSGridTrack",defaultValue:""},gridTemplateRows:{type:"sap.ui.layout.cssgrid.CSSGridTrack",defaultValue:""},gridRowGap:{type:"sap.ui.core.CSSSize",defaultValue:""},gridColumnGap:{type:"sap.ui.core.CSSSize",defaultValue:""},gridGap:{type:"sap.ui.layout.cssgrid.CSSGridGapShortHand",defaultValue:""},gridAutoRows:{type:"sap.ui.layout.cssgrid.CSSGridTrack",defaultValue:""},gridAutoColumns:{type:"sap.ui.layout.cssgrid.CSSGridTrack",defaultValue:""},gridAutoFlow:{type:"sap.ui.layout.cssgrid.CSSGridAutoFlow",defaultValue:"Row"}},aggregations:{customLayout:{type:"sap.ui.layout.cssgrid.GridLayoutBase",multiple:false},items:{type:"sap.ui.core.Control",multiple:true,singularName:"item",dnd:true}},dnd:{draggable:false,droppable:true}}});a.prototype.setWidth=function(t){this.setProperty("width",t,true);var e=this.getDomRef();if(e){e.style.width=t}return this};a.prototype.getGridDomRefs=function(){return[this.getDomRef()]};a.prototype.getGridLayoutConfiguration=function(){if(this.getCustomLayout()){return this.getCustomLayout()}else{return this._getDefaultGridLayout()}};a.prototype._getDefaultGridLayout=function(){var t=new i({gridTemplateColumns:this.getGridTemplateColumns(),gridTemplateRows:this.getGridTemplateRows(),gridRowGap:this.getGridRowGap(),gridColumnGap:this.getGridColumnGap(),gridGap:this.getGridGap(),gridAutoRows:this.getGridAutoRows(),gridAutoColumns:this.getGridAutoColumns(),gridAutoFlow:this.getGridAutoFlow()});return t};a.prototype.init=function(){this._oItemDelegate={onAfterRendering:this._onAfterItemRendering};this._oGridObserver=new o(a.prototype._onGridChange.bind(this));this._oGridObserver.observe(this,{aggregations:["items"]});this._addGridLayoutDelegate()};a.prototype.exit=function(){this._removeGridLayoutDelegate();if(this._oGridObserver){this._oGridObserver.disconnect();this._oGridObserver=null}};a.prototype._addGridLayoutDelegate=function(){if(!this.oGridLayoutDelegate){this.oGridLayoutDelegate=new r;this.addDelegate(this.oGridLayoutDelegate,false,this,false)}};a.prototype._removeGridLayoutDelegate=function(){if(this.oGridLayoutDelegate){this.removeDelegate(this.oGridLayoutDelegate);this.oGridLayoutDelegate.destroy();this.oGridLayoutDelegate=null}};a.prototype._onGridChange=function(t){if(t.name!=="items"||!t.child){return}if(t.mutation==="insert"){t.child.addEventDelegate(this._oItemDelegate,t.child)}else if(t.mutation==="remove"){t.child.removeEventDelegate(this._oItemDelegate,t.child)}};a.prototype._onAfterItemRendering=function(){e.setItemStyles(this)};a.prototype.onLayoutDataChange=function(t){e.setItemStyles(t.srcControl)};return a});