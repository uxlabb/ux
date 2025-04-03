import React, { useState, useEffect } from "react";
import "./App.css";

const BirthdayReminder = () => {
  const [birthdays, setBirthdays] = useState([
    { id: 1, name: "John Doe", date: "2024-03-10" },
    { id: 2, name: "Jane Smith", date: "2024-05-15" },
  ]);

  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [popup, setPopup] = useState(null);

  // Function to add a new birthday
  const addBirthday = () => {
    if (newName.trim() && newDate) {
      setBirthdays([...birthdays, { id: Date.now(), name: newName, date: newDate }]);
      setNewName("");
      setNewDate("");
    }
  };

  // Function to remove a birthday
  const removeBirthday = (id) => {
    setBirthdays(birthdays.filter((bday) => bday.id !== id));
  };

  // Function to check and update upcoming birthdays
  const processBirthdays = () => {
    const today = new Date();
    let updatedBirthdays = birthdays.map((bday) => {
      let bdayDate = new Date(bday.date);
      if (bdayDate < today) {
        bdayDate.setFullYear(today.getFullYear() + 1);
      }
      return { ...bday, date: bdayDate.toISOString().split("T")[0] };
    });
    setBirthdays(updatedBirthdays);
  };

  // Show pop-up for today's birthday
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const upcomingBday = birthdays.find((bday) => bday.date === today);
    if (upcomingBday) {
      setPopup(`🎉 Happy Birthday, ${upcomingBday.name}! 🎂`);
      setTimeout(() => setPopup(null), 3000);
    }
  }, [birthdays]);

  return (
    <div className="app">
      <h2>🎂 Birthday Reminder</h2>
      {popup && <div className="popup">{popup}</div>}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
        <button onClick={addBirthday}>Add Birthday</button>
      </div>

      <div className="birthday-list">
        {birthdays.map((bday) => (
          <div key={bday.id} className="birthday-item">
            <span>{bday.name} - {bday.date}</span>
            <button onClick={() => removeBirthday(bday.id)}>Remove</button>
          </div>
        ))}
      </div>

      <button className="process-btn" onClick={processBirthdays}>
        Update Birthdays
      </button>
    </div>
  );
};

export default BirthdayReminder;
