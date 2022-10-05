const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Organizer } = require("../models/organizer");

// Document upload (for frontend use)
router.post("/docUrl", async (req, res) => {
    const docurl = req.query.docurl;
    const orgmail = req.query.organizer;

    const queryOrg = new Organizer({
        email: req.query.email,
    });

    Organizer.updateOne(
        { email: orgmail },
        { idProof: docurl },
        function (err) {
            if (err) res.send(err);
            else res.send("success");
        }
    );
});

// isVeried (for admin verification)
router.post("/admin", async (req, res) => {
    const orgmail = req.query.organizer;
    Organizer.updateOne(
        { email: orgmail },
        { isVerified: true },
        function (err) {
            if (err) res.send(err);
            else res.send("success");
        }
    );
});

module.exports = router;
