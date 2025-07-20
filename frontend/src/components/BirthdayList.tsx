

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BirthdayList.module.css';

interface BirthdayData {
  name: string;
  dob: string;
  phone: string;
  photo: string | null;
}

interface BirthdayListProps {
  birthdays: BirthdayData[];
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

// const getZodiacSign = (dob: string): string => {
//   const date = new Date(dob);
//   const month = date.getMonth() + 1; // Months are 0-indexed
//   const day = date.getDate();

//   if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Acuario";
//   if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Piscis";
//   if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
//   if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Tauro";
//   if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Géminis";
//   if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cáncer";
//   if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
//   if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
//   if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
//   if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Escorpio";
//   if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagitario";
//   if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricornio";
//   return "Desconocido";
// };

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

const BirthdayList: React.FC<BirthdayListProps> = ({ birthdays }) => {
  const navigate = useNavigate();

  const handleItemClick = (index: number) => {
    navigate(`/birthday/${index}`);
  };

  return (
    <div className={styles.birthdayListContainer}>
      <h2>Stored Birthdays</h2>
      {birthdays.length === 0 ? (
        <p>No birthdays stored yet.</p>
      ) : (
        <ul>
          {birthdays.map((birthday, index) => (
            <li key={index} onClick={() => handleItemClick(index)} className={styles.birthdayListItem}>
              <div className='foto'>
                {birthday.photo && <img src={birthday.photo} alt="Birthday Person" className={styles.birthdayPhoto} />}
              </div>
              <div className='info'>
                <p><strong>Nombre:</strong> {birthday.name}</p>
                <p><strong>Edad:</strong> {calculateAge(birthday.dob)}</p>
                <p><strong>Cumpleaños en </strong>{getDaysUntilNextBirthday(birthday.dob)} <strong>dias</strong> </p>
              </div>
              {/* <p><strong>Fecha Nacimiento:</strong> {birthday.dob}</p> */}
              {/* <p><strong>Signo:</strong> {getZodiacSign(birthday.dob)}</p>
              <p><strong>Telefono:</strong> {birthday.phone}</p> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BirthdayList;
