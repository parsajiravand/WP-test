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

var MyNotes =
/*#__PURE__*/
function () {
  function MyNotes() {
    _classCallCheck(this, MyNotes);

    this.events();
  }

  _createClass(MyNotes, [{
    key: "events",
    value: function events() {
      (0, _jquery["default"])("#my-notes").on("click", ".delete-note", this.deleteNote);
      (0, _jquery["default"])("#my-notes").on("click", ".edit-note", this.editNote.bind(this));
      (0, _jquery["default"])("#my-notes").on("click", ".update-note", this.updateNote.bind(this));
      (0, _jquery["default"])(".submit-note").on("click", this.createNote.bind(this));
    } //Methods Will Go Here

  }, {
    key: "editNote",
    value: function editNote(e) {
      var thisNote = (0, _jquery["default"])(e.target).parents("li");

      if (thisNote.data("state") == "editable") {
        //make read Only
        this.makeNoteReadonly(thisNote);
      } else {
        //make Editable
        this.makeNoteEditable(thisNote);
      }
    }
  }, {
    key: "makeNoteEditable",
    value: function makeNoteEditable(thisNote) {
      thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i>Cansel');
      thisNote.find(".note-title-field,.note-body-field").removeAttr("readonly").addClass("note-active-field");
      thisNote.find(".update-note").addClass("update-note--visible");
      thisNote.data("state", "editable");
    }
  }, {
    key: "makeNoteReadonly",
    value: function makeNoteReadonly(thisNote) {
      thisNote.find(".edit-note").html('<i class="fa fa-pencil" aria-hidden="true"></i>Edit');
      thisNote.find(".note-title-field,.note-body-field").attr("readonly", "readonly").removeClass("note-active-field");
      thisNote.find(".update-note").removeClass("update-note--visible");
      thisNote.data("state", "cancel");
    }
  }, {
    key: "updateNote",
    value: function updateNote(e) {
      var _this = this;

      var thisNote = (0, _jquery["default"])(e.target).parents("li");
      var ourUpdatedPost = {
        title: thisNote.find(".note-title-field").val(),
        content: thisNote.find(".note-body-field").val()
      };

      _jquery["default"].ajax({
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader("X-WP-Nonce", newTestData.nonce); //get Nonce Number For WP Secure
        },
        url: newTestData.root_url + "/wp-json/wp/v2/note/" + thisNote.data("id"),
        type: "POST",
        data: ourUpdatedPost,
        success: function success() {
          _this.makeNoteReadonly(thisNote);
        },
        error: function error(err) {
          console.log(err);
          console.log("Error Sorry :(");
        }
      });
    }
  }, {
    key: "deleteNote",
    value: function deleteNote(e) {
      var thisNote = (0, _jquery["default"])(e.target).parents("li");

      _jquery["default"].ajax({
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader("X-WP-Nonce", newTestData.nonce); //get Nonce Number For WP Secure
        },
        url: newTestData.root_url + "/wp-json/wp/v2/note/" + thisNote.data("id"),
        type: "DELETE",
        success: function success() {
          thisNote.slideUp();
        },
        error: function error(err) {
          console.log(err);
          console.log("Error Sorry :(");
        }
      });
    }
  }, {
    key: "createNote",
    value: function createNote(e) {
      var ourNewPost = {
        title: (0, _jquery["default"])(".new-note-title").val(),
        content: (0, _jquery["default"])(".new-note-body").val(),
        status: "publish"
      };

      _jquery["default"].ajax({
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader("X-WP-Nonce", newTestData.nonce); //get Nonce Number For WP Secure
        },
        url: newTestData.root_url + "/wp-json/wp/v2/note/",
        type: "POST",
        data: ourNewPost,
        success: function success(res) {
          console.log(res);
          (0, _jquery["default"])(".new-note-title,.new-note-body").val("");
          (0, _jquery["default"])("\n        <li data-id=\"".concat(res.id, "\">\n          <input readonly type=\"text\" value=\"").concat(res.content.raw, "\" class=\"note-title-field\">\n          <span class=\"edit-note\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>Edit</span>\n          <span class=\"delete-note\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>Delete</span>\n  \n          <textarea readonly class=\"note-body-field\">").concat(res.content.rendered, "</textarea>\n  \n          <span class=\"update-note btn btn--blue btn--small\"><i class=\"fa fa-arrow-right\"\n                  aria-hidden=\"true\"></i>Save</span>\n\n        </li>\n        ")).prependTo("#my-notes").hide().slideDown();
        },
        error: function error(err) {
          console.log(err);
          console.log("Error Sorry :(");
        }
      });
    }
  }, {
    key: "deleteNote",
    value: function deleteNote(e) {
      var thisNote = (0, _jquery["default"])(e.target).parents("li");

      _jquery["default"].ajax({
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader("X-WP-Nonce", newTestData.nonce); //get Nonce Number For WP Secure
        },
        url: newTestData.root_url + "/wp-json/wp/v2/note/" + thisNote.data("id"),
        type: "DELETE",
        success: function success() {
          thisNote.slideUp();
        },
        error: function error(err) {
          console.log(err);
          console.log("Error Sorry :(");
        }
      });
    }
  }]);

  return MyNotes;
}();

var _default = MyNotes;
exports["default"] = _default;