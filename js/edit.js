/**
 * Author: Ayden Hocking
 * Date: 12-7-2024
 * File: edit.js
 */
"use strict";

const id = new URLSearchParams(window.location.search).get('id');
const url = `http://localhost:3000/blogs/${id}`;
let blog;

const form = document.querySelector('form');
const titleBox = form.querySelector('#title');
const contentBox = form.querySelector('#content');
const submitBtn = form.querySelector('button');
const notificationContainer = document.querySelector('.notification-container');
const notification = document.querySelector('.notification');
const closeBtn = notificationContainer.querySelector('.close');

window.addEventListener('DOMContentLoaded', fetchBlog);

async function fetchBlog() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(`Error ${response.url} ${response.statusText}`);
        }
        blog = await response.json();
        populateForm();
    } catch (error) {
        errorMsg(`Failed to fetch blog with id of ${id}`);
        console.log(error.message);
    }
}

function populateForm() {
    titleBox.value = blog.title;
    contentBox.value = blog.content;
}

submitBtn.addEventListener('click', updateBlog);

async function updateBlog(e) {
    if (form.reportValidity()) {
        e.preventDefault();

        blog.title = titleBox.value;
        blog.content = contentBox.value;
        blog.date = new Date().toISOString();
        titleBox.value = '';
        contentBox.value = '';
        blog = JSON.stringify(blog);

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: blog
            });

            if (!response.ok) {
                throw Error(`Error ${response.url} ${response.statusText}`);
            }
            window.location.href = `/details.html?id=${id}`;
        } catch (error) {
            errorMsg(`Failed to update blog with id of ${id}`);
            console.log(error.message);
        }
    }
}

function errorMsg(message) {
    notification.textContent = message;
    notificationContainer.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => { notificationContainer.classList.add('hidden'); });