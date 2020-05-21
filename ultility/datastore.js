const { Datastore } = require('@google-cloud/datastore');
const datastore = new Datastore();
const bluebird = require('bluebird');

let redis = require('redis');
let client = redis.createClient(6379);
bluebird.promisifyAll(redis.RedisClient.prototype);

client.on('connect', function() {
    console.log('<> Redis client connected');
});

client.on('error', error => {
    console.log('-- Redis %s', error);
});

module.exports = {

    getSecret: function(secretName) {
        return client.getAsync(secretName)
        .then(async function (result) {
            if (result) {
                console.log('<> retrieved %s from Redis', secretName);
                return result;
            } else {
                const dskey = datastore.key(['secrets', secretName]);
                const entity = await datastore.get(dskey);
                client.set(secretName, entity[0].value, 'EX', 60*60*24*7*2, redis.print);
                console.log('<> retrieved %s from datastore', secretName);
                return entity[0].value;
            }
        })
        .catch(error => {
            console.log('-- Redis getAsync error: &s', error);
        });
    }
}
