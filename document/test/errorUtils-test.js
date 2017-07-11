'use strict'

var errorUtils = require('../common/utils/errorUtils');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
describe('Error Utils test cases', function(){
    it('should throw invalid error call', function(done){
        var error = errorUtils.populateError(undefined);
        expect(error).to.be.an('error');
        done();
    });
});