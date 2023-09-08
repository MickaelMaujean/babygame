import React, { useState } from 'react';
import axios from 'axios';
import './section2.css';

function Section2() {
  const currentDate = new Date();
  const initialDate = currentDate.toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
  const initialTime = currentDate.toTimeString().split(' ')[0]; // Get the current time in 'HH:mm:ss' format

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(initialTime);

  const [responseMessage, setResponseMessage] = useState(''); // State to store the response message

  const apiBaseUrl = process.env.REACT_APP_BACKEND_URL;


  const handleSend = async () => {
    try {
      // Combine the selected date and time into a single string
      const dateTimeToSend = `${selectedDate} ${selectedTime}`;
      console.log('Sending data:', {
        first_name,
        last_name,
        gender,
        size: parseFloat(size),
        weight: parseFloat(weight),
        birthday: dateTimeToSend,
      });

  
      const response = await axios.post(`${apiBaseUrl}/create_vote`, {
        first_name,
        last_name,
        gender,
        size: parseFloat(size),
        weight: parseFloat(weight), // Convert to float before sending
        birthday: dateTimeToSend,
      });
      console.log('Server response:', response);
  
      if (response.status === 201) {
        // If status code is 201 (Created), set a success message
        setResponseMessage('Merci votre vote a bien été pris en compte');
      } else {
        // For other status codes, you can set an error message or handle it as needed
        setResponseMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      // Handle the error and set an appropriate error message
      setResponseMessage('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="section2">
      <h2>Let's vote !</h2>
      <div className='section2-fields'>
      <div>
        <label>First Name:</label>
        <input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div>
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option> 
        <option value="Boy">Boy</option>
        <option value="Girl">Girl</option>
        </select>
      </div>
      <div>
        <label>Size:</label>
        <input type="number" value={size} onChange={(e) => setSize(e.target.value)} />
      </div>
      <div>
        <label>Weight:</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      <div>
        <label>Birthday Date:</label>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </div>
      <div>
        <label>Birthday Time:</label>
        <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
      </div>
      </div>
      <button onClick={handleSend}>Send</button>
      <div>{responseMessage}</div> {/* Display the response message */}
    </div>
  );
}

export default Section2;

