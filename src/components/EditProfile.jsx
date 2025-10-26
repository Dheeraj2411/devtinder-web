import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoURL, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error(err?.response ?? err);
      setError(err?.response?.data?.message ?? "Failed to save profile");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  useEffect(() => {
    // placeholder if you want to fetch initial profile on mount
  }, []);

  return (
    <>
      <div className="bg-base-200 min-h-[calc(100vh-64px)] pt-6 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Form column (full width on mobile, 2/3 on desktop) */}
            <div className="md:col-span-2">
              <div className="card bg-base-300 shadow-md">
                <div className="card-body">
                  <h2 className="card-title justify-center">Edit Profile</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <label className="flex flex-col">
                      <span className="text-sm font-medium">First Name</span>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="First name"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium">Last Name</span>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Last name"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col mt-3">
                    <span className="text-sm font-medium">Photo URL</span>
                    <input
                      type="text"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Enter image URL"
                    />
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                    <label className="flex flex-col">
                      <span className="text-sm font-medium">Age</span>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="input input-bordered w-full no-spinner"
                        placeholder="Age"
                        min="0"
                      />
                    </label>

                    <label className="flex flex-col sm:col-span-2">
                      <span className="text-sm font-medium">Gender</span>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="select select-bordered w-full"
                        aria-label="Gender"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </label>
                  </div>

                  <label className="flex flex-col mt-3">
                    <span className="text-sm font-medium">About</span>
                    <textarea
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="textarea textarea-bordered w-full"
                      placeholder="Tell something about yourself"
                      rows={3}
                    />
                  </label>

                  {error && <p className="text-red-500 mt-2">{error}</p>}

                  <div className="card-actions justify-center mt-4">
                    <button className="btn btn-primary" onClick={saveProfile}>
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview column (full width on mobile, 1/3 on desktop) */}
            <div>
              <div className="sticky top-6">
                <UserCard
                  user={{ firstName, lastName, photoURL, age, gender, about }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed inset-x-0 top-6 flex justify-center z-50 px-4">
          <div className={`toast`}>
            <div className={`alert ${error ? "alert-error" : "alert-success"}`}>
              <span>{error ? error : "Profile saved successfully."}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
