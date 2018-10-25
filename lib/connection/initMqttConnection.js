/* ESTABLISHES THE CONNECTION TO THE MQTT BROKER AND STORES THE CLIENT INTO A SHARED SPACE */

const MQTT_SERVER = require('mqtt');
const SHARED      = require('../shared');

module.exports = function () {
    const MY_REQUIRED_VALS = ['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'];

    return gladys.param.getValues(MY_REQUIRED_VALS)
        .spread(function (url, username, password) {
            const MY_MQTT_CLIENT = MQTT_SERVER.connect(
                url,
                {
                    username,
                    password
                }
            );

            MY_MQTT_CLIENT.on('connect',
                function () {
                    console.log(`${SHARED.messagePrefix} Successfully connected to MQTT broker (${url}).`);
                }
            );

            MY_MQTT_CLIENT.on('error',
                function () {
                    console.log(`${SHARED.messagePrefix} Failed to connect to MQTT broker (${url}).`);

                    MY_MQTT_CLIENT.end();
                }
            );

            SHARED.setClient(MY_MQTT_CLIENT);
        }
    );
};