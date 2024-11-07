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

  return (
    <div className="bg-discount-gradient min-h-screen flex items-center justify-center p-4">
      <div className="bg-black-gradient-2 border border-white/20 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-gradient font-bold text-xl text-center mb-4">Welcome to Notifications</h2>
        <p className="text-white text-center font-semibold mb-4">Your email: {email}</p>

        {ipAddress ? (
          <div className="text-gradient mb-4">
            <p className="text-white">Your IP Address:</p>
            <p className="text-white">{ipAddress}</p>
          </div>
        ) : (
          <p className="text-gradient text-white text-center font-bold text-lg mb-4">No IP address found for your account.</p>
        )}

        {/* Countdown display */}
        {timeLeft ? (
          <div className="text-center mt-4">
            <p className="text-red-500 font-bold">{timeLeft}</p>
          </div>
        ) : (
          <p className="text-center text-white">Loading time countdown...</p>
        )}
      </div>
    </div>
  );
};

export default UserNotification;
