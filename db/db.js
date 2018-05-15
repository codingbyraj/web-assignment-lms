const Sequelize = require('sequelize');


const HEROKU_POSTGRESQL_BRONZE_URL = "postgres://yoeebvojbpcnth:7b265dce47d670c1e3e02c2a3d7286327673596ad76eed6b56ff7f556db0e04c@ec2-54-204-39-46.compute-1.amazonaws.com:5432/dbdfdcbssnmcnk";
var db;
if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
     db = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        port: 5432,
        host: "ec2-54-204-39-46.compute-1.amazonaws.com",
        logging: true
    })
} else {     
     db = new Sequelize('learningsystem', 'root', 'root', {
        host: 'localhost',
        dialect: 'mysql',        
    })

}

const Course = db.define('courses', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})
const Batch = db.define('batches', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})
const Subject = db.define('subjects', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})
const Teacher = db.define('teachers', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
})
const Lecture = db.define('lectures', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})
const Student = db.define('students', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
})
Batch.belongsTo(Course)
Subject.belongsTo(Course)
Teacher.belongsTo(Subject)
Lecture.belongsTo(Batch)
Lecture.belongsTo(Subject)
Lecture.belongsTo(Teacher)
Student.belongsTo(Batch)
Batch.belongsToMany(Student, {
    through: "BatchStudent"
});
Student.belongsToMany(Batch, {
    through: "BatchStudent"
});

db.sync()
    .then(() => console.log("Db Synced"))
    .catch((err) => console.log("Error while creating db"))

module.exports = {
    Course,
    Batch,
    Teacher,
    Subject,
    Student,
    Lecture
}