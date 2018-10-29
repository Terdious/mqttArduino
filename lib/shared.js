/* VARIABLES SHARED BETWEEN ALL FILES OF THE MODULE */

const MESSAGE_PREFIX = 'LED strip controller -';
const SERVICE_NAME   = 'mqtt-controller';

COMMAND_TOPIC_PREFIX = 'gladys/Cmd';
STATES_TOPIC_PREFIX = 'gladys/Etats';

let mqttClient = null;

module.exports = {
    messagePrefix: MESSAGE_PREFIX,

    serviceName: SERVICE_NAME,

    commandTopicPrefix: COMMAND_TOPIC_PREFIX,

    statesTopicPrefix: STATES_TOPIC_PREFIX,

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