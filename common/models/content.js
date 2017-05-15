'use strict';

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
     * Retrieves all the Content based on content id.

    * @param {string} id Feature to which the Content belongs to (E.g. Account Opening, Login)
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {Content} result Result object
    */
    Content.findContentById = function(id, callback) {
        Content.find({where: {id: id}},function(err,data){
            callback(null,data);
        });
    }
    Content.remoteMethod('findContentById',
    { isStatic: true,
    produces: [ 'application/json' ],
    accepts: 
    [ { arg: 'id',
        type: 'string',
        description: 'Feature to which the Content belongs to (E.g. Account Opening, Login)',
        required: true,
        http: { source: 'path' } } ],
    returns: 
    [ { description: 'Successful Response',
        type: 'Content',
        arg: 'data',
        root: true } ],
    http: { verb: 'get', path: '/:id' },
    description: 'Retrieves all the Content based on content id.\n' }
    );
    /**
     * Update Content based on content id.

    * @param {Content} Content 
    * @param {string} id Id to which the Content belongs to (E.g. Account Opening, Login)
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {Content} result Result object
    */
    Content.updateContetById = function(Content, id, callback) {

    }
    Content.remoteMethod('updateContetById',
    { isStatic: true,
    produces: [ 'application/json' ],
    accepts: 
    [ { arg: 'Content',
        type: 'Content',
        description: '',
        required: true,
        http: { source: 'body' } },
        { arg: 'id',
        type: 'string',
        description: 'Id to which the Content belongs to (E.g. Account Opening, Login)',
        required: true,
        http: { source: 'path' } } ],
    returns: 
    [ { description: 'Successful Response',
        type: 'Content',
        arg: 'data',
        root: true } ],
    http: { verb: 'put', path: '/:id' },
    description: 'Update Content based on content id.\n' }
    );
    /**
     * Updates Content or to make a soft delete based on content id.

    * @param {Content} Content 
    * @param {string} id to which the Content belongs to (E.g. Account Opening, Login)
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {Content} result Result object
    */
    Content.updateContet = function(Content, id, callback) {
    
    }

    Content.remoteMethod('updateContet',
    { isStatic: true,
    produces: [ 'application/json' ],
    accepts: 
    [ { arg: 'Content',
        type: 'Content',
        description: '',
        required: true,
        http: { source: 'body' } },
        { arg: 'id',
        type: 'string',
        description: 'Id to which the Content belongs to (E.g. Account Opening, Login)',
        required: true,
        http: { source: 'path' } } ],
    returns: 
    [ { description: 'Successful Response',
        type: 'Content',
        arg: 'data',
        root: true } ],
    http: { verb: 'patch', path: '/:id' },
    description: 'Updates Content or to make a soft delete based on content id.\n' }
    );

   
    /**
     * Default Get to fetch all the Content instances based on filters

    * @param {string} filter filter expression provided by calling application
    * @callback {Function} callback Callback function
    * @param {Error|string} err Error object
    * @param {Content} result Result object
    */
    Content.findContent = function(filter, callback) {
        Content.find({where: {status: 'CREATED'}, limit: 3},function(err,data){
            callback(null,data);
        });
    }
    Content.remoteMethod('findContent',
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
    description: 'Default Get to fetch all the Content instances based on filters\n' }
    );
    /**
     * Creates the Content.
     * @param {Content} Content the Content to be created.
     * @callback {Function} callback Callback function
     * @param {Error|string} err Error object
     * @param {any} result Result object
     */
    Content.createContent = function(Content, callback) {
        this.create(Content).then(function(data){
            callback(null,data);
        });
    }

    Content.remoteMethod('createContent',
    { isStatic: true,
    consumes: [ 'application/json' ],
    accepts: 
    [ { arg: 'Content',
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
