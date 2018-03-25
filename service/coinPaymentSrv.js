const _ = require('lodash'),
LogSrv = require('../service/logSrv').LogSrv,
util = require('../shared/util').Util
PedidoSrv = require('../service/pedidoSrv').PedidoSrv,
MongoClient = require('mongodb').MongoClient,
fs = require('fs');


let logSrv = new LogSrv();
let pedidoSrv = new PedidoSrv();

CoinPaymentSrv = function(client, app) {   
    

    CoinPaymentSrv.prototype.Create = function(jsonCadastro, call) {
        

        let jsonCreate = JSON.parse(fs.readFileSync(__dirname.substring(0, __dirname.length - '\\service'.length) + '/template/coinPayment/create.json', 'utf8'));
               
    
        if(_.isEqual(jsonCadastro, {})){
            call.status(500).send('Json é obrigatório');
            return;
        }
        
        
        if(_.isNil(jsonCadastro.valor)){
            call.status(500).send('Valor é obrigatório');
            return;
        }
        if(_.isNil(jsonCadastro.id)){
            call.status(500).send('Id é obrigatório');
            return;
        }
    
        jsonCreate.amount = jsonCadastro.valor;
        jsonCreate.item_number = jsonCadastro.id;
        jsonCreate.buyer_name = jsonCadastro.nomeUsuario;
        jsonCreate.buyer_email = jsonCadastro.emailUsuario;
        jsonCreate.item_name = jsonCadastro.nomeProduto;

        client.createTransaction(jsonCreate, function(err, res){
    
            if(err){
                call.status(500).send(err);
                jsonCreate.erro = err;
                logSrv.SalvarCriacaoCoinPayment(jsonCreate, true, util.TipoEnvio.Envio);
                return;
            } 
            jsonCreate.idTx = res.txn_id;
            jsonCreate.status = 0;
            jsonCreate.status_text = "Waiting for buyer funds...";
            jsonCreate.idUsuario = app.dadosUsuario._id;
            res.idUsuario = app.dadosUsuario._id;
            pedidoSrv.SalvarPedido(jsonCreate);

            logSrv.SalvarCriacaoCoinPayment(jsonCreate, false, util.TipoEnvio.Enviado);
            logSrv.SalvarCriacaoCoinPayment(res, false, util.TipoEnvio.Recebido);

            let jsonReturn = JSON.parse(fs.readFileSync(__dirname.substring(0, __dirname.length - '\\service'.length) + '/template/coinPayment/returnCreate.json', 'utf8'));

            jsonReturn.nome = jsonCadastro.nomeUsuario;
            jsonReturn.nomeItem = jsonCadastro.nomeProduto;
            jsonReturn.id =  jsonCadastro.id;
            jsonReturn.status = jsonCreate.status;
            jsonReturn.statusDesc = jsonCreate.status_text;
            jsonReturn.Data = new Date();
            jsonReturn.valorCripto = res.amount;
            jsonReturn.enderecoCripto = res.address;
            jsonReturn.qrCode = res.qrcode_url;

            call.send(jsonReturn);
        });
        
    }

    CoinPaymentSrv.prototype.GetTx = (id, call) =>{
        
        client.getTx(id, (err, data) =>{
            if(err){
                call.status(500).send(err);
                return;
            }
            call.send(data);
        });
    }

    CoinPaymentSrv.prototype.GetIpn = (data, call) =>{
        
        logSrv.SalvarCriacaoCoinPayment(data, false, util.TipoEnvio.RecebidoIPN);
        pedidoSrv.AtualizarStatusPedido({item_number:data.item_number },{$set:{ status: data.status, status_text: data.status_text}});
        call.send();
        
    }
}



exports.CoinPaymentSrv = CoinPaymentSrv;

// //Retorna Informações basica do cliente com paymenteCoin
// client.getBasicInfo(function(err, data){
//     console.log(data);

// });

// var pgto = {
//     currency1: 'BRL',
//     currency2: 'SMART',
//     amount: '1.09',
//     address: 'Sgqd6DVfZED9MrXTJKQ5DC6utZZ2F3kFhv',
//     buyer_name: 'Flavio',
//     buyer_email: 'flaviolzsantos@gmail.com',
//     item_name: 'aluguel de uma casa',
//     item_number: '12345'
// };

// // client.createTransaction(pgto, function(err, res){
// //     console.log(res,err);


// client.balances(function(err,result){
//     console.log(result);
//   });


// // retorno
// // { amount: '1.00902874',
// //   txn_id: 'CPCB4LQIBBWPO1CKSXY0M26EWF',
// //   address: 'SfT1XewEmoNkgQsK2r6MzjGztvXBJdyjLq',
// //   confirms_needed: '10',
// //   timeout: 12600,
// //   status_url: 'https://www.coinpayments.net/index.php?cmd=status&id=CPCB4LQIBBWPO1CKSXY0M26EWF&key=e1c8926edc61758d3a8b0b80ebfabfb4',
// //   qrcode_url: 'https://www.coinpayments.net/qrgen.php?id=CPCB4LQIBBWPO1CKSXY0M26EWF&key=e1c8926edc61758d3a8b0b80ebfabfb4' 
// // }
// // })

// // client.getTx('CPCB4LQIBBWPO1CKSXY0M26EWF',function(err, data){
// //     console.log(err,data)
// // });