

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BirthdayForm from './components/BirthdayForm';
import BirthdayList from './components/BirthdayList';
import BirthdayDetail from './components/BirthdayDetail';
import Modal from './components/Modal';
import styles from './App.module.css';

interface BirthdayData {
  name: string;
  dob: string;
  phone: string;
  photo: string | null;
}

function App() {
  const [birthdays, setBirthdays] = useState<BirthdayData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedBirthdays = localStorage.getItem('birthdays');
    if (storedBirthdays) {
      setBirthdays(JSON.parse(storedBirthdays));
    }
  }, []);

  const handleSaveBirthday = (newBirthday: BirthdayData) => {
    const updatedBirthdays = [...birthdays, newBirthday];
    setBirthdays(updatedBirthdays);
    localStorage.setItem('birthdays', JSON.stringify(updatedBirthdays));
    setIsModalOpen(false); // Close modal after saving
    toast.success('Nuevo registro agregado con Exito');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteBirthday = (indexToDelete: number) => {
    const updatedBirthdays = birthdays.filter((_, index) => index !== indexToDelete);
    setBirthdays(updatedBirthdays);
    localStorage.setItem('birthdays', JSON.stringify(updatedBirthdays));
  };

  return (
    <Router>
      <div className={styles.appContainer}>
        <Routes>
          <Route path="/" element={
            <>
              <h1>Cumpleaños App</h1>
              <button onClick={openModal}>Añadir cumpleaños</button>
              <BirthdayList birthdays={birthdays} />

              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <BirthdayForm onSave={handleSaveBirthday} />
              </Modal>
            </>
          } />
          <Route path="/birthday/:id" element={<BirthdayDetail onDelete={handleDeleteBirthday} />} />
        </Routes>
      </div>
      <footer>Free App created by ARUM</footer>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </Router>
  );
}

export default App;


