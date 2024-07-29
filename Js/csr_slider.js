
$(".mySlider").each(function(){

	new Swiper($(this), {
		touchRatio: 0,
		speed: 800,
		loop: true,
		autoplay: false,
		spaceBetween:5,
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
			el: $(this).siblings(".slide_count").find('.project_pagination'),
			clickable: false,
			renderBullet: function(index, className) {
				if (index < 9) {
					return '<span class="' + className + '">' + "0" + (index + 1) + '</span>';
				} else {
					return '<span class="' + className + '">' + (index + 1) + '</span>';
				}
			},
		},
	});	
});

$('.csr_work .panel-heading').click(function(){
	
	if($(this).find("a").hasClass("collapsed"))
	{
		$(this).siblings('.panel-collapse').find('.mySlider').each(function(){
			$(this)[0].swiper.autoplay.start();
			$(this).siblings(".slide_count").addClass("onex");
		});

	}
	else
	{
		$(this).siblings('.panel-collapse').find('.mySlider').each(function(){
			$(this)[0].swiper.slideTo(1);
			$(this)[0].swiper.autoplay.stop();
			$(this).siblings(".slide_count").removeClass("onex");
		});

	}

});


$(document).ready(function(){
	var screenWidth=$( window ).width();
	$('.csr_work .panel-collapse:first').find('.mySlider').each(function(){
		$(this)[0].swiper.autoplay.start();
	});

	if(screenWidth<768){
		$('.mySlider').each(function(){
			$(this)[0].swiper.autoplay.start();

		});
	}

});