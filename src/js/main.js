/*
 * bae-details
 * https://github.com/mognom/bae-details-widget
 *
 * Copyright (c) 2016 CoNWeT Lab., Universidad Politécnica de Madrid
 * Licensed under the Apache-2.0 license.
 */

/* globals MashupPlatform, moment, angular, StyledElements */

angular
    .module('widget', ['ngMaterial', 'ngResource', "angularMoment"])
    .directive('checkImage', function () {
        "use strict";
        return {
            link: function (scope, element, attrs) {
                element.bind("error", function () {
                    element.attr("src", scope.baseUrl + "/resources/core/images/default-no-image.png"); // set default image
                });
            }
        };
    })
    .controller('WidgetCtrl', function ($scope, $resource) {
        "use strict";

        var callback;
        var init = function init() {

            MashupPlatform.wiring.registerCallback('offering', function (data) {

                var offering = data.offering;
                callback = data.callback;

                // Clear view
                $scope.offering = null;
                $scope.$apply();
                $scope.baseUrl = MashupPlatform.prefs.get('server_url');
                $scope.getOfferingTime = getOfferingTime;

                // Create tabs
                var notebook = new StyledElements.Notebook({});
                document.getElementById("container").appendChild(notebook.wrapperElement);

                var tabDetails = notebook.createTab({
                    label: "Details",
                    closable: false
                });
                tabDetails.wrapperElement.appendChild(document.getElementById("details"));

                var tabProducts = notebook.createTab({
                    label: "Products",
                    closable: false
                });
                tabProducts.wrapperElement.appendChild(document.getElementById("products"));

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
        var getDefaultImage = function getDefaultImage(product) {
            var attachments = product.attachment;
            var url;
            for (var i = 0; i < attachments.length; i++) {
                if (attachments[i].type === "Picture") {
                    url = attachments[i].url;
                    break;
                }
            }

            if (url && url !== "") {
                return url;
            } else {
                return $scope.baseUrl + "/resources/core/images/default-no-image.png";
            }
        };

        var getOfferingTime = function getOfferingTime() {
            return moment($scope.offering.lastUpdate).format("dddd, MMMM Do YYYY, h:mm:ss a");
        };

        var getPriceAlterationData = function getPriceAlterationData(price) {
            var aux = price.productOfferPriceAlteration.price;
            return Object.keys(aux)[0] + ": " + aux[Object.keys(aux)[0]];
        };

        var getPanelType = function getPanelType(priceplan) {
            return "panel-heading-" + priceplan.priceType;
        };

        // Install / uninstall target offering
        var toggleInstall = function toggleInstall(product) {
            if (!(product.asset && product.asset.resourceType === "Wirecloud component")) {
                return;
            }

            var promise;
            var market_info = {
                name: "admin/fiware-bae",
                store: "fiware-bae",
            };

            if (product.installed) {
                var meta = product.asset.metadata;
                promise = MashupPlatform.components.uninstall(meta.vendor, meta.name, meta.version);
            } else {
                promise = MashupPlatform.components.install(getAssetUrl(product), market_info);
            }

            promise.then(function () {
                callback(product, !product.installed);
            });
        };

        // Get the location of a product's asset.
        var getAssetUrl = function getAssetUrl(product) {
            for (var i = 0; i < product.productSpecCharacteristic.length; i++) {
                if (product.productSpecCharacteristic[i].name === "Location") {
                    return product.productSpecCharacteristic[i].productSpecCharacteristicValue[0].value;
                }
            }
        };

        init();
    });
