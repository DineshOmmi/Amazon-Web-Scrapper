import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import {
  Search,
  Heart,
  User,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";

const Navbar = () => {
    
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      rotateX: 15,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const handleNavClick = (event) => {
    if (!dropdownRef.current || !dropdownRef.current.contains(event.target)) {
      setIsAccountOpen(false);
    }
  };

  return (
    <nav className="bg-transparent" onClick={handleNavClick}>
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <motion.img
              className="h-[85px] w-auto"
              src="../Images/Logo.png"
              alt="Logo"
              style={{ filter: "brightness(1.5)" }} // Brightness for the logo
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex items-center">
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {[Search, Heart].map((Icon, index) => (
                <motion.button
                  key={index}
                  className="text-emerald-600 hover:text-emerald-700 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-300 ease-in-out"
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9, rotate: -15 }}
                >
                  <Icon size={24} />
                </motion.button>
              ))}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  className="text-emerald-600 hover:text-emerald-700 px-3 py-2 rounded-full text-sm font-medium transition-colors duration-300 ease-in-out"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAccountOpen(!isAccountOpen);
                  }}
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9, rotate: -15 }}
                >
                  <User size={24} />
                </motion.button>
                <AnimatePresence>
                  {isAccountOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-10 overflow-hidden"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.div
                        className="px-6 py-4" // Removed border classes
                        variants={itemVariants}
                      >
                        <p className="text-lg font-semibold text-gray-800">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {user.email}
                        </p>
                      </motion.div>
                      {[
                        { icon: Settings, label: "Settings" },
                        { icon: HelpCircle, label: "Help & Support" },
                        { icon: LogOut, label: "Logout" },
                      ].map((item, index) => (
                        <motion.button
                          key={index}
                          className="flex items-center w-full px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-300 ease-in-out"
                          variants={itemVariants}
                          whileHover={{ scale: 1.03, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={item.label === 'Logout' ? handleLogout : undefined}
                        >
                          <item.icon
                            size={18}
                            className="mr-3 text-emerald-600"
                          />{" "}
                          {/* Emerald color */}
                          {item.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
