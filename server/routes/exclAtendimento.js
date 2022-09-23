const express = require('express');
const app = module.exports = express();
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');
var raiz = path.dirname(process.mainModule.filename)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/excluir', (req, res) => {
    var unidade;
    fs.readFile(raiz + '/atendimento.json', function (err, map) {
        if (err) {
            console.log(err);
            return err;
        } else {
            let result = JSON.parse(map);
            let atendimentos = result.atendimentos.filter( atendimentoobj => {
                if(atendimentoobj.id == req.body.id) {
                    unidade = atendimentoobj.unidade;
                    return 0;
                } else {
                    return 1;
                }
            });
            result.atendimentos = atendimentos;
            result.numeroatendimentos[unidade] --;
            result = JSON.stringify(result);
            fs.writeFile(raiz + '/atendimento.json', result, err => {
                if (err) {  
                    console.log(err)
                    return err;
                }
                else console.log('Registro excluído com sucesso')
            });
        };
    });
    res.send(unidade);
});