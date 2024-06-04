const assert = require('assert');

// exports.insertDocument = (db, document, collection, callback) => {
//     const coll = db.collection(collection);
//     coll.insertOne(document, (err, result) => {
//         assert.equal(err, null);
//         console.log(`Inserted ${result.result.n} documents into the collection ${collection}`);
//         callback(result);
//     });
// };

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insertOne(document);
};

// exports.findDocuments = (db, collection, callback) => {
//     const coll = db.collection(collection);
//     coll.find({}).toArray((err, docs) => {
//         assert.equal(err, null);
//         callback(docs);
//     });
// };

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
}; 

// exports.removeDocument = (db, document, update, collection, callback) => {
//     const coll = db.collection(collection);
//     coll.deleteOne(document, (err, result) => {
//         assert.equal(err, null);
//         console.log(`Removed the document ${document}`);
//         callback(result);
//     });
// };

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

// exports.updateDocument = (db, document, update, collection, callback) => {
//     const coll = db.collection(collection);
//     coll.updateOne(document, {$set: update}, null, (err, result) => {
//         assert.equal(err, null);
//         console.log(`Updated the document with ${update}`);
//         callback(result);
//     });
// };

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, {$set: update}, null);
};