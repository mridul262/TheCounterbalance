const nameToLeanings = {
  'bbc.com': 'Left-leaning',
  'cnn.com': 'Left-leaning',
  'bloomberg.com': 'Left-leaning',
  'bleacherreport.com': 'Left-leaning',
  'bbc-sport': 'Left-leaning',
  'theguardian.com': 'Left-leaning',
  'independent.co.uk': 'Left-leaning',
  'mirror.co.uk': 'Left-leaning',
  'hindustantimes.com': 'Left-leaning',
  'nytimes.com': 'Left-leaning',
  'aljazeera.com': 'Left-leaning',
  'foxnews.com': 'Right-leaning',
  'telegraph.co.uk': 'Right-leaning',
  'express.co.uk': 'Right-leaning',
  'dailymail.co.uk': 'Right-leaning',
  'thesun.co.uk': 'Right-leaning',
  'timesofindia.indiatimes.com/': 'Right-leaning',
  'newscientist.com': 'Left-leaning',
};

const leaningsToName = {
  left: [
    'BBC News',
    // 'bbc-news',
    'CNN',
    // 'cnn',
    'Al Jazeera English',
    // 'al-jazeera-english',
    // 'bleacher-report',
    'Bleacher Report',
    'bloomberg',
    'bbc-sport',
    'The Guardian',
    'independent',
    'Mirror Online',
    'Hindustan Times',
    'New York Times',
    'New Scientist',
  ],
  right: [
    'Telegraph.co.uk',
    'Express',
    'Daily Mail',
    'The Sun',
    // 'the-american-conservative',
    'The American Conservative',
    'Fox News',
    // 'fox-news',
    'The Times of India',
    // 'the-times-of-india',
  ],
};

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

    cardSite.textContent = data.source.name;

    const cardPreview = document.createElement('p');
    cardPreview.className = 'card__preview';
    cardPreview.textContent = data.content;

    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardSite);
    cardContent.appendChild(cardPreview);

    return cardContent;
  };

  card.appendChild(makeCardImage());
  card.appendChild(makeCardContent());

  return card;
};

const createCards = (data, urlLeaning) => {
  const container = document.getElementById('container');

  for (const cardData of data.articles) {
    // Check leanings of articles and filter responses
    if (
      urlLeaning === 'Left-leaning' &&
      leaningsToName.right.includes(cardData.source.name)
    ) {
      container.appendChild(makeCard(cardData));
    } else if (
      urlLeaning === 'Right-leaning' &&
      leaningsToName.left.includes(cardData.source.name)
    ) {
      container.appendChild(makeCard(cardData));
    }
  }
};

const apiRequest = (articleRequest, urlLeaning) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  // let jsonResponse;
  fetch(newsAPI + articleRequest, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      data && createCards(data, urlLeaning);
    });
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  chrome.runtime.sendMessage(
    { message: 'initialise', activeTab },
    (response) => {
      if (response.urlLeaning) {
        setTag('title', response.urlLeaning);
        document.getElementById('title').textContent = response.urlLeaning;

        if (response.articleName) {
          document.getElementById('description').textContent =
            'Take a look at the other side.';
          apiRequest(
            getArticleForRequest(response.articleName),
            response.urlLeaning
          );
        } else {
          document.getElementById('description').textContent =
            "Can't find alternate news sites. Try searching on google.";
        }
      } else {
        document.getElementById('title').textContent = "Can't find a leaning";
        document.getElementById('description').textContent =
          'Come back next time when we have finished training our machine-learning algorithms.';
        document.body.style.paddingBottom = '10px';
      }
    }
  );
});
