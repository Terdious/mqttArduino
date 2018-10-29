const SHARED = require('../shared');

module.exports = function (topic, message) {
    message = JSON.parse(message);

    const MY_LAST_SLASH_INDEX      = topic.lastIndexOf('/');
    const MY_DEVICE_IDENTIFIER     = topic.substring(0, MY_LAST_SLASH_INDEX).replace(SHARED.statesTopicPrefix, SHARED.commandTopicPrefix);
    const MY_DEVICETYPE_IDENTIFIER = topic.substring(MY_LAST_SLASH_INDEX + 1);

    gladys.device.getByIdentifier(
        {
            identifier: MY_DEVICE_IDENTIFIER,
            service: SHARED.serviceName
        }
    ).then(function (device) {
        gladys.deviceType.getByDevice(device)
            .then(function (deviceTypes) {
                let myDeviceTypeIndex = deviceTypes.findIndex(function (deviceType)  {
                    return deviceType.identifier === MY_DEVICETYPE_IDENTIFIER;
                });

                let myDeviceType = deviceTypes[myDeviceTypeIndex];

                gladys.deviceState.get({
                    deviceType: myDeviceType,
                    take: 1
                }).then(function (deviceStates) {
                    let myDeviceState = deviceStates[0];

                    if (myDeviceState.value !== message[myDeviceType.type]) {
                        sails.log.error('VALEURS DIFFÉRENTES');

                        gladys.deviceState.createByDeviceTypeIdentifier(MY_DEVICETYPE_IDENTIFIER, SHARED.serviceName, {
                            value: message[myDeviceType.type]
                        }).then(function (state) {
                            sails.log.info('VALEUR RESET');
                        }).catch(function (err) {
                            sails.log.error('IMPOSSIBLE DE RESET LA VALEUR');
                            sails.log.error(err);
                        });
                    }
                });
            });
    });

};