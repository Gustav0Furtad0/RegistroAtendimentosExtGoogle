function carregaAtendimentos (paramsBusca) {
    $.ajax({
        method: "GET",
        url: "http://192.168.0.165:3000/lista", 
        data: {paramsBusca}
    })
    .done(function( msg ) {
        let atendimentoobj = msg.atendimentos;
        atendimentoobj.forEach(element => {
            $("#lista").append(`
            <div class="atendimento">
                <div class="secUnSol">
                    <h4>Id: <span>${element.id}</span> | ${element.date}</h2>
                    <ul class="menu">
                        <li onclick="alert('Ainda não é possível editar atendimentos...')">Editar</li>
                        <li onclick="excluiAtendimento(this, '${element.id}')">Remover</li>
                    </ul>
                </div>
                <div class="secUnSol">
                    <h4>Unidade: <span>${element.unidade.toUpperCase()}</span></h2>
                    <h4>Solicitante: <span>${element.solicitante}</span></h2> 
                </div>
                <hr>
                <h4>Descrição</h4>
                <p>${element.descricao}</p>
            </div>
            `);
        });
        let numAtende = msg.numeroatendimentos;
        for (let obj in numAtende) {
            $("#numAtendimentos").children("ul").append(`
                <li>${obj.toUpperCase()+": "+numAtende[obj]}
            `);
        }
    });
};

function excluiAtendimento(element, id) {
    var r = confirm("Quer mesmo excluir o atendimento?");
    if (r == true) {
        $.ajax({
            method: "POST",
            url: "http://192.168.0.165:3000/excluir",
            data: { id: id } 
        })
        .done( msg => {
            //$(element).parents()[2].remove();
            alert("Atendimento excluído!");
            carregapag();
        });
    };
};

// function editAtendimento(id, solicitante, date, descricao, unidade) {
//     let params = {
//         id: id,
//         solicitante: solicitante,
//         date: date,
//         descricao: descricao,
//         unidade: unidade
//     };
//     $.ajax({
//         method: "POST",
//         url: "http://192.168.0.165:3000/editar",
//         data: params
//     })
//     .done( msg => {
//         //$(element).parents()[2].remove();
//         alert("Atendimento editado!");
//         carregapag();
//     });
// }