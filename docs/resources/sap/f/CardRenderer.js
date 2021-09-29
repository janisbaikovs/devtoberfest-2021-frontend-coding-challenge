/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library"],function(e){"use strict";var t=e.cards.HeaderPosition;var r={},a=sap.ui.getCore().getLibraryResourceBundle("sap.f");r.render=function(e,a){var i=a.getCardHeader(),d=a.getHeight(),n=i&&a.getCardHeaderPosition()===t.Bottom;e.write("<div");e.writeElementData(a);e.addClass("sapFCard");if(!a.getCardContent()){e.addClass("sapFCardNoContent")}if(n){e.addClass("sapFCardBottomHeader")}e.writeClasses();e.addStyle("width",a.getWidth());if(d&&d!=="auto"){e.addStyle("height",d)}e.writeAccessibilityState(a,{role:"region",labelledby:{value:a.getId()+"-ariaText",append:true}});e.writeStyles();e.write(">");if(i&&a.getCardHeaderPosition()==="Top"){e.renderControl(i)}r.renderContentSection(e,a);if(n){e.renderControl(i)}e.renderControl(a._ariaText);e.write("</div>")};r.renderContentSection=function(e,t){var r=t.getCardContent();if(r){e.write("<div");e.addClass("sapFCardContent");e.writeClasses();e.writeAccessibilityState(t,{role:"group",label:{value:a.getText("ARIA_LABEL_CARD_CONTENT"),append:true}});e.write(">");e.renderControl(r);e.write("</div>")}};return r});