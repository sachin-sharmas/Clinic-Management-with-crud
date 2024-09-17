// Table.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { toast } from 'react-toastify';  // Import Toastify

const Table = () => {
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State to handle search input

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/clinics');
      setClinics(response.data);
      setFilteredClinics(response.data); // Set the initial clinics to both state and filtered state
    } catch (err) {
      console.error('Error fetching clinics:', err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the clinics based on search term
    const filteredData = clinics.filter(clinic =>
      clinic.clinicName.toLowerCase().includes(value.toLowerCase()) ||
      clinic.doctorName.toLowerCase().includes(value.toLowerCase()) ||
      clinic.clinicNumber.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredClinics(filteredData);
  };

  const handleSave = async (clinicData) => {
    try {
      if (editingClinic) {
        await axios.put(`http://localhost:5000/api/clinics/${editingClinic._id}`, clinicData);
        setClinics(clinics.map(clinic => (clinic._id === editingClinic._id ? clinicData : clinic)));
        setFilteredClinics(filteredClinics.map(clinic => (clinic._id === editingClinic._id ? clinicData : clinic)));
        toast.success("Clinic updated successfully!");  // Toast for update
      } else {
        const response = await axios.post('http://localhost:5000/api/clinics', clinicData);
        setClinics([...clinics, response.data]);
        setFilteredClinics([...filteredClinics, response.data]);
        toast.success("Clinic added successfully!");  // Toast for add
      }
    } catch (err) {
      toast.error("Error saving clinic");  // Toast for error
      console.error('Error saving clinic:', err);
    }
    setModalOpen(false);
    setEditingClinic(null);
  };

  const handleDelete = async (id) => {
    try {
      console.log(`Attempting to delete clinic with id: ${id}`);
      await axios.delete(`http://localhost:5000/api/clinics/${id}`);
      console.log('Delete successful');
      setClinics(clinics.filter(clinic => clinic._id !== id));
      setFilteredClinics(filteredClinics.filter(clinic => clinic._id !== id));
      toast.success("Clinic deleted successfully!");  // Toast for delete
    } catch (err) {
      console.error('Error deleting clinic:', err);
      toast.error("Error deleting clinic");  // Toast for error
    }
  };
  

  return (
    <div className="table-container">
      <div className="header">
      <div className="input-group w-50 mb-5 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Clinic Name, Doctor Name, or Clinic Number"
            value={searchTerm}
            onChange={handleSearch}
          />
          <span className="input-group-text">
            <i className="fas fa-search"></i>
          </span>
        </div>
        <button onClick={() => setModalOpen(true)}>
          <i className="fas fa-plus-circle"></i>  Add Clinic
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Clinic Name</th>
            <th>Doctor Name</th>
            <th>Clinic Number</th>
            <th>Location</th>
            <th>No. of Patients</th>
            <th>Revenue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClinics.length > 0 ? (
            filteredClinics.map((clinic) => (
              <tr key={clinic._id}>
                <td>{clinic._id}</td>
                <td>{clinic.clinicName}</td>
                <td>{clinic.doctorName}</td>
                <td>{clinic.clinicNumber}</td>
                <td>{clinic.location}</td>
                <td>{clinic.patients}</td>
                <td>{clinic.revenue}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingClinic(clinic);
                      setModalOpen(true);
                    }}
                    className="edit"
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button
                onClick={() => {
                 console.log('Deleting clinic with ID:', clinic._id);
                 handleDelete(clinic._id);
                 }}
                className="delete"
                 >
                <i className="fas fa-trash"></i> Delete
                </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No clinics found</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {modalOpen && (
        <Modal
          clinic={editingClinic}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Table;
