/**
 * Created by Alexandr.Dascal on 3/3/2015.
 */

'use strict';

describe('Unit: Testing mValidationProvider', function() {
    var app = angular.module('angular-m-validation');

    it('Should contain an mValidation provider', function() {
        inject(['mValidation', function(mValidation){
            expect(mValidation).not.to.equal(null);
        }]);
    });
});