let util = require('util');
let mqtt = require('mqtt');

// MQTT protocol (%prefix%/%topic%/%command%)
let powerMqttCmd = 'cmnd/%s%s';
let powerMqttStat = 'stat/%s%s';
// let powerMqtt = 'tasmota/%s/cmnd/Power%s';

module.exports = function exec(params) {

        if (params.deviceType.type == 'binary') {
                //PROTOCOL MQTT
                    let identifier = params.deviceType.identifier.split('_');
                    let topic = identifier[0];
                    let id = identifier.length > 1 ? identifier[1] : '';

                    return sendMqttMsg(topic, id, params.state.value);
        } else if(params.deviceType.type == 'booleen') {
                //PROTOCOL MQTT
                    let identifier = params.deviceType.identifier.split('_');
                    let topic = identifier[0];
                    let id = identifier.length > 1 ? identifier[1] : '';

                    return sendMqttMsg(topic, id, params.state.value);
        } else {
            console.log(`Arduino - DeviceType type invalid or unknown: ${params.deviceType.type}`);
        }

    return false;
};

function sendMqttMsg(topic, id, value) {

    return gladys.param.getValues(['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'])
        .spread(function (url, username, password) {
            let client = mqtt.connect(url, {
                username: username,
                password: password
            });

            client.on('connect', function () {
                console.log(`Arduino - Successfully connected to MQTT : ${url}`);

                let req = util.format(powerMqttCmd, topic, id);
                if (value == 0) {
                        let state = 'eteint';
                } else if (value == 1) {
                        let state = 'marche';
                } else if (value == 2) {
                        let state = 'auto';
                }
                console.log(`Arduino - Sending ${req} ${state}`);
                client.publish(req, state);
            });

            client.on('message', function (topic, message) {
                let req = util.format(powerMqttStat, topic, id);
                if (topic.indewOf(req) > 1) {
                    let state = message === 'MARCHE' ? 1 : 0;
                    console.log(`Arduino - New state: ${state}`);
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
