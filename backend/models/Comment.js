const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
	'comments',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		comment: {
			type: Sequelize.STRING
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
