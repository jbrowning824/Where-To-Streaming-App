var streamingLogos = [{
    platform: "amazon",
    img: "./assets/images/amazonprime.svg",
    height: "15px"
},
{
    platform: "apple",
    img: "./assets/images/appletv.svg",
    height: "15px"
},
{
    platform: "curiosity",
    img: "./assets/images/curiositystream.svg",
    height: "15px"
},
{
    platform: "disney",
    img: "./assets/images/disney+.svg",
    height: "20px"
},
{
    platform: "hbo",
    img: "./assets/images/hbo.svg",
    height: "10px"
},
{
    platform: "hulu",
    img: "./assets/images/hulu.svg",
    height: "10px"
},
{
    platform: "netflix",
    img: "./assets/images/netflix.svg",
    height: "10px"
},
{
    platform: "peacock",
    img: "./assets/images/peacock.svg",
    height: "15px"
},
{
    platform: "showtime",
    img: "./assets/images/showtime.svg",
    height: "15px"
},
{
    platform: "starz",
    img: "./assets/images/starz.svg",
    height: "11px"
}
];
var genres = [{
    genre: "Adventure",
    value: 12
},

]



const storedMovies = {};


var httpOptions = {
    cache: "no-cache",
}

var cardContainer = $('.card-container');


$(document).ready(function(){
    $('.modal').modal({
        onCloseEnd: () => {
            $(this).find('.modal-content').empty();
        }
    });

    $('.card-container').on("click", `a[href="#more-info"]`, ((event) => {
        var instance = M.Modal.getInstance($('#movie-full-info'));
        
        instance.open();
        populateModal(event.target);
    }));

    $("form").submit(function(){
        event.preventDefault();
        var result = $('#search').val()
        var cardParent = $('.card-container');
        cardParent.empty();
        $('#search').val('');
        getSearchResults(result);
    });

    $('.clear-input').click(() => {
        $('#search').val('');
    })
  });

