"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _slickCarousel = _interopRequireDefault(require("slick-carousel"));

var _MobileMenu = _interopRequireDefault(require("./modules/MobileMenu"));

var _HeroSlider = _interopRequireDefault(require("./modules/HeroSlider"));

var _Search = _interopRequireDefault(require("./modules/Search"));

var _MyNotes = _interopRequireDefault(require("./modules/MyNotes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 3rd party packages from NPM
// Our modules / classes
// Instantiate a new object using our modules/classes
var mobileMenu = new _MobileMenu["default"]();
var heroSlider = new _HeroSlider["default"]();
var search = new _Search["default"]();
var mynotes = new _MyNotes["default"]();