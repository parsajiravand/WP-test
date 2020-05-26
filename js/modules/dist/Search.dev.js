"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Search =
/*#__PURE__*/
function () {
  //1.describe and create / initiate our object
  function Search() {
    _classCallCheck(this, Search);

    this.addSearchHTML();
    this.resultsDiv = (0, _jquery["default"])("#search-overlay__results");
    this.openButton = (0, _jquery["default"])(".js-search-trigger");
    this.closeButton = (0, _jquery["default"])(".search-overlay__close");
    this.searchOverlay = (0, _jquery["default"])(".search-overlay");
    this.searchField = (0, _jquery["default"])("#search-term");
    this.events();
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.previosValue;
    this.typingTimer;
  } //2.display events


  _createClass(Search, [{
    key: "events",
    value: function events() {
      this.openButton.on("click", this.openOverlay.bind(this));
      this.closeButton.on("click", this.closeOverlay.bind(this));
      (0, _jquery["default"])(document).on("keydown", this.keyPressDispatcher.bind(this));
      this.searchField.on("keyup", this.typingLogic.bind(this));
    } //3.methods(function,action ...)

  }, {
    key: "typingLogic",
    value: function typingLogic() {
      if (this.searchField.val() != this.previosValue) {
        clearTimeout(this.typingTimer);

        if (this.searchField.val()) {
          if (!this.isSpinnerVisible) {
            this.resultsDiv.html("<div class=\"spinner-loader\"></div>");
            this.isSpinnerVisible = true;
          }

          this.typingTimer = setTimeout(this.getResults.bind(this), 1000);
        } else {
          this.resultsDiv.html("");
          this.isSpinnerVisible = false;
        }
      }

      this.previosValue = this.searchField.val();
    } //get All Data From WP

  }, {
    key: "getResults",
    value: function getResults() {
      var _this = this;

      //get custom API
      _jquery["default"].getJSON(newTestData.root_url + "/wp-json/newTest/v1/search?term=" + this.searchField.val(), function (results) {
        _this.resultsDiv.html("\n          <div class=\"row\">\n            <div class=\"one-third\">\n              <h2 class=\"search-overlay__section-title\">General Information</h2>\n              ".concat(results.generalInfo.length ? '<ul class="link-list min-list">' : "<p>No general information matches that search.</p>", "\n                ").concat(results.generalInfo.map(function (item) {
          return "<li><a href=\"".concat(item.permalink, "\">").concat(item.title, "</a> ").concat(item.postType == "post" ? "by ".concat(item.authorName) : "", "</li>");
        }).join(""), "\n              ").concat(results.generalInfo.length ? "</ul>" : "", "\n            </div>\n            <div class=\"one-third\">\n              <h2 class=\"search-overlay__section-title\">Programs</h2>\n              ").concat(results.programs.length ? '<ul class="link-list min-list">' : "<p>No programs match that search. <a href=\"".concat(newTestData.root_url, "/programs\">View all programs</a></p>"), "\n                ").concat(results.programs.map(function (item) {
          return "\n                      <li><a href=\"".concat(item.permalink, "\">").concat(item.title, "</a></li>");
        }).join(""), "\n              ").concat(results.programs.length ? "</ul>" : "", "\n  \n              <h2 class=\"search-overlay__section-title\">Professors</h2>\n              ").concat(results.professors.length ? '<ul class="link-list min-list professor-card">' : "<p>No professors match that search. <a href=\"".concat(newTestData.root_url, "/professors\">View all professors</a></p>"), "\n                ").concat(results.professors.map(function (item) {
          return " <li class=\"professor-card__list-item\">\n                      <a class=\"professor-card\" href=\"".concat(item.permalink, "\">\n                          <img class=\"professor-card__image\" src=\"").concat(item.thumbnail, "\">\n                          <span class=\"professor-card__name\">").concat(item.title, "</span>\n                      </a>\n                  </li>");
        }).join(""), "\n              ").concat(results.professors.length ? "</ul>" : "", "\n  \n            </div>\n            <div class=\"one-third\">\n              <h2 class=\"search-overlay__section-title\">Campuses</h2>\n              ").concat(results.campuses.length ? '<ul class="link-list min-list">' : "<p>No campuses match that search. <a href=\"".concat(newTestData.root_url, "/campuses\">View all campuses</a></p>"), "\n                ").concat(results.campuses.map(function (item) {
          return "<li><a href=\"".concat(item.permalink, "\">").concat(item.title, "</a></li>");
        }).join(""), "\n              ").concat(results.campuses.length ? "</ul>" : "", "\n  \n              <h2 class=\"search-overlay__section-title\">Events</h2>\n              ").concat(results.events.length ? "" : "<p>No events match that search. <a href=\"".concat(newTestData.root_url, "/events\">View all events</a></p>"), "\n                ").concat(results.events.map(function (item) {
          return "\n                  <div class=\"event-summary\">\n                    <a class=\"event-summary__date t-center\" href=\"".concat(item.permalink, "\">\n                      <span class=\"event-summary__month\">").concat(item.month, "</span>\n                      <span class=\"event-summary__day\">").concat(item.day, "</span>  \n                    </a>\n                    <div class=\"event-summary__content\">\n                      <h5 class=\"event-summary__title headline headline--tiny\"><a href=\"").concat(item.permalink, "\">").concat(item.title, "</a></h5>\n                      <p>").concat(item.description, " <a href=\"").concat(item.permalink, "\" class=\"nu gray\">Learn more</a></p>\n                    </div>\n                  </div>\n                ");
        }).join(" "), "\n            </div>\n          </div>\n        "));

        _this.isSpinnerVisible = false;
      });
    }
  }, {
    key: "keyPressDispatcher",
    value: function keyPressDispatcher(e) {
      if (e.keyCode == 18 && !this.isOverlayOpen && !(0, _jquery["default"])("input,textarea").is(":focus")) {
        this.openOverlay();
      } else if (e.keyCode == 27 && this.isOverlayOpen) {
        this.closeOverlay();
      }
    }
  }, {
    key: "openOverlay",
    value: function openOverlay() {
      var _this2 = this;

      this.searchOverlay.addClass("search-overlay--active"); //When Openin Search Box Reset The Value Of That But I Dont Like That Now

      /*  this.searchField.val(""); */

      setTimeout(function () {
        _this2.searchField.focus();
      }, 500);
      (0, _jquery["default"])("body").addClass("body-no-scroll");
      this.isOverlayOpen = true;
    }
  }, {
    key: "closeOverlay",
    value: function closeOverlay() {
      this.searchOverlay.removeClass("search-overlay--active");
      (0, _jquery["default"])("body").removeClass("body-no-scroll");
      this.isOverlayOpen = false;
    }
  }, {
    key: "addSearchHTML",
    value: function addSearchHTML() {
      (0, _jquery["default"])("body").append("\n    <div class=\"search-overlay\">\n       <div class=\"search-overlay__top\">\n           <div class=\"container\">\n               <i class=\"fa fa-search search-overlay__icon\" aria-hidden=\"true\"></i>\n               <input type=\"text\" placeholder=\"What Are You Looking For?!\" id=\"search-term\" class=\"search-term\">\n               <i class=\"fa fa-window-close search-overlay__close search-overlay__icon\" aria-hidden=\"true\"></i>\n           </div>\n       </div>\n       <div class=\"container\">\n           <div id=\"search-overlay__results\">\n\n           </div>\n       </div>\n     </div>\n     ");
    }
  }]);

  return Search;
}();

var _default = Search;
exports["default"] = _default;