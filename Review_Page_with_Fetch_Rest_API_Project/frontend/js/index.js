const url = 'http://localhost:3000/reviews';
let reviews = [];

const totalSpan = document.querySelector('.total');
const scaleSpan = document.querySelector('.scale');
const averageDiv = document.querySelector('.average');
const middleSection = document.querySelector('.middle-section');
const reviewContainer = document.querySelector('.review-container');
const form = document.querySelector('form');
const ratingBox = form.querySelector('#rating');
const feedbackBox = form.querySelector('#feedback');
const submitBtn = form.querySelector('button');
const orderElement = document.querySelector('#order');

window.addEventListener('DOMContentLoaded', fetchReviews);

async function fetchReviews() {
    try {
        const response = await fetch(`${url}?_sort=-rating`);
        if (!response.ok)
            throw Error(`Error ${response.url} $${response.statusText}`);
        reviews = await response.json();
        loadStats();
        loadReviews();
    } catch (error) {
        console.log(error.message);
    }
}

orderElement.addEventListener('change', sortReviews);

function sortReviews() {
    const order = orderElement.value;
    if (order === 'ascending') {
        reviews.sort((a, b) => a.rating - b.rating);
    } else {
        reviews.sort((a, b) => b.rating - a.rating);
    }
    loadReviews();
}

function loadStats() {
    let numberOfReviews = reviews.length;
    let total = reviews.reduce((accumulator, review) => accumulator + parseInt(review.rating), 0);
    let average = (total / numberOfReviews).toFixed(1);
    let scale;

    if (average >= 4.5)
        scale = 'Excellent';
    else if (average >= 4)
        scale = 'Good';
    else if (average >= 3)
        scale = 'Fair';
    else if (average >= 2)
        scale = 'Poor';
    else
        scale = 'Awful';
    totalSpan.textContent = `${numberOfReviews} Reviews`;
    averageDiv.textContent = average;
    scaleSpan.textContent = scale;

    if (middleSection.classList.contains('hidden'))
        middleSection.classList.remove('hidden');
}

function loadReviews() {
    const fragment = document.createDocumentFragment();
    reviews.forEach(r => fragment.append(generateReview(r)));
    reviewContainer.innerHTML = '';
    reviewContainer.append(fragment);
}

function generateReview(r) {
    const container = document.createElement('div');
    container.classList.add('review-item', 'card', 'flex');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('btn-container');
    const editBtn = document.createElement('a');
    editBtn.classList.add('btn', 'edit');
    editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    editBtn.href = `/edit.html?id=${r.id}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'delete');
    deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteBtn.addEventListener('click', async () => { await deleteReview(r.id); });
    buttonContainer.append(editBtn, deleteBtn);

    const starContainer = document.createElement('div');
    starContainer.classList.add('star-container');

    for (let i = 0; i < r.rating; i++) {
        const star = document.createElement('i');
        star.classList.add('fa-solid', 'fa-star');
        starContainer.append(star);
    }

    for (let i = r.rating; i < 5; i++) {
        const star = document.createElement('i');
        star.classList.add('fa-regular', 'fa-star');
        starContainer.append(star);
    }

    const feedbackContainer = document.createElement('div');
    feedbackContainer.classList.add('feedback');
    feedbackContainer.textContent = r.feedback;

    container.append(buttonContainer, starContainer, feedbackContainer);
    return container;
}

submitBtn.addEventListener('click', submitReview);

async function submitReview(e) {
    if (form.reportValidity()) {
        e.preventDefault();
        let rating = parseInt(ratingBox.value);
        let feedback = feedbackBox.value;

        ratingBox.value = '';
        feedbackBox.value = '';

        let review = { rating, feedback };


        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(review)
            })
            if (!response.ok)
                throw Error((`Error ${response.url} ${response.statusText}`));

            review = await response.json();

            reviews.push(review);
            sortReviews();
            loadStats();
        } catch (error) {
            console.log(error.message);
        }


    }
}

async function deleteReview(id) {
    const response = await fetch(`${url}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw Error(`Error ${response.url} ${response.statusText}`);
    }
    let index = reviews.findIndex(r => r.id === id);
    if (index !== -1) {
        reviews.splice(index, 1);
        loadStats();
        loadReviews();
    }
}