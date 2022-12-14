import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Comment from "../../common/components/FeedbackDetailPage/Comment";
import CommentsContainer from "../../common/components/FeedbackDetailPage/CommentsContainer";
import FeedbackDetailCard from "../../common/components/FeedbackDetailPage/FeedbackDetailCard";
import BaseLayout from "../../common/layouts/BaseLayout";
import { refreshToken } from "../../features/user";
import { getAllFeedbacks, getIndFeedback } from "../../services/feedbacks";

const FeedbackDetailPage = ({ feedback }) => {
  const [comments, setComments] = useState([...feedback.comments]);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined)
      dispatch(refreshToken());
  }, [dispatch]);

  console.log(comments);

  return (
    <BaseLayout
      title="Product Feedback | Feedback Title"
      description="Feedback Description"
    >
      <div className="grid w-full h-[calc(100vh-64px)] bg-base-200 p-6">
        <div className="w-full">
          <FeedbackDetailCard feedback={feedback} comments={comments} />

          <div className="mt-6 divider">Comments</div>

          <CommentsContainer comments={comments} setComments={setComments} />
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
