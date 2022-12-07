import BaseLayout from "../../common/layouts/BaseLayout";
import withAuth from "../../common/components/withAuth";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const EditFeedbackPage = () => {
  const router = useRouter();
  const feedback = router.query;

  const initialData = {
    title: feedback.title,
    category: feedback.category,
    upvotes: feedback.upvotes,
    status: feedback.status,
    description: feedback.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, category, status, description } = data;

    const upvotes = initialData.upvotes;

    const body = JSON.stringify({
      title,
      category,
      upvotes,
      status,
      description,
    });

    const res = await fetch(
      `http://localhost:3000/api/feedbacks/editFeedback/${feedback.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      }
    );

    const respData = await res.json();

    console.log(respData.id);

    if (res.status === 200) {
      router.push(`/feedbacks/${respData.id}`);
    }
  };

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:3000/api/feedbacks/deleteFeedback/${feedback.id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const respData = await res.json();

    router.push("/");
  };

  return (
    <BaseLayout title="Product Feedback | Edit Feedback" content="Edd Feedback">
      <div className="hero h-[calc(100vh-64px)] bg-base-200">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-10 text-5xl font-bold">Edit Feedback</h1>

            <form
              className="w-full form-control"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  defaultValue={initialData.title}
                  type="text"
                  placeholder="Title"
                  className={`w-full input input-bordered ${
                    errors.title && "input-error"
                  }`}
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <label className="label">
                    <span className="label-text-alt">
                      This field is required!
                    </span>
                  </label>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  className={`w-full select select-bordered ${
                    errors.category && "select-error"
                  }`}
                  {...register("category", { required: true })}
                  defaultValue={initialData.category}
                >
                  <option value="" disabled defaultValue>
                    Category
                  </option>
                  <option value="ui">UI</option>
                  <option value="ux">UX</option>
                  <option value="enhancement">Enhancement</option>
                  <option value="bug">Bug</option>
                  <option value="feature">Feature</option>
                </select>
                {errors.category && (
                  <label className="label">
                    <span className="label-text-alt">
                      This field is required!
                    </span>
                  </label>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  className={`w-full select select-bordered ${
                    errors.status && "select-error"
                  }`}
                  {...register("status", { required: true })}
                  defaultValue={initialData.status}
                >
                  <option value="" disabled defaultValue>
                    Status
                  </option>
                  <option value="suggestion">Suggestion</option>
                  <option value="in-progress" disabled>
                    In-Progress
                  </option>
                  <option value="live" disabled>
                    Live
                  </option>
                </select>
                {errors.status && (
                  <label className="label">
                    <span className="label-text-alt">
                      This field is required!
                    </span>
                  </label>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  defaultValue={initialData.description}
                  type="text"
                  placeholder="Description"
                  className={`w-full textarea textarea-bordered ${
                    errors.title && "textarea-error"
                  }`}
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <label className="label">
                    <span className="label-text-alt">
                      This field is required!
                    </span>
                  </label>
                )}
              </div>

              {/* Put this part before </body> tag */}
              {/* The button to open modal */}
              <label htmlFor="my-modal-3" className="mt-6 btn btn-error">
                Delete feedback
              </label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal">
                <div className="relative modal-box">
                  <label
                    htmlFor="my-modal-3"
                    className="absolute btn btn-sm btn-circle right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-lg font-bold">
                    Confirm deletion of feedback
                  </h3>
                  <p className="py-4">
                    Are you sure you want to delete this feedback?
                  </p>

                  <div className="modal-action">
                    <label
                      htmlFor="my-modal"
                      className="btn btn-error"
                      onClick={handleDelete}
                    >
                      Delete feedback
                    </label>
                  </div>
                </div>
              </div>

              <input type="submit" className="mt-6 btn btn-primary" />
            </form>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withAuth(EditFeedbackPage);
