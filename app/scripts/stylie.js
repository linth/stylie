define([

  // Libraries
  'jquery'
  ,'underscore'
  ,'backbone'
  ,'lateralus'
  ,'shifty'
  ,'rekapi'

  // Misc
  ,'./keybindings'
  ,'./constants'
  ,'./utils'

  // Models
  ,'./model/animation'

  // Collections
  ,'./collection/actors'

  // Components
  ,'stylie.component.container'

], function (

  $
  ,_
  ,Backbone
  ,Lateralus
  ,Tweenable
  ,Rekapi

  ,Keybindings
  ,constant
  ,util

  ,AnimationModel

  ,ActorCollection

  ,StylieContainerComponent

) {
  'use strict';

  var $win = $(window);
  var $body = $(document.body);

  /**
   * @implements {Backbone.Events}
   * @constructor
   */
  var Stylie = Lateralus.beget(function () {
    Lateralus.apply(this, arguments);

    this.config = {
      activeClasses: {
        moz: false
        ,ms: false
        ,o: false
        ,webkit: false
        ,w3: true
      }
    };

    this.view = {};

    this.config.queryString = util.getQueryParams();

    if (navigator.userAgent.match(/iphone/i)) {
      $body.addClass('iphone');
    }

    this.rekapi = new Rekapi(document.getElementById('preview-area'));
    this.$rekapiContext = $(this.rekapi.context);

    if (!this.config.queryString.debug) {
      this.rekapi.play();
    }

    this.actorCollection = new ActorCollection([], { stylie: this });
    this.animationModel = new AnimationModel({}, { stylie: this });

    this.rekapi.addActor({
      context: $('#preview-area').children()[0]
    });

    this.keybindings = new Keybindings(this);
    this.containerComponent = this.addComponent(StylieContainerComponent);

    var currentActorModel = this.actorCollection.getCurrent();
    this.listenTo(currentActorModel, 'change', _.bind(function () {
      this.rekapi.update();
    }, this));

    //if (window.localStorage.transientAnimation) {
      //this.animationModel.setCurrentState(
          //JSON.parse(window.localStorage.transientAnimation));
    //} else {
      //this.createDefaultState();
    //}

    //this.on(constant.PATH_CHANGED,
        //_.bind(this.saveTransientAnimation, this));

    $(window).trigger('resize');

    window.stylie = this;
  });

  Stylie.prototype.createDefaultState = function () {
    var winWidth = $win.width();
    var currentActorModel = this.actorCollection.getCurrent();
    var crosshairStartingY = $win.height() / 2;

    // Create the initial keyframes.
    _.each([0, constant.INITIAL_ANIMATION_DURATION], function (millisecond, i) {
      currentActorModel.keyframe(millisecond, {
        x: i
          ? winWidth - (winWidth / (i + 1))
          : 60 // TODO: Should this be a constant?
        ,y: crosshairStartingY
        ,scale: 1
        ,rX: 0
        ,rY: 0
        ,rZ: 0
      }, 'linear linear linear linear linear');

    });

    this.view.customEase.setUpDefaultEasings();
    this.view.htmlInput.resetToDefault();
  };

  Stylie.prototype.clearCurrentState = function () {
    this.actorCollection.getCurrent().removeAllKeyframes();
    this.containerComponent.view.view.customEase.removeAllEasings();
  };

  Stylie.prototype.saveTransientAnimation = _.throttle(function () {
    window.localStorage.transientAnimation =
      JSON.stringify(this.animationModel.getCurrentState());
  }, constant.TRANSIENT_SAVE_THROTTLE_MS);

  return Stylie;
});
