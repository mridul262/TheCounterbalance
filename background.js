const nameToLeanings = {
  'bbc.com': 'Left',
  'cnn.com': 'Left',
  'foxnews.com': 'Right',
};
const leaningsToName = { left: ['bbc.com', 'cnn.com'], right: ['foxnews.com'] };

const urlObject = (dataObject) => {
  const urlArray = [];
  for (i of Object.keys(dataObject)) {
    urlArray.push({ hostSuffix: i });
  }

  return urlArray;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'initialise') {
    console.log(request.activeTab.url);
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
    };
    sendResponse(data);
    // chrome.runtime.sendMessage(data);
  }
});
