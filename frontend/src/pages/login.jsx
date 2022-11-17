import React from "react";
import BaseLayout from "../common/layouts/BaseLayout";

const LoginPage = () => {
  return (
    <BaseLayout title="Product Feedback | Login" content="Login page">
      <div className="hero h-[calc(100vh-64px)] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-10">Login Page</h1>

            <form className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
              />

              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs mb-5"
              />

              <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default LoginPage;
