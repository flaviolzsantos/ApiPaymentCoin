const MongoClient = require('mongodb').MongoClient;


const url = 'mongodb://localhost:27017';
const dbName = 'coinPayment';

exports.Conectar = function(cbSucces, cbErro){ 
    MongoClient.connect(url, function(err, client) {
    
        if(err){
            cbErro(err);
            return;
        }
        cbSucces(client);
    });
}