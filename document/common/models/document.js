var request = require('request');
var crypto = require('crypto');
var uuid = require('uuid');
var fs = require('fs');

module.exports = function (Document) {
	Document.disableRemoteMethod('exists', true);
	Document.disableRemoteMethod('findOne', true);
	Document.disableRemoteMethod('count', true);
	Document.disableRemoteMethod('invoke', true);
	Document.disableRemoteMethod('update', true);
	Document.disableRemoteMethod('find', true);
	Document.disableRemoteMethod('upsert', true);
	Document.disableRemoteMethod('create', true);
	Document.disableRemoteMethod('findById', true);
	Document.disableRemoteMethod('prototype.updateAttributes', false);
	Document.disableRemoteMethod('deleteById', false);
	Document.disableRemoteMethod('updateAll', true);
	Document.disableRemoteMethod('createChangeStream', true);
	Document.disableRemoteMethod('upsertWithWhere', true);
	Document.disableRemoteMethod('replaceOrCreate', true);
	Document.disableRemoteMethod('replaceById', true);


	/**
	 * Retrieves the Documents based on provided URL.

	 * @param {string} docURL Documents URL of PDF
	 * @callback {Function} callback Callback function
	 */
	Document.findDocumentByUrl = function(docURL, callback){
		var docConfig = Documents.app.get('documentsConfig');
		var secret = docConfig.URL_ENCRYPTION_KEY;		
		var decipher = crypto.createDecipher('aes192', secret);
		var decrypted = decipher.update(docURL, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		var ctx = app.loopback.getCurrentContext();
		ctx.active.http.req.pipe(request(decrypted,function(err){
			if(err){
				fs.exists(decrypted,function(status){
					if(status){
						fs.createReadStream(decrypted).pipe(ctx.active.http.res);
					}
					else{
						callback(errorUtils.populateError(new Error(),
							errorCodes.Documents.createDocument.DOC10003));
					}
				})
			}
		})).pipe(ctx.active.http.res);
	};

	
	/**
	 * Write the Documents bytes to the file system.
	 * @param {bytes} Documents - Bytes.
	 * @callback {Function} callback Callback function
	 */
	Document.createDocument = function (document, callback) {
		var fileUUID = uuid.v4();
		var options = {name:"custom"};
		var writeFileStream = Document.app.models.container.uploadStream(options.name,fileUUID + '_'+ fileName, function(err){

		});
		writeFileStream.write(documents.document,'base64',function(err){
		});
		writeFileStream.on('success', function(){
			callback(null,writeFileStream.path);
		});
		//Incorporated Error Handling
		writeFileStream.on("error", function(err){
			// Log err using banyan as loopback-cmponent-logger does not work here..
			callback(errorUtils.populateError(new Error(),
				errorCodes.Documents.createDocument.DOC10001));
		});
		writeFileStream.end();
	};

	Document.remoteMethod('findDocumentByUrl',
		{
			isStatic: true,
			consumes: [],
			produces: ['application/pdf', 'image/png', 'image/jpeg', 'image/tiff'],
			accepts: [{
				arg: 'docURL',
				type: 'string',
				description: 'document URL of PDF',
				required: true,
				http: {source: 'path'}
			}],
			returns: [{arg: 'data', type: 'Document', root: true}],
			http: {verb: 'get', path: '/:docURL'},
			description: 'Retrieves the PDF or Image of the content based on provided URL.\n'
		}
	);

	Document.remoteMethod('createDocument',
		{
			isStatic: true,
			accepts: [{
				arg: 'document',
				type: 'Document',
				description: 'the document to be created.',
				required: true,
				http: {source: 'body'}
			}],
			returns: [{
				description: 'Successful response',
				type: 'Document',
				arg: 'data',
				root: true
			}],
			http: {verb: 'post', path: '/'},
			description: 'Creates the document.\n'
		}
	);

};