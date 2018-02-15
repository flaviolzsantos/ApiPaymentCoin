let Repositorio = require("../config/repositorioConfig.js").Repositorio;

let repositorio = new Repositorio();

LogSrv = function(){
    LogSrv.prototype.ObterTodosLogs = (cbSucesso, cbErro)=>{
        repositorio.ObterTodosPor("Log", cbSucesso, cbErro);
    }

    LogSrv.prototype.ObterComFiltro = (filtro, cbSucesso, cbErro) =>{
        repositorio.ObterComFiltro("Log", filtro, cbSucesso, cbErro);
    }

    LogSrv.prototype.SalvarCriacaoCoinPayment = (colecao, erro, tipoEnvio) =>{
        colecao.tipoEnvio = tipoEnvio;
        colecao.nomeParceiro = "coinPayment";
        colecao.erro = erro;
        repositorio.Salvar("Log", colecao);
    }
    
}

exports.LogSrv = LogSrv;