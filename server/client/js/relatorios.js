function carregaRelatorios(paramsBusca) {
    recebeAtendimentos(paramsBusca).then( msg => {
        insereGraficoUnidade(msg.numeroatendimentos);
        insereGraficoTipo(msg.tipoatendimento);
    });
}

function insereGraficoUnidade(paramsGraph) {
    let arrayGrafico = [['Task', 'Atendimentos TI mês atual por unidade']];

    for (let unidade in paramsGraph) {
        arrayGrafico.push([unidade.toString().toUpperCase(), paramsGraph[unidade]])
    };

    console.log(arrayGrafico);

    google.charts.load( 'current', {'packages':['corechart']} );
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable(arrayGrafico);

        var options = {
            title: 'Atendimentos BRANET do mês atual por unidade',
            fontSize: '20',
            fontName: 'Roboto'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}

function insereGraficoTipo(paramsGraph) {
    let arrayGrafico = [['Task', 'Atendimentos TI mês atual por tipo']];

    for (let tipo in paramsGraph) {
        arrayGrafico.push([tipo.toString().toUpperCase(), paramsGraph[tipo]])
    };

    console.log(arrayGrafico);

    google.charts.load( 'current', {'packages':['corechart']} );
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable(arrayGrafico);

        var options = {
            title: 'Atendimentos BRANET do mês atual por tipo',
            fontSize: '20',
            fontName: 'Roboto'
        };

        var chart = new google.visualization.PieChart(document.getElementById('atendimentostipo'));

        chart.draw(data, options);
    }
}