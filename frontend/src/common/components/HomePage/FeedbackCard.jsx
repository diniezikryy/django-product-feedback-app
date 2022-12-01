import Link from "next/link";
import React from "react";

const FeedbackCard = ({ feedback }) => {
  return (
    <>
      <li key={feedback.id} className="mb-5">
        <Link href={`/feedbacks/${feedback.id}`} legacyBehavior>
          <a className="w-full shadow-xl card bg-base-100">
            <div className="card-body">
              <div className="justify-between card-title">
                <h1 className="prose prose-2xl">{feedback.title}</h1>
                <div className="flex flex-col items-center max-w-fit btn">
                  <svg
                    width="10"
                    height="7"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-2"
                  >
                    <path
                      d="M1 6l4-4 4 4"
                      stroke="#4661E6"
                      strokeWidth="2"
                      fill="none"
                      fillRule="evenodd"
                    />
                  </svg>{" "}
                  {feedback.upvotes}
                </div>
              </div>
              <div className="prose">{feedback.description}</div>
              <div className="items-center max-w-fit btn">
                <div className="mr-2">{feedback.comments.length}</div>
                <span>
                  <svg
                    width="18"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
                      fill="#CDD2EE"
                      fillRule="nonzero"
                    />
                  </svg>
                </span>
              </div>
              <div className="items-center max-w-fit btn btn-primary">
                {feedback.category}
              </div>
            </div>
          </a>
        </Link>
      </li>
    </>
  );
};

export default FeedbackCard;
