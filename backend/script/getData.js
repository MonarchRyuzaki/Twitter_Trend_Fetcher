import "chromedriver";
import path from "path";
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import { __dirname, delay, getCode } from "../utils/utils.js";
import { xPaths } from "./xPaths.js";

function generateXPath(i) {
  const xpathWithSpan = xPaths.xpathWithSpan(i);
  const xpathWithoutSpan = xPaths.xpathWithoutSpan(i);
  const xpathWithImg = xPaths.xpathWithImg(i);

  return { xpathWithSpan, xpathWithoutSpan, xpathWithImg };
}

async function getData() {
  let driver, publicIP;
  const trendingTopics = [];
  try {
    const options = new chrome.Options();
    options
      .setChromeBinaryPath("/usr/bin/brave-browser")
      .addArguments("--disable-gpu")
      .addArguments("--no-sandbox")
      .addArguments("--disable-dev-shm-usage")
      .addArguments("--disable-setuid-sandbox")
      .addArguments("--disable-extensions")
      .addArguments("--disable-infobars")
      .addArguments("--disable-notifications")
      .addArguments("--disable-popup-blocking")
      .addArguments("--disable-sync")
      .addArguments("--disable-accelerated-2d-canvas")
      .addArguments("--disable-accelerated-video-decode")
      .addArguments("--disable-background-networking")
      .addArguments("--disable-background-timer-throttling")
      .addArguments("--disable-backgrounding-occluded-windows")
      .addArguments("--disable-breakpad")
      .addArguments("--disable-client-side-phishing-detection")
      .addArguments("--disable-component-update")
      .addArguments("--disable-default-apps")
      .addArguments("--disable-features=site-per-process")
      .addArguments("--disable-hang-monitor")
      .addArguments("--disable-prompt-on-repost")
      .addArguments("--disable-translate")
      .addArguments("--disk-cache-size=0")
      .addArguments("--media-cache-size=0")
      .addArguments("--blink-settings=imagesEnabled=false")
      .addArguments("--single-process")
      .addArguments("--no-zygote")
      .addArguments("--remote-debugging-port=9222")
      .addArguments("--headless=new");

    // Path to the custom proxy authentication extension
    const extensionPath = path.join(__dirname, "../proxy_auth_extension");
    // options.addArguments(`--load-extension=${extensionPath}`);

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    await driver.manage().window().maximize();
    await driver.get("https://x.com/i/flow/login");

    console.log("Login Page");
    const usernameField = await driver.wait(
      until.elementLocated(By.xpath(xPaths.usernameField)),
      20000
    );
    const nextButton = await driver.wait(
      until.elementLocated(By.xpath(xPaths.nextButton)),
      20000
    );

    await usernameField.sendKeys(process.env.TWITTER_EMAIL);
    await nextButton.click();

    try {
      console.log("intermediate Part Happened");
      const interField = await driver.wait(
        until.elementLocated(By.xpath(xPaths.interField)),
        20000
      );
      await interField.sendKeys(process.env.TWITTER_USERNAME);
      const next2Button = await driver.wait(
        until.elementLocated(By.xpath(xPaths.next2Button)),
        20000
      );
      await next2Button.click();
    } catch (e) {
      console.log("intermediate Part Did not Happen");
    }
    console.log("Password Page");
    const passwordField = await driver.wait(
      until.elementLocated(By.xpath(xPaths.passwordField)),
      20000
    );
    await passwordField.sendKeys(process.env.TWITTER_PASSWORD);
    const loginButton = await driver.wait(
      until.elementLocated(By.xpath(xPaths.loginButton)),
      20000
    );
    await loginButton.click();
    try {
      console.log("Check if verification message came");
      await delay(10000); // Wait for 10 seconds
      console.log("Trying to get verification code field");
      const codeField = await driver.wait(
        until.elementLocated(By.xpath(xPaths.codeField)),
        20000
      );
      console.log("Sending Email Config");

      const verificationCode = await getCode();
      console.log("Verification Code", verificationCode);
      await codeField.sendKeys(verificationCode);
      console.log("Putting verification Code");
      console.log("Locating the next button");
      const next3Button = await driver.wait(
        until.elementLocated(By.xpath(xPaths.next3Button)),
        20000
      );
      console.log("Clicking on next button");
      await next3Button.click();
    } catch (error) {}
    console.log("Trying to go to home");
    await driver.wait(until.urlContains("/home"), 40000);
    console.log("Enters Home Page");
    await driver.get("https://x.com/home");
    for (let i = 3; i <= 7; i++) {
      console.log("Trend", i);
      const { xpathWithSpan, xpathWithoutSpan, xpathWithImg } =
        generateXPath(i);
      try {
        console.log("xpathWithSpan", xpathWithSpan);
        const trendingTopicsWithSpan = await driver.wait(
          until.elementLocated(By.xpath(xpathWithSpan)),
          40000
        );
        trendingTopics.push(await trendingTopicsWithSpan.getText());
      } catch (error) {
        try {
          console.log("xpathWithoutSpan", xpathWithoutSpan);
          const trendingTopicsWithoutSpan = await driver.wait(
            until.elementLocated(By.xpath(xpathWithoutSpan)),
            40000
          );
          trendingTopics.push(await trendingTopicsWithoutSpan.getText());
        } catch (error) {
          console.log("xpathWithImg", xpathWithImg);
          const trendingTopicsWithImg = await driver.wait(
            until.elementLocated(By.xpath(xpathWithImg)),
            40000
          );
          trendingTopics.push(await trendingTopicsWithImg.getText());
        }
      }
    }
    console.log("getting the ip");
    await driver.get("https://api.ipify.org?format=json");

    const body = await driver.wait(
      until.elementLocated(By.xpath(xPaths.ip)),
      40000
    );
    const bodyText = await body.getText();
    publicIP = JSON.parse(bodyText).ip;
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
