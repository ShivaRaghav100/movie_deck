
const api_key = 'f531333d637d0c44abc85b3e74db2186'
const api =`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`

const movieListningTag = document.querySelector('.movieList');
console.log(movieListningTag);

function updateMOviePage(movieArray){
    const updateMovielist = document.createDocumentFragment();
    for(let{title,vote_count,vote_average,poster_path} of movieArray){
        const movieCard = `<div class="card">
                                <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="asdfghjkl">
                                <div>
                                    <div class="movieDetales">
                                        <h5>${title}</h5>
                                        <div>
                                            <span>${vote_count}</span>
                                            <span>${vote_average}</span>
                                        </div>
                                    </div>
                                    <span>icon</span>
                                </div>
                            </div>`
        updateMovielist.append(movieCard);
    }
    movieListningTag.append(updateMovielist);
}

async function getPaginationMovieDate(page=1){
    const responce = await fetch(`${api} & page= ${page}`);
    const movieData = await responce.json();
    console.log(movieData);
    updateMOviePage(movieData.results);
}
getPaginationMovieDate(1);


























