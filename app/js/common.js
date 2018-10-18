(function(){

	SERVICE = {};

	SERVICE.prepareAjaxData = function(serialize){
		var info = {};
		for(var i = 0, max = serialize.length; i < max; i+=1){
			info[serialize[i].name] = serialize[i].value;
		};
		return info;
	};

	SERVICE.preloader = function(status){
		$('#preloader').attr('class',(status ? 'active':''));
	};

	SERVICE.networkStatus = function(status){
		$('.pulse.slash').attr('class',(status ? 'pulse slash' : 'pulse slash active'));
	};
	SERVICE.errorMsg = function(status, message){
		var elm = $('#popup-error-msg');
		elm.find('.error-msg').html(message);
		elm.find('.btn-main').click(function(){
			elm.css('opacity','0').find('.popup-content').css('margin-top','150px');        
		setTimeout(function(){
		  	elm.removeClass('active').css('opacity','').find('.popup-content').css('margin-top','');
			}, 400);
		});
		elm.attr('class',(status ? 'popup active' : 'popup'));
	}
}());

var loginPage = 'login.html',
		homePage  = 'home.html';

$(document).ready(function(){
	 $('.wrapper').html('').load(loginPage);
});