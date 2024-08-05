;
(function(window, document) {
  /* ============================================== */
  /* Swiper 1
  /* ============================================== */
  var timelineSlider = document.querySelector('.timeline_slider');
  if (timelineSlider) {
    var timelineSlider_slideLeft = timelineSlider.querySelector('.slide_left');
    var timelineSliderLeftArrow = timelineSlider_slideLeft.getElementsByTagName('img')[0];
    timelineSlider_slideLeft.style.pointerEvents = 'none';
    var swiper1;
    swiper1 = new Swiper('.measuring_slider', {
      slidesPerView: 3,
      loop: true,
      autoplay: {
        disableOnInteraction: false
      },
      spaceBetween: 30,
      pagination: false,
      touchRatio: 0,
      breakpoints: {
        1024: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 3
        },
        640: {
          slidesPerView: 'auto',
          spaceBetween: 20,
          touchRatio: 1,
        },
        320: {
          // slidesPerView: 1
        }
      },
      navigation: {
        prevEl: '.slide_left',
        nextEl: '.slide_right',
      },
      pagination: {
        el: '.measuring_pagination',
        clickable: true,
        renderBullet: function(index, className) {
          if (index < 9) {
            return '<span class="' + className + '">' + "0" + (index + 1) + '</span>';
          } else {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          }
        },
      },
    });
    swiper1.on('slideChange', function() {
      var slideIndex = swiper1.realIndex;
      var width = window.innerWidth;
      if (width > 1024) {
        if (swiper1.realIndex == 0) {
          swiper1.allowSlidePrev = false;
          timelineSlider_slideLeft.style.pointerEvents = 'none';
          timelineSliderLeftArrow.dataset.src = "images/svg/left-arrow.svg";
          timelineSliderLeftArrow.src = "images/svg/left-arrow.svg";
        } else {
          swiper1.allowSlidePrev = true;
          timelineSlider_slideLeft.style.pointerEvents = 'auto';
          timelineSliderLeftArrow.dataset.src = "images/svg/left-arrow-orange.svg";
          timelineSliderLeftArrow.src = "images/svg/left-arrow-orange.svg";
        }
      }
    });
  }
  /* ============================================== */
  /* Swiper Without loop
  /* ============================================== */
  var swiper_loop;
  swiper_loop = new Swiper('.measuring_slider1', {
    slidesPerView: 3,
    loop: false,
    autoplay: {
      disableOnInteraction: false
    },
    spaceBetween: 30,
    pagination: false,
    touchRatio: 0,
    breakpoints: {
      1024: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 3
      },
      640: {
        slidesPerView: 1.12,
        spaceBetween: 20,
        touchRatio: 1,
      },
      320: {
        slidesPerView: 1.05
      }
    },
    pagination: {
      el: '.measuring_pagination',
      clickable: true,
      renderBullet: function(index, className) {
        if (index < 9) {
          return '<span class="' + className + '">' + "0" + (index + 1) + '</span>';
        } else {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
      },
    },
  });
  var swiper_loop;
  swiper_loop = new Swiper('.measuring_slider2', {
    slidesPerView: 3,
    loop: false,
    autoplay: {
      disableOnInteraction: false
    },
    spaceBetween: 30,
    pagination: false,
    touchRatio: 0,
    breakpoints: {
      1024: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 3
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
        touchRatio: 1,
      },
      320: {
        slidesPerView: 1
      }
    },
    pagination: {
      el: '.measuring_pagination',
      clickable: true,
      renderBullet: function(index, className) {
        if (index < 9) {
          return '<span class="' + className + '">' + "0" + (index + 1) + '</span>';
        } else {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
      },
    },
  });
  /* ============================================== */
  /* Swiper 2
  /* ============================================== */
  var projectSlider = document.querySelector('.project_slider');
  var projectSlider_slideLeft = projectSlider.querySelector('.project_slide_left');
  var projectSliderLeftArrow = projectSlider_slideLeft.getElementsByTagName('img')[0];
  projectSlider_slideLeft.style.pointerEvents = 'none';
  var swiper2 = new Swiper('.project_slider', {
    touchRatio: 0,
    speed: 800,
    loop: true,
    autoplay: {
      disableOnInteraction: false
    },
    breakpoints: {
      640: {
        touchRatio: 1,
      }
    },
    navigation: {
      prevEl: '.project_slide_left',
      nextEl: '.project_slide_right',
    },
    pagination: {
      el: '.project_pagination',
      clickable: true,
      renderBullet: function(index, className) {
        if (index < 9) {
          return '<span class="' + className + '">' + "0" + (index + 1) + '</span>';
        } else {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
      },
    },
  });
  swiper2.on('slideChange', function() {
    if (swiper2.realIndex == 0) {
      swiper2.allowSlidePrev = false;
      projectSlider_slideLeft.style.pointerEvents = 'none';
      projectSliderLeftArrow.dataset.src = "images/svg/left-arrow.svg";
      projectSliderLeftArrow.src = "images/svg/left-arrow.svg";
    } else {
      swiper2.allowSlidePrev = true;
      projectSlider_slideLeft.style.pointerEvents = 'auto';
      projectSliderLeftArrow.dataset.src = "images/svg/left-arrow-orange.svg";
      projectSliderLeftArrow.src = "images/svg/left-arrow-orange.svg";
    }
  });
})(window, document);