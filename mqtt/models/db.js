const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  spo2: String,
  heartbeat:String,
  steps: String
});

const HealthData = mongoose.model('HealthData', healthDataSchema,'Health');

module.exports = HealthData;
