/*global $, alert, console*/

$(function () {
    
    'use strict';
    
    /** Variables */
    const home_heading      = $('.heading-main');
    const home_quote        = $('.home__quote');
    const clip_it_big       = $('.clip-it-big');
    const clip_it_small     = $('.clip-it-small');
    const circles           = $('.circle');
    const navigation        = $('.navigation');
    const mob_navigation    = $('.mob-navigation');
    const navigation_item   = navigation.find('li');
    const page_label        = $('.page-label');
    const side_word         = $('.side-word'); 
    const heading_line      = $('.heading-main__line');
    const quote_line        = $('.home__quote-line');
    const home_img          = $('.home__img');
    const feTurb            = $('#turbulence');
    const wrapper           = $('.wrapper');
    const cursor            = $('.cursor');
    const joker             = $('.joker');
    const transition1       = $('.transition--1');
    const transition2       = $('.transition--2');
    const svg_about         = $('.svg');
    const wrapper_children  = wrapper.children('section');
    const body              = $('body');
    const about_story       = $('.about__story');
    const about_story_right = $('.about__story-right');
    const about_svg         = $('.about .svg');
    const scroll_down       = $('.scroll-down');
    const about_overlay     = $('.about .overlay');
    const slider_line       = $('.slider__line-active');
    const slider_item       = $('.slider__item');
    const projects          = $('.projects');
    const pro               = $('.pro');
    let volume              = [0, 1];
    let lsc                 = 0;
    let feProTurb           = $('#turbulencepro');
    const window_height     = $(window).innerHeight();
    const window_width      = $(window).innerWidth();

    // Config Clip-it Height
    clip_it_big.innerHeight(home_heading.innerHeight());
    clip_it_small.innerHeight(home_quote.innerHeight()+10);

    // Window Scroll
    $(window).on('scroll', () => {
        let sc = $(this).scrollTop();
        let about_sectionTl = new TimelineMax();
        // Slider Line
        slider_line.css('height', ((sc/($(document).height()-$(window).height())) * 100) + '%');
        // Add active class on slider items
        addActiveClass(sc, $('.projects .heading-wrapper > h2').eq(0).offset().top, slider_item.eq(0));
        addActiveClass(sc, $('.projects .heading-wrapper > h2').eq(1).offset().top, slider_item.eq(1));
        addActiveClass(sc, $('.projects .heading-wrapper > h2').eq(2).offset().top, slider_item.eq(2));
        addActiveClass(sc, $('.projects .heading-wrapper > h2').eq(3).offset().top, slider_item.eq(3));
        addActiveClass(sc, $('.projects .heading-wrapper > h2').eq(4).offset().top, slider_item.eq(4));
        // Navigation Trick
        if(lsc<sc) {
            TweenMax.to(navigation, 1, {y: 100, autoAlpha: 0, ease: Back.easeOut.config(1.7)});
        } else {
            TweenMax.to(navigation, 1, {y: 0, autoAlpha: 1, ease: Back.easeOut.config(1.7)});
        }
        lsc = sc;
        // About Story Trick
        if(sc>0&&sc<=100) {
            about_sectionTl
            .to([about_svg, scroll_down], .3, {autoAlpha: 0, visibility: 'hidden'})
            .to(about_story, .3, {autoAlpha: 1, visibility: 'visible'});
            about_story_right.css('transform', 'translateY(0)');
        } else if(sc<100) {
            about_sectionTl
            .to([about_svg, scroll_down], .3, {autoAlpha: 1, visibility: 'visible'})
            .to(about_story, .3, {autoAlpha: 0, visibility: 'hidden'})
        }
        if(sc>=250&&sc<$(window).innerHeight()*6) {
            let about_story_offset = Math.min($(window).innerHeight()*6, sc-750);
            about_story_right.css('transform', 'translateY(-'+about_story_offset+'px)');
        }

        // Logo in About
        $('.cls-2').css('stroke-dasharray', (sc/$(window).height()));
        
        // Projects PX
        // TweenMax.to(pro, 2, {x: 0, y: -(sc/2)});

    });
    
    // Project Prespective on 3D Space + Glare Effect
    $('.project').each(function(i) {
        $(this).on('mouseenter', () => {
            $(this).on('mousemove', (e) => {
                $(this).css('transform', 'rotateY('+(e.offsetX-350)/30+'deg) rotateX('+-(e.offsetY-350)/30+'deg)');
                $(this).find('.project__glare')
                    .css({
                        transform: 'rotate('+((e.offsetX-e.offsetY)-350/150)+'deg) translate(-50%, -50%)',
                        opacity: (e.offsetX*.01) / 10
                    });
                });
            });
            $(this).on('mouseleave', () => {
                $(this).find('.project__glare')
                    .css({
                        transform: 'rotate(0deg) translate(-50%, -50%)',
                        opacity: 0
                    });
                $(this).css('transform', 'rotateX(0deg) rotateY(0deg)');
        });
    });

    // Active Slider Items
    slider_item.on('click', function() {
        $('html, body').animate({
            scrollTop: $('.'+$(this).data('class')).offset().top-30
        }, 1000);
    });

    // Add active class on slider items
    function addActiveClass(scroll, elOffset, el) {
        if(scroll>=elOffset-70) {
            el.addClass('active');
        } else {
            el.removeClass('active');
        }
    }

    // Intro(Home) Timeline Animations
    let introTl = new TimelineMax();
    introTl
        .to($('.audio-overlay'), 5, {autoAlpha: 0, visibility: 'hidden', display: 'none'})
        .from(home_heading, 1, {y: 300, ease: Power2.easeOut}, '+=.5')
        .from(home_quote, 1, {y: 300, ease: Power2.easeOut}, '-=.5')
        .from(heading_line, .5, {width: 0, ease: Power2.easeOut})
        .from(quote_line, .5, {width: 0, ease: Power2.easeOut})
        .from(circles, 1.2, {scale: 0, ease: Power2.easeOut})
        .from(navigation, 1.2, {autoAlpha: 0, y: 50, ease:Back.easeOut}, '-=2')
        .from(page_label, 1.2, {autoAlpha: 0, y: -50, ease: Back.easeOut}, '-=.5')
        .from(side_word, 1.2, {x: 200, ease: Power2.easeOut}, '-=3.5');
        
    // Joker Move Effect
    function jokerImageMove() {
        joker.on('mousemove', (e) => {
            home_img.css({
                top: e.offsetY,
                left: e.offsetX
            });
        });
    }
    jokerImageMove();
    
    // Joker Enter Effect
    function jokerImageEnter() {
        joker.on('mouseenter', () => {
            TweenMax.to(home_img, 1.2, {autoAlpha: 1, x: -50, y: -60, ease: Power2.easeOut});
            TweenMax.to(feTurb, 1.2, {attr: {baseFrequency: '0 0'}, ease: Power2.easeOut});
        });
    }
    jokerImageEnter();

    // Joker Leave Effect
    function jokerImageLeave() {
        joker.on('mouseleave', () => {
            home_img.css({
                top: 'unset',
                left: 'unset',
                bottom: '0rem',
                right: '12rem',
            });
        });
    }
    jokerImageLeave();

    // Cursor Move
    // function cursorMove(scrolly = 0) {
    //     let max_x = window_width - 20;
    //     let max_y = window_height - 20;
    //     $(window).on('mousemove', (e) => {
    //         if(e.pageX>=max_x) {
    //             e.pageX = max_x;
    //         }
    //         // if(e.pageY >= max_y && $(window).innerHeight() == window_height) {
    //         //     e.pageY = max_y;
    //         // }
    //         cursor.css({
    //             top: (e.pageY - scrolly),
    //             left: e.pageX
    //         });
    //     });
    // }
    // cursorMove();

    // Transition Timeline
    function transitionTimeline(activePage = null, sib = null) {
        let transitionTl = new TimelineMax();
        transitionTl
                    .to($('body, html'), 1, {scrollTop: 0})
                    .to(transition1, 1.5, {left: -window_width})
                    .to(sib, .7, {display: 'none'}, '-=1')
                    .to(activePage, .8, {display: 'block'}, '-=1')
                    .to(transition2, 2, {left: -window_width*2}, '-=1')
                    .to([transition1, transition2], .001, {autoAlpha: 0})
                    .to([transition1, transition2], .001, {left: window_width})
                    .to([transition1, transition2], .001, {autoAlpha: 1})
    }
    // Navigation Links
    function navigationActiveLink() {
        navigation_item.on('click', function() {
            transitionTimeline( $('.'+$(this).data('class')), $('.'+$(this).data('class')).siblings('section') );
        });
    }
    navigationActiveLink();

    // About SVG Text Move
    $(window).on('mousemove', (e) => {
        svg_about.find('> svg').eq(0).css({
            transform: 'translate('+(e.pageX/2)+'px, .35rem)',
        });
        svg_about.find('> svg').eq(1).css({
            transform: 'translate('+-(e.pageX/1.5)+'px, .35rem)',
        });
        svg_about.find('> svg').eq(2).css({
            transform: 'translate('+(e.pageX/4)+'px, .35rem)',
        });
    });

    // Audio Overlay
    let audioTimeout = setTimeout(() => {
        $(".audio-overlay").fadeOut(1000);
    }, 5000);
    
    // Pro Transition
    $('.project').on('click', function() {
        let proTimeline = new TimelineMax();
        proTimeline
            .to($('.project').not($(this)), .5, {y: 50, autoAlpha: 0})
            .to(feProTurb, .2, {attr: {baseFrequency: '0.05 0.04'}, ease: Power2.easeOut})
            .to(feProTurb, .7, {attr: {baseFrequency: '0 0'}, ease: Power2.easeOut})
            .to($('.pro'), .5, {autoAlpha: 1, visibility: 'visible'})
        let pro = $('.'+$(this).data('class'));
        console.log($(this).data('class'));
    });

    // Close Pro
    $('.close').on('click', () => {
        let closeTimeline = new TimelineMax();
        closeTimeline
            .to($('.pro'), .5, {scrollTop: 0})
            .to(feProTurb, .2, {attr: {baseFrequency: '0.05 0.04'}, ease: Power2.easeOut})
            .to(feProTurb, .2, {attr: {baseFrequency: '0 0'}, ease: Power2.easeOut})
            .to($('.project'), .5, {y: 0, autoAlpha: 1})
            .to($('.pro'), 1, {autoAlpha: 0, visibility: 'hidden'});
    })

});

// Audio
const audio             = document.getElementById('audio');
let isPlaying           = false;
document.addEventListener('keydown', (e) => {
    let keyCode = e.which || e.keyCode;
    if(keyCode == '80' && isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
});
document.addEventListener('keydown', (e) => {
    let keyCode = e.which || e.keyCode;
    if(keyCode == '38') { // Up
        audio.volume +=.1;
        let v_max = Math.max(1, audio.volume);
        if(audio.volume >= v_max) {
            audio.volume = v_max;
        }
    } else if(keyCode == '40'){ // Down
        audio.volume -=.1;
        let v_min = Math.min(0, audio.volume);
        if(audio.volume <= v_min) {
            audio.volume = v_min;
        }
    }
    console.log(audio.volume);
});

audio.onplaying = () => {
    isPlaying = true;
}
audio.onpause = () => {
    isPlaying = false;
}