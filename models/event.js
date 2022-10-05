const mongoose = require("mongoose");

const EventSchema = {
    type: String,
    dateTime: Number,
    organizer: String,
    eventName: String,
    description: String,
    location: String,
    paymentAmount: Number,
    bannerImg: String,
    profileImg: String,
    participants: Number,
    codeOfConduct: Array,
    faqs: Array,
    sponsors: Array,
};

const Event = mongoose.model("Event", EventSchema);

module.exports = {
    Event: Event,
};
