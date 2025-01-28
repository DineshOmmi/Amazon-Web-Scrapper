import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import ProductDetails from "../components/ProductDetails";

const ProductTrackPage = () => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className='max-w-[80rem] w-full h-[150vh] mx-auto my-5 py-1 px-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
		>
			<Navbar/>
            <ProductDetails/>
		</motion.div>
	);
};
export default ProductTrackPage;