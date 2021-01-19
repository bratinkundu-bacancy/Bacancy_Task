const DB = require('./app/Utils/db.config')
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());


const routes = require('./app/Routes/resources.routes');

app.use('/resource', routes)

//App listen
app.listen(3000, async () => {
    await DB();
    console.log('Resource CRUD Example running....');
});