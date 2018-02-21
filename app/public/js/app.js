$(document).ready(function(){
    //add chosen to the survey
    $(".chosen-select").chosen({})
    
    
    $('#submit-button').on('click', function(){
            // Form validation
            function validateForm() {
              var isValid = true;
              $('.form-control').each(function() {
                if ( $(this).val() === '' )
                    isValid = false;
              });
    
              $('.chosen-select').each(function() {
    
                  if( $(this).val() === "")
                      isValid = false
              })
              return isValid;
            }
    
            // If all required fields are filled
            if (validateForm() == true) {		
        
                //create an object of the person taking the survey to be added to the friends object
                //add the name and image to the object
                var userData = {
                    name: $('#survey-name').val().trim(),
                    photo: $('#survey-image').val().trim(),
                    scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val() ]
                    };
    
                var currentURL = window.location.origin;
    
                $.post(currentURL + "/api/friends", userData, function(data){
                    console.log(data);
                    console.log(data.name);
                    console.log(data.image);
                    $("#friend-name").append(data.name);
                    $("#friend-image").attr("src", data.photo);
                    $("#resultsModal").modal('show');
                    //empty chosen survey, name field and image field
                    $(".chosen-select").val('').trigger("chosen:updated");
                    $("#survey-name").val(" ");
                    $("#survey-image").val(" ");
                });	
                } else {
                alert("Please fill out all fields!")
            }
    });
    
    
        
    });