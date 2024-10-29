import React, { useEffect, useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser'; // Import EmailJS
import './Admin.css';

const Admin = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ipAddresses, setIpAddresses] = useState({});

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

    const handleSendClick = (id, teamName) => {
        const ipAddress = ipAddresses[id];

        // Define the email parameters
        const templateParams = {
            team_name: teamName,
            ip_address: ipAddress,
            admin_email: "sathvikmintu18@gmail.com" // Replace with the recipient's email
        };

        // Send the email
        emailjs.send(
            'service_drueih7',          // Replace with your EmailJS service ID
            'template_fll42xd',         // Replace with your EmailJS template ID
            templateParams,
            '4MnSF-QGuGJ8migmL'           // Replace with your EmailJS public key
        )
        .then((response) => {
            console.log("Email sent successfully:", response.status, response.text);
            alert("IP address sent successfully!");
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            alert("Failed to send IP address. Please try again.");
        });

        setIpAddresses((prev) => ({
            ...prev,
            [id]: '' // Optionally clear the input field after sending
        }));
    };

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
                                <input
                                    type="text"
                                    value={ipAddresses[item.id] || ''}
                                    onChange={(event) => handleIpChange(item.id, event)}
                                    placeholder="Enter IP Address"
                                />
                                <button onClick={() => handleSendClick(item.id, item.teamName)}>
                                    Send
                                </button>
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