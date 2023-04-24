import '../css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PixabayAPI from './PixabayAPI';
import galleryMarkup from './GalleryMarkup';

const searchFormRef = document.querySelector('.search-form');
const loadMoreRef = document.querySelector('.load-more');
const galleryRef = document.querySelector('.gallery');
const gallery = new SimpleLightbox('.gallery a');
const pixabayAPI = new PixabayAPI();


// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

loadMoreRef.hidden = true;

searchFormRef.addEventListener('submit', onSearch);
loadMoreRef.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  if (!searchFormRef.searchQuery.value.trim()) {
    Notify.warning('Some search query needed.');
    return;
  }

  pixabayAPI.query = searchFormRef.searchQuery.value.trim();
  pixabayAPI.resetPage();
  
  const response = await pixabayAPI.fetchHits();

  if (response.totalHits === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    loadMoreRef.hidden = true;
    galleryRef.innerHTML = '';  
    return;
  }

  checkHits(response.hits.length, response.totalHits);

  galleryRef.innerHTML = galleryMarkup(response.hits);
  gallery.refresh(); 
}

async function onLoadMore(e) {
  const response = await pixabayAPI.fetchHits();
  
  checkHits(response.hits.length, response.totalHits);

  galleryRef.insertAdjacentHTML("beforeend", galleryMarkup(response.hits));
  gallery.refresh();
}

function checkHits(hitsLength, totalHits) {
  if (hitsLength === pixabayAPI.perPage) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
    loadMoreRef.hidden = false;
  } else {
    Notify.info(`We're sorry, but you've reached the end of search results.`);
    loadMoreRef.hidden = true;
  }
}