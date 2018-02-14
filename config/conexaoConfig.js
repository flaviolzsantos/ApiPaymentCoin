const MongoClient = require('mongodb').MongoClient;


const url = 'mongodb://localhost:27017';
const dbName = 'coinPayment';

exports.Conectar = function(cbConexao, cbErro){ 
    MongoClient.connect(url, function(err, client) {
        
    const db = client.db(dbName);
    db.collection("teste",function(erro, collection){
        collection.find().toArray(function(er, data){
            console.log(data);
            client.close();
        })
    });

    
    });
}