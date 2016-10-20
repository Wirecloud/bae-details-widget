/*
 * bae-details
 * https://github.com/mognom/bae-details-widget
 *
 * Copyright (c) 2016 CoNWeT
 * Licensed under the MIT license.
 */

/*global MashupPlatform, angular, StyledElements */

angular
    .module('widget', ['ngMaterial', 'ngResource', "angularMoment"])
    .controller('WidgetCtrl', function ($scope, $resource) {
        "use strict";

        var init = function init () {

            MashupPlatform.wiring.registerCallback('offering', function (offering) {
                // Clear view
                $scope.offering = [];
                $scope.$apply();

                // Create tabs
                var notebook = new StyledElements.Notebook({});
                document.getElementById("container").appendChild(notebook.wrapperElement);

                // Only create component tab if theres any component.
                if (offering.allProducts.some(function (product) {
                    return product.asset && product.asset.resourceType === "Wirecloud component";
                })) {
                    var widgetData = notebook.createTab({
                        label: "Components",
                        closable: false
                    });
                    widgetData.wrapperElement.appendChild(document.getElementById("components"));
                } else {
                    document.getElementById("components").remove();
                }

                var tabData = notebook.createTab({
                    label: "Products",
                    closable: false
                });

                tabData.wrapperElement.appendChild(document.getElementById("products"));

                var tabPayment = notebook.createTab({
                    label: "Pricing",
                    closable: false
                });
                tabPayment.wrapperElement.appendChild(document.getElementById("paymentInfo"));

                // Update view
                $scope.offering = offering;
                $scope.getDefaultImage = getDefaultImage;
                $scope.getPriceAlterationData = getPriceAlterationData;
                $scope.getPanelType = getPanelType;
                $scope.onToggleInstall = toggleInstall;
                $scope.$apply();
            });
        };

        // Return the first attached image
        var getDefaultImage = function getDefaultImage (product) {
            var attachments = product.attachment;
            if (attachments) {
                for (var i = 0; i < attachments.length; i++) {
                    if (attachments[i].type === "Picture") {
                        return attachments[i].url;
                    }
                }
            }
            return "";
        };

        var getPriceAlterationData = function getPriceAlterationData (price) {
            var aux = price.productOfferPriceAlteration.price;
            return Object.keys(aux)[0] + ": " + aux[Object.keys(aux)[0]];
        };

        var getPanelType = function getPanelType(priceplan) {
            return "panel-heading-" + priceplan.priceType;
        };

        // Install / uninstall target offering
        var toggleInstall = function toggleInstall (product) {
            if (!(product.asset && product.asset.resourceType === "Wirecloud component")) {
                return;
            }

            if (product.installed) {
                var meta = product.asset.metadata;
                MashupPlatform.components.uninstall(meta.vendor, meta.name, meta.version);
            } else {
                MashupPlatform.components.install(getAssetUrl(product));
            }

            product.installed = !product.installed;
        };

        //Get the location of a product's asset.
        var getAssetUrl = function getAssetUrl (product) {
            for (var i = 0; i < product.productSpecCharacteristic.length; i++) {
                if (product.productSpecCharacteristic[i].name === "Location") {
                    return product.productSpecCharacteristic[i].productSpecCharacteristicValue[0].value;
                }
            }
        };

        init();
    });