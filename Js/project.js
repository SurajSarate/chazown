$(document).ready(function() {
    // ToolTip Show
    $('.project_body>ul').hide();
  
    var window_width= $( window ).width();
    
    // For Desktop
    if(window_width>1025){
      $('.project_pin').mouseover(function() {
        $('.project_location').removeClass('show_tooltip');
        $(this).parent().addClass('show_tooltip');
        $(this).parents(".project_map_section").toggleClass('overlay');
      });
    }
  
    // For Mobile
    if(window_width<1025){
      $('.project_pin').click(function() {
        if ($(this).parent().hasClass('show_tooltip')) {
          $('.project_location').removeClass('show_tooltip');
        } else {
          $('.project_location').removeClass('show_tooltip');
          $(this).parent().addClass('show_tooltip');
        }
        $(this).parents(".project_map_section").toggleClass('overlay');
      });
    }
  
    // Add Data-target from Select Option
    $('.project_list_verticle ul>li').click(function() {
      var data = $(this).attr("class");
      $('.project_btn').attr('data-target', data);
      // Select list active
      setTimeout(function() {
        $('.project_list_verticle ul>li').removeClass('active');
        $(this).addClass('active');
      }, 100);
    });
    // Sidebar Show
    $('.project_btn').click(function() {
      $(this).parents(".project_map_section").addClass('show_sidebar');
      var data = $(this).attr("data-attribute");
      $('.project_body>ul').hide();
      $('.project_body>ul[data-attribute="' + data + '"]').show();
      // Filter Project
      var data_target = $(this).attr('data-target');
      if (data_target === "all") {
        $('.project_sidebar .project_body ul li').show();
      } else {
        $('.project_sidebar .project_body ul li').hide();
        $('.project_sidebar .project_body ul li[data-target="all"]').show();
        $('.project_sidebar .project_body ul li[data-target="' + data_target + '"]').show();
      }
    });
  
    
    if(window_width<767){
      $('.project_btn').click(function() {
        $(this).parents(".page-container").addClass('pos_fixed');
        $('body').addClass("hide_all");
      });
  
      $('.close_btn').click(function(){
        $(".page-container").removeClass('pos_fixed');
        $('body').removeClass("hide_all");
      })
  
    }
  
  
    // Sidebar CLose
    $('.project_close>.close_btn').click(function() {
      $(this).parents(".project_map_section").removeClass('show_sidebar');
      // $('.project_location').removeClass('show_tooltip');
    });
    // Show Verticles
    $('.project_list_verticle input').click(function() {
      $('.project_list_verticle input').val("Select");
      $(this).parents(".project_list_verticle").toggleClass('show_verticle');
      $(this).parents(".project_map_section").toggleClass('show_project_block');
    });
    // Hide Verticles
    $('.project_list_verticle ul>li').click(function() {
      $(this).parents(".project_list_verticle").removeClass('show_verticle');
      $(this).parents(".project_map_section").removeClass('show_project_block');
    });
    // Adding Project block for hide select verticles
    $('.project_block').click(function() {
      $(this).parent().removeClass('show_project_block');
      $(".project_list_verticle").removeClass('show_verticle');
    });
    // Adding value in select tab
    $('.project_list_verticle ul>li').click(function() {
      var list_data = $(this).attr("value");
      $('.project_list_verticle input').val(list_data);
      var getClass = $(this).attr("class");
      $('.project_location').css('display', 'none');
      $('.project_location.' + getClass + '').css('display', 'block');
      $('.project_btn').attr('data-target="' + getClass + '"');
    });
    // Note Select Verticle is Custom created
    //Swiper
    $('.project_india_grid').css("height", "0");
    var width = $(window).width();
    $('.project_tabs_map').css("height", "0");
    $('.project_india_grid').css("height", "auto");
    $('.mbl_project_page_load').click(function() {
      $(this).fadeOut();
    });
  
    setTimeout(function() {
      $('.mbl_project_page_load').fadeOut();
    }, 70);
  
    $(".project_list_verticle select").change(function() {
      var list_data = $(this).children("option:selected").val();
      $('.project_location').css('display', 'none');
      $('.project_location.' + list_data + '').css('display', 'block');
      console.log($('.project_btn'));
      console.log($(list_data));
      $('.project_btn').attr('data-target', list_data);
  
    });
    var a = $('.pro_s_right').removeClass('swiper-button-disabled');
    //URL
    var url_value = window.location.search.substring(1);
    if (url_value === "") {
      // if value is null
    } else {
      $('.project_list_verticle ul>li').each(function(index) {
        var list_vals = $(this).attr("class");
        if (url_value == list_vals) {
          $('.project_list_verticle input').val(url_value);
          $(this).trigger("click");
        }
      });
      $('.project_list_verticle select option').each(function(index) {
        var select_value = $(this).attr("value");
        if (url_value == select_value) {
          $('.project_list_verticle select').val(select_value).trigger('change');
        }
      });
    }
  });