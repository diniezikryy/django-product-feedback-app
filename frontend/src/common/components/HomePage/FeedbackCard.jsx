import Link from "next/link";
import React from "react";

const FeedbackCard = ({ feedback }) => {
  return (
    <>
      <li key={feedback.id} className="mb-5">
        <Link href={`/feedbacks/${feedback.id}`} legacyBehavior>
          <a className="w-full shadow-xl card bg-base-100">
            <div className="card-body">
              <h2 className="card-title">{feedback.title}</h2>
              <p>{feedback.description}</p>
              <p>{feedback.upvotes} Upvotes</p>
              {feedback.comments.length > 1 ? (
                <p>{feedback.comments.length} Comments </p>
              ) : (
                <p>1 Comment</p>
              )}
            </div>
          </a>
        </Link>
      </li>
    </>
  );
};

export default FeedbackCard;
