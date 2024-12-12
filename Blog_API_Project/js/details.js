/**
 * Author: Ayden Hocking
 * Date: 12-7-2024
 * File: details.js
 */
"use strict";

const id = new URLSearchParams(window.location.search).get('id');
let blog;
const url = `http://localhost:3000/blogs/${id}`;

const notificationContainer = document.querySelector('.notification-container');
const notification = document.querySelector('.notification');
const closeBtn = notificationContainer.querySelector('.close');

window.addEventListener("DOMContentLoaded", fetchBlog);

async function fetchBlog() {
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw Error((`Error ${response.url} ${response.statusText}`));
        blog = await response.json();
        displayBlog(blog);
    } catch (error) {
        errorMsg(`Failed to fetch blog with id of ${id}`);
        console.log(error.message);
    }
}

function displayBlog(blog) {
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = blog.title;

    const headerContainer = document.createElement('div');
    headerContainer.classList.add('article-header');

    const avatar = document.createElement('img');
    avatar.src = blog.profile;
    avatar.width = 60;
    avatar.height = 60;
    avatar.classList.add('avatar');

    const authorAndDate = document.createElement('span');
    authorAndDate.textContent = `${blog.author} · ${new Date(blog.date).toDateString()}`;

    const editBtn = document.createElement('a');
    editBtn.classList.add('btn', 'edit');
    editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    editBtn.href = `/edit.html?id=${blog.id}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'delete');
    deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteBtn.addEventListener('click', async () => { await deleteBlog(blog.id); });

    wrapper.append(title);
    headerContainer.append(avatar, authorAndDate, editBtn, deleteBtn);

    const content = document.createElement('p');
    content.textContent = blog.content;

    wrapper.append(headerContainer, content);
}

async function deleteBlog(id) {
    const deleteUrl = `http://localhost:3000/blogs/${id}`;

    try {
        const response = await fetch(deleteUrl, { method: 'DELETE' });
        if (!response.ok) {
            throw Error(`Error ${response.url} ${response.statusText}`);
        }
        window.location.href = 'index.html';
    } catch (error) {
        errorMsg(`Failed to delete blog with id of ${id}`);
        console.log(error.message);
    }
}

function errorMsg(message) {
    notification.textContent = message;
    notificationContainer.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => { notificationContainer.classList.add('hidden'); });