sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.ust.northwind.northwind.controller.Detail", {
        onInit: function () {
            const router = this.getOwnerComponent().getRouter();
            router.getRoute("RouteDetail").attachPatternMatched(this.handleRouteMatched, this);
        },

        handleRouteMatched: function (event) {
            const productId = event.getParameter("arguments").productId;
            const customerPath = "/Customers";
            const model = this.getView().getModel();

            model.read(customerPath, {
                success: this.onDataFetchSuccess.bind(this, productId),
                error: this.onDataFetchError
            });
        },

        onDataFetchSuccess: function (productId, data) {
            console.log(data);
            const filteredCustomers = this.filterCustomers(data.results, productId);
            const jsonModel = new JSONModel();
            jsonModel.setData({ Customers: filteredCustomers });
            this.getView().setModel(jsonModel, "products1");
        },

        onDataFetchError: function (error) {
            console.error("Error fetching data", error);
        },

        filterCustomers: function (customers, productId) {
            return customers.filter(customer => {
                return customer.CustomerID && customer.CustomerID.toString() === productId.toString();
            });
        }
    });
});
