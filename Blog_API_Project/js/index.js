/**
 * Author: Ayden Hocking
 * Date: 12-7-2024
 * File: index.js
 */
"use strict";

const MAX_LENGTH = 50;
const PAGE_LIMIT = 12;

const url = "http://localhost:3000/blogs";

let blogs = [];
let pageNum = 1;
let totalPageNum = 1;
let searchInput;

const blogContainer = document.querySelector(".articles-wrapper");
const paginationContainer = document.querySelector(".pagination-container");
const searchBarText = document.querySelector(".search-bar input");
const notificationContainer = document.querySelector('.notification-container');
const notification = document.querySelector('.notification');
const closeBtn = notificationContainer.querySelector('.close');

window.addEventListener("DOMContentLoaded", fetchBlogs);

searchBarText.addEventListener("input", updateSearch);

async function updateSearch(e) {
    searchInput = e.target.value;
    pageNum = 1;
    await fetchBlogs();
}

async function fetchBlogs() {
    try {
        let searchReponse = `${url}?_page=${pageNum}&_limit=${PAGE_LIMIT}&_sort=date&_order=desc`;
        if (searchInput) {
            searchReponse += `&q=${searchInput}`;
        }
        const response = await fetch(searchReponse);
        if (!response.ok)
            throw Error(`Error ${response.url} ${response.statusText}`);
        blogs = await response.json();
        const totalBlogs = response.headers.get("x-total-count");
        totalPageNum = Math.ceil(totalBlogs / PAGE_LIMIT);

        loadBlogs();
        generateButtons();
    } catch (error) {
        errorMsg("Failed to fetch blogs");
        console.log(error.message);
    }
}

function loadBlogs() {
    const fragment = document.createDocumentFragment();
    blogs.forEach((blog) => fragment.append(generateBlog(blog)));
    blogContainer.innerHTML = "";
    blogContainer.append(fragment);
}

function generateBlog(blog) {
    const container = document.createElement("a");
    container.href = `details.html?id=${blog.id}`;
    container.classList.add("blog-item", "card", "flex");

    const headerContainer = document.createElement('div');
    headerContainer.classList.add('card-header');

    const avatar = document.createElement('img');
    avatar.src = blog.profile;
    avatar.width = 60;
    avatar.height = 60;
    avatar.classList.add('avatar');

    const authorAndDate = document.createElement('span');
    authorAndDate.textContent = `${blog.author} · ${new Date(blog.date).toDateString()}`;
    headerContainer.append(avatar, authorAndDate);

    const bodyContainer = document.createElement('div');
    bodyContainer.classList.add('card-body');
    const title = document.createElement('h3');
    title.textContent = blog.title;
    const content = document.createElement('p');
    content.textContent = truncateFunction(blog.content, MAX_LENGTH);
    bodyContainer.append(title, content);

    container.append(headerContainer, bodyContainer);
    return container;
}

function truncateFunction(content, MAX_LENGTH) {
    if (content.length > MAX_LENGTH) {
        return content.slice(0, MAX_LENGTH) + "...";
    }
    return content;
}
function generateButtons() {
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPageNum; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("page-btn");
        if (i === pageNum)
            pageButton.classList.add("active");
        pageButton.addEventListener("click", () => {
            pageNum = i;
            fetchBlogs();
        });
        paginationContainer.appendChild(pageButton);
    }
}

function errorMsg(message) {
    notification.textContent = message;
    notificationContainer.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => { notificationContainer.classList.add('hidden'); });