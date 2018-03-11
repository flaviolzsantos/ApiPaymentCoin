let Repositorio = require("../config/repositorioConfig.js").Repositorio,
nomeColecao = 'Pedido';

let repositorio = new Repositorio();

PedidoSrv = function(){
    PedidoSrv.prototype.ObterPedidoPorId = (id, cbSucesso, cbErro) =>{
        repositorio.ObterComFiltro(nomeColecao, {item_number:id}, cbSucesso, cbErro);
    }

    PedidoSrv.prototype.SalvarPedido = (colecao) =>{
        repositorio.Salvar(nomeColecao, colecao);
    }

    PedidoSrv.prototype.AtualizarStatusPedido = (colecao, cbSucesso, cbErro) =>{
        repositorio.Atualizar(nomeColecao, colecao, cbSucesso, cbErro);
    }
};

exports.PedidoSrv = PedidoSrv;