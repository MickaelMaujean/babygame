import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './section3.css'


function Section3() {
const [data, setData] = useState([]);
const [isUpdating, setIsUpdating] = useState(false);

const apiBaseUrl = process.env.BACKEND_LOCALHOST_URL;


const [votes, setVotes] = useState(null); // Your votes data
const [editVote, setEditVote] = useState(null); // State to track the vote being edited
const [editedFields, setEditedFields] = useState({
first_name: '',
last_name: '',
gender: '',
size: '',
weight: '',
birthday: '',
});


const fetchData = async () => {
try {
setIsUpdating(true);


const response = await axios.get('${apiBaseUrl}/votes');


if (Array.isArray(response.data) && response.data.length > 0) {
setData(response.data);
} else {
// Handle the case when no valid data is received
console.error('No valid data received:', response.data);
setData([]);
}


setIsUpdating(false);
} catch (error) {
console.error('Error fetching data:', error);
setIsUpdating(false);
}
};


useEffect(() => {
fetchData();
}, []);


const formatBirthday = (dateString) => {
if (!dateString) {
return 'N/A';
}


const date = new Date(dateString);
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
return date.toLocaleDateString(undefined, options);
};


// Define a mapping between display names and API keys
const columnMappings = {
'Prénom': 'first_name',
'Nom de famille': 'last_name',
'Sexe': 'gender',
'Taille(cm)': 'size',
'Poids (kg)': 'weight',
'Birthday': 'birthday'
};


const columns = Object.keys(columnMappings);


const handleEditClick = (vote) => {
setEditVote(vote); // Set the vote being edited
// Pre-fill the edited fields with the current values
setEditedFields({
first_name: vote.first_name,
last_name: vote.last_name,
gender: vote.gender,
size: vote.size,
weight: vote.weight,
birthday: vote.birthday,
});
};


const handleFieldChange = (fieldName, value) => {
setEditedFields({ ...editedFields, [fieldName]: value });
};


const handleUpdateClick = async () => {
try {
// Send a PUT request to update the vote
const response = await axios.put(`${apiBaseUrl}/update_vote/${editVote.id}`, editedFields);
console.log('Update response:', response);
// Update the local state (data) with the edited vote
const updatedData = data.map((item) => (item.id === editVote.id ? { ...item, ...editedFields } : item));
setData(updatedData);
// Close the edit pop-up
setEditVote(null);
} catch (error) {
console.error('Error updating vote:', error);
}
};


const handleUpdateData = () => {
fetchData();
};


const renderTable = () => {
if (data.length === 0) {
return null;
}


const renderEditPopup = () => {
return (
<div className="edit-popup">
<h3>Edit Vote</h3>
<div>
<label>First Name:</label>
<input
type="text"
value={editedFields.first_name}
onChange={(e) => handleFieldChange('first_name', e.target.value)}
/>
<label>Last Name:</label>
<input
type="text"
value={editedFields.last_name}
onChange={(e) => handleFieldChange('last_name', e.target.value)}
/>
<label>Gender:</label>
<input
type="text"
value={editedFields.gender}
onChange={(e) => handleFieldChange('gender', e.target.value)}
/>
<label>Size:</label>
<input
type="number"
value={editedFields.size}
onChange={(e) => handleFieldChange('size', e.target.value)}
/>
<label>Weight:</label>
<input
type="number"
value={editedFields.weight}
onChange={(e) => handleFieldChange('weight', e.target.value)}
/>
<label>Birthday:</label>
<input
type="datetime-local"
value={`${editedFields.birthday}T${editedFields.birthtime}`}
onChange={(e) => handleFieldChange('birthday', e.target.value)}
/>
</div>
<button onClick={handleUpdateClick}>Update</button>
<button onClick={() => setEditVote(null)}>Cancel</button>
</div>
);
};


return (
<div>
<button onClick={handleUpdateData} disabled={isUpdating}>
{isUpdating ? 'Updating...' : 'Mettre à jour'}
</button>
<table>
<thead>
<tr>
{columns.map((column, index) => (
<th key={index}>{column}</th>
))}
<th>Action</th> {/* Add a new column for "Edit" button */}
</tr>
</thead>
<tbody>
{data.map((item, rowIndex) => (
<tr key={rowIndex}>
{columns.map((column, columnIndex) => (
<td key={columnIndex}>
{columnMappings[column] === 'birthday'
? formatBirthday(item[columnMappings[column]])
: item[columnMappings[column]] || 'N/A'}
</td>
))}
<td>
<button onClick={() => handleEditClick(item)}>Edit</button> {/* Add "Edit" button */}
</td>
</tr>
))}
</tbody>
</table>
</div>
);
};


return (
<div className="section3">
<h2>Tableau des votes</h2>
{data.length > 0 ? (
<div>
{editVote && (
<div className="edit-popup">
<div className='edit-title'>
<h3>Edit Vote</h3>
</div>
<div>
<label>First Name:</label>
<input
type="text"
value={editedFields.first_name}
onChange={(e) => handleFieldChange('first_name', e.target.value)}
/>
<label>Last Name:</label>
<input
type="text"
value={editedFields.last_name}
onChange={(e) => handleFieldChange('last_name', e.target.value)}
/>
<label>Gender:</label>
<input
type="text"
value={editedFields.gender}
onChange={(e) => handleFieldChange('gender', e.target.value)}
/>
<label>Size:</label>
<input
type="number"
value={editedFields.size}
onChange={(e) => handleFieldChange('size', e.target.value)}
/>
<label>Weight:</label>
<input
type="number"
value={editedFields.weight}
onChange={(e) => handleFieldChange('weight', e.target.value)}
/>
<label>Birthday:</label>
<input
type="datetime-local"
value={`${editedFields.birthday}T${editedFields.birthtime}`}
onChange={(e) => handleFieldChange('birthday', e.target.value)}
/>
</div>
<div className='button-containers'>
<button onClick={handleUpdateClick}>Update</button>
<button onClick={() => setEditVote(null)}>Cancel</button>
</div>
</div>
)}

{renderTable()}

</div>
) : (
<p>No valid data available.</p>
)}
</div>
);
}


export default Section3;























