var cards = 14;
var streamingLogos = [{
    platform: "amazon",
    img: "./assets/images/amazonprime.svg",
    height: "15px"
},
// {
//     platform: "apple",
//     img: "./assets/images/appletv.svg",
//     height: "15px"
// },
// {
//     platform: "curiosity",
//     img: "./assets/images/curiositystream.svg",
//     height: "15px"
// },
// {
//     platform: "disney",
//     img: "./assets/images/disney+.svg",
//     height: "20px"
// },
// {
//     platform: "hbo",
//     img: "./assets/images/hbo.svg",
//     height: "10px"
// },
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
    img: "",
    value: 12
},

]

var cardContainer = $('.card-container');


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
    }]

    movies.forEach((movie) => {
        addMovieCard(movie);
    });
}



function addMovieCard(movie) {
    
        var col = $("<div></div>").addClass("col s6 m4 l3 col-container");
        var newCard = $("<div></div>").addClass("card");
        var cardImg = $("<div></div>").addClass("card-image").css("background-image", `url(${movie.poster})`);
        //removed for now due to issues with font color against movie poster
        //var title = $("<span></span>").addClass("card-title").text(movie.title);
        var addSaveButton = $("<a></a>").addClass("btn-floating btn-small halfway-fab waves-effect waves-light red");
        var icon = $("<i></i>").addClass("material-icons").text("favorite_border");
        var cardContent = $("<div></div>").addClass("card-content");
        var logoListContainer = $("<ul></ul>").addClass("logos");
        var movieInfo = $("<ul></ul>").addClass("movie-quick-info");
        var infoTitle = $("<li></li>").addClass("movie-title").text(`${movie.title}`);
        var infoRating = $("<li></li>").text(`Rating: ${movie.rated}`);
        var infoRuntime = $("<li></li>").text(`Runtime: ${movie.runtime}`);
        var cardFooter = $("<div></div").addClass("card-action");
        var openModel = $("<a></a>", {href: "#"}).text("More Info");

        cardContainer.append(col);
        col.append(newCard);
        newCard.append(cardImg, cardContent, cardFooter);
        cardImg.append(addSaveButton);
        addSaveButton.append(icon);
        cardContent.append(logoListContainer, movieInfo);
        movieInfo.append(infoTitle, infoRating, infoRuntime);
        cardFooter.append(openModel);
}

function addGeneres(){

}

function init() {
    mockAPI();
}

init();
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

