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
      username: "apitestinggod",
      password: "apitesting123",
    },
  };
}

chrome.webRequest.onAuthRequired.addListener(
  callbackFn,
  { urls: ["<all_urls>"] },
  ["blocking"]
);
