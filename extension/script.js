document.addEventListener('DOMContentLoaded', () => {
    let today = new Date();

    var data = document.querySelector("#daydate");
    var btn = document.querySelector("#aja");
    var formatdate = `${today.getDate()}/${today.getMonth() <= 9 ? `0${today.getMonth()+1}` : today.getMonth()+1}/${today.getFullYear()}`;
    var dataForm = document.querySelector("#dataatendimento");
    var descform = document.querySelector('#texto');
    var desctipo = document.querySelector('#tipoatd')
    data.innerHTML = formatdate;

    function getAtendimentos() {
        let requestURL = 'http://192.168.0.165:3000/lista';
        let request = new XMLHttpRequest(); 
        request.open('GET', requestURL);
        request.responseType = 'json';  
        request.send('teste');
        request.onload = () => {
            let resposta = request.response.atendimentos;
            document.querySelector('#atendimentos').innerHTML = `Número de atendimentos: ${resposta.length}`;
        }
    }

    getAtendimentos();

    btn.addEventListener('click', sendheader);

    

    function sendheader() {
        today = new Date();
        let texto = descform.value;
        let tipo = desctipo.value;
        if(!texto) {
            alert("Digite alguma coisa para registrar");
            return;
        }
        let unidade = document.querySelector('#unidade');
        unidade = unidade.options[unidade.selectedIndex].value;
        let solicitante, desc;
        [solicitante, ...desc] = texto.split(' ');
        desc = desc.join(' ');
        xhttp = new XMLHttpRequest();
        let url = `http://192.168.0.165:3000/atendimento?solicitante=${solicitante}&desc=${desc}&unidade=${unidade}&data=${dataForm.value}&id=${today.getTime()}&tipo=${tipo}`;
        xhttp.open("GET", url);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
                getAtendimentos();
                descform.value = '';
            }
        };  
        xhttp.send();
    };
}); 