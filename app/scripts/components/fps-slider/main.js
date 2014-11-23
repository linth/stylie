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

  var FpsSliderComponent = Lateralus.Component.extend({
    name: 'fps-slider'
    ,View: View
    ,template: template
  });

  return FpsSliderComponent;
});
