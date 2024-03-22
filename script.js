const inputSearch = document.getElementById("input-search")
const searchBtn = document.getElementById("search-btn")
const film = document.getElementById("film")



searchBtn.addEventListener("submit", (e) =>{
    e.preventDefault()

    let search = inputSearch.value
    if(search){
        findYourFilm(search)
        inputSearch.value = ""
   }
})

function findYourFilm(movieName = "ninja" ){
    fetch(`http://www.omdbapi.com/?apikey=d35a8728&s=${movieName}&plot=short`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            
            film.innerHTML = ``
            data.Search.forEach(element => {
                fetch(`http://www.omdbapi.com/?apikey=d35a8728&i=${element.imdbID}`)
                    .then(response => response.json())
                    .then(dataMovie => {
                        film.innerHTML += `
                        <div class="movie">
                        <img class="film-img" src="${dataMovie.Poster}" />
                        <div class="description">
                            <div class="film-title">
                                <h3>${dataMovie.Title}</h3>
                                <p class="vots">⭐${dataMovie.imdbRating}</p>
                            </div>
                            <div class="film-info">
                                <p>${dataMovie.Runtime}</p>
                                <p> ${dataMovie.Genre}</p>
                                <p class="add">+</p>
                                <p>Watchlist</p>
                            </div>
                            <p class="film-para">${dataMovie.Plot}</p>
                        </div>
                        </div>
                        `
                    })
            });
       
        })
}

findYourFilm()
