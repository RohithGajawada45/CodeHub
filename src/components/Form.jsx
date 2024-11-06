import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css';
import axios from 'axios';

function Form() {
    const location = useLocation();
    const { teamSize, instanceType, durationInHours } = location.state || {}; 
    const [teamName, setTeamName] = useState(''); 
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const [formData, setFormData] = useState({
        fields: Array.from({ length:teamSize }), 
    });

    const handleInputChange = (index, e) => {
        const { value } = e.target;
        setFormData((prevData) => {
            const newFields = [...prevData.fields];
            newFields[index] = value;
            return { fields: newFields };
        });
    };

    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Ensure durationInHours is a number and convert it to a number
        const hours = Number(durationInHours);
    
        // If the conversion to number fails, default to 0 and alert the user
        if (isNaN(hours)) {
            alert("Invalid duration input. Please enter a valid number of hours.");
            return;
        }
    
        // Calculate the current timestamp (current time in milliseconds)
        const timestamp = Date.now(); 
    
        // Convert durationInHours to duration in seconds
        const durationInSeconds = hours * 3600;
    
        // Debugging: Check the values of hours and durationInSeconds
        console.log("Duration in Hours:", hours);
        console.log("Duration in Seconds:", durationInSeconds);
    
        const dataToSubmit = {
            teamName,
            email,
            instanceType,
            durationInHours: hours, // Store the value as a number
            durationInSeconds, // Add the calculated duration in seconds
            timestamp, // Add the current timestamp
            members: formData.fields.filter(field => field) 
        };
    
        // Submit the data to Firebase Realtime Database
        axios.post("https://codehub-2fd81-default-rtdb.firebaseio.com/tasks.json", dataToSubmit)
    .then((response) => {
        console.log("Firebase Response: ", response);
        alert(`Form submitted successfully! Team Name: ${teamName}, Team Size: ${teamSize}, Instance Type: ${instanceType}, Duration: ${durationInHours}`);
        navigate("/");
    })
    .catch((error) => {
        console.error("There was an error submitting the form!", error);
    });

    };    

    return (
        <div className="form-wrapper bg-discount-gradient">
            <div className="form-container bg-black-gradient-2 border border-white/20">
            <h2 className="text-gradient font-bold text-xl block">Team Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="text-gradient font-bold text-lg mb-2 block">Team Name:</label>
                        <input 
                            type="text" 
                            value={teamName} 
                            onChange={handleTeamNameChange} 
                            placeholder="Enter your team name" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label className='text-gradient font-bold text-lg mb-2 block'>Email:</label>
                        <input 
                            type="text" 
                            value={email} 
                            onChange={handleEmailChange} 
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>
                    
                    
                    {formData.fields.map((field, index) => (
                        <div className="form-group" key={index}>
                            <label className="text-gradient font-bold text-lg mb-2 block">SSH {index + 1}:</label>
                            <input 
                                type="text" 
                                value={field} 
                                onChange={(e) => handleInputChange(index, e)} 
                                placeholder={`Enter SSH of Member ${index + 1}`} 
                                required 
                            />
                        </div>
                    ))}

                    <button type="submit" className="submit-btn bg-blue-gradient font-bold py-2 px-4 rounded border border-white/20 hover:bg-white text-black ">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Form;