let express = require('express'),
    bodyParser = require('body-parser'),
    helmet = require('helmet');

let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(helmet());

app.use(function (req, res, next) {
    //console.log(req.path);
    res.setHeader('Access-Control-Allow-Origin', '*');        
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

module.exports = app;
