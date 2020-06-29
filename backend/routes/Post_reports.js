const express = require('express')
const postsrp = express.Router()
const cors = require('cors')

const dbConnection = require('../config/dbConnection');
const Post = require('../models/Post_Report');

postsrp.use(cors());

const connection = dbConnection();

//create 
postsrp.post('/create', (req, res) => {
	const today = new Date().toDateString()
	const Data = {
		users_id: req.body.users_id,
		posts_id: req.body.posts_id,
		description: req.body.description,
		type_id: req.body.type_id,
		status: 'Not Done'
	}
		//TODO bcrypt
		Post.create(Data)
		.then(user => {
			res.json( 'report complited' )
		})
		.catch(err => {
			res.send('error: ' + err)
		})
})

postsrp.put('/setdone/:id', (req, res) => {
	Post.update(
		{ status: 'Done' },
		{ where: { id: req.params.id } }
	)
		.then(() => {
			res.json({ status: 'Status set done' })
		})
		.error(err => handleError(err))
})

//get 
postsrp.get('/postreport', (req, res) => {
	var SELLECT_FROM_CMT = 
		`SELECT post_reports.id, post_reports.status, post_reports.description, post_reports.users_id,post_reports.posts_id,post_report_types.type,post_reports.created
			FROM post_reports INNER JOIN post_report_types ON post_reports.type_id = post_report_types.id`
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

module.exports = postsrp
