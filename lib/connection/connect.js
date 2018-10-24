const mqtt           = require('mqtt');
const handler        = require('./handler.js');
const clientProvider = require('./client.js');
const test =""

module.exports = function () {

sails.log.info(`Arduino - Successfully connected to MQTT: OK5`);
    return gladys.param.getValues(['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'])
        .spread(
        
            function (url, username, password) {
                let client = mqtt.connect(
                    url,
                    {
                        username: username,
                        password: password
                    }
                );
sails.log.info(`Arduino - Successfully connected to MQTT: ${url} et 1`);
                client.on('connect',
                    function () {

test="OK100";
sails.log.info(` to MQTT: ${test}`);
                        client.subscribe('#');

                        sails.log.info(`Arduino - Successfully connected to MQTT: ${url} et 2`);
                    }
                );

                client.on('error',
                    function () {
                        sails.log.warn(`Fail to connect to MQTT : ${url}`);
test="PASOK100";
                        client.end();
                    }
                );

                client.on('message',
                    function (topic, message) {
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
