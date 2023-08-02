//Ustawienia wstępne / deklaracje ...
import pagination from 'paginationjs';
import Notiflix from 'notiflix';
import { fetchMovieById } from './api.js';
import { openModal } from './modal';
import { watchedVideosArray } from './watchedFilms.js';
import { inQueueArray } from './filmsInQueue.js';
export let html = '';
const urlSearch = 'https://api.themoviedb.org/3/search/movie';
const urlStart = 'https://api.themoviedb.org/3/movie/popular';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDc5M2YzM2IyY2RmNjAxMmUwZjE5MTQ2YTc1MDQxZCIsInN1YiI6IjY0YmFlZTFhNDM1MDExMDBjNzExMGNmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jo-IqaDv0MIxcDvkX6ICfBTex8-DDD-e2pyktP9k_W4',
  },
};
const paginElement = document.getElementById('pagination-container');
export let moviesArray = []; // Tablica dla wszystkich filmów
export let watchedArray = []; // tablica filmów do zobaczenia
export let myVideosArray = []; // tablica filmów ulubionych
let moviesPerPage = 10;
let totalResults = 1; //całkowita liczba wyników - filmów - max 10000 videos!!!
let isLoading = false;
let textToSearch = '';
let urlNoCover = new URL('../images/nocover.jpg', import.meta.url);
let loadingFirstPage = true;

///zapisz typeOfAPI do locale localStorage

let typeOfAPI;
// debugger;
typeOfAPI = localStorage.getItem('typeOfAPI');
if (typeOfAPI === null) {
  localStorage.setItem('typeOfAPI', 'start');
  typeOfAPI = 'start';
} // start, search, watched, queue}

//pobierz nazwy gatunków - tylko przy wczytywaniu strony:
const genresArray = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

// pobierz totale i stwórz tablicę pustych obiektów przy starcie strony
export function getStartMovies() {
  //sprawdź w locale storage wartość typeOfAPI
  typeOfAPI = localStorage.getItem('typeOfAPI');
  if (typeOfAPI === null) {
    localStorage.setItem('typeOfAPI', 'start');
    typeOfAPI = 'start';
  } // start, search, watched, queue}

  let url = '';

  if (typeOfAPI === 'start') {
    url = urlStart;
  }
  if (typeOfAPI === 'search') {
    url = `${urlSearch}?page=1&query=${textToSearch}`;
  }
  if (typeOfAPI === 'watched') {
  }
  if (typeOfAPI === 'queue') {
  }

  //pobierz dane jeśli typeOfAPI === 'start' lub 'search' - w przeciwnym razie dane pobieraj z tablic
  // debugger;
  // Notiflix.Notify.info(`API: ${typeOfAPI}`);
  if (typeOfAPI === 'start' || typeOfAPI === 'search') {
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        totalResults = json.total_results;
        if (totalResults === 0) {
          Notiflix.Notify.failure('Unfortunately, no movies were found!');
          // //wyzeruj tablicę filmów
          moviesArray = [];
          totalResults = 0;
          // pagination.page = 1;
          // debugger;
        }
        // ograniczenie API do 10000 !!! - Zobacz dokumentację API
        if (totalResults > 10000) {
          totalResults = 10000;
        }
        for (let i = 1; i <= totalResults; i++) {
          moviesArray.push(i);
        }

        console.log(json.results);

        for (let i = 1; i <= totalResults && i <= 20; i++) {
          // Zamień gatunki ID na stringi:
          let genresNames = findNameById(json.results[i - 1].genre_ids[0], genresArray);
          genresNames += `, `;
          genresNames += findNameById(json.results[i - 1].genre_ids[1], genresArray);

          moviesArray[i - 1] = {
            id: json.results[i - 1].id,
            title: json.results[i - 1].title,
            poster: 'https://image.tmdb.org/t/p/w300' + json.results[i - 1].poster_path,
            genre: genresNames,
            release: json.results[i - 1].release_date,
            vote: json.results[i - 1].vote_average.toFixed(2),
          };
          if (json.results[i - 1].poster_path === null) {
            moviesArray[i - 1].poster = urlNoCover;
            // test
          }
        }

        paginationInit();
      })
      .catch(err => console.error('error:' + err));
  } else {
    // typeOfAPI === 'watched' lub 'queue'
    // wystarczu odświeżyć paginację - dane będą pobierane z tablicy:
    moviesArray = [];
    // debugger;
    if (typeOfAPI === 'watched') {
      moviesArray = [...watchedVideosArray];
    }
    if (typeOfAPI === 'queue') {
      moviesArray = [...inQueueArray];
    }
    if (typeOfAPI === 'library') {
      moviesArray = [];
    }

    paginationInit();
  }
}

