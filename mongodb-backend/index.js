//Connects to the mongoDB database
const CONNECTION_URL = "mongodb+srv://admin:adminPass@cluster0.7qjye.mongodb.net/zooSystem?retryWrites=true&w=majority"
const mongoose = require('mongoose');

mongoose.connect(CONNECTION_URL, {
    dbName: 'zooSystem',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to zooSystem database'));
  
//Schema for users
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

//Schema for roles
const RolesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    duties: {
        type: Array,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('users', UserSchema);
const Roles = mongoose.model('roles', RolesSchema);
  
//For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listening at port 5000");
app.use(express.json());
app.use(cors());

//Making get request for roles based on username
app.get("/user", (req, resp) => {
    const username = req.query.username;
    const password = req.query.password;
    User.find({ username, password }, function (err, res) {
        if(err) {
            resp.send({
                statusCode: 400,
                message: err.message,
                data:[]
            });
        }
        else {
            if(res.length > 0) {
                Roles.find({ username: res[0].username }, function (err, role) {
                    if(err) {
                        resp.send({
                            statusCode: 400,
                            message: err.message,
                            data: []
                        })
                    }
                    else {
                        resp.send({
                            statusCode: 200,
                            message: "",
                            data: role
                        })
                    }
                })
            }
            else {
                resp.send({
                    statusCode: 400,
                    message: "Username or password incorrect",
                    data: []
                })
            }
        }
    });
});

//Backend can be checked at http://localhost:5000
app.listen(5000);