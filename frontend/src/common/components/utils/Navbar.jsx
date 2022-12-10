import Link from "next/link";
import { logout } from "../../../features/user";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const router = useRouter();

  const authLinks = (
    <>
      <li>
        <Link
          href={{
            pathname: "/login",
            query: { from: router.pathname },
          }}
          legacyBehavior
        >
          <a>Dashboard</a>
        </Link>
      </li>
      <li>
        <Link href="/" legacyBehavior>
          <a onClick={() => dispatch(logout())}>Logout</a>
        </Link>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link href="/login" legacyBehavior>
          <a>Login</a>
        </Link>
      </li>
      <li>
        <Link href="/register" legacyBehavior>
          <a>Register</a>
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" legacyBehavior>
          <a className="text-xl normal-case btn btn-ghost">Product Feedback</a>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="p-0 menu menu-horizontal">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
