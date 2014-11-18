define([

  'lateralus'

  ,'text!./template.mustache'

  ,'modal'

], function (

  Lateralus

  ,template

  ,ModalView

) {
  'use strict';

  var HelpModalComponentView = Lateralus.Component.View.extend({
    template: template

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function () {
      this._super('initialize', arguments);
      this.helpModal = new ModalView({
        el: this.el
        ,$triggerEl: this.$triggerEl
      });
    }
  });

  return HelpModalComponentView;
});
