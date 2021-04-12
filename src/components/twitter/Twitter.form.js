import baseEditForm from 'formiojs/components/base/Base.form';

import TwitterEditDisplay from './editForm/Twitter.edit.display';
import TwitterEditData from './editForm/Twitter.edit.data';
import TwitterEditValidation from './editForm/Twitter.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: TwitterEditDisplay
    },
    {
      key: 'data',
      components: TwitterEditData
    },
    {
      key: 'validation',
      components: TwitterEditValidation
    }
  ], ...extend);
}