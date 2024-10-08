import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const bestSectionSwiper = new Swiper('.most-popular__swiper', {
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 30
    },

    768: {
      slidesPerView: 1,
      spaceBetween: 69
    },

    1728: {
      slidesPerView: 3,
    spaceBetween: 69
    }
  },

  pagination: {
    el: '.most-popular__pagination',
    bulletActiveClass: 'most-popular__pagination--big',
    bulletClass: 'most-popular__pagination--bullet',
    clickable: true,
  },

  navigation: {
    nextEl: '.most-popular__slider--next',
    prevEl: '.most-popular__slider--prev'
  },
});

const swiper = new Swiper('.gallery__swiper', {
  spaceBetween: 30,
  loop: true,

  pagination: {
    el: '.gallery__pagination',
    bulletActiveClass: 'gallery__pagination--big',
    bulletClass: 'gallery__pagination--bullet',
    clickable: true,
  },

  navigation: {
    nextEl: '.gallery__slider--next',
    prevEl: '.gallery__slider--prev',
  },
});


