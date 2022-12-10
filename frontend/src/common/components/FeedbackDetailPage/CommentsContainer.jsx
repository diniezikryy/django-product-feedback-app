import Comment from "./Comment";

import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const CommentsContainer = ({ comments, setComments }) => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const feedback_id = router.query["feedback_id"];

  const onSubmit = async (data) => {
    const { content } = data;

    const body = JSON.stringify({
      feedback: feedback_id,
      content,
    });

    const res = await fetch("http://localhost:3000/api/feedbacks/addComment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });

    const newComment = await res.json();

    console.log(newComment);

    if (res.status === 201) {
      setComments([...comments, newComment]);
    }
  };
  return (
    <div className="flex-col w-full ">
      <div className="flex flex-col">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>

      <div className="flex flex-col mt-2.5">
        <div className="w-full shadow-xl card bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <textarea
              defaultValue=""
              type="text"
              className={`w-full textarea textarea-bordered ${
                errors.content && "textarea-error"
              }`}
              placeholder="Write comment here"
              {...register("content", { required: true })}
            />
            {errors.content && (
              <label className="label">
                <span className="label-text-alt">This field is required!</span>
              </label>
            )}

            <div className="flex mt-6">
              {user ? (
                <button className="ml-auto btn btn-primary">
                  + Add Comment
                </button>
              ) : (
                <div
                  className="ml-auto tooltip"
                  data-tip="Login to add comment"
                >
                  <button
                    className=" btn btn-disabled"
                    tabIndex="-1"
                    role="button"
                    aria-disabled="true"
                  >
                    + Add Comment
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentsContainer;
