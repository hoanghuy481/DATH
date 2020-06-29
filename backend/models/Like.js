const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
	'likes',
	{
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		playlist_id: {
			type: Sequelize.INTEGER
		},
		posts_id: {
			type: Sequelize.INTEGER
		},
		users_id: {
			type: Sequelize.INTEGER
		},
		created: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	},
	{
		timestamps: false
	}
)
