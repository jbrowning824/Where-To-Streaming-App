document.addEventListener("DOMContentLoaded", function (){
    function searchMovieByTitle(title) {
        var apiUrl = 'https://www.omdbapi.com/?key=ec949a25'
        var ombdKey = 'ec949a25'
        var searchedmovie = apiUrl + "&t=" + title
        fetch(searchedmovie)
          .then((response) =>
          {
            if (response.ok) {
               var movies =response.json();
               console.log(movies)


            }
            else {
                // Error handling
            }
            
          })

        }
    searchMovieByTitle('')
})
  