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
      jsonResponse = data;
      console.log('inside data', data);
    });

  return jsonResponse;
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  chrome.runtime.sendMessage(
    { message: 'initialise', activeTab },
    (response) => {
      // console.log(response.articleName);
      response.urlKey && setTag('sourceName', response.urlKey);
      response.urlLeaning && setTag('leaning', response.urlLeaning);
      let jsonResponse = apiRequest(articleForRequest(response.articleName));
      console.log(jsonResponse);
    }
  );
});
