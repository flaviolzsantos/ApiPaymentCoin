let express = require('express'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    usuarioSrv = require('../service/usuarioSrv.js').UsuarioSrv;

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(helmet());

app.use(function (req, res, next) {

    let srvUsuario = new UsuarioSrv();
    

    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,auth,X-Custom-Header');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if(req.method == "OPTIONS"){
        next();
        return;
    }
    if(req.originalUrl != '/CoinPayment/GetIpn' && (req.headers.auth == undefined)){
        
        res.status(401).send({message : 'Não autorizado'});
        return;
    }

    if(req.originalUrl == '/CoinPayment/GetIpn'){        
        next();
        return;
    }

    srvUsuario.ObterUsuarioPorHash(req.headers.auth,(data)=>{
        app.dadosUsuario = data[0];
       
        next();

    },(erro)=>{
        
        res.status(401).send({message: erro});
        return;
    })

    
});

module.exports = app;
