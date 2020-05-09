module.exports = {
    turnOnService: function(params, res) {
        
        const {channel} = params;
        let reply = "Channel";

        console.log(params)
        channel.forEach(element => {
            reply = reply.concat(" ", element);
        });
        reply = reply.concat(" turned on");
        
        var speechResponse = {
            google: {
            expectUserResponse: false,
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