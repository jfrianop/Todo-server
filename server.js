const express = require('express');
const app = express();

//Public folder
app.use(express.static('public'));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var tasks = [];

app.get('/', (req, res) => {
    res.sendFile("index.html")
});

app.get('/tasks', (req, res) => {
    res.json(tasks)
});

app.post('/tasks', (req, res) => {
    var task = req.body;
    task.id = tasks.length + 1;
    tasks.push(task);
    res.json({ id: task.id });
});

app.patch('/tasks', (req, res) => {
    var id = req.query.id;
    var task = req.body;
    task.id = tasks.length;
    tasks.push(task);
    res.json({ id: task.id });
});

app.listen(3000);