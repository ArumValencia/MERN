import React, { useState } from 'react';
import styles from './BirthdayForm.module.css';

interface BirthdayData {
  name: string;
  dob: string;
  phone: string;
  photo: string | null;
}

interface BirthdayFormProps {
  onSave: (birthday: BirthdayData) => void;
}

const BirthdayForm: React.FC<BirthdayFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<BirthdayData>({
    name: '',
    dob: '',
    phone: '',
    photo: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      name: '',
      dob: '',
      phone: '',
      photo: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.birthdayForm}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </div>
      <button type="submit">Save Birthday</button>
    </form>
  );
};

export default BirthdayForm;
