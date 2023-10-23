
const api_key = 'f531333d637d0c44abc85b3e74db2186'
const api =`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=`
let currentpage =1;
const prv = document.getElementById('prvBtn')
const next = document.getElementById('nextBtn')

prv.addEventListener('click', ()=>{
    if(currentpage===1){
        return;
    }
    currentpage--
    getPaginationMovieDate(currentpage);
} )
next.addEventListener('click', ()=>{
    if(currentpage===3){
        return;
    }
    currentpage++
    getPaginationMovieDate(currentpage);
} )

const movieListningTag = document.querySelector('.movieList');
console.log(movieListningTag);

function updateMOviePage(movieArray){
    const movieListCard = document.getElementById('movieListCard');
    // const updateMovielist = document.createDocumentFragment();
    for(let{title,vote_count,vote_average,poster_path} of movieArray){
        const div = document.createElement('div')
        div.innerHTML = `<div class="card">
                                <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="asdfghjkl">
                                <div class="detail">
                                    <div class="movieDetales">
                                        <span>${title}</span>
                                        <div class="voterate">
                                            <span>${vote_count}</span>
                                            <span>${vote_average}</span>
                                        </div>
                                    </div>
                                    <span class="icon">icon</span>
                                </div>
                            </div>`
        // updateMovielist.appendChild(div);
        movieListCard.appendChild(div)
    }
    movieListningTag.append(updateMovielist);
}
async function getPaginationMovieDate(page){
    movieListningTag.innerHTML = ""
    const responce = await fetch(`${api}${page}`);
    const movieData = await responce.json();
    console.log(movieData);
    updateMOviePage(movieData.results);
}
getPaginationMovieDate(currentpage);


























