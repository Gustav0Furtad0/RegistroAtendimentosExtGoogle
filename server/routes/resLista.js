const express = require('express');
const app = module.exports = express();
const path = require('path');
var raiz = path.dirname(process.mainModule.filename)

app.get('/lista', (req, res) => {
    res.sendFile(raiz + '/atendimento.json');
}); 