const bodyParser = require('body-parser');
const express = require('express');
const app = module.exports = express();
const fs = require('fs');
const path = require('path');
var raiz = path.dirname(process.mainModule.filename)


app.get('/atendimento', (req, res) => {
    let query = req.query;
    if(addAtendimento(query.id, query.data, query.unidade, query.solicitante, query.desc, query.tipo))
        res.send('ERRO');
    else
        res.send();
});


function addAtendimento(id, date, unidade, solici, desc, tipo) {
    let atdObj = {
        id: id,
        date: date,
        unidade: unidade,
        solicitante: solici,
        descricao: desc,
        tipo: tipo
    }
    console.log(atdObj);
    
    fs.readFile(raiz + '/atendimento.json', function (err, map) {
        if (err) {
            console.log(err)
            return err;
        } else {
            let result = JSON.parse(map);
            result.numeroatendimentos[unidade] ++;
            result.tipoatendimento[tipo] ++;
            result.atendimentos.unshift(atdObj);
            result.atendimentos.sort((a, b) => {
                let dataA = a.date.split("-");
                dataA = new Date(dataA[0], dataA[1], dataA[2]);
                let dataB = b.date.split("-");
                dataB = new Date(dataB[0], dataB[1], dataB[2]);
                if      (dataA > dataB) 
                    return -1
                else if (dataA < dataB) 
                    return 1
                else {
                    if(a.id > b.id) return -1;
                    if(a.id < b.id) return 1;
                }
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
        };
    });
};