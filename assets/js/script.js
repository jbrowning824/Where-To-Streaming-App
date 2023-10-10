var streamingLogos = [{
    platform: "prime",
    img: "./assets/images/amazonprime.svg",
    height: "25px"
},
{
    platform: "apple",
    img: "./assets/images/appletv.svg",
    height: "25px"
},
{
    platform: "curiosity",
    img: "./assets/images/curiositystream.svg",
    height: "25px"
},
{
    platform: "disney",
    img: "./assets/images/disney+.svg",
    height: "30px"
},
{
    platform: "hbo",
    img: "./assets/images/hbo.svg",
    height: "20px"
},
{
    platform: "hulu",
    img: "./assets/images/hulu.svg",
    height: "20px"
},
{
    platform: "netflix",
    img: "./assets/images/netflix.svg",
    height: "20px"
},
{
    platform: "peacock",
    img: "./assets/images/peacock.svg",
    height: "25px"
},
{
    platform: "showtime",
    img: "./assets/images/showtime.svg",
    height: "25px"
},
{
    platform: "starz",
    img: "./assets/images/starz.svg",
    height: "21px"
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
var showing = $('.now-showing');
var isShowingSaved = false;
var services = ['netflix', 'prime.subscription','hbo,hulu.addon.hbo,prime.addon.hbomaxus',
'prime.rent,prime.buy,apple.rent,apple.buy','hulu.subscription,hulu.addon.hbo',
'apple.addon', 'peacock.free'];

const storedMovies = {};


var showingWrapper = $('.now-showing-wrapper');
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
    $('.btn-saved-movies').click(() =>{
        var savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
            if(savedMovies.length > 0)
            {
                showing.text('Saved Movies');
                savedMovies.forEach((movie) =>
                storedMovies[movie.imdbID] = movie);
                loadMovies();
            }
            else{
                showing.text('No Saved Movies');
            }
        }
    )
    $('#genre-select-container').change(function(event) {
        isShowingSaved = false;
        cardContainer.empty();
        var result = [$(this).find(":selected").val()];  
        console.log(result);
        if(result != "saved-movies"){      
            getGenreResults(result)
        }
        else {
            var savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
            if(savedMovies.length > 0)
            {
                showing.text('Saved Movies');
                savedMovies.forEach((movie) =>
                storedMovies[movie.imdbID] = movie);
                loadMovies();
            }
            else{
                showing.text('No Saved Movies');
            }
        }
    })
    $("form").submit(function(){
        event.preventDefault();
        isShowingSaved = false;
        var result = $('#search').val()
        showing.text(result);
        cardContainer.empty();
        $('#search').val('');
        getSearchResults(result);
    });

    $('.clear-input').click(() => {
        $('#search').val('');
    });

    $('#genres').click((event) => {
        cardContainer.empty();
        isShowingSaved = false;
        var result = [$(event.target).text()];
        console.log(result);
        getGenreResults(result)

  });
});

function isMovieSaved(movie){
    var savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    if (savedMovies.some(m => m.imdbID === movie.imdbID)) {
        return true;
    }
    return false;
}

async function saveMovie(movie, event) {
    var savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    if (!isMovieSaved(movie)) {
        savedMovies.push(movie);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        event.target.innerText ='favorite';
    }
    else{
        var index = Object.values(savedMovies).indexOf(savedMovies.find(m => m.imdbID === movie.imdbID));
        savedMovies.splice(index, 1);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        event.target.innerText = "favorite_border";
        if(isShowingSaved && savedMovies.length > 0){
            
            loadMovies();
        }
        else if(isShowingSaved && savedMovies.length === 0){
            cardContainer.empty();
            await getGenreResults(["Horror", "Comedy", "Action"]);
        }
    }
}

function loadMovies() {
    var savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    cardContainer.empty();
    isShowingSaved = true;
    for (var movie of savedMovies) {  
        addMovieCard(movie);
    }
}

