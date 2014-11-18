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

  var HelpModalComponent = Lateralus.Component.extend({
    name: 'help-modal'
    ,View: View
    ,template: template
  });

  return HelpModalComponent;
});
