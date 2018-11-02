const PROMISE = require('bluebird');
const SHARED  = require('./shared');

const ALLOWED_PROTOCOLS = ['mqtt', 'mqtts'];

function sendMqttMessage(deviceType, message) {
    const MY_MQTT_CLIENT = SHARED.getClient();

    gladys.param.getValue('MQTT_COMMAND_TOPIC_PREFIX').then(function (mqttCommandTopicPrefix) {
        MY_MQTT_CLIENT.publish(SHARED.buildTopic(mqttCommandTopicPrefix, deviceType.identifier), message);
    });
}

module.exports = function exec(params) {
    const MY_PARAMS_DEVICE_TYPE = params.deviceType;
    const MY_PARAMS_STATE       = params.state;

    // We test for protocol to avoid unexpected behaviour
    if (ALLOWED_PROTOCOLS.includes(MY_PARAMS_DEVICE_TYPE.protocol)) {
        const MY_JSON_MESSAGE = {};

        MY_JSON_MESSAGE[MY_PARAMS_DEVICE_TYPE.deviceTypeIdentifier] = MY_PARAMS_STATE.value;

        sendMqttMessage(MY_PARAMS_DEVICE_TYPE, JSON.stringify(MY_JSON_MESSAGE));
    }

    return PROMISE.resolve(true); // This means that Gladys won't create any DeviceState after exec
};
