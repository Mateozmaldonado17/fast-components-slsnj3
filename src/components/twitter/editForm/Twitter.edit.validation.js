export default [
  {
    weight: 120,
    key: 'validate.maxLength',
    label: 'Maximum Length',
    type: 'hidden',
    defaultValue: 15
  },
  {
    weight: 200,
    key: 'validate.customMessage',
    label: 'Custom Error Message',
    placeholder: 'Custom Error Message',
    type: 'textfield',
    tooltip: 'Error message displayed if any error occurred.',
    input: true
  },
  {
    weight: 130,
    key: 'validate.pattern',
    label: 'Regular Expression Pattern',
    type: 'hidden',
    defaultValue: '^[a-zA-Z0-9_]$'
  }
];