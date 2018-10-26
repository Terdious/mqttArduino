const ALLOWED_PROTOCOLS = ['mqtt', 'mqtts'];

function sendMqttMessage(deviceType, message) {
    const MY_MQTT_CLIENT = require('./shared').getClient();

    let myMqttChannel = deviceType.identifier;
    myMqttChannel    += myMqttChannel.endsWith("/") ? "" : "/";
    myMqttChannel    += deviceType.deviceTypeIdentifier;

    MY_MQTT_CLIENT.publish(myMqttChannel, message);
}

module.exports = function exec(params) {
    const MY_PARAMS_DEVICE_TYPE = params.deviceType;
    const MY_PARAMS_STATE       = params.state;

    // We test for protocol to avoid unexpected behaviour
    if (ALLOWED_PROTOCOLS.includes(MY_PARAMS_DEVICE_TYPE.protocol)) {
        const MY_JSON_MESSAGE = {};

        MY_JSON_MESSAGE[MY_PARAMS_DEVICE_TYPE.type] = MY_PARAMS_STATE.value;

        sendMqttMessage(MY_PARAMS_DEVICE_TYPE, JSON.stringify(MY_JSON_MESSAGE));
    }
};
