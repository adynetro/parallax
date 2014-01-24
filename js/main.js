(function(){

	// parallax effect
	window.onscroll = function(e) {
		update_parallax();
	}
	function update_parallax(){
		$('.parallax').each(function(){
			var offset = $(this).offset().top/2;
			$(this).css('transform', 'translate3d(0px,' + ((window.scrollY/2) - offset) + 'px, 0px)');
			$(this).css('-webkit-transform', 'translate3d(0px,' + ((window.scrollY/2) - offset) + 'px, 0px)');
			$(this).css('-moz-transform', 'translate3d(0px,' + ((window.scrollY/2) - offset) + 'px, 0px)');
			$(this).css('-o-transform', 'translate3d(0px,' + ((window.scrollY/2) - offset) + 'px, 0px)');
			$(this).css('-ms-transform', 'translate3d(0px,' + ((window.scrollY/2) - offset) + 'px, 0px)');
			if(ie){
				$(this).css('top', ((document.documentElement.scrollTop/2) - offset) + 'px');
			}
		});
		$('.content-section').each(function(){
			if(!(/iPhone|iPod|iPad|BlackBerry/).test(navigator.userAgent) && $(window).outerWidth() > 600){
				var strength = Math.pow(2,focus_amount($(this))) - 1;
				var move_length = 50 * (1 - strength);			
				$(this).find(".container").css('opacity',strength);
				$(this).find(".container").css('transform', 'translate3d(0px,' + move_length + 'px, 0px)');
				$(this).find(".container").css('-webkit-transform', 'translate3d(0px,' + move_length + 'px, 0px)');
				$(this).find(".container").css('-moz-transform', 'translate3d(0px,' + move_length + 'px, 0px)');
				$(this).find(".container").css('-o-transform', 'translate3d(0px,' + move_length + 'px, 0px)');
				$(this).find(".container").css('-ms-transform', 'translate3d(0px,' + move_length + 'px, 0px)');
			}
		});
	}

	function focus_amount(element){

		var top_posn = element.position().top;
		var top_window = $(window).scrollTop();
		var window_height = $(window).height();
		var content_height = element.height();
		var fade_start = 0.65 * window_height;
		var fade_end = 0.02 * window_height;

		if(top_window > top_posn - fade_start &&
			top_window < top_posn - fade_end){
			// in fade area
			return (top_window - (top_posn - fade_start)) /((top_posn - fade_end) - (top_posn - fade_start));
		} else if(top_window > top_posn - fade_end && top_window < top_posn + content_height + fade_start){
			// in main area
			return 1;
		} else {
			// outside visible area
			return 0;
		}
	}

	$('#navbar').scrollspy();
	
	$(document).ready(function(){
		$(".nav.scroll-link li a[href^='#'], a.scroll").on('click', function(e) {
		   e.preventDefault();
		   $('html, body').stop(true).animate({ scrollTop: $(this.hash).offset().top }, 750, 'easeOutQuint');
		});
	});
	
	$('.option-set a').unbind().click(function(e){
   		close_overlay();
   		$('.nav.option-set').removeAttr("style");
	});
	$('.element').mouseenter(function(){
		$text = $(this).find('.portfolio-text');
		$img = $(this).find('.portfolio-image');
		var top_pos = $(this).height() - $text.height();
		$text.stop().animate({top:top_pos},250);
		$img.stop().animate({opacity: 0.4},250);
	}).mouseleave(function(){
		$text = $(this).find('.portfolio-text');
		$text.stop().animate({top:$(this).height()+'px'},250);
		$img.stop().animate({opacity: 1.0},250);
	});

	$('.contact-row input, .contact-row textarea').focus(function(){
		$('.contact-row').removeClass('active-row');
		$(this).closest('.contact-row').addClass('active-row');
	}).focusout(function(){
		$(this).closest('.contact-row').removeClass('active-row');
	});

    // isotope
    $(window).bind("resize", function() {
    	scale_elements();
        var cw=$('#container-isotope').width();
        var cw3=parseInt(cw/4, 10);
        if($(window).width() <= 930){
        	cw3=parseInt(cw/3, 10);
        }
        if($(window).width() <= 800){
			cw3=parseInt(cw/2, 10);
        }
        if($(window).width() <= 450){
			cw3=parseInt(cw, 10);
        }
        $('#container-isotope').isotope({
            masonry: {
                columnWidth: cw3
            }
        });
        $('.nav.option-set').removeAttr("style");
        update_parallax();
    }).resize();
	$(window).load(function(){
		$(window).resize();
	});
    var $optionSets = $('.option-isotope'),
		$optionLinks = $optionSets.find('a'),
		$container = $('#container-isotope');
	$optionLinks.click(function(e){
		e.preventDefault();
		$clicked   = $(this);
		var current_select = $clicked.hasClass("selected"); 
		var $this = $(this);

		if ( $this.hasClass('selected') )
		return false;

		var $optionSet = $this.parents('.option-isotope');
		$optionSet.find('.selected').removeClass('selected');
		$this.addClass('selected');

		var options = {},
		key = $optionSet.attr('data-option-key'),
		value = $this.attr('data-option-value');
		
		value = (value === 'false') ? false : value;
		options[ key ] = value;
		if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' )
			changeLayoutMode( $this, options );
		else
			$container.isotope( options );

		return false;
	});

	// Email Form
    $('#submit_contact_info').click(function(e){
		e.preventDefault();
		data = [];
		$('#contact_form input, #contact_form textarea').each(function(){
			data.push([$(this).attr('id'), $(this).val()]);
		});

		$.post('send_email.php', {'data':data}, function(response){
			if(response != 'success'){
				$('.alert-error').hide();
				$('.alert-error').html(response);
				$('.alert-error').slideDown();
			} else {
				$('.alert-error').hide();
				$('#contact_form').slideUp();
				$('.alert-success').slideDown();
				$('.after-close').show();
			}
		});
	});

	// Responsive nav
	$('.small-nav-toggle').click(function(e){
		e.preventDefault();
		$('.nav.option-set').slideToggle(150);
	})

    // Portfolio popup
    $('.element').click(function(e){
    	e.preventDefault();
    	$('.overlay').fadeIn(250);
    	$('.portfolio-overlay').css('top',$(window).scrollTop()+'px').fadeIn(250);
    	$.get($(this).attr("href"), function(data){
    		$('.portfolio-overlay').html(data);
    		$('.overlay, .close-overlay').unbind().click(function(e){
    			e.preventDefault();
    			close_overlay();
		    });
		    $('.carousel-control').addClass('btn btn-clear btn-round');
    	});
    	$(window).scroll(function () {
    		var top_posn = $('.portfolio-overlay').position().top;
    		var top_window = $(window).scrollTop();
    		var overlay_height = $('.portfolio-overlay').height();
			if(top_window < (top_posn - overlay_height) || top_window > (top_posn + overlay_height)){
				close_overlay();
			}
		});
		$(window).keyup(function(e){
			if(e.keyCode == 27)
				close_overlay();
		})
    });
    function close_overlay(){
    	$('.overlay').fadeOut(250);
    	$('.portfolio-overlay').fadeOut(250,function(){
    		$(this).html('');
    	});
    }
	
	function scale_elements(){
		$('.element').each(function(){
			$(this).css('height',$(this).width()+'px');
		});
	}
	
	var ie = (function(){
		var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');

		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);

		return v > 4 ? v : undef;

	}());

})();

   
