const express = require('express');
const app = express();
const cors = require('cors');

const addAtendimento = require('./routes/addAtendimentos')
const resLista = require('./routes/resLista');
const exclAtendimento = require('./routes/exclAtendimento');

const os = require('os');
const networkInfo = os.networkInterfaces();
const PORT = 3000;

const path = require('path')

app.use(cors());

app.use(express.static(path.join(__dirname, 'client')))
app.use(addAtendimento);  
app.use(resLista);
app.use(exclAtendimento)

app.get('/' , (req, res) => {
  console.log("pediu")
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(PORT, () => {
  console.log(`Servidor hospedado em: "${networkInfo.Ethernet[1].address}:${PORT} || localhost:${PORT}"`);
});