function mockAPI(){
    var movies = [{
        title: "Batman",
        imdbId: "tt1877830",
        year: 2022,
        released: "04 Mar 2022",
        director: "Matt Reeves",
        genres: [{
            id: 28,
            name: "Action"
        },
        {   
            id: 80,
            name: "Crime"
        }],
        poster: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg",
        rated: "PG-13",
        runtime: "176 min",
        plot: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
        ratings: [{
            source: "Internet Movie Database",
            value: "7.8/10"
        },
        {
            source: "Rotten Tomatoes",
            value: "85%"
        },
        {
            source: "Metacritic",
            value: "72/100"
        }]
    },
    {
        title: "Scott Pilgrim vs. the World",
        imdbId: "tt0446029",
        year: 2010,
        released: "13 Aug 2010",
        director: "Edgar Wright",
        genres: [{
            id: 28,
            name: "Action"
        },
        {   
            id: 35,
            name: "Comedy"
        },
        {   
            id: 14,
            name: "Fantasy"
        }],
        poster: "https://m.media-amazon.com/images/M/MV5BNWI5ODc4MTAtN2U2NC00ZDk3LWE3NjAtNjIyODE2YTlhYjYwXkEyXkFqcGdeQXVyOTA3ODI3NDA@._V1_SX300.jpg",
        rated: "PG-13",
        runtime: "112 min",
        plot: "In a magically realistic version of Toronto, a young man must defeat his new girlfriend's seven evil exes one by one in order to win her heart.",
        ratings: [{
            source: "Internet Movie Database",
            value: "7.5/10"
        },
        {
            source: "Rotten Tomatoes",
            value: "82%"
        },
        {
            source: "Metacritic",
            value: "69/100"
        }]
    },
    {
        title: "Need for Speed",
        imdbId: "tt2369135",
        year: 2014,
        released: "14 Mar 2014",
        director: "Scott Waugh",
        genres: [{
            id: 28,
            name: "Action"
        },
        {   
            id: 12,
            name: "Adventure"
        }],
        poster: "https://m.media-amazon.com/images/M/MV5BMTQ3ODY4NzYzOF5BMl5BanBnXkFtZTgwNjI3OTE4MDE@._V1_SX300.jpg",
        rated: "PG-13",
        runtime: "132 min",
        plot: "Fresh from prison, a street racer who was framed by a wealthy business associate joins a cross-country race with revenge in mind. His ex-partner, learning of the plan, places a massive bounty on his head as the race begins.",
        ratings: [{
            source: "Internet Movie Database",
            value: "6.4/10"
        },
        {
            source: "Rotten Tomatoes",
            value: "23%"
        },
        {
            source: "Metacritic",
            value: "39/100"
        }]
    },
    {
        title: "Pixels",
        imdbId: "tt2120120",
        year: 2015,
        released: "24 Jul 2015",
        director: "Chris Columbus",
        genres: [{
            id: 28,
            name: "Action"
        },
        {   
            id: 35,
            name: "Comedy"
        },
        {   
            id: 14,
            name: "Fantasy"
        }],
        poster: "https://m.media-amazon.com/images/M/MV5BMTIzNDYzMzgtZWMzNS00ODc2LTg2ZmMtOTE2MWZkNzIxMmQ0XkEyXkFqcGdeQXVyNjQ3MDg0MTY@._V1_SX300.jpg",
        rated: "PG-13",
        runtime: "132 min",
        plot: "When aliens misinterpret video feeds of classic arcade games as a declaration of war, they attack the Earth in the form of the video games.",
        ratings: [{
            source: "Internet Movie Database",
            value: "5.6/10"
        },
        {
            source: "Rotten Tomatoes",
            value: "18%"
        },
        {
            source: "Metacritic",
            value: "27/100"
        }]
    },
    {
        title: "The Other Guys",
        imdbId: "tt1386588",
        year: 2010,
        released: "06 Aug 2010",
        director: "Chris Columbus",
        genres: [{
            id: 28,
            name: "Action"
        },
        {   
            id: 35,
            name: "Comedy"
        },
        {   
            id: 80,
            name: "Crime"
        }],
        poster: "https://m.media-amazon.com/images/M/MV5BMDlhZDQ5NDUtNDcwMi00MTQ5LTk1Y2UtYjNmMjgzNzNhNzU3XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
        rated: "PG-13",
        runtime: "107 min",
        plot: "Two mismatched New York City detectives seize an opportunity to step up like the city's top cops, whom they idolize, only things don't quite go as planned.",
        ratings: [{
            source: "Internet Movie Database",
            value: "6.6/10"
        },
        {
            source: "Rotten Tomatoes",
            value: "79%"
        },
        {
            source: "Metacritic",
            value: "64/100"
        }]
    },
    {
        title: "Ready Player One",
        imdbId: "tt1677720",
        year: 2018,
        released: "29 Mar 2018",
        director: "Steven Spielberg",
        genres: [{
            id: 28,
            name: "Action"
        },
        {   
            id: 12,
            name: "Adventure"
        },
        {   
            id: 878,
            name: "Science Fiction"
        }],
        poster: "https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_SX300.jpg",
        rated: "PG-13",
        runtime: "140 min",
        plot: "When the creator of a virtual reality called the OASIS dies, he makes a posthumous challenge to all OASIS users to find his Easter Egg, which will give the finder his fortune and control of his world.",
        ratings: [{
            source: "Internet Movie Database",
            value: "7.4/10"
        },
        {
            source: "Rotten Tomatoes",
            value: "72%"
        },
        {
            source: "Metacritic",
            value: "64/100"
        }]
    }]
   
    //localStorage.setItem("movies", JSON.stringify(movies));
    // movies.forEach((movie) => {
    //     addMovieCard(movie);
    // });
}

