/**
 * Created by Alexandr.Dascal on 3/3/2015.
 */

'use strict';

var sharedConfig = require('karma-shared.conf');

module.exports = function(config) {
    var conf = sharedConfig();

    conf.files = conf.files.concat([
        //extra testing code
        'bower_components/angular-mocks/angular-mocks.js',

        //test files
        'test/unit/**/*.js'
    ]);

    config.set(conf);
};