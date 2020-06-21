const nameToLeanings = {
  'bbc.com': 'Left-leaning',
  'cnn.com': 'Left-leaning',
  'foxnews.com': 'Right-leaning',
};

const leaningsToName = { left: ['bbc.com', 'cnn.com'], right: ['foxnews.com'] };

const iconPath = {
  'Left-leaning': './assets/left-leaning-128.png',
  'Right-leaning': './assets/right-leaning-128.png',
  invalid: './assets/invalid-128.png',
};

const urlObject = (dataObject) => {
  const urlArray = [];
  for (i of Object.keys(dataObject)) {
    urlArray.push({ hostSuffix: i });
  }

  return urlArray;
};

const findUrlKey = (url) => {
  for (key of Object.keys(nameToLeanings)) {
    if (url.includes(key)) {
      return key;
    }
  }

  return '';
};

let articleName;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'getArticleName') {
    articleName = request.articleName;
    sendResponse('success');
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'initialise') {
    const urlKey = findUrlKey(request.activeTab.url);

    const data = {
      message: 'urlData',
      urlKey,
      urlLeaning: nameToLeanings[urlKey],
      articleName,
    };

    sendResponse(data);
  }
});

chrome.webNavigation.onCompleted.addListener(({ url }) => {
  const urlKey = findUrlKey(url);

  const urlLeaning = nameToLeanings[urlKey];
  chrome.browserAction.setIcon({ path: iconPath[urlLeaning] });
});
