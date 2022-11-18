import cookie from "cookie";

export default async (req, res) => {
  res.setHeader("Set-Cookie", [
    cookie.serialize("access", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/api/",
    }),
    cookie.serialize("refresh", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/api/",
    }),
  ]);

  return res.status(200).json({
    success: "Logged out successfully.",
  });
};
