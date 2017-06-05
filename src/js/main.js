

$(document).ready(function() {
  console.log("Hello, world!");
  // Play buttons //
  $(".box0").on("mousedown", function() {
    if (onOff === 1 && !playing)
      press(0);
  });

  $('body').scrollspy({target: ".navbar", offset: 50});

  $("#myNavbar a, .navbar-brand").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }  // End if
  });
});
