import BaseLayout from "../../common/layouts/BaseLayout";
import withAuth from "../../common/components/withAuth";

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddFeedbackPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <BaseLayout title="Product Feedback | Add Feedback" content="Add Feedback">
      <div className="hero h-[calc(100vh-64px)] bg-base-200">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-10 text-5xl font-bold">Add a Feedback</h1>

            <form
              className="w-full form-control"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  defaultValue=""
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
                >
                  <option value="" disabled selected>
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
                >
                  <option value="" disabled selected>
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
                  defaultValue=""
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

              <input type="submit" className="mt-6 btn btn-primary" />
            </form>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withAuth(AddFeedbackPage);
