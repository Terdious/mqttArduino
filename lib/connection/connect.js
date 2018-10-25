const mqtt           = require('mqtt');
const handler        = require('./handler.js');
const clientProvider = require('./client.js');
const test =""

module.exports = function (params) {

sails.log.info(`Arduino - Successfully connected to MQTT: OK5`);
    const client = mqtt.connect(params.MQTT_URL, {
        username: params.MQTT_USERNAME,
        password: params.MQTT_PASSWORD
    });
sails.log.info(`Arduino - Successfully connected to MQTT: ${params.MQTT_URL} et ${params.MQTT_USERNAME} et ${params.MQTT_PASSWORD}`);
                client.on('connect', function () {

test="OK100";
sails.log.info(` to MQTT: ${test}`);
                        client.subscribe('#');

                        sails.log.info(`Arduino - Successfully connected to MQTT: ${url}`);
                    }
                );

                client.on('error',function () {
                        sails.log.warn(`Fail to connect to MQTT : ${url}`);
test="PASOK100";
                        client.end();
                    }
                );

                client.on('message',function (topic, message) {
     test="OK102";
sails.log.info(` to MQTT: ${test}`);
                        handler(topic, message.toString());
test="OK102";                    
sails.log.info(`Arduino - Successfully connected to MQTT: OK6`);
                    }
                );

                clientProvider.setClient(client);
sails.log.info(`Arduino - Successfully connected to MQTT: OK9`);
sails.log.info(`Arduino - Successfully connected to MQTT: ${test}`);
                return client;
            }
        );
sails.log.info(`TestMessage = ${test}`);
};
