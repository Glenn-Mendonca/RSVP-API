const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Event } = require("../models/event");

router.post("/", async (req, res) => {
    const newEvent = new Event({
        type: req.body.type,
        dateTime: req.body.dateTime,
        organizer: req.body.organizer,
        eventName: req.body.eventName,
        description: req.body.description,
        location: req.body.location,
        paymentAmount: req.body.paymentAmount,
        participants: req.body.participants,
        codeOfConduct: req.body.codeOfConduct,
        faqs: req.body.faqs,
        sponsors: req.body.sponsors,
    });
    Event.findOne(
        { eventName: newEvent.eventName },
        function (err, foundEvent) {
            if (foundEvent) {
                if (foundEvent.dateTime === newEvent.dateTime) {
                    // res.redirect("http://127.0.0.1:8080/");
                    res.send("Event exists");
                } else {
                    res.send("Event already exists at another time!");
                }
            } else {
                newEvent.save(function (err) {
                    if (!err) {
                        res.send("Event created!");
                        // res.redirect("http://127.0.0.1:8080/");
                    } else {
                        res.send("Some error occured !");
                        return;
                    }
                });
            }
        }
    );
});

router.get("/", async (req, res) => {
    const params = req.query;
    Event.find({ organizer: params.organizer }, function (err, data) {
        if (err) {
            res.send("fail");
        } else {
            res.send(data);
        }
    });
});

module.exports = router;
