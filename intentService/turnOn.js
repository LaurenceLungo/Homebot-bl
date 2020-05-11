require('dotenv').config();
const axios = require('axios');

module.exports = {
    turnOnService: function(req_params, res) {
        
        req_params.channel.forEach(channel => axiosTurnOn(channel));


        function axiosTurnOn(channel) {
            const url = 'http://blynk-cloud.com/' + process.env.BLYNK_AUTH_TOKEN + '/update/V' + (parseInt(channel)-1).toString()
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