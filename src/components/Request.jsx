import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
  const request = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      // adapt if API returns requests under res.data.data or res.data.requests
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.error("fetchRequests error:", err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      // ensure URL format: /request/review/:status/:id
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      // update store with new payload (API response)
      dispatch(addRequest(res?.data.data ?? res?.data));
    } catch (err) {
      console.error("reviewRequest error:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []); // run once on mount

  if (!request) return null;
  if ( request.length === 0)
    return <h1 className="p-8 text-center">No Request Found</h1>;

  return (
    <div className="pt-4 pb-8 bg-base-200 min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="bg-base-100 rounded-box shadow-md w-full">
          <li className="p-4 text-2xl text-center uppercase opacity-90 tracking-wide">
            Connection Requests
          </li>

          {request.map((r) => {
            const { firstName, lastName, about, photoURL } = r.fromUserId;
            return (
              <li
                key={r._id ?? `${firstName}-${lastName}`}
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

                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => reviewRequest("accepted", r._id)}
                      >
                        Accepted
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => reviewRequest("rejected", r._id)}
                      >
                        Rejected
                      </button>
                    </div>
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

export default Request;
