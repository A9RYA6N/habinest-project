import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Home,
  Search,
  Bookmark,
  User,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const performRegistration = async (userType) => {
    clearMessages();

    if (!name || !email || !phone || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!/^\d{10,15}$/.test(phone)) {
      setError("Please enter a valid phone number (10-15 digits).");
      return;
    }

    setIsLoading(true);

    try {
      const apiObj = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        type: userType,
      };

      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_USER}/register`,
        data: apiObj,
        timeout: 10000,
      });

      setSuccess(`Registered successfully as ${userType}! Redirecting to login...`);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const message =
          err.response.data?.message ||
          err.response.statusText ||
          "Registration failed.";
        switch (status) {
          case 400:
            setError(`Registration failed: ${message}`);
            break;
          case 409:
            setError(`User with this email already exists. Try logging in.`);
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError(`Registration failed: ${message}`);
        }
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("Unexpected error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => performRegistration("user");
  const handleRegisterAsOwner = () => performRegistration("owner");

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-br from-green-100 to-green-200">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="HabinestLogo.jpg"
                alt="Home"
                className="w-10 h-10 object-cover rounded-full border-2 border-[#69995D]"
              />
              <span className="font-bold text-2xl text-[#504B3A] tracking-wide">Habinest</span>
            </div>
            <nav className="flex-1 flex justify-center">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200 font-medium"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </nav>
            <div className="w-10"></div>
          </div>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center flex-1 px-4 py-10">
        <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-10 border border-gray-100 transition-transform transform hover:scale-[1.03] duration-300">
          <h1 className="text-3xl font-extrabold text-center mb-7 text-[#504B3A] tracking-tight">Create Your Account</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg shadow-sm flex justify-between items-center animate-shake">
              <span className="text-sm font-medium">{error}</span>
              <button
                onClick={clearMessages}
                className="text-red-500 hover:text-red-700 font-bold ml-2"
                aria-label="Clear error"
              >
                &times;
              </button>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg shadow-sm text-sm animate-fade-in">
              {success}
            </div>
          )}

          <div className="space-y-5">
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                className="peer w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-transparent transition bg-gray-50"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearMessages();
                }}
                disabled={isLoading}
                autoComplete="name"
                id="register-name"
              />
              <label htmlFor="register-name" className="absolute left-3 top-3 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#69995D] bg-white px-1 pointer-events-none">
                Name
              </label>
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder=" "
                className="peer w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-transparent transition bg-gray-50"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearMessages();
                }}
                disabled={isLoading}
                autoComplete="email"
                id="register-email"
              />
              <label htmlFor="register-email" className="absolute left-3 top-3 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#69995D] bg-white px-1 pointer-events-none">
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                className="peer w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-transparent transition bg-gray-50"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  clearMessages();
                }}
                disabled={isLoading}
                autoComplete="tel"
                id="register-phone"
              />
              <label htmlFor="register-phone" className="absolute left-3 top-3 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#69995D] bg-white px-1 pointer-events-none">
                Phone Number
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder=" "
                className="peer w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-transparent transition bg-gray-50"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearMessages();
                }}
                disabled={isLoading}
                autoComplete="new-password"
                id="register-password"
              />
              <label htmlFor="register-password" className="absolute left-3 top-3 text-gray-400 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#69995D] bg-white px-1 pointer-events-none">
                Password
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={handleRegister}
              className={`flex-1 py-2 rounded-xl font-semibold text-white shadow-md transition-colors ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#007FFF] hover:bg-[#0066CC]"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register as User"}
            </button>
            <button
              onClick={handleRegisterAsOwner}
              className={`flex-1 py-2 rounded-xl font-semibold text-white shadow-md transition-colors ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#69995D] hover:bg-[#507A3A]"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register as Owner"}
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-3 text-gray-400 text-xs">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            onClick={handleLoginClick}
            className="w-full py-2 rounded-xl font-semibold text-[#504B3A] border border-[#504B3A] hover:bg-[#504B3A]/10 transition shadow-sm"
            disabled={isLoading}
          >
            Already have an account? <span className="underline font-bold">Login</span>
          </button>

          {isLoading && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
            </div>
          )}
        </div>
      </section>

      <footer className="mt-16 bg-gradient-to-br from-[#504B3A] to-[#69995D] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-6 text-[#E4DFDA]">Use Cases</h4>
              <ul className="space-y-3 text-white/80">
                <li className="hover:text-white transition-colors cursor-pointer">Student housing discovery</li>
                <li className="hover:text-white transition-colors cursor-pointer">Professional relocation</li>
                <li className="hover:text-white transition-colors cursor-pointer">Personalized PG browsing</li>
                <li className="hover:text-white transition-colors cursor-pointer">Booking site visits</li>
                <li className="hover:text-white transition-colors cursor-pointer">Saving/bookmarking PGs</li>
                <li className="hover:text-white transition-colors cursor-pointer">Mobile-responsive exploration</li>
                <li className="hover:text-white transition-colors cursor-pointer">Feedback and ratings system</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-[#E4DFDA]">Explore</h4>
              <ul className="space-y-3 text-white/80">
                <li className="hover:text-white transition-colors cursor-pointer">PG Listings & Filters</li>
                <li className="hover:text-white transition-colors cursor-pointer">Profile & Preferences</li>
                <li className="hover:text-white transition-colors cursor-pointer">Map-based PG Search</li>
                <li className="hover:text-white transition-colors cursor-pointer">Real-time Suggestions</li>
                <li className="hover:text-white transition-colors cursor-pointer">Dark Mode UI</li>
                <li className="hover:text-white transition-colors cursor-pointer">Ratings & Reviews</li>
                <li className="hover:text-white transition-colors cursor-pointer">Similar PG Recommendations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 text-[#E4DFDA]">Resources</h4>
              <ul className="space-y-3 text-white/80">
                <li className="hover:text-white transition-colors cursor-pointer">Blog & Guides</li>
                <li className="hover:text-white transition-colors cursor-pointer">Best Practices for Users</li>
                <li className="hover:text-white transition-colors cursor-pointer">Support & Contact Form</li>
                <li className="hover:text-white transition-colors cursor-pointer">Developer API Docs</li>
                <li className="hover:text-white transition-colors cursor-pointer">Location Data (OpenStreetMap)</li>
                <li className="hover:text-white transition-colors cursor-pointer">Progress Trackers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Resource Library</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src="HabinestLogo.jpg"
                alt="Home"
                className="w-10 h-10 object-cover rounded-full border-2 border-[#69995D]"
              />
              <span className="font-bold text-xl">Habinest</span>
            </div>
            <p className="text-white/60">Making your housing search effortless and enjoyable</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
