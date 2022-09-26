function carregaRelatorios(paramsBusca) {
    recebeAtendimentos(paramsBusca).then( msg => {
        insereGraficoPizza(msg.numeroatendimentos);
    });
}

function insereGraficoPizza(paramsGraph) {
    let arrayGrafico = [['Task', 'Atendimentos TI mês atual']];

    for (let unidade in paramsGraph) {
        arrayGrafico.push([unidade.toString().toUpperCase(), paramsGraph[unidade]])
    };

    console.log(arrayGrafico);

    google.charts.load( 'current', {'packages':['corechart']} );
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable(arrayGrafico);

        var options = {
            title: 'Atendimentos BRANET do mês atual',
            fontSize: '20',
            fontName: 'Roboto'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}