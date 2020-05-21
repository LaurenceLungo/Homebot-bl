const datastore = require('../ultility/datastore');
const axios = require('axios');
const hardwareHealthCheck = require("../ultility/hardwareHealthCheck").hardwareHealthCheck;

module.exports = {
    turnOnService: async function(req_params, res) {
        
        req_params.channel.forEach(channel => axiosTurnOn(channel));

        async function axiosTurnOn(channel) {
            datastore.getSecret('BLYNK_AUTH_TOKEN')
            .then(BLYNK_AUTH_TOKEN => {
                const url = 'https://api.yocto.hk/blynk/' + BLYNK_AUTH_TOKEN + '/update/V' + (parseInt(channel)-1).toString()
                axios.get(url, {
                    params: {
                        value: '1'
                    }
                })
            })
            .catch(error => {
                console.log('-- getSecret error: %s', error);
            });
        }

        const [ isHardwareConnected, hardwareDisconnectedMessage ] = await hardwareHealthCheck();

        if (isHardwareConnected) {

            const channel = req_params.channel || [];
            let reply = "Channel";

            channel.forEach(element => {
                reply = reply.concat(" ", element);
            });
            reply = reply.concat(" turned on");
            
            var speechResponse = {
                google: {
                expectUserResponse: true,
                richResponse: {
                    items: [
                    {
                        simpleResponse: {
                        textToSpeech: reply
                        }
                    }
                    ]
                }
                }
            };
        
            return res.json({
                payload: speechResponse,
                fulfillmentText: reply,
                speech: reply,
                displayText: reply,
                source: "Homebot-bl"
            });
        } else {
            return res.json(hardwareDisconnectedMessage);
        }
    }
}