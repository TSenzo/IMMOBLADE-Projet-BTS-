function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    }); 
    chart.update();
}

let compteur = 0;
let date = [];
let mesures = [];

//var req = new XMLHttpRequest();
//req.open("GET", "")
    const canvas = document.getElementById("myChartTempBlade");
    const ctx = canvas.getContext("2d"); // node

const chart = new Chart(ctx, {
    type: "line",
    labels: [],
    data: {
        labels: [],
        datasets: [{
            label: 'Température',
            data: [],
            backgroundColor: "blue", //Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
            fill: false
        }
        ]
    }
})




const sse = new EventSource('/events');
sse.addEventListener("message", function (e) { 
    const json = JSON.parse(e.data);
    date.push(new Date().toUTCString());
     mesures.push(json.temperature);

    // Test unitaire !!!
    // mesures.push(json.num);

    let label = date[date.length - 1];
    console.log(label);
    let temperature = mesures[mesures.length - 1];

    console.log(mesures);
    addData(chart, label, temperature);
})