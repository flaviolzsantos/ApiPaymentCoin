let conexao = require('./conexaoConfig'),
    ObjectID = require("mongodb").ObjectID;

Repositorio = function() {

    Repositorio.prototype.ObterTodosPor = (nomeColecao, cbSucesso, cbErro) => {
        conexao.Conectar((client) =>{

            let db = client.db(process.env.NOME_DB);
            db.collection(nomeColecao,function(erroCollection, collection){

                if(erroCollection){
                    cbErro(erroCollection);
                    client.close();
                    return;
                }

                collection.find().toArray(function(erroFind, dados){
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
                    cbErro(erroInsert);
                    return;
                }

                cbSucesso(dadosInsert);
            })

        },(erro) => cbErro(erro))
    }
}

exports.Repositorio = Repositorio;