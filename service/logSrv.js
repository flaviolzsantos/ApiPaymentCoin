let Repositorio = require("../config/repositorioConfig.js").Repositorio;

let repositorio = new Repositorio();

LogSrv = function(){
    LogSrv.prototype.ObterTodosLogs = (cbSucesso, cbErro)=>{
        repositorio.ObterTodosPor("Log", cbSucesso, cbErro);
    }

    LogSrv.prototype.ObterComFiltro = (filtro, cbSucesso, cbErro) =>{
        repositorio.ObterComFiltro("Log", filtro, cbSucesso, cbErro);
    }

    LogSrv.prototype.SalvarEnvioCoinPayment = (colecao, cbSucesso, cbErro) =>{
        repositorio.Salvar("LogEnvioCoinPayment", colecao, cbSucesso, cbErro);
    }
}

exports.LogSrv = LogSrv;