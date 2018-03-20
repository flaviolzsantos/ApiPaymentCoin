let Repositorio = require("../config/repositorioConfig.js").Repositorio,
MongoClient = require('mongodb').MongoClient,
nomeColecao = 'Pedido';

let repositorio = new Repositorio();

PedidoSrv = function(){
    PedidoSrv.prototype.ObterPedidoPorId = (id, cbSucesso, cbErro) =>{
        repositorio.ObterComFiltro(nomeColecao, {item_number:id}, (data)=>{
            data = data[0];
            let jsonRetorno = JSON.parse(fs.readFileSync(__dirname.substring(0, __dirname.length - '\\service'.length) + '/template/coinPayment/retornoObterPedido.json', 'utf8'));
            jsonRetorno.nome = data.buyer_name;
            jsonRetorno.nomeItem = data.item_name;
            jsonRetorno.id = data.item_number;
            jsonRetorno.status = data.status;
            jsonRetorno.statusDesc = data.status_text;

            cbSucesso(jsonRetorno);

        }, cbErro);
    }

    PedidoSrv.prototype.SalvarPedido = function (colecao) {
        repositorio.Salvar(nomeColecao, colecao);
    }

    PedidoSrv.prototype.AtualizarStatusPedido = (query, colecao, cbSucesso, cbErro) =>{
        repositorio.Atualizar(nomeColecao, query, colecao, cbSucesso, cbErro);
    }
};

exports.PedidoSrv = PedidoSrv;