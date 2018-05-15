const express = require("express");
const route = express.Router();
const {
    Course
} = require('../db/db');
const {
    Batch
} = require('../db/db');
route.get('/', (req, res) => {
    Course.findAll()
    .then((courses) => {
        res.status(200).send({
            success: true,
            courses: courses
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
    Course.findById(req.params.id)
        .then((courses) => {          
            res.status(200).send({
                success: true,
                courses: courses
            })
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
               message: "Something is not Correct"
            })
        })
});
route.get('/:id/batches', (req, res) => {
    let courseId = req.params.id;
    Batch.findAll({
        where: {
            courseId: courseId
        }
    })
    .then((batches)=>{
        res.status(200).send({
            success:true,
            batches: batches
        })
    })
    .error((error)=>{
        res.status(500).send({
            success:false,
            message: "Something is not Correct"
        })
    })
});

route.get('/:id/batches/:batchid', (req, res) => {
    let courseId = req.params.id;        
    Batch.findOne({
        where: {
            courseId: courseId,
            id:req.params.batchid
        }
    })
    .then((batch)=>{
        res.status(200).send({
            success:true,
            batch: batch
        })
    })
    .error((error)=>{
        res.status(500).send({
            success:false,
            message: "Something is not Correct"
        })
    })
});
module.exports = route;