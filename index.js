import galleryItems from "./app.js";

const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector(".lightbox__button");
const lightboxOverlay = document.querySelector(".lightbox__overlay");

const galleryMarkup = createGalleryMarkup(galleryItems);

gallery.innerHTML = galleryMarkup;

gallery.addEventListener("click", toOpenOriginalImageInModal);
closeModalBtn.addEventListener("click", toCloseModalWithImage);
lightboxOverlay.addEventListener("click", toCloseModalWithImage);
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

function toCloseModalWithImage() {
  lightbox.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
}

function toCloseModalByEscape(key) {
  if (key.code === "Escape") {
    toCloseModalWithImage();
  } else return;
}

function toGoToTheNextPicture(key) {
  if (key.code !== "ArrowRight") {
    return;
  } else {
    const currentImageInGallery = galleryItems.find(
      (item) => item.description === lightboxImage.alt
    );
    const indexOfCurrentImageInGallery = galleryItems.indexOf(
      currentImageInGallery
    );
    const indexOfNextImageInGallery = indexOfCurrentImageInGallery + 1;
    const nextImage = galleryItems[indexOfNextImageInGallery];
    const firstImage = galleryItems[0];

    if (indexOfCurrentImageInGallery !== galleryItems.length - 1) {
      lightboxImage.src = nextImage.original;
      lightboxImage.alt = nextImage.description;
      return;
    } else {
      lightboxImage.src = firstImage.original;
      lightboxImage.alt = firstImage.description;
      return;
    }
  }
}

function toGoToThePreviousPicture(key) {
  if (key.code !== "ArrowLeft") {
    return;
  } else {
    const currentImageInGallery = galleryItems.find(
      (item) => item.description === lightboxImage.alt
    );
    const indexOfCurrentImageInGallery = galleryItems.indexOf(
      currentImageInGallery
    );
    const indexOfPreviousImageInGallery = indexOfCurrentImageInGallery - 1;
    const previousImage = galleryItems[indexOfPreviousImageInGallery];
    const lastImage = galleryItems[galleryItems.length - 1];

    if (indexOfCurrentImageInGallery !== 0) {
      lightboxImage.src = previousImage.original;
      lightboxImage.alt = previousImage.description;
      return;
    } else {
      lightboxImage.src = lastImage.original;
      lightboxImage.alt = lastImage.description;
      return;
    }
  }
}
