import BaseLayout from "../common/layouts/BaseLayout";

import { getAllFeedbacks } from "../services/feedbacks";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "../features/user";
import FeedbackCard from "../common/components/HomePage/FeedbackCard";
import CenteredLoading from "../common/components/utils/CenteredLoading";

const HomePage = ({ feedbacks }) => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: getAllFeedbacks,
    initialData: feedbacks,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(refreshToken());
  }, [dispatch]);

  if (isLoading) {
    return (
      <BaseLayout title="Product Feedback | Dashboard" content="Dashboard">
        <CenteredLoading />
      </BaseLayout>
    );
  }

  if (isError) {
    return (
      <BaseLayout title="Product Feedback | Dashboard" content="Dashboard">
        <div className="hero h-[calc(100vh-64px)] bg-base-200">
          <div className="text-center hero-content">
            <div className="max-w-md">
              <div role="status">
                <span>An error has occured! Error: {error.message}</span>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }

  return (
    <>
      <BaseLayout title="Product Feedback | Home" content="Homepage">
        <div className="grid w-full h-[calc(100vh-64px)] bg-base-200 p-6 pt-0">
          <div className="w-full">
            <div>
              <div className="my-6 divider">Feedbacks</div>
              <ul>
                {data.map((feedback) => (
                  <FeedbackCard feedback={feedback} key={feedback.id} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export async function getStaticProps() {
  const feedbacks = await getAllFeedbacks();

  return {
    props: { feedbacks },
  };
}

export default HomePage;
