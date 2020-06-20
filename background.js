const nameToLeanings = {
  'bbc.com': 'left',
  'cnn.com': 'left',
  'foxnews.com': 'right',
};
const leaningsToName = { left: ['bbc.com', 'cnn.com'], right: ['foxnews.com'] };

const urlObject = (dataObject) => {
  const urlArray = [];
  for (i of Object.keys(dataObject)) {
    urlArray.push({ hostSuffix: i });
  }

  return urlArray;
};
chrome.webNavigation.onCompleted.addListener(
  () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      console.warn('Counterbalance Extension: ', tabs[0]);
    });
  },
  {
    url: [{ hostSuffix: 'bbc.com' }], //urlObject(nameToLeanings),
  }
);
