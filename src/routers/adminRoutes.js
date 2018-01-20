var express = require('express');
var mongodb = require('mongodb').MongoClient;

var adminRoutes = express.Router();

var books =[
    {
        title:'The adventures of mickey mouse',
        author:'Mike Mouse'
    },
    {
        title:'El Principito',
        author:'Santua'
    },
    {
        title:'The Jugernot',
        author:'X'
    }
]

adminRoutes.route('/addBooks')
.get(function(req, res){
    var url ='mongodb://localhost:27017';
    mongodb.connect(url, function(err, client){
        const db = client.db('libraryApp');
        const collection = db.collection('books');
        collection.insertMany(books, function(err, result){
            if(err){
                res.send(err);
            }

            res.send(result);
            client.close();
        })
    })
})


module.exports = adminRoutes;
