define([

  'lateralus'

  ,'./view'
  ,'text!./template.mustache'

], function (

  Lateralus

  ,View
  ,template

) {
  'use strict';

  var CheckboxComponent = Lateralus.Component.extend({
    name: 'checkbox'
    ,View: View
    ,template: template
  });

  return CheckboxComponent;
});
