'use strict';
// THIS EXAMPLE IS USING NEDB
// NEED TO CHANGE THIS SERVICE TO UPDATE ENTRIES, ACCORDING TO THE DESIRED DB
const Datastore = require('nedb');
const db = new Datastore({filename: 'test/mydb', autoload: true });

/** Function updateRecords
 *  is responsible to update the records, given the delta
 *  this is simple done by adding the delta to every record that has wrong timestamp
 *  @param {number} delta
 *  @returns {Promise} maybe?? so we can set clients flag to `synced` for the cloud
 */
module.exports = {
    updateRecords: (delta) => {
        // The new Date(991161960000) which is: Tue May 29 2001 21:46:00 GMT+0300
        // is used as an upper bound at which to search for wrong dates in the db
        db.find({timestamp: {$lt: new Date(991161960000)}}, (err, docs) => {
            var temp;
            for (const doc of docs) {
                temp = doc.timestamp.getTime() + delta;
                console.log(doc.timestamp + ' + delta = ' + new Date(temp));
            }
        });

        // The update process should be done right here!!!
    }
};
