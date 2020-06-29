const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
	'playlists',
	{
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			autoIncrement: true
		},
		title: {
			type: Sequelize.STRING
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
