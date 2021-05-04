  
window.addEventListener('DOMContentLoaded', function () { 
    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const blockID = anchor.getAttribute('href');
            document.querySelector('' + blockID).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }
});
$(document).ready(function () {
    $('.best-car-slider').slick({
        arrows: false,
        autoplaySpeed: 6000,
        autoplay: true,
    });
    $('.car-slider-one__wrapper').slick({
        arrows: false,
        asNavFor: '.car-slider-two__wrapper'
    });
    $('.car-slider-two__wrapper').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.car-slider-one__wrapper',
        responsive: [
            {
              breakpoint: 576,
              settings: {
                slidesToScroll: 1,
                slidesToShow: 2
              }
            }
          ]
    });
    $('.slider-inner').slick({
        arrows: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
    });
    $('.more-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1
                } 
            }

        ]
  
    });
    $('.details-item').hide();
    $('.tubs .car-detail__btn').click(function () {
        $('.tubs .car-detail__btn').removeClass('active').eq($(this).index()).addClass('active');
        $('.details-item').hide().eq($(this).index()).fadeIn()
    }).eq(0).addClass('active');

    $('.contacts__btn').on('click', function () {
        $('.form').toggle(100);
        $('.overlay').toggle(100);
    });
    $('.overlay').on('click', function () {
        $('.form').toggle(100);
        $('.overlay').toggle(100);
    });
    $('.form__btn').on('click', function () {
        $('.form').toggle(100);
        $('.overlay').toggle(100);
    });
});
