/* VARIABLES SHARED BETWEEN ALL FILES OF THE MODULE */

const SERVICE_NAME            = 'mqtt-controller';
const MQTT_STATE_TOPIC_PREFIX_PARAM = 'MQTT_STATE_TOPIC_PREFIX';

let mqttClient = null;

module.exports = {
    serviceName: SERVICE_NAME,

    mqttStateTopicPrefixParam: MQTT_STATE_TOPIC_PREFIX_PARAM,

    getClient: function () {
        if (mqttClient === null) {
            return new Error(`${this.serviceName} - The MQTT client is not connected yet.`);
        }

        return mqttClient;
    },

    setClient: function (newClient) {
        mqttClient = newClient;
    },

    buildTopic: function (...subtopics) {
        return subtopics
            .join('/')
            .replace(/(^\/+)|(\/+$)/g, '') // Trims slashes
            .replace(/\/\/+/g, '/'); // Replaces multiple-slashes with simple-slashes
    }
};