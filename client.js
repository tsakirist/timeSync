const timesync = require('timesync');
const exec = require('child_process').exec;

const  ts = timesync.create({
    server: 'http://localhost:3000/timesync',
});

// Get notified when sync starts/ends
ts.on('sync', arg => {
    if(arg === 'end') {
        let now = ts.now();
        /** Because set date command takes seconds as argument
         * if we want to pass milliseconds we need to divide
         * the number by 1000
         */
        now = now / 1000;
        console.log("Now:", now);
        setDate(now);
    }
    console.log(`Synchronization ${arg === 'start' ? 'started' : 'ended' }`);
});

// Get notified on changes in the offset
ts.on('change', offset => {
    console.log('Offset:',offset);
});

/** Function setDate
 *  executes below command to set the date
 *  sudo date --set @ <number>
 *  <number> is expressed in seconds
 *  (root privilege is required)
 */
function setDate(date) {
    exec(`sudo date --set @${date}`, (error, stdout, stderr) => {
        if (error!=null) {
            console.log('Error:',error);
            return;
        }
        console.log('Changed the date to:\n', stdout);
    });
}

