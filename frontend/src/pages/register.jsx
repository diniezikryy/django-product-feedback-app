import BaseLayout from "../common/layouts/BaseLayout";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../features/user";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const { registered, loading } = useSelector((state) => state.user);
  const { first_name, last_name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(register({ first_name, last_name, email, password }));
  };

  if (registered) {
    router.push("/login");
  }

  return (
    <BaseLayout title="Product Feedback | Login" content="Login page">
      <div className="hero h-[calc(100vh-64px)] bg-base-200">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-10 text-5xl font-bold">
              Register for an account
            </h1>

            <form className="w-full form-control" onSubmit={onSubmit}>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full input input-bordered"
                name="email"
                onChange={onChange}
                value={email}
                required
              />

              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                className="w-full input input-bordered"
                onChange={onChange}
                value={first_name}
                required
              />

              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                className="w-full input input-bordered"
                onChange={onChange}
                value={last_name}
                required
              />

              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full input input-bordered"
                onChange={onChange}
                value={password}
                required
              />
              {loading ? (
                <button className="mt-5 btn btn-primary loading btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                  loading
                </button>
              ) : (
                <button className="mt-5 btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                  Register
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default RegisterPage;
