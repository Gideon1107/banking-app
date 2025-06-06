import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import PhoneInput from "react-phone-input-2"; // use email instead
import "react-phone-input-2/lib/style.css";
import { FaLock, FaEye, FaEyeSlash, FaQuestionCircle } from "react-icons/fa";
import CountryPicker from "../../components/CountryPicker";
import { HiArrowRight } from "react-icons/hi";
import SuccessPopup from "../../components/common/SuccessPopup";
import {useAuthStore} from "../../store/registerStore";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    nationality: "",
    email: "",
    password: "",
    // pin: "",
    address: "",
    // securityQuestion: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const register = useAuthStore((state) => state.register);
  const registrationSuccess = useAuthStore((state) => state.registrationSuccess);
  const error = useAuthStore((state) => state.error);
  const loading = useAuthStore((state) => state.loading);
  const clearErrors = useAuthStore((state) => state.clearErrors);

    useEffect(() => {
    if (registrationSuccess && !error) {
      setShowSuccessPopup(true);
    }
  }, [registrationSuccess, error]);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
      clearErrors();
    // Add signup logic here

      const {
      firstName,
      lastName,
      dob,
      nationality,
      email,
      password,
      address,
    } = formData;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !dob ||
      !nationality ||
      !email.trim() ||
      !password.trim() ||
      !address.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await register({
        firstName,
        lastName,
        dob,
        nationality,
        email, 
        password,
        address,
      });

    } catch (err) {
      // Error handled in the store
      console.error("Registration error:", err);
      alert(error || "An error occurred during registration.");

      return;
    }
  
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-plus">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              First Name
            </label>
            <input
              type="text"
              className="w-full py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Last Name
            </label>
            <input
              type="text"
              className="w-full py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Nationality
            </label>
            <CountryPicker
              value={formData.nationality}
              onChange={(value) =>
                setFormData({ ...formData, nationality: value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Email Address
            </label>
            <div className="relative">
              {/* <PhoneInput
                country={"us"}
                value={formData.email}
                onChange={(email) => setFormData({ ...formData, email })}
                containerClass="w-full"
                inputClass="w-full py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 pr-10"
                buttonClass="!border-0 !border-r !rounded-l-lg"
                placeholder="1234567890"
              /> */}

<input
  type="email"
  value={formData.email}
  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
  placeholder="Enter your email"
  required
  className="border rounded px-3 py-2 w-full"
/>

            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-black mb-1">
              Create PIN (4 digits)
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPin ? "text" : "password"}
                maxLength={4}
                pattern="\d{4}"
                className="w-full py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                value={formData.pin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pin: e.target.value.replace(/\D/g, ""),
                  })
                }
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPin ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div> */}

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Address
            </label>
            <textarea
              className="w-full py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              rows={2}
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-black mb-1">
              Security Question
            </label>
            <input
              type="text"
              className="w-full py-2.5 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.securityQuestion}
              onChange={(e) =>
                setFormData({ ...formData, securityQuestion: e.target.value })
              }
              placeholder="What was your nickname?"
            />
          </div> */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full mt-6 md:mt-8 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-text to-[#00388C] text-white rounded-xl font-bold flex items-center justify-between gap-2 md:gap-4 hover:scale-105 transition-transform"
            >
              Get Started
              <HiArrowRight className="w-5 h-5" />
            </button>
          </div>

                       {/*  display  backend error message */}
            {error && (
            <p className="text-red-600 text-center text-sm">{error}</p>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-black">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        message="Please check your email for an activation link to complete your registration."
      />
    </div>
  );
}

export default Signup;
