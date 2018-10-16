# jquery-authorization

#### Author: http://www.yubutsan.com.ua/

A custom application on how to setup a authorization page using jQuery, hosted [REST-API](https://reqres.in/) for AJAX requests, HTTP authentication (validation input fields with disabled button form) and set/get received token in the sessionStorage.

<img src="https://github.com/0neLife/jquery-authorization/blob/master/app/img/demo-logo.png" width="100%">  

Run
-----------
```

$ npm install --save-dev gulp

$ npm install

$ gulp
```


Requirements
-----------
* [NodeJS](http://nodejs.org/) v8.11.3 or latest installed.
* [npm](https://www.npmjs.com/) v5.6.0 or latest installed.
* [gulpJS](https://gulpjs.com/) installed.

Dependencies list
-----------
```
"gulp"
"browser-sync"
"gulp-autoprefixer"
"gulp-imagemin"
"gulp-minify-css"
"gulp-rename"
"gulp-sass"
"gulp-uglify"
"imagemin-mozjpeg"
"node-bourbon"
```

Basic authentication
-----------
```
{
  "email":    "peter@klaven",
  "password": "citySlicka098"
}
```

Technical implementation API
-----------
```
Login POST
https://reqres.in/api/login/(with Basic authentication)
```
