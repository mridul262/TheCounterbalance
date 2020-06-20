const setTag = (id, content) => {
  console.log('Step 4');
  const htmlTag = document.getElementById(id);
  htmlTag.innerHTML = content;
  console.log('Inner HTML set');
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  chrome.runtime.sendMessage(
    { message: 'initialise', activeTab },
    (response) => {
      console.log(response.urlLeaning);
      response.urlKey && setTag('sourceName', response.urlKey);
      response.urlLeaning && setTag('leaning', response.urlLeaning);
    }
  );
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === 'urlData') {
//     // console.log(request.urlLeaning);
//     console.log('hellolololo');
//   }
// });
