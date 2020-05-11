const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();

module.exports = {

    getSecret: async function(name) {
        const dskey = datastore.key(['secrets', name]);
        const entity = await datastore.get(dskey);
        return entity[0].value;
    }
}