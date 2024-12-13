'use strict';
const buttons = document.querySelectorAll('button');

buttons.forEach(button => button.addEventListener('click', buttonClick));

function buttonClick(e) {
    const btn = e.target;
    btn.classList.toggle('open');
    const openContent = btn.nextElementSibling;
    openContent.classList.toggle('open');
    if (openContent.classList.contains('open')) {
        openContent.style.height = (openContent.scrollHeight + 'px');
    } else {
        openContent.style.height = '0px';
    }
    buttons.forEach(otherBtn => {
        if (otherBtn !== btn && otherBtn.classList.contains('open')) {
            otherBtn.classList.remove('open');
            otherBtn.nextElementSibling.classList.remove('open');
            otherBtn.nextElementSibling.style.height = '0px';
        }
    });
}