//wyświetlanie galerii przy klikaniu w paginację i szukaniu filmów
function getMovies(page) {
  if (page < 1) {
    page = 1;
  }
  if (page > 500) {
    page = 500;
  }
  let url = '';
  if (typeOfAPI === 'start') url = `${urlStart}?page=${page}`;
  if (typeOfAPI === 'search') url = `${urlSearch}?page=${page}&query=${textToSearch}`;

  //pobieraz dane z API tylko jeśli start lub search
  if (typeOfAPI === 'start' || typeOfAPI === 'search') {
    isLoading = true;
    fetch(url, options)
      .then(res => {
        //console.log(`Jest FETCH page ${page}`);
        return res.json();
      })
      .then(json => {
        //console.log(`Jest then po Fetch, page: ${page}`);

        for (let i = 1; i <= json.results.length; i++) {
          // Zamień gatunki ID na stringi:
          let genresNames = findNameById(json.results[i - 1].genre_ids[0], genresArray);
          genresNames += `, `;
          genresNames += findNameById(json.results[i - 1].genre_ids[1], genresArray);

          moviesArray[20 * (page - 1) + i - 1] = {
            id: json.results[i - 1].id,
            title: json.results[i - 1].title,
            poster: 'https://image.tmdb.org/t/p/w300' + json.results[i - 1].poster_path,
            genre: genresNames,
            release: json.results[i - 1].release_date,
            vote: json.results[i - 1].vote_average.toFixed(2),
          };
          if (json.results[i - 1].poster_path === null) {
            moviesArray[20 * (page - 1) + i - 1].poster = urlNoCover;
          }
        }
        isLoading = false;
      })
      .catch(err => {
        console.error('Błąd! Error:' + err);
      });
  }
}
//pobierz pierwsze filmy (20) przy wczytaniu strony:
getStartMovies();

export function paginationInit() {
  $('#pagination-container').pagination({
    // Daliśmy pustą klasę stylów do każej klasy domyślnej z biblioteki paginationjs, ponieważ generowały błędy w projekcie - hipoteza częściowo potwierdzona
    // Pamiętaj, że zakomentowanie klasy sprawi, że biblioteka odniesie się do stylów domyślnych
    // http://pagination.js.org/docs/index.html#classPrefix
    // http://pagination.js.org/docs/index.html#Theme
    classPrefix: 'emptyClass.css',
    className: 'emptyClass.css',
    // activeClassName: 'emptyClass.css',
    disableClassName: 'disable',
    ulClassName: 'emptyClass.css',
    // pageClassName: 'emptyClass.css',
    // prevClassName: 'emptyClass.css',
    // nextClassName: 'emptyClass.css',
    dataSource: moviesArray,
    pageSize: moviesPerPage,
    pageRange: 1,
    hideFirstOnEllipsisShow: true,
    hideLastOnEllipsisShow: true,
    autoHideNext: true,
    autoHidePrevious: true,
    showPageNumbers: true,

    position: 'top',
    // prevText: 'prev',
    // nextText: 'next',
    showGoInput: true,
    formatGoInput:
      '<input type= "number" class= "J-paginationjs-go-pagenumber" placeholder="page" min="1" max="1000" >',
    showNavigator: true,
    // formatNavigator: '<%= rangeStart %>-<%= rangeEnd %> z <%= totalNumber %> filmów',
    formatNavigator: 'total pages: <%= totalPage %>',
    // beforeGoInputOnEnter: ,
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
      //console.log(data);
      if (pagination.pageNumber > 1) loadingFirstPage = false;
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
          }, 2000);
        }
      }, 500);
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
    <li id=${data[i].id} class="movie-card">
      <img class="movie-card__image" src="${data[i].poster}" alt="${data[i].title}" loading="lazy"/>
      <div class="movie-card__text">
        <h2 class="movie-card__text--title">${data[i].title}</h2>
          <p class="movie-card__text--info">${data[i].genre} | ${year}</p>
          <p class="movie-card__text--vote">${data[i].vote}</p>
      </div>
    </li>
