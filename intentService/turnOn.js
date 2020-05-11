const datastore = require('../ultility/datastore');
const axios = require('axios');

module.exports = {
    turnOnService: async function(req_params, res) {
        
        req_params.channel.forEach(channel => axiosTurnOn(channel));


        async function axiosTurnOn(channel) {
            const url = 'http://blynk-cloud.com/' + await datastore.getSecret('BLYNK_AUTH_TOKEN') + '/update/V' + (parseInt(channel)-1).toString()
            axios.get(url, {
                params: {
                    value: '1'
                }
            })
        }

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
    }
}