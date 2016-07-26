/** config.json is the configuration file
 *  make any changes there
 */
const path = require('path');
const configFile = path.resolve(__dirname + "/config.json");
const Client = require('./client/client');
const client = new Client(configFile);
client.start();
