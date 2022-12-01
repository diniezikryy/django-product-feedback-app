import BaseLayout from "../common/layouts/BaseLayout";
import FeedbackCard from "../common/components/HomePage/FeedbackCard";
import CenteredLoading from "../common/components/utils/CenteredLoading";
import ErrorPage from "../common/components/utils/ErrorPage";

import { getAllFeedbacks } from "../services/feedbacks";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { refreshToken } from "../features/user";

const HomePage = ({ feedbacks }) => {
  const [feedbacksList, setFeedbacksList] = useState(feedbacks);
  const [sortType, setSortType] = useState("upvotes");
  const [filterType, setFilterType] = useState("");

  const dispatch = useDispatch();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: getAllFeedbacks,
    initialData: feedbacks,
  });
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    sortArray(sortType);
  }, [sortType]);

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

  return (
    <>
      <BaseLayout title="Product Feedback | Home" content="Homepage">
        <div className="grid w-full h-[calc(100vh-64px)] bg-base-200 pt-0">
          <div className="w-full p-6">
            <div className="flex">
              <select
                onChange={(e) => {
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

              <select
                className="w-full max-w-xs ml-6 select select-bordered"
                onChange={(e) => {
                  setFilterType(e.target.value);
                }}
              >
                <option disabled selected>
                  Filter By:
                </option>
                <option value="">All</option>
                <option value="ui">UI</option>
                <option value="ux">UX</option>
                <option value="enhancement">Enhancement</option>
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
              </select>

              {user ? (
                <button className="ml-auto btn btn-primary">
                  + Add Feedback
                </button>
              ) : (
                <div
                  className="ml-auto tooltip"
                  data-tip="Login to add feedback"
                >
                  <button
                    className=" btn btn-disabled"
                    tabindex="-1"
                    role="button"
                    aria-disabled="true"
                  >
                    + Add Feedback
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6">
              <ul>
                {feedbacksList
                  .filter((feedback) => {
                    return filterType === ""
                      ? feedback
                      : feedback.category.includes(filterType);
                  })
                  .map((feedback) => (
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
