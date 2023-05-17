// II. After we've registered on moviedb.org, we're starting with a couple of variables:

// II.01. First we'll save the API's url: (NOTE: We're going to sort it by popularity, and we're adding our API key, and page1 gives us the first 30 results)
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7fbe6a2d72e08fc82a1a6f547ca2ed64&page1';   
// II.02. Then we create a variable for the img path: (NOTE: We add an API url here too)
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
// II.03. We create a variable for the search url: 
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=7fbe6a2d72e08fc82a1a6f547ca2ed64&query=';
// II.09. We're saving the search form: (NOTE: We're looking for the form id here )
const form = document.getElementById('form');
// II.12. We're saving our search input:
const search = document.getElementById('search');
// III.03. We have to save main to a variable:
const main = document.getElementById('main'); 

// II.04. We're creating an async function: (NOTE: We'll return a promise)
// NOTE: It's going to take a url
const getMovies = async (url) => {
    // II.05. We're adding a response: (NOTE: fetch() returns a promise, and we pass in our url)
    const res = await fetch(url);
    // II.06. We want to create another variable for data: (NOTE: We're parsing the res, with json())
    // NOTE: This will give us the actual data
    const data = await res.json();
    // Testing: (NOTE: We have to add .results => Since it's from the results array)
    // console.log(data.results );
    // III.01. Instead of printing the results, we're creating a function that'll use here:
    showMovies(data.results);
}

// III.09. We're adding a utility function: (NOTE: We're passing in the vote (avarage))
// AFTER: We can call this function for the span class below (III.10.)
const getClassByRate = (vote) => {
    // III.09. Inside we're adding a boolean:
    if (vote >= 8) {
        return 'green'; 
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red'; 
    }
}

// III.02. Creating showMovies() function: (NOTE: It's going to take the data, but we'll call them movies)
const showMovies = async (movies) => {
    // III.03. First we'll clear the main: (NOTE: Listing only the movies that has the searcTerm in title)
    // NOTE: We'll set the innerHTML in main tag for nothing.  
    main.innerHTML = '';
    // III.04. After we've cleaned it, we're looping them over:
    movies.forEach(movie => {
        // NOTE: We're destcructuring here => We can pull values out of the movies object (We'll need title, img path, vote,overview)
        const { title, poster_path, vote_average, overview } = movie;
        // III.05. After we create element for the new movies:
        const movieEl = document.createElement('div');
        // III.06. Then we take that movie element and add a class to that: (NOTE: movie class, our initial div)
        movieEl.classList.add('movie');
        // III.07. Then we set the innerHTML for the movie element: (NOTE: We copy the .movie div from html)
        // EXTRA-NOTE: Remove the img src we've used, and we add the poster_path dynamically (which'll give us the picture)
        // => We also have to add the IMG_PATH (anyway we'll just get the name of the img), so we have to add on to IMG_PATH
        // ==> We'll add dynamicaly also the title, vote_avarage, and overview
        // AFTER: We can comment out the divs in the main tag (III.08.)
        // III.10. We're passing in the getClassByRate function: (NOTE: And passing in the vote_avarage)
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="">
            <div class="movie-info">
                <h3>${title}</h3> 
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}    
            </div>
        `;
        // III.11. After we'll take the main element, and call appendChild(), and we want to append the movie element:
        // NOTE: Now, if we save this we should see our movies.
        main.appendChild(movieEl);
    });
}

// II.07. We're calling our getMovies function here: (NOTE: And pass in the API_URL from above)
// NOTE: Run the function after we've defined it (anyway it won't run!) => Now we should have access for all the data in the console 
getMovies(API_URL);

// II.08. We add an eventlistener on the search form: (NOTE: We have to add it to the variables above)
// NOTE: We have to pass in our event object (e)
form.addEventListener('submit', (e) => {
    // II.10. Here first we have to add preventDefault() => So it won't submit to the page!
    e.preventDefault(); 
    // II.11. We create a variable searchTerm, and set it to search (the input ): (NOTE: We have to add above our search input as well)
    // NOTE: We'll need the value from the search input!
    const searchTerm = search.value;
    // II.13. We're creating a boolean:
    // NOTE: We're going to check if the searchTerm exist, and also if the searchTerm is not equal to anything ""
    if(searchTerm && searchTerm !== '') {
        // II.14. If that's the case we'll call the getMovies function:
        // NOTE: Here is where we're going to pass in our SEARCH_URL, and add on whatever our searchTerm is
        getMovies(SEARCH_URL + searchTerm);
        // NOTE: We make the searc.value to be equal to nothing
        search.value = '';
    } else {
        // II.15. Else we're just going to reload the page:
        // NOTE: So now when we search on something it will call getMovies()
        // AFTER: We're adding more function for this in section III.
        window.location.reload(); 
    }
    // Testing: 
    // console.log(e);

})
