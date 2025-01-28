// // main();
// Navigate to Amazon product page
// export async function navigateToProduct(page, productUrl) {
//   await page.goto(productUrl, { waitUntil: 'networkidle2' });
//   await page.waitForSelector('#productTitle', { timeout: 5000 });
// }

// // Extract product details from the product page
// export async function scrapeProductDetails(page) {
//   return await page.evaluate(() => {
//     const title = document.querySelector('#productTitle')?.textContent.trim() || 'No title';
//     const price = document.querySelector('.a-price .a-offscreen')?.textContent || 'No price';

//     // Scrape MRP using the provided HTML structure
//     const mrpElement = document.querySelector('.a-size-small.aok-offscreen');
    
//     // Check if mrpElement is found and then extract its text
//     const rawMrp = mrpElement ? mrpElement.textContent.trim() : null;

//     // Parse MRP to a number; handle nulls and commas
//     let mrp = null;
//     if (rawMrp) {
//       // Remove "M.R.P.:" and any whitespace
//       const cleanedMrp = rawMrp.replace("M.R.P.:", "").trim();
//       // Remove non-numeric characters and parse
//       mrp = parseFloat(cleanedMrp.replace(/[^0-9.-]+/g, ""));
//     }

//     const rating = document.querySelector('.a-icon-alt')?.textContent || 'No rating';
//     const availability = document.querySelector('#availability .a-declarative')?.textContent.trim() || 'No availability info';
//     const imageUrl = document.querySelector('#landingImage')?.src || 'No image available';
    
//     // Scrape product description
//     const description = document.querySelector('#feature-bullets')?.innerText.trim() || 'No description available';

//     return { title, price, mrp, rating, availability, imageUrl, description };
//   });
// }


export async function navigateToProduct(page, productUrl) {
  try {
    await page.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('#productTitle', { timeout: 10000 });
  } catch (error) {
    throw new Error("Navigation to the product page failed: " + error.message);
  }
}

export async function scrapeProductDetails(page) {
  return await page.evaluate(() => {
    const title = document.querySelector('#productTitle')?.textContent.trim() || 'No title';
    const price = document.querySelector('.a-price .a-offscreen')?.textContent || 'No price';
    const rawMrp = document.querySelector('.a-size-small.aok-offscreen')?.textContent.trim() || null;

    let mrp = null;
    if (rawMrp) {
      const cleanedMrp = rawMrp.replace("M.R.P.:", "").trim();
      mrp = parseFloat(cleanedMrp.replace(/[^0-9.-]+/g, ""));
    }

    const rating = document.querySelector('.a-icon-alt')?.textContent || 'No rating';
    const availability = document.querySelector('#availability .a-declarative')?.textContent.trim() || 'No availability info';
    const imageUrl = document.querySelector('#landingImage')?.src || 'No image available';
    const description = document.querySelector('#feature-bullets')?.innerText.trim() || 'No description available';

    return { title, price, mrp, rating, availability, imageUrl, description };
  });
}
