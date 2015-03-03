/**
 * Created by Alexandr.Dascal on 3/3/2015.
 */

'use strict';

module.exports = function() {
    return {
        basePath: '../',
        frameworks: ['jasmine'],
        reporters: ['progress'],
        browsers: ['Chrome'],
        autoWatch: true,

        // these are default values anyway
        singleRun: false,
        colors: true,

        files : [
            //3rd Party Code
            'bower_components/angular/angular.js',

            //App-specific Code
            'src/directives/mValidationDirective.js',
            'src/directives/mValidationMessageDirective.js',
            'src/directives/mValidationSummaryDirective.js',
            'src/providers/mValidationProvider.js',
            'src/providers/mValidationMessageProvider.js',
            'src/providers/mValidationSummaryProvider.js',
            'src/angular-m-validation.js'
        ]
    };
};