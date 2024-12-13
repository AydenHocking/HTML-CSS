'use strict';

const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const carouselNavItems = Array.from(document.querySelectorAll('.nav-item'));
const CAROUSEL_SIZE = carouselItems.length;

leftBtn.addEventListener('click', swipe);
rightBtn.addEventListener('click', swipe);

const carouselNav = document.querySelector('.carousel-nav');
carouselNav.addEventListener('click', imageNav);

function swipe(e) {
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentIndex = carouselItems.indexOf(currentCarouselItem);
    let nextIndex;

    if (e.currentTarget.classList.contains('left')) {
        nextIndex = currentIndex === 0 ? CAROUSEL_SIZE - 1 : currentIndex - 1;
    } else {
        nextIndex = currentIndex === CAROUSEL_SIZE - 1 ? 0 : currentIndex + 1;
    }
    carouselItems[nextIndex].classList.add('active');
    carouselNavItems[nextIndex].classList.add('active');
    carouselItems[currentIndex].classList.remove('active');
    carouselNavItems[currentIndex].classList.remove('active');

}

function imageNav(e) {
    const clickedDot = e.target;

    if (!clickedDot.classList.contains('nav-item')) return;
    const currentIndex = carouselNavItems.findIndex((item) => item.classList.contains('active'));
    const clickedIndex = carouselNavItems.indexOf(clickedDot);
    
    if (currentIndex === clickedIndex) return;
    carouselItems[clickedIndex].classList.add('active');
    carouselNavItems[clickedIndex].classList.add('active');
    carouselItems[currentIndex].classList.remove('active');
    carouselNavItems[currentIndex].classList.remove('active');


}


