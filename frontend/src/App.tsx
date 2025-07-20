

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <div className={styles.appContainer}>
        <Routes>
          <Route path="/" element={
            <>
              <h1>Birthday App</h1>
              <button onClick={openModal}>Añadir cumpleaños</button>
              <BirthdayList birthdays={birthdays} />

              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <BirthdayForm onSave={handleSaveBirthday} />
              </Modal>
            </>
          } />
          <Route path="/birthday/:id" element={<BirthdayDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


