const express = require('express')
const likes = express.Router()
const cors = require('cors')
const mysql = require('mysql');

const Like = require('../models/Like');
const dbConnection = require('./../config/dbConnection');


likes.use(cors());

process.env.SECRET_KEY = 'secret';

const connection = dbConnection();

//create Like
likes.post('/create', (req, res) => {
	const today = new Date().toDateString()
	const likeData = {
		posts_id: req.body.posts_id,
		users_id: req.body.users_id,
		created: today
	}
		//TODO bcrypt
		Like.create(likeData)
		.then(like => {
			res.json( 'Like complited' )
		})
		.catch(err => {
			res.send('error: ' + err)
		})
		.catch(err => {
			res.send('error: ' + err)
		})
})
//Unlike
likes.delete('/delete/:uid/:pid', (req, res) => {
    Like.destroy(
			{where: { users_id: req.params.uid, posts_id: req.params.pid} }
		)
        .then(() => {
            res.json({ status: 'Post unlike!' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//get Like
likes.get('/liked/:id', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT likes.id, likes.created, users.first_name, users.last_name, users.avatar, users.uid, likes.users_id
			FROM likes INNER JOIN users ON users.id = likes.users_id
			Where likes.posts_id = `+req.params.id
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
// lấy users like bài viết
likes.get('/userliked/:pid/:uid', (req, res) => {
    Like.findOne({
        where: {
			posts_id: req.params.pid,
			users_id: req.params.uid,
        }
    })
	.then(like => {
		if (like) {
			res.send('user was like')
		} 
	})
	.catch(err => {
		res.send('error: ' + err)
	})
})

module.exports = likes
