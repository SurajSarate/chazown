var swiper2 = new Swiper('.inner_project_slider', {
	touchRatio: 0,
	speed: 800,
	loop: true,
	spaceBetween:5,
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


$('.inner_project_slider .swiper-slide.swiper-slide-duplicate img').each(function(){
	var imgSrc = $(this).data("src");
	$(this).attr({"src": imgSrc});
});



