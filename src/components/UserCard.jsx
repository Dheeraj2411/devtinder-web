import axios from "axios";

import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, photoURL, about } = user;
  const dispatch = useDispatch();
  const sendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(user._id));
      console.log(res)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    user && (
      <div className="card bg-base-300 w-80  shadow-xl my-3">
        <figure>
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            alt={`${firstName} ${lastName}`}
            className="w-80 "
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                sendRequest("ignored", user._id);
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-accent"
              onClick={() => {
                sendRequest("interested", user._id);
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
