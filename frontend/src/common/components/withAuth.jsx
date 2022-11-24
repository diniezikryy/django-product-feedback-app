import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../../features/user";

const withAuth = (Component) => {
  const Auth = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { isAuthenticated, loading } = useSelector((state) => state.user);

    useEffect(() => {
      if (dispatch && dispatch !== null && dispatch !== undefined)
        dispatch(refreshToken());
    }, [dispatch]);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push({
          pathname: "/login",
          query: { from: router.pathname },
        });
      }
    }, []);

    return <Component />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
