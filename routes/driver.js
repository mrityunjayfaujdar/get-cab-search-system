var express = require("express");
var router = express.Router();
const Driver = require("../models/driver");
const {check, validationResult} = require("express-validator");
const Location = require("../models/location");

router.post("/register", async function (req, res, next) {
    try {
        let driver = await Driver.create({
            id: Math.floor(Math.random() * 10000),
            ...req.body,
        });

        // - ID to Integer, remove __V attribute
        res.status(201).json(driver);
    } catch (err) {
        return res.status(400).json({status: "failure", reason: "Bad Request"});
    }
});

router.post("/:_id/sendLocation", async function (req, res, next) {
    try {
        //console.log("ID - ", req.params._id);
        if (req.params._id) {
            const {latitude, longitude} = req.body;
            var location = await Location.create({
                driver: req.params._id,
                latitude,
                longitude,
            });

            return res.status(202).json({status: "success"});
        }
    } catch (err) {
        return res.status(400).json({
            status: "failure",
            reason: "Bad Request, Latitude/Longitude Missing.",
        });
    }
});

module.exports = router;
