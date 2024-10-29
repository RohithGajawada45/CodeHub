import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Form.css';

function Form() {
    const location = useLocation();
    const { teamSize, instanceType, durationInHours } = location.state || {}; // Destructure state
    const [teamName, setTeamName] = useState(''); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Form submitted successfully! Team Name: ${teamName}, Team Size: ${teamSize}, Instance Type: ${instanceType}, Duration: ${durationInHours}`);
        navigate("/");
    };

    return (
        <div className="form-wrapper">
            <div className="form-container">
                <h2>Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Team Name:</label>
                        <input 
                            type="text" 
                            value={teamName} 
                            onChange={handleTeamNameChange} 
                            placeholder="Enter your team name" 
                            required 
                        />
                    </div>
                    
                    {[...Array(teamSize)].map((_, index) => (
                        <div className="form-group" key={index}>
                            <label>SHH {index + 1}:</label>
                            <input 
                                type="text" 
                                name={`field${index + 1}`} 
                                value={formData[`field${index + 1}`]} 
                                onChange={handleInputChange} 
                                placeholder={`Enter SSH of Member ${index + 1}`} 
                                required 
                            />
                        </div>
                    ))}

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Form;