const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  venue: { type: String, required: true },
  timings: { type: String, required: true },
  eventStartTime: { type: Date, required: true },
  registrationEndTime: { type: Date, default: null },
  organizer: { type: String, required: true },
  collegeName: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Event', eventSchema);
