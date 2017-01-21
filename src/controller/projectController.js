var projectModel = require('../models/projectModel.js');

/**
 * projectController.js
 *
 * @description :: Server-side logic for managing projects.
 */
module.exports = {

    /**
     * projectController.list()
     */
    list: function (req, res) {
        projectModel.find(function (err, projects) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting project.',
                    error: err
                });
            }
            return res.json(projects);
        });
    },

    /**
     * projectController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        projectModel.findOne({_id: id}, function (err, project) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting project.',
                    error: err
                });
            }
            if (!project) {
                return res.status(404).json({
                    message: 'No such project'
                });
            }
            return res.json(project);
        });
    },

    /**
     * projectController.create()
     */
    create: function (req, res) {
        var project = new projectModel({			projectName : req.body.projectName
        });

        project.save(function (err, project) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating project',
                    error: err
                });
            }
            return res.status(201).json(project);
        });
    },

    /**
     * projectController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        projectModel.findOne({_id: id}, function (err, project) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting project',
                    error: err
                });
            }
            if (!project) {
                return res.status(404).json({
                    message: 'No such project'
                });
            }

            project.projectName = req.body.projectName ? req.body.projectName : project.projectName;			
            project.save(function (err, project) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating project.',
                        error: err
                    });
                }

                return res.json(project);
            });
        });
    },

    /**
     * projectController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        projectModel.findByIdAndRemove(id, function (err, project) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the project.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
