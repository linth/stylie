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

  var CssOutputComponent = Lateralus.Component.extend({
    name: 'css-output'
    ,View: View
    ,template: template
  });

  return CssOutputComponent;
});
