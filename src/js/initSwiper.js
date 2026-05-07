window.onload = function () {
    new Swiper(".advantage-swiper", {
        effect: "coverflow",
        grabCursor: true,
        lazy: true,
        centeredSlides: true,
        slidesPerView: "auto",
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 60,
            stretch: 400,
            depth: 450,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    new Swiper(".action-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        lazy: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}