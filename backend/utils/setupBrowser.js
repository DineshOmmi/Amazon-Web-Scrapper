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
    headless: true, // Headless mode for deployment
    args: [
      "--no-sandbox", // Avoid permission issues in deployment environments
      "--disable-setuid-sandbox", // Required for secure environments
      "--disable-dev-shm-usage", // Reduce shared memory usage
      "--disable-extensions", // Disable extensions for better performance
      "--disable-gpu", // Disable GPU for headless environments
      "--window-size=1920,1080", // Standardize viewport size
    ],
    defaultViewport: null, // Allow full-page rendering
  });

  const page = await browser.newPage();

  // Set the user agent to mimic a real browser
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
  );

  // Disable loading unnecessary resources like images, fonts, and stylesheets
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const resourceType = request.resourceType();
    if (["image", "stylesheet", "font"].includes(resourceType)) {
      request.abort();
    } else {
      request.continue();
    }
  });

  // Add error handling to close the browser if something goes wrong
  browser.on("disconnected", () => {
    console.warn("Browser instance was disconnected.");
  });

  return { browser, page };
}
