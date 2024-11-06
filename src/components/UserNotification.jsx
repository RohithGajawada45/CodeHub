import React, { useEffect, useState } from "react";
import { database, ref, get } from "../firebase"; // Import Firebase functions
import { child } from "firebase/database"; // Used for querying nested data

const UserNotification = ({ email }) => {
  console.log("Received email in UserNotification:", email);

  const [ipAddress, setIpAddress] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    // Fetch user data from the Realtime Database based on the email
    const fetchTaskData = async () => {
      const userRef = ref(database, "tasks/"); // Path to the tasks node
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // Loop through all tasks to find the matching email
        snapshot.forEach((childSnapshot) => {
          const taskData = childSnapshot.val();
          if (taskData.adminEmail === email) {
            if (taskData.ipAddress) {
              setIpAddress(taskData.ipAddress);
            }

            // Assuming timestamp is stored as a Unix timestamp or ISO string
            const timestamp = new Date(taskData.timestamp); // Convert to Date object
            if (timestamp) {
              startCountdown(timestamp);
            }
          }
        });
      } else {
        console.log("No task data found.");
      }
    };

    fetchTaskData();
  }, [email]);

  const startCountdown = (timestamp) => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = timestamp - currentTime;
      if (timeDifference <= 0) {
        clearInterval(interval);
        setTimeLeft("Time's up!");
      } else {
        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000); // Update countdown every second
  };

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f4f4f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '10px',
    },
    emailText: {
      fontSize: '18px',
      color: '#555',
      marginBottom: '20px',
    },
    additionalInfo: {
      fontSize: '16px',
      color: '#777',
    },
    ipAddress: {
      fontSize: '16px',
      color: '#333',
      marginBottom: '10px',
    },
    countdown: {
      fontSize: '18px',
      color: '#d9534f', // Red color for countdown
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to Notifications</h2>
      <p style={styles.emailText}>Your email: {email}</p>

      {ipAddress ? (
        <div style={styles.ipAddress}>
          <p>Your IP Address: {ipAddress}</p>
        </div>
      ) : (
        <p style={styles.additionalInfo}>No IP address found for your account.</p>
      )}

      {timeLeft ? (
        <div style={styles.countdown}>
          <p>Time Left: {timeLeft}</p>
        </div>
      ) : (
        <p style={styles.additionalInfo}>Loading time countdown...</p>
      )}
    </div>
  );
};

export default UserNotification;
