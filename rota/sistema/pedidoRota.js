let LogSrv = require('../../service/pedidoSrv.js').PedidoSrv;

let pedidoSrv = new PedidoSrv();

module.exports = function(app){

    app.get('/Sistema/Pedido/:idPedido',(req, res) => {
        
        pedidoSrv.ObterStatusPedidoPorId(
        req.params.idPedido,
        (data) => res.send(data),
        (erro) => res.status(500).send(erro));
    });
    
};