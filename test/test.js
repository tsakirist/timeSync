const Datastore = require('nedb')
    , db = new Datastore({ filename: './mydb', autoload: true });










// let x = 971161810000;  //2000/10/10 , 10:10:10
// let x = 971161990000;
// Insert every 30sec to db
// setInterval(()=> {
//     x += 15000;
//     let doc = {
//         name: 'tryf',
//         timestamp: new Date(x)
//     };
//     db.insert(doc, (err, newDoc) => {
//         console.log(`Inserted ${newDoc.name}`);
//     });
// }, 15000);

// Find in increasing order
// db.find({}).sort({timestamp: 1}).exec((err, docs) => {
//     for(var i in docs) {
//         console.log(docs[i].timestamp);
//         console.log(docs[i].timestamp.toString());
//         console.log('\n');
//     }
// });

// db.insert({name:'test', timestamp: new Date(971176211234)}, (err, newDoc) => {
//     console.log('Inserted ', newDoc);
// });

