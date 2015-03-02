/**
 * Created by alexandr.dascal on 2/25/2015.
 */

(function () {
    'use strict';

    angular.module('angular-m-validation.directives')
        .directive('mValidation', ['$injector', function ($injector) {
            var $scope,
                mValidationProvider;

            var setup = function (injector) {
                $scope = injector.get('$scope');
                mValidationProvider = injector.get('mValidationProvider');
            };

            var parseSchema = function (schemaName) {
                var schema = $scope[schemaName] || mValidationProvider.getSchema(schemaName);

                if (!schema) {
                    throw new Error('Schema not found');
                }
                return schema;
            };

            var parseSchemaElements = function (schema, validateOn) {
                var schemaElements = [];
                var schemaGlobals = schema.globals || schema.__globals;
                for (var prop in schema) {
                    if (schema.hasOwnProperty(prop)) {
                        var schemaElement = schema[prop];

                        schemaElement.validateOn = schemaElement.validateOn ||
                                                    schemaGlobals.validateOn ||
                                                    validateOn;

                        if (schemaElement.validateOn === 'change') {
                            // remove old watcher
                            if (schemaElement.watcher) {
                                schemaElement.watcher();
                            }

                            schemaElement.name = schemaElement.name || prop;
                            schemaElement.watcher = $scope.$watch(schemaElement.name, function() {
                                // validate
                            });
                        }

                        schemaElements.push(schemaElement);
                    }
                }

                return schemaElements;
            };

            var parseFormElements = function(form, schema, validateOn, schemaElements) {
                var formElements = [];
                var schemaGlobals = schema.globals || schema.__globals;

                var angularFormElement = angular.element(form);
                var angularFormElements = angularFormElement.find('input, select, textarea');
                angular.forEach(angularFormElements, function(element) {
                    var elementName = element.attr('name');

                    if(angular.isDefined(elementName)) { // only if name attribute is defined, we can make association
                        var schemaElement = schemaElements.find(function(schemaElement) {
                            return schemaElement.name === elementName;
                        });

                        schemaElement.formElement = element;
                    }

                    var elementValidateOn = element.attr('validateOn') ||
                                            schemaGlobals.validateOn ||
                                            validateOn;

                    if(elementValidateOn === 'blur') {
                        // validate
                    }
                });

                return formElements;
            };

            var parse = function(form, schemaName, validateOn) {
                var schema = parseSchema(schemaName);
                var schemaElements = parseSchemaElements(schema, validateOn);
                var formElements = parseFormElements(form, schema, validateOn, schemaElements);

                if(validateOn === 'submit') {
                    // validate
                }

                return {
                    schema: schema,
                    schemaElements: schemaElements,
                    formElements: formElements
                };
            };

            return {
                restrict: 'AE',
                compile: function (form, attrs) {
                    setup($injector);

                    if (angular.isUndefined(attrs.schema)) {
                        throw new Error('Schema is not defined');
                    }

                    attrs.$observe('schema', function (schemaName) {
                        parse(form, schemaName, attrs.validateOn);
                    });

                    attrs.$observe('validateOn', function (validateOn) {
                        parse(form, attrs.schema, validateOn);
                    });

                    parse(form, attrs.schema, attrs.validateOn);
                }
            };
        }]);
})();