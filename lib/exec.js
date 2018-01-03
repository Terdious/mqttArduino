var util = require('util');
var mqtt = require('mqtt');

// MQTT protocol (%prefix%/%topic%/%command%)
var powerMqttCmd = 'cmnd/%s%s';
var powerMqttStat = 'stat/%s%s';
// var powerMqtt = 'tasmota/%s/cmnd/Power%s';

module.exports = function exec(params) {

        if (params.deviceType.type == 'binary') {
                //PROTOCOL MQTT
                    var identifier = params.deviceType.identifier.split('_');
                    var topic = identifier[0];
                    var id = identifier.length > 1 ? identifier[1] : '';

                    return sendMqttMsg(topic, id, params.state.value);
        } else if(params.deviceType.type == 'booleen') {
                //PROTOCOL MQTT
                    var identifier = params.deviceType.identifier.split('_');
                    var topic = identifier[0];
                    var id = identifier.length > 1 ? identifier[1] : '';

                    return sendMqttMsg(topic, id, params.state.value);
        } else {
            console.log(`Arduino - DeviceType type invalid or unknown: ${params.deviceType.type}`);
        }

    return false;
};

function sendMqttMsg(topic, id, value) {

    return gladys.param.getValues(['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'])
        .spread(function (url, username, password) {
            var client = mqtt.connect(url, {
                username: username,
                password: password
            });

            client.on('connect', function () {
                console.log(`Arduino - Successfully connected to MQTT : ${url}`);

                var req = util.format(powerMqttCmd, topic, id);
                if (value == 0) {
                        var state = 'eteint';
                } else if (value == 1) {
                        var state = 'marche';
                } else if (value == 2) {
                        var state = 'auto';
                }
                console.log(`Arduino - Sending ${req} ${state}`);
                client.publish(req, state);
            });

            client.on('message', function (topic, message) {
                var req = util.format(powerMqttStat, topic, id);
                if (topic.indewOf(req) > 1) {
                    var state = message === 'MARCHE' ? 1 : 0;
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
