require('dotenv').config();

module.exports = {
    getSystemStatusService: function(params, res) {
        
        const reply = 
            [
                "I'm too lazy to implement this function",
                "What you gonna do about it?"
            ]
        
        var speechResponse = {
            google: {
            expectUserResponse: true,
            richResponse: {
                items: [
                    {
                        simpleResponse: {
                            textToSpeech: reply[0],
                        }
                    },
                    {
                        simpleResponse: {
                            textToSpeech: reply[1],
                        }
                    }
                ]
            }
            }
        };
    
        return res.json({
            payload: speechResponse,
            // fulfillmentText: reply,
            // speech: reply,
            // displayText: reply,
            source: "Homebot-bl"
        });
    }
}