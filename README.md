# PriceMonk - Amazon Price Tracker

## 📌 Overview
**PriceMonk** is a powerful Amazon price tracking application built with the **MERN** stack. Using **Node.js** and **Puppeteer**, it tracks product prices on Amazon, allowing users to:

✅ Monitor product prices effortlessly  
✅ Set price drop alerts  
✅ Receive email notifications when prices decrease  

This tool helps users make smarter shopping decisions by staying informed about the best deals.

🟠 Note: This project is halfway done. The Amazon URL scraping functionality is complete, but the price drop checking and alerting features are still in progress.

---

## 📸 Screenshots

Homepage



Product Tracking Dashboard



Email Notification Sample

---

## 🚀 Features
- **User Authentication**: Secure sign-up and login system for personalized tracking.  
- **Product Tracking**: Users can add Amazon product URLs to track their prices.  
- **Custom Alerts**: Set desired price thresholds to receive notifications.  
- **Email Notifications**: Automatic email alerts when tracked products hit the target price.  
- **Intuitive Dashboard**: Visualize and manage your tracked products in a clean interface.  

---

## 🛠️ Tech Stack
- **Frontend**: React.js with Axios for API requests  
- **Backend**: Node.js with Express.js  
- **Database**: MongoDB (User-specific product tracking collections)  
- **Web Scraping**: Puppeteer for Amazon product price extraction  
- **Email Service**: MailTrap for email alerts  

---

## 📂 Project Structure
```plaintext
/PriceMonk
├── /frontend   # React Frontend
├── /backend    # Node.js Backend
│   ├── /controllers
│   ├── /routes
│   ├── /models
│   ├── /utils   # Email service, Puppeteer logic
│   └── server.js
├── .env         # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/DineshOmmi/Amazon-Web-Scrapper.git
   cd Amazon-Web-Scrapper
   ```
2. **Install dependencies:**
   ```bash
   cd frontend && npm install
   cd backend && npm install
   ```
3. **Add environment variables:**  
   Create a `.env` file in the `/server` folder with the following keys:
   ```plaintext
   MONGO_URI = mongodb+srv://dinesh:admin@cluster0.bofwv.mongodb.net/auth_db?retryWrites=true&w=majority&appName=Cluster0
   PORT = 5000
   JWT_SECRET = mysecretkey
   NODE_ENV = development
   SCRAPER_API_KEY = 10c97a8d39adc88df2406e93f4acecc0
   MAILTRAP_TOKEN = c2ffc7f717be560d5d17477ddf4f6f8b
   MAILTRAP_ENDPOINT = https://send.api.mailtrap.io/
   CLIENT_URL= http://localhost:5173
   ```
4. **Start the application:**
   ```bash
   cd backend && npm start
   cd frontend && npm start
   ```
5. **Access the app:**  
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Usage
1. Sign up or log in to your account.  
2. Add the Amazon product URL you wish to track.  
3. Set your desired price alert threshold.  
4. Receive email alerts when the price drops below your set limit.

---

## 🚨 Important Notes
- Amazon's product page structure may change, requiring updates to the Puppeteer scraping logic.  
- For better security, consider using environment variable managers like `dotenv` and enabling OAuth for secure login.

---

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## 💬 Contact
For questions or suggestions, reach out via [dinesh.ommi.2002@gmail.com/DineshOmmi].

