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
var genres = {
    12: "Adventure",
    14: "Fantasy",
    16: "Animation",
    18: "Drama",
    27: "Horror",
    28: "Action",
    35: "Comedy",
    36: "History",
    37: "Western",
    53: "Thriller",
    80: "Crime",
    99: "Documentary",
    878 :"Science Fiction",
    9648: "Mystery",
    10402: "Music",
    10749: "Romance",
    10751: "Family",
    10752: "War",
    10763: "News",
    10764: "Reality",
    10767: "Talk Show"
}


var services = ['netflix', 'prime.subscription','hbo,hulu.addon.hbo,prime.addon.hbomaxus',
'prime.rent,prime.buy,apple.rent,apple.buy','hulu.subscription,hulu.addon.hbo',
'apple.addon', 'peacock.free'];

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
        //need to add streaming icons function that fires from here.
        instance.open();
        populateModal(event.target);
    }));

    $("form").submit(function(){
        event.preventDefault();
        var result = $('#search').val()
        
        cardContainer.empty();
        $('#search').val('');
        getSearchResults(result);
    });

    $('.clear-input').click(() => {
        $('#search').val('');
    });

    $('#genres').click((event) => {
        cardContainer.empty();
        var result = [$(event.target).text()];
        getGenreResults(result)

    })



     $('#saved-movies-tab').click(savedMoviesTab())
    })


    function savedButtonClick(movie) {  
        var savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        savedMovies.push(movie);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies)); 
     }
     function savedMoviesTab(){
        console.log("calledsavedmovies")
        var savedMovies =JSON.parse(localStorage.getItem('savedMovies'));

    if (savedMovies.length > 0) {
        cardContainer.empty()
        savedMovies.forEach(function (movie){
       
         addMovieCard(movie)
        
    })}
        } 
  
        
function addMovieCard(movie) {
    if(movie.Title != undefined){
        var col = $("<div></div>").addClass("col s6 m4 l3 col-container");
        var newCard = $("<div></div>").addClass("card #616161 grey darken-2");
        var cardImg = $("<div></div>").addClass("card-image").css("background-image", `url(${movie.Poster})`);
        var addSaveButton = $("<a></a>").addClass("btn-floating btn-small halfway-fab waves-effect waves-light red button-saved")
        addSaveButton.click(savedButtonClick(movie()))
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
    }
    else{
        console.log("not a movie ", movie);
    }
  
  }


// $('button-saved').click(function () {
//     var savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || []; 


//      savedMovies.push(movie);  
//     localStorage.setItem('savedMovies', savedMovies)
//     })





async function fetchMovies(searchResult) {
    const response = await fetch("https://www.omdbapi.com/?s="+ searchResult + "&apikey=5b9195cb", httpOptions);
    return await response.json();
}

async function fetchMoviesId(id) {
    const response = await fetch("https://www.omdbapi.com/?i="+ id +"&apikey=5b9195cb", httpOptions);
    return await response.json();
}

async function fetchMoviesGenre(id) {
    httpOptionsRapidApi = {
        headers: {
            'X-RapidAPI-Key': '1de57e26a3mshbc15d44f8417944p1c87fdjsn674c6b674140',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    }
    const response = await fetch("https://streaming-availability.p.rapidapi.com/search/filters?services="+ 
        services.toString() +"&country=us&output_language=en&genres=" + id 
        +"&genres_relation=and&show_type=movie", httpOptionsRapidApi);
    return await response.json();
}

function addGeneres(){
    for(const [key, value] of Object.entries(genres)){
        var genreListItem = $('<li></li>').text(value);
        $('#genres').append(genreListItem);
    }
}
async function getTrailer(id){
    var response = await fetch("https://bootcamp-movietrailer.azurewebsites.net/api/Function1?id=" + id,
    {headers: {
        'x-functions-key': 'NS4_Xn9DxrWabt2clUfPI9CF92SgUV2rwkZVIyk_HVIoAzFuqR0TLg=='}})
    return await response.json();
}

async function populateModal(event){   
    
    var movie = storedMovies[event.id];
    var trailerResponse = await getTrailer(event.id);
    if(youtube_id){
        
        var trailer = $('<iframe src="https://www.youtube.com/embed/'+ youtube_id +'?autoplay=1"></iframe>');
        var youtube_id = trailerResponse.trailer.youtube_video_id;
    }
    
    var movieInfoWrapper = $('<ul></ul>').addClass('movie-info-wrapper');
    var header = $('<h4></h4>').addClass('modal-header').text(movie.Title);
    
    var movieInfo = $('<div>/<div)').addClass('movie-info');
    var movieTrailer = $('<div>/<div)').addClass('movie-trailer');
    var plot = $('<li></li>').text(movie.Plot);
    var movieContent = $('<div></div>').addClass('movie-content');
    var rating = movie.Ratings.find(r => r.Source == "Rotten Tomatoes");
    var rottenTomatoes = $('<li></li>').text('Rotten Tomatoes: ' + rating.Value);
    var logoListContainer = $('<ul></ul>').addClass('logo-list-container');

    $('.modal-content').append(movieContent);
    $('.movie-content').append(movieInfo,movieTrailer);
    $('.movie-info').append(header,movieInfoWrapper, logoListContainer);
    $('.movie-trailer').append(trailer);
    $('.movie-info-wrapper').append(rottenTomatoes);
    $('.movie-info-wrapper').append(plot);

    streamingLogos.forEach((logo) => {
        console.log(logo.img);
        var logoList = $("<li></li>");
        var logoImg = $('<img />',
                            {
                            src: logo.img,
                            height: logo.height 
                            });
        logoListContainer.append(logoList);
        logoList.append(logoImg);
    });
}

async function getSearchResults(result){
    
    searchMovieTitles = await fetchMovies(result);
    searchMovieTitles.Search.forEach(async(movie) => {
    getEachMovie(movie.imdbID);
    });
}

async function getGenreResults(results){
    var genreId = "";
    results.forEach(async (result) => {
        genreId += (Object.keys(genres,result)
            .find(key => genres[key] === result)).toString() + ",";
        })
        var movieGenreResults = await fetchMoviesGenre(genreId);
        console.log(movieGenreResults);
        movieGenreResults.result.forEach(async(movie) => {
            getEachMovie(movie.imdbId);
            });
    }


async function getEachMovie(imdbID){
        var movieResult = await fetchMoviesId(imdbID);
        storedMovies[imdbID] = movieResult;
        addMovieCard(movieResult);
        //localStorage.setItem("movies", JSON.stringify(storedMovies));
}

async function init(){
    addGeneres();
    //await getGenreResults(["Horror", "Comedy", "Action"]);
}

init();