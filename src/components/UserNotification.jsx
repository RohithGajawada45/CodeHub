import React from "react";

const UserNotification = ({ email }) => {
  console.log("Received email in UserNotification:", email); // Debugging email prop

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
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to Notifications</h2>
      <p style={styles.emailText}>Your email: {email}</p>
      <p style={styles.additionalInfo}>You will receive notifications here regarding updates and actions.</p>
    </div>
  );
};

export default UserNotification;
