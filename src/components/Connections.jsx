import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []); // run once on mount
  if (!connections) return;
  if(connections.length===0)return <h1>No Connection Found</h1>
  return (
    <div className="pt-4 pb-8 bg-base-200 min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="bg-base-100 rounded-box shadow-md w-full">
          <li className="p-4 text-2xl text-center uppercase opacity-90 tracking-wide">
            Connections
          </li>

          {connections?.map((data) => {
            const { id, firstName, lastName, about, photoURL } = data;
            return (
              <li
                key={id ?? `${firstName}-${lastName}`}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-t last:border-b"
              >
                <img
                  src={photoURL}
                  alt={`${firstName} ${lastName}`}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full shadow-sm shrink-0"
                />

                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="text-lg font-semibold uppercase opacity-80 truncate">
                      {firstName} {lastName}
                    </div>

                    <button className="btn btn-sm sm:btn-md btn-ghost self-start sm:self-auto">
                      Add
                    </button>
                  </div>

                  <p className="mt-2 text-sm text-base-content/70 wrap-break-word line-clamp-3">
                    {about}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Connections;
