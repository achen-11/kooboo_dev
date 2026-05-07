// const breakpoint = 1024;
// const headerEl = document.querySelector('body > header');

// let recordedScrollTop = 0;

// window.onscroll = function () {
//     if (document.body.clientWidth < breakpoint) return

//     let currentScrollTop = window.pageYOffset

//     if (currentScrollTop > recordedScrollTop) {
//         headerEl.classList.remove('scroll-up');
//         headerEl.classList.add('scroll-down');
//     } else {
//         headerEl.classList.remove('scroll-down');
//         headerEl.classList.add('scroll-up');
//     }

//     recordedScrollTop = currentScrollTop < 0 ? 0 : currentScrollTop;
// }