const actions = [
    {
      name: 'Randomize',
      handler(chart) {
        chart.data.datasets.forEach(dataset => {
          dataset.data = Math.random();
        });
        chart.update();
      }
    },
  ];

export default actions