`;
  }
  // przewiń do dołu strony
  if (loadingFirstPage === false) {
    setTimeout(function () {
      //debugger;
      if (paginElement) {
        // Wywołujemy metodę scrollIntoView() na elemencie
        paginElement.scrollIntoView();
      }
    }, 1000);
  }
  return html + ' </ul>';
}

//wyszukiwanie filmu po wpisanym słowie kluczowym
//nasłuchuj na kliknięcie,

const formEl = document.querySelector('.header__form');
const inputEl = document.querySelector('.header__form__input');

// sprawdź czy jesteś w /index.html - na stronie /library nie ma okienka wyszukiwania, więć bedzie błąd!!!!
// debugger;
if (typeOfAPI === 'start' || typeOfAPI === 'search') {
  formEl.addEventListener('submit', e => {
    //sprawdź, czy w polu search nie ma tylko spacji...
    // Notiflix.Notify.failure('P2lease enter a search query for the movie');

    e.preventDefault();

    // wyczyść tablicę filmów:
    moviesArray = [];
    // ustaw zmienną rodzaj API
    typeOfAPI = 'search';
    localStorage.setItem('typeOfAPI', 'search');
    // debugger;
    // ustaw zmienną do szukania po słowie
    textToSearch = inputEl.value.trim();
    // wyświetl galerię z wynikami szukania:
    getStartMovies();
  });
}

// *********************************************** KOD DLA MODALA ZE SZCZEGÓŁAMI ***********************************
//słuchanie czy klknie w film:
async function handleMovieImageClick(event) {
  let videoDetails;
  // Pobieramy element <li> zawierający kliknięty obraz
  const movieCard = event.target.closest('.movie-card');
  if (movieCard) {
    // Pobieramy numer id filmu z atrybutu id elementu <li>
    const movieId = movieCard.id;
    console.log('Numer id filmu:', movieId);
    // Notiflix.Notify.info(`Numer id filmu: ${movieId}`);

    //poczekaj aż skończy pobierać!!!
    videoDetails = await fetchMovieById(movieId);
    console.log(videoDetails);

    //poprawka dla przypadku, w którym nie istnieje w bazie gataunkek
    // debugger;
    if (videoDetails.genres.length === 0) {
      videoDetails.genres.push({ name: 'noname ;)' });
    }
    //poprawka dla przypadku, w którym nie istnieje path dla cover'about

    if (videoDetails.poster_path === null) {
      const newPosterPath = new URL('../images/nocover.jpg', import.meta.url);
      videoDetails.poster_path = newPosterPath;
    } else {
      videoDetails.poster_path = `https://image.tmdb.org/t/p/w300/${videoDetails.poster_path}`;
    }
  }
  //tworzę HTMLa
  html = '';
  html += `<div class="leftSideDetails">
    <img
      src="${videoDetails.poster_path}"
      alt="${videoDetails.title}" class="modal-image"
      loading="lazy"
    />
  </div>
  <div class="rightSideDetails">
    <h2 class="film-title">${videoDetails.title}</h2>
    <div class="film-info">
      <p>
        Vote/Votes <span class="film-rating">${videoDetails.vote_average}</span
        ><span class="slash">/</span><span class="votes">${videoDetails.vote_count}</span>
      </p>
      <p>Popularity<span class="film-popularity">${videoDetails.popularity}</span></p>
      <p>Original Title<span class="film-original-title">${videoDetails.original_title}</span></p>
      <p>Genre<span class="film-genere">${videoDetails.genres[0].name}</span></p>
    </div>
    <div class="film-description">
      <p class="about">About</p>
      <p>${videoDetails.overview}</p>
    </div>
    <div class="modalButton">
        <button class="watched-btn-modal" data-id ='${videoDetails.id} 'type="button">ADD TO WATCHED</button>
        <button class="queue-btn-modal" data-id ='${videoDetails.id} 'type="button">ADD TO QUEUE</button>
      </div>
  </div>`;

  //console.log(html);
  // setTimeout(() => {
  //   Notiflix.Notify.success(videoDetails.overview);
  // }, 2000);

  //wyświetl okno modala ze SZCZEGÓŁAMI - funkcja od KASI :)
  openModal();
}

// Pobieramy kontener galerii filmów
const galleryContainer = document.querySelector('.gallery');

// Dodajemy słuchacza zdarzeń dla całej galerii
galleryContainer.addEventListener('click', event => {
  // Sprawdzamy, czy kliknięcie było na obrazie (element o klasie "movie-card__image")
  if (event.target.classList.contains('movie-card__image')) {
    // Wywołujemy funkcję tylko wtedy, gdy kliknięcie było na obrazie
    handleMovieImageClick(event);
  }
});

function findNameById(id, data) {
  // debugger;
  for (const obj of data) {
    if (obj.id === id) {
      return obj.name;
    }
  }
  return 'other genres';
}
