import Plot from 'react-plotly.js';

<Plot
  data={[
    {
      x: [30, 40, 50, 60],
      y: [5000, 15000, 30000, 60000],
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'green' },
    },
  ]}
  layout={{ title: 'Retirement Savings Over Time' }}
/>
