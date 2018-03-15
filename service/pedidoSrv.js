let Repositorio = require("../config/repositorioConfig.js").Repositorio,
MongoClient = require('mongodb').MongoClient,
nomeColecao = 'Pedido';

let repositorio = new Repositorio();

PedidoSrv = function(){
    PedidoSrv.prototype.ObterPedidoPorId = (id, cbSucesso, cbErro) =>{
        repositorio.ObterComFiltro(nomeColecao, {item_number:id}, cbSucesso, cbErro);
    }

    PedidoSrv.prototype.SalvarPedido = function (colecao) {
        repositorio.Salvar(nomeColecao, colecao);
    }

    PedidoSrv.prototype.AtualizarStatusPedido = (query, colecao, cbSucesso, cbErro) =>{
        repositorio.Atualizar(nomeColecao, query, colecao, cbSucesso, cbErro);
    }
};

exports.PedidoSrv = PedidoSrv;