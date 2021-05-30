const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    driver: {
        type: String,
    },

    latitude: {
        type: Number,
        required: true,
    },

    longitude: {
        type: Number,
        required: true,
    },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
