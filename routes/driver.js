var express = require("express");
var router = express.Router();
const Driver = require("../models/driver");
const {check, validationResult} = require("express-validator");
const Location = require("../models/location");

router.post("/register", async function (req, res, next) {
    try {
        let driver = await Driver.create(req.body);
        if (!driver) {
            return res.status(400);
        }
        // - ID to Integer, remove __V attribute
        res.status(201).json(driver);
    } catch (err) {
        return res.status(400).json({status: "failure", reason: "Bad Request"});
    }
});

router.post("/:id/sendLocation", async function (req, res, next) {
    try {
        if (req.params.id) {
            var newLocObj = {
                driver: req.params.id,
                ...req.body,
            };

            await Location.create(newLocObj);
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
