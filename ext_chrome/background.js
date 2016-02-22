var ALLOW_COOKIES = ["nytimes", "ft.com"]

function changeRefer(details) {
  foundReferer = false;
  foundUA = false

  var reqHeaders = details.requestHeaders.filter(function(header) {
    // return if not a cookie
    if (header.name !== 'Cookie') {
      return header;
    }

    ALLOW_COOKIES.map(function(url) {
      if (details.url.includes(url))
        return header;
    });

  }).map(function(header) {

    if (header.name === "Referer") {
      header.value = "https://www.google.com/";
      foundReferer = true;
    }
    if (header.name === "User-Agent") {
      header.value = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
      foundUA = true;
    }
    return header;
  })

  // append referer
  if (!foundReferer) {
    reqHeaders.push({
      "name": "Referer",
      "value": "https://www.google.com/"
    })
  }
  if (!foundUA) {
    reqHeaders.push({
      "name": "User-Agent",
      "value": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
    })
  }
  console.log(reqHeaders);
  return {
    requestHeaders: reqHeaders
  };
}

function blockCookies(details) {
  for (var i = 0; i "],
    types: ["main_frame"],
  }, ["requestHeaders", "blocking"]);

chrome.webRequest.onHeadersReceived.addListener(blockCookies, {
  urls: [""],
  types: ["main_frame"],
}, ["responseHeaders", "blocking"]);
