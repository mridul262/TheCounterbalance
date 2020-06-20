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

// const port = chrome.runtime.connect({ name: 'defaultPort' });

chrome.webNavigation.onCompleted.addListener(
  (details) => {
    let urlKey;
    for (i of Object.keys(nameToLeanings)) {
      if (details.url.includes(i)) {
        urlKey = i;
        break;
      }
    }
    console.log('Step 1');
    setLeaningsTag(nameToLeanings[urlKey]);
    // chrome.runtime.sendMessage(
    //   {
    //     action: 'urlDetails',
    //     urlKey,
    //     urlLeaning: nameToLeanings[urlKey],
    //   },
    //   (response) => {
    //     // console.log(response.farewell);
    //   }
    // );

    // port.postMessage({
    //   action: 'urlDetails',
    //   urlKey,
    //   urlLeaning: nameToLeanings[urlKey],
    // });
  },
  {
    url: urlObject(nameToLeanings), //urlObject(nameToLeanings),
  }
);

const setLeaningsTag = (content) => {
  console.log('Step 4');
  const leaningsTag = document.getElementById('leaning');
  leaningsTag.innerHTML = content;
  console.log('Inner HTML set');
};

// // chrome.runtime.onConnect.addListener((port) => {
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log('Step 2');
//   if (request.action === 'urlDetails') {
//     console.log('Step 3');
//     setLeaningsTag(request.urlLeaning);
//     // sendResponse({ farewell: 'goodbye' });
//     return true;
//     // this is required to use sendResponse asynchronously
//     // return true;

//     // if (port.name === 'defaultPort') {
//     //   port.onMessage.addListener((msg) => {
//     //     if (msg.action === 'urlDetails') {
//     //       setLeaningsTag(msg.urlLeaning);
//     //     }
//     //   });
//     // }
//   }
// });
