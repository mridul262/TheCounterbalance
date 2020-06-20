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
  articleName = articleName.replace(/[^a-zA-Z ]/g, '+').replace(/' '/, '');
  return '&q=' + articleName;
};

const apiRequest = (articleRequest) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };
  console.log('reqQuery: ', articleRequest);
  fetch(newsAPI + articleRequest, requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  chrome.runtime.sendMessage(
    { message: 'initialise', activeTab },
    (response) => {
      // console.log(response.urlLeaning);
      response.urlKey && setTag('sourceName', response.urlKey);
      response.urlLeaning && setTag('leaning', response.urlLeaning);
      apiRequest(articleForRequest(response.articleName));
    }
  );
});
