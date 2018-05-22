// http://www.getmydeviceinfo.com/
// in case you want to check yours
var USER_AGENT = "Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Mobile Safari/537.36 GSA/8.4.6.21.arm64";
var APP_VERSION = USER_AGENT.substr(8);
var PLATFORM = "Linux armv8l"

// replace some properties in window.navigator to completely enforce this switch to mobile
function replaceNavigatorProperties() {
    var injectionScript = document.createElement("script");
    injectionScript.text =
        "navigator.__defineGetter__('userAgent', function(){return '" + USER_AGENT + "';});" +
        "navigator.__defineGetter__('appVersion', function(){return '" + APP_VERSION + "';});" +
        "navigator.__defineGetter__('platform', function(){return '" + PLATFORM + "';});";
    injectionScript.type = "text/javascript";
    document.documentElement.insertBefore(injectionScript, document.documentElement.firstChild)
}

// call it immediately
replaceNavigatorProperties();