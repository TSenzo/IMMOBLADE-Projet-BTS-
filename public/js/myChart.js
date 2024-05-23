import config from "./config.js"
import { store } from "./store.js";

const myChart = new Chart(
    document.getElementById('myChartTempBlade').getContext('2d'),
    config
)


