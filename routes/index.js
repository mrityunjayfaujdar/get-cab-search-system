var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", {title: "Express"});
});

router.use("/api/v1/driver", require("./driver"));
router.use("/api/v1/passenger", require("./passenger"));

module.exports = router;
