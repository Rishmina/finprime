import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // Default role is admin
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Password validation function
  const validatePassword = (password) => {
    return password.length >= 6; // Minimum password length
  };

  // Handle authentication (login/register)
  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password should be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const url = isLogin
        ? "https://finprimeconsulting.com/api/auth/login"
        : "https://finprimeconsulting.com/api/auth/register";

      const data = isLogin
        ? { email, password }
        : { email, password, role }; // Only send role for registration

      const response = await axios.post(url, data);

      console.log(isLogin ? "Login successful" : "Registration successful", response.data);

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard after successful login or registration
      navigate("/admin");

      // Reset form fields after successful authentication
      setEmail("");
      setPassword("");
      setRole("admin"); // Reset role to default after successful registration
    } catch (err) {
      // Log the full error response for debugging
      console.error("Error details:", err);

      // Improved error handling
      const errorMessage = err.response?.data?.message || err.message || "Something went wrong, please try again later.";
      setError(errorMessage);  // Show error message to the user
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes for email, password, and role
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "role") setRole(value);
    setError(""); // Clear error when user starts typing
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="bg-black bg-opacity-25 p-8 rounded-lg shadow-lg w-full max-w-xs">
        <h2 className="text-3xl font-semibold text-white text-center mb-8">
          {isLogin ? "Admin Login" : "Admin Register"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Email Input */}
        <div className="relative mb-4">
          <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 pl-10 rounded-full focus:outline-none"
            aria-label="Email address"
            aria-required="true"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 pl-10 rounded-full focus:outline-none"
            aria-label="Password"
            aria-required="true"
          />
        </div>

        {/* Role selection for registration */}
        {!isLogin && (
          <div className="relative mb-6">
            <select
              name="role"
              value={role}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-full focus:outline-none"
              aria-label="Select Role"
              disabled={isLogin} // Disable role selection when logging in
            >
              <option value="admin">Admin</option>
              <option value="subadmin">Subadmin</option>
            </select>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleAuth}
          className="w-full bg-blue-500 text-white py-3 rounded-full focus:outline-none"
          disabled={loading}
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>

        {/* Toggle between login and register */}
        <p
          className="mt-4 hidden text-center text-white cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;