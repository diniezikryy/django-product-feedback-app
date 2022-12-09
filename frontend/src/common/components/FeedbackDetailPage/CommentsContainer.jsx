import React from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const CommentsContainer = ({ comments }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex-col w-full ">
      <div className="flex flex-col">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>

      <div className="flex mt-6">
        {user ? (
          <button className="ml-auto btn btn-primary">+ Add Comment</button>
        ) : (
          <div className="ml-auto tooltip" data-tip="Login to add comment">
            <button
              className=" btn btn-disabled"
              tabIndex="-1"
              role="button"
              aria-disabled="true"
            >
              + Add Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsContainer;
