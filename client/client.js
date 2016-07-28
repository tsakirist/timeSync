'use strict';
const execFile = require('child_process').execFile;
const timesync = require('timesync');

class Client {

    constructor(configFile) {
        this.config = configFile;
        this.updateService = require('../service/update').updateRecords;
    }

    start() {
        try {
            this.tsClient = this.create();
        }
        catch (err) {
            console.error(err);
            return;
        }
        this.tsClient.on('sync', arg => {
            if(arg === 'end') {
                // const date = Math.floor(this.tsClient.now()/1000);
                let date = this.tsClient.now();
                // delta = date - Date.now();
                const delta = date - 971176210000; // Tue Oct 10 2000 14:10:10
                date = Math.floor(date/1000);
                this.setDate(date).then((out) => {
                    console.log("Resolved.\nChanged the date to:\n", out);
                    this.updateService(delta);
                    // TODO check the promise returned to set the flag to synced or not for the cloud
                }, (err)=> {
                    console.error('Rejected.\n', err);
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
     *  @param {number} date
     *  @returns {Promise}
     */
    setDate(date) {
        return new Promise((resolve, reject) => {
            execFile('date', ['--set', `@${date}`], (error, stdout) => {
                if (error) {
                    reject(error);
                }
                else {
                    this.setHwClock().then(() => {
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
        return new Promise((resolve, reject) => {
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

module.exports = Client;
