/**
 * Author: Ayden Hocking
 * Date: 12-7-2024
 * File: new.js
 */
"use strict";

const MAX_LENGTH = 50;
const form = document.querySelector("form");
const authorBox = document.querySelector("#author");
const titleBox = document.querySelector("#title");
const contentBox = document.querySelector("#content");
const submitBtn = form.querySelector("button");
const notificationContainer = document.querySelector('.notification-container');
const notification = document.querySelector('.notification');
const closeBtn = notificationContainer.querySelector('.close');

const url = "http://localhost:3000/blogs";

submitBtn.addEventListener('click', submitBlog);

async function submitBlog(e) {
    if (form.reportValidity()) {
        e.preventDefault();

        let author = authorBox.value;
        let title = titleBox.value;
        let content = contentBox.value;

        authorBox.value = '';
        titleBox.value = '';
        contentBox.value = '';

        let blog = { title, content, author, profile: "images/default.jpeg", date: new Date().toISOString() };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blog)
            })
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            window.location.href = "index.html";

        } catch (error) {
            errorMsg(`Failed to fecth blog with id of ${id}`);
            console.log(error.message);
        }
    } else {
        errorMsg(`Form is formatted incorrectly`);
        console.log(error.message);
    }
}

function errorMsg(message) {
    notification.textContent = message;
    notificationContainer.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => { notificationContainer.classList.add('hidden'); });