import { useSelector } from "react-redux";
import BaseLayout from "../common/layouts/BaseLayout";
import { useRouter } from "next/router";
import withAuth from "../common/components/withAuth";
import { getAllFeedbacks } from "../services/feedbacks";
import { useQuery } from "@tanstack/react-query";
import CenteredLoading from "../common/components/utils/CenteredLoading";
import FeedbackCard from "../common/components/HomePage/FeedbackCard";

const DashboardPage = () => {
  const router = useRouter();

  const { user, loading } = useSelector((state) => state.user);
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: getAllFeedbacks,
  });

  if (isLoading) {
    return (
      <BaseLayout title="Product Feedback | Dashboard" content="Dashboard">
        <CenteredLoading />
      </BaseLayout>
    );
  }

  return (
    <>
      <BaseLayout title="Product Feedback | Dashboard" content="Dashboard">
        <div className="grid w-full h-[calc(100vh-64px)] bg-base-200 p-6">
          <div className="w-full">
            {loading || user === null ? (
              <button className="btn btn-square loading"></button>
            ) : (
              <div>
                <div className="w-full mt-5 shadow-xl card bg-base-100">
                  <div className="card-body">
                    <h2 className="card-title">User Details</h2>
                    <p>First Name: {user.first_name}</p>
                    <p>Last Name: {user.last_name}</p>
                    <p>Email: {user.email}</p>
                  </div>
                </div>

                <div className="mt-6 divider">
                  {user.first_name}'s Feedbacks
                </div>

                <ul>
                  {data
                    .filter((feedback) => {
                      return feedback.user.email === user.email;
                    })
                    .map((feedback) => (
                      <FeedbackCard feedback={feedback} key={feedback.id} />
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default withAuth(DashboardPage);
