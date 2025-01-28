
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // URL validation
            },
            message: 'Invalid URL format!',
        },
    },
    platform: {
        type: String,
        required: true,
        enum: ['Amazon', 'eBay', 'Walmart'], // Only allow specific platforms
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // URL validation for image
            },
            message: 'Invalid image URL format!',
        },
    },
    description: {
        type: String,
        required: true, // Marking the product description as required
    },
    currentPrice: {
        type: Number,
        required: true,
    },
    mrp: {
        type: Number,
        required: true, // Maximum retail price (MRP) field
    },
    historicalPrices: [{
        price: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now, // Automatically set date for each price entry
        },
    }],
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
});

const Product = mongoose.model('Product', productSchema);
export default Product;
