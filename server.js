const express = require('express');
const app = express();
const port = 3002;
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
var cors = require('cors');

var bodyParser = require('body-parser')
const adapter = new FileSync('db.json');
const db = low(adapter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    var abc = db.get('login')
        .find({ role: "biker" })
        .value()
    res.send(abc)
})


app.post('/login', (req, res) => {
    console.log(req.body)
    var data = db.get('login')
        .find({ role: req.body.role })
        .value()
    if (req.body.email === data.email && req.body.password === data.password) {
        res.status(200);
        res.send({ message: 'Successfull', data });
    }
    else {
        res.status(400);
        res.send({ error: "Invalid Username And Password" });
    }
});

app.get('/bikers', (req, res) => {
    var biker = db.get('bikers');
    if (biker) {
        res.status(200);
        res.send({ message: 'Successfull', biker: biker });
    }
    else {
        res.status(400);
        res.send({ error: "Error! Something went wrong" });
    }
})

app.get('/parcels', (req, res) => {
    var order = db.get('parcels');
    if (order) {
        res.status(200);
        res.send({ message: 'Successfull', order: order });
    }
    else {
        res.status(400);
        res.send({ error: "Error! Something went wrong" });
    }
})

app.put('/parcels', (req, res) => {
    var obj = { assignee: req.body.biker_id };
    if (req.body.status) {
        obj['status'] = req.body.status
    }
    var order = db.get('parcels')
        .find({ order_id: req.body.order_id })
        .assign(obj)
        .write();
    ;
    if (order) {
        res.status(200);
        res.send({ message: 'Successfull', order: order });
    }
    else {
        res.status(400);
        res.send({ error: "Error! Something went wrong" });
    }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))