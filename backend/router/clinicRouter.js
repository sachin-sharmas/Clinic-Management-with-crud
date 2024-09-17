const express = require('express');
const { getClinics, addClinic, updateClinic, deleteClinic } = require('../controllers/clinicController');

const router = express.Router();

router.get('/', getClinics);
router.post('/', addClinic);
router.put('/:id', updateClinic);
router.delete('/:id', deleteClinic);

module.exports = router;