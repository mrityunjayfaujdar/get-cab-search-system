var express = require("express");
var router = express.Router();
const Location = require("../models/location");
const Driver = require("../models/driver");

router.get("/available_cabs", async function (req, res, next) {
    try {
        const {latitude, longitude} = req.body;
        console.log(req.body);

        // if (!(latitudeUser && longitudeUser)) {
        //     res.status(400).json({
        //         status: "failure",
        //         reason: "Latitude/Longitude Missing",
        //     });
        // }

        let cabLocations = await Location.find({});
        var available_cabs = [];
        for (var i = 0; i < cabLocations.length; i++) {
            let distance = getDistanceFromLatLonInKm(
                latitude,
                longitude,
                cabLocations[i].latitude,
                cabLocations[i].longitude
            );

            if (distance <= 4) {
                let cabAround = await Driver.findById(
                    cabLocations[i].driver,
                    "name car_number phone_number -_id"
                );
                console.log(cabAround);
                available_cabs.push(cabAround);
            }
        }
        if (available_cabs.length == 0) {
            available_cabs.push({message: "No cabs available!"});
        }

        res.status(200).json(available_cabs);
    } catch (err) {
        res.status(400).json({
            status: "failure",
            reason: "Bad Request",
        });
    }
});

//Logic for calculating the distance between 2 coordinates
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

module.exports = router;
