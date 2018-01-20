var express = require('express');
var bookrouters = express.Router();
var mongodb = require('mongodb').MongoClient;

bookrouters.route('/')
.get(function(req, res){
    var url = 'mongodb://localhost:27017';
    var dbName = 'libraryApp';
    mongodb.connect(url, function(err, client){
        var db = client.db('libraryApp');
        var collection = db.collection('books');
        collection.find().toArray(function(err, data){
            res.render('books', 
            {
                title:'my page', 
                nav:[
                    {name:'Books', link:'/books'},
                    {name:'Authors', link:'/authors'},
                ],
                books: data
            });
            client.close();
        })
    })
});

bookrouters.route('/single')
.get(function(req, res){
    res.send('hello single')
});

module.exports = bookrouters; 