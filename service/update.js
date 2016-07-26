'use strict';

const Datastore = require('nedb');
const db = new Datastore({filename: 'test/mydb', autoload: true });

/** Function updateRecords
 *  is responsible to update the records, given the delta
 *  @param {number} delta
 *  @returns {Promise} MALLON
 */
module.exports.updateRecords = (delta) => {
    console.log('Delta is:',delta);
    db.find({timestamp: { $lt: new Date(1002697810000)}}, (err, docs) => {
        console.log(docs);
    });
};