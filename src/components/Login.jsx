import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false); // ✅ NEW STATE

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Helper function to extract safe error messages
  const extractErrorMessage = (err, fallback) => {
    return (
      err?.response?.data?.message ||
      (typeof err?.response?.data === "string" ? err.response.data : null) ||
      err?.message ||
      fallback
    );
  };

  const handleLogin = async () => {
    setErr("");
    setLoading(true); // start loading
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setErr(extractErrorMessage(err, "Login failed. Please try again."));
    } finally {
      setLoading(false); // stop loading
    }
  };

  const handleSignUp = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      console.error("Signup error:", err);
      setErr(extractErrorMessage(err, "Signup failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="card bg-base-300 w-full max-w-md shadow-md">
        <div className="card-body space-y-4">
          <h2 className="card-title text-center text-2xl font-bold">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {/* --- Sign Up extra fields --- */}
          {!isLogin && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="First Name"
                  disabled={loading}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Last Name"
                  disabled={loading}
                />
              </fieldset>
            </>
          )}

          {/* --- Common Fields --- */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Email"
              disabled={loading}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Password"
              disabled={loading}
            />
          </fieldset>

          {/* --- Error Message --- */}
          {err && <p className="text-red-500 text-sm">{String(err)}</p>}

          {/* --- Action Button --- */}
          <div className="card-actions justify-center">
            <button
              className={`btn btn-primary w-full ${
                loading ? "opacity-70" : ""
              }`}
              onClick={isLogin ? handleLogin : handleSignUp}
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}

              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Creating account..."
                : isLogin
                ? "Login"
                : "Sign Up"}
            </button>
          </div>

          {/* --- Toggle Login/Signup --- */}
          <p
            onClick={() => !loading && setIsLogin((v) => !v)}
            className={`text-center underline cursor-pointer text-sm ${
              loading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
