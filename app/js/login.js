$(document).ready(function(){	

//Выполняем асинхронный HTTP запрос на авторизацию пользователя
	$('form#login-form').on('submit', function(event) {
  	event.preventDefault();

  	$.ajax({
	    url:  'https://reqres.in/api/login',
	    type:'POST',
	    dataType : 'json',
	  	data: SERVICE.prepareAjaxData($(this).serializeArray()),
			beforeSend: SERVICE.preloader(true),
	    success: function(response){
	      $('.wrapper').html('').load(homePage);
	      localStorage.setItem('token', data.id_token);   
	    },
	    afterSend: setTimeout(function() { SERVICE.preloader(false) }, 3000)
		});
	});

});