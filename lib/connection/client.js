const connect = require('./connect.js');
const promise = require('bluebird');

let client = null;
sails.log.info(`Arduino - Successfully connected to MQTT: OK1`);
module.exports = {
    getClient: function () {
        if(client === null) {
            client = this.setClient(connect());
            sails.log.info(`Arduino - Successfully connected to MQTT: OK2`);
        }

        return promise.resolve(client);
        sails.log.info(`Arduino - Successfully connected to MQTT: OK3`);
    },

    setClient: function (newClient) {
        sails.log.info(`Arduino - Successfully connected to MQTT: OK4`);
        client = newClient;
    }
};
