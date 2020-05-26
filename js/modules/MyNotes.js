import $ from "jquery";
class MyNotes {
  constructor() {
    this.events();
  }
  events() {
    $("#my-notes").on("click", ".delete-note", this.deleteNote);
    $("#my-notes").on("click", ".edit-note", this.editNote.bind(this));
    $("#my-notes").on("click", ".update-note", this.updateNote.bind(this));
    $(".submit-note").on("click", this.createNote.bind(this));
  }
  //Methods Will Go Here
  editNote(e) {
    let thisNote = $(e.target).parents("li");
    if (thisNote.data("state") == "editable") {
      //make read Only
      this.makeNoteReadonly(thisNote);
    } else {
      //make Editable
      this.makeNoteEditable(thisNote);
    }
  }
  makeNoteEditable(thisNote) {
    thisNote
      .find(".edit-note")
      .html('<i class="fa fa-times" aria-hidden="true"></i>Cansel');
    thisNote
      .find(".note-title-field,.note-body-field")
      .removeAttr("readonly")
      .addClass("note-active-field");

    thisNote.find(".update-note").addClass("update-note--visible");
    thisNote.data("state", "editable");
  }
  makeNoteReadonly(thisNote) {
    thisNote
      .find(".edit-note")
      .html('<i class="fa fa-pencil" aria-hidden="true"></i>Edit');
    thisNote
      .find(".note-title-field,.note-body-field")
      .attr("readonly", "readonly")
      .removeClass("note-active-field");

    thisNote.find(".update-note").removeClass("update-note--visible");
    thisNote.data("state", "cancel");
  }
  updateNote(e) {
    let thisNote = $(e.target).parents("li");
    let ourUpdatedPost = {
      title: thisNote.find(".note-title-field").val(),
      content: thisNote.find(".note-body-field").val(),
    };

    $.ajax({
      beforeSend(xhr) {
        xhr.setRequestHeader("X-WP-Nonce", newTestData.nonce); //get Nonce Number For WP Secure
      },

      url: newTestData.root_url + "/wp-json/wp/v2/note/" + thisNote.data("id"),
      type: "POST",
      data: ourUpdatedPost,
      success: () => {
        this.makeNoteReadonly(thisNote);
      },
      error: (err) => {
        console.log(err);
        console.log("Error Sorry :(");
      },
    });
  }
  deleteNote(e) {
    let thisNote = $(e.target).parents("li");

    $.ajax({
      beforeSend(xhr) {
        xhr.setRequestHeader("X-WP-Nonce", newTestData.nonce); //get Nonce Number For WP Secure
      },

      url: newTestData.root_url + "/wp-json/wp/v2/note/" + thisNote.data("id"),
      type: "DELETE",
      success: () => {
        thisNote.slideUp();
      },
      error: (err) => {
        console.log(err);
        console.log("Error Sorry :(");
      },
    });
  }
  createNote(e) {
    let ourNewPost = {
      title: $(".new-note-title").val(),
      content: $(".new-note-body").val(),
      status: "publish",
    };

    $.ajax({
      beforeSend(xhr) {
        xhr.setRequestHeader("X-WP-Nonce", newTestData.nonce); //get Nonce Number For WP Secure
      },

      url: newTestData.root_url + "/wp-json/wp/v2/note/",
      type: "POST",
      data: ourNewPost,
      success: (res) => {
        console.log(res);
        $(".new-note-title,.new-note-body").val("");
        $(`
        <li data-id="${res.id}">
          <input readonly type="text" value="${res.content.raw}" class="note-title-field">
          <span class="edit-note"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</span>
          <span class="delete-note"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</span>
  
          <textarea readonly class="note-body-field">${res.content.rendered}</textarea>
  
          <span class="update-note btn btn--blue btn--small"><i class="fa fa-arrow-right"
                  aria-hidden="true"></i>Save</span>

        </li>
        `)
          .prependTo("#my-notes")
          .hide()
          .slideDown();
      },
      error: (err) => {
        console.log(err);
        console.log("Error Sorry :(");
      },
    });
  }
  deleteNote(e) {
    let thisNote = $(e.target).parents("li");

    $.ajax({
      beforeSend(xhr) {
        xhr.setRequestHeader("X-WP-Nonce", newTestData.nonce); //get Nonce Number For WP Secure
      },

      url: newTestData.root_url + "/wp-json/wp/v2/note/" + thisNote.data("id"),
      type: "DELETE",
      success: () => {
        thisNote.slideUp();
      },
      error: (err) => {
        console.log(err);
        console.log("Error Sorry :(");
      },
    });
  }
}
export default MyNotes;
