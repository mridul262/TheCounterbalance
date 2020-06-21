const nameToLeanings = {
  'bbc.com': 'Left-leaning',
  'cnn.com': 'Left-leaning',
  'bloomberg.com': 'Left-leaning',
  'bleacherreport.com': 'Left-leaning',
  'bbc-sport': 'Left-leaning',
  'theguardian.com': 'Left-leaning',
  'independent.co.uk': 'Left-leaning',
  'mirror.co.uk': 'Left-leaning',
  'hindustantimes.com': 'Left-leaning',
  'nytimes.com': 'Left-leaning',
  'aljazeera.com': 'Left-leaning',
  'foxnews.com': 'Right-leaning',
  'telegraph.co.uk': 'Right-leaning',
  'express.co.uk': 'Right-leaning',
  'dailymail.co.uk': 'Right-leaning',
  'thesun.co.uk': 'Right-leaning',
  'timesofindia.indiatimes.com': 'Right-leaning',
  'newscientist.com': 'Left-leaning',
};

const leaningsToName = {
  left: [
    'BBC News',
    // 'bbc-news',
    'CNN',
    // 'cnn',
    'Al Jazeera English',
    // 'al-jazeera-english',
    // 'bleacher-report',
    'Bleacher Report',
    'bloomberg',
    'bbc-sport',
    'The Guardian',
    'independent',
    'Mirror Online',
    'Hindustan Times',
    'New York Times',
    'New Scientist',
  ],
  right: [
    'Telegraph.co.uk',
    'Express',
    'Daily Mail',
    'The Sun',
    // 'the-american-conservative',
    'The American Conservative',
    'Fox News',
    // 'fox-news',
    'The Times of India',
    // 'the-times-of-india',
  ],
};

const urlObject = (dataObject) => {
  const urlArray = [];
  for (i of Object.keys(dataObject)) {
    urlArray.push({ hostSuffix: i });
  }

  return urlArray;
};

let articleName;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'getArticleName') {
    articleName = request.articleName;
    sendResponse('success');
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'initialise') {
    let urlKey;
    for (i of Object.keys(nameToLeanings)) {
      if (request.activeTab.url.includes(i)) {
        urlKey = i;
        break;
      }
    }
    const data = {
      message: 'urlData',
      urlKey,
      urlLeaning: nameToLeanings[urlKey],
      articleName,
    };
    sendResponse(data);
  }
});
