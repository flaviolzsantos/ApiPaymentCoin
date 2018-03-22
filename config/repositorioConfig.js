var conexao = require('./conexaoConfig');

Repositorio = function() {

    Repositorio.prototype.ObterTodosPor = (nomeColecao, cbSucesso, cbErro) => {
        conexao.Conectar((db) =>{

            db.collection(nomeColecao,function(erroCollection, collection){

                if(erroCollection){
                    
                    if(cbErro)
                        cbErro(erroCollection);                   

                    return;
                }

                collection.find().toArray(function(erroFind, dados){

                    if(erroFind){
                        
                        if(cbErro)
                            cbErro(erroFind);

                        return;
                    }

                    if(cbSucesso)
                        cbSucesso(dados);
                    
                })
            });

        }, (erro) => cbErro(erro))
    }

    Repositorio.prototype.ObterComFiltro = (nomeColecao, filtro, cbSucesso, cbErro) => {
        conexao.Conectar((db) =>{

            db.collection(nomeColecao,function(erroCollection, collection){

                if(erroCollection){
                    cbErro(erroCollection);                    
                    return;
                }

                collection.find(filtro).toArray(function(erroFind, dados){                    

                    if(erroFind){
                        cbErro(erroFind);                        
                        return;
                    }
                    cbSucesso(dados);
                })
            });

        }, (erro) => cbErro(erro))
    }

    Repositorio.prototype.Salvar = function(nomeColecao, colecao, cbSucesso, cbErro) {

        
        conexao.Conectar(function(db){

            db.collection(nomeColecao).insert(colecao, function(erroInsert, dadosInsert){
                
                if(erroInsert)
                {
                    (cbErro) ? cbErro(erroInsert) : "";
                    return;
                }
                
                (cbSucesso) ? cbSucesso(dadosInsert) : "";
            })

        },function(erro){
            (cbErro) ? cbErro(erro) : "";        
        });
        
    };

    Repositorio.prototype.Atualizar = (nomeColecao, query, colecao, cbSucesso, cbErro) => {
        conexao.Conectar((db) => {

            db.collection(nomeColecao).update(query, colecao, {multi:true}, (erroUpdate, dadosUpdate) =>{
                
               
                
                if(erroUpdate){
                    (cbErro) ? cbErro(erroUpdate) : "";
                    return;
                }

                (cbSucesso) ? cbSucesso(dadosUpdate) : "";
            })

        },(erro) => (cbErro) ? cbErro(erro) : "")
    }
}

exports.Repositorio = Repositorio;