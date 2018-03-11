let conexao = require('./conexaoConfig'),
    ObjectID = require("mongodb").ObjectID;

Repositorio = function() {

    Repositorio.prototype.ObterTodosPor = (nomeColecao, cbSucesso, cbErro) => {
        conexao.Conectar((client) =>{

            let db = client.db(process.env.NOME_DB);
            db.collection(nomeColecao,function(erroCollection, collection){

                if(erroCollection){
                    
                    if(cbErro)
                        cbErro(erroCollection);

                    client.close();
                    return;
                }

                collection.find().toArray(function(erroFind, dados){
                    if(erroFind){
                        
                        if(cbErro)
                            cbErro(erroFind);

                        client.close();
                        return;
                    }

                    if(cbSucesso)
                        cbSucesso(dados);

                    client.close();
                })
            });

        }, (erro) => cbErro(erro))
    }

    Repositorio.prototype.ObterComFiltro = (nomeColecao, filtro, cbSucesso, cbErro) => {
        conexao.Conectar((client) =>{
            let db = client.db(process.env.NOME_DB);

            db.collection(nomeColecao,function(erroCollection, collection){

                if(erroCollection){
                    cbErro(erroCollection);
                    client.close();
                    return;
                }

                collection.find(filtro).toArray(function(erroFind, dados){
                    if(erroFind){
                        cbErro(erroFind);
                        client.close();
                        return;
                    }
                    cbSucesso(dados);
                    client.close();
                })
            });

        }, (erro) => cbErro(erro))
    }

    Repositorio.prototype.Salvar = (nomeColecao, colecao, cbSucesso, cbErro) => {
        conexao.Conectar((client) => {
            let db = client.db(process.env.NOME_DB);

            db.collection(nomeColecao).insert(colecao, (erroInsert, dadosInsert) =>{
                if(erroInsert){
                    (cbErro) ? cbErro(erroInsert) : "";
                    return;
                }

                (cbSucesso) ? cbSucesso(dadosInsert) : "";
            })

        },(erro) => (cbErro) ? cbErro(erro) : "")
    }

    Repositorio.prototype.Atualizar = (nomeColecao, query, colecao, cbSucesso, cbErro) => {
        conexao.Conectar((client) => {
            let db = client.db(process.env.NOME_DB);

            db.collection(nomeColecao).update(query, colecao, {multi:true}, (erroUpdate, dadosUpdate) =>{
                //console.log(erroUpdate);
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