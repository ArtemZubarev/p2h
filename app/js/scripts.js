jQuery(document).ready(function() {

  /*    Main slider    */
  jQuery('.slider-block__slider').slick({
    nextArrow: '<img class="next-arrow" src="./img/arrow.png" alt="">',
    prevArrow: '',
    dots: true
  });
  
  /*    Labels mobile slider    */
  // jQuery('.pasta-block__labels').slick({
  //   responsive: [
      
  //     {
  //       breakpoint:320,
  //       settings: {
  //         slidesToShow:1
  //       }
  //     }
      
  //   ]
  // });

  jQuery( '.price-container__item' ).hover(function() {
  	jQuery( this ).toggleClass( 'price-container__item--hovered' );
	});
  
  jQuery('.pasta-block__btn').click(function(){
    jQuery.getJSON('../ajax/example.json', function(data) {
      var items = [];
      jQuery.each( data, function( key, val ) {
        jQuery('.pasta-block__labels')
          .append('<div class="pasta-block__label-img"><img src="' + val + '"/></div>');
      });
      
    });
  });
	
	jQuery(function() {
    jQuery('#country').selectize();
	});

  jQuery('#sandwich').click(function(){
    jQuery(this).toggleClass('open');
    jQuery('.header__navbar ul li').toggleClass('opened');
  });


  if (document.documentElement.clientWidth > 768) { 
    jQuery(window).scroll(function(){
      if ( jQuery(document).scrollTop() > 500 ) {
        jQuery('.header').addClass('header--small');
      } else {
        jQuery('.header').removeClass('header--small');
      }
    });
  }

  if (document.documentElement.clientWidth < 768) {
    $('.price-container__item:first').addClass('active-tab');
    $('.mobile-choose__tabs li:first').addClass('active-pan');

    var pan = $('.mobile-choose__tabs li');
    var panIndex = $('.mobile-choose__tabs li').index();
    var tab = $('.price-container__item');

    pan.click(function(){
      var activePan = $(this).index();
      var activeTab = activePan;
      
      pan.removeClass('active-pan');
      tab.removeClass('active-tab');
      pan.eq(activePan).addClass('active-pan');
      tab.eq(activeTab).addClass('active-tab');    
    });

    $('.footer-info').appendTo('.footer .container');
    $('#country').prependTo('.footer-nav');
  }

});
