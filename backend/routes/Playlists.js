const express = require('express')
const playlists = express.Router()
const cors = require('cors')
const mysql = require('mysql');

const Playlist = require('../models/Playlist');
const User = require('../models/User')
playlists.use(cors());

process.env.SECRET_KEY = 'secret';

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'socialnetwork'
});

connection.connect(function(err) {
	if (err) {
		return err;
	}else {
		console.log('connected')
	}
});
//create Playlist
playlists.post('/create', (req, res) => {
	const playlistData = {
		title: req.body.title,
		users_id: req.body.users_id,
	}
		//TODO bcrypt
		Playlist.create(playlistData)
		.then(playlist => {
			res.json(playlist.users_id)
		})
		.catch(err => {
			res.send('error: ' + err)
		})
		.catch(err => {
			res.send('error: ' + err)
		})
})
//Get Playlist
playlists.get('/playlisted/:id', (req, res) => {
	Playlist.findAll({
		where: {
			users_id: req.params.id
		}
	})
		.then(playlist => {
			if (playlist) {
				res.json(playlist)
			} else {
				res.send('playlist does not exist')
			}
		})
		.catch(err => {
			res.send('error: ' + err)
		})
})

//Get 1 Playlist
playlists.get('/playlist/:id', (req, res) => { 
	Playlist.findOne({
		where: {
			id:  req.params.id
		}
	})
		.then(playlist => {
            if (playlist) {
                User.findOne({
                    where: {
                        id: playlist.users_id
                    }
                }).then(user=>{
                    res.json({user,playlist})
                })
            } else {
                res.send("playlist does not exist")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})
//delete
playlists.delete('/delete/:uid/:pid', (req, res) => {
    Playlist.destroy(
			{where: { users_id: req.params.uid, id: req.params.pid} }
		)
        .then(() => {
            res.json({ status: 'Playlist Delete!' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})


module.exports = playlists
