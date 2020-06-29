var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./routes/Users')
app.use('/users', Users)

var Posts = require('./routes/Posts')
app.use('/posts', Posts)

var Comments = require('./routes/Comments')
app.use('/Comments', Comments)

var Likes = require('./routes/Likes')
app.use('/likes', Likes)

var Followers = require('./routes/Followers')
app.use('/followers', Followers)

var Playlists = require('./routes/Playlists')
app.use('/playlists', Playlists)

var Playlist_tracks = require('./routes/Playlist_tracks')
app.use('/playlist_tracks', Playlist_tracks)

var Report_Types = require('./routes/Report_Types')
app.use('/report_types', Report_Types)

var User_reports = require('./routes/User_reports')
app.use('/user_reports', User_reports)

var Post_reports = require('./routes/Post_reports')
app.use('/post_reports', Post_reports)


app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
