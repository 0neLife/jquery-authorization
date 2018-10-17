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
}());

var loginPage = 'login.html',
		homePage  = 'home.html';

$(document).ready(function(){
	 $('.wrapper').html('').load(loginPage);
});
