chrome.runtime.sendMessage(
  {
    message: 'getArticleName',
    articleName: document.querySelector(`head > meta[property="og:title"]`)
      .content,
  },
  (response) => {
    console.log(response);
  }
);

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log('Step 1 content');
//   if (request.message === 'getArticleName') {
//     const h1Tags = document.getElementsByTagName('h1');
//     console.log(h1Tags);
//     const articleTitle = h1Tags[0].innerHTML;
//     // sendResponse(articleTitle);
//     sendResponse(h1Tags);
//   }
// });
