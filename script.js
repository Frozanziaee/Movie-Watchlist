const searchForm = document.getElementById('search-form')
const inputSearch = document.getElementById("input-search")
const searchBtn = document.getElementById("search-btn")
const film = document.getElementById("film")



searchForm.addEventListener("submit", (e) =>{
    e.preventDefault()

    let search = inputSearch.value
    if(search){
        findYourFilm(search)
        inputSearch.value = ""
   }
})

function findYourFilm(movieName = "Spider-Man" ){
    fetch(`http://www.omdbapi.com/?apikey=d35a8728&s=${movieName}&plot=full`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            
            film.innerHTML = ``
            data.Search.forEach(element => {
                fetch(`http://www.omdbapi.com/?apikey=d35a8728&i=${element.imdbID}`)
                    .then(response => response.json())
                    .then(movie => {
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
                                    <butoon class="add favorite-btn" data-movie=${JSON.stringify(movie.imdbID)}>
                                        <i class="fa-solid fa-circle-plus" ></i>
                                        Watchlist
                                    </button>    
                                </div>
                                <p class="film-para">${movie.Plot}</p> 
                            </div>
                        </div>
                        <hr />
                        `
                    })
            });
       
        })
}
findYourFilm()


let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];


document.addEventListener("click", (e) => {
    if(e.target.classList.contains("favorite-btn")){
        let imdbID = e.target.dataset.movie
        e.target.disabled = true

        if(watchlist.some(movie => movie.imdbID === imdbID)){
            return 
        }
    

    fetch(`http://www.omdbapi.com/?apikey=d35a8728&i=${imdbID}&plot=full`)
        .then(res => res.json())
        .then(dataMovie => {
            watchlist.push(dataMovie)
            localStorage.setItem('watchlist', JSON.stringify(watchlist))
            console.log(watchlist)
        })
    }
    
})
