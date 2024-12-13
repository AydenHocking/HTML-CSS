"use strict";

const MAX_LENGTH = 200;

const authors = ['Tyrone', 'Ava', 'Elijah', 'Lucas', 'Ebony', 'Keisha', 'Jemila', 'Daniel'];

const articles = [
  {
    title: 'CSS Selectors',
    author: 'Tyrone',
    date: new Date(2023, 1, 20),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, dolore? Eveniet numquam quam qui quae laboriosam maxime deleniti aperiam quasi culpa veniam, voluptatibus molestias soluta error ratione assumenda sunt. Sapiente doloribus, nulla a tempora assumenda nostrum est enim corporis fugit quasi ipsam eveniet distinctio impedit dolorum eum dolor. Distinctio, reiciendis!'
  },

  {
    title: 'Cascading',
    author: 'Jemila',
    date: new Date(2023, 2, 1),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptatum iste? Nisi exercitationem, consectetur unde ab placeat nemo deserunt consequuntur.'
  },

  {
    title: 'CSS Grid',
    author: 'Keisha',
    date: new Date(2023, 2, 12),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur laboriosam aliquam debitis dolores dolorem corporis ipsum itaque culpa, et eaque? Aliquam, est eveniet voluptatem nemo doloremque esse odit dolorum dicta consectetur ipsam corrupti perspiciatis voluptas cupiditate et sapiente. Eligendi modi fugiat pariatur facere, molestiae nihil accusamus animi a impedit laboriosam tempora, eum in iure tenetur fugit praesentium consectetur mollitia ut obcaecati delectus ipsa dolores commodi? Rerum, temporibus velit eum iste praesentium modi amet molestiae illum enim quos pariatur quasi vero quidem, minus placeat assumenda recusandae fugit sunt voluptatem est neque qui! Ut optio quis accusamus placeat ipsa laboriosam laborum debitis.'
  }
];

articles.forEach(article => {
  addEntry(article);
});


/**
 * This function creates a DOM elment with information from the article object, and adds the element into the DOM.
 * @param {object} article - an article
 */
function addEntry(article) {
  //step4
  const articleCard = document.createElement('article');
  articleCard.classList.add('article-container');
  document.querySelector('.articles-wrapper').appendChild(articleCard)

  //step5
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn');
  deleteButton.textContent = '✕';
  articleCard.appendChild(deleteButton);

  //step6
  const articleHeader = document.createElement('div');
  articleHeader.classList.add('article-header');
  const imgHeader = document.createElement('img');
  imgHeader.classList.add('avatar');
  if (authors.includes(article.author)) {
    const authorIndex = authors.indexOf(article.author);
    imgHeader.src = `images/avatar${authorIndex}.png`;
  } else {
    imgHeader.src = 'images/default.jpeg';
  }
  imgHeader.alt = 'avatar picture';
  const nameDate = document.createElement('div');
  nameDate.textContent = `${article.author} · ${article.date.toDateString()}`;
  articleHeader.append(imgHeader, nameDate);
  articleCard.appendChild(articleHeader);

  //step7
  const articleBody = document.createElement('div');
  articleBody.classList.add('article-body');
  const articleTitle = document.createElement('h3');
  articleTitle.textContent = `${article.title}`;
  const articleContent = document.createElement('p');

  //step8
  //step9
  if (`${article.content.length}` <= MAX_LENGTH) {
    articleContent.textContent = `${article.content}`;
    articleBody.appendChild(articleTitle);
    articleBody.appendChild(articleContent);
  } else {
    //step10
    articleContent.textContent = article.content.substring(0, MAX_LENGTH);
    const threeDotSpan = document.createElement('span');
    threeDotSpan.textContent = '...';
    const hiddenSpan = document.createElement('span');
    article.content.substring(MAX_LENGTH);
    const hiddenContentBtn = document.createElement('button');
    hiddenContentBtn.classList.add('btn');
    hiddenContentBtn.textContent = 'Read More';
    articleBody.appendChild(articleTitle);
    articleContent.appendChild(threeDotSpan);
    articleContent.appendChild(hiddenSpan);
    articleBody.appendChild(articleContent);
    articleBody.appendChild(hiddenContentBtn);
  }
  articleCard.appendChild(articleBody);
}




