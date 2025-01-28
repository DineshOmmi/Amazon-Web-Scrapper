// // src/utils/setupBrowser.js
// import puppeteer from "puppeteer";

// export async function setupBrowser() {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   // Set the user agent to mimic a real browser
//   await page.setUserAgent(
//     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
//   );

//   return { browser, page };
// }
import puppeteer from "puppeteer";

export async function setupBrowser() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-extensions",
      "--disable-gpu",
      "--window-size=1920,1080",
    ],
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // Set user agent to mimic a real browser
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
  );

  // Disable unnecessary resources for performance
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const resourceType = request.resourceType();
    if (["image", "stylesheet", "font"].includes(resourceType)) {
      request.abort();
    } else {
      request.continue();
    }
  });

  // Add error handling for disconnection
  browser.on("disconnected", () => {
    console.warn("Browser instance was disconnected.");
  });

  return { browser, page };
}
