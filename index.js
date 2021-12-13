const express = require('express');
const Datastore = require('nedb');

const app = express();
const port = process.env.PORT || 3000;

const database = new Datastore('database.db');
database.loadDatabase();

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/save_stranger', (request, response) => {
    console.log(request.body);
    const photo = request.photo;

    database.insert(request.body);
    response.end();
});

app.post('/delete_stranger', (request, response) => {
    const data = request.body;

    console.log(data);
    response.end();

    database.remove({ "_id": data.id_stranger }, {}, function (err, numRemoved) {

    });
});

// A new user
app.get('/newUser', (request, response) => {
    const id = { id: Math.floor(Math.random() * 1000000000) };
    console.log("New user joined with the id: " + id);
    response.send(id);
    response.end();
});

// Get the id and send all the stranger of the user
app.get('/get_all_strangers/:id', (request, response) => {
    const id = request.params.id;
    console.log(id);

    database.find({ 'userID': id }, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});