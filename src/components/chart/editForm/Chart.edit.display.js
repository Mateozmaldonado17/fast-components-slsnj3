export default [
  {
    type: 'select',
    input: true,
    key: 'chart.type',
    weight: 50,
    label: 'Chart Type',
    placeholder: 'Select chart type',
    tooltip: 'The Chart.js chart type to render.',
    dataSrc: 'values',
    data: {
      values: [
        {label: 'Bar', value: 'bar'},
        {label: 'Line', value: 'line'},
        {label: 'Radar', value: 'radar'},
        {label: 'Pie', value: 'pie'},
        {label: 'Doughnut', value: 'doughnut'},
        {label: 'Polar Area', value: 'polarArea'},
        {label: 'Bubble', value: 'bubble'},
        {label: 'Scatter', value: 'scatter'},
        {label: 'Area', value: 'area'},
      ]
    }
  },
  {
    type: 'textarea',
    input: true,
    editor: 'ace',
    rows: 10,
    as: 'json',
    label: 'Options',
    tooltip: 'The Chart.js options.',
    defaultValue: '{}',
    key: 'chart.options',
    weight: 80
  },
  {
    weight: 85,
    type: 'checkbox',
    label: 'Refresh On Change',
    tooltip: 'Rerender the field whenever a value on the form changes.',
    key: 'refreshOnChange',
    input: true
  },
];