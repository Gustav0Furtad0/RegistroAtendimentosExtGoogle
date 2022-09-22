const express = require('express');
const app = module.exports = express();
const fs = require('fs');
const path = require('path');
var raiz = path.dirname(process.mainModule.filename)


app.get('/atendimento', (req, res) => {
    let query = req.query;
    if(addAtendimento(query.id, query.data, query.unidade, query.solicitante, query.desc))
        res.send('ERRO');
    else
        res.send();
});


function addAtendimento(id, date, unidade, solici, desc) {
    let atdObj = {
        id: id,
        date: date,
        unidade: unidade,
        solicitante: solici,
        descricao: desc
    }
    console.log(atdObj);
    
    fs.readFile(raiz + '/atendimento.json', function (err, map) {
        if (err) {
            console.log(err)
            return err;
        } else {
            let result = JSON.parse(map);
            result.numeroatendimentos[unidade] ++;
            result.atendimentos.unshift(atdObj);
            result.atendimentos.sort((a, b) => {
                if(a.id > b.id) return -1;
                if(a.id < b.id) return 1;
                return 0;
            });
            result = JSON.stringify(result);
            fs.writeFile(raiz + '/atendimento.json', result, err => {
                if (err) {
                    console.log(err)
                    return err;
                }
                else console.log('Registro feito com sucesso')
            });
        }
    });
}