/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ViewRenderer"],function(e){"use strict";var i={};i.render=function(t,r){var a=t;a.write("<div");a.writeControlData(r);a.addClass("sapUiView");a.addClass("sapUiHTMLView");e.addDisplayClass(a,r);if(r.getWidth()){a.addStyle("width",r.getWidth())}if(r.getHeight()){a.addStyle("height",r.getHeight())}a.writeStyles();a.writeClasses();a.write(">");if(r._oTemplate){var d=r._oTemplate.innerHTML;var n=r.getContent();var s=[];var l=function(e){var t=i._getHTML(a,e,d);if(t){d=t}else{s.push(e)}};if(n){if(Array.isArray(n)){for(var g=0;g<n.length;g++){l(n[g])}}else if(n){l(n)}}a.write(d);for(var g=0;g<s.length;g++){a.renderControl(s[g])}}a.write("</div>")};i._getHTML=function(e,i,t){var r=i.getId();t=t.replace(/(<div)/gi,"\n$1");var a=new RegExp('<div.*?data-sap-ui-id="'+r+'".*?></div>',"gi");var d=a.exec(t);if(d){t=t.replace(d[0],e.getHTML(i));return t}else{return""}};return i},true);