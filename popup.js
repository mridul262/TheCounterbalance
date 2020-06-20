const setTag = (id, content) => {
  // console.log('Step 4');
  const htmlTag = document.getElementById(id);
  htmlTag.innerHTML = content;
  // console.log('Inner HTML set');
};

const newsAPI =
  'https://newsapi.org/v2/everything?apiKey=d0d45c60aee349b79ffe4ad3029d56f9';

// Returns a string
const articleForRequest = (articleName) => {
  const newString = articleName.replace(/\s/g, '+').replace(/[^+a-zA-Z ]/g, '');
  // console.log('v1: ', newString);
  return '&q=' + newString;
};

const setDataToCard = (data) => {
  document.querySelector('.card').href = data.articles[0].url;
  document.querySelector('.card__title').innerHTML = data.articles[0].title;
  document.querySelector('.card__site').innerHTML = data.articles[0].author;
  document.querySelector('.card__preview').innerHTML = data.articles[0].content;
  document.querySelector(
    '.card__image'
  ).style.backgroundImage = `url('${data.articles[0].urlToImage}')`;
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
      data && setDataToCard(data);
      // console.log('inside data', data);
    });
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  chrome.runtime.sendMessage(
    { message: 'initialise', activeTab },
    (response) => {
      // console.log(response.articleName);
      // response.urlKey && setTag('sourceName', response.urlKey);
      response.urlLeaning && setTag('title', response.urlLeaning);
      apiRequest(articleForRequest(response.articleName));
      // console.log(jsonResponse);
    }
  );
});
