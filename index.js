//Generating an API_KEY from the website
const API_KEY ='api_key=3c1911e53f9b7a8ac5b0cadbed16bcb7';

//Generating a BASE_URL for the movies in the site
const BASE_URL ='https://api.themoviedb.org/3';

//Instructs the API_URL to fetch a list of movies sorted by popularity
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY; 

//Using a variable fetch the movie poster image
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

//It defines the url for searching movies within the database
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

//Retrieves the main container element where the movie data will be displyed
const main = document.getElementById('main');

//Gets the form element used for movie searches
const form = document.getElementById('form');

//This retrives the input field for entering searched terms
const search =document.getElementById('search');

//A call back function that displays the movies sorted by popularity
displaymovies(API_URL);

//A function used to display movies from the database
function displaymovies(url){

    //Making a get request using fetch
    fetch(url)   //initiates a get request to the specific url
    .then(res => res.json())
    .then(data =>{
        console.log(data.results)
        getMovies(data.results);
      })
    }

    function getMovies(data){
        main.innerHTML = '';

        //To iterate through the array of movies and display them
        data.forEach(movie => {

            //use of object destructuring to destructure movie object properties for easy access
            const{title, poster_path, vote_average, overview} =movie;

            //Adding movie elements to the DOM
            const movieE1 = document.createElement('div');
            movieE1.classList.add('movie');
            movieE1.innerHTML =`

            <img src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getcolor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
              <h3>Overview</h3>
              ${overview}
            </div>
            `
            //Appends the created movie element to the main container in the DOM
            main.appendChild(movieE1);
        })
        }

        //This function is used to assign different colours to the movie based on their ratings
        function getcolor(vote){

            //Use of a for loop to iterate over the movie rating to assign them different colours depending on their rate
            if(vote>= 8){
                return "green"
            }else if(vote>= 5){
                return "red"
            }else{
                return "blue"
            }
        }

        // Addding an event listener to the form element   
        form.addEventListener('submit', (e) =>{

            //Prevents the default form submission behaviour to handle the search function
            e.preventDefault();
            const searchTerm = search.value;

            //Use of a conditional statement to display the search results
            if(searchTerm) {
                displaymovies(searchURL+'&query='+searchTerm)
            }else{
                displaymovies(API_URL);
            }
        })
