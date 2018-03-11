let _ = require('lodash'),
LogSrv = require('../service/logSrv').LogSrv,
util = require('../shared/util').Util
PedidoSrv = require('../service/pedidoSrv').PedidoSrv;


let logSrv = new LogSrv();
let pedidoSrv = new PedidoSrv();

CoinPaymentSrv = function(client) {   

    CoinPaymentSrv.prototype.Create = (jsonCadastro, call) =>{

        let jsonCreate = require('../template/coinPayment/create.json');
    
        if(_.isEqual(jsonCadastro, {})){
            call.status(500).send('Json é obrigatório');
            return;
        }
        if(_.isNil(jsonCadastro.valor)){
            call.status(500).send('Valor é obrigatório');
            return;
        }
        if(_.isNil(jsonCadastro.idAgendamento)){
            call.status(500).send('Id é obrigatório');
            return;
        }
    
        jsonCreate.amount = jsonCadastro.valor;
        jsonCreate.item_number = jsonCadastro.idAgendamento;
        jsonCreate.buyer_name = jsonCadastro.nomeUsuario;
        jsonCreate.buyer_email = jsonCadastro.emailUsuario;
        jsonCreate.item_name = jsonCadastro.nomeProduto;
        

        // call.send();
        // return;

        client.createTransaction(jsonCreate, function(err, res){
    
            if(err){
                call.status(500).send(err);
                jsonCreate.erro = err;
                logSrv.SalvarCriacaoCoinPayment(jsonCreate, true, util.TipoEnvio.Envio);
                return;
            }            
            
            call.send(res);

            logSrv.SalvarCriacaoCoinPayment(jsonCreate, false, util.TipoEnvio.Envio);
            logSrv.SalvarCriacaoCoinPayment(res, false, util.TipoEnvio.Receber);

            jsonCreate.idTx = res.txn_id;
            jsonCreate.status = 0;
            jsonCreate.status_text = "Waiting for buyer funds...",
            pedidoSrv.SalvarPedido(jsonCreate);
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
        logSrv.SalvarCriacaoCoinPayment(data, false, util.TipoEnvio.ReceberIPN);
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