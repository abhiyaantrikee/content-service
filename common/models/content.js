'use strict';

var Promise = require('bluebird');
var errorUtils = require('../utils/errorUtils');
module.exports = function(Content) {
    Content.disableRemoteMethod('find', false);
	Content.disableRemoteMethod('exists', true);
	Content.disableRemoteMethod('findOne', true);
	Content.disableRemoteMethod('count', true);
	Content.disableRemoteMethod('invoke', true);
	Content.disableRemoteMethod('update', true);
	Content.disableRemoteMethod('upsert', true);
	Content.disableRemoteMethod('create', true);
	Content.disableRemoteMethod('findById', true);
	Content.disableRemoteMethod('prototype.updateAttributes', true);
	Content.disableRemoteMethod('deleteById', true);
	Content.disableRemoteMethod('updateAll', true);
	Content.disableRemoteMethod('createChangeStream', true);
    Content.disableRemoteMethod('replaceOrCreate', true);
    Content.disableRemoteMethod('upsertWithWhere', true);
    Content.disableRemoteMethod('replaceById', true);
    /**
     * Fetch all the Content

    * @param {string} filter filter expression provided by calling application
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {Content} result Result object
    */
    Content.findAllContent = function(filter, callback) {
        Content.app.models.Content.find({where:filter},function(err,data){
            if(err){
                callback(err);
            }else {
                callback(null,data);
            }
        });
    }
    Content.remoteMethod('findAllContent',
    { isStatic: true,
    accepts: 
    [ { arg: 'filter',
        type: 'string',
        description: 'filter expression provided by calling application',
        required: false,
        http: { source: 'query' } } ],
    returns: 
    [ { description: 'Successful Response',
        type: 'Content',
        arg: 'data',
        root: true } ],
    http: { verb: 'get', path: '/' },
    description: 'Fetch all the Content\n' }
    );
    /**
     * Update the Content.
    * @param {Content} content 
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {Content} result Result object
    */
    Content.updateContet = function(Content, callback) {
        //Content.replaceOrCreate(Content)
    }
    Content.remoteMethod('updateContet',
    { isStatic: true,
    produces: [ 'application/json' ],
    accepts: 
    [ { arg: 'content',
        type: 'Content',
        description: '',
        required: true,
        http: { source: 'body' } } ],
    returns: 
    [ { description: 'Successful Response',
        type: 'Content',
        arg: 'data',
        root: true } ],
    http: { verb: 'put', path: '/' },
    description: 'Update the Content.\n' }
    );
    /**
     * Updates WorkFlow of the content.
    * @param {Content} content 
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {Content} result Result object
    */
    Content.updateWorkflow = function(content, callback) {
    
    }

    Content.remoteMethod('updateWorkflow',
    { isStatic: true,
    produces: [ 'application/json' ],
    accepts: 
    [ { arg: 'content',
        type: 'Content',
        description: '',
        required: true,
        http: { source: 'body' } } ],
    returns: 
    [ { description: 'Successful Response',
        type: 'Content',
        arg: 'data',
        root: true } ],
    http: { verb: 'patch', path: '/' },
    description: 'Updates WorkFlow of the content.\n' }
    );
    /*
	 Function for updating document version
	 */
	exports.updateDocVersion = function (existingContent, content, callback) {
		if (existingContent === undefined || existingContent.length === 0) {
			content.version = '1.00';
			callback(null, content);
		}
		else {
			if ((existingContent.length > 0) && (content.version === undefined || content.version === null || content.version === '')) {
				callback(errorUtils.populateError(new Error(), errorCodes.Content.createContent.CNT100));
			}
			else {
				var docVersion = existingContent[0].version;
				if (docVersion.split('.')[1] !== 99 && content.majorVersionFlag === false) {
					content.version = (docVersion.split('.')[0]) + '.' + ((parseFloat(docVersion.split('.')[1], 10) + 101).toString().substr(1));
					callback(null, content);
				}
				else {
					content.version = (parseFloat(docVersion.split('.')[0]) + 1) + '.00';
					callback(null, content);
				}
			}
		}
	};
    /**
     * Creates the Content.
    * @param {Content} content the Content to be created.
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {any} result Result object
    */
    Content.createContent = function(content, callback) {
        var query = {'where': {'title': content.title, 'category': content.category}, order: 'version DESC', limit: 1};
        try{
            var findExistingContentP = Promise.promisify(Content.app.models.Content.find,{context: Content.app.models.Content});
            var updateContentVersionP = Promise.promisify(exports.updateDocVersion);
            var createContentP = Promise.promisify(Content.app.models.Content.create, {context: Content.app.models.Content});

            findExistingContentP(query)
                .then(function(existingContent){
                    return new Promise(function(resolve, reject){
                        updateContentVersionP(existingContent, content, function(err, data){
                            if(err){
                                reject(err);
                            }else {
                                resolve(data);
                            }
                        });
                    })
                })
                .then(createContentP)
                .then(function(result){
                    callback(null,result);
                })
                .catch(function(err){
                    callback(err);
                })
        }catch(error){
            callback(error);
        }
    }

    Content.remoteMethod('createContent',
    { isStatic: true,
    consumes: [ 'application/json' ],
    accepts: 
    [ { arg: 'content',
        type: 'Content',
        description: 'the Content to be created.',
        required: true,
        http: { source: 'body' } } ],
    returns:
    [ { description: 'Successful Response',
        type: 'Content',
        arg: 'data',
        root: true } ],
    http: { verb: 'post', path: '/' },
    description: 'Creates the Content.\n' }
    );
};