define([

  'underscore'
  ,'lateralus'

  ,'text!./template.mustache'

  ,'../../constants'

], function (

  _
  ,Lateralus

  ,template

  ,constant

) {
  'use strict';

  var FPS_RANGE =
        constant.MAXIMUM_CSS_OUTPUT_FPS - constant.MINIMUM_CSS_OUTPUT_FPS;

  var FpsSliderComponentView = Lateralus.Component.View.extend({
    template: template

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function (opts) {
      this._super('initialize', arguments);

      this.$el.dragonSlider({
        drag: _.bind(this.onSliderDrag, this)
      });

      var val =
          (constant.DEFAULT_CSS_OUTPUT_FPS - constant.MINIMUM_CSS_OUTPUT_FPS)
              / (this.FPS_RANGE - 1);

      this.$el.dragonSliderSet(val, false);
    }

    ,onSliderDrag: function (val) {
      this.lateralus.trigger(constant.UPDATE_CSS_OUTPUT);
    }

    ,getFPS: function () {
      var sliderVal = this.$el.dragonSliderGet();
      return constant.MINIMUM_CSS_OUTPUT_FPS
             + (sliderVal * this.FPS_RANGE);
    }
  });

  return FpsSliderComponentView;
});
