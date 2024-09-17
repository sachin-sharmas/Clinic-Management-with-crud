const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  clinicName: { type: String, required: true },
  doctorName: { type: String, required: true },
  clinicNumber: { type: String, required: true },
  location: { type: String, required: true },
  patients: { type: Number, required: true },
  revenue: { type: Number, required: true },
});

module.exports = mongoose.model('Clinic', clinicSchema);