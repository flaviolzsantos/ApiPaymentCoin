let Repositorio = require("../config/repositorioConfig.js").Repositorio,
nomeColecao = 'Usuario';

let repositorio = new Repositorio();

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
};

exports.UsuarioSrv = UsuarioSrv;