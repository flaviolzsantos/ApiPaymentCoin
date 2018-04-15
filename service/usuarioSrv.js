let Repositorio = require("../config/repositorioConfig.js").Repositorio,
erroSrv = require('../service/erroSrv.js').ErroSrv,
servicoRest = require('../config/servicoRestConfig.js').ServicoRest,
ObjectID = require("mongodb").ObjectID
nomeColecao = 'Usuario';

let repositorio = new Repositorio();
let srvErro = new erroSrv();
let srvRest = new servicoRest();

UsuarioSrv = function(){
    UsuarioSrv.prototype.ObterUsuarioPorHash = (hash, cbSucesso, cbErro) =>{
        
        repositorio.ObterComFiltro(nomeColecao, {hashAutenticacao:hash}, (data)=>{
            if(data.length == 0){
                cbErro('Não autenticado');
                return;
            }            

            cbSucesso(data);

        }, cbErro);
    }
    
    UsuarioSrv.prototype.ObterUsuarioPorId = (id, cbSucesso, cbErro) =>{
        
        repositorio.ObterComFiltro(nomeColecao, {_id: ObjectID(id)}, (data)=>{
            if(data.length == 0){
                cbErro('Usuário não encontrado');
                return;
            }            

            cbSucesso(data);

        }, cbErro);
    }

    UsuarioSrv.prototype.EnviaConfirmacaoPagamento = (itemId, cbSucesso, cbErro) =>{
        let nomeMetodo = 'usuarioSrv/EnviaConfirmacaoPagamento';
        
        if(itemId == undefined){
            srvErro.LogarErroValidacao("ItemId undefined", nomeMetodo);
            return;
        }
        if(itemId == null){
            srvErro.LogarErroValidacao('itemId undefined', nomeMetodo);
            return;
        }
        if(itemId.indexOf("~") == -1){
            srvErro.LogarErroValidacao('Não foi encontrado o separador', nomeMetodo);
            return;
        }               
        
        let itens = itemId.split("~");
        if(itens.length > 2){
            srvErro.LogarErroValidacao('Existe mais de um separador', nomeMetodo);
            return;
        }      
        
        let idUsuario = itens[0];
        let idIntegracao = itens[1];
        //Necessário obter o usuário para saber a URL para enviar a notificação do pagamento
        this.ObterUsuarioPorId(idUsuario,(dadosSucesso) =>{
            if(dadosSucesso == []){
                srvErro.LogarErroValidacao('Retorno vazio', nomeMetodo, 'ObterUsuarioPorId');
                return;
            }

            let urlEnvioCliente = dadosSucesso[0].UrlIPN;
            
            srvRest.EnviarPost(urlEnvioCliente, {id: idIntegracao}, cbSucesso, cbErro);

        },(erro) => srvErro.LogarErroValidacao(erro, nomeMetodo, 'ObterUsuarioPorId'));

            
        
        
    }
};

exports.UsuarioSrv = UsuarioSrv;