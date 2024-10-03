sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller,JsonModel) {
    "use strict";

    return Controller.extend("com.ust.northwind.northwind.controller.Master", {
        onInit: function () {
            //debugger;
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/Customers",{
             success:function(oData, response){
                var oJsonModel = new JsonModel();
                oJsonModel.setData(oData);
                that.getView().setModel(oJsonModel, "products");
            },
             error:function(err){
             }
            });
        },
       /*  onCreate: function() {
            var oView = this.getView();
            this._pDialog = this.loadFragment({
                name: "com.ust.northwind.northwind.fragments.CreateProduct"
                }).then(function (oDialog) {
                oView.addDependent(oDialog);
                oDialog.open();
            }.bind(this));
        }, */
 
        onCancelPressed: function() {
            var oDialog = this.getView().byId("idCreateProduct");
            oDialog.close();
            oDialog.destroy();
        },
        onListItemPress: function(oEvent) {
            var oItem = oEvent.getSource();   
            var sempItem = oItem.getBindingContext("products");
            var sCustId = sempItem.getObject();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail", {
                productId: sCustId.CustomerID
            });
        }
        
        /* ,
        
        onListItemPress1: function(oEvent){ */
            /* var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("products");
            var oRowData= oContext.getObject();
            var oRouter = this.getOwnerComponent().getRouter();
            
            oRouter.navTo("RouteDetail",{
               productId: oRowData.CustomerID,
               productName: oRowData.Country
            }); */

			/* const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("RouteDetail", {
				productId: window.encodeURIComponent(oItem.getBindingContext("products").getPath().substr(1))
			}); */
           /*  const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail", {
                productId: window.encodeURIComponent(oItem.getBindingContext("products").getObject().CustomerID)
            });
        } */
    });
});
