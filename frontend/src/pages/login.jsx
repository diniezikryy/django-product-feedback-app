import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resetRegistered, login } from "../features/user";
import BaseLayout from "../common/layouts/BaseLayout";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, isAuthenticated, registered } = useSelector(
    (state) => state.user
  );
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  console.log(router.query.from);

  if (isAuthenticated) {
    if (router.query.from) {
      router.push(router.query.from);
    } else {
      router.push("/dashboard");
    }
  }

  useEffect(() => {
    dispatch(resetRegistered());
  }, [registered]);

  return (
    <BaseLayout title="Product Feedback | Login" content="Login page">
      <div className="hero h-[calc(100vh-64px)] bg-base-200">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-10 text-5xl font-bold">Login Page</h1>

            <form onSubmit={onSubmit} className="w-full max-w-xs form-control">
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
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default LoginPage;
