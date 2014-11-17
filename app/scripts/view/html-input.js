define([

  'jquery'
  ,'underscore'
  ,'backbone'

  ,'../utils'

], function (

  $
  ,_
  ,Backbone

  ,util

) {
  return Backbone.View.extend({

    events: {
      keyup: 'onKeyup'
      ,change: 'onChange'
    }

    /**
     * @param {Object} opts
     *   @param {Stylie} stylie
     *   @param {Element} el
     */
    ,initialize: function (opts) {
      this.stylie = opts.stylie;
      this.$renderTarget = this.$('#preview-area .rekapi-actor');
      this.initialValue = this.readFromDOM();
      this.$el.html(this.initialValue);
    }

    ,onKeyup: function () {
      this.renderToDOM();
    }

    ,readFromDOM: function () {
      return util.trimString(this.$renderTarget.html());
    }

    ,renderToDOM: function () {
      var renderVal = this.$el.val() || this.initialValue;
      this.$renderTarget.html(renderVal);
    }

    ,onChange: function () {
      this.stylie.saveTransientAnimation();
    }

    ,resetToDefault: function () {
      this.$el.val(this.initialValue);
      this.$renderTarget.html(this.initialValue);
    }
  });
});

