define([

  'jquery'
  ,'underscore'
  ,'lateralus'

  ,'../../constants'

  ,'text!./template.mustache'

], function (

  $
  ,_
  ,Lateralus

  ,constant

  ,template

) {
  'use strict';

  var checkboxToVendorMap = {
    moz: 'mozilla'
    ,ms: 'microsoft'
    ,o: 'opera'
    ,webkit: 'webkit'
    ,w3: 'w3'
  };

  function getPrefixList (lateralus) {
    var prefixList = [];
    _.each(lateralus.config.activeClasses, function (isActive, vendorName) {
      if (isActive) {
        prefixList.push(checkboxToVendorMap[vendorName]);
      }
    });

    return prefixList;
  }

  var CssOutputComponentView = Lateralus.Component.View.extend({
    template: template

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     *   @param {jQuery} $trigger
     */
    ,initialize: function (options) {
      this._super('initialize', arguments);
      this.$trigger = options.$trigger;
      this.$animationIteration = options.$animationIteration;
      this.$actorEl = $('#preview-area .rekapi-actor');

      this.$trigger.on('click', _.bind(this.onTriggerClick, this));
      this.listenTo(this.lateralus,
          constant.UPDATE_CSS_OUTPUT, _.bind(this.renderCSS, this));
    }

    ,onTriggerClick: function (evt) {
      this.renderCSS();
    }

    ,renderCSS: function () {
      var lateralus = this.lateralus;
      var cssClassName = lateralus.view.cssNameField.$el.val();

      var currentActor = lateralus.actorCollection.getCurrent();
      var keyframeCollection = currentActor.keyframeCollection;
      var firstKeyframe = keyframeCollection.first();
      var offsets = this.isOutputOrientedToFirstKeyframe()
          ? { x: -firstKeyframe.get('x'), y: -firstKeyframe.get('y') }
          : { x: 0, y: 0 };
      keyframeCollection.offsetKeyframes(offsets);

      var cssOutput = lateralus.rekapi.renderer.toString({
        vendors: getPrefixList(lateralus)
        ,name: cssClassName
        ,iterations: this.$animationIteration.val()
        ,isCentered: currentActor.get('isCenteredToPath')
        ,fps: lateralus.view.fpsSlider.getFPS()
      });

      // Reverse the offset
      _.each(offsets, function (offsetValue, offsetName) {
        offsets[offsetName] = -offsetValue;
      });
      keyframeCollection.offsetKeyframes(offsets);

      this.$el.val(cssOutput);
    }

    /**
     * @return {boolean}
     */
    ,isOutputOrientedToFirstKeyframe: function () {
      return this.lateralus.view.orientation.getOrientation()
        === 'first-keyframe';
    }
  });

  return CssOutputComponentView;
});
