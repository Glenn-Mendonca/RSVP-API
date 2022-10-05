const mongoose = require("mongoose");

const OrganizerSchema = {
    email: String,
    password: String,
    isVerified: Boolean,
    idProof: String,
};

var Organizer = mongoose.model("Organizer", OrganizerSchema);

module.exports = {
    Organizer: Organizer,
};
