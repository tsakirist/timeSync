'use strict';
const Datastore = require('nedb');
const db = new Datastore({filename: 'test/mydb', autoload: true });

/** Function updateRecords
 *  is responsible to update the records, given the delta
 *  this is simple done by adding the delta to every record that has wrong timestamp
 *  @param {number} delta
 *  @returns {Promise} maybe so we can set clients flag to `synced` for the cloud
 */
module.exports = {
    updateRecords: (delta) => {
        console.log('Delta is:', delta);

        db.find({timestamp: {$lt: new Date(991161960000)}}, (err, docs) => {
            console.log(docs);
            var temp;
            for (const doc of docs) {
                temp = doc.timestamp.getTime() + delta;
                console.log(doc.timestamp + ' + delta = ' + new Date(temp));
                // To save to db just new Date(temp) and $set existing field.
            }
        });
    }
};
