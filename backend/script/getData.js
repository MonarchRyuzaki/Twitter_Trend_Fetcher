async function getData() {
  let driver, publicIP;
  const trendingTopics = [];
  try {
    const options = new chrome.Options();
    options.setChromeBinaryPath("/usr/bin/brave-browser");
    options.addArguments("--headless=new");

    // Path to the custom proxy authentication extension
    const extensionPath = path.join(__dirname, "../proxy_auth_extension");
    // options.addArguments(`--load-extension=${extensionPath}`);

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    await driver.manage().window().maximize();
    await driver.get("https://x.com/i/flow/login");

    const usernameField = await driver.wait(
      until.elementLocated(By.xpath(xPaths.usernameField)),
      10000
    );
    const nextButton = await driver.wait(
      until.elementLocated(By.xpath(xPaths.nextButton)),
      10000
    );

    console.log("Before sending username");
    await usernameField.sendKeys(process.env.TWITTER_EMAIL);

    console.log("Before clicking next button");
    await nextButton.click();

    try {
      const interField = await driver.wait(
        until.elementLocated(By.xpath(xPaths.interField)),
        10000
      );
      await interField.sendKeys(process.env.TWITTER_USERNAME);
      const next2Button = await driver.wait(
        until.elementLocated(By.xpath(xPaths.next2Button)),
        10000
      );
      await next2Button.click();
    } catch (e) {
      // console.log("intermediate Part Did not Happen");
    }

    const passwordField = await driver.wait(
      until.elementLocated(By.xpath(xPaths.passwordField)),
      10000
    );
    await passwordField.sendKeys(process.env.TWITTER_PASSWORD);
    const loginButton = await driver.wait(
      until.elementLocated(By.xpath(xPaths.loginButton)),
      10000
    );
    await loginButton.click();
    await driver.wait(until.urlContains("/home"), 10000);

    await driver.get("https://www.x.com/home");

    for (let i = 3; i <= 7; i++) {
      const { xpathWithSpan, xpathWithoutSpan, xpathWithImg } =
        generateXPath(i);
      try {
        const trendingTopicsWithSpan = await driver.wait(
          until.elementLocated(By.xpath(xpathWithSpan)),
          10000
        );
        trendingTopics.push(await trendingTopicsWithSpan.getText());
      } catch (error) {
        try {
          const trendingTopicsWithoutSpan = await driver.wait(
            until.elementLocated(By.xpath(xpathWithoutSpan)),
            10000
          );
          trendingTopics.push(await trendingTopicsWithoutSpan.getText());
        } catch (error) {
          const trendingTopicsWithImg = await driver.wait(
            until.elementLocated(By.xpath(xpathWithImg)),
            10000
          );
          trendingTopics.push(await trendingTopicsWithImg.getText());
        }
      }
    }
    await driver.get("https://api.ipify.org?format=json");

    const body = await driver.wait(
      until.elementLocated(By.xpath(xPaths.ip)),
      10000
    );
    const bodyText = await body.getText();
    publicIP = JSON.parse(bodyText).ip;

    console.log("Trending topics:", trendingTopics);
    console.log("Public IP:", publicIP);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
  return { trendingTopics, publicIP };
}
export { getData };
