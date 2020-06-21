const nameToLeanings = {
  'bbc.com': 'Left-leaning',
  'cnn.com': 'Left-leaning',
  'foxnews.com': 'Right-leaning',
};

const leaningsToName = { left: ['bbc.com', 'cnn.com'], right: ['foxnews.com'] };

const urlObject = (dataObject) => {
  const urlArray = [];
  for (i of Object.keys(dataObject)) {
    urlArray.push({ hostSuffix: i });
  }

  return urlArray;
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
    let urlKey;
    for (i of Object.keys(nameToLeanings)) {
      if (request.activeTab.url.includes(i)) {
        urlKey = i;
        break;
      }
    }
    const data = {
      message: 'urlData',
      urlKey,
      urlLeaning: nameToLeanings[urlKey],
      articleName,
    };
    sendResponse(data);
  }
});
