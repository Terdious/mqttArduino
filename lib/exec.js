const mqtt = require('mqtt');

const MAIN_SITE       = 'clos-masure';
const EXPLICIT_STATES = ['off', 'on', 'auto'];

module.exports = function exec(params) {

    // We test for protocol to avoid unexpected behaviour
    if (params.deviceType.protocol === 'mqtt') {

        // 'mode' means that we want to switch the mode of the device
        if (params.deviceType.type === 'mode') {

            // Expected topic: site/building/zone/environment/device-type
            let target = params.deviceType.identifier;           // site/building/zone/environment/...
            target += params.deviceType.deviceTypeIdentifier; // ...device-type

            return sendMqttMsg(target, params.state.value);
        }

        throw new Error(`Arduino - DeviceType type invalid or unknown: ${params.deviceType.type}`);
    }
    else {

        throw new Error('This service/module only performs mqtt requests!');
    }
};

function sendMqttMsg(target, value) {

    return gladys.param.getValues(['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'])
        .spread(function (url, username, password) {

            let client = mqtt.connect(
                url, {
                    username: username,
                    password: password
                }
            );

            client.on('connect', function () {

                console.log(`Arduino - Successfully connected to MQTT: ${url}`);

                console.log(`Arduino - Sending ${target} ${value}`);

                client.publish(target, value);
            });

            client.on('message', function (topic, state) {

                if (topic.indexOf(MAIN_SITE) !== -1) {

                    console.log(`Arduino - New state: ${EXPLICIT_STATES[state]}`);

                    client.end();

                    return state;
                }
            });

            client.on('error', function (error) {

                console.log(`Arduino - Error: ${error}`);

                client.end();

                return false;
            });
        });
}
