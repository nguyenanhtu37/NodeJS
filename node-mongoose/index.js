const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://127.0.0.1:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to server');

    // Chèn và xử lý tài liệu 'Orange'
    Dishes.create({
        name: 'Orange',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.find({}).exec();
    })
    .then((dishes) => {
        console.log(dishes);

        return Dishes.deleteMany({});
    })
    .then(() => {
        console.log("Collection cleared");

        // Chèn và xử lý tài liệu 'Uthapizza'
        return Dishes.create({
            name: 'Uthapizza',
            description: 'Test'
        });
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.find({}).exec();
    })
    .then((dishes) => {
        console.log(dishes);

        return Dishes.deleteMany({});
    })
    .then(() => {
        console.log("Collection cleared");
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
});
