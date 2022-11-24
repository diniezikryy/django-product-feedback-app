import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "../common/layouts/BaseLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { refreshToken } from "../features/user";
import withAuth from "../common/components/withAuth";
import { useGetAllFeedbacksQuery } from "../services/feedbacks";

const DashboardPage = () => {
  const router = useRouter();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  /* useEffect(async () => {
    const apiRes = await fetch("/api/feedbacks/getAllFeedbacks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = apiRes.json();

    console.log(data);
  }, []); */

  const { data, error, isLoading } = useGetAllFeedbacksQuery();

  if (isLoading) return <div>Loading...</div>;

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

export default withAuth(DashboardPage);
