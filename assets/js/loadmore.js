$(document).ready(function(){
  $(".loadnews").slice(0, 6).show();
  $("#loadmore").on("click", function(e){
    e.preventDefault();
    $(".loadnews:hidden").slice(0, 3).slideDown();
    if($(".loadnews:hidden").length == 0) {
      $("#loadmore").text("No more news").addClass("noContent");
    }
  });
  
})