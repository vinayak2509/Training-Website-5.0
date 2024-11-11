import React, { useEffect, useState } from "react";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "https://training-website-5-0-backend.onrender.com/api/contact"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul className="center">
          {notifications.map((notification, index) => (
            <li key={index}>
              <strong>{notification.name}:</strong> {notification.message}{" "}
              (Email: {notification.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
