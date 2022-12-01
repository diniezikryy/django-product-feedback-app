import React from "react";

const ErrorPage = () => {
  return (
    <div className="hero h-[calc(100vh-64px)] bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-md">
          <div role="status">
            <span>An error has occured! Error: {error.message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
