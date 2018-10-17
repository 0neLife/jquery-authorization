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
}());

var loginPage = 'login.html',
		homePage  = 'home.html';

$(document).ready(function(){
	 $('.wrapper').html('').load(loginPage);
});
console.log(window.navigator.connection);