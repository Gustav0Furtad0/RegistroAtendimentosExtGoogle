const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
var raiz = path.dirname(process.mainModule.filename)

const addAtendimento = require('./routes/addAtendimentos')
const resLista = require('./routes/resLista')

app.use(cors());

app.use(express.static('client'))

app.use(addAtendimento);  

app.use(resLista);

app.get('/' , (req, res) => {
  console.log("pediu")
  res.sendFile(raiz + '/client/index.html');
});

app.listen(3000, () => {
  console.log('Servidor hospedado em: "localhost:3000"');
});
