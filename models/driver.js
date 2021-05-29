const mongoose = require("mongoose");

const DriverSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true,
        min: 1000000000,
        max: 9999999999,
    },
    license_number: {
        type: String,
        required: true,
        unique: true,
    },
    car_number: {
        type: String,
        required: true,
        unique: true,
    },
});

const Driver = mongoose.model("Driver", DriverSchema);

module.exports = Driver;
