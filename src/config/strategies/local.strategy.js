var passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy,
 mongodb = require('mongodb');

module.exports = function(){

    passport.use(new LocalStrategy({
            usernameField:'userName',
            passwordField:'password'
        },
        function (username, password, done){

            var url = 'mongodb://localhost:27017';
            mongodb.connect(url, function(err, client){
                var db = client.db('libraryApp');
                var collection = db.collection('users');
                collection.findOne({username: username}, 
                    function(err, result){
                        console.log('finfone', result);
                        if(result != null && result.password == password){
                            var user = result;
                            done(null, user); 
                        }else{
                            done(null, false);
                        }
                });
            });
    }));
}