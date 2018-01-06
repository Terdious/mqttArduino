const mqtt           = require('mqtt');
const handler        = require('./handler.js');
const clientProvider = require('./client.js');

module.exports = function () {
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

                client.on('connect',
                    function () {
                        client.subscribe('#');

                        sails.log.info(`Arduino - Successfully connected to MQTT: ${url}`);
                    }
                );

                client.on('error',
                    function () {
                        sails.log.warn(`Fail to connect to MQTT : ${url}`);
                        client.end();
                    }
                );

                client.on('message',
                    function (topic, message) {
                        handler(topic, message.toString());
                    }
                );

                clientProvider.setClient(client);

                return client;
            }
        );
};