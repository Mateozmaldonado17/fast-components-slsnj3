import { Components } from 'formiojs';
import baseEditForm from 'formiojs/components/base/Base.form';

import ChartEditDisplay from './editForm/Chart.edit.display';
import ChartEditData from './editForm/Chart.edit.data';


export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: ChartEditDisplay
    },
    {
      key: 'data',
      components: ChartEditData
    },
    {
      key: 'validation',
      ignore: true
    }
  ]);
}