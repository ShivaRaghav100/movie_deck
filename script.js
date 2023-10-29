
const api_key = 'f531333d637d0c44abc85b3e74db2186'
const api =`https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=`
let currentpage =1;
const prv = document.getElementById('prvBtn')
const next = document.getElementById('nextBtn')
const sortByDate =  document.getElementById('sortBydate');
const sortByRate = document.getElementById('sortByRate');
let currentmovieData =''
let sortByDateMovieData =''
let sortByRateMovieData = ''
let isSortByDate = false;
let isSortbyRate = false;

sortByRate.addEventListener('click', ()=>{
    if(isSortbyRate){
        isSortByDate = false;
        isSortbyRate = false;
        updateMOviePage(currentmovieData)
        return;
    }
    isSortByDate = false;
    isSortbyRate = true;
    if(!sortByRateMovieData){
        sortByRateMovieData= SortMovieHandler([...currentmovieData], 'rating')
    }
    updateMOviePage(sortByRateMovieData)
})
sortByDate.addEventListener('click',()=>{
    if(isSortByDate){
        isSortByDate = false;
        isSortbyRate = false;
        updateMOviePage(currentmovieData)
        return;
    }
    isSortByDate = true;
    isSortbyRate = false;
    if(!sortByDateMovieData){
        sortByDateMovieData=SortMovieHandler([...currentmovieData], 'date')
    }
    updateMOviePage(sortByDateMovieData)
})


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

    while (movieListCard.firstChild) {
        movieListCard.firstChild.remove();
    }
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
    // movieListningTag.append(updateMvielist);
}
    
async function getPaginationMovieDate(page){
    resetPagehandler()
    movieListningTag.innerHTML = ""
    const responce = await fetch(`${api}${page}`);
    const movieData = await responce.json();
    currentmovieData = movieData.results;
    // console.log(movieData);
    updateMOviePage(movieData.results);
}
function resetPagehandler(){
    sortByDateMovieData =''
    sortByRateMovieData = ''
    isSortByDate = false;
    isSortbyRate = false;
}

function  SortMovieHandler(MovieArr, sortBy){
    console.log({MovieArr});
    let sortingKey =''
    
    if(sortBy==='date'){
        sortingKey = 'release_date'
        MovieArr.sort((movObjA,movObjB) =>{
            movObjA.epochTime = new Date(movObjA[sortingKey])
            movObjB.epochTime = new Date(movObjB[sortingKey])
            return movObjA.epochTime - movObjB.epochTime
        })
        return MovieArr;
    }

    else if(sortBy==='rating'){
        sortingKey = 'vote_average'
    }
    MovieArr.sort((movObjA,movObjB) =>{
        return movObjA[sortingKey] - movObjB[sortingKey]
    })
    console.log({MovieArr});
    return MovieArr;
}

getPaginationMovieDate(currentpage);


























