const setTag = (id, content) => {
  console.log('Step 4');
  const htmlTag = document.getElementById(id);
  htmlTag.innerHTML = content;
  console.log('Inner HTML set');
};

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  let articleName;
  chrome.runtime.sendMessage({ message: 'getArticleName' }, (response) => {
    articleName = response;
    console.log(articleName);
  });
  chrome.runtime.sendMessage(
    { message: 'initialise', activeTab },
    (response) => {
      console.log(response.urlLeaning);
      response.urlKey && setTag('sourceName', response.urlKey);
      response.urlLeaning && setTag('leaning', response.urlLeaning);
    }
  );
});
