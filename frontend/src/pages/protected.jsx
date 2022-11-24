import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "../common/layouts/BaseLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { refreshToken } from "../features/user";
import withAuth from "../common/components/withAuth";

const ProtectedPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  return (
    <>
      <BaseLayout title="Product Feedback | Dashboard" content="Dashboard">
        <div className="hero h-[calc(100vh-64px)] bg-base-200">
          <div className="text-center hero-content">
            <div className="max-w-md">
              {loading === null ? (
                <button className="btn btn-square loading"></button>
              ) : (
                <div>
                  <h1 className="text-5xl font-bold">
                    This is a protected page
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default withAuth(ProtectedPage);
