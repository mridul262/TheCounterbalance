const articleTitle = document.querySelector('h1').innerHTML;
console.log('articleTitle', articleTitle);
// const articleTitle = h1Tags[0].innerHTML;

chrome.runtime.sendMessage(
  { message: 'getArticleName', articleTitle },
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
