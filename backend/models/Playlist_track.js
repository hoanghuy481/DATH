const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
	'playlist_tracks',
	{
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			autoIncrement: true
		},
		playlists_id: {
			type: Sequelize.INTEGER
		},
		posts_id: {
			type: Sequelize.INTEGER
		}
	},
	{
		timestamps: false
	}
)
