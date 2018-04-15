let request = require('request');

ServicoRest = function(){

    ServicoRest.prototype.EnviarPost = (url, dados, cbSucesso, cbErro) =>{

        request({
            url: url,
            method: "POST",
            json: true,
            body: dados
        }, function (error, response, body){
            
            if(error){
                cbErro(error);
                return;
            }

            cbSucesso(response);
        });
    }

}

exports.ServicoRest = ServicoRest;