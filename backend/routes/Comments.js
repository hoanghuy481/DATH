const express = require('express')
const comments = express.Router()
const cors = require('cors')

const Comment = require('../models/Comment');
const dbConnection = require('./../config/dbConnection');

comments.use(cors());
process.env.SECRET_KEY = 'secret';

const connection = dbConnection();
 
//create comment
comments.post('/create', (req, res) => {
	const today = new Date().toDateString()
	const commentData = {
		comment: req.body.comment,
		posts_id: req.body.posts_id,
		users_id: req.body.users_id,
	}
		//TODO bcrypt
		Comment.create(commentData)
		.then(comment => {
			res.json({created: comment.created, comments_id: comment.id})
		})
		.catch(err => {
			res.send('error: ' + err)
		})
		.catch(err => {
			res.send('error: ' + err)
		})
})
//get comment
comments.get('/commented/:id', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT comments.id, comments.comment, comments.created, users.first_name, users.last_name, users.avatar, users.uid
			FROM comments INNER JOIN users ON users.id = comments.users_id
			Where comments.posts_id = `+req.params.id
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

comments.delete('/delete/:id', (req, res) => {
    Comment.destroy(
			{where: { id: req.params.id} }
		)
        .then(() => {
            res.json({ status: 'Comment Deleted!' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

module.exports = comments
