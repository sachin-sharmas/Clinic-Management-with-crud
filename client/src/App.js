import React from 'react';
import Sidebar from './components/Sidebar';
import Table from './components/Table';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome for icons
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <Table />
      <ToastContainer // Ensure this is added for displaying toasts
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
