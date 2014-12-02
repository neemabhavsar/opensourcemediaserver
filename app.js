var express = require('express');
var app = express();
var databaseUrl = "moviedb"; // "username:password@example.com/mydb"
var collections = ["movie","genre","translations","reviews","trailers","tvShow","tvShowCollection","tvSeasons","episodes","images","similar","toprated"];
var db = require("mongojs").connect(databaseUrl, collections);

app.use(express.static(__dirname + '/static'));


app.get('/movies', function (req, res) {
	db.movie.find({} ,function(err,data){
		console.log("-------------",data.length);
		res.send(JSON.stringify({movies : data} ));

	});
});

app.get('/movies/:id', function(req,res){
	var id = req.params.id;
	var movie_details = {
		videoUrl : "/raw_omvie/" + id,
		vidoeDesc : "Ice Age !!"
	}
	res.send(JSON.stringify({movie_details : movie_details}));
	//res.send("Hello World ID ", id);
});

// return movie trailers
app.get('/trailers/:id', function(req,res){
	var movieId = req.params.id;

	db.trailers.find({id: parseInt(movieId)} ,function(err,data){
		res.send(JSON.stringify({movies : data[0]} ));
	});
});

app.get('/raw_movie/:id', function(req,res){
	var movieId = req.params.id;
	var path = "/home/gayathri/movies/Ice Age (2002).mp4"
	res.send(read(path));
	db.movie.find({id: movieId} ,function(err,data){
		console.log("-------------",data);
		res.send(JSON.stringify({movies : data} ));

	});
});	

app.get('/movie/:id', function(req,res){
	var movieId = req.params.id;
	var searchId = '{' + '"id"' + ':' + movieId + '}';
	db.movie.find(JSON.parse(searchId) ,function(err,data){
		console.log("-------------",data);
		res.send(JSON.stringify({movies : data} ));

	});
});
//returns all the genres present in movie database
app.get('/allgenres',function(req,res) {
	db.genre.find({},function(err,data){
		if(err){
			console.log("Error getting all genres..!");
			console.log(err);
		}
		res.send(JSON.stringify({genre: data}));
	});

});

//returns all the movies in particular genre on disk
//Input - genre id
//output find the movies from movie collection and returns as json data
app.get('/genre/:id',function(req,res){
	var genreId = req.params.id;
	var searchId = '{' + '"genres.id"' + ':' + genreId + '}';
    console.log(searchId);
	db.movie.find(JSON.parse(searchId) ,function(err,data){
		console.log(data);
		res.send(JSON.stringify({genrem: data}));
	});
});

//input - movie id
app.get('/translations/:id', function (req,res) {
	var movieId = req.params.id;
	var searchId = '{' + '"id"' + ':' + movieId + '}';
 	db.translations.find(JSON.parse(searchId),function(err,data){
		console.log(data);
		res.send(JSON.stringify({translations:data}));
	});
});

app.get('/reviews/:id',function (req,res){
	var movieId = req.params.id;
	var searchId = '{' + '"id"' + ':' + movieId + '}';
	db.reviews.find(JSON.parse(searchId),function(err,data){
		console.log(data);
		res.send(JSON.stringify({translations:data}));
	});
});

app.get('/tvShows', function (req, res) {
	db.tvShow.find({} ,function(err,data){
		console.log("-------------",data.length);
		res.send(JSON.stringify({tvShows : data} ));

	});
});

app.get('/tvShows/:id/seasons', function (req, res) {
	var tvShowID = parseInt(req.params.id);
	console.log("TVShow ID::", tvShowID);

	db.tvShowCollection.distinct('tvShowSeason', {tvShowID : tvShowID}, function(err,data){
		console.log("Seasons::",data);

		var tvShowSeason = data;

		db.tvShow.find({id : tvShowID} ,function(err,data){
			var tv_season_info = {
				seasons_present : tvShowSeason,
				season_info : data[0]
			}
			console.log(tvShowSeason);
			res.send(JSON.stringify({tvShowSeason : tv_season_info} ));
		});
	});
});

app.get('/tvShows/:id/seasons/:seasonNum', function (req, res) {

	var tvShowId = parseInt(req.params.id);
	var seasonNum = parseInt(req.params.seasonNum);

	console.log(tvShowId, "::", seasonNum);
	db.tvShowCollection.distinct('tvShowEpisode', {tvShowID : tvShowId, tvShowSeason : seasonNum}, function(err,data){

		var tvShowEpisodes = data;

		db.tvSeasons.find({tvShowID : tvShowId, season_number: seasonNum}, function(err,data){

			var tv_episodes_info = {
				episodes_present : tvShowEpisodes,
				episodes_info : data[0]
			}
			console.log(tv_episodes_info);
			res.send(JSON.stringify({tvShowEpisodes : tv_episodes_info} ));

		});
	});

});

app.get('/tvShows/:id/seasons/:seasonNum/episodes/:episodeNum', function (req, res) {
	var tvShowId = parseInt(req.params.id);
	var seasonNum = parseInt(req.params.seasonNum);
	var episodeNum = parseInt(req.params.episodeNum);

	db.episodes.find({tvShowID : tvShowId, season_number: seasonNum, episode_number : episodeNum}, function(err,data){
		res.send(JSON.stringify({tvShowEpisodeDetails : data[0]} ));
	});
});
/*
* This api will return all the similar movies for a given movie id
 */

app.get('/movie/similar/:id', function(req,res){
	var movieId = req.params.id;
	var searchId = '{' + '"id"' + ':' + movieId + "}";
	console.log(searchId);
	db.similar.find(JSON.parse(searchId),function(err,data){
	/*	var result = [];
		for(var i=0;i< data.length;i++){
			result[i] = data[0].results;
		}
	*/
			res.send(JSON.stringify({similar:data[0].results}));
	});
});

/*
* This api will get the  top rated movies
 */
app.get('/movie/top/rated', function(req,res){
   db.toprated.find({}, function(err,data){
      console.log(data);
      res.send(JSON.stringify({toprated:data[0].results}));
   });
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
