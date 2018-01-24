var mongodb = require('mongodb');

var bookController = function() {
    function middleware(req, res, next){
        if(!req.user){
            res.redirect('/');
        }
        next();
    }

    function getAllBooks(req, res){
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
    }

    return {
        middleware: middleware,
        getAllBooks: getAllBooks
    }
}

module.exports = bookController;