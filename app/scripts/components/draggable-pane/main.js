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

  var DraggablePaneComponent = Lateralus.Component.extend({
    name: 'draggable-pane'
    ,View: View
    ,template: template
  });

  return DraggablePaneComponent;
});
