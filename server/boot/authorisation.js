var debug = require('debug') ('authorisation');
module.exports = function(app) {
    var promise = require('bluebird');
    var User = app.models.User;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    User.create([
        {username: 'John', email: 'john@doe.com', password: 'password'},
        {username: 'Bob', email: 'bob@doe.com', password: 'password'},
    ], function(err, users) {
        if(err){
            debug('error occured while creating users',err);
            throw err;
        }else{
            debug('Users created successfully');
            var role = [{
                name:'consumer',
                userId:users[0].id
            },{
                name:'admin',
                userId:users[1].id
            }];
            role.forEach(function(role){
                createRoleAndMapping(role.name,role.userId);
            });
        }
        
    });

    function createRoleAndMapping(roleName,userId){
        Role.create({
                name: roleName
                }, function(err, role) {
                if (err) throw err;
                debug('Role created successfully');
                console.log('Created role:', role);

                //make bob an admin
                role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: userId
                }, function(err, principal) {
                    if (err) throw err;
                    debug('Principle mapping done successfully');
                    console.log('Created principal:', principal);
                });
            });
    }
}