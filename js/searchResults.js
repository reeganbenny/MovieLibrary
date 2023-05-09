import MovieDetails from './movieDetails.js';
import {hide,show, showAll ,hideAll, apiKey, displayLoading, hideLoading} from './utilities.js';
import { getAllWatchList } from './watchListls.js';

const searchElement = document.getElementById('movieSearch');
const movieLibraryElement = document.getElementById('movieLibrary');
const movieHomeSearchBtn = document.getElementById('movieHomeSearchBtn');
const homeSearchElement = document.getElementById('homeSearch');
const resultMovieElement = document.getElementById('resultMovie');
const resultContainerElement = document.getElementById('resultContainer');
const movieCardElement = document.getElementById('movieCard');
const detailShowAll = document.querySelectorAll('.detailShow');
const movieBrandElement = document.getElementById('movieBrand');
const movieInputElement = document.getElementById('movieInput');
const loader = document.querySelector("#loading");
const errorElement = document.getElementById('error-message');

export default class SearchResults{
    constructor(){
        this.movieHomeSearchBtn = movieHomeSearchBtn;
        this.movieInput = '';
        this.resultMovieElement = resultMovieElement; 
        this.homeSearchElement = homeSearchElement;
        this.resultContainerElement = resultContainerElement;
        //this.movieCardElement = movieCardElement;
        this.detailShowAll = detailShowAll;
        this.movieBrandElement = movieBrandElement;
        this.movieInputElement = movieInputElement;
        this.movieLibraryElement = movieLibraryElement;
        this.movieDetails = new MovieDetails();
        this.loader = loader;
        this.errorElement = errorElement;
    }

    searchMovieEvent(){
        this.movieHomeSearchBtn.onclick = e => {
            this.movieInput = document.getElementById('movieInput').value;
            console.log("Searching results for "+this.movieInput);
            if(this.movieInput !== ""){
                hide(this.homeSearchElement);
                showAll(this.detailShowAll);
                this.moviesSetup(this.movieInput);
                this.resultMovieElement.innerText = 'Results for "'+this.movieInput+'"';

            }else{
                this.movieInputElement.focus();
                this.movieInputElement.style.border = "2px solid red";
            }
        } 
    }

    brandHomePageEvent(){
        this.movieBrandElement.onclick = e =>{
            location.reload();
        }
    }

    watchListEvent(){
        this.movieLibraryElement.onclick = e =>{
            this.resultContainerElement.innerHTML = "";
            this.resultMovieElement.innerText = 'Your movie collections';
            hide(this.homeSearchElement);
            showAll(this.detailShowAll);
            let watchLists = getAllWatchList();
            if(watchLists.length>0){
                watchLists.forEach(imdbId =>{
                    this.movieDetails.createMovieBox(imdbId);
                });
            }else{
                this.resultContainerElement.innerHTML = '<p class= "error" >Your movie library is empty</p>';
            }
        }
    }
    
    resultSearchElement(){
        let searchElement = document.getElementById('searchElement');
        let movieSearchElement = document.getElementById('movieSearch');
        searchElement.onclick = e =>{
            let movieSearchValue = movieSearchElement.value;
            console.log("Searching results for "+movieSearchValue);
            if(movieSearchValue !== ""){
                movieSearchElement.blur();
                movieSearchElement.style.border = "none";
                this.resultContainerElement.innerHTML = "";
                hide(this.homeSearchElement);
                showAll(this.detailShowAll);
                this.moviesSetup(movieSearchValue);
                this.resultMovieElement.innerText = 'Results for "'+movieSearchValue+'"';

            }else{
                movieSearchElement.focus();
                movieSearchElement.style.border = "2px solid red";
            }
        }

    }

    async moviesSetup(movieName){
        let moviesList = await this.fetchAllMovie(movieName);
        this.displayAllMovies(moviesList);
        
    }

    async fetchAllMovie(movieName){
        displayLoading(this.loader);
        return fetch('https://www.omdbapi.com/?s='+movieName+'&apikey='+apiKey)
            .then(res => res.json())
            .then(data => data)
            .catch(error => console.log(error));
    }

    

    async displayAllMovies(moviesList){
        if(moviesList.Response == 'True'){
            let searchResults = moviesList.Search;
            searchResults.forEach(async element => {
                console.log(element.imdbID);
                this.movieDetails.createMovieBox(element.imdbID);
            });

        }else{
            console.log("Error: "+moviesList.Error);
            this.resultContainerElement.innerHTML = '<p class= "error" >'+moviesList.Error+'</p>';
            hideLoading(this.loader);
        }
    }
}