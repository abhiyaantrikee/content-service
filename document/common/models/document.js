'use strict';
var request = require('request');
var crypto = require('crypto');
var uuid = require('uuid');
var fs = require('fs');
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
	Document.disableRemoteMethod('upload', true);
    /**
     * Call /:container/upload to create a document in container
     * @param {*} content 
     * @param {*} data 
     * @param {*} callback 
     */
    function callRestAPI(content, data, callback){
        var docConfig = Document.app.get('documentsConfig');
        var url = docConfig.createUrl+ data.name + '/upload'
        var req = request.post({
            url:url,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }, function(err, response, body){
            if(err){
                callback(err);
            }else{
                callback(null, JSON.parse(body));
            }
        });
        var form = req.form();
        form.append('file', new Buffer(content.document), {filename: content.name});
    }
    /**
     * Create document based on bytes recieved in payload.
    * @param {Document} content the Content to be created.
    * @param {string} accesstoken access token
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {any} result Result object
    */
    Document.createDocument = function(content, accesstoken, callback) {
        var container = content.feature + '-'+ content.version
        Document.getContainer(container, function(err, data){
            if(err && err.code === 'ENOENT'){
                var options = {
                    name: container
                }
                Document.createContainer(options, function(err, data){
                    if(err){
                        callback(err);
                    }else{
                        callRestAPI(content, data, callback);
                    }
                })
            } else {
                callRestAPI(content, data, callback);
            }
        });
    }

    Document.remoteMethod('createDocument',
    { isStatic: true,
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    accepts: 
    [ { arg: 'content',
        type: 'Document',
        description: 'the Content to be created.\n',
        required: true,
        http: { source: 'body' } },
        { arg: 'accesstoken',
        type: 'string',
        description: 'access token',
        required: true,
        http: { source: 'header' } } ],
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