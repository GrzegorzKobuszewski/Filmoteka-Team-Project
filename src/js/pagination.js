//Ustawienia wstępne / deklaracje ...
import pagination from 'paginationjs';
const url = 'https://api.themoviedb.org/3/movie/popular';
const urlStart = 'https://api.themoviedb.org/3/movie/popular';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDc5M2YzM2IyY2RmNjAxMmUwZjE5MTQ2YTc1MDQxZCIsInN1YiI6IjY0YmFlZTFhNDM1MDExMDBjNzExMGNmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jo-IqaDv0MIxcDvkX6ICfBTex8-DDD-e2pyktP9k_W4',
  },
};

let moviesArray = []; // Tablica dla wszystkich filmów
let moviesPerPage = 10;
let totalResults = 1; //całkowita liczba wyników - filmów - max 10000 videos!!!
let isLoading = false;

// pobierz totale i stwórz tablicę pustych obiektów
function getStartMovies() {
  fetch(urlStart, options)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      totalResults = json.total_results;
      // ograniczenie API do 10000 !!! - Zobacz dokumentację API
      if (totalResults > 10000) {
        totalResults = 10000;
      }
      for (let i = 1; i <= totalResults; i++) {
        moviesArray.push(i);
      }

      for (let i = 1; i <= 20; i++) {
        moviesArray[i - 1] = {
          title: json.results[i - 1].title,
          poster: 'https://image.tmdb.org/t/p/w300' + json.results[i - 1].poster_path,
          genre: json.results[i - 1].genre_ids,
          release: json.results[i - 1].release_date,
          vote: json.results[i - 1].vote_average,
        };
      }

      paginationInit();
    })
    .catch(err => console.error('error:' + err));
}

function getMovies(page) {
  if (page < 1) {
    page = 1;
  }
  if (page > 500) {
    page = 500;
  }

  isLoading = true;

  fetch(`${url}?page=${page}`, options)
    .then(res => {
      console.log(`Jest FETCH page ${page}`);
      return res.json();
    })
    .then(json => {
      console.log(`Jest then po Fetch, page: ${page}`);

      for (let i = 1; i <= json.results.length; i++) {
        console.log(20 * (page - 1) + i - 1);
        console.log(json.results[i - 1]);
        moviesArray[20 * (page - 1) + i - 1] = {
          title: json.results[i - 1].title,
          poster: 'https://image.tmdb.org/t/p/w300' + json.results[i - 1].poster_path,
          genre: json.results[i - 1].genre_ids,
          release: json.results[i - 1].release_date,
          vote: json.results[i - 1].vote_average,
        };
      }
      isLoading = false;
    })
    .catch(err => {
      console.error('Błąd! Error:' + err);
    });
}

//pobierz pierwsze filmy (20) przy wczytaniu strony:
getStartMovies();

function paginationInit() {
  $('#pagination-container').pagination({
    dataSource: moviesArray,
    pageSize: moviesPerPage,
    pageRange: 2,
    showPageNumbers: true,
    showNavigator: true,
    prevText: 'prev',
    nextText: 'next',
    showGoInput: true,
    className: 'paginationjs-theme-blue',
    beforePaging: function (param) {
      let page = 1;
      if ((param * moviesPerPage) % 20 === 0) {
        page = Math.floor((param * moviesPerPage) / 20);
        console.log(`page: ${page}`);
      } else {
        page = Math.floor((param * moviesPerPage) / 20) + 1;
        console.log(`page: ${page}`);
      }

      if (page > 1) {
        getMovies(page);
      }
    },
    callback: function (data, pagination) {
      console.log(data);
      setTimeout(() => {
        //wylicz który element tablicy moviesArray
        // debugger;
        const start = pagination.pageNumber * moviesPerPage - 10;
        const stop = start + moviesPerPage - 1;
        var html = template(moviesArray.slice(start, stop + 1));
        $('#data-container').html(html);
        if (isLoading === true) {
          //wydłuż oczekwanie na wyniki, jeśli się jeszcze nie wczytały
          setTimeout(() => {
            var html = template(moviesArray.slice(start, stop + 1));
            $('#data-container').html(html);
          }, 1000);
        }
      }, 400);
    },
  });
}

//rysuj filmy w HTML:
function template(data) {
  let year = 1900;
  let html = '<ul class="gallery_movies">';
  for (let i = 0; i < data.length; i++) {
    if (data[i].release != undefined) year = data[i].release.slice(0, 4); //musi być, bo slice przy undefined generuje bład;
    html += `
    <li class="movie-card">
                    <img class="movie-card__image" src="${data[i].poster}" alt="${data[i].title}" loading="lazy"/>
                    <div class="movie-card__text">
                      <h2 class="movie-card__text--title">${data[i].title}</h2>
                        <p class="movie-card__text--info">${data[i].genre} | ${year}</p>
                        <p class="movie-card__text--vote">${data[i].vote}</p>
                    </div>
</li>
`;
  }
  return html + ' </ul>';
}
