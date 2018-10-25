*Don't forget to **install `node_modules`**!*

# Gladys Parameters
In order to connect to your MQTT broker this module uses three (3) Gladys parameters:
* `MQTT_URL`: the address of your MQTT broker, including the protocol used (`mqtt` or `mqtts`) and its port (`1883` by default);
* `MQTT_USERNAME`: the username required to connect to your MQTT broker;
* `MQTT_PASSWORD`: the password required to connect to your MQTT broker.

# How to configure your Gladys Devices?
Basically you can configure them the way you want them to be configured. However there are a few rules to follow for the module to work:
* The `protocol` setting of your device must be set to either `mqtt` or `mqtts` so an action in the `Control my devices` section of Gladys can be caught by the module, otherwise it will be ignored;
* The `service` setting of your device must be set to `mqtt-controller` for the same reason;
* One `DeviceType` represents one property of your device (more information below);
* You can set the other settings as you wish.

# How are messages sent to devices?
Once your devices are configured, you can send them messages via the `Control my devices` section of the `Device` control panel of Gladys.

Basically, the module constructs the channel's "address" by concatenating the `device`'s `identifier` with the `DeviceType`'s one and sends a JSON string containing one key-value pair determined by the `DeviceType`'s `type` and the `value` you've set your `DeviceType` to.

## Example
I have one `Device` configured as following:

Name | Identifier | Protocol | Service
-----|------------|----------|--------
LED strip | home/livingroom/ledstrip | mqtt | mqtt-controller

*The other settings are free to be anything you want them to be.*

This device contains two `DeviceType`s set as following:

Identifier | Type | Min | Max | Display
-----------|------|-----|-----|--------
desk/1|pattern|0|9|True
desk/1|brightness|0|100|True

*These two `DeviceType`s represent two parameters of a unique LED strip, but you could add another one by creating a new `Identifier`.*

Now let's pretend I would like to set the brightness of my LED strip to 80%; I set the slider to `80` in the row called `LED strip - brightness`.
Automatically, a MQTT message is sent to `home/livingroom/ledstrip/desk/1` containing the string `{"brightness": 80}`. Of course, your device must be subscribed to this channel.