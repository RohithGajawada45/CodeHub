import React, { useEffect, useState } from "react";
import { database, ref, get } from "../firebase"; // Import Firebase functions

const UserNotification = ({ email }) => {
  console.log("Received email in UserNotification:", email);

  const [ipAddress, setIpAddress] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    // Fetch user data from the Realtime Database based on the email
    const fetchTaskData = async () => {
      const userRef = ref(database, "tasks/"); // Path to the tasks node
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        // Loop through all tasks to find the matching email
        snapshot.forEach((childSnapshot) => {
          const task = childSnapshot.val();
          if (task.adminEmail === email) {
            setTaskData(task);
            if (task.ipAddress) {
              setIpAddress(task.ipAddress);
            }

            // Start the countdown using the timestamp and duration
            const timestamp = task.timestamp;
            const durationInSeconds = task.durationInSeconds;
            if (timestamp && durationInSeconds) {
              startCountdown(timestamp, durationInSeconds);
            }
          }
        });
      } else {
        console.log("No task data found.");
      }
    };

    fetchTaskData();
  }, [email]);

  const startCountdown = (timestamp, durationInSeconds) => {
    const countdownInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - timestamp) / 1000); // Time elapsed in seconds
      const remainingTime = Math.max(durationInSeconds - elapsedTime, 0); // Remaining time in seconds

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        setTimeLeft("Time's up!");
      } else {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;
        setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
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
