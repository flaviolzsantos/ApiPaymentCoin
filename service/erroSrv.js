let Repositorio = require("../config/repositorioConfig.js").Repositorio,
util = require('../shared/util').Util,
nomeColecao = "Erro";

let repositorio = new Repositorio();
// let objErro = {
//     metodo:"",
//     tipoErro: util.TipoErro,
//     msgErro: "",
//     dataErro: ""
// }

ErroSrv = function(){
    ErroSrv.prototype.LogarErroValidacao = (msg, metodo, metodoInterno)=>{
        let objErro = {};
        objErro.metodo = metodo;
        objErro.tipoErro = util.TipoErro.Validacao;
        objErro.msgErro = msg;
        objErro.dataErro = new Date();
        objErro.metodoInterno = metodoInterno;
               

        repositorio.Salvar(nomeColecao, objErro);
    }
    
    ErroSrv.prototype.LogarErroGenerico = (msg, metodo, metodoInterno)=>{
        let objErro = {};
        objErro.metodo = metodo;
        objErro.tipoErro = util.TipoErro.Generico;
        objErro.msgErro = ''+msg+'';
        objErro.dataErro = new Date();
        objErro.metodoInterno = metodoInterno;
        
        repositorio.Salvar(nomeColecao, objErro);
    }
    
}

exports.ErroSrv = ErroSrv;