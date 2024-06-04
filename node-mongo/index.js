const MongoClient = require('mongodb').MongoClient; // Client sử dụng để kết nối đến máy chủ
const assert = require('assert'); // module thực thiện kiểm tra xác nhận, đảm bảo mã hoạt động đung như mong đợi

const dboperation = require('./operations');

const url = 'mongodb://127.0.0.1:27017';
const dbname = 'conFusion';

// MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
//     /*
//     MongoClient.connect(url, (callback)): Kết nối đến MongoDB sử dụng url đã định nghĩa, hàm callback được gọi sau khi kết nối thành công hoặc thất bại
//     */

//     assert.equal(err, null); // check if err == null ???

//     console.log('Connected correctly to server');

//     const db = client.db(dbname); // truy cap csdl
//     const collection = db.collection("dishes"); // truy cap collection

//     /**
//      * collection.insertOne(document, callback):
//      * insert document to collection
//      * callback func will be called after insert successfully or failed
//      */
//     // collection.insertOne({ "name": "Pizza", "description": "Pizza Hub" },
//     //     (err, result) => {
//     //         assert.equal(err, null);

//     //         console.log("After Insert:\n");
//     //         console.log(result.ops); // print out all documents were inserted

//     //         collection.find({}).toArray((err, docs) => {
//     //             assert.equal(err, null);

//     //             console.log("Found:\n");
//     //             console.log(docs);

//     //             // db.dropCollection("dishes", (err, result) => {
//     //             //     assert.equal(err, null);

//     //             //     client.close();
//     //             // });

//     //             client.close();
//     //         });
//     //     });

//     dboperation.insertDocument(db, {name: "Vadonut", description: "Test"}, "dishes", (result) => {
//         console.log("Insert Document:\n", result.ops);

//         dboperation.findDocuments(db, "dishes", (docs) => {
//             console.log("Found Documents:\n", docs);

//             dboperation.updateDocument(db, {name: "Vadonut"}, {description: "Updated Test"}, "dishes", (result) => {
//                 console.log("Updated Document:\n", result.result);

//                 dboperation.findDocuments(db, "dishes", (docs) => {
//                     console.log("Found Updated Documents:\n", docs);

//                     db.dropCollection('dishes', (result) => {
//                         console.log("Dropped Collection: ", result);

//                         client.close();
//                     });
//                 });
//             });
//         });
//     });
// });

MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboperation.insertDocument(db, { name: "Vadonut", description: "Test" },
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboperation.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboperation.updateDocument(db, { name: "Vadonut" },
                { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboperation.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);

            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
    .catch((err) => console.log(err));
