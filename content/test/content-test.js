'use strict'

//var content = require('../common/models/content.js');
var app = require('../server/server.js');
var supertest = require('supertest')(app);
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var authorization = require('./test-utils/authorization')

describe('Content service test cases', function(){
	before(function(done){
		authorization.createUserAndMapping();
		done();
	});
	describe('Create content test cases', function(){
		var authorization;

		before(function(done){
			var userCredentials = {
				"email" : "bob@doe.com", 
				"password": "password"
			}
			supertest.post('/api/Users/login')
				.expect(200)
				.send(userCredentials)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						authorization = res.body.id;
						res.status.should.equal(200);
						expect(res.body).to.have.a.property('id');
						done();
					}
				});
		});

		after(function(done){
			done();
		});

		it('it should create content successfully', function(done){
			var createContentRequest = {
				"id": 1,
				"title": "sample",
				"workflowList": [
					{
					  "userName": "content"
					}
				]
			}
			supertest.post('/api/Contents')
				.set('Content-Type', 'application/json')
            	.set('Authorization', authorization)
				.expect(200)
				.send(createContentRequest)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						res.status.should.equal(200);
						expect(res.body).to.have.a.property('id');
						done();
					}
				});
		});
		it('it should throw undefined version error while creating content', function(done){
			var createContentRequest = {
				"id": 1,
				"title": "sample",
				"workflowList": [
					{
					  "userName": "content"
					}
				],
				"version":undefined
			}
			supertest.post('/api/Contents')
				.set('Content-Type', 'application/json')
            	.set('Authorization', authorization)
				.expect(500)
				.send(createContentRequest)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						res.status.should.equal(500);
						expect(res.body).to.have.a.property('error');
						done();
					}
				});
		});
		it('it should throw error while creating content', function(done){
			var createContentRequest = {
				"id": 1,
				"title": "sample",
				"workflowList": [
					{
					  "userName": "content"
					}
				]
			}
			supertest.post('/api/Contents')
				.set('Content-Type', 'application/json')
            	.set('Authorization', authorization)
				.expect(500)
				.send(createContentRequest)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						res.status.should.equal(500);
						expect(res.body).to.have.a.property('error');
						done();
					}
				});
		});

		it('it should not create content successfully', function(done){
			var createContentRequest = {
				"id": 2,
				"title": "sample",
				"workflowList": [
					{
					  "userName": "content"
					}
				]
			}
			supertest.post('/api/Contents')
				.expect(401)
				.send(createContentRequest)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {					
						res.status.should.equal(401);
						res.body.error.message == 'Authorization Required';
						expect(res.body.error).to.have.a.property('statusCode');
						done();
					}
				});
		});
	});

	describe('Update content test cases', function(){
		var authorization;
		before(function(done){
			var userCredentials = {
				"email" : "bob@doe.com", 
				"password": "password"
			}
			supertest.post('/api/Users/login')
				.expect(200)
				.send(userCredentials)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						authorization = res.body.id;
						res.status.should.equal(200);
						expect(res.body).to.have.a.property('id');
						done();
					}
				});
		});

		after(function(done){
			done();
		});
		it('it should Update content successfully', function(done){
			var updateContentRequest = {
				"id": 1,
				"title": "sample",
				"workflowList": [
					{
					  "userName": "content"
					}
				],
				"version":"1.0"
			}		
			supertest.put('/api/Contents')
				.set('Content-Type', 'application/json')
            	.set('Authorization', authorization)
				.expect(200)
				.send(updateContentRequest)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						res.status.should.equal(200);
						expect(res.body).to.have.a.property('id');
						done();
					}
				});
		});
		it('it should throw error for undefined version while updating content', function(done){
			var updateContentRequest = {
				"id": 1,
				"title": "sample",
				"workflowList": [
					{
					  "userName": "content"
					}
				]
			}		
			supertest.put('/api/Contents')
				.set('Content-Type', 'application/json')
            	.set('Authorization', authorization)
				.expect(500)
				.send(updateContentRequest)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						res.status.should.equal(500);
						expect(res.body).to.have.a.property('error');
						done();
					}
				});
		});
	});
	describe('Update workflow test cases', function(){
		var authorization;
		before(function(done){
			var userCredentials = {
				"email" : "bob@doe.com", 
				"password": "password"
			}
			supertest.post('/api/Users/login')
				.expect(200)
				.send(userCredentials)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						authorization = res.body.id;
						res.status.should.equal(200);
						expect(res.body).to.have.a.property('id');
						done();
					}
				});
		});

		after(function(done){
			done();
		});
		it('it should Update workflowList successfully', function(done){
			var updateWorkflowRequest = {
				"id": 1,
				"title": "sampleUpdated",
				"workflowList": [
					{
					  "userName": "workflow updated"
					}
				]
			}		
			supertest.patch('/api/Contents')
				.set('Content-Type', 'application/json')
            	.set('Authorization', authorization)
				.expect(200)
				.send(updateWorkflowRequest)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						res.status.should.equal(200);
						expect(res.body).to.have.a.property('id');
						expect(res.body).to.have.a.property('workflowList');
						done();
					}
				});
		});
	});

	describe('Find All content test cases', function(){
		var authorization;

		before(function(done){
			var userCredentials = {
				"email" : "john@doe.com", 
				"password": "password"
			}
			supertest.post('/api/Users/login')
				.expect(200)
				.send(userCredentials)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						authorization = res.body.id;
						res.status.should.equal(200);
						expect(res.body).to.have.a.property('id');
						done();
					}
				});
		});

		after(function(done){
			done();
		});

		it('it should find all content successfully', function(done){
			supertest.get('/api/Contents')
				.set('Content-Type', 'application/json')
            	.set('Authorization', authorization)
				.expect(200)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						res.status.should.equal(200);
						done();
					}
				});
		});
		it('it should return error while fetching content', function(done){
			supertest.get('/api/Contents?filter=%%')
				.set('Content-Type', 'application/json')
            	.set('Authorization', authorization)
				.expect(400)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						res.status.should.equal(400);
						done();
					}
				});
		});
		it('it should not find all content successfully', function(done){
			var authorization = 'yAHJhjkHA';
			supertest.get('/api/Contents')
				.set('Content-Type', 'application/json')
            	.set('Authorization', authorization)
				.expect(401)
				.end(function(err, res){
					if (err) {
						throw err;
					} else {
						res.status.should.equal(401);
						res.body.error.message == 'Authorization Required';
						expect(res.body.error).to.have.a.property('statusCode');
						done();
					}
				});
		});
	});
});