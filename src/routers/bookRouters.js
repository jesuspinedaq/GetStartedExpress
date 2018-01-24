var express = require('express');
var bookrouters = express.Router();
var mongodb = require('mongodb').MongoClient;
var bookController = require('../controllers/bookController')();

bookrouters.route('/')
.all(function(req, res, next){
    bookController.middleware(req, res, next);
})
.get(function(req, res){
    bookController.getAllBooks(req, res);
});

bookrouters.route('/single')
.get(function(req, res){
    res.send('hello single')
});

module.exports = bookrouters; 