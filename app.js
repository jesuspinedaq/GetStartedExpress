var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');

var app = express();
var port = 5000;

var bookrouters = require('./src/routers/bookRouters');
var adminRoutes = require('./src/routers/adminRoutes');
var authRoutes = require('./src/routers/authRoutes');
//static files
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret:'library'}));
// app.use(passport.initialize());
// app.use(passport.session());
require('./src/config/passport')(app);
//render engine
app.set('views', './src/views');
app.set('view engine', 'ejs');

//routes
app.use('/books', bookrouters);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

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