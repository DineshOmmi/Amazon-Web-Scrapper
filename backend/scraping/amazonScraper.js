// // src/scraper/amazonScraper.js
// export async function navigateToProduct(page, productUrl) {
//   await page.goto(productUrl, { waitUntil: 'networkidle2' });
//   await page.waitForSelector('#productTitle', { timeout: 5000 });
// }

// export async function scrapeProductDetails(page) {
//   return await page.evaluate(() => {
//     const title = document.querySelector('#productTitle')?.textContent.trim() || 'No title';
//     const price = document.querySelector('.a-price .a-offscreen')?.textContent || 'No price';
//     const rating = document.querySelector('.a-icon-alt')?.textContent || 'No rating';
//     const availability = document.querySelector('#availability .a-declarative')?.textContent.trim() || 'No availability info';
//     const imageUrl = document.querySelector('#landingImage')?.src || 'No image available';

//     return { title, price, rating, availability, imageUrl };
//   });
// }













// // import puppeteer from "puppeteer";

// // // Launch the browser and set up the page
// // async function setupBrowser() {
// //   const browser = await puppeteer.launch({ headless: false });
// //   const page = await browser.newPage();

// //   // Set the user agent to mimic a real browser
// //   await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
// //   return { browser, page };
// // }

// // // Navigate to Amazon product page
// // async function navigateToProduct(page, productUrl) {
// //   await page.goto(productUrl, { waitUntil: 'networkidle2' });
// //   await page.waitForSelector('#productTitle', { timeout: 5000 });
// // }

// // // Extract product details from the product page
// // async function scrapeProductDetails(page) {
// //   return await page.evaluate(() => {
// //     const title = document.querySelector('#productTitle')?.textContent.trim() || 'No title';
// //     const price = document.querySelector('.a-price .a-offscreen')?.textContent || 'No price';
// //     const rating = document.querySelector('.a-icon-alt')?.textContent || 'No rating';
// //     const availability = document.querySelector('#availability .a-declarative')?.textContent.trim() || 'No availability info';
// //     const imageUrl = document.querySelector('#landingImage')?.src || 'No image available';

// //     return { title, price, rating, availability, imageUrl };
// //   });
// // }

// // // Create a custom delay function using setTimeout
// // function delay(time) {
// //   return new Promise(function(resolve) { 
// //     setTimeout(resolve, time);
// //   });
// // }

// // // Main function to control the flow
// // async function main() {
// //   const { browser, page } = await setupBrowser();

// //   try {
// //     // Example product link
// //     const productUrl = 'https://amzn.in/d/4sCm92N'; 
// //     await navigateToProduct(page, productUrl);

// //     // Introduce random delay to avoid detection
// //     await delay(Math.random() * 3000 + 2000);  // Random delay between 2 and 5 seconds

// //     const productDetails = await scrapeProductDetails(page);
// //     console.log(productDetails);
// //   } catch (error) {
// //     console.error('Error scraping Amazon product page:', error);
// //   } finally {
// //     await browser.close();
// //   }
// // }

// // main();
// Navigate to Amazon product page
export async function navigateToProduct(page, productUrl) {
  await page.goto(productUrl, { waitUntil: 'networkidle2' });
  await page.waitForSelector('#productTitle', { timeout: 5000 });
}

// Extract product details from the product page
export async function scrapeProductDetails(page) {
  return await page.evaluate(() => {
    const title = document.querySelector('#productTitle')?.textContent.trim() || 'No title';
    const price = document.querySelector('.a-price .a-offscreen')?.textContent || 'No price';

    // Scrape MRP using the provided HTML structure
    const mrpElement = document.querySelector('.a-size-small.aok-offscreen');
    
    // Check if mrpElement is found and then extract its text
    const rawMrp = mrpElement ? mrpElement.textContent.trim() : null;

    // Parse MRP to a number; handle nulls and commas
    let mrp = null;
    if (rawMrp) {
      // Remove "M.R.P.:" and any whitespace
      const cleanedMrp = rawMrp.replace("M.R.P.:", "").trim();
      // Remove non-numeric characters and parse
      mrp = parseFloat(cleanedMrp.replace(/[^0-9.-]+/g, ""));
    }

    const rating = document.querySelector('.a-icon-alt')?.textContent || 'No rating';
    const availability = document.querySelector('#availability .a-declarative')?.textContent.trim() || 'No availability info';
    const imageUrl = document.querySelector('#landingImage')?.src || 'No image available';
    
    // Scrape product description
    const description = document.querySelector('#feature-bullets')?.innerText.trim() || 'No description available';

    return { title, price, mrp, rating, availability, imageUrl, description };
  });
}
