const setTag = (id, content) => {
  const htmlTag = document.getElementById(id);
  htmlTag.innerHTML = content;
};

const newsAPI =
  'https://newsapi.org/v2/everything?apiKey=d0d45c60aee349b79ffe4ad3029d56f9';

// Returns a string
const getArticleForRequest = (articleName) => {
  const newString = articleName.replace(/\s/g, '+').replace(/[^+a-zA-Z ]/g, '');
  return '&q=' + newString;
};

const makeCard = (data) => {
  const card = document.createElement('a');
  card.className = 'card';
  card.href = data.url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer'; 
  

  const makeCardImage = () => {
    const cardImage = document.createElement('div');
    cardImage.className = 'card__image';
    cardImage.style.backgroundImage = `url('${data.urlToImage}')`;
    return cardImage;
  };
  
  const makeCardContent = () => {
    const cardContent = document.createElement('div');
    cardContent.className = 'card__content';
  
    const cardTitle = document.createElement('h3');
    cardTitle.className = 'card__title card__overflow-hidden';
    cardTitle.textContent = data.title;
  
    const cardSite = document.createElement('p');
    cardSite.className = 'card__site card__overflow-hidden';
    console.log(data);

    cardSite.textContent = data.author;
  
    const cardPreview = document.createElement('p');
    cardPreview.className = 'card__preview';
    cardPreview.textContent = data.content;
  
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardSite);
    cardContent.appendChild(cardPreview);
  
    return cardContent;
  }

  card.appendChild(makeCardImage());
  card.appendChild(makeCardContent());

  return card;
}

const createCards = (data) => {
  const container = document.getElementById('container');
  for (const cardData of data.articles) {
    container.appendChild(makeCard(cardData))
  }
};

const apiRequest = (articleRequest) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  console.log('reqQuery: ', articleRequest);
  let jsonResponse;
  fetch(newsAPI + articleRequest, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      data && createCards(data);
    });
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  chrome.runtime.sendMessage(
    { message: 'initialise', activeTab },
    (response) => {
      console.log(response);
      response.urlLeaning && setTag('title', response.urlLeaning);
      apiRequest(getArticleForRequest(response.articleName));
    }
  );
});
