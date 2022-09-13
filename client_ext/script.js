document.addEventListener('DOMContentLoaded', () => {

    let today = new Date();

    var data = document.querySelector("#daydate");
    var btn = document.querySelector("#aja");
    var formatdate = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`;
    data.innerHTML =  formatdate;

    function getAtendimentos() {
        let requestURL = 'http://192.168.0.165:3000/lista';
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send('teste');
        request.onload = function () {
            let resposta = request.response.atendimentos;
            document.querySelector('#atendimentos').innerHTML = `Número de atendimentos: ${resposta.length}`;
        }
    }

    getAtendimentos();

    btn.addEventListener('click', sendheader);

    function sendheader() {
        texto = document.querySelector('#texto').value;
        unidade = document.querySelector('#unidade');
        unidade = unidade.options[unidade.selectedIndex].value;
        let solicitante, desc;
        [solicitante, ...desc] = texto.split(' ');
        desc = desc.join(' ');
        xhttp = new XMLHttpRequest();
        let url = `http://192.168.0.165:3000/atendimento?solicitante=${solicitante}&desc=${desc}&unidade=${unidade}&data=${formatdate}&id=${today.getTime()}`;
        xhttp.open("GET", url);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
                getAtendimentos();
            }
        };
        xhttp.send();
    }
}); 