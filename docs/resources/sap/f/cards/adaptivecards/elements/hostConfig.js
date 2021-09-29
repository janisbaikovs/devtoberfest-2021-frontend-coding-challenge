/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/theming/Parameters"],function(e){"use strict";return{spacing:{small:8,default:16,medium:32,large:48,extraLarge:48,padding:16},separator:{lineThickness:1,lineColor:e.get("sapUiToolbarSeparatorColor")},supportsInteractivity:true,fontTypes:{default:{fontFamily:e.get("sapUiFontFamily"),fontSizes:{small:12,default:14,medium:14,large:16,extraLarge:20}},monospace:{}},containerStyles:{default:{backgroundColor:"transparent",foregroundColors:{default:{default:e.get("sapUiBaseText"),subtle:e.get("sapUiContentLabelColor")},accent:{default:e.get("sapUiInformativeText")},attention:{default:e.get("sapUiNegativeText")},good:{default:e.get("sapUiPositiveText")},warning:{default:e.get("sapUiCriticalText")}}},emphasis:{backgroundColor:e.get("sapUiNeutralBG"),foregroundColors:{default:{default:e.get("sapUiBaseText")},accent:{default:e.get("sapUiInformativeText")},attention:{default:e.get("sapUiNegativeText")},good:{default:e.get("sapUiPositiveText")},warning:{default:e.get("sapUiCriticalText")}}},accent:{backgroundColor:e.get("sapUiInformationBG"),foregroundColors:{default:{default:e.get("sapUiBaseText")},accent:{default:e.get("sapUiInformativeText")},attention:{default:e.get("sapUiNegativeText")},good:{default:e.get("sapUiPositiveText")},warning:{default:e.get("sapUiCriticalText")}}},good:{backgroundColor:e.get("sapUiSuccessBG"),foregroundColors:{default:{default:e.get("sapUiBaseText")},accent:{default:e.get("sapUiInformativeText")},attention:{default:e.get("sapUiNegativeText")},good:{default:e.get("sapUiPositiveText")},warning:{default:e.get("sapUiCriticalText")}}},attention:{backgroundColor:e.get("sapUiErrorBG"),foregroundColors:{default:{default:e.get("sapUiBaseText")},accent:{default:e.get("sapUiInformativeText")},attention:{default:e.get("sapUiNegativeText")},good:{default:e.get("sapUiPositiveText")},warning:{default:e.get("sapUiCriticalText")}}},warning:{backgroundColor:e.get("sapUiWarningBG"),foregroundColors:{default:{default:e.get("sapUiBaseText")},accent:{default:e.get("sapUiInformativeText")},attention:{default:e.get("sapUiNegativeText")},good:{default:e.get("sapUiPositiveText")},warning:{default:e.get("sapUiCriticalText")}}}}}});