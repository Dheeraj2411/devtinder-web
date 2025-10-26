import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoURL, about } = user;
  
  return (
    user && (
      <div className="card bg-base-300 w-80  shadow-xl my-3">
        <figure>
          <img src={photoURL} alt="Photo" className="w-80 " />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-accent">Interested</button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
