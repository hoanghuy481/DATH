const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user_report_type',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		type: {
			type: Sequelize.STRING
		}
	},
	{
		timestamps: false
	}
)
