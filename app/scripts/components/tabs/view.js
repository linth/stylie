define([

  'jquery'
  ,'lateralus'

  ,'text!./template.mustache'

], function (

  $
  ,Lateralus

  ,template

) {
  'use strict';

  var ACTIVE_CLASS = 'tabs-active';

  var TabsComponentView = Lateralus.Component.View.extend({
    template: template

    ,events: {
      'click .tabs li': 'onTabClick'
    }

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     *   @param {Element} el The tab container element.
     */
    ,initialize: function () {
      this._super('initialize', arguments);
      this.$tabs = this.$el.find('.tabs').children();
      this.$contents = this.$el.find('.tabs-contents').children();
      this.selectTab(this.$tabs.eq(0));
    }

    /**
     * @param {jQuery.Event} evt
     */
    ,onTabClick: function (evt) {
      evt.preventDefault();
      this.selectTab($(evt.currentTarget));
    }

    /**
     * @param {jQuery} $tab
     */
    ,selectTab: function ($tab) {
      this.$tabs.removeClass(ACTIVE_CLASS);
      $tab.addClass(ACTIVE_CLASS);
      this.$contents.css('display', 'none');
      $('#' + $tab.data('target')).css('display', 'block');
    }
  });

  return TabsComponentView;
});
