const MQTT            = require('mqtt');
const HANDLER         = require('./handler.js');
const CLIENT_PROVIDER = require('./client.js');

module.exports = function () {
    return gladys.param.getValues(['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'])
        .spread(
            function (url, username, password) {
                let client = MQTT.connect(
                    url,
                    {
                        username: username,
                        password: password
                    }
                );

                client.on('connect',
                    function () {
                        client.subscribe('clos-masure/#');

                        sails.log.info(`Arduino - Successfully connected to MQTT: ${url}`);
                    }
                );

                client.on('error',
                    function (error) {
                        sails.log.warn(`Fail to connect to MQTT : ${url}`);
                        client.end();
                    }
                );

                client.on('message',
                    function (topic, message) {
                        HANDLER(topic, message.toString());
                    }
                );

                CLIENT_PROVIDER.setClient(client);

                return client;
            }
        );
};