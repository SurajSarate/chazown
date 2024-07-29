;

(function(window, document) {

  var peopleSlider = document.querySelector('.people_slider');

  var peopleSlider_slideLeft = peopleSlider.querySelector('.people_slide_left');

  var peopleSliderLeftArrow = peopleSlider_slideLeft.getElementsByTagName('img')[0];

  peopleSlider_slideLeft.style.pointerEvents = 'none';

  var swiper = new Swiper('.people_slider', {

    loop: true,

    touchRatio: 0,

    speed: 800,

    autoplay: {

      disableOnInteraction: false

    },

    breakpoints: {

      640: {

        touchRatio: 1,

        spaceBetween: 30,

      }

    },

    navigation: {

      prevEl: '.people_slide_left',

      nextEl: '.people_slide_right',

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

  // Name

  var name = [  "Rutuja Pawar","Susanta Behera","Reyaz Alam"];

  // Designation

  var des = [ "Project Director","Project Director","Project Director" ];

  swiper.on('slideChange', function() {

    var count = swiper.realIndex;

    if (count == 0) {

      swiper.allowSlidePrev = false;

      peopleSlider_slideLeft.style.pointerEvents = 'none';

      peopleSliderLeftArrow.dataset.src = "../Assets/svg/left-arrow-orange.svg";

      peopleSliderLeftArrow.src = "../Assets/svg/left-arrow-orange.svg";

    } else {

      swiper.allowSlidePrev = true;

      peopleSlider_slideLeft.style.pointerEvents = 'auto';

      peopleSliderLeftArrow.dataset.src = "../Assets/svg/left-arrow-orange.svg";

      peopleSliderLeftArrow.src = "../Assets/svg/left-arrow-orange.svg";

    }

    var peopleTestimonialsEl = document.querySelector('.people_testimoniols');

    var personNameEl = peopleTestimonialsEl.querySelector('.person-name');

    var personTitleEl = peopleTestimonialsEl.querySelector('.person-title');

    personNameEl.style.opacity = '0';

    personTitleEl.style.opacity = '0';

    personNameEl.style.transition = 'opacity 200ms';

    personTitleEl.style.transition = 'opacity 200ms';

    requestTimeout(function() {

      personNameEl.innerHTML = name[count];

      personTitleEl.innerHTML = des[count];

      personNameEl.style.opacity = '1';

      personTitleEl.style.opacity = '1';

      personNameEl.style.transition = 'opacity 300ms';

      personTitleEl.style.transition = 'opacity 300ms';

    }, 201);

  });

})(window, document);