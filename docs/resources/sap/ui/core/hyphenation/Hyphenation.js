/*!
* OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/ui/base/ManagedObject","sap/base/Log","sap/base/util/deepEqual","sap/ui/core/Locale","sap/ui/core/LocaleData"],function(e,n,i,t,a){"use strict";var o={bg:"непротивоконституционствувателствувайте",ca:"Psiconeuroimmunoendocrinologia",hr:"prijestolonasljednikovičičinima",cs:"nejnezdevětadevadesáteronásobitelnějšími",da:"Gedebukkebensoverogundergeneralkrigskommandersergenten",nl:"meervoudigepersoonlijkheidsstoornissen","en-us":"pneumonoultramicroscopicsilicovolcanoconiosis",et:"Sünnipäevanädalalõpupeopärastlõunaväsimus",fi:"kolmivaihekilowattituntimittari",fr:"hippopotomonstrosesquippedaliophobie",de:"Kindercarnavalsoptochtvoorbereidingswerkzaamhedenplan","el-monoton":"ηλεκτροεγκεφαλογράφημα",hi:"किंकर्तव्यविमूढ़",hu:"Megszentségteleníthetetlenségeskedéseitekért",it:"hippopotomonstrosesquippedaliofobia",lt:"nebeprisikiškiakopūstlapiaujančiuosiuose","nb-no":"supercalifragilisticexpialidocious",pl:"dziewięćdziesięciokilkuletniemu",pt:"pneumoultramicroscopicossilicovulcanoconiose",ru:"превысокомногорассмотрительствующий",sr:"Семпаравиливичинаверсаламилитипиковски",sl:"Dialektičnomaterialističen",es:"Electroencefalografistas",sv:"Realisationsvinstbeskattning",th:"ตัวอย่างข้อความที่จะใช้ในการยืนยันการถ่ายโอน",tr:"Muvaffakiyetsizleştiricileştiriveremeyebileceklerimizdenmişsinizcesine",uk:"Нікотинамідаденіндинуклеотидфосфат"};var r={bg:true,ca:true,hr:true,cs:false,// no valid license
da:true,nl:true,"en-us":true,et:true,fi:true,fr:true,de:true,"el-monoton":true,hi:true,hu:true,it:true,lt:true,"nb-no":true,pl:false,// no valid license
pt:true,ru:true,sr:false,// no valid license
sl:true,es:true,sv:true,th:true,tr:true,uk:true};var s={bg:"Bulgarian",ca:"Catalan",hr:"Croatian",cs:"Czech",da:"Danish",nl:"Dutch",en:"English",et:"Estonian",fi:"Finnish",fr:"French",de:"German",el:"Greek",hi:"Hindi",hu:"Hungarian",it:"Italian",lt:"Lithuanian",nb:"Norwegian Bokmål",no:"Norwegian",pl:"Polish",pt:"Portuguese",ru:"Russian",sr:"Serbian",sl:"Slovenian",es:"Spanish",sv:"Swedish",th:"Thai",tr:"Turkish",uk:"Ukrainian"};var u={};var p={};var h={};var l=null;var c=null;var d={};var f={};var g=[];var y={};function v(e,i,t){n.info("[UI5 Hyphenation] Initializing third-party module for language "+U(e),"sap.ui.core.hyphenation.Hyphenation.initialize()");window.hyphenopoly.initializeLanguage(i).then(b.bind(this,e,t))}function m(e,i,t){n.info("[UI5 Hyphenation] Re-initializing third-party module for language "+U(e),"sap.ui.core.hyphenation.Hyphenation.initialize()");window.hyphenopoly.reInitializeLanguage(e,i).then(b.bind(this,e,t))}function b(e,n,i){d[e]=i;l.bIsInitialized=true;if(g.length>0){g.forEach(function(e){v(e.sLanguage,e.oConfig,e.resolve)});g=[]}l.bLoading=false;n(P(e))}function w(e,i){var t={require:[e],hyphen:"­",leftmin:3,rightmin:3,compound:"all",path:sap.ui.require.toUrl("sap/ui/thirdparty/hyphenopoly")};if(i){if("hyphen"in i){t.hyphen=i.hyphen}if("minWordLength"in i){t.minWordLength=i.minWordLength}if("exceptions"in i){n.info("[UI5 Hyphenation] Add hyphenation exceptions '"+JSON.stringify(i.exceptions)+"' for language "+U(e),"sap.ui.core.hyphenation.Hyphenation");var a=[];Object.keys(i.exceptions).forEach(function(e){a.push(i.exceptions[e])});if(a.length>0){t.exceptions={};t.exceptions[e]=a.join(", ")}}}return t}function k(e,n){return new Promise(function(i,t){var a=document.createElement("script");a.async=true;a.src=e+n;a.addEventListener("load",i);a.addEventListener("error",function(){return t("Error loading script: "+n)});a.addEventListener("abort",function(){return t(n+" Script loading aborted.")});document.head.appendChild(a)})}var z=function e(){var n=["visibility:hidden;","-moz-hyphens:auto;","-webkit-hyphens:auto;","-ms-hyphens:auto;","hyphens:auto;","width:48px;","font-size:12px;","line-height:12px;","border:none;","padding:0;","word-wrap:normal"];return n.join("")}();function L(e){if(!c){c=document.createElement("body")}var n=document.createElement("div");n.lang=e;n.id=e;n.style.cssText=z;n.appendChild(document.createTextNode(o[e]));c.appendChild(n)}function H(e){if(c){e.appendChild(c);return c}return null}function I(){if(c){c.parentNode.removeChild(c)}}function x(e){return e.style.hyphens==="auto"||e.style.webkitHyphens==="auto"||e.style.msHyphens==="auto"||e.style["-moz-hyphens"]==="auto"}function E(e){var n;if(e){n=new t(e)}else{n=sap.ui.getCore().getConfiguration().getLocale()}var i=n.getLanguage().toLowerCase();switch(i){case"en":i="en-us";break;case"nb":i="nb-no";break;case"no":i="nb-no";break;case"el":i="el-monoton";break}return i}function P(e){if(typeof e==="string"){return e.substring(0,2)}else{return null}}function U(e){var n=P(e);if(s.hasOwnProperty(n)){return"'"+s[n]+"' (code:'"+n+"')"}else{return"'"+n+"'"}}function O(e){l.fireError(e);n.error("[UI5 Hyphenation] "+e,"sap.ui.core.hyphenation.Hyphenation")}var j=e.extend("sap.ui.core.hyphenation.Hyphenation",{metadata:{library:"sap.ui.core",events:{error:{parameters:{sErrorMessage:{type:"string"}}}}}});j.prototype.canUseNativeHyphenation=function(e){var i=E(e);var t;if(!this.isLanguageSupported(e)){return null}if(!u.hasOwnProperty(i)){L(i);var a=H(document.documentElement);if(a!==null){var o=document.getElementById(i);if(x(o)&&o.offsetHeight>12){t=true}else{t=false}I()}u[i]=t;if(t){n.info("[UI5 Hyphenation] Browser-native hyphenation can be used for language "+U(i),"sap.ui.core.hyphenation.Hyphenation.canUseNativeHyphenation()")}else{n.info("[UI5 Hyphenation] Browser-native hyphenation is not supported by current platform for language "+U(i),"sap.ui.core.hyphenation.Hyphenation.canUseNativeHyphenation()")}}else{t=u[i]}return t};j.prototype.canUseThirdPartyHyphenation=function(e){var i=E(e),t;if(!this.isLanguageSupported(e)){return null}if(!h.hasOwnProperty(i)){t=r.hasOwnProperty(i)&&r[i];if(t){n.info("[UI5 Hyphenation] Third-party hyphenation can be used for language "+U(i),"sap.ui.core.hyphenation.Hyphenation.canUseThirdPartyHyphenation()")}else{n.info("[UI5 Hyphenation] Third-party hyphenation is not supported for language "+U(i),"sap.ui.core.hyphenation.Hyphenation.canUseThirdPartyHyphenation()")}h[i]=t}else{t=h[i]}return t};j.prototype.isLanguageSupported=function(e){var i=E(e),t;if(!p.hasOwnProperty(i)){t=o.hasOwnProperty(i);if(!t){n.info("[UI5 Hyphenation] Language "+U(i)+" is not known to the Hyphenation API","sap.ui.core.hyphenation.Hyphenation.isLanguageSupported()")}p[i]=t}else{t=p[i]}return t};j.prototype.hyphenate=function(e,n){var i=E(n);if(!d.hasOwnProperty(i)){O("Language "+U(i)+" is not initialized. You have to initialize it first with method 'initialize()'");return e}return d[i](e)};j.prototype.getInitializedLanguages=function(){return Object.keys(d).map(function(e){return P(e)})};j.prototype.isLanguageInitialized=function(e){var e=E(e);return Object.keys(d).indexOf(e)!=-1};j.prototype.getExceptions=function(e){var e=E(e);if(this.isLanguageInitialized(e)){return window.hyphenopoly.languages[e].exceptions}else{O("Language "+U(e)+" is not initialized. You have to initialize it first with method 'initialize()'")}};j.prototype.addExceptions=function(e,i){var e=E(e);if(this.isLanguageInitialized(e)){n.info("[UI5 Hyphenation] Add hyphenation exceptions '"+JSON.stringify(i)+"' for language "+U(e),"sap.ui.core.hyphenation.Hyphenation.addExceptions()");Object.keys(i).forEach(function(n){window.hyphenopoly.languages[e].cache[n]=i[n];window.hyphenopoly.languages[e].exceptions[n]=i[n]})}else{O("Language "+U(e)+" is not initialized. You have to initialize it first with method 'initialize()'")}};j.prototype.initialize=function(e,n){var t=E(e);var n=w(t,n);var a=true;if(y[t]&&i(y[t],n)){a=false}y[t]=n;if(r[t]){if(!l.bIsInitialized&&!l.bLoading){l.bLoading=true;f[t]=new Promise(function(e,i){k(n.path,"/hyphenopoly.bundle.js").then(v.bind(this,t,n,e))});return f[t]}else if(l.bLoading&&!d[t]&&f[t]){return f[t]}else if(this.isLanguageInitialized(t)){if(a){f[t]=new Promise(function(e){m(t,n,e)})}}else{f[t]=new Promise(function(e,i){if(!l.bIsInitialized){g.push({sLanguage:t,oConfig:n,resolve:e})}else{v(t,n,e)}})}l.bLoading=true;return f[t]}else{var o="Language "+U(e)+" can not be initialized. It is either not supported by the third-party module or an error occurred";O(o);return new Promise(function(e,n){n(o)})}};j.getInstance=function(){if(!l){l=new j;l.bIsInitialized=false;l.bLoading=false}return l};return j});