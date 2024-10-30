import React, { useEffect, useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import './Admin.css';

const Admin = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ipAddresses, setIpAddresses] = useState({});
    const [sentStatus, setSentStatus] = useState({});
    const [countdown, setCountdown] = useState({}); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://codehub-2fd81-default-rtdb.firebaseio.com/tasks.json");
                const fetchedData = response.data;

                if (fetchedData) {
                    const formattedData = Object.keys(fetchedData).map(key => ({
                        id: key,
                        ...fetchedData[key]
                    }));
                    setData(formattedData);
                } else {
                    setData([]);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleIpChange = (id, event) => {
        setIpAddresses((prev) => ({
            ...prev,
            [id]: event.target.value
        }));
    };

    const handleSendClick = (email, id, teamName,duration) => {
        const ipAddress = ipAddresses[id];
        
        const templateParams = {
            team_name: teamName,
            ip_address: ipAddress,
            admin_email: email
        };

        emailjs.send(
            'service_drueih7',          
            'template_fll42xd',         
            templateParams,
            '4MnSF-QGuGJ8migmL'          
        )
        .then((response) => {
            console.log("Email sent successfully:", response.status, response.text);
            alert("IP address sent successfully!");
            
            setSentStatus((prev) => ({
                ...prev,
                [id]: true 
            }));
            
            setCountdown((prev) => ({
                ...prev,
                [id]: duration * 60 * 60
            }));
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            alert("Failed to send IP address. Please try again.");
        });
    };


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown((prevCountdown) => {
                const updatedCountdown = { ...prevCountdown };
                Object.keys(updatedCountdown).forEach((id) => {
                    if (updatedCountdown[id] > 0) {
                        updatedCountdown[id] -= 1;
                    }
                });
                return updatedCountdown;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error fetching data: {error.message}</div>;
    }

    return (
        <div className="admin-container">
            <h2>Submitted Teams</h2>
            {data.length > 0 ? (
                <ul className="team-list">
                    {data.map((item) => (
                        <li key={item.id} className="team-item">
                            <div className="record-details">
                                <h3>Team Name: {item.teamName}</h3>
                                <p>Instance Type: {item.instanceType}</p>
                                <p>Duration: {item.durationInHours} hours</p>
                            </div>
                            <h4>Members:</h4>
                            <ul className="members-list">
                                {item.members.map((member, index) => (
                                    <li key={index}>{member}</li>
                                    
                                ))}
                            </ul>
                            <div className="ip-address-form">
                                {sentStatus[item.id] ? (
                                    <div>
                                    <p className="countdown-timer">
                                        Countdown: {countdown[item.id] > 0 ? countdown[item.id] : "Done"}
                                    </p>
                                    
                                    
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="text"
                                            value={ipAddresses[item.id] || ''}
                                            onChange={(event) => handleIpChange(item.id, event)}
                                            placeholder="Enter IP Address"
                                        />
                                        <button onClick={() => handleSendClick(item.email, item.id, item.teamName,item.durationInHours)}>
                                            Send
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
}

export default Admin;
