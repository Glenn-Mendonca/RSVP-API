const mongoose = require("mongoose");

const AdminSchema = {
    email: String,
    password: String,
};

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = {
    Admin: Admin,
};
