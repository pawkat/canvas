import Swiper from 'swiper'
export default function _swiperSlider() {
  const slider = '.js-slider';
  const sliderVertival = '.js-slider-vertical';
  const sliderMultiple = '.js-slider-multiple';
  let swiper = new Swiper(slider, {
    speed: 400,
    navigation: {
      nextEl: '.js-slider-next',
      prevEl: '.js-slider-prev',
    },
    pagination: {
      el: '.js-slider-pagination',
      // dynamicBullets: true,
      clickable: true,
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      // hide: true,
    },
  });
  let swiperVertival = new Swiper(sliderVertival, {
    // slidesPerView: 3,
    direction: 'vertical',
    pagination: {
      el: '.js-slider-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  });
let swiperMultiple = new Swiper(sliderMultiple, {
    slidesPerView: 3,
    pagination: {
      el: '.js-slider-pagination',
      type: 'progressbar'
    },
  });

}
