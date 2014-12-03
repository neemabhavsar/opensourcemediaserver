$( document ).ready(function() {
    getAllGenre();
	getMovies();
	//getMovieList();
	getTopRated();
	getTvShows();
});


function getMovies(){
	$.get('/movies',function(data){
		var movies = JSON.parse(data);
		movies = movies.movies;
		for (var i = 0 ; i<movies.length ; i++) {
			var div = "<div class=\"element col-sm-4   gall branding\">"
			div += "<a class=\"plS\" href=/moviedetails.html#"+movies[i].id+ " rel=\"prettyPhoto[gallery2]\"> "+
			"<img id=\"i0\"	class=\"img-responsive picsGall \""+
			"src=http://image.tmdb.org/t/p/w500"+movies[i].poster_path + " alt=\""+movies[i].original_title +"\" />"
			+"</a>"
			+"<div class=\"view project_descr \"> <h3> <a href=/moviedetails.html#"+movies[i].id+">"+movies[i].original_title
			+" </a> </h3>"
			+" <ul> "
			+" <li><i class=\"fa fa-eye\"></i> "
			+movies[i].vote_count
			+" </li><li><a class=\"heart\" href=\"#\"> "
			+" <i class=\"fa-heart-o\"></i> "
			+ movies[i].vote_average
			+" </a></li></ul></div></div> ";
			$("#mycollection").append(div);
		}
	});
}

function getTvShows(){
	$.get('/tvShows',function(data){
		var tv = JSON.parse(data);
		tvShows = tv.tvShows;
		for (var i = 0 ; i<tvShows.length ; i++) {
			var div = "<div class=\"element col-sm-4   gall branding\">"
			div += "<a class=\"plS\" href=/tvShow_seasons.html#"+tvShows[i].id+ " rel=\"prettyPhoto[gallery2]\"> "+
			"<img id=\"i0\"	class=\"img-responsive picsGall \""+
			"src=http://image.tmdb.org/t/p/w500"+tvShows[i].poster_path + " alt=\""+tvShows[i].original_name +"\" />"
			+"</a>"
			+"<div class=\"view project_descr \"> <h3> <a href=/tvShow_seasons.html#"+tvShows[i].id+">"+tvShows[i].original_name
			+" </a> </h3>"
			+" <ul> "
			+" <li><i class=\"fa fa-eye\"></i> "
			+tvShows[i].vote_count
			+" </li><li><a class=\"heart\" href=\"#\"> "
			+" <i class=\"fa-heart-o\"></i> "
			+ tvShows[i].vote_average
			+" </a></li></ul></div></div> ";
			$("#myTvShows").append(div);
		}
	});
}

function getTopRated(){
	$.get('/movie/top/rated',function(data){
		var movies = JSON.parse(data);
		movies = movies.toprated;
		for (var i = 0 ; i<movies.length ; i++) {
			var div = "<div class=\"element col-sm-4   gall branding\">"
			div += "<img id=\"i0\"	class=\"img-responsive picsGall \""+
			"src=http://image.tmdb.org/t/p/w500"+movies[i].poster_path +"/>"
			+"<div class=\"view project_descr \"><h3>"+movies[i].original_title
			+"</h3>"
			+"<ul> "
			+" <li><i class=\"fa fa-eye\"></i> "
			+movies[i].vote_count
			+" </li><li><a class=\"heart\" href=\"#\"> "
			+" <i class=\"fa-heart-o\"></i> "
			+ movies[i].vote_average
			+" </a></li></ul></div></div> ";
			$("#toprated").append(div);
		}
	});
}

function getMovieTrailer() {
	//Sample request will trigger movie with id to play : http://localhost:3000/trailer.html#id
	var id = window.location.href.split("#")[1];
	var url = "/trailers/" + id;
	$.get(url,function(data){
		var movies = JSON.parse(data);
		movies = movies.movies;;
		$("#movieTrailer").attr('src',movies.videos[0].url);
	});
}

function getMovieList() {
	$.get('/movies',function(data){
		var movies = JSON.parse(data);
		movies = movies.movies;
		for (var i = 0 ; i<movies.length ; i++) {
			var wstr = "";
			wstr += "<li>";
			wstr += '<a href="/movie_details.html#' + movies[i].id + '">'
			wstr += movies[i].original_title;
			wstr += '</a>';
			wstr += "</li>";
			$("#moviesList").append(wstr);
		};
	});
}


function getMovieDetails() {
	var id = window.location.href.split("#")[1];
	var url = "/movies/" + id;
	 
	var videoUrl = '/videos/' + id + '.mp4';

	$.get(url,function(data){
		console.log("data", data);
		var movies = JSON.parse(data);
		movies = movies.movie_details;
		$("#movieDesc").html(movies.vidoeDesc);
		$("#movieVideo").html('<source src="' + videoUrl + '" type="video/mp4"></source>');
		$('#movieVideo').get(0).play();
		console.log("Dec....",movies.vidoeDesc);
	});
}
function getAllGenre(){
	var url= '/allgenres'
	$.get(url,function(data){
	var data = JSON.parse(data);	
	var genreArray = data.genre;
	$('#genreList').find("option:gt(0)").remove();	  
	for (var i=0; i< genreArray.length; i++ ) {		
		var K=$('<option/>').append(genreArray[i].name).val(genreArray[i].name);		
		$("#genreList").append(K);
	}
	
});
}
