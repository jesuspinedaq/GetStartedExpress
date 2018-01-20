var express = require('express');

var app = express();
var port = 5000;

var bookrouters = require('./src/routers/bookRouters');
var adminRoutes = require('./src/routers/adminRoutes');

//static files
app.use(express.static('public'));

//render engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

//routes
app.use('/books', bookrouters);
app.use('/admin', adminRoutes);

app.get('/', function(req, res){
    res.render('index', {title:'my page', 
    nav:[
        {name:'Books', link:'/books'},
        {name:'Authors', link:'/authors'}
    ]});
});
 
// app.get('/books', function(req, res){
//     res.send('Hello books');
// })

app.listen(port, function(err){
    console.log("Server running in port:", port);
})