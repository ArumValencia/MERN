import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BirthdayDetail.module.css';

interface BirthdayData {
  name: string;
  dob: string;
  phone: string;
}

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const getZodiacSign = (dob: string): string => {
  const date = new Date(dob);
  const month = date.getMonth() + 1; // Months are 0-indexed
  const day = date.getDate();

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Acuario";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Piscis";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Tauro";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Géminis";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cáncer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Escorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagitario";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricornio";
  return "Desconocido";
};

const getDaysUntilNextBirthday = (dob: string): number => {
  const today = new Date();
  const birthDate = new Date(dob);
  const currentYear = today.getFullYear();

  let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());

  // If the birthday has already passed this year, set it to next year
  if (nextBirthday < today) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  const diffTime = Math.abs(nextBirthday.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

const BirthdayDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [birthday, setBirthday] = useState<BirthdayData | null>(null);

  useEffect(() => {
    const storedBirthdays = localStorage.getItem('birthdays');
    if (storedBirthdays) {
      const birthdays: BirthdayData[] = JSON.parse(storedBirthdays);
      // Assuming 'id' is the index of the birthday in the array for simplicity
      const foundBirthday = birthdays[parseInt(id || '', 10)];
      if (foundBirthday) {
        setBirthday(foundBirthday);
      } else {
        // Handle case where birthday is not found, e.g., redirect to home
        navigate('/');
      }
    }
  }, [id, navigate]);

  if (!birthday) {
    return <div>Loading or Birthday not found...</div>;
  }

  return (
    <div className={styles.birthdayDetailContainer}>
      <h2>Birthday Details</h2>
      <p><strong>Name:</strong> {birthday.name}</p>
      <p><strong>Date of Birth:</strong> {birthday.dob}</p>
      <p><strong>Age:</strong> {calculateAge(birthday.dob)}</p>
      <p><strong>Zodiac Sign:</strong> {getZodiacSign(birthday.dob)}</p>
      <p><strong>Days until next birthday:</strong> {getDaysUntilNextBirthday(birthday.dob)}</p>
      <p><strong>Phone:</strong> {birthday.phone}</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default BirthdayDetail;
