import React from "react";

const Comment = ({ comment }) => {
  return (
    <>
      <div className="my-6 shadow-xl card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">{comment.content}</h2>
          <p className="text-accent">{comment.user.email}</p>
        </div>
      </div>
    </>
  );
};

export default Comment;
