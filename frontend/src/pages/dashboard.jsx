import { useSelector } from "react-redux";
import BaseLayout from "../common/layouts/BaseLayout";
import { useRouter } from "next/router";
import withAuth from "../common/components/withAuth";

const DashboardPage = () => {
  const router = useRouter();

  const { user, loading } = useSelector((state) => state.user);

  return (
    <>
      <BaseLayout title="Product Feedback | Dashboard" content="Dashboard">
        <div className="hero h-[calc(100vh-64px)] bg-base-200">
          <div className="text-center hero-content">
            <div className="max-w-full">
              {loading || user === null ? (
                <button className="btn btn-square loading"></button>
              ) : (
                <div>
                  <div className="mt-5 shadow-xl card w-96 bg-base-100">
                    <div className="card-body">
                      <h2 className="card-title">User Details</h2>
                      <p>First Name: {user.first_name}</p>
                      <p>Last Name: {user.last_name}</p>
                      <p>Email: {user.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default withAuth(DashboardPage);
