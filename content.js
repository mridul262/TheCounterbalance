chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'getArticleName') {
    const h1Tags = document.getElementsByTagName('h1');
    const articleTitle = h1Tags[0].innerHTML;

    sendResponse(articleTitle);
  }
});
