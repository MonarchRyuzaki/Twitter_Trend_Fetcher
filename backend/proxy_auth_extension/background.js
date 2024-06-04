const config = {
  mode: "fixed_servers",
  rules: {
    singleProxy: {
      scheme: "http",
      host: "us-ca.proxymesh.com",
      port: 31280,
    },
    bypassList: ["foobar.com"],
  },
};
chrome.proxy.settings.set({ value: config, scope: "regular" }, function () {});
function callbackFn(details) {
  return {
    authCredentials: {
      username: "apitestinggod", // Change this to your username
      password: "apitesting123", // Change this to your password
    },
  };
}

chrome.webRequest.onAuthRequired.addListener(
  callbackFn,
  { urls: ["<all_urls>"] },
  ["blocking"]
);
