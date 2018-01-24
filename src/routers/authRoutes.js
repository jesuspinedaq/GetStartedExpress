var express = require('express');
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var authRoutes = express.Router();

authRoutes.route('/signUp')
    .post(function(req, res){

        var user = {
            username: req.body.userName,
            password: req.body.password
        };

        var url = 'mongodb://localhost:27017';
        mongodb.connect(url, function(err, client){
            var db = client.db('libraryApp');
            var collection = db.collection('users');
            collection.insert(user, function(err, result){
                if(err){ res.send(err);
                    return;
                }

                req.login(result.ops[0], function(){
                    res.redirect('/auth/profile');
                });
            });
        });
    });

 authRoutes.route('/profile')
    .all(function(req, res, next){
        if(!req.user){
            res.redirect('/');
        }
        next();
    })
    .get(function(req, res){
        res.json(req.user);
    });
authRoutes.route('/signin')
    .post(passport.authenticate('local',{failureRedirect:'/'}), function(req, res){
        res.redirect('/auth/profile');
    }
);

module.exports = authRoutes;