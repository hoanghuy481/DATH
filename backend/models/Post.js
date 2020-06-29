const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
	'posts',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: Sequelize.STRING
		},
		post: {
			type: Sequelize.STRING
		},
		
		id_user: {
			type: Sequelize.STRING
		},
		created: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
		image: {
			type: Sequelize.STRING
		},
		view: {
			type: Sequelize.BIGINT,
		},
		audio: {
			type: Sequelize.STRING
		}
		
	},
	{
		timestamps: false
	}
)
