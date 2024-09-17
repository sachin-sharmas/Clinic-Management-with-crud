const Clinic = require('../models/clinicModel');

// Get all clinics
const getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new clinic
const addClinic = async (req, res) => {
  const clinic = new Clinic(req.body);
  try {
    const newClinic = await clinic.save();
    res.status(201).json(newClinic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update clinic
const updateClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });

    Object.assign(clinic, req.body); // Updates clinic fields with req.body data
    const updatedClinic = await clinic.save();
    res.json(updatedClinic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete clinic
const deleteClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndDelete(req.params.id); // Use findByIdAndDelete
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });

    res.json({ message: 'Clinic deleted successfully' }); // Send a success message
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle any errors
  }
};


module.exports = { getClinics, addClinic, updateClinic, deleteClinic };