'use strict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'soy la home'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'soy el test'
        });
    },

    saveProject: function(req,res){
        var project = new Project();
        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message: "error"});

            if(!projectStored) return res.status(400).send({message: "No se ha podido guardar"});

            return res.status(200).send({project: projectStored});  

        });

    },

    getProject: function(req, res){
        var projectID = req.params.id;
        Project.findById(projectID, (err, project) => {
            if(err) return res.status(500).send({message: "error"});

            if(!project) return res.status(404).send({message: "No existe"});

            return res.status(200).send({project});

        });
    },

    getProjects: function(req, res){
        //Project.find({}); como parametro le puedo poner el where con {} 
        Project.find({}).exec((err, projects) => {
            if(err) return res.status(500).send({message: "error"});
            if(!projects) return res.status(404).send({message: "No tiene nada"});

            return res.status(200).send({projects});

        });
    },

    updateProject: function(req, res){
        var projectID = req.params.id;
        var update = req.body;
        console.log(req.body)

        Project.findByIdAndUpdate(projectID, update, {new:true}, (err, projectUpdated) => {
            if(err) return res.status(500).send({message: "error"});

            if(!projectUpdated) return res.status(404).send({message: "No existe"});
            
            return res.status(200).send({project: projectUpdated});
        });
    },

    deleteProject: function(req, res){
        var projectID = req.params.id;
        Project.findByIdAndRemove(projectID, (err, project) => {
            if(err) return res.status(500).send({message: "error"});

            if(!project) return res.status(404).send({message: "No existe"});

            return res.status(200).send({project});
        });
    },

    uploadImage: function(req, res){
        var projectID = req.params.id;
        var fileName = 'Imagen no subida';
        if(req.files){
            var filePath = req.files.imagen.path;
            var fileSplit = filePath.split('/');
            var fileName = fileSplit[1];
            var fileExt = fileName.split('.')[1];
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt=='jpeg' || fileExt=='gif'){
                Project.findByIdAndUpdate(projectID, {image: fileName}, {new:true}, (err, projectUpdated) => {
                    if(err) return res.status(500).send({message: "error"});
                    if(!projectUpdated) return res.status(404).send({message: "No existe"});
                
                    return res.status(200).send({projectUpdated});
                });
            } else {
                //borrar el archivo que se subio porque no es el formato que necesito
                fs.unlink(filePath, (err)=> {
                    return res.status(200).send({message: "La extensión no es Valida"});
                });
            }
        } else {
            return res.status(200).send({message: fileName});
        }
    },

    getImageFile(req, res){
        var file = req.params.image;
        var path_file = './uploads/' + file;
        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({message: "No exite la imagen"});
            }
        });
    }
};

module.exports = controller;