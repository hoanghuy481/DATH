const express = require('express')
const posts = express.Router()
const cors = require('cors')
const multer = require('multer')

const Post = require('../models/Post')
const User = require('../models/User')
const dbConnection = require('../config/dbConnection');
const connection = dbConnection();
posts.use(cors())
process.env.SECRET_KEY = 'secret'
//////////
const storageAudio = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../mxh/public/posts/audio')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
	},
});
const fileFilterAudio = (req, file, cb) => {
	if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const uploadAudio = multer({
    storage: storageAudio,
    limits: {
        fileSize: 50000000
    },
    fileFilter: fileFilterAudio
});;
posts.post('/created/:uid/:title/:post/:image', uploadAudio.single('audio'), (req, res) => {
    Post.create({
        id_user: req.params.uid,
        post: req.params.post, 
        title: req.params.title, 
        audio: req.file.filename,
        view: 0
    })
    .then(post => {
        if (post) {
            res.json({id: post.id})
        } else {
            res.send('Post does not exist')
         }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

//update Image Post
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../mxh/public/posts/images')
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
posts.put('/update_image/:id', upload.single('image'), function (req, res) {
    Post.update({ 
                image: req.file.filename, 
            },{ 
                where: {id: req.params.id} 
            })
        .then(() => {
            res.send(req.file)
        })
        .error(err => handleError(err))  
});
//update post
posts.put('/update/:id/:title/:post', function (req, res) {
    Post.update({ 
                post: req.params.post,
                title: req.params.title
            },{ 
                where: {id: req.params.id} 
            })
        .then(() => {
            res.send(req.file)
        })
        .error(err => handleError(err))  
});

// post trang ca nhan
posts.get('/posted/:id', (req, res) => {
	Post.findAll({
		where: {
			id_user: req.params.id
		}
	})
		.then(post => {
			if (post) {
				res.json(post)
			} else {
				res.send('Post does not exist')
			}
		})
		.catch(err => {
			res.send('error: ' + err)
		})
})

posts.delete('/delete/:uid/:id', (req, res) => {
    Post.destroy(
			{where: { id_user: req.params.uid, id: req.params.id} }
		)
        .then(() => {
            res.json({ status: 'Post Deleted!' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

posts.put('/view/:id', (req, res) => {
    if (!req.body.view) {
        res.status(400)
        res.json({
            error: 'Bad Data'
        })
    } else {
        Post.update(
            { view: req.body.view },
            { where: { id: req.params.id } }
        )
            .then(() => {
                res.json({ status: 'Post Updated!' })
            })
            .error(err => handleError(err))
    }
})

//Lấy thông tin tất cả post khác
posts.get('/allpost', (req, res) => {
    Post.findAll()
        .then(post => {
            if (post) {
                res.json(post)
            } else {
                res.send("post does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//Lấy thông tin 1 post 
posts.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(post => {
            if (post) {
                User.findOne({
                    where: {
                        id: post.id_user
                    }
                }).then(user=>{
                    res.json({user,post})
                })
            } else {
                res.send("post does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//search thông tin
posts.get('/search/:search', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT posts.id as id, posts.title, posts.view, posts.image, users.id as users_id, users.first_name, users.last_name, users.uid
        FROM posts INNER JOIN users ON users.id= posts.id_user
        WHERE match (title,post) against ('${req.params.search}*'  IN BOOLEAN MODE)`
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

//get all post User following
posts.get('/post_by_following/:uid', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT users.first_name, users.last_name, users.avatar, users.uid, posts.id_user, posts.id, posts.title, posts.post, posts.audio, posts.image, posts.created, posts.view
		FROM socialnetwork.followers  
		INNER JOIN socialnetwork.posts ON posts.id_user = followers.users_id
		INNER JOIN socialnetwork.users ON users.id  = posts.id_user
		WHERE followers.user_follow_id =`+req.params.uid
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

//get user posts
posts.get('/user/:uid', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT users.first_name, users.last_name, users.avatar, users.uid, posts.id_user, posts.id, posts.title, posts.post, posts.audio, posts.image, posts.created, posts.view
		FROM socialnetwork.posts  
		INNER JOIN socialnetwork.users ON users.id  = posts.id_user
		WHERE posts.id_user =`+req.params.uid
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

//get top view 10 post
posts.get('/bxh10/', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT users.first_name, users.last_name, users.avatar, users.uid, posts.id_user, posts.id, posts.title, posts.post, posts.audio, posts.image, posts.created, posts.view
		FROM socialnetwork.posts  
		INNER JOIN socialnetwork.users ON users.id  = posts.id_user
		ORDER BY view DESC
        LIMIT 10`
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

//get top like 10 post
posts.get('/bxhlike10/', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT COUNT(socialnetwork.likes.id) AS likes,users.first_name, users.last_name, users.avatar, users.uid, posts.id_user, 
        posts.id, posts.title, posts.post, posts.audio, posts.image, posts.created
        FROM socialnetwork.posts  
        INNER JOIN socialnetwork.users ON users.id  = posts.id_user
        INNER JOIN socialnetwork.likes ON likes.posts_id  = posts.id
        group by posts.id
        ORDER BY likes DESC
        LIMIT 10`
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


module.exports = posts
