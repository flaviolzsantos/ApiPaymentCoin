let Repositorio = require("../config/repositorioConfig.js").Repositorio,
nomeColecao = "Log";

let repositorio = new Repositorio();

LogSrv = function(){
    LogSrv.prototype.ObterTodosLogs = (cbSucesso, cbErro)=>{
        repositorio.ObterTodosPor(nomeColecao, cbSucesso, cbErro);
    }

    LogSrv.prototype.ObterComFiltro = (filtro, cbSucesso, cbErro) =>{
        repositorio.ObterComFiltro(nomeColecao, filtro, cbSucesso, cbErro);
    }

    LogSrv.prototype.SalvarCriacaoCoinPayment = (colecao, erro, tipoEnvio) =>{
        colecao.tipoEnvio = tipoEnvio;
        colecao.nomeParceiro = "coinPayment";
        colecao.erro = erro;
        colecao.Data = new Date();
        repositorio.Salvar(nomeColecao, colecao);
    }
    
}

exports.LogSrv = LogSrv;