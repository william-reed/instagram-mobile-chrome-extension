let enableMobile = document.getElementById('enableMobile');

enableMobile.onclick = function (element) {
    let enable = element.srcElement.checked;
    chrome.storage.sync.set({'enabled': enable});

    // reload to reflect those changes
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        // if it is instagram, reload
        console.log(tabs[0])
        if (tabs[0].url.includes("https://www.instagram.com")) {
            chrome.tabs.reload(tabs[0].id);
        }
    });
};

// get value of checkbox from settings
chrome.storage.sync.get(['enabled'], function (result) {
    enableMobile.checked = result.enabled;
});