import React from "react";

const FeedbackDetailCard = ({ feedback }) => {
  console.log(feedback);

  return (
    <>
      <div className="mt-6 shadow-xl card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">{feedback.title}</h2>
          <p>{feedback.description}</p>
          <p>
            Status: <span className="capitalize">{feedback.status}</span>
          </p>
          <p>Upvotes: {feedback.upvotes}</p>
          <p>Posted by: {feedback.user.email}</p>
        </div>
      </div>
    </>
  );
};

export default FeedbackDetailCard;
