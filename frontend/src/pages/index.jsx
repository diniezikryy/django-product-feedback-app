import BaseLayout from "../common/layouts/BaseLayout";
import FeedbackCard from "../common/components/HomePage/FeedbackCard";
import CenteredLoading from "../common/components/utils/CenteredLoading";
import ErrorPage from "../common/components/utils/ErrorPage";

import { getAllFeedbacks } from "../services/feedbacks";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { refreshToken } from "../features/user";

const HomePage = ({ feedbacks }) => {
  const [feedbacksList, setFeedbacksList] = useState(feedbacks);
  const [sortType, setSortType] = useState("upvotes");

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

  useEffect(() => {
    sortArray(sortType);
  }, [sortType]);

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
        <ErrorPage />
      </BaseLayout>
    );
  }

  const sortArray = (type) => {
    const types = {
      Upvotes: "upvotes",
      Comments: "comments",
    };

    const sortProperty = types[type];

    const sorted = [...feedbacksList].sort((a, b) => {
      if (sortProperty === "comments") {
        return b[sortProperty].length - a[sortProperty].length;
      } else {
        return b[sortProperty] - a[sortProperty];
      }
    });

    setFeedbacksList(sorted);
  };

  return (
    <>
      <BaseLayout title="Product Feedback | Home" content="Homepage">
        <div className="grid w-full h-[calc(100vh-64px)] bg-base-200 pt-0">
          <div className="w-full p-6">
            <select
              onChange={(e) => {
                console.log(e.target.value);
                setSortType(e.target.value);
              }}
              className="w-full max-w-xs select select-bordered"
            >
              <option disabled selected>
                Sort By:
              </option>
              <option>Upvotes</option>
              <option>Comments</option>
            </select>

            <select className="w-full max-w-xs ml-6 select select-bordered">
              <option disabled selected>
                Filter By:
              </option>
              <option>UI</option>
              <option>UX</option>
              <option>Enhancement</option>
              <option>Bug</option>
              <option>Feature</option>
            </select>

            <div className="mt-6">
              <ul>
                {feedbacksList.map((feedback) => (
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
