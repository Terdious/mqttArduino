const CONNECT = require('./connect.js');
const PROMISE = require('bluebird');

let client = null;

module.exports = {
    getClient: function () {
        if(client === null) {
            client = this.setClient(CONNECT());
        }

        return PROMISE.resolve(client);
    },

    setClient: function (newClient) {
        client = newClient;
    }
};