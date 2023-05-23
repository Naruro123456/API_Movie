const movieSearchBox = document.getElementById('movie-search-box'); 
const searchList = document.getElementById('search-list'); 
const resultGrid = document.getElementById('result-grid');

async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`; // URL till OMDB API för att söka efter filmer baserat på söktermen
    const res = await fetch(`${URL}`); // Gör en HTTP-förfrågan till OMDB API och väntar på svaret
    const data = await res.json(); // Konverterar svaret till JSON-format
    if(data.Response == "True") displayMovieList(data.Search); // Om sökresultatet är "True", visa filmerna i sökresultatlistan
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim(); // Hämta söktermen från sökrutan och ta bort eventuella extra blanksteg
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list'); // Ta bort CSS-klassen 'hide-search-list' för att visa sökresultatlistan
        loadMovies(searchTerm); // Ladda och visa filmer baserat på söktermen
    } else {
        searchList.classList.add('hide-search-list'); // Lägg till CSS-klassen 'hide-search-list' för att dölja sökresultatlistan
    }
}

function displayMovieList(movies){
    searchList.innerHTML = ""; // Töm sökresultatlistan
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div'); // Skapa ett nytt div-element för varje film i sökresultatet
        movieListItem.dataset.id = movies[idx].imdbID; // Spara filmens IMDB ID som en dataserie på div-elementet
        movieListItem.classList.add('search-list-item'); // Lägg till CSS-klassen 'search-list-item' på div-elementet
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";
        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}"> // Skapa HTML-sträng för div-elementet med filmens bild, titel och år
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem); // Lägg till div-elementet i sökresultatlistan
    }
    loadMovieDetails(); // Ladda filmens detaljer när användaren klickar på en film
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item'); // Hämta alla div-element som representerar filmer i sökresultatlistan
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list'); // Dölj sökresultatlistan
            movieSearchBox.value = ""; // Töm sökrutan
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`); // Hämta detaljerad information om filmen baserat på dess IMDB ID

            const movieDetails = await result.json(); // Konvertera svaret till JSON-format
            displayMovieDetails(movieDetails); // Visa detaljerad information om filmen
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster"> 
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
    </div>
    `;
}

window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list'); // Dölj sökresultatlistan när användaren klickar utanför sökrutan
    }
});


$(document).ready(function() {
    $(window).on('scroll', function() { // När användaren scrollar på sidan
        if($(window).scrollTop() < 1000) { // Om scrollpositionen är mindre än 1000
            $('.hero').css('background-size', 130 + parseInt($(window).scrollTop() / 5) + '%');// Justera bakgrundsbildens storlek för hjälten baserat på scrollpositionen
            $('.hero h1').css('top', 50 + ($(window).scrollTop() * .1) + '%');// Justera toppositionen för rubriken för hjälten baserat på scrollpositionen
            $('.hero h1').css('opacity', 1 - ($(window).scrollTop() * .003));// Justera opaciteten för rubriken för hjälten baserat på scrollpositionen
        }

        if($(window).scrollTop() >= $('.content-wrapper').offset().top - 300) {  // Om scrollpositionen är större eller lika med toppositionen för '.content-wrapper' minus 300
            $('.nav-bg').removeClass('bg-hidden');// Ta bort CSS-klassen 'bg-hidden' från '.nav-bg'
            $('.nav-bg').addClass('bg-visible'); // Lägg till CSS-klassen 'bg-visible' till '.nav-bg'

        } else {
            // Om scrollpositionen är mindre än toppositionen för '.content-wrapper' minus 300
            $('.nav-bg').removeClass('bg-visible');// Ta bort CSS-klassen 'bg-visible' från '.nav-bg'
            $('.nav-bg').addClass('bg-hidden'); // Lägg till CSS-klassen 'bg-hidden' till '.nav-bg'
        }
    });
});
