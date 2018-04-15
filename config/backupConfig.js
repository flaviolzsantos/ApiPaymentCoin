var backup = require('mongodb-backup');


Backup = function(){

    Backup.prototype.FazerBackup = (res)=>{

        res.writeHead(200, {
            'Content-Type': 'application/x-tar'
          });

        backup({
            uri: 'mongodb://localhost:27017/' + process.env.NOME_DB, 
            stream: res
          });
    }

}

exports.Backup = Backup;


  