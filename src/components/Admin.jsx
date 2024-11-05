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
    const [showModal, setShowModal] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);

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

    const handleSendClick = (email, id, teamName, duration) => {
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

    const handleShowMembers = (members) => {
        setSelectedMembers(members);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMembers([]);
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
        <div className="outer bg-discount-gradient">
            <div className="admin-container">
                <h2 className="text-gradient font-bold text-xl">Submitted Teams</h2>
                {data.length > 0 ? (
                    <div className="team-list">
                        {data.map((item) => (
                            <div key={item.id} className="team-item bg-black-gradient-2 border border-white/20">
                                <div className="record-details font-bold text-white">
                                    <label>Team Name: {item.teamName}</label>
                                    <p>Instance Type: {item.instanceType}</p>
                                    <p>Duration: {item.durationInHours} hours</p>
                                </div>
                                <button onClick={() => handleShowMembers(item.members)} className="show-members-button bg-blue-gradient font-bold rounded-full">
                                    Show Members
                                </button>
                                <div className="ip-address-form">
                                <br></br>
                                    {sentStatus[item.id] ? (
                                        <div>
                                            <p className="countdown-timer font-bold text-lg text-white">
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
                                            <button className="ip-send font-bold bg-blue-gradient text-black rounded p-2" onClick={() => handleSendClick(item.email, item.id, item.teamName, item.durationInHours)}>
                                                Send
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gradient text-xl font-bold">No data available.</p>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content bg-discount-gradient border border-white/20">
                        <h3 className="text-gradient font-bold text-xl">Team Members</h3>
                        <br></br>
                        <ul className="text-white font-bold">
                            {selectedMembers.map((member, index) => (
                                <li key={index}>{member}</li>
                            ))}
                        </ul>
                        <button onClick={handleCloseModal} className="close-modal-button bg-blue-gradient text-black font-bold">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
