const mongoose = require("mongoose");

var CustomerSchema = {
    email: String,
    password: String,
    registeredEvents: Array,
    city: String,
};

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = {
    Customer: Customer,
};
