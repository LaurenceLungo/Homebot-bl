module.exports = {
    getTempService: function(params, res) {
        
        const reply = "Current temperature is -273K";
        
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