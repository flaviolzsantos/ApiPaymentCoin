var Coinpayments = require('coinpayments');

var options = {
    'key': process.env.COINPAYMENT_KEY,
    'secret': process.env.COINPAYMENT_SECRET
};

var client = new Coinpayments(options); 

module.exports = client;

