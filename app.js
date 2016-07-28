'use strict';
/** config.json is the configuration file
 *  make any changes there
 */
const configFile = require('./config/config.json');
const Client = require('./client/client');
const client = new Client(configFile);
client.start();

module.exports = client;