define([

  'jquery'
  ,'underscore'
  ,'lateralus'

  ,'text!./template.mustache'

  ,'../../constants'

  ,'stylie.component.checkbox'
  ,'stylie.component.help-modal'
  ,'stylie.component.path-preview'
  ,'stylie.component.draggable-pane'
  ,'stylie.component.tabs'
  ,'stylie.component.css-output'
  ,'stylie.component.fps-slider'

  // Extensions
  ,'alert'
  ,'auto-update-textfield'

  // Views
  ,'../../view/checkbox'
  ,'../../view/ease-select'
  ,'../../view/html-input'
  ,'../../view/custom-ease'
  ,'../../view/rekapi-controls'
  ,'../../view/orientation-controls'
  ,'../../view/management-console'

], function (

  $
  ,_
  ,Lateralus

  ,template

  ,constant

  ,CheckboxComponent
  ,HelpModalComponent
  ,PathPreviewComponent
  ,DraggablePaneComponent
  ,TabsComponent
  ,CssOutputComponent
  ,FpsSliderComponent

  ,AlertView
  ,AutoUpdateTextFieldView

  ,CheckboxView
  ,EaseSelectView
  ,HTMLInputView
  ,CustomEaseView
  ,RekapiControlsView
  ,OrientationControlsView
  ,ManagementConsoleView

) {
  'use strict';

  var $win = $(window);

  var ContainerComponentView = Lateralus.Component.View.extend({
    template: template

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function (options) {
      this._super('initialize', arguments);
      this.stylie = this.lateralus;
      this.view = {};
      this.initSubviews();
    }

    ,initSubviews: function () {
      this.helpModalComponent = this.addComponent(HelpModalComponent, {
        el: this.$helpContents
        ,$triggerEl: this.$helpTrigger
      });

      //this.view.rekapiControls = new RekapiControlsView({
        //stylie: this.lateralus
      //});

      this.addComponent(PathPreviewComponent, {
        el: this.$tweenPath[0]
        ,$header: this.$header
        ,height: $win.height()
        ,width: $win.width()
      });

      this.addSubview(CheckboxComponent.View, {
        el: this.$('#show-path')[0]
        ,callHandlerOnInit: true
        ,onChange: _.bind(function (evt, isChecked) {
          this.trigger(constant.TOGGLE_PATH_AND_CROSSHAIRS, !!isChecked);
        }, this)
      });

      var controlPaneEl = this.$('#control-pane')[0];

      this.addSubview(DraggablePaneComponent.View, {
        el: controlPaneEl
      });

      this.controlPaneTabsView = this.addSubview(TabsComponent.View, {
        el: controlPaneEl
      });

      this.addComponent(CssOutputComponent, {
        el: this.$cssOutput[0]
        ,$trigger: this.controlPaneTabsView.$el
            .find('[data-target="css-output"]')
        ,$animationIteration: this.$('#iterations')
      });

      this.addComponent(FpsSliderComponent, {
        el: this.$('.quality-slider.fps .slider')[0]
      });

      var cssNameField = new AutoUpdateTextFieldView({
        el: this.$('.css-name')[0]
      });

      cssNameField.onValReenter = _.bind(function (val) {
        this.config.className = val;
        this.trigger(constant.UPDATE_CSS_OUTPUT);
      }, this);

      this.view.cssNameField = cssNameField;

      ['moz', 'ms', 'o', 'webkit', 'w3'].forEach(function (prefix) {
        this.addSubview(CheckboxComponent.View, {
          el: $('#' + prefix + '-toggle')[0]
          ,onChange: _.bind(function (evt, isChecked) {
            this.config.activeClasses[prefix] = isChecked;
            this.trigger(constant.UPDATE_CSS_OUTPUT);
          }, this)
        });
      }, this);

      //this.view.htmlInput = new HTMLInputView({
        //stylie: this.lateralus
        //,el: this.$('#html-input textarea')[0]
      //});

      //this.view.centerToPathCheckbox = new CheckboxView({
        //$el: this.$('#center-to-path')
        //,callHandlerOnInit: true
        //,onChange: _.bind(function (evt, isChecked) {
          //var isCenteredToPath = !!isChecked;
          //var tranformOrigin = isCenteredToPath ? '0 0' : '';

          //this.view.htmlInput.$renderTarget.css(
            //'transform-origin', tranformOrigin);
          //this.actorCollection.getCurrent().set(
            //'isCenteredToPath', isCenteredToPath);
        //}, this)
      //});

      this.view.customEase = new CustomEaseView({
        stylie: this.lateralus
        ,el: this.$('#custom-ease')[0]
      });

      this.view.topLevelAlert = new AlertView({
        el: document.getElementById('top-level-alert')
      });

      var topLevelAlert = this.view.topLevelAlert;
      this.on(constant.ALERT_ERROR,
          _.bind(topLevelAlert.show, topLevelAlert));

      this.view.managementConsole = new ManagementConsoleView({
        stylie: this.lateralus
        ,el: this.$('#management-console')
        ,model: this.lateralus.animationModel
      });

      this.view.orientation = new OrientationControlsView({
        stylie: this.lateralus
        ,el: this.$('#orientation-controls')
      });
    }
  });

  return ContainerComponentView;
});
