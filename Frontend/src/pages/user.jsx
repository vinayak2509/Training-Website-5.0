import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserUpdate = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    newEmail: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/login");
    } else {
      const userData = JSON.parse(loggedInUser);
      setUser({ ...user, email: userData.email });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, newEmail, newPassword } = user;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newEmail, newPassword }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        if (newEmail) {
          const updatedUser = JSON.parse(sessionStorage.getItem("user"));
          updatedUser.email = newEmail;
          sessionStorage.setItem("user", JSON.stringify(updatedUser));
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      {error && <div className="error-tooltip">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            Current Email
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            name="email"
            value={user.email}
            disabled
          />
        </div>
        <div className="form-row">
          <label htmlFor="newEmail" className="form-label">
            New Email
          </label>
          <input
            type="email"
            className="form-input"
            id="newEmail"
            name="newEmail"
            value={user.newEmail}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-input"
            id="newPassword"
            name="newPassword"
            value={user.newPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UserUpdate;
