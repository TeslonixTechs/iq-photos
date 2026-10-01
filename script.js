const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-navigation');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  });
});

const filterButtons = document.querySelectorAll('.filter-button');
const galleryItems = [...document.querySelectorAll('.gallery-item')];

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.filter;
    filterButtons.forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle('is-active', isActive);
      filter.setAttribute('aria-pressed', String(isActive));
    });
    galleryItems.forEach((item) => {
      item.hidden = selectedCategory !== 'all' && item.dataset.category !== selectedCategory;
    });
  });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('figcaption');
let activeImages = [];
let activeImageIndex = 0;

function showImage(index) {
  activeImageIndex = (index + activeImages.length) % activeImages.length;
  const item = activeImages[activeImageIndex];
  const image = item.querySelector('img');
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = `${item.dataset.category} / ${item.dataset.title}`;
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    activeImages = galleryItems.filter((galleryItem) => !galleryItem.hidden);
    showImage(activeImages.indexOf(item));
    lightbox.showModal();
    document.body.classList.add('is-locked');
  });
});

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showImage(activeImageIndex - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showImage(activeImageIndex + 1));
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener('close', () => document.body.classList.remove('is-locked'));
document.addEventListener('keydown', (event) => {
  if (!lightbox.open) return;
  if (event.key === 'ArrowLeft') showImage(activeImageIndex - 1);
  if (event.key === 'ArrowRight') showImage(activeImageIndex + 1);
});

document.querySelector('#current-year').textContent = new Date().getFullYear();