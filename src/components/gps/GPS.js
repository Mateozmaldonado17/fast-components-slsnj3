import _ from 'lodash';
import ButtonComponent from 'formiojs/components/button/Button';

export default class GpsComponent extends ButtonComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'gps',
      lable: 'GPS',
      input: true,
      persistent: true,
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'GPS',
      group: 'advanced',
      icon: 'fa fa-location-arrow',
      weight: 90,
      documentation: 'http://help.form.io/userguide/#html-element-component',
      schema: ChartComponent.schema()
    };
  }
}

export default GpsComponent;