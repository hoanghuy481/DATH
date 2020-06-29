const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'post_reports',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		description: {
			type: Sequelize.STRING
		},
		users_id: {
			type: Sequelize.INTEGER
		},
		posts_id: {
			type: Sequelize.INTEGER
		},
		type_id: {
			type: Sequelize.INTEGER
		},
		status: {
			type: Sequelize.STRING
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
