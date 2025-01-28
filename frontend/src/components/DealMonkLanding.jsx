import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { useProductStore } from "../store/productStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const images = [
  "../Images/hero-1.svg",
  "../Images/hero-2.svg",
  "../Images/hero-3.svg",
  "../Images/hero-4.svg",
  "../Images/hero-5.svg",
];

const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-green-500" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
      />
    </div>
  );
};

export default function DealMonkLanding() {
  const [currentImage, setCurrentImage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const { fetchProducts } = useProductStore.getState();
    setIsLoading(true);

    try {
      console.log("Fetching product for:", searchTerm); // Log the search term

      const productData = await fetchProducts(searchTerm);
      console.log("Received product data:", productData); // Log the response

      if (productData && productData._id) {
        console.log("Navigating to product with ID:", productData._id);
        navigate(`/SearchProduct/${productData._id}`);
      } else {
        console.error("No product found or unable to scrape the product.");
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-transparent">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-red-600">
            Smart Shopping Starts Here:{" "}
            <ArrowRight className="inline-block size-5 text-red-600"></ArrowRight>
          </p>
          <h1 className="text-5xl font-bold mb-4 text-white">
            Unleash the Power of{" "}
            <span className="text-green-500">DealMonk</span>
          </h1>
          <p className="text-gray-300 mb-8">
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSearch} className="flex items-start">
            <div className="flex-grow mr-2">
              <Input
                icon={Search}
                type="text"
                placeholder="Search for the Product"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <motion.button
              className="mt-0 py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white
                         font-bold rounded-lg shadow-lg hover:from-green-600
                         hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                         focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto" size={24} />
              ) : (
                "Search"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-[#FFFFF0] rounded-lg shadow-lg relative w-[450px] h-[450px]">
          <div className="absolute bottom-0 -left-24">
            <img src="../Images/arrows.png" alt="" className="w-40 rotate-45" />
          </div>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt="Product"
              className="w-full max-w-md h-[97%]"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
