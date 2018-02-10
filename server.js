let app = require('./config/appConfig.js'),
    coinPayment = require('./config/coinPaymentsConfig.js');
    coinPaymentRota = require('./rota/coinPaymentRota.js')(app, coinPayment);

app.listen(3000);