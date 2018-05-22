// change all requests to instagram.com so their headers have a mobile user agent
// This may not be neccessary at all if I am modifying window.navigator stuff
chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
        var manifest = chrome.runtime.getManifest();
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
                details.requestHeaders[i].value = "Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Mobile Safari/537.36 GSA/8.4.6.21.arm64";
                break;
            }
        }
        return {requestHeaders: details.requestHeaders};
    },
    {urls: ["*://*.instagram.com/*"]},
    ["blocking", "requestHeaders"]
);

// remove XFrame stuff so we can embed instagram in an iframe
