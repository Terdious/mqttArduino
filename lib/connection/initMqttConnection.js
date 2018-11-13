/* ESTABLISHES THE CONNECTION TO THE MQTT BROKER AND STORES THE CLIENT INTO A SHARED SPACE */

const MQTT_SERVER   = require('mqtt');
const SHARED        = require('../shared');
const handleMessage = require('./handleMessage');

const MY_REQUIRED_VALS = ['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'];

module.exports = function () {
    return gladys.param.getValues(MY_REQUIRED_VALS)
        .spread(function (url, username, password) {
            const MY_MQTT_CLIENT = MQTT_SERVER.connect(
                url,
                {
                    username,
                    password
                }
            );

            MY_MQTT_CLIENT.on('connect', function () {
                sails.log.info(`${SHARED.serviceName} - Successfully connected to MQTT broker (${url}).`);

                gladys.param.getValue(SHARED.mqttStateTopicPrefixParam).then(function (mqttStateTopicPrefix) {
                    const MY_MQTT_STATE_TOPIC = SHARED.buildTopic(mqttStateTopicPrefix, '/#');

                    MY_MQTT_CLIENT.subscribe(MY_MQTT_STATE_TOPIC, function(error) {
                        if (error) {
                            sails.log.error(`${SHARED.serviceName} - The MQTT client could not subscribe to topic "gladys/state/#".`);
                        }
                        else {
                            sails.log.info(`${SHARED.serviceName} - The MQTT client subscribed to topic "${MY_MQTT_STATE_TOPIC}".`);
                        }
                    });
                });
            });

            MY_MQTT_CLIENT.on('message', function (topic, message) {
                handleMessage(topic, message);
            });

            MY_MQTT_CLIENT.on('error', function () {
                sails.log.error(`${SHARED.serviceName} - Failed to connect to MQTT broker at ${url}.`);

                MY_MQTT_CLIENT.end();
            });

            MY_MQTT_CLIENT.on('close', function () {
                sails.log.warn(`${SHARED.serviceName} - The MQTT client has been disconnected.`);
            });

            SHARED.setClient(MY_MQTT_CLIENT);
        }
    );
};