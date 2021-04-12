import _ from 'lodash';
import { Formio, Components } from 'formiojs';
import FormBuilder from 'formiojs/FormBuilder';
import FastComponents from './src';
import BaseComponent from 'formiojs/components/base/Base';

// Import stylesheets
import './style.css';
import 'formiojs/dist/formio.full.min.css';

// Register the custom components
Components.setComponents(FastComponents);

// Write Javascript code!
//const form = document.getElementById('formio');

const form = {};
const options = {
  builder: {
    social: {
      title: 'Social',
      weight: 25,
      components: [
        FastComponents.twitter.builderInfo
      ]
    }
  }
};

const builder = new FormBuilder(document.getElementById('builder'), form, options);

builder.render().then((instance) => {
  instance.on('render', () => {
    Formio.createForm(document.getElementById('formio'), form).then((f) => {
      f.on('change', (s) => {
        
      });
    });
  });
});