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
                                <div class="add">
                                    <i class="fa-solid fa-circle-plus"></i>
                                    <p>Watchlist</p>
                                </div>    
                            </div>
                            <p class="film-para">${dataMovie.Plot}</p>
                            
                        </div>
                        
                        </div>
                        <hr />
                        `
                    })
            });
       
        })
}


