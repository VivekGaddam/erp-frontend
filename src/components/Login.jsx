import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgimg from "./image/cbit_image.jpeg";
import logo from "./image/cbit_logo.png";
import "./login.css";

function Login({ setAttendanceData }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsLoading(true);

        // Basic validation
        if (!username.trim() || !password.trim()) {
            setErrorMessage("Both fields are required.");
            setIsLoading(false);
            return;
        }

        try {
            // Send login details to the backend to scrape attendance data
            const response = await axios.post("https://erpbackend-l42j.onrender.com/attendance", {
                username,
                password,
            });

            // Set attendance data to state
            setAttendanceData(response.data); // Pass attendance data to parent
            navigate("/home"); // Redirect to the Home component
        } catch (error) {
            setErrorMessage(
                error.response?.data?.error || "Failed to log in. Please try again."
            );
        } finally {
            setIsLoading(false); // Stop the loading animation
        }
    };

    return (
        <div className="login d-flex">
            {/* Left side */}
            <div className="leftside d-flex align-items-center justify-content-center">
                <img src={bgimg} alt="CBIT Campus" className="img-fluid" />
            </div>

            {/* Right side */}
            <div className="rightside d-flex align-items-center justify-content-center">
                <div className="card p-4 shadow">
                    {/* Logo and Title */}
                    <div className="comeon d-flex align-items-center mb-4">
                        <div className="imagecontainer">
                            <img src={logo} alt="CBIT Logo" className="logo me-3" />
                        </div>
                        <h1 className="text-primary">Chaitanya Bharathi Institute of Technology</h1>
                    </div>

                    {/* Welcome Message */}
                    <div className="text-center mb-4">
                        <h2>Welcome to ERP CBIT</h2>
                        <p className="text-muted">Please sign in to your account.</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Username/Roll Number Field */}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Roll No./Email
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                placeholder="Enter your Roll No./Email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading} // Disable input during loading
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading} // Disable input during loading
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <div className="alert alert-danger text-center">
                                {errorMessage}
                            </div>
                        )}

                        {/* Loading Animation */}
                        {isLoading && (
                            <div className="text-center mb-3">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={isLoading} // Disable button during loading
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
