sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("com.ust.northwind.northwind.controller.Master", {
        onInit() {
            const oModel = this.getOwnerComponent().getModel();
            oModel.read("/Customers", {
                success: (oData) => {
                    const oJsonModel = new JSONModel(oData);
                    this.getView().setModel(oJsonModel, "products");
                },
                error: (err) => {
                    // Handle error case
                    console.error("Failed to load customers:", err);
                }
            });
        },

        onCreate() {
            const oView = this.getView();
            this._pDialog = this.loadFragment({
                name: "com.ust.northwind.northwind.fragments.CreateProduct"
            }).then(oDialog => {
                oView.addDependent(oDialog);
                oDialog.open();
            });
        },
        onSubmitPressed(){
            const oDialog = this.getView().byId("idCreateProduct");
            MessageToast.show("Customer Details submitted Sucessfully");
        },
        onCancelPressed() {
            const oDialog = this.getView().byId("idCreateProduct");
            if (oDialog) {
                oDialog.close();
                oDialog.destroy();
            }
        },

        onListItemPress(oEvent) {
            const oItem = oEvent.getSource();
            const oContext = oItem.getBindingContext("products");
            const sCustId = oContext.getObject().CustomerID;
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail", {
                productId: sCustId
            });
        }
    });
});
