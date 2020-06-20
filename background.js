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
  (details) => {
    console.log(details.url);
  },
  {
    url: [{ hostContains: 'bbc.com' }], //urlObject(nameToLeanings),
  }
);
