const connect = require('./connect.js');
const promise = require('bluebird');

let client = null;

module.exports = {
    getClient: function () {
        if(client === null) {
            client = this.setClient(connect());
        }

        return promise.resolve(client);
    },

    setClient: function (newClient) {
        client = newClient;
    }
};