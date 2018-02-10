var Coinpayments = require('coinpayments');

var options = {
    'key': '28f2e6cc76fca19888541fecc12c6c9aa7690f0d25d06f28e7b158a2ccd8954f',
    'secret': '0612f1a3C4D34812497865d9Eb33d547fd0fa20E08B2a25AAF69147cfda00E9f'
};

var client = new Coinpayments(options); 

module.exports = client;

