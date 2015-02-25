/**
 * Created by alexandr.dascal on 2/25/2015.
 */

(function () {
    'use strict';

    angular.module('angular-m-validation.directives')
        .directive('mValidation', ['$injector', function ($injector) {
            var $scope,
                mValidationProvider,
                schemaElements = [],
                formElements = [];

            var setup = function(injector) {
                $scope = injector.get('$scope');
                mValidationProvider = injector.get('mValidationProvider');
            };

            return {
                restrict: 'A',
                require: '^ngForm',
                compile: function(form, formAttrs) {
                    setup($injector);

                    var schemaName = formAttrs.schema;

                    var schema = $scope[schemaName] || mValidationProvider.getSchema(schemaName);

                    if (!schema) {
                        throw new Error('Schema not found');
                    }

                    var schemaGlobals = schema.globals || {};
                    var schemaProperties = schema.properties || {};

                    var formValidateOn = formAttrs.validateOn || schemaGlobals.validateOn;
                    var formElements = form.querySelectorAll('input, select, textarea');
                }
            };
        }]);
})();