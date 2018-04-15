let coinPaymentSrv = require('../service/coinPaymentSrv.js').CoinPaymentSrv;

//teste
let usuarioSrv = require('../service/usuarioSrv.js').UsuarioSrv;
let srvUser = new usuarioSrv();
let backupConfig = require('../config/backupConfig.js').Backup;
let srvBackup = new backupConfig();

module.exports = function(app, coinPayment){
    let srv = new coinPaymentSrv(coinPayment, app);
    let pedidoSrv = new PedidoSrv();

    

    app.post('/SmartCash', (req, res) => {
        srv.Create(req.body, res);
    });

    app.get('/SmartCash/:id', (req, res) => {
        pedidoSrv.ObterPedidoPorId(
            req.params.id,
            (data) => res.send(data),
            (erro) => res.status(500).send(erro));
    });   

    app.get('/Teste/:id', (req, res) =>{
        srvUser.EnviaConfirmacaoPagamento(req.params.id);
        res.send({});
    });

    app.get('/TesteB/', (req, res) =>{
        srvBackup.FazerBackup(res);
    });
}