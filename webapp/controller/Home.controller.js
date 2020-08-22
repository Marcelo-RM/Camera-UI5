sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter"
], function (Controller, formatter) {
	"use strict";

	return Controller.extend("project.camera.controller.App", {

		formatter: formatter,

		onInit: function () {
		},

		selectImage: function (oEvent) {
			var sUrl = oEvent.getParameter("image");

			this.getView().byId('image').setSrc(sUrl);
		}
	});
});