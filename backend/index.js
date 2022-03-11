'use_strict'
var app = require('./app');
var port = 3700;

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/angular_02_backend')
    .then(
        () => {
            console.log("conexión OK");
            app.listen(port, 
                ()=>{
                    console.log("servidor corriendo en localhost:3700");
                }
            )            
        })
        .catch(err => console.log(err));