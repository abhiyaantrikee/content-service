'use strict';

//process.env.CONFIG_DIR = __dirname + '/../definitions/sample';
//process.env.NODE_ENV = 'production';
//process.env.KEYNAME = '/../production';

// 1st WAY TO IMPLEMENT 

//----------------------------------------------

// var env = {
//     PORT: 9000,
//     NODE_ENV: 'production' };

// var fs = require('fs');
// var YAML = require('yamljs')
// var yamlstr = YAML.stringify(env);
// fs.writeFileSync(__dirname+'/../node_modules/microgateway/env.yaml', yamlstr);

// var mg = require('microgateway');
//----------------------------------------------


// 2nd WAY TO IMPLEMENT 

//----------------------------------------------
var mg = require('microgateway/lib/microgw');
mg.start(3000);
console.log('STARTED GATEWAY ********************* ');
//----------------------------------------------