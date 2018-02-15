let LogSrv = require('../../service/logSrv.js').LogSrv;

let logSrv = new LogSrv();

module.exports = function(app){

    app.get('/Sistema/ObterLog',(req, res) => {
        
        logSrv.ObterTodosLogs(
        (data) => res.send(data),
        (erro) => res.status(500).send(erro));

    });

    app.post('/Sistema/ObterComFiltro', (req, res) => {
        
        logSrv.ObterComFiltro(
        req.body, 
        (data) => res.send(data),
        (erro) => res.status(500).send(erro))
    })
};