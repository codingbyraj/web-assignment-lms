const express = require("express");
const route = express.Router();
const Teacher = require("../db/db").Teacher;
route.get('/', (req, res) => {
    Teacher.findAll().then((teachers) => {
            res.status(200).send({
                success: true,
                teachers: teachers
            })

        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: "No Teacher found"
            })
        })
});
route.get('/:id', (req, res) => {
    Teacher.findById(req.params.id)
        .then((teachers) => {        
            res.status(200).send({
                success: true,
                teachers: teachers
            })
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: "No Teacher found"
            })
        })
});
module.exports = route;