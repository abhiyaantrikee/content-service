'use strict';
var request = require('request');
var crypto = require('crypto');
var uuid = require('uuid');
var fs = require('fs');
var debug = require('debug')('document');
module.exports = function(Document) {
    Document.disableRemoteMethod('exists', true);
	Document.disableRemoteMethod('findOne', true);
	Document.disableRemoteMethod('count', true);
	Document.disableRemoteMethod('invoke', true);
	Document.disableRemoteMethod('update', true);
	Document.disableRemoteMethod('find', true);
	Document.disableRemoteMethod('upsert', true);
	Document.disableRemoteMethod('create', true);
	Document.disableRemoteMethod('findById', true);
	Document.disableRemoteMethod('prototype.updateAttributes', true);
	Document.disableRemoteMethod('deleteById', true);
	Document.disableRemoteMethod('updateAll', true);
	Document.disableRemoteMethod('createChangeStream', true);
	Document.disableRemoteMethod('upsertWithWhere', true);
	Document.disableRemoteMethod('replaceOrCreate', true);
	Document.disableRemoteMethod('replaceById', true);
    Document.disableRemoteMethod('createContainer', true);
    Document.disableRemoteMethod('getContainers', true);
    Document.disableRemoteMethod('getContainer', true);
    Document.disableRemoteMethod('getFiles', true);
    Document.disableRemoteMethod('getFile', true);
    Document.disableRemoteMethod('removeFile', true);
    Document.disableRemoteMethod('uploadStream', true);
    Document.disableRemoteMethod('downloadStream', true);
    Document.disableRemoteMethod('destroyContainer', true);
    /**
     * Call /:container/upload to create a document in container
     * @param {*} content 
     * @param {*} data 
     * @param {*} callback 
     */
    function callRestAPI(document, accesstoken, data, callback){
        debug('inside call rest api.... *********************************************** ');
        var docConfig = Document.app.get('documentsConfig');
        var url = docConfig.createUrl+ data.name + '/upload';
        debug('inside call URI .... *********************************************** ', url);
        var req = request.post({
            url:url,
            qs:{
                'access_token': accesstoken.access_token
            },
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }, function(err, response, body){
            debug('Rest api.... *********************************************** ',err, response,body);
            if(err){
                callback(err);
            }else{
                callback(null, JSON.parse(body));
            }
        });
        var form = req.form();
        form.append('file', new Buffer(document.document), {filename: document.name+"_v"+document.version});
    }
    /**
     * Create document based on bytes recieved in payload.
    * @param {Document} content the Content to be created.
    * @param {string} accesstoken access token
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {any} result Result object
    */
    Document.createDocument = function(document, access_token, callback) {
        //var container = content.feature + '-'+ content.version
        Document.getContainer(document.feature, function(err, data){
            debug('inside createDocument api.... *********************************************** ',err, data);
            if(err && err.code === 'ENOENT'){
                var options = {
                    name: document.feature
                }
                Document.createContainer(options, function(err, data){
                    debug('inside create container api.... *********************************************** ',err, data);
                    if(err){
                        callback(err);
                    }else{
                        callRestAPI(document, access_token, data, callback);
                    }
                })
            } else {
                callRestAPI(document, access_token, data, callback);
            }
        });
    }

    Document.remoteMethod('createDocument',
    { isStatic: true,
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    accepts: 
    [ { arg: 'document',
        type: 'Document',
        description: 'the Content to be created.\n',
        required: true,
        http: { source: 'body' } },
        { arg: 'access_token',
        type: 'object',
        description: 'access token',
        required: true,
        http: function(ctx){
            
            var param={};
            var req = ctx.req;
            param.access_token = req.query.access_token;
            debug('ACCESS_TOKEN $$$$$$$$$$$$$$$$$$$$$$$$$$$$$', param.access_token);
            return param;
        } } ],
    returns: [
        { description: 'Successful Response',
        type: 'Object',
        arg: 'data',
        root: true }
    ],
    http: { verb: 'post', path: '/create' },
    description: 'Create document based on bytes recieved in payload.\n' }
    );

};