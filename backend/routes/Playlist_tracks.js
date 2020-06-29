const express = require('express')
const tracks = express.Router()
const cors = require('cors')
const mysql = require('mysql');

const Track = require('../models/Playlist_track');
const dbConnection = require('./../config/dbConnection');

tracks.use(cors());

process.env.SECRET_KEY = 'secret';

const connection = dbConnection();

//create Playlist
tracks.post('/create', (req, res) => {
	const trackData = {
		playlists_id: req.body.playlists_id,
		posts_id: req.body.posts_id,
	}
	Track.findOne({
		where: {
			playlists_id: req.body.playlists_id,
			posts_id: req.body.posts_id
		}
	})
		.then(track=>{
			if(!track){
				Track.create(trackData)
				.then(track => {
					res.json({ status: track.posts_id + ' Added' })
				})
				.catch(err => {
					res.send('error: ' + err)
				})
				
			}else{
				res.json({ error: 'Tracks already in playlist' })
			}
		})
		.catch(err => {
			res.send('error: ' + err)
		})
		
})
//get Tracks
tracks.get('/tracks/:id', (req, res) => {
	var SELLECT_FROM_TRACK = 
		`SELECT playlist_tracks.id, users.id as user_id, users.first_name, users.last_name, users.avatar, users.uid, posts.id as post_id, posts.title,posts.post, posts.view, posts.audio, posts.image
		FROM playlist_tracks 
			INNER JOIN posts ON posts.id = playlist_tracks.posts_id
			INNER JOIN users ON users.id = posts.id_user
		WHERE playlist_tracks.playlists_id= `+req.params.id
	connection.query(SELLECT_FROM_TRACK, (err,results)=>{
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
//delete
tracks.delete('/delete/:pid/:tid', (req, res) => {
    Track.destroy(
			{where: { playlists_id: req.params.pid, posts_id: req.params.tid} }
		)
        .then(() => {
            res.json({ status: 'Track is remove!' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = tracks
