const express = require("express")
const route = express.Router();
const Student = require("../db/db").Student;
route.get('/', (req, res) => {
    Student.findAll().then((students) => {
        console.log(students)
            res.status(200).send({
                success: true,
                students: students
            })
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: "Something is not Correct"
            })
        })
});
route.get('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then((students) => { 
            res.status(200).send({
                success: true,
                students: students
            })
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: "Something is not Correct"
            })
        })
});



module.exports = route;