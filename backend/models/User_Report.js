const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user_reports',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		description: {
			type: Sequelize.STRING
		},
		user_reporter: {
			type: Sequelize.INTEGER
		},
		user_reported: {
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
