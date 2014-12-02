$( document ).ready(function() {

});


function getTvShows(){
	$.get('/tvShows',function(data){
		var tv = JSON.parse(data);
		tvShows = tv.tvShows;
		for (var i = 0 ; i<tvShows.length ; i++) {
			var div = "<div class=\"element col-sm-4   gall branding\">"
			div += "<a class=\"plS\" href=/tvShow_seasons.html#"+tvShows[i].id+ " rel=\"prettyPhoto[gallery2]\"> "+
			"<img id=\"i0\"	class=\"img-responsive picsGall \""+
			"src=http://image.tmdb.org/t/p/w500"+tvShows[i].poster_path + " alt=\""+tvShows[i].original_title +"\" />"
			+"</a>"
			+"<div class=\"view project_descr \"> <h3> <a href=/tvShow_seasons.html#"+tvShows[i].id+">"+tvShows[i].original_title
			+" </a> </h3>"
			+" <ul> "
			+" <li><i class=\"fa fa-eye\"></i> "
			+tvShows[i].vote_count
			+" </li><li><a class=\"heart\" href=\"#\"> "
			+" <i class=\"fa-heart-o\"></i> "
			+ tvShows[i].vote_average
			+" </a></li></ul></div></div> ";
			$("#tvShows").append(div);
		}
	});
}


function getTvShowsList() {
	$.get('/tvShows',function(data){
		var tv = JSON.parse(data);
		console.log(tv);
		tvShows = tv.tvShows;
		for (var i = 0 ; i<tvShows.length ; i++) {
			var wstr = "";
			wstr += "<li>";
			wstr += '<a href="/tvShow_seasons.html#' + tvShows[i].id + '">'
			wstr += tvShows[i].original_name;
			wstr += '</a>';
			wstr += "</li>";
			$("#tvShowsList").append(wstr);
		};
	});
}

function getTvShowsSeasonsList() {

	var id = window.location.href.split("#")[1];
	var url = "/tvShows/" + id + "/seasons";
	var posterBaseUrl = "http://image.tmdb.org/t/p/w300";

	$.get(url,function(data){
		var tv = JSON.parse(data);
		var tvShowSeason = tv.tvShowSeason.season_info;

		var tvShowName =  tvShowSeason.original_name;
		var tvShowDesc = tvShowSeason.overview;
		var tvShowPoster = tvShowSeason.poster_path;
		var status = tvShowSeason.status;
		var rating = tvShowSeason.vote_average;
		var seasons = tvShowSeason.seasons;
		var tvShowPresent = tv.tvShowSeason.seasons_present;
		

		$("#tvShowName").html(tvShowName);
		$("#tvShowOverview").html(tvShowDesc);
		$("#episode_poster").attr('src', posterBaseUrl + tvShowPoster );	
		$("#tvShowStatus").html("Status ::" + status);
		$("#tvShowRating").html("Rating ::" + rating);

		for (var i = 0 ; i<tvShowPresent.length ; i++) {
			var imgSrc = posterBaseUrl + seasons[tvShowPresent[i]].poster_path;
			var season_num = seasons[tvShowPresent[i]].season_number;
			var wstr = "";
			wstr += "<li>";
			wstr += '<img src="' + imgSrc +'" height="200" width="200">'
			wstr += '</img>';
			wstr += '<a href="/tvShow_episodes.html?tvShowId=' + id + '&seasonNum='+ season_num +  '"">'
			wstr += 'Season ::' + season_num ;
			wstr += '</a>';
			wstr += "</li>";
			console.log(wstr);
			$("#tvSeasonsList").append(wstr);
		};

	});
}

function getTvShowsEpisodesList() {

	var params = window.location.href.split("?")[1];
	var tvShowId = params.split("&")[0].split("=")[1];
	var tvSeasonNum = params.split("&")[1].split("=")[1];

	var url = "/tvShows/" + tvShowId + "/seasons/" + tvSeasonNum;

	console.log(url);

	$.get(url,function(data){
		var tv = JSON.parse(data);

		var tvShowEpisodes = tv.tvShowEpisodes;
		console.log(tvShowEpisodes);
		var tvEpisodesPresent = tvShowEpisodes.episodes_present;
		var season_info = tvShowEpisodes.episodes_info.season_info;
		var posterBaseUrl = "http://image.tmdb.org/t/p/w300/";

		var overview = season_info.overview;
		var airDate = season_info.air_date;
		var posterPath = season_info.poster_path;
		var episodes = season_info.episodes;

		$("#tvSeasonOverview").html(overview);
		$("#tvSeasonAirDate").html(airDate);
		$("#episodePoster").attr('src',posterBaseUrl + posterPath);


		for( var i = 0 ; i < tvEpisodesPresent.length ; i++) {
			var name = episodes[tvEpisodesPresent[i] - 1].name;	
			var episodeNum = episodes[tvEpisodesPresent[i] - 1].episode_number;
			var stillPath = episodes[tvEpisodesPresent[i] - 1].still_path;
			var imgSrc = posterBaseUrl + stillPath;

			var wstr = "";
			wstr += "<li>";
			wstr += '<img src="' + imgSrc +'" height="200" width="200">'
			wstr += '</img>';
			wstr += '<a href="/tvShow_episodesDetails.html?tvShowId=' + tvShowId + '&seasonNum='+ tvSeasonNum + '&episodeNum='+ episodeNum +  '"">';
			wstr += 'Episode Number ::' + episodeNum + ":: " + name ;
			wstr += '</a>';
			wstr += "</li>";
			console.log(wstr);
			$("#tvEpisodesList").append(wstr);
		}
	});
}

function getTvEpisodeDetails() {

	var params = window.location.href.split("?")[1];
	var tvShowId = params.split("&")[0].split("=")[1];
	var tvSeasonNum = params.split("&")[1].split("=")[1];
	var tvEpisodeNum = params.split("&")[2].split("=")[1];

	var url = "/tvShows/" + tvShowId + "/seasons/" + tvSeasonNum + "/episodes/" + tvEpisodeNum;
	var id = tvShowId + "_" + tvSeasonNum + "_" + tvEpisodeNum;
	var videoUrl = '/tvShows/' + id ;

	var posterBaseUrl = "http://image.tmdb.org/t/p/w300/";

	$.get(url,function(data){
		console.log("data", data);
		var tvShows = JSON.parse(data);
		var tvShow = tvShows.tvShowEpisodeDetails;
		$("#tvShowPoster").attr('src', posterBaseUrl + tvShow.still_path);
		$("#tvShowName").html(tvShow.name);
		$("#tvShowOverview").html(tvShow.overview);
		$("#tvShow").html('<source src="' +  videoUrl + '"></source>');
		$("#tvShowAirDate").html('Air Date ::' + tvShow.air_date);
	});
}
