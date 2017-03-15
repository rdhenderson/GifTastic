
// Initial array of movies
var searched = [];
var animalGifs = {}; //key = searched term, value = response.data


function renderButtons() {
  $("#gif-buttons").empty();
  //for (var i = 0; i < movies.length; i++) {
  // if(!initComplete) { initMovieInfo();}
  console.log("Rendering buttons");
  for (var i = 0; i<searched.length; i++) {
      var newBtn = $("<input>");
      newBtn.attr("value", searched[i]);
      newBtn.attr("class", "btn btn-sm btn-primary animal-btn");
      newBtn.click(displayGifs);
      $("#gif-buttons").append(newBtn);
  }
}        

function displayGifs() {
  $("#gif-view").empty();
  // console.log(animalGifs);
  // console.log("search array" + searched);
  
  var animal = $(this).val();
 
  console.log("showing animal: " + animal + " " + animalGifs);
  var gifView = $("#gif-view");

  $("<ul>").attr("id", "image-list").attr("class", "row list-unstyled").appendTo(gifView);

  for(var key in animalGifs[animal]){
    var gif = animalGifs[animal][key]

    var animalList = $("<li>").addClass("col-md-3");
    //var p = $("<p>").text("Rating: " + gif.rating);
    
    var animalImg = $("<img>").attr("src", gif.images.fixed_height_still.url);

    animalImg.attr("data-still", gif.images.fixed_height_still.url);
    animalImg.attr("data-animate", gif.images.fixed_height.url);
    animalImg.addClass("gif");
    animalImg.click(gifAnimateToggle);

    animalList.append(animalImg);
    $("#image-list").append(animalList);

    // animalDiv.append(animalImg);
    // gifView.append(animalDiv)
    // count++;
    // if(count%5 === 0) {
    //   console.log("count = " + count);
    //   gifView.append(spacerCol);
    //   gifView.append(row);
    //   gifView.append(spacerCol);
    // }
  }
}

function gifAnimateToggle() {
  
  console.log("Click triggered")

  var state = $(this).attr("data-state");
  //State will self-initialize on the first pass, since a null attribute doesn't === "move"
  if (state === "move") {
    $(this).attr("data-state", "still");
    $(this).attr("src", $(this).attr("data-still"));
  } else {
     $(this).attr("data-state", "move");
    $(this).attr("src", $(this).attr("data-animate"));
  }
}

$("#clear").click(function(){
  $("#gif-view").empty();
  $("#gif-buttons").empty();
  searched = [];
  animalGifs = {};
});


// This function handles events where one button is clicked
$("#add-gif").on("click", function() {
  event.preventDefault();
  // Here we grab the text from the input box
  var animalSearch = $("#gif-input").val()
  
  var searchPhrase = animalSearch.replace(' ', '+');
  //clear the input box
  $("#gif-input").val("");

  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchPhrase + "&limit=10&api_key=dc6zaTOxFJmzC";

  $.ajax({
    url: queryURL, 
    method: "GET"
  }).done(function(response){
    var results = response.data;
    console.log(results);
    if(!(animalSearch in animalGifs)) {
      searched.push(animalSearch);
      animalGifs[animalSearch] = results;
      renderButtons();
      $('input[value="'+animalSearch+'"]').trigger("click");    
    } else {
      alert("Duplicate Search");
    }
  });
});

//put focus on the search bar
$(document).ready(function() { 
  $("#gif-input").focus(); 
});


