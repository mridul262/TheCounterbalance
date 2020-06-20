// const nameToLeanings = {
//   'bbc.com': 'left',
//   'cnn.com': 'left',
//   'foxnews.com': 'right',
// };
// const leaningsToName = { left: ['bbc.com', 'cnn.com'], right: ['foxnews.com'] };

// const urlObject = (dataObject) => {
//   const urlArray = [];
//   for (i of Object.keys(dataObject)) {
//     urlArray.push({ hostSuffix: i });
//   }

//   return urlArray;
// };

// // const port = chrome.runtime.connect({ name: 'defaultPort' });
// const messageObject = { action: '', urlKey: '', urlLeaning: '' };
// chrome.webNavigation.onCompleted.addListener(
//   (details) => {
//     let urlKey;
//     for (i of Object.keys(nameToLeanings)) {
//       if (details.url.includes(i)) {
//         urlKey = i;
//         break;
//       }
//     }
//     console.log('Step 1');
//     // chrome.runtime.sendMessage(
//     //   {
//     //     action: 'urlDetails',
//     //     urlKey,
//     //     urlLeaning: nameToLeanings[urlKey],
//     //   },
//     //   (response) => {
//     //     // console.log(response.farewell);
//     //   }
//     // );
//     messageObject['action'] = 'urlDetails';
//     messageObject['urlKey'] = urlKey;
//     messageObject['urlLeaning'] = nameToLeanings[urlKey];
//   },
//   {
//     url: urlObject(nameToLeanings), //urlObject(nameToLeanings),
//   }
// );

// chrome.runtime.onConnect.addListener((port) => {
//   port.onMessage.addListener((msg) => {
//     if (msg.action == 'Initialise') {
//       port.postMessage(messageObject);
//     }
//   });
// });
