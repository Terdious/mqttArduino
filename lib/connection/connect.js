const mqtt           = require('mqtt');
const handler        = require('./handler.js');
const clientProvider = require('./client.js');

module.exports = function () {
    return gladys.param.getValues(['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'])
    sails.log.info(`Arduino - Successfully connected to MQTT: OK5`);
        .spread(
            function (url, username, password) {
                sails.log.info(`Arduino - Successfully connected to MQTT: ${url} ${username} ${password}`);
                let client = mqtt.connect(
                    url,
                    {
                        username: username,
                        password: password
                    }
                );
                sails.log.info(`Arduino - Successfully connected to MQTT: ${username}`);
                sails.log.info(`Arduino - Successfully connected to MQTT: ${password}`);
                sails.log.info(`Arduino - Successfully connected to MQTT: ${url}`);
                client.on('connect',
                    function () {
                        client.subscribe('#');

                        sails.log.info(`Arduino - Successfully connected to MQTT: ${url}`);
                    }
                );

                client.on('error',
                    function () {
                        sails.log.info(`Fail to connect to MQTT: ${url}`);
                        sails.log.warn(`Fail to connect to MQTT : ${url}`);
                        client.end();
                    }
                );

                client.on('message',
                    function (topic, message) {
                        handler(topic, message.toString());
                    sails.log.info(`Arduino - Successfully connected to MQTT: OK6`);
                    }
                );

                clientProvider.setClient(client);
                sails.log.info(`Arduino - Successfully connected to MQTT: OK6`);
                return client;
            }
        );
};
