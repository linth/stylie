define([

  'backbone'

], function (

  Backbone

) {
  'use strict';

  var RekapiTimelineView = Backbone.View.extend({
    /**
     * @param {Object} opts
     *   @param {Stylie} stylie
     */
    initialize: function (opts) {
      this.stylie = opts.stylie;
      this.stylie.rekapi.createTimeline(this.el);
    }
  });

  return RekapiTimelineView;
});
