const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schema
const CustomerSchema = {
    email: String,
    password: String,
    registeredEvents: Array,
    city: String,
};
const OrganizerSchema = {
    email: String,
    password: String,
    isVerified: Boolean,
    idProof: {
        data: Buffer,
        contentType: String,
    },
};
const AdminSchema = {
    email: String,
    password: String,
};
const Customer = mongoose.model("Customer", CustomerSchema);
const Organizer = mongoose.model("Organizer", OrganizerSchema);
const Admin = mongoose.model("Admin", AdminSchema);

// SignUp/Login Customer
router.post("/customer", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newCustomer = new Customer({
        email: email,
        password: password,
    });
    Customer.findOne(
        { email: newCustomer.email },
        function (err, foundCustomer) {
            if (foundCustomer) {
                if (foundCustomer.password === newCustomer.password) {
                    res.send("Customer signed in");
                    // res.redirect("http://127.0.0.1:8080/");
                } else {
                    res.send("Email already exists !");
                }
            } else {
                newCustomer.save(function (err) {
                    if (!err) {
                        res.send("Customer signed up");
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

//SignUp/Login Admin
router.post("/admin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newAdmin = new Admin({
        email: email,
        password: password,
    });
    Admin.findOne({ email: newAdmin.email }, function (err, foundAdmin) {
        if (foundAdmin) {
            if (foundAdmin.password === newAdmin.password) {
                res.send("Admin signed up");
                // res.redirect("http://127.0.0.1:8080/");
            } else {
                res.send("Email already exists !");
            }
        } else {
            newAdmin.save(function (err) {
                if (!err) {
                    res.send("Admin signed up");
                    // res.redirect("http://127.0.0.1:8080/");
                } else {
                    res.send("Some error occured !");
                    return;
                }
            });
        }
    });
});

// SignUp/Login Organizer
router.post("/organizer", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newOrganizer = new Organizer({
        email: email,
        password: password,
    });
    Organizer.findOne(
        { email: newOrganizer.email },
        function (err, foundOrganizer) {
            if (foundOrganizer) {
                if (foundOrganizer.password === newOrganizer.password) {
                    res.send("Organizer loggedin");
                    // res.redirect("http://127.0.0.1:8080/");
                } else {
                    res.send("Email already exists !");
                }
            } else {
                newOrganizer.save(function (err) {
                    if (!err) {
                        res.send("Organizer signed up");
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

module.exports = router;

// https://glenn-mendonca-39-nope-js-hackover3-0-rx9j56g76qghrjj-3000.githubpreview.dev/auth
