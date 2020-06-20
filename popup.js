const setLeaningsTag = (content) => {
  console.log('Step 4');
  const leaningsTag = document.getElementById('leaning');
  leaningsTag.innerHTML = content;
  console.log('Inner HTML set');
};

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

window.addEventListener('DOMContentLoaded', () => {
  console.log('loaded');
  chrome.webNavigation.onCompleted.addListener(
    (details) => {
      let urlKey;
      for (i of Object.keys(nameToLeanings)) {
        if (details.url.includes(i)) {
          urlKey = i;
          break;
        }
      }
      setLeaningsTag(urlKey);
    },
    {
      url: urlObject(nameToLeanings), //urlObject(nameToLeanings),
    }
  );
});
