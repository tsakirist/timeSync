'use strict';
const exec = require('child_process').execFile;

class Client {

    constructor(configFile) {
        this.config = require(configFile);
        console.log("Your configuration:\n", this.config);
        //TODO check the values of JSON otherwise use default values
    }

    start() {
        //TODO need to start the timesync client here
        let date = "";
        this.setDate(date);
    }

    /** Function setDate
     *  executes below command to set the date
     *  sudo date --set @ <number>
     *  <number> is expressed in seconds
     *  (root privilege is required)
     */
    setDate(date) { //TODO make it return promise instead of callback function
        exec(`sudo date --set @${date}`, (error, stdout, stderr) => {
            if (error!=null) {
                console.log('Error:',error);
                return;
            }
            this.setHwClock();
            console.log('Changed the date to:\n', stdout);
        });
    }

    setHwClock() { //TODO need to call this to change hardwareclock with option -w (set the hardware clock from the current system time)
    }
}

/**
 * config.json is the configuration file
 * make your changes there
 */
let configFile = "./config.json";

const client = new Client(configFile);
client.start();
