import data from "./setup.js";

const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Graphique des mesures récoltées durant la campagne'
        }
      }
    },
  };

export default config

