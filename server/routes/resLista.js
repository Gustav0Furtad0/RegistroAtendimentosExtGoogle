const express = require('express');
const app = module.exports = express();

app.get('/lista', (req, res) => {
    res.sendFile(__dirname + '../atendimento.json');
}); 