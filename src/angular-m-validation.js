/**
 * Created by alexandr.dascal on 2/24/2015.
 */

(function () {
    'use strict';

    angular.module('angular-m-validation', [
        'angular-m-validation.rules',
        'angular-m-validation.providers',
        'angular-m-validation.directives'
    ]);

    angular.module('angular-m-validation.rules', []);
    angular.module('angular-m-validation.providers', []);
    angular.module('angular-m-validation.directives', [
        'angular-m-validation.rules',
        'angular-m-validation.providers'
    ]);
})();