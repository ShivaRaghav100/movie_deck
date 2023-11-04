
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


const searchInput = document.getElementById('searchInput')
const searchButton = document.getElementById('searchButton')

searchButton.addEventListener("click", function (){
    const movieListCard = document.getElementById('movieListCard');
    const searchData = searchInput.value;
    movieListCard.innerHTML='';

    // if (data.Search) {
    //     data.Search.forEach(movie => {
    //         const li = document.createElement("li");
    //         li.textContent = `${movie.Title} (${movie.Year})`;
    //         movieList.appendChild(li);
    //     });
})
const favbtn = document.getElementById('favorites');
favbtn.addEventListener("click", ()=> {
    const favMovieSection = querySelector('.favMovieSection');
    const div = document.createElement('div')
    const  movieArray = localStorage.getItem()
    
    for(let{title,vote_count,vote_average,poster_path,isFavourite,id} of movieArray){
        // Assuming you have variables like poster_path, title, isFavourite, id, vote_count, and vote_average defined

        const div = document.createElement('div');
        div.classList.add('card');

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/original/${poster_path}`;
        img.alt = 'asdfghjkl';

        const detailDiv = document.createElement('div');
        detailDiv.classList.add('detail');

        const movieDetailsDiv = document.createElement('div');
        movieDetailsDiv.classList.add('movieDetails');

        const titleSpan = document.createElement('span');
        titleSpan.textContent = title;

        const heartIcon = document.createElement('i');
        heartIcon.classList.add('fa-heart', isFavourite ? 'fa-solid' : 'fa-regular');
        heartIcon.id = id;
        heartIcon.setAttribute('data-is-favourite', isFavourite);

        const voteRateDiv = document.createElement('div');
        voteRateDiv.classList.add('voterate');

        const voteCountSpan = document.createElement('span');
        voteCountSpan.textContent = `Vote: ${vote_count}`;

        const ratingSpan = document.createElement('span');
        ratingSpan.textContent = `Rating: ${vote_average}`;

        // Now, let's append the elements to construct the structure
        movieDetailsDiv.appendChild(titleSpan);
        movieDetailsDiv.appendChild(heartIcon);

        voteRateDiv.appendChild(voteCountSpan);
        voteRateDiv.appendChild(ratingSpan);

        detailDiv.appendChild(movieDetailsDiv);
        detailDiv.appendChild(voteRateDiv);

        div.appendChild(img);
        div.appendChild(detailDiv);

        // Now you can append the 'div' to your desired location in the document.
        // For example, if you want to add it to the body:
        favMovieSection.appendChild(div)

    }
    
})
    
        

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
    for(let{title,vote_count,vote_average,poster_path,isFavourite,id} of movieArray){
        const div = document.createElement('div')
        div.innerHTML = `<div class="card">
                                <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="asdfghjkl">
                                <div class="detail">
                                    <div class="movieDetales">
                                        <span>${title}</span>
                                        <i class="fa-heart ${isFavourite ? 'fa-solid':'fa-regular'}" id="${id}" data-is-favourite="${isFavourite}"></i>
                                    </div>
                                    <div class="voterate">
                                        <span>Vote:${vote_count}</span>
                                        <span>Rating:${vote_average}</span>
                                    </div>
                                </div>
                            </div>`
        // updateMovielist.appendChild(div);
        movieListCard.appendChild(div)
    }
    // movieListningTag.append(updateMvielist);
    const favIFrameTags = document.querySelectorAll('.fa-heart')
    for(let favIco of favIFrameTags){
        favIco.addEventListener('click',addToFavListHandler)
    }
}

function addToFavListHandler(e){
    let isremove = false
    if(e.target.dataset.isFavourite == 'true'){
        e.target.classList.remove('fa-solid')
        e.target.classList.add('fa-regular')
        e.target.dataset.isFavourite = false
        isremove = true;
    }
    else{
        e.target.classList.remove('fa-regular')
        e.target.classList.add('fa-solid')
        e.target.dataset.isFavourite = true
    }
    // console.log(e.target.id)
    
    const fillterArr = currentmovieData.filter((val, index)=>{
        return val.id == e.target.id
    })

    const localMovieStorage = JSON.parse(localStorage.getItem('favMovieList'))

    if(!isremove){
        let newFavObj ;
        if (localMovieStorage){
            newFavObj = {
                [fillterArr[0].id]: fillterArr[0],
                ...localMovieStorage
            }
        }
        else {
            newFavObj={
                [fillterArr[0].id]:fillterArr[0]
            }
        }
        localStorage.setItem('favMovieList', JSON.stringify(newFavObj));
    }
    else{
        if(localMovieStorage){
            delete localMovieStorage[fillterArr[0].id]
        }
        localStorage.setItem('favMovieList', JSON.stringify(localMovieStorage));
    }
    
}




async function getPaginationMovieDate(page){
    resetPagehandler()
    movieListningTag.innerHTML = ""
    const responce = await fetch(`${api}${page}`);
    const movieData = await responce.json();
    currentmovieData = movieData.results;
    // console.log(movieData);
    updateMOviePage(movieData.results);

    // const all = document.getElementById('all')
    // all.addEventListener('click', updateMOviePage(movieData.results))
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


























