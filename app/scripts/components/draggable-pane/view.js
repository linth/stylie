define([

  'jquery'
  ,'underscore'
  ,'lateralus'

  ,'text!./template.mustache'
  ,'text!./templates/container.mustache'
  ,'text!./templates/handle.mustache'
  ,'text!./templates/content-wrapper.mustache'

  // Returns nothing
  ,'jquery-dragon'

], function (

  $
  ,_
  ,Lateralus

  ,template
  ,containerTemplate
  ,handleTemplate
  ,contentWrapperTemplate

) {
  'use strict';

  var $win = $(window);

  var DraggablePaneComponentView = Lateralus.Component.View.extend({
    template: template

    ,fadeToggleSpeed: 200

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     *   @param {Element} el
     */
    ,initialize: function () {
      this._super('initialize', arguments);
      this.$handle = $(handleTemplate);
      this.$el.wrap($(containerTemplate));
      this.$el = this.$el.parent();
      this.$el
        .wrapInner($(contentWrapperTemplate))
        .prepend(this.$handle)
        .css({
          left: $win.width() - this.$el.outerWidth(true)
        })
        .dragon({
          within: this.$el.parent()
          ,handle: '.pane-handle'
        });
      $win.on('resize', _.bind(this.onResize, this));
    }

    ,onResize: function () {
      var width = this.$el.outerWidth(true);
      var winWidth = $win.width();

      if ((this.$el.offset().left + width) > winWidth) {
        this.$el.css('left', winWidth - width);
      }
    }

    ,getSize: function () {
      return {
        height: this.$el.height()
        ,width: this.$el.width()
      };
    }

    ,toggle: function () {
      this.$el.fadeToggle(this.fadeToggleSpeed);
    }

  });

  return DraggablePaneComponentView;
});
