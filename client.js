const timesync = require('timesync');

const  ts = timesync.create({
    server: 'http://localhost:3000/timesync',
    interval: 5000  // Set the sync interval to 5sec
});

// Get notified when sync starts/ends
ts.on('sync', arg => {
    console.log(`Synchronization ${arg === 'start' ? 'started' : 'ended' }`);
});

// Get notified on changes in the offset
ts.on('change', offset => {
    console.log('Offset:',offset);
    console.log('Sync time:',ts.now());
});

/** Execute below command to set the date
 *  sudo date --set @ <number>
 *  <number> is expressed in milliseconds
 *  (root privilege is required)
 */
const exec = require('child_process').exec;
exec('sudo date --set @772543821', (error, stdout, stderr) => {
    if (error!=null) {
        console.log(error);
        return;
    }
    console.log('Changed the date to:\n', stdout);
});