function addMovieCard(movie) {
    if(movie.Title != undefined){
        var col = $("<div></div>").addClass("col s6 m4 l3 col-container");
        var newCard = $("<div></div>").addClass("card #616161 grey darken-2");
        var cardImg = $("<div></div>").addClass("card-image").css("background-image", `url(${movie.Poster})`);
        var addSaveButton = $("<a></a>").addClass("btn-floating btn-small halfway-fab waves-effect waves-light red");
        addSaveButton.click((event) => {
            saveMovie(movie, event);
        })
        
        if(isMovieSaved(movie)){
            var icon = $("<i></i>").addClass("material-icons").text("favorite");
        }
        else{
            var icon = $("<i></i>").addClass("material-icons").text("favorite_border");
        }
        var cardContent = $("<div></div>").addClass("card-content");
        var logoListContainer = $("<ul></ul>").addClass("logos");
        var movieInfo = $("<ul></ul>").addClass("movie-quick-info");
        var infoTitle = $("<li></li>").addClass("movie-title").text(`${movie.Title}`);
        var infoRating = $("<li></li>").text(`Rating: ${movie.Rated}`);
        var infoRuntime = $("<li></li>").text(`Runtime: ${movie.Runtime}`);
        var cardFooter = $("<div>").addClass("card-action");
        var openModel = $("<a>", {href: "#more-info",id: movie.imdbID}).addClass("open-modal").text("More Info");
        
        
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

async function fetchMovies(searchResult) {
    const response = await fetch("https://www.omdbapi.com/?s="+ searchResult + "&apikey=5b9195cb", httpOptions);
    return await response.json();
}

async function fetchMoviesId(id) {
    const response = await fetch("https://www.omdbapi.com/?i="+ id +"&apikey=5b9195cb", httpOptions);
    return await response.json();
}

async function fetchMoviesGenre(genreId) {
    httpOptionsRapidApi = {
        headers: {
            'X-RapidAPI-Key': '1de57e26a3mshbc15d44f8417944p1c87fdjsn674c6b674140',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    }
    const response = await fetch("https://streaming-availability.p.rapidapi.com/search/filters?services="+ 
        services.toString() +"&country=us&year_min=2021&output_language=en&genres=" + genreId 
        +"&genres_relation=and&show_type=movie", httpOptionsRapidApi);
    return await response.json();
}

async function fetchMoviesStreaming(id) {
    httpOptionsRapidApi = {
        headers: {
            'X-RapidAPI-Key': '1de57e26a3mshbc15d44f8417944p1c87fdjsn674c6b674140',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    }
    const response = await fetch("https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id="+ id, httpOptionsRapidApi);
    if(await response.status === 200)
    {
        return await response.json();
    }
    else{
        return null;
    }
}
function addGeneres(){
    for(const [key, value] of Object.entries(genres)){
        var genreListItem = $('<li></li>').text(value);
        var genreOption = $('<option>').attr('value', value).text(value);
        $('#genres').append(genreListItem);
        $('#genre-select').append(genreOption);
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
    var platforms = [];
    var logoList;
    var trailer;
    var movieInfoWrapper = $('<ul></ul>').addClass('movie-info-wrapper');
    var streaming = await fetchMoviesStreaming(event.id);
    var streamingInfo = streaming.result.streamingInfo;
    var parsedStreamingInfo = [{platform: "", link: ""}];
console.log(streaming);
    if(streaming != null && streaming.result.streamingInfo.hasOwnProperty('us')){
        
        console.log(platforms);
        streamingInfo.us.forEach((stream) => {
            parsedStreamingInfo.push({platform: stream.service, link: stream.link}); 
        });
    }
    else {
        var logoList = $("<li></li>").text('Not currently streaming...');
    }
    var trailerResponse = await getTrailer(event.id);
    if(trailerResponse.status != 'error'){
        if(trailerResponse.trailer != null){
            var youtube_id = trailerResponse.trailer.youtube_video_id;
            trailer = $('<iframe src="https://www.youtube.com/embed/'+ youtube_id +'?&autoplay=1&mute=1"frameborder=0 allowfullscreen></iframe>');
        }
        else if(trailerResponse.trailer == null){
            trailer = $('<img />',
                { src: movie.Poster});
            
         }
    }
    else if(trailerResponse.status == 'error'){
        trailer = $('<img />',
            { src: movie.Poster});
        
     }
    
    
    var header = $('<h4></h4>').addClass('modal-header').text(movie.Title);
    var logoHeader = $('<h5></h5>').text('Now Streaming On:')
    var movieInfo = $('<div>/<div)').addClass('movie-info');
    var movieTrailer = $('<div>/<div)').addClass('movie-trailer');
    var movieTrailerWrapper = $('<div></div>').addClass('trailer-wrapper');
    var plot = $('<li></li>').text(movie.Plot);
    var movieContent = $('<div></div>').addClass('movie-content');
    var logoListWrapper = $('<div></div>').addClass('logo-wrapper');
    var logoListContainer = $('<ul></ul>').addClass('logo-list-container');

    $('.modal-content').append(movieContent, movieTrailerWrapper);
    $('.movie-content').append(movieInfo);
    $('.movie-info').append(header,movieInfoWrapper, logoListWrapper);
    $('.trailer-wrapper').append(movieTrailer);
    $('.movie-trailer').append(trailer);
    
  
    
    if(movie.Ratings != null){
        if(movie.Ratings.some(r => r.Source == "Rotten Tomatoes"))
        {
            var rating = movie.Ratings.find(r => r.Source == "Rotten Tomatoes");
            var rottenTomatoes = $('<li></li>').text('Rotten Tomatoes: ' + rating.Value);
            movieInfoWrapper.append(rottenTomatoes);
         }
    }
    $('.movie-info-wrapper').append(plot);

    platforms = Array.from(new Set(parsedStreamingInfo.map((p) => p.platform)));
    
    var index = platforms.indexOf('');
    platforms.splice(index, 1);
    
    platforms.forEach((stream) => {
        console.log(stream);
        
        var logo = streamingLogos.find(s => s.platform === stream);
        var logoService = parsedStreamingInfo.find(p => p.platform === stream)
        console.log(logo);
        var logoList = $("<li></li>");
        var logoWatch = $('<a>',{
            href: "#"
        })
       
        var logoImg = $('<img />',
                            {
                                src: logo.img,
                                height: logo.height 
                            });
        logoWatch.append(logoImg)
        logoList.append(logoWatch);
        logoWatch.click((event) => {
            console.log('clicked')
            
            window.open(logoService.link, '_blank')
        });
        logoListContainer.append(logoList);
        
        
    });
    
    logoListWrapper.append(logoHeader, logoListContainer);
    logoListContainer.append(logoList);
}

async function getSearchResults(result){
    
    searchMovieTitles = await fetchMovies(result);
    searchMovieTitles.Search.forEach(async(movie) => {
    getEachMovie(movie.imdbID);
    });
}

async function getGenreResults(results){
    var genreId = "";
    var genreName = [];
    results.forEach(async (result) => {
        genreId += (Object.keys(genres,result)
            .find(key => genres[key] === result)).toString() + ",";
            genreName.push(result);
        })
        
        showing.empty();
        showing.text(genreName.splice(','))
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
}

async function init(){
    addGeneres();
    var savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    if(savedMovies.length > 0)
    {
        showing.text('Saved Movies');
        savedMovies.forEach((movie) =>
        storedMovies[movie.imdbID] = movie);
        loadMovies();
    }
    else{
        
        await getGenreResults(["Horror", "Comedy", "Action"]);
    }
}

init();