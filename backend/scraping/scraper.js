// // src/main.js
// import { setupBrowser } from "../utils/setupBrowser.js";
// import { delay } from "../utils/delay.js";
// import { navigateToProduct, scrapeProductDetails } from "./amazonScraper.js";

// async function ScrapingData(productUrl) {
//   // Setup Puppeteer browser and page
//   const { browser, page } = await setupBrowser();

//   try {
//     // Navigate to the provided product URL
//     await navigateToProduct(page, productUrl);

//     // Introduce a random delay to avoid detection
//     await delay(Math.random() * 3000 + 2000); // Random delay between 2 and 5 seconds

//     // Scrape the product details
//     const productDetails = await scrapeProductDetails(page);

//     // Return the product details for further use
//     return productDetails;
//   } catch (error) {
//     console.error("Error scraping Amazon product page:", error.message);
//     return null; // Return null if an error occurs
//   } finally {
//     if (browser) {
//       await browser.close();
//     }
//   }
// }

// export { ScrapingData };

// src/main.js
import { setupBrowser } from "../utils/setupBrowser.js";
import { delay } from "../utils/delay.js";
import { navigateToProduct, scrapeProductDetails } from "./amazonScraper.js";

async function ScrapingData(productUrl) {
  const { browser, page } = await setupBrowser();

  try {
    // Navigate to the provided product URL
    await navigateToProduct(page, productUrl);

    // Introduce a random delay to reduce detection
    await delay(Math.random() * 3000 + 2000);

    // Scrape the product details
    const productDetails = await scrapeProductDetails(page);

    return productDetails;
  } catch (error) {
    console.error("Error scraping Amazon product page:", error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export { ScrapingData };
