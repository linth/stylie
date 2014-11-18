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

  var PathPreviewComponent = Lateralus.Component.extend({
    name: 'path-preview'
    ,View: View
    ,template: template
  });

  return PathPreviewComponent;
});
