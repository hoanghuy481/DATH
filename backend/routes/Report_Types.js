const express = require("express")
const types = express.Router()
const cors = require("cors")

const Post = require("../models/Post_Report_Type")
const User = require("../models/User_Report_Type")
types.use(cors())

process.env.SECRET_KEY = 'secret'
//Lấy thông tin tất cả rp user type
types.get('/userreporttype/', (req, res) => {
    User.findAll()
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("Type does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

//Lấy thông tin tất cả rp post type
types.get('/postreporttype/', (req, res) => {
    Post.findAll()
        .then(post => {
            if (post) {
                res.json(post)
            } else {
                res.send("Type does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});



module.exports = types