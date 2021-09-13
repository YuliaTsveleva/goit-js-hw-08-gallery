import galleryItems from "./app.js";

const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector(".lightbox__button");
const lightboxOverlay = document.querySelector(".lightbox__overlay");

const galleryMarkup = createGalleryMarkup(galleryItems);

gallery.innerHTML = galleryMarkup;

gallery.addEventListener("click", toOpenOriginalImageInModal);
lightbox.addEventListener("click", toCloseModalWithImage);
window.addEventListener("keyup", toCloseModalByEscape);
window.addEventListener("keyup", toGoToTheNextPicture);
window.addEventListener("keyup", toGoToThePreviousPicture);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join("");
}

function toOpenOriginalImageInModal(evt) {
  evt.preventDefault();
  lightbox.classList.add("is-open");
  lightboxImage.src = evt.target.dataset.source;
  lightboxImage.alt = evt.target.alt;
}

function toCloseModalWithImage(evt) {
  if (evt.target !== closeModalBtn && evt.target !== lightboxOverlay) {
    return;
  }
  lightbox.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

function toCloseModalByEscape(key) {
  if (key.code !== "Escape") {
    return;
  }
  lightbox.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

function toGoToTheNextPicture(key) {
  if (key.code !== "ArrowRight") {
    return;
  }

  const indexOfCurrentImageInGallery = galleryItems.indexOf(
    galleryItems.find((item) => item.description === lightboxImage.alt)
  );

  if (indexOfCurrentImageInGallery !== galleryItems.length - 1) {
    lightboxImage.src = galleryItems[indexOfCurrentImageInGallery + 1].original;
    lightboxImage.alt =
      galleryItems[indexOfCurrentImageInGallery + 1].description;
  } else {
    lightboxImage.src = galleryItems[0].original;
    lightboxImage.alt = galleryItems[0].description;
  }
}

function toGoToThePreviousPicture(key) {
  if (key.code !== "ArrowLeft") {
    return;
  }

  const indexOfCurrentImageInGallery = galleryItems.indexOf(
    galleryItems.find((item) => item.description === lightboxImage.alt)
  );

  if (indexOfCurrentImageInGallery !== 0) {
    lightboxImage.src = galleryItems[indexOfCurrentImageInGallery - 1].original;
    lightboxImage.alt =
      galleryItems[indexOfCurrentImageInGallery - 1].description;
  } else {
    lightboxImage.src = galleryItems[galleryItems.length - 1].original;
    lightboxImage.alt = galleryItems[galleryItems.length - 1].description;
  }
}
