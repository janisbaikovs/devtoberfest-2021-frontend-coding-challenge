/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/library","sap/f/library","sap/ui/dom/includeScript","sap/f/cards/BaseContent","sap/ui/integration/thirdparty/adaptivecards","sap/ui/integration/thirdparty/adaptivecards-templating","sap/f/cards/adaptivecards/elements/UI5InputText","sap/f/cards/adaptivecards/elements/UI5InputNumber","sap/f/cards/adaptivecards/elements/UI5InputChoiceSet","sap/f/cards/adaptivecards/elements/UI5InputTime","sap/f/cards/adaptivecards/elements/UI5InputDate","sap/f/cards/adaptivecards/elements/UI5InputToggle","sap/f/cards/adaptivecards/overwrites/ActionRender","sap/f/cards/adaptivecards/elements/hostConfig","sap/ui/model/json/JSONModel","sap/base/Log"],function(e,t,n,r,a,i,s,o,d,p,u,c,h,l,f,y){"use strict";var C=r.extend("sap.f.cards.AdaptiveContent",{renderer:{apiVersion:2,render:function(e,t){var n=r.getMetadata().getRenderer();return n.render.apply(this,arguments)}}});C.prototype.init=function(){this._bComponentsReady=false;this._bAdaptiveCardElementsReady=false;this._setupAdaptiveCardDependency();this._loadDependencies()};C.prototype.setConfiguration=function(e){this._oCardConfig=e;if(e&&e.request&&e.request.url){this._loadManifestFromUrl(e.request.url);return}this._setupMSCardContent()};C.prototype._loadManifestFromUrl=function(e){var t=new f,n=this;t.loadData(e).then(function(){n._oCardConfig=t.getData();n._setupMSCardContent()}).then(function(){t.destroy();t=null}).catch(function(){y.error("No JSON file found on this URL. Please provide a correct path to the JSON-serialized card object model file.")})};C.prototype.onAfterRendering=function(){this._setupMSCardContent()};C.prototype._setupAdaptiveCardDependency=function(){this.adaptiveCardInstance=new a.AdaptiveCard;this._doMSCardsOverwrites();this._adjustHostConfig();this._handleActions();this._replaceElements();this._isRtl()};C.prototype._doMSCardsOverwrites=function(){a.Action.prototype.render=h};C.prototype._adjustHostConfig=function(){this.adaptiveCardInstance.hostConfig=new a.HostConfig(l)};C.prototype._isRtl=function(){this.adaptiveCardInstance.isRtl=function(){return sap.ui.getCore().getConfiguration().getRTL()}};C.prototype._handleActions=function(){this.adaptiveCardInstance.onExecuteAction=function(t){var n,r,i;if(t instanceof a.OpenUrlAction){r={url:t.url};n=e.CardActionType.Navigation}else if(t instanceof a.SubmitAction){r=t.data;n=e.CardActionType.Submit}else{return}i=this.getActions();if(i){i.fireAction(this,n,r)}}.bind(this)};C.prototype._replaceElements=function(){a.AdaptiveCard.elementTypeRegistry.unregisterType("Input.Text");a.AdaptiveCard.elementTypeRegistry.registerType("Input.Text",function(){return new s});a.AdaptiveCard.elementTypeRegistry.unregisterType("Input.Number");a.AdaptiveCard.elementTypeRegistry.registerType("Input.Number",function(){return new o});a.AdaptiveCard.elementTypeRegistry.unregisterType("Input.ChoiceSet");a.AdaptiveCard.elementTypeRegistry.registerType("Input.ChoiceSet",function(){return new d});a.AdaptiveCard.elementTypeRegistry.unregisterType("Input.Time");a.AdaptiveCard.elementTypeRegistry.registerType("Input.Time",function(){return new p});a.AdaptiveCard.elementTypeRegistry.unregisterType("Input.Date");a.AdaptiveCard.elementTypeRegistry.registerType("Input.Date",function(){return new u});a.AdaptiveCard.elementTypeRegistry.unregisterType("Input.Toggle");a.AdaptiveCard.elementTypeRegistry.registerType("Input.Toggle",function(){return new c})};C.prototype._setupMSCardContent=function(){var e=this.$(),t=this._oCardConfig,n;if(!this.adaptiveCardInstance||!t||!(e&&e.size())){return}n=t.$data||t.data;if(!n){this._renderMSCardContent(t);return}if(t.$data){n={json:n}}this._setData(n)};C.prototype._setData=function(e){var t,n,r,a="";if(e&&e.path){a=e.path}if(this._oDataProvider){this._oDataProvider.destroy()}if(this._oDataProviderFactory){this._oDataProvider=this._oDataProviderFactory.create(e,this._oServiceManager)}if(this._oDataProvider){this.setBusy(true);n=this.setModel(new f);this._oDataProvider.attachDataChanged(function(e){r=e.getParameter("data");this._updateModel(r);if(a.length){r=n.getProperty(a)}t=this._setTemplating(this._oCardConfig,r);t&&this._renderMSCardContent(t);this.setBusy(false)}.bind(this));this._oDataProvider.attachError(function(e){this._handleError(e.getParameter("message"));this.setBusy(false)}.bind(this));this._oDataProvider.triggerDataUpdate().then(function(){this.fireEvent("_dataReady")}.bind(this))}else{this.fireEvent("_dataReady")}};C.prototype._renderMSCardContent=function(e){var t=this.$();if(this.adaptiveCardInstance&&e&&t&&t.size()){this.adaptiveCardInstance.parse(e);t.html(this.adaptiveCardInstance.render());this._bAdaptiveCardElementsReady=true;this._fireCardReadyEvent()}};C.prototype._fireCardReadyEvent=function(){if(this._bAdaptiveCardElementsReady&&this._bComponentsReady){this._bReady=true;this.fireEvent("_ready")}};C.prototype._setTemplating=function(e,t){var n=new i.Template(e),r=new i.EvaluationContext;r.$root=t;return n.expand(r)};C.prototype._loadDependencies=function(){if(document.querySelector("#webcomponents-loader")){this._bComponentsReady=true;this._fireCardReadyEvent();return}n({id:"webcomponents-loader",url:sap.ui.require.toUrl("sap/ui/integration/thirdparty/webcomponents/webcomponentsjs/webcomponents-loader.js")});document.addEventListener("WebComponentsReady",function(){n({id:"webcomponents-bundle",attributes:{type:"module"},url:sap.ui.require.toUrl("sap/ui/integration/thirdparty/webcomponents/bundle.esm.js")});n({id:"webcomponents-bundle-es5",attributes:{nomodule:"nomodule"},url:sap.ui.require.toUrl("sap/ui/integration/thirdparty/webcomponents/bundle.es5.js")});this._bComponentsReady=true;this._fireCardReadyEvent()}.bind(this))};return C});