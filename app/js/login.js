$(document).ready(function(){

	var validEmail 		= false,
			validPassword = false;
	$("#login-form button").prop("disabled", true);

	$('input#email, input#password').unbind().blur( function(){
		var id 	= $(this).attr('id'),
			 	val = $(this).val();

	  switch(id)
	  {
			case ('email'):
				var validatorsPattern = /.+?\@.+/g;
				validEmail = false;

				$(this).removeClass('valid');
				if(val == '') {
						$(this).nextAll('.error-message').addClass('active')
																						 .html('*Email is required');
				} else if(!validatorsPattern.test(val)) {
						$(this).nextAll('.error-message').addClass('active')
																						 .html('*Valid mail must contain letters before and after @');												
				} else {
						$(this).nextAll('.error-message').removeClass('active').html('');
						validEmail = true;
				}
			break;

			case 'password':
				var validatorsPattern 	= /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+/,
						validatorsMinLength = val.length;
						validPassword = false;
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
						validPassword = true;
				}
			break;
	 	}
	 	(validEmail && validPassword) ? $("form#login-form button").prop("disabled", false) : $("form#login-form button").prop("disabled", true);
	});

	$('form#login-form').on('submit', function(e) {
  	e.preventDefault();

  	if (window.navigator.onLine){
  		SERVICE.networkStatus(true);
	  	$.ajax({
		    url:  'https://reqres.in.in/api/login',
		    type:'POST',
		    dataType : 'json',
		  	data: SERVICE.prepareAjaxData($(this).serializeArray()),
				beforeSend: function(jqXHR, settings){},
		    success: function(response, textStatus, jqXHR){
		    	SERVICE.preloader(true)
					if (jqXHR.readyState === 4 && jqXHR.status === 200){
						var type = jqXHR.getResponseHeader('Content-Type');
						if(type === 'application/json; charset=utf-8'){
							sessionStorage.setItem('accessToken', response.token);	      	
						  $('.wrapper').html('').load(homePage);
						  setTimeout(function() { SERVICE.preloader(false) }, 2000);					
						}
					}
		    },
		    error: function (jqXHR, textStatus) {
	        var msg = '';
	        if (jqXHR.status === 0) {
	            msg = 'Request is invalid. The browser refused to honor the request.\n'
	            			+'Make sure that your server is sending the appropriate Access-Control-'
	            			+'headers with each request.';
	        } else if (jqXHR.status == 404) {
	            msg = 'Requested page not found! #[404]';
	        } else if (jqXHR.status == 500) {
	            msg = 'Internal Server Error! #[500].';
	        } else if (textStatus === 'parsererror') {
	            msg = 'Requested JSON parse failed!';
	        } else if (textStatus === 'timeout') {
	            msg = 'Time out error!';
	        } else if (textStatus === 'abort') {
	            msg = 'Ajax request aborted!';
	        } else {
	            msg = 'Uncaught Error.\n' + jqXHR.responseJSON+'!';
	        }  			
        	SERVICE.errorMsg(true, msg);
    		}
			});
  	}else {
  		SERVICE.networkStatus(false);
  		console.log('network aren\'t available');
  	}
	});
});