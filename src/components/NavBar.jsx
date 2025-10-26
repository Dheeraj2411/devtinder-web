import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:7777/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-sm shadow-sm border-none">
      <div className="navbar max-w-6xl mx-auto px-4 border-none">
        <div className="flex-1 flex items-center">
          <button
            className="btn btn-ghost lg:hidden mr-2"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          <Link to="/" className="btn btn-ghost text-xl normal-case">
            📱DevTinder
          </Link>
        </div>

        <nav className="hidden lg:flex lg:items-center lg:gap-3">
          <Link to="/discover" className="btn btn-ghost btn-sm">
            Discover
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {!user && (
            <div className="hidden sm:flex gap-2">
              <Link to="/login" className="btn btn-sm">
                Sign in
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign up
              </Link>
            </div>
          )}

          {user && (
            <>
              <div className="hidden sm:block text-s">
                 <span className="font-semibold">{user.firstName}</span>
              </div>

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img alt="UserPhoto" src={user.photoURL} />
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile<span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections">Connections</Link>
                  </li>
                  <li>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      <div
        className={`lg:hidden transition-max-h duration-200 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-3 border-t bg-base-100">
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                to="/discover"
                className="block w-full"
                onClick={() => setOpen(false)}
              >
                Discover
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="block w-full"
                onClick={() => setOpen(false)}
              >
                Jobs
              </Link>
            </li>

            {user ? (
              <>
                <li className="pt-2 border-t">
                  <span className="text-sm px-1">
                    Signed in as <strong>{user.firstName}</strong>
                  </span>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="block w-full"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    className="block w-full"
                    onClick={() => setOpen(false)}
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="block w-full"
                    onClick={() => setOpen(false)}
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="text-left w-full"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="pt-2 border-t">
                  <Link
                    to="/login"
                    className="block w-full"
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block w-full"
                    onClick={() => setOpen(false)}
                  >
                    Create account
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
