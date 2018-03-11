require('dotenv').config();
let app = require('./config/appConfig.js'),    
    coinPayment = require('./config/coinPaymentsConfig.js'),
    coinPaymentRota = require('./rota/coinPaymentRota.js')(app, coinPayment),

    logRota = require('./rota/sistema/logRota.js')(app),
    pedidoRota = require('./rota/sistema/pedidoRota.js')(app);   
    


app.listen(3000);