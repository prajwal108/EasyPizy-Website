

  $(document).ready(function() {
    $("#contact-form").submit(function(event) {
      event.preventDefault(); // Prevent the default form submission
      var formData = $(this).serialize();
      $.ajax({
        type: "POST",
        url: $(this).attr("action"),
        data: formData,
        dataType: "json",
        success: function(response) {
          // Handle success, show the success message and hide the form
          $("#contact-form").hide();
          $("#success-message").show();
        },
        error: function(response) {
          // Handle error, display an error message
          alert("An error occurred. Please try again later.");
        }
      });
    });
  });
