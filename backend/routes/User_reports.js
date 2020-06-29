const express = require('express')
const usersrp = express.Router()
const cors = require('cors')

const dbConnection = require('../config/dbConnection');
const User = require('../models/User_Report');

usersrp.use(cors());

const connection = dbConnection();

//create 
usersrp.post('/create', (req, res) => {
	const today = new Date().toDateString()
	const Data = {
		user_reporter: req.body.user_reporter,
		user_reported: req.body.user_reported,
		description: req.body.description,
		type_id: req.body.type_id,
		status: 'Not Done'
	}
		//TODO bcrypt
		User.create(Data)
		.then(user => {
			res.json( 'report complited' )
		})
		.catch(err => {
			res.send('error: ' + err)
		})
})

usersrp.put('/setdone/:id', (req, res) => {
	User.update(
		{ status: 'Done' },
		{ where: { id: req.params.id } }
	)
		.then(() => {
			res.json({ status: 'Status set done' })
		})
		.error(err => handleError(err))
})

//get 
usersrp.get('/userreport', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT user_reports.id, user_reports.status, user_reports.description, user_reports.user_reporter,user_reports.user_reported,user_report_types.type,user_reports.created
			FROM user_reports INNER JOIN user_report_types ON user_reports.type_id = user_report_types.id`
	connection.query(SELLECT_FROM_CMT, (err,results)=>{
		if(err) {
			return res.send(err)
		}
		else {
			return res.json({
				data: results
			})
		}
	});
});

module.exports = usersrp
