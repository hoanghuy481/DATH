const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const multer = require('multer')
const User = require("../models/User")
const Post = require('../models/Post')
const Follower = require('../models/Follower')
users.use(cors())
const dbConnection = require('../config/dbConnection');
const connection = dbConnection();
process.env.SECRET_KEY = 'secret'

//Đăng ký
users.post('/register', (req, res) => {
    const today = new Date().toDateString()
    const userData = {
        first_name:     req.body.first_name,
        last_name:      req.body.last_name,
        email:          req.body.email,
        password:       req.body.password,
        uid:            req.body.uid,
        created:        today,
        avatar: 'usedefault.png'
    }
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({ status: user.email + ' Registered' })
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({ error: 'User already exists' })
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//đăng nhập
users.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.json({ token: token })
                } else {
                    res.json({ error: "User does not exist" })
                }
            } else {
                res.json({ error: "User does not exist" })
            }
        })
        .catch(err => {
            res.json({ err: err})
        })
})

//Lấy thông tin
users.get('/profile/:id', (req, res) => {
    User.findOne({
        where: {
			id: req.params.id
		}
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//Lấy thông tin user khác
users.get('/anotherprofile/:uid', (req, res) => {
    User.findOne({
        where: {
			uid: req.params.uid
		}
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//Lấy thông tin tất cả user khác
users.get('/alluser/', (req, res) => {
    User.findAll()
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send("User does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//Update avatar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../mxh/public/images/users')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

users.post('/profileImage/:id', upload.single('image'), function (req, res) {
    User.update(
            { avatar: req.file.filename},
            { where: {id: req.params.id} }
        )
        .then(() => {
            res.send(req.file)
        })
        .error(err => handleError(err))  
});

//search user
users.get('/search/:search', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT users.id, users.first_name, users.last_name, users.avatar, users.uid
        FROM socialnetwork.users 
        WHERE match (first_name,last_name) against ('${req.params.search}*'  IN BOOLEAN MODE)`
	connection.query(SELLECT_FROM_CMT, (err,results)=>{
		if(err) {
			return res.send(err)
		}
		else {
			return res.json({
				data: results
			})
		}
	});
});

//count followers user
users.get('/followers/:id', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT users.id, count(followers.user_follow_id) as followers
        FROM socialnetwork.users
        INNER JOIN socialnetwork.followers ON users.id = followers.users_id 
        WHERE users.id =`+ req.params.id
	connection.query(SELLECT_FROM_CMT, (err,data)=>{
		if(err) {
			return res.send(err)
		}
		else {
			return res.json({
				data
			})
		}
	});
});

//count posts user
users.get('/posts/:id', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT users.id, count(posts.id) as tracks
        FROM socialnetwork.users
        INNER JOIN socialnetwork.posts ON users.id = posts.id_user 
        WHERE users.id =`+ req.params.id
	connection.query(SELLECT_FROM_CMT, (err,data)=>{
		if(err) {
			return res.send(err)
		}
		else {
			return res.json({
				data
			})
		}
	});
});

//update user user
users.put('/update/:id/:first_name/:last_name/:bio', function (req, res) {
    User.update({ 
                first_name: req.params.first_name,
                last_name: req.params.last_name,
                bio: req.params.bio
            },{ 
                where: {id: req.params.id} 
            })
        .then(() => {
            res.send(req.file)
        })
        .error(err => handleError(err))  
});

module.exports = users