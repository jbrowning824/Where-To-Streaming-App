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

var cardContainer = $('.card-container');

for(var i = 0; i < cards; i++){
    var col = $("<div></div>").addClass("col s6 m4 l3 col-container");
    var newCard = $("<div></div>").addClass("card");
    var cardImg = $("<div></div>").addClass("card-image");
    var title = $("<span></span>").addClass("card-title").text("Batman");
    var addSaveButton = $("<a></a>").addClass("btn-floating btn-small halfway-fab waves-effect waves-light red");
    var icon = $("<i></i>").addClass("material-icons").text("favorite_border");
    var cardContent = $("<div></div>").addClass("card-content");
    var logoListContainer = $("<ul></ul>").addClass("logos");
    var movieInfo = $("<ul></ul>").addClass("movie-quick-info");
    var infoTitle = $("<li></li>").text("Title: Batman");
    var infoRating = $("<li></li>").text("Rating: PG-13");
    var infoRuntime = $("<li></li>").text("Runtime: 126 min");
    var cardFooter = $("<div></div").addClass("card-action");
    var openModel = $("<a></a>", {href: "#"}).text("More Info");

    cardContainer.append(col);
    col.append(newCard);
    newCard.append(cardImg, cardContent, cardFooter);
    cardImg.append(title, addSaveButton);
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