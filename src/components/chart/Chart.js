import _ from 'lodash';
import axios from 'axios';
import Chart from 'chart.js';

import { BaseComponent } from 'formiojs/components';

export default class ChartComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'chart',
      label: 'Chart',
      hideLabel: false,
      attrs: [],
      input: false,
      persistent: false,
      chart: {
        type: "bar",
        data: {
          sort: false,
          limit: false,
          datasets: [],
          theme: "custom",
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                  beginAtZero:true
              }
            }]
          }
        }
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Chart',
      group: 'advanced',
      icon: 'fa fa-bar-chart',
      weight: 90,
      documentation: 'http://help.form.io/userguide/#html-element-component',
      schema: ChartComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.chartjs = {
      type: this.component.chart.type,
      data: {},
      options: this.component.chart.options
    };
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'chart';
    if (this.component.customClass) {
      info.attr.class += ` ${this.component.customClass}`;
    }
    return info;
  }

  refreshChart() {
    const sort = this.component.chart.data.sort;
    const limit = this.component.chart.data.limit || 0;
    const ctx = this.element.querySelector('canvas.chartjs-canvas').getContext('2d');
    this.chartjs.data.datasets = [];
    this.chartjs.data.labels = [];
    let promises = [];
    if (Array.isArray(this.component.chart.data.datasets)) {
      this.component.chart.data.datasets.forEach((item) => {
        promises.push(this.loadDataSet(item));
      });
    }
    axios.all(promises).then((items) => {
      items.forEach((dataset) => {
        dataset.data = sort ? _.orderBy(dataset.data, 'value', sort) : dataset.data;
        this.chartjs.data.labels = dataset.data.map((item) => { return item.label; });
        dataset.data = dataset.data.map((item) => { return item.value; });
        if (limit > 0) {
          dataset.data = _.slice(dataset.data, 0, limit);
          this.chartjs.data.labels = _.slice(this.chartjs.data.labels, 0, limit);
        }
        this.chartjs.data.datasets.push(dataset);
      });
      return new Chart(ctx, this.chartjs);
    });
  }

  loadDataSet(item) {
    const dataset = {
      label: item.label,
      data: [],
      backgroundColor: item.backgroundColor,
      borderColor: item.borderColor,
      borderWidth: item.borderWidth
    };
    let labels = [];

    return new Promise((resolve, reject) => {
      if (item.dataSrc === 'values' && Array.isArray(item.data.values)) {
        resolve(item.data.values);
      } else if (item.dataSrc === 'url' && item.data.url) {
        axios.get(item.data.url).then((response) => {
          if (Array.isArray(response.data)) {
            response.data.forEach((value) =>{
              dataset.data.push({ value: value[item.valueProperty], label: value[item.labelProperty] });
            });
          }
          resolve(dataset);
        }).catch((error) => reject(error));
      } else {
        resolve(dataset);
      }
    });
  }

  get defaultSchema() {
    return ChartComponent.schema();
  }

  createCanvas(container) {
    const wrapper = this.ce('div', { class: 'chartjs-wrapper' });
    this.canvasElement = this.ce('canvas', { class: 'chartjs-canvas' });
    this.setInputStyles(wrapper);
    wrapper.appendChild(this.canvasElement);
    container.appendChild(wrapper);
  }

  build() {
    this.createElement();
    this.element.component = this;

    const labelAtTheBottom = this.component.labelPosition === 'bottom';
    if (!labelAtTheBottom) {
      this.createLabel(this.element);
    }
    this.createCanvas(this.element);
    if (labelAtTheBottom) {
      this.createLabel(this.element);
    }
    this.createDescription(this.element);

    _.each(this.component.attrs, (attr) => {
      if (attr.attr) {
        this.element.setAttribute(attr.attr, attr.value);
      }
    });
    
    this.refreshChart();

    if (this.component.refreshOnChange) {
      this.on('change', () => this.refreshChart());
    }
  }
}