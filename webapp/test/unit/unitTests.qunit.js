/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comustnorthwind/northwind/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