function addMovieCard(movie) {
        var col = $("<div></div>").addClass("col s6 m4 l3 col-container");
        var newCard = $("<div></div>").addClass("card #616161 grey darken-2");
        var cardImg = $("<div></div>").addClass("card-image").css("background-image", `url(${movie.Poster})`);
        var addSaveButton = $("<a></a>").addClass("btn-floating btn-small halfway-fab waves-effect waves-light red");
        var icon = $("<i></i>").addClass("material-icons").text("favorite_border");
        var cardContent = $("<div></div>").addClass("card-content");
        var logoListContainer = $("<ul></ul>").addClass("logos");
        var movieInfo = $("<ul></ul>").addClass("movie-quick-info");
        var infoTitle = $("<li></li>").addClass("movie-title").text(`${movie.Title}`);
        var infoRating = $("<li></li>").text(`Rating: ${movie.Rated}`);
        var infoRuntime = $("<li></li>").text(`Runtime: ${movie.Runtime}`);
        var cardFooter = $("<div></div").addClass("card-action");
        var openModel = $("<a></a>", {href: "#more-info",id: movie.imdbID}).addClass("open-modal").text("More Info");

        cardContainer.append(col);
        col.append(newCard);
        newCard.append(cardImg, cardContent, cardFooter);
        cardImg.append(addSaveButton);
        addSaveButton.append(icon);
        cardContent.append(logoListContainer, movieInfo);
        movieInfo.append(infoTitle, infoRating, infoRuntime);
        cardFooter.append(openModel);

        // streamingLogos.forEach((logo) => {
        //     console.log(logo.img);
        //     var logoList = $("<li></li>");
        //     var logoImg = $('<img />',
        //                         {
        //                            src: logo.img,
        //                            height: logo.height 
        //                         });
        //     logoListContainer.append(logoList);
        //     logoList.append(logoImg);
        // });
}

async function fetchMovies(searchResult) {
    const response = await fetch("https://www.omdbapi.com/?s="+ searchResult + "&apikey=ec949a25", httpOptions);
    return await response.json();
}

async function fetchMoviesId(id) {
    const response = await fetch("https://www.omdbapi.com/?i="+ id +"&apikey=ec949a25", httpOptions);
    return await response.json();
}

function addGeneres(){
   

}

async function trailerModal(id){
    const apiUrl = "https://api.kinocheck.com/?imdb_id=";
     const response = await fetch(apiUrl + id,{mode: 'no-cors'});
     var youtubeID = await response.json.data.youtube_video_id();
     console.log(youtubeID)
     return youtubeID
    
   }






function populateModal(event){   
    var trailerURL = trailerModal(event.id)
    var movie = storedMovies[event.id];
    var movieInfoWrapper = $('<ul></ul>').addClass('movie-info-wrapper');
    var header = $('<h4></h4>').addClass('modal-header').text(movie.Title);
    var trailer = $('<iframe src=> "https://www.youtube.com/embed/' + trailerURL + '?autoplay=1"</iframe>');
    var movieInfo = $('<div>/<div)').addClass('movie-info');
    var movieTrailer = $('<div>/<div)').addClass('movie-trailer');
    var plot = $('<li></li>').text(movie.Plot);
    var movieContent = $('<div></div>').addClass('movie-content');
    var rating = movie.Ratings.find(r => r.Source == "Rotten Tomatoes");
    var rottenTomatoes = $('<li></li>').text('Rotten Tomatoes: ' + rating.Value);
    





    $('.modal-content').append(movieContent);
    $('.movie-content').append(movieInfo,movieTrailer);
    $('.movie-info').append(header,movieInfoWrapper);
    $('.movie-trailer').append(trailer);
    $('.movie-info-wrapper').append(rottenTomatoes);
    $('.movie-info-wrapper').append(plot);

}

async function getSearchResults(result){
    
    searchMovieTitles = await fetchMovies(result)

    searchMovieTitles.Search.forEach(async(movie) => {
        var movieResult = await fetchMoviesId(movie.imdbID);
        storedMovies[movie.imdbID] = movieResult;
        addMovieCard(movieResult);
        localStorage.setItem("movies", JSON.stringify(storedMovies));
    });    
}


