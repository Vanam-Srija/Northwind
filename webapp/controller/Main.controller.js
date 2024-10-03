sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller,JsonModel) {
    "use strict";
    return Controller.extend("com.ust.northwind.northwind.controller.Main", {
        onInit: function () {
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/Customers",{
             success:function(oData, response){
                var oJsonModel = new JsonModel();
                oJsonModel.setData(oData);
                that.getView().setModel(oJsonModel, "customers");
            },
             error:function(err){
             }
            });
        }
    });
});
