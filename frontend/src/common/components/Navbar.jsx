import Link from "next/link";
import React from "react";

const Navbar = () => {
  const authLinks = (
    <>
      <li>
        <Link href="/login" legacyBehavior>
          <a>Dashboard</a>
        </Link>
      </li>
      <li>
        <Link href="/register" legacyBehavior>
          <a>Logout</a>
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
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
