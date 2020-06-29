const express = require('express')
const followers = express.Router()
const cors = require('cors')

const dbConnection = require('../config/dbConnection');
const Follower = require('../models/Follower');

followers.use(cors());

const connection = dbConnection();

//create Follower
followers.post('/create', (req, res) => {
	const today = new Date().toDateString()
	const followerData = {
		users_id: req.body.user_follow_id,
		user_follow_id: req.body.users_id,
		created: today
	}
		//TODO bcrypt
		Follower.create(followerData)
		.then(follower => {
			res.json( 'follower complited' )
		})
		.catch(err => {
			res.send('error: ' + err)
		})
		.catch(err => {
			res.send('error: ' + err)
		})
})

//UnFollower
followers.delete('/delete/:uid/:ufid', (req, res) => {
    Follower.destroy(
			{where: {user_follow_id : req.params.uid, users_id : req.params.ufid} }
		)
        .then(() => {
            res.json({ status: 'Post unFollower!' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

//get followed
followers.get('/followed/:uid', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT users.id, users.first_name, users.last_name, users.avatar, users.uid, followers.created
			FROM followers 
				INNER JOIN users ON users.id = followers.user_follow_id
			Where followers.users_id = `+req.params.uid
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

//get following
followers.get('/following/:uid', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT users.id, users.first_name, users.last_name, users.avatar, users.uid, followers.created
			FROM followers INNER JOIN users ON users.id = followers.users_id
			Where followers.user_follow_id = `+req.params.uid
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

//get Count Followers
followers.get('/countfollowers', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT users.first_name, users.last_name, users.avatar, users_id, COUNT(user_follow_id) AS follower
		FROM followers  
		INNER JOIN users ON users.id = followers.users_id
		GROUP BY users_id`
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

//get Count Followering
followers.get('/countfollowers', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT users.first_name, users.last_name, users.avatar, users_id, COUNT(users_id) AS following 
		FROM followers  
		INNER JOIN users ON users.id = followers.user_follow_id
		GROUP BY user_follow_id`
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

/*
followers.get('/userFollowerd/:pid/:uid', (req, res) => {
    Follower.findOne({
        where: {
			posts_id: req.params.pid,
			users_id: req.params.uid,
        }
    })
	.then(Follower => {
		if (Follower) {
			res.send('user was Follower')
		} 
	})
	.catch(err => {
		res.send('error: ' + err)
	})
})*/

module.exports = followers
