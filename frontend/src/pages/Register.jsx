import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo/ankurpath-logo.png";
import AuthLayout from "../components/layout/AuthLayout";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      };

      await api.post("/auth/register", payload);

      toast.success("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-green-600 transition-colors mb-6"
        >
          ← Back to Home
        </Link>

        {/* Brand */}
        <div className="text-center mb-6">
          <img src={logo} alt="AnkurPath Logo" className="w-48 mx-auto" />
        </div>

        {/* Page Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Create Your Account</h1>

          <p className="mt-3 text-lg text-gray-500 leading-relaxed">
            Start monitoring healthy habits with AnkurPath.
          </p>
        </div>

        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>

        <input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          autoComplete="name"
          maxLength={60}
          spellCheck={false}
          required
          autoFocus
          className="w-full rounded-xl border border-gray-300 px-4 py-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-4"
        />

        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>

        <input
          id="email"
          type="email"
          name="email"
          maxLength={100}
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          spellCheck={false}
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-4"
        />

        <div className="relative mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            spellCheck={false}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-4 pr-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-[46px] text-gray-400 hover:text-green-600 transition-colors duration-200 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-6">Password must be at least 8 characters long.</p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:enabled:bg-green-700 text-white font-bold py-3 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-green-600 hover:text-green-700">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
