import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database'; // Realtime DB

const UserNotificationPage = ({ userId }) => {
  const [ipAddress, setIpAddress] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const userRef = ref(getDatabase(), 'users/' + userId);  // Reference to user document
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.ipAddress) {
            setIpAddress(userData.ipAddress);
          } else {
            setMessage('No IP address assigned.');
          }
        } else {
          setMessage('User not found.');
        }
      } catch (error) {
        console.error('Error fetching IP address:', error);
        setMessage('Failed to load IP address.');
      }
    };

    fetchIpAddress();
  }, [userId]);

  return (
    <div>
      <h2>User Notifications</h2>
      {ipAddress ? (
        <div>
          <p>Your assigned IP address is: {ipAddress}</p>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default UserNotificationPage;
