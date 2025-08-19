const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingschema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=60"
        }
    },
    price: {
        type: Number,
        required: true
    },
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingschema);

module.exports = Listing;
