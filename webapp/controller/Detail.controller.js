sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("com.ust.northwind.northwind.controller.Detail", {
        onInit() {
            const router = this.getOwnerComponent().getRouter();
            router.getRoute("RouteDetail").attachPatternMatched(this.handleRouteMatched, this);
        },

        handleRouteMatched(event) {
            const { productId } = event.getParameter("arguments"); // Get the customer ID
            const customerPath = "/Customers";
            const model = this.getView().getModel();

            // Fetch the customers' data from the backend
            model.read(customerPath, {
                success: (data) => this.onDataFetchSuccess(productId, data),
                error: this.onDataFetchError
            });
        },

        onDataFetchSuccess(productId, data) {
            console.log(data);

            // Filter for a single customer by CustomerID
            const selectedCustomer = data.results.find(({ CustomerID }) => 
                CustomerID && CustomerID.toString() === productId.toString()
            );

            if (selectedCustomer) {
                // Bind the selected customer's data to the view model
                const jsonModel = new JSONModel(selectedCustomer); // Bind as a single object
                this.getView().setModel(jsonModel, "selectedCustomer");
            }
        },

        onDataFetchError(error) {
            console.error(`Error fetching data: ${error}`);
        }
    });
});
