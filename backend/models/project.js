'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
    name:String,
    description:String,
    category:String,
    year:Number,
    langs:String,
    image:String
});

module.exports = mongoose.model('Project', ProjectSchema);
//mongodb traduce el nombre Project y lo transforma en minuscula y plural -> projects