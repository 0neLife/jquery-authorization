// анонимная самовызывающаяся функция 
(function(){

// создаем глобальный объект 	
	SERVICE = {};

// формируем объект c данными формы ввода для отправки на сервер
	SERVICE.prepareAjaxData = function(serialize){
		var info = {};
		for(var i = 0, max = serialize.length; i < max; i+=1){
			info[serialize[i].name] = serialize[i].value;
		};
		return info;
	};

// основной индикатор загрузки данных на страницу
	SERVICE.preloader = function(status){
		$('#preloader').attr('class',(status ? 'active':''));
	};

}());

// хранение в переменной HTML страниц
var loginPage = 'login.html',
		homePage  = 'home.html';

// получаем содержимое блока .wrapper и загружаем туда значение переменной
$(document).ready(function(){
	 $('.wrapper').html('').load(loginPage);
});