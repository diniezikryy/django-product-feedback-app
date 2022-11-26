import BaseLayout from "../../common/layouts/BaseLayout";
import { getAllFeedbacks, getIndFeedback } from "../../services/feedbacks";

const FeedbackDetailPage = ({ feedback }) => {
  return (
    <BaseLayout
      title="Product Feedback | Feedback Title"
      description="Feedback Description"
    >
      <div className="shadow-xl card w-96 bg-base-100">
        <div className="card-body">
          <h2 className="card-title">{feedback.title}</h2>
          <p>{feedback.description}</p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Comment</button>
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
