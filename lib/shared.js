/* VARIABLES SHARED BETWEEN ALL FILES OF THE MODULE */

const MESSAGE_PREFIX = 'LED strip controller -';

let mqttClient = null;

module.exports = {
    messagePrefix: MESSAGE_PREFIX,

    getClient: function () {
        if (mqttClient === null) {
            return new Error(`${this.messagePrefix} MQTT client is not connected yet.`);
        }

        return mqttClient;
    },

    setClient: function (newClient) {
        mqttClient = newClient;
    }
};