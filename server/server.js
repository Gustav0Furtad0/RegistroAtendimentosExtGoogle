const express = require('express');
const app = express();
const cors = require('cors');
var path = require('path');

const addAtendimento = require('./routes/addAtendimentos')
const resLista = require('./routes/resLista')

app.use(cors());

app.use(addAtendimento);

app.use(resLista);

app.get('/' , (req, res) => {
  let raiz = path.dirname(process.mainModule.filename);
  console.log(__dirname+ '\..\client\index.html');
  res.sendFile(__dirname + '\..\client\index.html');
});

app.listen(3000, () => {
  console.log('Servidor hospedado em: "localhost:3000"');
});

