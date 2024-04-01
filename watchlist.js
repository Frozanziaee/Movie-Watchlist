const film = document.getElementById("film")

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

let array = []
array.length

myWatchlist(watchlist)

function myWatchlist (movies) {
    if (movies.length){
        film.innerHTML = ``
        movies.forEach(movie => {
            film.innerHTML += `
            <div class="movie">
                <img class="film-img" src="${movie.Poster}" />
                <div class="description">
                    <div class="film-title">
                        <h3>${movie.Title}</h3>
                        <p class="vots">⭐${movie.imdbRating}</p>
                    </div>
                    <div class="film-info">
                        <p>${movie.Runtime}</p>
                        <p> ${movie.Genre}</p>
                        <butoon class="add remove-btn" data-movie="${JSON.stringify(movie.imdbID)}">
                            <i class="fa-solid fa-circle-minus"></i>
                            Remove
                        </button>    
                    </div>
                    <p class="film-para">${movie.Plot}</p> 
                </div>
            </div>
            <hr />
            `  
        })
    }
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const imdbID = e.target.dataset.movie
        
        watchlist = watchlist.filter(movie => {
            return movie.imdbID != imdbID
        })
        
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        
        myWatchlist(watchlist)
    }
})