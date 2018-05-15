// developed by Abhishek Raj on 14-05-2018

const express = require('express')
const app = express();
const path = require('path');
const {
    db
} = require('./db/db');
const {
    Student
} = require('./db/db')
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.urlencoded());

app.use('/', express.static(path.join(__dirname, 'public')));

const routes = {
    courses: require('./routes/courses'),
    students: require('./routes/students'),
    subjects: require('./routes/subjects'),
    teachers: require('./routes/teachers')
}

app.use('/students', routes.students);

app.use('/courses', routes.courses);

app.use('/subjects', routes.subjects);

app.use('/teachers', routes.teachers);

app.post('/addstudent', (req, res) => {
    console.log("add student", req)
    let newStudent = {
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        batchId: req.body.batchId
    }
    Student.create(newStudent)
        .then((student) => {
            res.status(200).send({
                success: true,
                message: "data saved"
            })
        })
        .catch((error) => {
            res.status(500).send({
                success: false,
                message: "data not saved"
            })
        })
})


let PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log("server started at port no. 1234");
});