'use strict';

//define variables
var Promise = require('bluebird');
var errorUtils = require('../utils/errorUtils');
var debug = require('debug') ('content');
var errorCodes = require('../utils/errorCodes');
module.exports = function(Content) {
    Content.disableRemoteMethod('find', true);
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
     * Fetch all the Content. Filter would be used to filter out the results and to fetch limited data set.

    * @param {string} filter filter expression provided by calling application
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {Content} result Result object
    */
    Content.findAllContent = function(filter, access_token, callback) {
        Content.app.models.Content.find({where:filter},function(err,data){
            if(err){
                debug('Error occured while fetching contents');
                callback(err);
            }else {
                callback(null,data);
            }
        });
    }

    //REMOTE METHOD DEFINITION
    Content.remoteMethod('findAllContent',
    { 
        isStatic: true,
        accepts: 
        [ { arg: 'filter',
            type: 'string',
            description: 'filter expression provided by calling application',
            required: false,
            http: { source: 'query' } 
        },
        {
            arg: 'access_token',
            type: 'string',
            description: 'token to be passed as a header',
            required: false,
            http: {source: 'header'}
        }],
        returns: 
        [ { description: 'Successful Response',
            type: 'Content',
            arg: 'data',
            root: true } ],
        http: { verb: 'get', path: '/' },
        description: 'Fetch all the Content\n' 
    });

    /*
        Private Function for updating document version
    */
	exports.updateDocVersion = function (existingContent, content, callback) {
		if (existingContent === undefined || existingContent.length === 0) {
			content.version = '1.00';
			callback(null, content);
		}
		else {
			if ((existingContent.length > 0) && (content.version === undefined || content.version === null || content.version === '')) {
				callback(errorUtils.populateError(new Error(), errorCodes.createContent.CNT100));
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
    * Update the Content.
    * @param {Content} content 
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {Content} result Result object
    */
    Content.updateContent = function(content, callback) {
       var query = {'where': {'title': content.title}, order: 'version DESC', limit: 1};
        try{
            var findExistingContentP = Promise.promisify(Content.app.models.Content.find,{context: Content.app.models.Content});
            var updateContentVersionP = Promise.promisify(exports.updateDocVersion);
            var updateContentP = Promise.promisify(Content.app.models.Content.replaceOrCreate, {context: Content.app.models.Content});
            //Promisified method call
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
                .then(updateContentP)
                .then(function(result){
                    debug('Successfully updated content');
                    callback(null,result);
                })
                .catch(function(err){
                    callback(err);
                })
        }catch(error){
            debug('Error occured while updating contents', error);
            callback(error);
        }
    }
    //REMOTE METHOD DEFINITION
    Content.remoteMethod('updateContent',
    { 
        isStatic: true,
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
        description: 'Update the Content.\n' 
    }
    );

    /**
    * Updates WorkFlow of the content.
    * @param {Content} content 
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {Content} result Result object
    */
    Content.updateWorkflow = function(content, callback) {
        debug('Inside updateWorkflow method');
        try{
            var data = {};
            data.workflowList = content.workflowList;
            Content.app.models.Content.upsertWithWhere({'id': content.id}, data, function(err,result){
                if(result){
                    debug('Successfully updated WorkFlow');
                    return callback(null, result);
                }else{
                    debug('Error occured while updating WorkFlow', err);
                    callback(err);
                }
            });
        }catch(error){
            debug('Error occured while updating WorkFlow', error);
            callback(error);
        }
    }

    //REMOTE METHOD DEFINITION
    Content.remoteMethod('updateWorkflow',
    { 
        isStatic: true,
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
        description: 'Updates WorkFlow of the content.\n' 
    }
    );

    /**
    * Creates the Content.
    * @param {Content} content the Content to be created.
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {any} result Result object
    */
    Content.createContent = function(content, callback) {
        debug('inside createContent method');
       var query = {'where': {'title': content.title}, order: 'version DESC', limit: 1};
        try{
            var findExistingContentP = Promise.promisify(Content.app.models.Content.find,{context: Content.app.models.Content});
            var updateContentVersionP = Promise.promisify(exports.updateDocVersion);
            var createContentP = Promise.promisify(Content.app.models.Content.create, {context: Content.app.models.Content});
            //Promisified method call
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
                    debug('Successfully updated content');
                    callback(null,result);
                })
                .catch(function(err){
                    callback(err);
                })
        }catch(error){
            debug('Error occurred while creating content', error);
            callback(error);
        }
    }

    //REMOTE METHOD DEFINITION
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
