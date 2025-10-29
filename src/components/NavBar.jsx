import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import {motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Detect scroll to add background blur
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      if (location.pathname !== "/login") navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scroll ? "bg-base-100/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="navbar max-w-6xl mx-auto px-4">
        {/* LEFT: Logo */}
        <div className="flex-1">
          <Link
            to={user ? "/" : "/login"}
            className="btn btn-ghost text-xl font-bold normal-case text-primary"
          >
            📱 DevTinder
          </Link>
        </div>

        {/* RIGHT: Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          {!user && (
            <Link to="/login" className="btn btn-sm btn-primary text-white">
              Sign in
            </Link>
          )}

          {user && (
            <>
              <span className="font-semibold">{user.firstName}</span>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform"
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      alt="User avatar"
                      src={user.photoURL || "https://placehold.co/80x80"}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 shadow"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/connections">Connections</Link>
                  </li>
                  <li>
                    <Link to="#">Settings</Link>
                  </li>
                  <li>
                    <Link to="/request">Request</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className={`text-left text-red-500 flex items-center gap-2 ${
                        loggingOut ? "opacity-50" : ""
                      }`}
                    >
                      {loggingOut ? (
                        <>
                          <span className="loading loading-spinner loading-xs"></span>
                          Logging out...
                        </>
                      ) : (
                        "Logout"
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* RIGHT: Mobile Hamburger */}
        <button
          className="md:hidden btn btn-ghost btn-circle"
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </motion.svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-base-100 border-t shadow-md"
          >
            <ul className="flex flex-col gap-3 p-4 text-base">
              {!user ? (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block w-full"
                  >
                    Sign in
                  </Link>
                </li>
              ) : (
                <>
                  <li className="font-semibold text-lg">
                    Hi, {user.firstName}
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/connections">Connections</Link>
                  </li>
                  <li>
                    <Link to="#">Settings</Link>
                  </li>
                  <li>
                    <Link to="/request">Request</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className={`text-left text-red-500 flex items-center gap-2 ${
                        loggingOut ? "opacity-50" : ""
                      }`}
                    >
                      {loggingOut ? (
                        <>
                          <span className="loading loading-spinner loading-xs"></span>
                          Logging out...
                        </>
                      ) : (
                        "Logout"
                      )}
                    </button>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
