const MongoClient = require('mongodb').MongoClient;


const url = 'mongodb://localhost:27017/coinPayment';

exports.Conectar = function(cbSucces, cbErro){ 
    
    MongoClient.connect(url, function(err, client) {
    
        if(err){
            cbErro(err);
            return;
        }
        cbSucces(client.db(process.env.NOME_DB));
        client.close();
    });
}