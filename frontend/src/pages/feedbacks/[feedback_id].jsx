import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Comment from "../../common/components/FeedbackDetailPage/Comment";
import FeedbackDetailCard from "../../common/components/FeedbackDetailPage/FeedbackDetailCard";
import BaseLayout from "../../common/layouts/BaseLayout";
import { refreshToken } from "../../features/user";
import { getAllFeedbacks, getIndFeedback } from "../../services/feedbacks";

const FeedbackDetailPage = ({ feedback }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(refreshToken());
  }, [dispatch]);

  return (
    <BaseLayout
      title="Product Feedback | Feedback Title"
      description="Feedback Description"
    >
      <div className="grid w-full h-[calc(100vh-64px)] bg-base-200 p-6">
        <div className="w-full">
          <FeedbackDetailCard feedback={feedback} />

          <div className="mt-6 divider">Comments</div>

          <div className="w-full">
            {feedback.comments.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export async function getStaticPaths() {
  const data = await getAllFeedbacks();

  const paths = data.map((feedback) => ({
    params: { feedback_id: feedback.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const feedback_id = context.params.feedback_id;

  const res = await fetch(
    `http://localhost:3000/api/feedbacks/getIndFeedback/${feedback_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  return {
    props: { feedback: data },
  };
}

export default FeedbackDetailPage;
