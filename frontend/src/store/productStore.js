import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/products"
    : "/api/products";

axios.defaults.withCredentials = true;

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  message: null,

  fetchProducts: async (url) => {
    set({ isLoading: true, error: null, searchQuery: url });
    try {
      const response = await axios.post(`${API_URL}/SearchProduct`, { url });
      const product = response.data; // Log this if needed
      set({ products: [product], isLoading: false });

      return product; // Return the product object (including _id)
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error fetching product from URL",
        isLoading: false,
      });
      throw error;
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true, error: null }); // Start loading
    try {
      const response = await axios.get(`${API_URL}/SearchProduct/${id}`); // Ensure the API endpoint is correct
      set({ product: response.data, loading: false }); // Set product data
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Error fetching product details",
        loading: false,
      }); // Handle error
    }
  },

  //   getProductDetails: async (productId) => {
  //     set({ isLoading: true, error: null });
  //     try {
  //       const response = await axios.get(`${API_URL}/product/${productId}`);
  //       set({ products: [response.data.product], isLoading: false });
  //     } catch (error) {
  //       set({ error: error.response?.data?.message || "Error fetching product details", isLoading: false });
  //       throw error;
  //     }
  //   },

    trackProduct: async (productId) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post(`${API_URL}/TrackedProducts`, { productId });
        set({ message: response.data.message, isLoading: false });
      } catch (error) {
        set({ error: error.response?.data?.message || "Error tracking product", isLoading: false });
        throw error;
      }
    },

    // stopTrackingProduct: async (productId) => {
    //   set({ isLoading: true, error: null });
    //   try {
    //     const response = await axios.post(`${API_URL}/stop-tracking`, { productId });
    //     set({ message: response.data.message, isLoading: false });
    //   } catch (error) {
    //     set({ error: error.response?.data?.message || "Error stopping tracking", isLoading: false });
    //     throw error;
    //   }
    // },
}));
