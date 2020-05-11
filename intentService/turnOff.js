require('dotenv').config();
const axios = require('axios');

module.exports = {
    turnOffService: function(req_params, res) {
        
        req_params.channel.forEach(channel => axiosTurnOff(channel));


        function axiosTurnOff(channel) {
            const url = 'http://blynk-cloud.com/' + process.env.BLYNK_AUTH_TOKEN + '/update/V' + (parseInt(channel)-1).toString()
            axios.get(url, {
                params: {
                    value: '0'
                }
            })
        }

        const channel = req_params.channel || [];
        let reply = "Channel";

        channel.forEach(element => {
            reply = reply.concat(" ", element);
        });
        reply = reply.concat(" turned off");
        
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