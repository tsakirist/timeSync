'use strict';
const execFile = require('child_process').execFile;
const timesync = require('timesync');

class Client {

    constructor(configFile) {
        this.config = require(configFile);
    }

    start() {
        try {
            this.tsClient = this.create();
        }
        catch (err) {
            console.log(err);
            return;
        }
        this.tsClient.on('sync', arg => {
            if(arg === 'end') {
                let date = Math.floor(this.tsClient.now()/1000);
                this.setDate(date).then((out) => {
                    console.log("Resolved.\nChanged the date to:\n", out);
                }, (err)=> {
                    console.log('Rejected.\n', err);
                });
            }
            console.log(`Synchronization ${arg === 'start' ? 'started' : 'ended' }`);
        });
    }

    create() {
        if(!this.config.server) {
            throw new Error('You need to set the server URL in the config.json file.');
        }
        return timesync.create(this.config);
    }

    /** Function setDate
     *  executes below command to set the date
     *  date --set @ <number>
     *  <number> is expressed in seconds
     *  (root privilege is required)
     *  @returns {Promise}
     */
    setDate(date) {
        return new Promise((resolve, reject) => {
            // exec(`date --set @${date}`, (error, stdout) => {
            execFile('date', ['--set', `@${date}`], (error, stdout) => {
                if (error!=null) {
                    reject(error);
                }
                else {
                    this.setHwClock().then(()=> {
                        resolve(stdout);
                    }, (error) => {
                        reject(error);
                    });
                }
            });
        });
    }

    /** Function setHwClock
     *  sets the hardware clock from the current system time
     * @returns {Promise}
     */
    setHwClock() {
        return new Promise((resolve, reject)=>{
            execFile('hwclock', ['-w'], (error) => {
                if(error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
}

/** config.json is the configuration file
 *  make your changes there
 */
const configFile = "./config.json";

const client = new Client(configFile);
client.start();