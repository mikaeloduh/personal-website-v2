$(document).ready(function() {
  // Cache DOM objects
  var $alertBox = $("#alert-box");
  var $contactForm = $("#contact-form");

  /********************************************/
  /*                 Navbar                   */
  /********************************************/
  $("#myNavbar a, .navbar-brand, #banner a").on("click", function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
                        {scrollTop: $(hash).offset().top},
                        800,
                        function(){
                          // Add hash (#) to URL when done scrolling (default click behavior)
                          window.location.hash = hash;
                        }
                      );
    }
  });

  // Close navbar automatically
  $('.navbar-collapse li').click(function(){
    $(".navbar-collapse").collapse('hide');
  });

  /********************************************/
  /*              Contact Form                */
  /********************************************/
  // Hide alert box when closing (instead of the default action of removing the element)
  $alertBox.children(".close").on("click", function () {
    // Animate close
    $(this).parent().slideUp("fast")
                    .animate({ opacity: 0 }, { queue: false, duration: "fast"});
  });

  function showResponse(msg) {
    $alertBox.removeClass('alert-success alert-warning');

    if (msg.includes("Message sent!")) {
      $alertBox.addClass("alert-success");
      // Clear contact form
      $contactForm[0].reset();
    }
    else {
      $alertBox.addClass("alert-warning");
    }
    // Show alerBox and debug message
    $alertBox.slideDown("fast")
             .animate({ opacity: 1 }, { queue: false, duration: "fast"})
             .children("p")
               .html(msg);
  }

  $contactForm.validator();

  $contactForm.submit(function (e) {
    if (!e.isDefaultPrevented()) {
      $.ajax({
        type: "POST",
        url: "php/send_form_email.php",
        data: $contactForm.serialize()
      })
      .done(function (msg) {
        showResponse(msg);
      })
      .fail(function (xhr, status, error) {
        showResponse(error);
        console.warn(error);
      });
      return false;
    }
  });

});
