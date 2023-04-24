export default function galleryMarkup(galleryItems) {
  return galleryItems.reduce((acc, { largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
    acc + `
      <a class="link" href="${largeImageURL}">
        <div class="photo-card">
          <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>${likes}
            </p>
            <p class="info-item">
              <b>Views</b>${views}
            </p>
            <p class="info-item">
              <b>Comments</b>${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>${downloads}
            </p>
          </div>
        </div>
      </a>
    `, '');
}