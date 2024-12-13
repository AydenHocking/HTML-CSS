'use strict';
/*  json data is from https://api.sampleapis.com/ */
//part1
function fetchIcedCoffee() {
    fetch('data/iced.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json();
        })
        .then(data => addDrinks(data))
        .catch(error => {
            console.error('Error in fetching iced coffee')
        });
}
function fetchHotCoffee() {
    fetch('data/hot.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response.json();
        })
        .then(data => addDrinks(data))
        .catch(error => {
            console.error('Error in fetching hot coffee')
        });
}
//part2
function addDrinks(drinks) {
    const container = document.querySelector('.container');
    container.textContent = "";
    drinks.forEach(element => {
        const articleElement = document.createElement('article');
        articleElement.classList.add('card');
        container.appendChild(articleElement);
        const imgElement = document.createElement('img');
        imgElement.src = element.image;
        imgElement.alt = element.title;
        articleElement.appendChild(imgElement);
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        articleElement.appendChild(contentDiv);
        const h3Element = document.createElement('h3');
        h3Element.textContent = element.title;
        contentDiv.appendChild(h3Element);
        const pElement = document.createElement('p');
        pElement.textContent = `${element.description} Ingredients include: `;
        contentDiv.appendChild(pElement);
        const ingredientsDiv = document.createElement('div');
        ingredientsDiv.classList.add('ingredients');
        contentDiv.appendChild(ingredientsDiv);
        element.ingredients.forEach(ingredient => {
            const ingredientDiv = document.createElement('div');
            ingredientDiv.textContent = ingredient;
            ingredientDiv.classList.add('ingredient');
            ingredientsDiv.appendChild(ingredientDiv);
        });
    });
}
const icedCoffee = document.querySelector('button');
const hotCoffee = document.querySelector('button:nth-of-type(2)');
icedCoffee.addEventListener('click', fetchIcedCoffee);
hotCoffee.addEventListener('click', fetchHotCoffee);