// Modal.js
import React, { useState, useEffect } from "react";

const Modal = ({ clinic, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    clinicName: "",
    doctorName: "",
    clinicNumber: "",
    location: "",
    patients: 0,
    revenue: 0,
  });

  useEffect(() => {
    if (clinic) {
      setFormData(clinic);
    }
  }, [clinic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{clinic ? "Edit Clinic" : "Add Clinic"}</h5>
            <button type="button" className="btn" onClick={onClose}>
              <i className="fas fa-times"></i> {/* Font Awesome close icon */}
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="clinicName" className="form-label">Clinic Name</label>
                <input
                  type="text"
                  id="clinicName"
                  name="clinicName"
                  className="form-control"
                  value={formData.clinicName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="doctorName" className="form-label">Doctor Name</label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  className="form-control"
                  value={formData.doctorName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="clinicNumber" className="form-label">Clinic Number</label>
                <input
                  type="text"
                  id="clinicNumber"
                  name="clinicNumber"
                  className="form-control"
                  value={formData.clinicNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="patients" className="form-label">Number of Patients</label>
                <input
                  type="number"
                  id="patients"
                  name="patients"
                  className="form-control"
                  value={formData.patients}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="revenue" className="form-label">Revenue</label>
                <input
                  type="number"
                  id="revenue"
                  name="revenue"
                  className="form-control"
                  value={formData.revenue}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {clinic ? "Save Changes" : "Add Clinic"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
