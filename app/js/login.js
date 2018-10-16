$(document).ready(function(){

	var valid = 0;
	$("#login-form button").prop("disabled", true);

	$('input#email, input#password').unbind().blur( function(){
		var id 	= $(this).attr('id'),
			 	val = $(this).val();

	  switch(id)
	  {
			case ('email'):
				var validatorsPattern = /.+?\@.+/g;
				$(this).removeClass('valid');
				if(val == '') {
						$(this).nextAll('.error-message').addClass('active')
																						 .html('*Email is required');
				} else if(!validatorsPattern.test(val)) {
						$(this).nextAll('.error-message').addClass('active')
																						 .html('*Valid mail must contain letters before and after @');												
				} else {
						$(this).nextAll('.error-message').removeClass('active').html('');
						valid = valid + 1;
				}
			break;

			case 'password':
				var validatorsPattern 	= /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+/,
						validatorsMinLength = val.length;
				if(val == '') {
						$(this).nextAll('.error-message').addClass('active')
																						 .html('*Password is required');
				} else if(validatorsMinLength < 5) {
						$(this).nextAll('.error-message').addClass('active')
																						 .html('*Password must be at least 5 characters long');
				} else if(!validatorsPattern.test(val)) {
						$(this).nextAll('.error-message').addClass('active')
																						 .html('*Your password must contain at least one uppercase, one lowercase, and one number');												
				} else {
						$(this).nextAll('.error-message').removeClass('active');
						valid = valid + 1;
				}
			break;
	 	}
	 	(valid == 2) ? $("form#login-form button").prop("disabled", false) : '';
	});

	$('form#login-form').on('submit', function(event) {
  	event.preventDefault();

  	$.ajax({
	    url:  'https://reqres.in/api/login',
	    type:'POST',
	    dataType : 'json',
	  	data: SERVICE.prepareAjaxData($(this).serializeArray()),
			beforeSend: SERVICE.preloader(true),
	    success: function(response){
	      console.log(response);   
	      sessionStorage.setItem('accessToken', response.token);
	      if (sessionStorage.getItem('accessToken') === response.token){	      	
		      $('.wrapper').html('').load(homePage);
		      console.log('tokens are the same');
	      } else{
	      	console.log('tokens are not the same');
	      }
	    },
	    afterSend: setTimeout(function() { SERVICE.preloader(false) }, 2000)
		});
	});

});