// http://www.getmydeviceinfo.com/
// in case you want to check yours
var USER_AGENT = "Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Mobile Safari/537.36 GSA/8.4.6.21.arm64";
var APP_VERSION = USER_AGENT.substr(8);
var PLATFORM = "Linux armv8l"

// replace some properties in window.navigator to completely enforce this switch to mobile
function replaceNavigatorProperties() {
    // only activate if we should!
    chrome.storage.sync.get(['enabled'], function (result) {
        if (result.enabled) {
            var injectionScript = document.createElement("script");
            injectionScript.text =
            "navigator.__defineGetter__('userAgent', function(){return '" + USER_AGENT + "';});" +
            "navigator.__defineGetter__('appVersion', function(){return '" + APP_VERSION + "';});" +
            "navigator.__defineGetter__('platform', function(){return '" + PLATFORM + "';});";
            injectionScript.type = "text/javascript";
            document.documentElement.insertBefore(injectionScript, document.documentElement.firstChild);
        }
    });
    // so heres the problem
    // chrome storage is asynchronous, and 1 in 50 page loads executes before storage completes
    // so we need to stall somehow
    sleep(100);
}

// call it immediately
replaceNavigatorProperties();

// im so sorry for using this
function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {}
}