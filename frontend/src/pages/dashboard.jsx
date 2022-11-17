import React from "react";
import BaseLayout from "../common/layouts/BaseLayout";

const DashboardPage = () => {
  return (
    <>
      <BaseLayout title="Product Feedback | Dashboard" content="Dashboard">
        <div className="hero h-[calc(100vh-64px)] bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Dashboard Page</h1>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default DashboardPage;
