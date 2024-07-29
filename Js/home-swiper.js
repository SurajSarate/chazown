;
(function(window, document) {
  /* ============================================== */
  /* Swiper 1
  /* ============================================== */
  var measuringYearsList = ['2021', '2020','2019','2019','2018', '2018', '2018', '2018', '2018', '2018', '2017 - 2018', '2017', '2017', '2017', '2017', '2017', '2016', '2016', '2016', '2015', '2015', '2014', '2014', '2013']
  var timelineSlider = document.querySelector('.timeline_slider');
  var timelineSlider_slideLeft = timelineSlider.querySelector('.slide_left');
  var timelineSliderLeftArrow = timelineSlider_slideLeft.getElementsByTagName('img')[0];
  timelineSlider_slideLeft.style.pointerEvents = 'none';
  var swiper1 = new Swiper('.measuring_slider', {
    // effect: 'fade',
    slidesPerView: 4,
    loop: true,
    spaceBetween: 30,
    pagination: false,
    touchRatio: 0,
    speed: 800,
    autoplay: {
      disableOnInteraction: false
    },
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 3
      },
      640: {
        slidesPerView: 1,
        touchRatio: 1,
      },
      320: {
        slidesPerView: 1
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
    var measuringYear = document.querySelector('.measuring_year')
      .getElementsByTagName('p')[0];
    measuringYear.style.opacity = '0';
    measuringYear.style.transition = 'opacity 200ms';
    requestTimeout(function() {
      measuringYear.innerHTML = measuringYearsList[slideIndex];
      measuringYear.style.opacity = '1';
      measuringYear.style.transition = 'opacity 400ms';
    }, 201);
    var width = window.innerWidth;
    if (width > 1024) {
      if (swiper1.realIndex == 0) {
        swiper1.allowSlidePrev = false;
        timelineSlider_slideLeft.style.pointerEvents = 'none';
        timelineSliderLeftArrow.dataset.src = "../Assets/svg/left-arrow-orange.svg";
        timelineSliderLeftArrow.src = "../Assets/svg/left-arrow-orange.svg";
      } else {
        swiper1.allowSlidePrev = true;
        timelineSlider_slideLeft.style.pointerEvents = 'auto';
        timelineSliderLeftArrow.dataset.src = "../Assets/svg/left-arrow-orange.svg";
        timelineSliderLeftArrow.src = "../Assets/svg/left-arrow-orange.svg";
      }
    }
  });
  /* ============================================== */
  /* Swiper 2
  /* ============================================== */
  var projectSlider = document.querySelector('.project_slider');
  var projectSlider_slideLeft = projectSlider.querySelector('.project_slide_left');
  var projectSliderLeftArrow = projectSlider_slideLeft.getElementsByTagName('img')[0];
  projectSlider_slideLeft.style.pointerEvents = 'none';
  var swiper2 = new Swiper('.project_slider', {
    loop: true,
    touchRatio: 0,
    speed: 800,
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
      projectSliderLeftArrow.dataset.src = "../Assets/svg/left-arrow-orange.svg";
      projectSliderLeftArrow.src = "../Assets/svg/left-arrow-orange.svg";
    } else {
      swiper2.allowSlidePrev = true;
      projectSlider_slideLeft.style.pointerEvents = 'auto';
      projectSliderLeftArrow.dataset.src = "../Assets/svg/left-arrow-orange.svg";
      projectSliderLeftArrow.src = "../Assets/svg/left-arrow-orange.svg";
    }
  });
})(window, document);