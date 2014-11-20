define([

  'lateralus'

  ,'text!./template.mustache'

], function (

  Lateralus

  ,template

) {
  'use strict';

  var CheckboxComponentView = Lateralus.Component.View.extend({
    template: template

    ,events: {
      change: '_onChange'
    }

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function () {
      this._super('initialize', arguments);

      if (this.callHandlerOnInit) {
        this.delegateEvents();
        this.$el.trigger('change');
      }
    }

    ,_onChange: function (evt) {
      this.onChange.call(this, evt, this.$el.is(':checked'));
    }
  });

  return CheckboxComponentView;
});
