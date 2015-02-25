/**
 * Created by alexandr.dascal on 2/25/2015.
 */

(function () {
    'use strict';

    angular.module('angular-m-validation.providers')
        .provider('mValidation', function () {
            var $injector,
                $rootScope,
                $this = this;

            var setup = function (injector) {
                $injector = injector;
                $rootScope = injector.get('$rootScope');
            };

            var schemas = {};

            $this.defineSchema = function (key, schema) {
                if (!$this.hasSchema(key)) {
                    throw new Error('Schema "' + key + '" already is defined.');
                }

                (function (key, schema) {
                    var _key = key;
                    var _schema = schema;

                    Object.defineProperty(schemas, _key, {
                        __proto__: null,
                        value: _schema,
                        get: function () {
                            return _schema;
                        },
                        set: function (value) {
                            _schema = value;
                            $rootScope.$broadcast('scheme-' + _key + '-updated', _key, _schema);
                        }
                    });
                })
                (key, schema);

                $rootScope.$broadcast('scheme-' + key + '-defined', key, schema);

                return true;
            };

            $this.hasSchema = function (key) {
                return schemas.hasOwnProperty(key);
            };

            $this.getSchema = function (key) {
                if (!$this.hasSchema(key)) {
                    throw new Error('Schema \'' + key + '\' is not defined');
                }

                return schemas[key];
            };

            $this.setSchema = function (key, schema) {
                if ($this.hasSchema(key)) {
                    schemas[key] = schema;
                }
                else {
                    $this.defineSchema(key, schema);
                }

                return true;
            };

            $this.$get = ['$injector', function ($injector) {
                setup($injector);

                return {
                    hasSchema: $this.hasSchema,
                    getSchema: $this.getSchema,
                    setSchema: $this.setSchema
                };
            }];
        });
})();