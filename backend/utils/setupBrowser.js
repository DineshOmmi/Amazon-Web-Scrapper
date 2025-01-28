// src/utils/setupBrowser.js
import puppeteer from "puppeteer";

export async function setupBrowser() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set the user agent to mimic a real browser
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

  return { browser, page };
}
