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

        const dataToSubmit = {
            teamName,
            email,
            instanceType,
            durationInHours,
            members: formData.fields.filter(field => field) 
        };

        axios.post("https://codehub-2fd81-default-rtdb.firebaseio.com/tasks.json", dataToSubmit)
            .then(() => {
                alert(`Form submitted successfully! Team Name: ${teamName}, Team Size: ${teamSize}, Instance Type: ${instanceType}, Duration: ${durationInHours}`);
                navigate("/");
            })
            .catch((error) => {
                console.error("There was an error submitting the form!", error);
            });
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
                    <div className="form-group">
                        <label>Email:</label>
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
                            <label>SSH {index + 1}:</label>
                            <input 
                                type="text" 
                                value={field} 
                                onChange={(e) => handleInputChange(index, e)} 
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