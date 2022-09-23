const express = require('express');
const app = module.exports = express();
const bodyParser = require("body-parser");
//const fs = require('fs');
//const path = require('path');
//var raiz = path.dirname(process.mainModule.filename)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/excluir', (req, res) => {
    
    res.send(req.body.id);
});