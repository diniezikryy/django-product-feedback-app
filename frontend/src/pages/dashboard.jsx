import { useSelector } from "react-redux";
import BaseLayout from "../common/layouts/BaseLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DashboardPage = () => {
  const router = useRouter();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated && !loading && user === null) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <BaseLayout title="Product Feedback | Dashboard" content="Dashboard">
        <div className="hero h-[calc(100vh-64px)] bg-base-200">
          <div className="text-center hero-content">
            <div className="max-w-md">
              {loading || user === null ? (
                <button className="btn btn-square loading"></button>
              ) : (
                <div>
                  <h1 className="text-5xl font-bold">Dashboard Page</h1>
                  <div className="mt-5 shadow-xl card w-96 bg-base-100">
                    <div className="card-body">
                      <h2 className="card-title">User Details</h2>
                      <p>First Name: {user.first_name}</p>
                      <p>Last Name: {user.last_name}</p>
                      <p>Email: {user.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default DashboardPage;
