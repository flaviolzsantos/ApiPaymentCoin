let coinPaymentSrv = require('../service/coinPaymentSrv.js').CoinPaymentSrv;


module.exports = function(app, coinPayment){
    let srv = new coinPaymentSrv(coinPayment);

    app.post('/CoinPayment/Create', (req, res) => {
        srv.Create(req.body, res);
    });

    app.get('/CoinPayment/Get/:id', (req, res) => {
        srv.GetTx(req.params.id, res);
    });

    app.post('/CoinPayment/GetIpn', (req, res) => {
        srv.GetIpn(req.body, res);
    });
}