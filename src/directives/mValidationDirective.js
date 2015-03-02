/**
 * Created by alexandr.dascal on 2/25/2015.
 */

(function () {
    'use strict';

    angular.module('angular-m-validation.directives')
        .directive('mValidation', ['$injector', function ($injector) {
            var $scope,
                mValidationProvider,
                $this = this;

            var setup = function (injector) {
                $scope = injector.get('$scope');
                mValidationProvider = injector.get('mValidationProvider');
            };

            $this.parseSchema = function (schemaName) {
                var schema = $scope[schemaName] || mValidationProvider.getSchema(schemaName);

                if (!schema) {
                    throw new Error('Schema not found');
                }
                return schema;
            };

            $this.parseSchemaElements = function (schema, validateOn) {
                var schemaElements = [];
                for (var prop in schema) {
                    if (schema.hasOwnProperty(prop)) {
                        var schemaGlobals = schema.globals || schema.__globals;

                        var schemaElement = angular.copy(schema[prop]);

                        schemaElement.validateOn = schemaElement.validateOn ||
                                                    schema.validateOn ||
                                                    schemaGlobals.validateOn ||
                                                    validateOn;

                        if (validateOn === 'change') {
                            // remove old watcher
                            if (schemaElement.watcher) {
                                schemaElement.watcher();
                            }

                            var schemaElementName = schemaElement.name || prop;
                            schemaElement.watcher = $scope.$watch(schemaElementName, function() {
                                // validate
                            });
                        }

                        schemaElements.push(schemaElement);
                    }
                }

                return schemaElements;
            };

            return {
                restrict: 'AE',
                compile: function (element, attrs) {
                    setup($injector);

                    if (angular.isUndefined(attrs.schema)) {
                        throw new Error('Schema is not defined');
                    }

                    var schema = $this.parseSchema(attrs.schema);
                    var schemaElements = $this.parseSchemaElements(schema, attrs.validateOn);

                    attrs.$observe('schema', function (schemaName) {
                        var schema = $this.parseSchema(schemaName);
                        var schemaElements = $this.parseSchemaElements(schema, attrs.validateOn);
                    });

                    attrs.$observe('validateOn', function (validateOn) {
                        var schemaElements = $this.parseSchemaElements(schema, validateOn);
                    });
                }
            };
        }]);
})();