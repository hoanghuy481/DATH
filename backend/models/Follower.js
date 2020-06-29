const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
	'followers',
	{
		users_id: {
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		user_follow_id: {
			primaryKey: true,
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
