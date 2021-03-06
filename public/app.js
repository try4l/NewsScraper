// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    console.log(".getJSON/articles:data[i]: ", data[i]);
    console.log(".getJSON/articles:data[i].saved: ", data[i].saved);
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    if (data[i].saved) {
      // A button to unfavorite the article -- TO BE DONE
      //$("#articles").append("<button data-id='" + data[i]._id + "' id='unsavearticle'>UnSave Article</button>");
    } else {
      // A button to 'fave' the article
      $("#articles").append("<button data-id='" + data[i]._id + "' id='savearticle'>Mark Favorite</button>");
    }
  }
});

// Grab the articles as a json - TO BE DONE
$.getJSON("/saved", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    console.log(".getJSON/saved:data[i]: ", data[i]);
    console.log(".getJSON/saved:data[i].saved: ", data[i].saved);
    if(data[i].saved) {
      // Display the saved article information on the page      
      $("#saved").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      // A button to un-save the article
      $("#saved").append("<button data-id='" + data[i]._id + "' id='unsavearticle'>UnSave Article</button>");
    }
  }
});

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  console.log("Click:p:thisId: ", thisId);

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("Click:#savenote:thisId: ", thisId);
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// When you click the savearticle button
$(document).on("click", "#savearticle", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("Click:#savearticle:thisId: ", thisId);

  // Run a POST request to change the flag, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/saved/" + thisId,
    data: {
      // Flag as saved
      saved: true,
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
    });
});

// When you click the unsavearticle button -- TO BE DONE
$(document).on("click", "#unsavearticle", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log("Click:#unsavearticle:thisId: ", thisId);

  // Run a POST request to change the flag, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/saved/" + thisId,
    data: {
      // Flag as unsaved
      saved: false,
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
    });
});

// Whenever someone clicks saved-articles button -- TO BE DONE
$(document).on("click", "#saved-articles", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  console.log("Click:#saved-articles:thisId: ", thisId);
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/saved/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// Whenever someone clicks the 'submit' search button -- TO BE DONE
$(document).on("click", "#search-submit", function() {
  console.log("Click:#search-submit:search-input: ", search-input);
    // Empty the text from the search input
  $("#search-input").empty();

});

