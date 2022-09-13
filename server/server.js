const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());

app.get('/lista', (req, res) => {
  res.sendFile(__dirname + '/atendimento.json')
}); 

app.get('/atendimento', (req, res) => {
  let query = req.query;
  if(addAtendimento(query.id, query.data, query.unidade, query.solicitante, query.desc))
    res.send('ERRO');
  else
    res.send();
});

app.listen(3000, () => {
  console.log('Servidor hospedado em: "localhost:3000"');
});

function addAtendimento(id, date, unidade, solici, desc) {
  let atdObj = {
    id: id,
    date: date,
    unidade: unidade,
    solicitante: solici,
    descricao: desc
  }
  console.log(atdObj)
  fs.readFile('server/atendimento.json', function (err, map) {
    if (err) {
      console.log(err)
      return err;
    }
    else {
      let result = JSON.parse(map);
      result.atendimentos.push(atdObj);
      result = JSON.stringify(result);
      fs.writeFile('server/atendimento.json', result, err => {
        if (err) {
          console.log(err)
          return err;
        }
        else console.log('Registro feito com sucesso')
      });
    }
  });
}