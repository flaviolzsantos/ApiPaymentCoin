let coinPaymentSrv = require('../service/coinPaymentSrv.js').CoinPaymentSrv;


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
}